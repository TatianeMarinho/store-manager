const { expect } = require('chai');
const sinon = require('sinon');
const { salesAllMock, saleMock, newSaleInsertSpMock, saleBodyMock, newSaleResultMock, saleBodyNotProductMock } = require('../mocks/sales.mock');
const { salesModel, productModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { productMock } = require('../mocks/products.mock');

describe('Realizando testes - SALES SERVICE:', function () {
  it('Buscando todas as vendas e retornando o status com sucesso', async function () {
    // mocko a função que busca os produtos em models
    sinon.stub(salesModel, 'findAll').resolves(salesAllMock);
  
    const sales = await salesService.findAllSales();
  
    expect(sales.status).to.be.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(salesAllMock);
  });
  
  it('Em caso de retornar [] ao buscar todas as vendas e retornando o status Not Found', async function () {
    // mocko a função que busca os produtos em models
    sinon.stub(salesModel, 'findAll').resolves([]);
    const dataMock = { message: 'Sale Not Found' };
     
    const sales = await salesService.findAllSales();
  
    expect(sales.status).to.be.equal('NOT_FOUND');
    expect(sales.data).to.deep.equal(dataMock);
  });

  it('Buscando uma venda por id com sucesso e retonando o status correto', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleMock);
    const id = 2;
  
    const sale = await salesService.findSaleId(id);
  
    expect(sale.status).to.be.equal('SUCCESSFUL');
    expect(sale.data).to.be.deep.equal(saleMock);
  });

  it('Buscando uma venda por id sem sucesso e retornando seu status correto', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const id = 8;
    const dataMock = { message: 'Sale not found' };
  
    const sale = await salesService.findSaleId(id);
  
    expect(sale.status).to.be.equal('NOT_FOUND');
    expect(sale.data).to.be.deep.equal(dataMock);
  });

  it('Inserindo uma nova venda com sucesso e retornando seu status correto', async function () {
    sinon.stub(salesModel, 'insertSales').resolves({ insertId: 9 });
    sinon.stub(salesModel, 'insertSp').resolves(newSaleInsertSpMock);
    sinon.stub(productModel, 'findById').resolves(productMock);

    const newSale = await salesService.newSale(saleBodyMock);
  
    expect(newSale.status).to.be.equal('CREATED');
    expect(newSale.data).to.be.deep.equal(newSaleResultMock);
  });

  it('Inserindo uma nova venda sem sucesso e retornando seu status correto - "NOT_FOUND"', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    
    const newSale = await salesService.newSale(saleBodyNotProductMock);
  
    expect(newSale.status).to.be.equal('NOT_FOUND');
    expect(newSale.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
