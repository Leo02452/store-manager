const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getById);

salesRouter.get('/', salesController.list);

salesRouter.put('/:id', salesController.update);

salesRouter.post('/', salesController.add);

salesRouter.delete('/:id', salesController.remove);

module.exports = salesRouter;