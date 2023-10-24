const { productNameSchema } = require('./productSchema');

const validateName = (req, res, next) => {
  // valida a requisicao do body
  const { error } = productNameSchema.validate(req.body);

  // verifica se possui algum erro que tenha o tem a palavra required
  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }

  // verifica se tem algum erro
  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateName,
};