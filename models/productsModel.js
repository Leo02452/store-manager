const db = require('./db');

const productsModel = {
  async list() {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await db.query(query);
    return products;
  },
  async getById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await db.query(query, [id]);
    return product;
  },
  async getByName(searchTerm) {
    const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [products] = await db.query(query, [`%${searchTerm}%`]);
    return products;
  },
  async add(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(query, [name]);
    return insertId;
  },
  async update(id, name) {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await db.query(query, [name, id]);
  },
  async remove(id) {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';
    await db.query(query, [id]);
  },
};

module.exports = productsModel;