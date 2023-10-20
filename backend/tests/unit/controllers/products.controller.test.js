const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productAllMock, productMock } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Deve retornar todos os produtos e status da requisição - sucesso', async function () {
    // Configurar um mock para productsService.findAllProducts
    const findAllProductsMock = sinon.stub(productsService, 'findAllProducts');
    findAllProductsMock.resolves({ status: 'SUCCESSFUL', data: productAllMock });
      
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
    const findAllProductsMock = sinon.stub(productsService, 'findAllProducts');
    findAllProductsMock.resolves({ status: 'NOT_FOUND', data: { message: 'Product Not Found' } });
      
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
    const findProductIdMock = sinon.stub(productsService, 'findProductId');
    findProductIdMock.resolves({ status: 'SUCCESSFUL', data: productMock });
      
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
    const findProductIdMock = sinon.stub(productsService, 'findProductId');
    findProductIdMock.resolves({ status: 'NOT_FOUND', data: { message: 'Product Not Found' } });
      
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await productsController.productId(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product Not Found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});