const connection = require('./connection');
const { getFormattedColumnNames, getFormattedPlaceholders } = require('../utils/generateFunctions');

// lista todos os produtos
const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

// filtra por id e retorna este produto
const findById = async (productId) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM products
      WHERE id = ?;`, 
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products(${columns}) VALUE (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);
  return insertId;
};

const update = async (product, productId) => {
  const up = connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;',
    [product, productId],
  );
  return up;
};

const deleteP = async (id) => {
  const del = connection.execute(
    'DELETE FROM products WHERE id = ?;',
    [id],
  );
  return del;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteP,
};