const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productAllMock, productMock, productNewMock, createdProductMock } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Deve retornar todos os produtos e status da requisição - sucesso', async function () {
    // Configurar um mock para productsService.findAllProducts
    sinon.stub(productsService, 'findAllProducts')
      .resolves({ status: 'SUCCESSFUL', data: productAllMock });
      
    // Criar um objeto de requisição simulado
    const req = {};
      
    // Criar um objeto de resposta simulado com funções status e json
    const res = {
      status: sinon.stub().returnsThis(), // Para encadear as chamadas
      json: sinon.stub().returnsThis(),
    };
      
    // Chamar a função do controlador
    await productsController.productListAll(req, res);
    
    // testo o retorno esperado
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productAllMock);
  });
  
  it('Deve retornar status not found com um array vazio = falha', async function () {
    sinon.stub(productsService, 'findAllProducts')
      .resolves({ status: 'NOT_FOUND', data: { message: 'Product Not Found' } });
      
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await productsController.productListAll(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product Not Found' });
  });

  it('Deve retornar um produto por id e status da requisiçao - sucesso', async function () {
    sinon.stub(productsService, 'findProductId')
      .resolves({ status: 'SUCCESSFUL', data: productMock });
      
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await productsController.productId(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('Buscando um produto por id sem sucesso e retornando seu status correto', async function () {
    sinon.stub(productsService, 'findProductId')
      .resolves({ status: 'NOT_FOUND', data: { message: 'Product Not Found' } });
      
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await productsController.productId(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product Not Found' });
  });

  it('Inserindo um novo produto e retornando um status certo - sucesso', async function () {
    sinon.stub(productsService, 'newProducts')
      .resolves({ status: 'CREATED', data: createdProductMock });
      
    const req = {
      params: { },
      body: productNewMock, 
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
      
    await productsController.createdProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createdProductMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});