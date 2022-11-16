// Test Logics
const { expect } = require('chai');
const sinon = require('sinon');

// Software Logic
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

// Mocks
const {
  listOfProducts,
  thorProduct,
  newProduct,
} = require('./mocks/productsModel.mocks');

// Tests
describe('Teste do Model de Products', function () {
  describe('Teste do findAll()', function () {
    it('Testa se é possível recuperar a lista completa de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([listOfProducts]);
      const result = await productsModel.findAll();
      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(listOfProducts);
    });
  });

  describe('Teste do findById()', function () {
    it('Testa se é possível recuperar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([[thorProduct]]);
      const result = await productsModel.findBy(1);
      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(thorProduct);
    });
  });

  describe('Teste do insert()', function () {
    it('Teste se é possível cadastrar um novo produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
      const result = await productsModel.insert(newProduct.name);
      expect(result).to.be.a('number');
      expect(result).to.equal(42);
    });
  });

  describe('Teste do update()', function () {
    it('Teste se é possível atualizar um novo produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.update(newProduct.name, 1);
      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  describe('Teste do remove()', function () {
    it('Teste se é possível deletar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.remove(1);
      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  describe('Teste do search()', function () {
    it('Testa se é possível buscar pelo nome', async function () {
      sinon.stub(connection, 'execute').resolves([[thorProduct]]);
      const result = await productsModel.search('Martelo');
      expect(result).to.be.a('array');
      expect(result).to.deep.equal([thorProduct]);
    });
  });

  afterEach(sinon.restore);
});