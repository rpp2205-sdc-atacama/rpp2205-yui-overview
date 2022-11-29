const client = require('../database/index.js');

module.exports = {
  getFeatureHandler: (productId) => {
    client.connect((err) => {
      if (err) {
        throw err;
      } else {
        client.query('select * from features where product_id = $1', [productId], (err, result) => {
          if (err) {
            throw err;
          }

          console.log('feature result: ', result.rows);
          return result.rows;
        })
      }
    });
  }
}