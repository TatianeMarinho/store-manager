const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesAllMock, saleMock } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Deve retornar todas as vendas e status da requisição - sucesso', async function () {
    // Configurar um mock para salesService.findAllsales
    const findAllSalesMock = sinon.stub(salesService, 'findAllSales');
    findAllSalesMock.resolves({ status: 'SUCCESSFUL', data: salesAllMock });
      
    // Criar um objeto de requisição simulado
    const req = {};
      
    // Criar um objeto de resposta simulado com funções status e json
    const res = {
      status: sinon.stub().returnsThis(), // Para encadear as chamadas
      json: sinon.stub().returnsThis(),
    };
      
    // Chamar a função do controlador
    await salesController.salesListAll(req, res);
    
    // testo o retorno esperado
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesAllMock);
  });
  
  it('Deve retornar status not found com um array vazio = falha', async function () {
    const findAllSalesMock = sinon.stub(salesService, 'findAllSales');
    findAllSalesMock.resolves({ status: 'NOT_FOUND', data: { message: 'Sale Not Found' } });
      
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await salesController.salesListAll(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale Not Found' });
  });

  it('Deve retornar uma venda por id e status da requisiçao - sucesso', async function () {
    const findSaleIdMock = sinon.stub(salesService, 'findSaleId');
    findSaleIdMock.resolves({ status: 'SUCCESSFUL', data: saleMock });
      
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await salesController.saleId(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMock);
  });

  it('Buscando uma venda por id sem sucesso e retornando seu status correto', async function () {
    const findSalesIdMock = sinon.stub(salesService, 'findSaleId');
    findSalesIdMock.resolves({ status: 'NOT_FOUND', data: { message: 'Sale Not Found' } });
      
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
      
    await salesController.saleId(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale Not Found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});