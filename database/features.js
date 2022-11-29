const client = require('./index.js');

class Features {
  constructor() {

  }

  getFeaturesForProduct() {
    let product_id = req.params.product_id;
    client.query('SELECT * FROM features where product_id = ?', [product_id], (err, result) => {
      if (err) {
        console.log('error: ', err);
      }
      console.log('result: ', result)
    })
  }
}

export default Features;