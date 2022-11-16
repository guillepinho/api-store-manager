// Test Logics
const { expect } = require('chai');
const sinon = require('sinon');

// Software Logic
const productsModel = require('../../../src/models/products.model');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.services');

// Mocks
const {
  okSaleToRegister,
  okReturn,
  badSaleToRegisterRequired,
  badSaleToRegisterInvalidValues,
  badSaleToRegisterProduct404,
  listAllSales,
  listSaleById,
  updateBody,
  updatedSaleObject,
  badUpdateBody,
} = require('./mocks/salesServices.mock');

const REQUIRED_FIELD = 'REQUIRED_FIELD';
const REQUIRED_FIELD_TEXT = '"productId" is required';
const INVALID_VALUES = 'INVALID_VALUES';
const INVALID_VALUES_TEXT = '"quantity" must be greater than or equal to 1';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
const PRODUCT_NOT_FOUND_TEXT = 'Product not found';
const SALE_NOT_FOUND = 'SALE_NOT_FOUND';
const SALE_NOT_FOUND_TEXT = 'Sale not found';

// Tests
describe('Teste do Service do Sales', function () {
  describe('Teste do registerSale()', async function () {
    it('Testa o registro de um produto com sucesso', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(42);
      sinon.stub(salesModel, 'insertSaleProduct').resolves();
      sinon.stub(productsModel, 'findBy').resolves('ok');

      const result = await salesService.registerSale(okSaleToRegister);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(okReturn);
    });

    it('Testa o registro de um produto com falha - sem productId', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(42);
      const result = await salesService.registerSale(badSaleToRegisterRequired);
      expect(result.type).to.equal(REQUIRED_FIELD);
      expect(result.message).to.equal(REQUIRED_FIELD_TEXT);
    });

    it('Testa o registro de um produto com falha - valor inválido', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(42);
      const result = await salesService.registerSale(badSaleToRegisterInvalidValues);
      expect(result.type).to.equal(INVALID_VALUES);
      expect(result.message).to.equal(INVALID_VALUES_TEXT);
    });

    it('Testa o registro de um produto com falha - produto inexistente', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(42);
      sinon.stub(salesModel, 'insertSaleProduct').resolves();
      sinon.stub(productsModel, 'findBy').resolves(undefined);

      const result = await salesService.registerSale(badSaleToRegisterProduct404);
      expect(result.type).to.equal(PRODUCT_NOT_FOUND);
      expect(result.message).to.deep.equal(PRODUCT_NOT_FOUND_TEXT);
    });
  });

  describe('Teste do getAllSales()', function () {
    it('Testa se é possível listar todas as vendas', async function () {
      sinon.stub(salesModel, 'findSales').resolves(listAllSales);
      const result = await salesService.getAllSales();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listAllSales);
    });
  });

  describe('Teste do getSalesById()', function () {
    it('Testa se é possível listar vendas pelo Id', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves(listSaleById);
      const result = await salesService.getSalesById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listSaleById);
    });

    it('Testa a falha de Id de Sales inexistente', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves([]);
      const result = await salesService.getSalesById(900);
      expect(result.type).to.equal(SALE_NOT_FOUND);
      expect(result.message).to.deep.equal(SALE_NOT_FOUND_TEXT);
    });
  });

  describe('Teste do updateSale()', function () {
    it('Testa se é possível atualizar com sucesso', async function () {
      sinon.stub(salesModel, 'update').resolves(1);
      sinon.stub(salesModel, 'findSalesById').resolves('ok');
      sinon.stub(productsModel, 'findBy').resolves('ok');
      const result = await salesService.updatedSale(1, updateBody);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedSaleObject);
    });

    it('Testa erro de schema inválido', async function () {
      const result = await salesService.updatedSale(1, badUpdateBody);
      expect(result.type).to.equal('REQUIRED_FIELD');
      expect(result.message).to.deep.equal('"productId" is required');
    });

    it('Teste de erro de venda não encontrada', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves([]);
      const result = await salesService.updatedSale(100, updateBody);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Testa de erro de produto não encontrado', async function () {
      sinon.stub(salesModel, 'update').resolves(1);
      sinon.stub(salesModel, 'findSalesById').resolves('ok');
      sinon.stub(productsModel, 'findBy').resolves(undefined);
      const result = await salesService.updatedSale(1, updateBody);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Teste do removeSale()', function () {
    it('Testa se é possível remover vendas pelo Id', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves(listSaleById);
      sinon.stub(salesModel, 'remove').resolves(1);
      const result = await salesService.removeSale(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(null);
    });

    it('Testa a falha de Id de Sales inexistente', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves([]);
      const result = await salesService.removeSale(900);
      expect(result.type).to.equal(SALE_NOT_FOUND);
      expect(result.message).to.deep.equal(SALE_NOT_FOUND_TEXT);
    });
  });

  afterEach(sinon.restore);
});