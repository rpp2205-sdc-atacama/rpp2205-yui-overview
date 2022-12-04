import Controllers from './controllers.js';

class Routes {
  constructor() {
    this.Controllers = new Controllers();
  }

  applyRouting(app) {
    app.get('/products/:product_id', async (req, res) => {
      let productId = req.params;
      const response = await this.Controllers.getProduct(productId);
      res.send(response);
    });

    app.get('/products/:product_id/styles', async (req, res) => {
      let productId = req.params;
      const response = await this.Controllers.getStyles(productId);
      res.send(response);
    })
  }
}

export default Routes;