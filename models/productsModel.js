const db = require('./db');

const productsModel = {
  async list() {
    const query = 'SELECT * FROM db.products';
    const [products] = await db.query(query);
    return products;
  },
  async getById(id) {
    const query = 'SELECT * FROM db.products WHERE id = ?';
    const [[product]] = await db.query(query, [id]);
    return product;
  },
};

module.exports = productsModel;