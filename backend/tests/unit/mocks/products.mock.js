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
  id: 1,
  name: 'Martelo de Thor',
};

const productNewMock = {
  name: 'ProdutoQ',
};

const createdProductMock = {
  id: 5,
  name: 'ProdutoQ',
};

const statusNotFoundMock = { message: 'Product not found' };

const updateMock = {
  name: 'Martelo do Batman',
};

const updateResultMock = {
  id: 1,
  name: 'Martelo do Batman',
};

module.exports = {
  productAllMock,
  productMock,
  productNewMock,
  statusNotFoundMock,
  createdProductMock,
  updateMock,
  updateResultMock,
};