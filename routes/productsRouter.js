const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/:id', productsController.getById);

productsRouter.get('/', productsController.list);

productsRouter.put('/:id', productsController.update);

productsRouter.post('/', productsController.add);

module.exports = productsRouter;