// Test Logics
const { expect } = require('chai');
const sinon = require('sinon');

// Software Logic
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.services');

// Mocks
const { listOfProducts, thorProduct } = require('./mocks/productsServices.mock');

// Tests
describe('Teste do Service de Products', function () {
  describe('Teste do getAllProducts', function () {
    it('Teste de retorno com sucesso', async function () {
      sinon.stub(productsModel, 'findAll').resolves(listOfProducts);
      const result = await productsServices.getAllProducts();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listOfProducts);
    });
  });

  describe('Teste do getProductById', function () {
    it('Teste de retorno com sucesso', async function () {
      sinon.stub(productsModel, 'findBy').resolves(thorProduct);
      const result = await productsServices.getProductById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(thorProduct);
    });

    it('Teste de retorno com erro', async function () {
      sinon.stub(productsModel, 'findBy').resolves();
      const result = await productsServices.getProductById(88);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('Teste do registerProduct()', function () {
    it('Teste de retorno com sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 42 }]);
      sinon.stub(productsModel, 'findBy').resolves({ id: 42, name: 'Test Prod' });
      const result = await productsServices.registerProduct({ name: 'Test Prod' });
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 42, name: 'Test Prod' });
    });

    it('Teste de retorno com falha de nome curto', async function () {
      const result = await productsServices.registerProduct({ name: 'Test' });
      expect(result.type).to.equal('INVALID_VALUES');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });

    it('Teste de retorno com falha de ausência de nome', async function () {
      const result = await productsServices.registerProduct({ test: 'Teste Prod' });
      expect(result.type).to.equal('REQUIRED_FIELD');
      expect(result.message).to.deep.equal('"name" is required');
    });
  });

  describe('Teste do updateProduct()', function () {
    it('Teste de retorno com sucesso', async function () {
      sinon.stub(productsModel, 'update').resolves([{ affectedRows: 1 }]);
      sinon.stub(productsModel, 'findBy').resolves({ id: 42, name: 'Test Prod' });
      const result = await productsServices.updateProduct({ name: 'Test Prod', productId: 42 });
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 42, name: 'Test Prod' });
    });

    it('Teste de retorno com falha de ausência de nome', async function () {
      const result = await productsServices.updateProduct({ nam: 'Test Prod', productId: 42 });
      expect(result.type).to.equal('REQUIRED_FIELD');
      expect(result.message).to.deep.equal('"name" is required');
    });

    it('Teste de retorno com falha por produto inexistente', async function () {
      sinon.stub(productsModel, 'update').resolves([{ affectedRows: 1 }]);
      sinon.stub(productsModel, 'findBy').resolves(undefined);
      const result = await productsServices.updateProduct({ name: 'Test Prod', productId: 900 });
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Teste do updateProduct()', function () {
    it('Teste de remoção com sucesso', async function () {
      sinon.stub(productsModel, 'remove').resolves(1);
      sinon.stub(productsModel, 'findBy').resolves({ id: 42, name: 'Test Prod' });
      const result = await productsServices.deleteProduct({ productId: 42 });
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(null);
    });

    it('Teste de remoção com falha', async function () {
      sinon.stub(productsModel, 'findBy').resolves(undefined);
      const result = await productsServices.deleteProduct({ productId: 900 });
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Teste do searchProduct()', async function () {
    it('Teste de busca com sucesso', async function () {
      sinon.stub(productsModel, 'search').resolves([thorProduct]);
      const result = await productsServices.searchProduct('Martelo');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([thorProduct]);
    });
  });

  afterEach(sinon.restore);
});