const { salesModel } = require('../models');
const { validateNewSaleSchema } = require('./validations/inputs');
const verifyProductExists = require('./validations/verifyProductExists');
const verifySaleExists = require('./validations/verifySaleExists');

const registerSale = async (salesData) => {
  for (let i = 0; i <= salesData.length - 1; i += 1) {
    const error = validateNewSaleSchema(salesData[i]);
    if (error.type) return error;
  }
  const verifyProducts = await verifyProductExists(salesData);
  if (verifyProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const id = await salesModel.insertSale();
  const itemsSold = [];
  salesData.forEach(async ({ productId, quantity }) => {
    itemsSold.push({ productId, quantity });
    await salesModel.insertSaleProduct({ saleId: id, productId, quantity });
  });
  const salesDataToReturn = {
    id,
    itemsSold,
  };
  return { type: null, message: salesDataToReturn };
};

const getAllSales = async () => {
  const sales = await salesModel.findSales();
  return { type: null, message: sales };
};

const getSalesById = async (salesId) => {
  const sale = await salesModel.findSalesById(salesId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const updatedSale = async (salesId, salesData) => {
  const itemsUpdated = [];
  for (let i = 0; i <= salesData.length - 1; i += 1) {
    const error = validateNewSaleSchema(salesData[i]);
    if (error.type) return error;
  }
  const sale = await verifySaleExists(salesId);
  if (sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  const verifyProducts = await verifyProductExists(salesData);
  if (verifyProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const updates = salesData.map(async (saleData) => {
    const { productId, quantity } = saleData;
    itemsUpdated.push({ productId, quantity });
    await salesModel.update(salesId, saleData);
  });
  await Promise.all(updates);
  return { type: null, message: { saleId: salesId, itemsUpdated } };
};

const removeSale = async (salesId) => {
  const sale = await verifySaleExists(salesId);
  if (sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await salesModel.remove(salesId);
  return { type: null, message: null };
};

module.exports = {
  registerSale,
  getAllSales,
  getSalesById,
  removeSale,
  updatedSale,
};