const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

// retorna todas as vendas
route.get(
  '/', 
  salesController.salesListAll,
);

// retorna uma venda especifica
route.get(
  '/:id', 
  salesController.saleId,
);

// insere uma compra
route.post(
  '/',
  validateSales,
  salesController.createSales,
);

module.exports = route;