const productsService = require('../services/productsService');

const productsController = {
  async list(_req, res) {
    const productsList = await productsService.list();

    res.status(200).json(productsList);
  },
  async getById(req, res) {
    const { id } = req.params;

    await productsService.checkIfExists(id);
    const product = await productsService.getById(id);

    res.status(200).json(product);
  },
  async getByName(req, res) {
    const { q } = req.query;

    const products = await productsService.getByName(q);

    res.status(200).json(products);
  },
  async add(req, res) {
    const { name } = productsService.validateBody(req.body);

    const product = await productsService.add(name);

    res.status(201).json(product);
  },
  async update(req, res) {
    const { name } = productsService.validateBody(req.body);
    const { id } = req.params;

    await productsService.checkIfExists(id);

    const product = await productsService.update(id, name);

    res.status(200).json(product);
  },
  async remove(req, res) {
    const { id } = req.params;

    await productsService.checkIfExists(id);
    await productsService.remove(id);

    res.sendStatus(204);
  },
};

module.exports = productsController;