import Models from './models.js';

class Controllers {
  constructor() {
    this.Models = new Models();
  }

  async getProduct(productId) {
    return await this.Models.getProduct(productId);
  }

  async getStyles(productId) {
    return await this.Models.getStyles(productId);
  }
}

export default Controllers;