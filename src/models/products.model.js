const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result);
};

const findBy = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (name, productId) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, productId],
  );
  return affectedRows;
};

const remove = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

const search = async (searchTerm) => {
  const [result] = await connection.execute(
    `SELECT * FROM products WHERE name LIKE "%${searchTerm}%"`,
  );
  return result;
};

module.exports = {
  findAll,
  findBy,
  insert,
  update,
  remove,
  search,
};