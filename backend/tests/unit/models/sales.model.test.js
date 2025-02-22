const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesAllMock, saleMock, saleIdMock } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Realizando testes - SALES MODEL:', function () {
  it('Buscando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesAllMock]);

    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesAllMock);
  });

  it('Buscando uma venda por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleMock]);
    const id = 2;

    const sale = await salesModel.findById(id);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleMock);
  });

  it('Inserindo uma venda com sucesso - insertSales', async function () {
    sinon.stub(connection, 'execute').resolves([saleIdMock]);

    const sale = await salesModel.insertSales();

    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(saleIdMock);
  });

  it('Inserindo uma lista de vendas com sucesso - insertSp', async function () {
    const result = sinon.stub(connection, 'execute').resolves([]);

    await salesModel.insertSp([]);

    expect(result.called);
  });

  afterEach(function () {
    sinon.restore();
  }); 
});