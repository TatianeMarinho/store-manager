const DATE = '2023-10-20T01:02:25.000Z';

const salesAllMock = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE,
    productId: 3,
    quantity: 15,
  },
];

const saleIdMock = {
  sale: 9,
};

const saleMock = [
  {
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    date: DATE,
    productId: 2,
    quantity: 10,
  },
];

const salesProductIdNotMock = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesQuantityNotMock = [
  {
    productId: 1 },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesQuantityMenorMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 0,
  },
];

const saleBodyMock = [
  {
    productId: 1,
    quantity: 19,
  },
];

const saleBodyNotProductMock = [
  {
    productId: 99,
    quantity: 19,
  },
];

const newSaleInsertSpMock = {
  date: '2023-10-24T13:56:29.000Z',
  productId: 1,
  quantity: 19,
};

const newSaleResultMock = {
  id: 9,
  itemsSold: saleBodyMock,
};

module.exports = {
  salesAllMock,
  saleMock,
  saleBodyMock,
  saleIdMock,
  salesProductIdNotMock,
  salesQuantityNotMock,
  salesQuantityMenorMock,
  newSaleInsertSpMock,
  newSaleResultMock,
  saleBodyNotProductMock,
};