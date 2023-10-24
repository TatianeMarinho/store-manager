const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

// retorna todas as vendas
const salesListAll = async (_req, res) => {
  const { status, data } = await salesService.findAllSales();
    
  return res.status(mapStatusHTTP(status)).json(data);
};

// retorna uma venda especifica
const saleId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findSaleId(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createSales = async (req, res) => {
  const { body } = req;

  const { status, data } = await salesService.newSale(body);

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  salesListAll,
  saleId,
  createSales,
};