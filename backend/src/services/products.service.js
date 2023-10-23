const { productModel } = require('../models');

const findAllProducts = async () => {
  const sales = await productModel.findAll();
    
  if (sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
    
  return { status: 'SUCCESSFUL', data: sales };
};
  
const findProductId = async (productId) => {
  const product = await productModel.findById(productId);
  
  // lembrando que o retorno é um array com dois arrays dentro
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: product };
};

const newProducts = async (productObject) => {
  const newProductId = await productModel.insert(productObject);
  const newObject = await productModel.findById(newProductId);

  return { status: 'CREATED', data: newObject };
};
  
module.exports = {
  findAllProducts,
  findProductId,
  newProducts,
};