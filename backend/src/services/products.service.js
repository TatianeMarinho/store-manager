const { productModel } = require('../models');

const findAllProducts = async () => {
  const products = await productModel.findAll();
  
  if (products.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product Not Found' } };
  }
  
  return { status: 'SUCCESSFUL', data: products };
};

const findProductId = async (productId) => {
  const product = await productModel.findById(productId);

  // lembrando que o retorno é um array com dois arrays dentro
  if (product.length !== 1) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product[0] };
};

module.exports = {
  findAllProducts,
  findProductId,
};