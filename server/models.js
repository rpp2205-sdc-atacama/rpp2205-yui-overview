import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

class Models {
  async getProduct(productId) {
    const client = await pool.connect();
    try {
      const sql =
        "SELECT p.id, p.name, p.description, p.slogan, p.category, p.default_price, f.feature, f.value FROM product_info p INNER JOIN features f ON p.id = f.product_id WHERE p.id = $1;";
      const data = await client.query(sql, [productId.product_id]);

      console.log('data: ', data.rows);

      let result = {};
      let features = [];

      for (let i = 0; i < data.rows.length; i++) {
        if (
          !result["id"] ||
          !result["name"] ||
          !result["description"] ||
          !result["slogan"] ||
          !result["category"] ||
          !result["default_price"]
        ) {
          result["id"] = data.rows[i]["id"];
          result["name"] = data.rows[i]["name"];
          result["description"] = data.rows[i]["description"];
          result["slogan"] = data.rows[i]["slogan"];
          result["category"] = data.rows[i]["category"];
          result["default_price"] = data.rows[i]["default_price"].toString();
        }

        let feature = {};
        feature["feature"] = data.rows[i]["feature"];
        feature["value"] = data.rows[i]["value"];

        features.push(feature);
      }
      result["features"] = features;
      return result;
    } catch (error) {
      return error;
    }
  }

  async getStyles(productId) {
    const client = await pool.connect();

    let result = {};
    result["product_id"] = productId.product_id;
    result["results"] = [];

    try {
      const styleSql =
        "SELECT style_id, name, default_style FROM styles WHERE product_id = $1;";
      const styleData = await client.query(styleSql, [productId.product_id]);
      const styles = styleData.rows;

      let photoPriceSkuSqlTest =
        "SELECT st.style_id, pr.original_price, pr.sale_price, ph.thumbnail_url, ph.url, sk.sku_id, sk.size, sk.quantity FROM styles st INNER JOIN prices pr ON st.style_id = pr.style_id INNER JOIN photos ph ON st.style_id = ph.style_id INNER JOIN skus sk ON st.style_id = sk.style_id WHERE st.style_id = ANY ($1);";
      let photoPriceSkuDataTest = await client.query(photoPriceSkuSqlTest, [
        styles.map((x) => x.style_id),
      ]);

      for (let i = 0; i < styles.length; i++) {
        let style = {};
        let styleId = styles[i].style_id;
        let styleName = styles[i].name;
        let styleDefault = styles[i].default_style;

        style["style_id"] = styleId;
        style["name"] = styleName;
        style["default?"] = styleDefault === 1;

        let photoPriceSkuData = photoPriceSkuDataTest.rows.filter(
          (x) => (x.style_id = styleId)
        );
        //console.log(photoPriceSkuData)
        //let photoPriceSkuSql = 'SELECT st.style_id, pr.original_price, pr.sale_price, ph.thumbnail_url, ph.url, sk.sku_id, sk.size, sk.quantity FROM styles st INNER JOIN prices pr ON st.style_id = pr.style_id INNER JOIN photos ph ON st.style_id = ph.style_id INNER JOIN skus sk ON st.style_id = sk.style_id WHERE st.style_id = $1;';
        //let photoPriceSkuData = await client.query(photoPriceSkuSql, [styleId]);

        style["photos"] = [];
        style["skus"] = {};

        for (let j = 0; j < photoPriceSkuData.length; j++) {
          let originalPrice = photoPriceSkuData[i].original_price;
          let salePrice = photoPriceSkuData[i].sale_price;
          let thumbnailUrl = photoPriceSkuData[i].thumbnail_url;
          let url = photoPriceSkuData[i].url;
          let skuId = photoPriceSkuData[i].sku_id;
          let quantity = photoPriceSkuData[i].quantity;
          let size = photoPriceSkuData[i].size;

          if (!style["original_price"] || !style["sale_price"]) {
            style["original_price"] = originalPrice.toString();
            style["sale_price"] = salePrice;
          }

          let photo = {};
          photo["thumbnail_url"] = thumbnailUrl;
          photo["url"] = url;
          style["photos"].push(photo);

          let sku = {};
          sku["quantity"] = quantity;
          sku["size"] = size;

          style["skus"][skuId] = sku;
        }

        result["results"].push(style);
      }
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default Models;
