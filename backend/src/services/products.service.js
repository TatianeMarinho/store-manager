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

const updateProduct = async (upProduct, idProduct) => {
  const existProduct = await productModel.findById(idProduct);

  if (existProduct === undefined) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  await productModel.update(upProduct, idProduct);

  const product = await productModel.findById(idProduct);

  return { status: 'SUCCESSFUL', data: product };
};

const delProduct = async (id) => {
  const existProduct = await productModel.findById(id);

  if (existProduct === undefined) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const deleted = await productModel.deleteP(id);

  if (deleted === 0) {
    return { status: 'ERROR', data: { message: 'ERROR' } };
  }

  return { status: 'DELETED', data: { message: 'Deleted successful' } };
};
  
module.exports = {
  findAllProducts,
  findProductId,
  newProducts,
  updateProduct,
  delProduct,
};