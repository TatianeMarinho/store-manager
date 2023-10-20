const connection = require('./connection');

// lista todos os produtos
const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

// filtra por id e retorna este produto
const findById = async (productId) => {
  const [product] = await connection.execute(
    `SELECT * FROM products
      WHERE id = ?;`, 
    [productId],
  );
  return product;
};

module.exports = {
  findAll,
  findById,
};