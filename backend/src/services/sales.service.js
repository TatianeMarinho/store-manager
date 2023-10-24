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

const newSale = async (sales) => {
  const { insertId } = await salesModel.insertSales();

  if (Array.isArray(sales)) {
    sales.forEach(async (object) => {
      const { productId, quantity } = object;
      await salesModel.insertSp(insertId, productId, quantity);
    });
    const result = {
      id: insertId,
      itemsSold: sales,
    };
  
    return { status: 'CREATED', data: result };
  }
};

module.exports = {
  findAllSales,
  findSaleId,
  newSale,
};