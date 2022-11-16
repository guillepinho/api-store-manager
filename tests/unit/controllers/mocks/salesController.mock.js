const okSale = [
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
  itemsSold: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const okMessage = {
  type: null,
  message: okReturn,
};

const badSale = [
  {
    productId: 1,
    quantity: 0,
  },
];

const errorMessage = {
  type: 'REQUIRED_FIELD',
  message: '"productId" is required',
};

const okReturnAllSales = {
  type: null,
  message: [
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
  ],
};

const okReturnOneSale = {
  type: null,
  message: [
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
  ],
};

const badReturnOneSale = {
  type: 'SALE_NOT_FOUND',
  message: [],
}

const okUpdateSale = [
  {
    productId: 1,
    quantity: 20,
  }
];

const badUpdatedSale = [
  { productId: 900, quantity: 10 }
];

const updateBody = [{
  productId: 1,
  quantity: 20,
}];

const updatedSaleObject = {
  saleId: 1,
  itemsUpdated: updateBody,
};

module.exports = {
  okSale,
  okMessage,
  okReturn,
  badSale,
  errorMessage,
  okReturnAllSales,
  okReturnOneSale,
  badReturnOneSale,
  okUpdateSale,
  badUpdatedSale,
  updateBody,
  updatedSaleObject,
};