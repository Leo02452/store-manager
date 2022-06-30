const productsModel = require('../models/productsModel');
const NotFoundError = require('./errors');

const productsService = {
  async list() {
    const productsList = await productsModel.list();
    return productsList;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    if (!product) {
      const error = new NotFoundError('Product not found');
      throw error;
    }
    return product;
  },
  async add(name) {
    const productId = await productsModel.add(name);
    const product = await productsModel.getById(productId);
    return product;
  },
};

module.exports = productsService;