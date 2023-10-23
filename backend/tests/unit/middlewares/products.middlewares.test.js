const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productNewMock } = require('../mocks/products.mock');
const { validateName } = require('../../../src/middlewares/validateProducts');

describe('Realizando testes - PRODUCTS MIDDLEWARES:', function () {
  it('Valindando objeto de inserir produtos (name) - campo válido', async function () {
    const next = sinon.stub().returns();

    const req = { 
      paramns: {},
      body: productNewMock,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateName(req, res, next);
  
    expect(next).to.have.been.calledWith();
  });

  it('Valindando objeto de inserir produtos (name) - campo undefined', async function () {
    const next = sinon.stub().returns();

    const req = { 
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateName(req, res, next);
  
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Valindando objeto de inserir produtos (name) - campo com menos de 5 caracteres', async function () {
    const next = sinon.stub().returns();

    const req = { 
      params: {},
      body: { name: 'pá' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateName(req, res, next);
  
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});