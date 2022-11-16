const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  SERVER_ERROR: 500,
  REQUIRED_FIELD: 400,
  INVALID_VALUES: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
