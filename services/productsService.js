const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('./notFoundError');
const { runSchema } = require('./validationError');

const productsService = {
  validateBody: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  async list() {
    const productsList = await productsModel.list();
    return productsList;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    return product;
  },
  async getByName(searchTerm) {
    const products = await productsModel.getByName(searchTerm);
    return products;
  },
  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists.length) {
      throw new NotFoundError('Product not found');
    }
  },
  async add(name) {
    const productId = await productsModel.add(name);
    return { id: productId, name };
  },
  async update(id, name) {
    await productsModel.update(id, name);
    return { id, name };
  },
  async remove(id) {
    await productsModel.remove(id);
  },
};

module.exports = productsService;