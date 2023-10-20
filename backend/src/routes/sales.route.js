const route = require('express').Router();
const { salesController } = require('../controllers');

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

module.exports = route;