const { productsModel } = require('../models');
const { validateNewProductSchema } = require('./validations/inputs');
const verifyProductExists = require('./validations/verifyProductExists');

const getAllProducts = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const product = await productsModel.findBy(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const registerProduct = async (body) => {
  const error = validateNewProductSchema(body);
  if (error.type) return error;
  const newProductId = await productsModel.insert(body.name);
  const productData = await getProductById(newProductId);
  const { message } = productData;
  return { type: null, message };
};

const updateProduct = async (toUpdateData) => {
  const { name, productId } = toUpdateData;
  const error = validateNewProductSchema({ name });
  if (error.type) return error;
  const verifyProducts = await verifyProductExists([{ productId }]);
  if (verifyProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.update(name, productId);
  const productData = await getProductById(productId);
  const { message } = productData;
  return { type: null, message };
};

const deleteProduct = async (toDeleteData) => {
  const { productId } = toDeleteData;
  const verifyProducts = await verifyProductExists([{ productId }]);
  if (verifyProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.remove(productId);
  return { type: null, message: null };
};

const searchProduct = async (searchTerm) => {
  const search = await productsModel.search(searchTerm);
  return { type: null, message: search };
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};