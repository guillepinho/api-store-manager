// Test Logics
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

// Software Logic
const salesServices = require('../../../src/services/sales.services');
const salesController = require('../../../src/controllers/sales.controller');

// Mocks
const {
  okSale,
  okMessage,
  okReturn,
  badSale,
  errorMessage,
  okReturnAllSales,
  okReturnOneSale,
  badReturnOneSale,
  okUpdateSale,
  badUpdatedSale,
  updatedSaleObject,
} = require('./mocks/salesController.mock');
const { afterEach } = require('mocha');

// Tests
describe('Teste do Controller de Sales', function () {
  describe('Teste do registerNewSale()', function () {
    it('Teste de retorno de sucesso', async function () {
      const req = { body: okSale };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'registerSale').resolves(okMessage);

      await salesController.registerNewSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(okReturn);
    });

    it('Teste de retorno com falha', async function () {
      const req = { body: badSale };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'registerSale').resolves(errorMessage);

      await salesController.registerNewSale(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  });

  describe('Teste do listAllSales()', function () {
    it('Teste de retorno de sucesso', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAllSales').resolves(okReturnAllSales);

      await salesController.listAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(okReturnAllSales.message);
    });
  });

  describe('Teste do listSalesById()', function () {
    it('Teste de retorno de sucesso', async function () {
      const req = { params: { saleId: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves(okReturnOneSale);

      await salesController.listSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(okReturnOneSale.message);
    });

    it('Teste de retorno com falha', async function () {
      const req = { params: { saleId: 900 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves(badReturnOneSale);

      await salesController.listSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: badReturnOneSale.message });
    });
  });

  describe('Teste do updateSale()', function () {
    it('Teste de retorno de sucesso', async function () {
      const req = { params: { saleId: 1 } };
      const res = { body: okUpdateSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updatedSale').resolves({
        type: null,
        message: updatedSaleObject,
      });

      await salesController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSaleObject);
    });

    it('Teste de retorno de sucesso', async function () {
      const req = { params: { saleId: 900 } };
      const res = { body: okUpdateSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updatedSale').resolves({
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Teste do removeSale()', function () {
    it('Teste de retorno de sucesso', async function () {
      const req = { params: { saleId: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'removeSale').resolves({ type: null, message: null });

      await salesController.removeSale(req, res);
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Teste de retorno com falha', async function () {
      const req = { params: { saleId: 900 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves([]);

      await salesController.removeSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(sinon.restore);
});