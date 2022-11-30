import Pool from 'pg-pool';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

class Models {
  async getProduct(productId) {
    await pool.connect();

    try {
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
      console.log('error: ', error);
    }
  }

  async getStyles(productId) {
    await pool.connect();

    try {
      let result = {};

      // get style
      const sql = 'SELECT style_id, name, default_style FROM styles WHERE product_id = $1;'
      const data = await pool.query(sql, [productId.product_id]);

      result['product_id'] = productId.product_id;
      result['results'] = [];

      // console.log('data: ', data.rows);

      // for each style, get price, photo and sku
      for (let i = 0; i < data.rows.length; i++) {
        // console.log(i)
        let eachResult = {};
        let styleId = data.rows[i].style_id;

        eachResult['style_id'] = styleId;
        eachResult['name'] = data.rows[i].name;
        eachResult['default_style'] = data.rows[i].default_style;

        let priceSql = 'select sale_price, original_price from prices where style_id = $1';
        let priceData = await pool.query(priceSql, [styleId]);

        eachResult['original_price'] = priceData.rows[0].original_price;
        eachResult['sale_price'] = priceData.rows[0].sale_price;

        // console.log('priceData: ', priceData.rows)

        let photoSql = 'select thumbnail_url, url from photos where style_id = $1';
        let photoData = await pool.query(photoSql, [styleId]);

        eachResult['photos'] = photoData.rows;

        // console.log('photoData: ', photoData.rows)

        let skuSql = 'select sku_id, size, quantity from skus where style_id = $1';
        let skuData = await pool.query(skuSql, [styleId]);

        eachResult['skus'] = {};

        for (let i = 0; i < skuData.rows.length; i++) {
          let skuId = skuData.rows[i].sku_id;
          let subSkuData = {};
          subSkuData['quantity'] = skuData.rows[i].quantity;
          subSkuData['size'] = skuData.rows[i].size;

          eachResult['skus'][skuId] = subSkuData;
        }

        // console.log('skuData: ', skuData.rows)
        result['results'].push(eachResult);
      }
      console.log('final result: ', result)

    } catch (error) {
      console.log(error);
    }
  }
}

export default Models;