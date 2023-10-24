const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesProductIdNotMock, salesQuantityNotMock, salesQuantityMenorMock } = require('../mocks/sales.mock');
const { validateSales } = require('../../../src/middlewares/validateSales');

describe('Realizando testes - VALUES MIDDLEWARES:', function () {
  it('Valindando objeto de inserir vendas (productId) - campo não existe', async function () {
    const next = sinon.stub().returns();

    const req = { 
      paramns: {},
      body: salesProductIdNotMock,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateSales(req, res, next);
  
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Valindando objeto de inserir vendas (quantity) - campo não existe', async function () {
    const next = sinon.stub().returns();

    const req = { 
      params: {},
      body: salesQuantityNotMock,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateSales(req, res, next);
  
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Valindando objeto de inserir vendas (quantity) - campo menor ou igual a 0', async function () {
    const next = sinon.stub().returns();

    const req = { 
      params: {},
      body: salesQuantityMenorMock,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateSales(req, res, next);
  
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  afterEach(function () {
    sinon.restore();
  });
});