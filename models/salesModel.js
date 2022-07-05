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
};

module.exports = salesModel;