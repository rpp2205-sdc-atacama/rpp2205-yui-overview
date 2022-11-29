const client = require('./index.js');

class Photos {
  constructor() {

  }

  getPhotos() {
    let style_id = req.params.style_id;
    client.query('SELECT * FROM photos where style_id = ?', [style_id], (err, result) => {
      if (err) {
        console.log('error: ', err);
      }
      console.log('result: ', result);
    })
  }
}

export default Photos;