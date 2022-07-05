const salesModel = require('../models/salesModel');
const NotFoundError = require('./notFoundError');

const salesService = {
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
};

module.exports = salesService;