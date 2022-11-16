const { salesModel } = require('../../models');

const verifySaleExists = async (salesId) => {
  const sale = await salesModel.findSalesById(salesId);
  if (sale.length === 0) return true;
  return false;
};

module.exports = verifySaleExists;