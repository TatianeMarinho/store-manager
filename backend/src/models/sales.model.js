const connection = require('./connection');

// lista todos as vendas 
const findAll = async () => {
  const [sales] = await connection.execute(`
    SELECT 
    sp.sale_id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity FROM sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;`);
  return sales;
};
  
// filtra por id e retorna uma venda
const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT 
    s.date,
    sp.product_id AS productId,
    sp.quantity FROM sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id
    WHERE s.id = ?
    ORDER BY sp.sale_id, sp.product_id;`, 
    [saleId],
  );
  return sale;
};

// crio a nova compra na tabela sales que recebi um id automatico e uma data com hora da compra.
const insertSales = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW());';

  const [sale] = await connection.execute(query);

  return sale;
};

// insiro a nova compra na tabela sales_products que recebe o id da sales e a quantidade de cada produto comprado e id do produto
const insertSp = async (saleId, producId, quantity) => {
  const querySp = `INSERT INTO sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`;

  await connection.execute(querySp, [saleId, producId, quantity]);
};

module.exports = {
  findAll,
  findById,
  insertSales,
  insertSp,
};