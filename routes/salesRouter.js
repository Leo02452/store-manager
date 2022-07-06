const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getById);

salesRouter.get('/', salesController.list);

salesRouter.post('/', salesController.add);

module.exports = salesRouter;