const productsService = require('../services/productsService');

const productsController = {
  async list(_req, res) {
    const productsList = await productsService.list();
    res.status(200).json(productsList);
  },

  async getById(req, res) {
    const { id } = req.params;
    const product = await productsService.getById(id);
    res.status(200).json(product);
  },
};

module.exports = productsController;