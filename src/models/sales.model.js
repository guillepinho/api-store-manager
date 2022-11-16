const camelize = require('camelize');
const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
};

const findSales = async () => {
  const [sales] = await connection.execute(
    `SELECT s.id AS sale_id, s.date, sp.product_id, sp.quantity FROM sales s
    INNER JOIN sales_products sp
    ON s.id = sp.sale_id
    ORDER BY sale_id ASC, sp.product_id ASC`,
  );
  return camelize(sales);
};

const findSalesById = async (salesId) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales s
    INNER JOIN sales_products sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sale_id ASC, sp.product_id ASC`,
    [salesId],
  );
  return camelize(sale);
};

const update = async (salesId, saleData) => {
  const { productId, quantity } = saleData;
  const [{ affectedRows }] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, salesId, productId],
  );
  return affectedRows;
};

const remove = async (salesId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [salesId],
  );
  return affectedRows;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  findSales,
  findSalesById,
  update,
  remove,
};