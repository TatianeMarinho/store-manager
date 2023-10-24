const { newSaleSchema } = require('./saleSchema');

const validateSales = (req, res, next) => {
  const messageError = [];
  const { body } = req;
  
  body.forEach((object) => {
    // percorro o array para validar se o objeto esta correto
    const { error } = newSaleSchema.validate(object);
    // passo o erro encontrado para o array criado para guardar os erros
    if (error) {
      messageError.push(error.message);
    }
  });
  // confirmo se tem um erro e se ele tem a palavra required para categorizar o retorno status do erro
  if (messageError.length > 0 && messageError[0].includes('required')) {
    return res.status(400).json({ message: messageError[0] });
  }
  // se nao tiver o required mas ainda tiver erro retorno o status adequado
  if (messageError.length > 0) {
    return res.status(422).json({ message: messageError[0] });
  }

  next();
};

module.exports = {
  validateSales,
};