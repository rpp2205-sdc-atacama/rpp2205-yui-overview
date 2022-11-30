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
}

export default Models;