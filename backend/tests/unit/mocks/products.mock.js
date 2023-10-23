const productAllMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productMock = {
  id: 2,
  name: 'Traje de encolhimento',
};

const productNewMock = {
  name: 'ProdutoQ',
};

const createdProductMock = {
  id: 5,
  name: 'ProdutoQ',
};

const statusNotFoundMock = { message: 'Product not found' };

module.exports = {
  productAllMock,
  productMock,
  productNewMock,
  statusNotFoundMock,
  createdProductMock,
};