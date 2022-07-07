const Joi = require('joi');
const salesModel = require('../models/salesModel');
const NotFoundError = require('./notFoundError');
const { runSchema } = require('./validationError');

const salesService = {
  validateBody: runSchema(Joi.object({
    quantity: Joi.number().required().min(1),
    productId: Joi.number().required(),
  })),

  async list() {
    const salesList = await salesModel.list();
    return salesList;
  },
  async getById(id) {
    const sale = await salesModel.getById(id);
    return sale;
  },
  async checkIfExists(id) {
    const exists = await salesModel.exists(id);
    if (!exists.length) {
      throw new NotFoundError('Sale not found');
    }
  },
  async add(sales) {
    const saleId = await salesModel.add(sales);
    return { id: saleId, itemsSold: sales };
  },
  async update(saleId, saleToUpdate) {
    const promises = saleToUpdate
      .map(({ productId, quantity }) => salesModel.update(quantity, saleId, productId));
    await Promise.all(promises);  
    return { saleId, itemsUpdated: saleToUpdate };
  },
  async remove(id) {
    await salesModel.remove(id);
  },
};

module.exports = salesService;