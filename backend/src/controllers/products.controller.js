const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

// retorna todos os produtos
const productListAll = async (_req, res) => {
  const { status, data } = await productsService.findAllProducts();
    
  return res.status(mapStatusHTTP(status)).json(data);
};

// retorna um produto por id
const productId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findProductId(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createdProduct = async (req, res) => {
  const { body } = req;
  const { data, status } = await productsService.newProducts(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  productListAll,
  productId,
  createdProduct,
};