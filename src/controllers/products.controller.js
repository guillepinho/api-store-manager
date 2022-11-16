const { productsServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const OK = 200;
const CREATED = 201;
const DELETED = 204;

const listProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(OK).json(message);
};

const listProductById = async (req, res) => {
  const { productId } = req.params;
  const { type, message } = await productsServices.getProductById(productId);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(OK).json(message);
};

const registerNewProduct = async (req, res) => {
  const { body } = req;
  const { type, message } = await productsServices.registerProduct(body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { body: { name } } = req;
  const { productId } = req.params;
  const { type, message } = await productsServices.updateProduct({ name, productId });
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(OK).json(message);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { type, message } = await productsServices.deleteProduct({ productId });
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(DELETED).json();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsServices.searchProduct(q);
  return res.status(OK).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};