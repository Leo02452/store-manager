const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/search', productsController.getByName);

productsRouter.get('/:id', productsController.getById);

productsRouter.get('/', productsController.list);

productsRouter.put('/:id', productsController.update);

productsRouter.post('/', productsController.add);

productsRouter.delete('/:id', productsController.remove);

module.exports = productsRouter;