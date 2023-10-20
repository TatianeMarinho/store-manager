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
  
module.exports = {
  findAll,
  findById,
};