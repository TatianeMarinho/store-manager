const { expect } = require('chai');
const sinon = require('sinon');
const { productAllMock, productMock } = require('../mocks/products.mock');
const { productModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Buscando todos os produtos e retornando o status com sucesso', async function () {
    // mocko a função que busca os produtos em models
    sinon.stub(productModel, 'findAll').resolves(productAllMock);

    const products = await productsService.findAllProducts();

    expect(products.status).to.be.equal('SUCCESSFUL');
    expect(products.data).to.be.deep.equal(productAllMock);
  });

  it('Em caso de retornar [] ao buscar todos os produtos retornando o status Not Found', async function () {
    // mocko a função que busca os produtos em models
    sinon.stub(productModel, 'findAll').resolves([]);
    const dataMock = { message: 'Product Not Found' };

    const products = await productsService.findAllProducts();

    expect(products.status).to.be.equal('NOT_FOUND');
    expect(products.data).to.deep.equal(dataMock);
  });

  it('Buscando um produto por id com sucesso e retonando o status correto', async function () {
    sinon.stub(productModel, 'findById').resolves([productMock]);
    const id = 2;

    const product = await productsService.findProductId(id);

    expect(product.status).to.be.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(productMock);
  });

  it('Buscando um produto por id sem sucesso e retornando seu status correto', async function () {
    sinon.stub(productModel, 'findById').resolves([]);
    const id = 8;
    const dataMock = { message: 'Product not found' };

    const product = await productsService.findProductId(id);

    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.deep.equal(dataMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});
