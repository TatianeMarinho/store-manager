const route = require('express').Router();
const { productsController } = require('../controllers');

// retorno todos os produtos
route.get(
  '/', 
  productsController.productListAll,
);

// retorno um produto por id
route.get(
  '/:id', 
  productsController.productId,
);

module.exports = route;