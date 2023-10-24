const Joi = require('joi');

const newSaleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  newSaleSchema,
};