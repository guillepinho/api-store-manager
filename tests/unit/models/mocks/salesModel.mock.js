const mockSale = {
  saleId: 10,
  productId: 1,
  quantity: 10,
};

const mockedSQLQuery = "INSERT INTO sales_products (sale_id, product_id, quantity)\n      VALUES (?, ?, ?)";

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

const updateBody = {
  productId: 1,
  quantity: 20,
};

module.exports = {
  mockSale,
  mockedSQLQuery,
  listAllSales,
  listSaleById,
  updateBody,
};