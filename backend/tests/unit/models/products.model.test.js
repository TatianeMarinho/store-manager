const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productAllMock, productMock } = require('../mocks/products.mock');
const { productModel } = require('../../../src/models');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Buscando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productAllMock]);

    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productAllMock);
  });

  it('Buscando um produto por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productMock]);
    const id = 2;

    const product = await productModel.findById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});