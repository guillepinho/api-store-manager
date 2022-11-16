const { productSchema, salesSchema } = require('./schemas');

const validateNewProductSchema = (name) => {
  const { error } = productSchema.validate(name);
  if (!error) return { type: null, message: '' };
  switch (error.details[0].type) {
    case 'string.min':
      return { type: 'INVALID_VALUES', message: error.message };
    default:
      return { type: 'REQUIRED_FIELD', message: error.message };
  }
};

const validateNewSaleSchema = (sales) => {
  const { error } = salesSchema.validate(sales);
  if (!error) return { type: null, message: '' };
  switch (error.details[0].type) {
    case 'any.required':
      return { type: 'REQUIRED_FIELD', message: error.message };
    default:
      return { type: 'INVALID_VALUES', message: error.message };
  }
};

module.exports = {
  validateNewProductSchema,
  validateNewSaleSchema,
};