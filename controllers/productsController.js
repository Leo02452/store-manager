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
  async add(req, res) {
    const { name } = await productsService.validateBodyAdd(req.body);
    const product = await productsService.add(name);
    res.status(201).json(product);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name } = await productsService.validateBodyAdd(req.body);
    const product = await productsService.update(id, name);
    res.status(200).json(product);
  },
};

module.exports = productsController;