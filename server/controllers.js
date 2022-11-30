import Models from './models.js';

class Controllers {
  constructor() {
    this.Models = new Models();
  }

  async getProduct(productId) {
    let result = await this.Models.getProduct(productId);
    console.log('result: ', result);
    return result;
  }

  async getStyles(productId) {
    let result = await this.Models.getStyles(productId);
    return result;
  }
}

export default Controllers;