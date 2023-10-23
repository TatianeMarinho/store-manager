const Joi = require('joi');

const productNameSchema = Joi.object({
  // valida se o campo name é uma string com mais de 5 caracteres e obrigatoria.
  name: Joi.string().min(5).required(),
});

module.exports = {
  productNameSchema,
};