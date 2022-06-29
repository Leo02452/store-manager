const productsModel = require('../models/productsModel');

const productsService = {
  async list() {
    const productsList = await productsModel.list();
    return productsList;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.name = 'NotFoundError';
      throw error;
    }
    return product;
  },
};

module.exports = productsService;