const client = require('./index.js');

class Styles {
  constructor() {

  }

  getStylesHandler() {
    let product_id = req.params.product_id;
    client.query('SELECT * FROM styles where product_id = ?', [product_id], (err, result) => {
      if (err) {
        console.log('error: ', err);
      }
      return result;
    })
  }
}

export default Styles;