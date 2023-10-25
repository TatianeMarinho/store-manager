const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productAllMock, productMock, productNewMock, updateMock } = require('../mocks/products.mock');
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
    sinon.stub(connection, 'execute').resolves([[productMock]]);
    const id = 2;

    const product = await productModel.findById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productMock);
  });

  it('Inserindo um novo produto com sucesso', async function () {
    const id = {
      insertId: 5,
    };

    sinon.stub(connection, 'execute').resolves([id]);
    
    const product = await productModel.insert(productNewMock);

    expect(product).to.be.an('number');
    expect(product).to.be.deep.equal(5);
  });

  it('Atualizando um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(1);
    
    const product = await productModel.update(updateMock, 1);

    expect(product).to.be.an('number');
    expect(product).to.be.deep.equal(1);
  });

  it('Deletando um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(1);
    
    const product = await productModel.deleteP(1);

    expect(product).to.be.an('number');
    expect(product).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});