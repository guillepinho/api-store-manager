// Test Logics
const { expect } = require('chai');
const sinon = require('sinon');

// Software Logic
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

// Mocks
const {
  mockSale,
  mockedSQLQuery,
  listAllSales,
  listSaleById,
  updateBody,
} = require('./mocks/salesModel.mock');

// Tests
describe('Teste do Model de Sales', function () {
  describe('Teste do insertSale()', function () {
    it('Testa se é possível inserir uma nova venda na tabela sales', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
      const result = await salesModel.insertSale();
      expect(result).to.be.equal(42);
    });
  });

  describe('Teste do insertSaleProduct()', function () {
    it('Testa se é possível inserir uma nova venda com seus dados na tabela sales', async function () {
      sinon.stub(connection, 'execute').resolves();
      await salesModel.insertSaleProduct(mockSale);
      expect(connection.execute).to.be.calledWith(mockedSQLQuery, [mockSale.saleId, mockSale.productId, mockSale.quantity])
    });
  });

  describe('Teste do findSales()', function () {
    it('Testa se é listada todas as vendas realizadas', async function () {
      sinon.stub(connection, 'execute').resolves([listAllSales]);
      const result = await salesModel.findSales();
      expect(result).to.deep.equal(listAllSales);
    });
  });

  describe('Teste do findSalesById()', function () {
    it('Testa se é listada vendas existentes pelo Id', async function () {
      sinon.stub(connection, 'execute').resolves([listSaleById]);
      const result = await salesModel.findSalesById(1);
      expect(result).to.deep.equal(listSaleById);
    });
  });

  describe('Teste do update()', function () {
    it('Testa se a venda é atualizada', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.update(1, updateBody);
      expect(result).to.deep.equal(1);
    });
  });

  describe('Teste do remove()', function () {
    it('Testa se deletada a venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.remove(1);
      expect(result).to.deep.equal(1);
    });
  });

  afterEach(sinon.restore);
});