import pkg from 'pg';
const { Client } = pkg;
const { Pool } = pkg;
// import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

const pool = new Pool({
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// client.connect();

class Models {

  async getProduct(productId) {
    try {
      //await client.connect();

      const sql = 'SELECT p.id, p.name, p.description, p.slogan, p.category, p.default_price, f.feature, f.value FROM product_info p INNER JOIN features f ON p.id = f.product_id WHERE p.id = $1;';
      const data = await pool.query(sql, [productId.product_id]);

      let result = {};
      let features = [];

      for (let i = 0; i < data.rows.length; i++) {
        if (!result['id'] || !result['name'] || !result['description'] || !result['slogan'] || !result['category'] || !result['default_price']) {
          result['id'] = data.rows[i]['id'];
          result['name'] = data.rows[i]['name'];
          result['description'] = data.rows[i]['description'];
          result['slogan'] = data.rows[i]['slogan'];
          result['category'] = data.rows[i]['category'];
          result['default_price'] = data.rows[i]['default_price'].toString();
        };

        let feature = {};
        feature['feature'] = data.rows[i]['feature'];
        feature['value'] = data.rows[i]['value'];

        features.push(feature);
      }

      result['features'] = features;
      return result;
    } catch (error) {
      return error;
    } finally {

      //client.end();
    }
  }

  async getStyles(productId) {
    await client.connect();

    let result = {};
    result['product_id'] = productId.product_id;
    result['results'] = [];

    try {
      const styleSql = 'SELECT style_id, name, default_style FROM styles WHERE product_id = $1;'
      const styleData = await client.query(styleSql, [productId.product_id]);
      const styles = styleData.rows;

      for (let i = 0; i < styles.length; i++) {
        let style = {};
        let styleId = styles[i].style_id;
        let styleName = styles[i].name;
        let styleDefault = styles[i].default_style;

        style['style_id'] = styleId;
        style['name'] = styleName;
        style['default?'] = styleDefault === 1;

        let photoPriceSkuSql = 'SELECT st.style_id, pr.original_price, pr.sale_price, ph.thumbnail_url, ph.url, sk.sku_id, sk.size, sk.quantity FROM styles st INNER JOIN prices pr ON st.style_id = pr.style_id INNER JOIN photos ph ON st.style_id = ph.style_id INNER JOIN skus sk ON st.style_id = sk.style_id WHERE st.style_id = $1;';
        let photoPriceSkuData = await client.query(photoPriceSkuSql, [styleId]);

        style['photos'] = [];
        style['skus'] = {};

        for (let j = 0; j < photoPriceSkuData.rows.length; j++) {
          let originalPrice = photoPriceSkuData.rows[i].original_price;
          let salePrice = photoPriceSkuData.rows[i].sale_price;
          let thumbnailUrl = photoPriceSkuData.rows[i].thumbnail_url;
          let url = photoPriceSkuData.rows[i].url;
          let skuId = photoPriceSkuData.rows[i].sku_id;
          let quantity = photoPriceSkuData.rows[i].quantity;
          let size = photoPriceSkuData.rows[i].size;

          if (!style['original_price'] || !style['sale_price']) {
            style['original_price'] = originalPrice.toString();
            style['sale_price'] = salePrice;
          }

          let photo = {};
          photo['thumbnail_url'] = thumbnailUrl;
          photo['url'] = url;
          style['photos'].push(photo);

          let sku = {};
          sku['quantity'] = quantity;
          sku['size'] = size;

          style['skus'][skuId] = sku;
        }

        result['results'].push(style);
      }

      // console.log('final result: ', result);
      return result;
    } catch(error) {
      return error;
    } finally {
      client.end();
    }
  }
}

export default Models;