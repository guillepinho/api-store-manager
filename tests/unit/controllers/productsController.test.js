// Test Logics
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

// Software Logic
const productsServices = require('../../../src/services/products.services');
const productsController = require('../../../src/controllers/products.controller');
const index = require('../../../src/controllers');

// Mocks
const { listOfProducts, thorProduct } = require('./mocks/productsController.mock');

// Tests
describe('Teste do Controller de Products', function () {
  describe('Teste da listProducts()', function () {
    it('Testa o retorno de mensagem de sucesso', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAllProducts').resolves({ type: null, message: listOfProducts })

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listOfProducts);
    });
  });

  describe('Teste da listProductById()', function () {
    it('Testa o retorno de mensagem de sucesso', async function () {
      const res = {};
      const req = { params: { productID: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProductById').resolves({ type: null, message: thorProduct })

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(thorProduct);
    });

    it('Testa o retorno de mensagem de falha', async function () {
      const res = {};
      const req = { params: { productID: 88 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([]);
      sinon.stub(productsServices, 'getProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Teste do registerNewProduct()', function () {
    it('Teste de retorno com sucesso', async function () {
      const res = {};
      const req = { body: { name: 'Teste prod' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ id: 42, name: 'Teste prod' });
      sinon.stub(productsServices, 'registerProduct').resolves({ type: null, message: { id: 42, name: 'Test prod' } });

      await productsController.registerNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 42, name: 'Test prod' });
    });

    it('Teste de retorno com falha', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'registerProduct').resolves({ type: 'REQUIRED_FIELD', message: '"name" is required' });

      await productsController.registerNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('Teste do updateProduct()', function () {
    it('Teste de retorno com sucesso', async function () {
      const res = {};
      const req = {
        body: { name: 'Teste prod' },
        params: { productId: 42 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ id: 42, name: 'Teste prod' });
      sinon.stub(productsServices, 'updateProduct').resolves({ type: null, message: { id: 42, name: 'Test prod' } });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 42, name: 'Test prod' });
    });

    it('Teste de retorno com falha', async function () {
      const res = {};
      const req = {
        body: { nam: 'Teste Prod' },
        params: { productId: 42 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'updateProduct').resolves({ type: 'REQUIRED_FIELD', message: '"name" is required' });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('Teste do deleteProduct()', function () {
    it('Teste de retorno com sucesso', async function () {
      const res = {};
      const req = { params: { productId: 42 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteProduct').resolves({ type: null, message: null });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Teste de retorno com falha', async function () {
      const res = {};
      const req = { params: { productID: 900 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Teste do searchProduct()', function () {
    it('Teste de busca de produtos', async function () {
      const res = {};
      const req = { query: { q: 'Martelo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([thorProduct]);
      sinon.stub(productsServices, 'searchProduct').resolves({ type: null, message: [thorProduct] });

      await index.productsController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([thorProduct]);
    });
  });

  afterEach(sinon.restore);
});