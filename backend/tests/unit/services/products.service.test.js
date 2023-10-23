const { expect } = require('chai');
const sinon = require('sinon');
const { productAllMock, productMock, statusNotFoundMock, createdProductMock, productNewMock } = require('../mocks/products.mock');
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

    const products = await productsService.findAllProducts();

    expect(products.status).to.be.equal('NOT_FOUND');
    expect(products.data).to.deep.equal(statusNotFoundMock);
  });

  it('Buscando um produto por id com sucesso e retonando o status correto', async function () {
    sinon.stub(productModel, 'findById').resolves(productMock);
    const id = 2;

    const product = await productsService.findProductId(id);

    expect(product.status).to.be.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(productMock);
  });

  it('Buscando um produto por id sem sucesso e retornando seu status correto', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const id = 999;

    const product = await productsService.findProductId(id);

    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.deep.equal(statusNotFoundMock);
  });

  it('Inserindo um novo producto com sucesso e retornando seu status correto', async function () {
    sinon.stub(productModel, 'insert').resolves(5);
    sinon.stub(productModel, 'findById').resolves(createdProductMock);

    const newProduct = await productsService.newProducts(productNewMock);
  
    expect(newProduct.status).to.be.equal('CREATED');
    expect(newProduct.data).to.be.deep.equal(createdProductMock);
    expect(newProduct.data.id).to.be.equal(5);
    expect(newProduct.data.name).to.be.equal('ProdutoQ');
    expect(newProduct.data).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});
