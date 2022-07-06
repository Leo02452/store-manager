const db = require('./db');

const salesModel = {
  async list() {
    const query = `
      SELECT 
        sp.sale_id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM
        StoreManager.sales AS s
          INNER JOIN
        StoreManager.sales_products AS sp ON s.id = sp.sale_id;
    `;
    const [sales] = await db.query(query);
    return sales;
  },
  async getById(id) {
    const query = `
      SELECT 
        s.date, sp.product_id AS productId, sp.quantity
      FROM
        StoreManager.sales AS s
          INNER JOIN
        StoreManager.sales_products AS sp ON s.id = sp.sale_id
      WHERE
        sp.sale_id = ?;
    `;
    const [sale] = await db.query(query, [id]);
    return sale;
  },
  async add(sales) {
    const firstInsertQuery = `
      INSERT INTO
        StoreManager.sales (date)
      VALUES (NOW());
      `;
    const [{ insertId }] = await db.query(firstInsertQuery);
    const secondInsertQuery = sales.map(({ productId, quantity }) => `
        INSERT INTO
          StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES (${insertId}, ${productId}, ${quantity});
      `);
    await Promise.all(secondInsertQuery);
    return insertId;
  },
  async remove(id) {
    const query = `
      DELETE FROM
        StoreManager.sales
      WHERE
        id = ?;
    `;
    await db.query(query, [id]);
  },
  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.sales WHERE id = ?';
    const [sale] = await db.query(query, [id]);
    return sale;
  },
};

module.exports = salesModel;