const { salesServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const OK = 200;
const CREATED = 201;
const DELETED = 204;

const registerNewSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesServices.registerSale(body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(CREATED).json(message);
};

const listAllSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  return res.status(OK).json(message);
};

const listSaleById = async (req, res) => {
  const { saleId } = req.params;
  const { type, message } = await salesServices.getSalesById(saleId);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(OK).json(message);
};

const updateSale = async (req, res) => {
  const { saleId } = req.params;
  const { body } = req;
  const { type, message } = await salesServices.updatedSale(saleId, body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(OK).json(message);
};

const removeSale = async (req, res) => {
  const { saleId } = req.params;
  const { type, message } = await salesServices.removeSale(saleId);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(DELETED).json();
};

module.exports = {
  registerNewSale,
  listAllSales,
  listSaleById,
  updateSale,
  removeSale,
};