const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  productSchema,
  salesSchema,
};
