const okSaleToRegister = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const okReturn = {
    id: 42,
    itemsSold: okSaleToRegister,
};

const badSaleToRegisterRequired = [
  {
    quantity: 10,
  }
];

const badSaleToRegisterInvalidValues = [
  {
    productId: 1,
    quantity: 0,
  }
];

const badSaleToRegisterProduct404 = [
  {
    productId: 10000,
    quantity: 10,
  }
];

const listAllSales = [
  {
    "saleId": 1,
    "date": "2022-11-14T15:39:20.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-14T15:39:20.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-14T15:39:20.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const listSaleById = [
  {
    "date": "2022-11-14T15:43:28.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-14T15:43:28.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const updateBody = [{
  productId: 1,
  quantity: 20,
}];

const updatedSaleObject = {
  saleId: 1,
  itemsUpdated: updateBody,
};

const badUpdateBody = [{
  product: 1,
  quantity: 20,
}];

module.exports = {
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
};