const client = require('../database/index.js');

module.exports = {
  getProductHandler: (productId) => {
    client
    .connect()
    .then(() => {
      client.query('SELECT p.id, p.name, p.description, p.slogan, p.category, p.default_price, f.feature, f.value FROM product_info p INNER JOIN features f ON p.id = f.product_id WHERE p.id = $1;', [productId], (err, result) => {
        if (err) throw err;

        let data = {};
        let features = [];

        for (let i = 0; i < result.rows.length; i++) {
          if (!data['id'] || !data['name'] || !data['description'] || !data['slogan'] || !data['category'] || !data['default_price']) {
            data['id'] = result.rows[i]['id'];
            data['name'] = result.rows[i]['name'];
            data['description'] = result.rows[i]['description'];
            data['slogan'] = result.rows[i]['slogan'];
            data['category'] = result.rows[i]['category'];
            data['default_price'] = result.rows[i]['default_price'];
          };

          let feature = {};
          feature['feature'] = result.rows[i]['feature'];
          feature['value'] = result.rows[i]['value'];

          features.push(feature);
        }

        data['features'] = features;

        // console.log('result: ', data);
        return data;
      })
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }
}