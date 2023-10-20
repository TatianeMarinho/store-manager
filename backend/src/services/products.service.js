const { productModel } = require('../models');

const findAllProducts = async () => {
  const sales = await productModel.findAll();
    
  if (sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product Not Found' } };
  }
    
  return { status: 'SUCCESSFUL', data: sales };
};
  
const findProductId = async (saleId) => {
  const sale = await productModel.findById(saleId);
  
  // lembrando que o retorno é um array com dois arrays dentro
  if (sale.length !== 1) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: sale[0] };
};
  
module.exports = {
  findAllProducts,
  findProductId,
};