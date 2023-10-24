const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validateProducts');

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

route.post(
  '/', 
  validateName,
  productsController.createdProduct,
);

route.put(
  '/:id',
  validateName,
  productsController.productUpdate,
);

module.exports = route;