import Controllers from './controllers.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Routes {
  constructor() {
    this.Controllers = new Controllers();
  }

  applyRouting(app) {
    app.get('/products/:product_id', async (req, res) => {
      let productId = req.params;
      const response = await this.Controllers.getProduct(productId);
      res.status(200).send(response);
    });

    app.get('/products/:product_id/styles', async (req, res) => {
      let productId = req.params;
      const response = await this.Controllers.getStyles(productId);
      res.status(200).send(response);
    });

    app.get('/products/:product_id/related', async (req, res) => {
      let productId = req.params;
      const response = await this.Controllers.getRelated(productId);
      res.status(200).send(response);
    })

    app.get('/loaderio-d97e9d5b00e26a573d71a1af9c5cd558.html', (req, res) => {
      res.sendFile('loaderio-d97e9d5b00e26a573d71a1af9c5cd558.html', { root: __dirname })
    })
  }
}

export default Routes;