const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAll();
  
  if (sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale Not Found' } };
  }
  
  return { status: 'SUCCESSFUL', data: sales };
};

const findSaleId = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  // lembrando que o retorno é um array com dois arrays dentro
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  findAllSales,
  findSaleId,
};