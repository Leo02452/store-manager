const salesService = require('../services/salesService');

const salesController = {
  async list(_req, res) {
    const salesList = await salesService.list();
    res.status(200).json(salesList);
  },

  async getById(req, res) {
    const { id } = req.params;
    const product = await salesService.getById(id);
    res.status(200).json(product);
  },
};

module.exports = salesController;