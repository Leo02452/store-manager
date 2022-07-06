const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('./notFoundError');
const { runSchema } = require('./validationError');

const productsService = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

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
  async update(id, name) {
    const product = await productsModel.getById(id);

    if (!product) {
      const error = new NotFoundError('Product not found');
      throw error;
    }

    await productsModel.update(id, name);
    return { id, name };
  },
  async remove(id) {
    const product = await productsModel.getById(id);

    if (!product) {
      const error = new NotFoundError('Product not found');
      throw error;
    }
    
    await productsModel.remove(id);
  },
  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists.length) {
      throw new NotFoundError('Product not found');
    }
  },
};

module.exports = productsService;