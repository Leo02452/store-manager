const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/:id', productsController.getById);

productsRouter.get('/', productsController.list);

module.exports = productsRouter;