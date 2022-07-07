const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  async list(_req, res) {
    const salesList = await salesService.list();
    res.status(200).json(salesList);
  },

  async getById(req, res) {
    const { id } = req.params;
    await salesService.checkIfExists(id);
    const sales = await salesService.getById(id);
    res.status(200).json(sales);
  },
  async add(req, res) {
    const sales = req.body;

    const bodyPromises = sales.map((sale) => salesService.validateBody(sale));
    const validatedSales = await Promise.all(bodyPromises);

    const promises = validatedSales
      .map(({ productId }) => productsService.checkIfExists(productId));
    await Promise.all(promises);

    const saleInfo = await salesService.add(sales);
    res.status(201).json(saleInfo);
  },
  async remove(req, res) {
    const { id } = req.params;
    await salesService.checkIfExists(id);
    await salesService.remove(id);
    res.status(204).end();
  },
  async update(req, res) {
    const { id } = req.params;
    const sales = req.body;

    await salesService.checkIfExists(id);
    const bodyPromises = sales.map((sale) => salesService.validateBody(sale));
    const validatedSales = await Promise.all(bodyPromises);

    const checkPromises = validatedSales
      .map(({ productId }) => productsService.checkIfExists(productId));
    await Promise.all(checkPromises);

    const updatedSale = await salesService.update(id, sales);
    res.status(200).json(updatedSale);
  },
};

module.exports = salesController;