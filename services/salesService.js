const Joi = require('joi');
const salesModel = require('../models/salesModel');
const NotFoundError = require('./notFoundError');
const { runSchema } = require('./validationError');

const salesService = {
  validateBodyAdd: runSchema(Joi.object({
    quantity: Joi.number().required().min(1),
    productId: Joi.number().required(),
  })),

  async list() {
    const salesList = await salesModel.list();
    return salesList;
  },
  async getById(id) {
    const sale = await salesModel.getById(id);
    if (!sale.length) {
      const error = new NotFoundError('Sale not found');
      throw error;
    }
    return sale;
  },
  async add(sales) {
    const saleId = await salesModel.add(sales);
    return { id: saleId, itemsSold: sales };
  },
};

module.exports = salesService;