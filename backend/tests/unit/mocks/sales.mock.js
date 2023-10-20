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

module.exports = {
  salesAllMock,
  saleMock,
};