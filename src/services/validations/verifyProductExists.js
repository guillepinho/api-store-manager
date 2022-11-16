const { productsModel } = require('../../models');

const verifyProductExists = async (list) => {
  const findEachProduct = list.map(async ({ productId }) => {
    const eachProduct = await productsModel.findBy(productId);
    return eachProduct;
  });
  const listOfProducts = await Promise.all(findEachProduct);
  const error = listOfProducts.some((prod) => prod === undefined);
  if (error) return true;
  return false;
};

module.exports = verifyProductExists;