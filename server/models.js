import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
import { StopWatch } from "stopwatch-node";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    } finally {
      client.release();
    }
  }

  async getStyles(productId) {
    const client = await pool.connect();

    let result = {};
    result["product_id"] = productId.product_id;
    result["results"] = [];

    try {
      const styleSql =
        "SELECT st.style_id, st.name, st.default_style, pr.sale_price, pr.original_price FROM styles st INNER JOIN prices pr ON st.style_id = pr.style_id WHERE product_id = $1;";
      const styleData = await client.query(styleSql, [productId.product_id]);
      const styles = styleData.rows;

      for (let i = 0; i < styles.length; i++) {
        let style = {};
        style["style_id"] = styles[i].style_id;
        style["name"] = styles[i].name;
        style["default?"] = styles[i].default_style === 1;
        style["sale_price"] = styles[i].sale_price;
        style["original_price"] = styles[i].original_price;
        style["photos"] = [];
        style["skus"] = {};
        result["results"].push(style);
      }

      const photoSkuSql =
        "SELECT st.style_id, ph.thumbnail_url, ph.url, sk.sku_id, sk.size, sk.quantity FROM styles st INNER JOIN photos ph ON st.style_id = ph.style_id INNER JOIN skus sk ON st.style_id = sk.style_id WHERE st.style_id = ANY ($1);";
      let photoSkuSqlData = await client.query(photoSkuSql, [
        styles.map((x) => x.style_id),
      ]);
      let data = photoSkuSqlData.rows;

      for (let i = 0; i < data.length; i++) {
        // console.log('data: ', data)
        let styleId = data[i].style_id; // 1
        let thumbnailUrl = data[i].thumbnail_url;
        let url = data[i].url;

        let x = result["results"].filter((style) => style.style_id === styleId);
        let y = x[0]["photos"].filter(
          (photo) => photo.thumbnail_url === thumbnailUrl && photo.url === url
        );
        if (y.length === 0) {
          let photo = {};
          photo["thumbnail_url"] = data[i].thumbnail_url;
          photo["url"] = data[i].url;
          x[0]["photos"].push(photo);
        }
        x[0]["skus"][data[i].sku_id] = {};
        x[0]["skus"][data[i].sku_id]["quantity"] = data[i].quantity;
        x[0]["skus"][data[i].sku_id]["size"] = data[i].size;
      }
      return result;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  }

  async getRelated(productId) {
    const client = await pool.connect();

    try {
      const sql = "SELECT related_product_id FROM related WHERE product_id=$1;";
      const data = await client.query(sql, [productId.product_id]);

      let result = [];
      for (let i = 0; i < data.rows.length; i++) {
        result.push(data.rows[i].related_product_id);
      }
      return result;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  }
}

export default Models;
