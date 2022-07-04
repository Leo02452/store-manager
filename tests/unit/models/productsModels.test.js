const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

beforeEach(() => {
  sinon.restore();
});

describe('models/productsModel', () => {
  describe('list', () => {
    it('should return a list of products', async () => {
      const result = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      sinon.stub(db, 'query').resolves([result]);
      const productsList = await productsModel.list();
      expect(productsList).to.be.a('array');
      expect(productsList.length).to.be.equal(3);
    });
  });

  describe('getById', () => {
    it('should return a object', async () => {
      const result = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(db, 'query').resolves([[result]]);

      const product = await productsModel.getById(1);
      expect(product).to.be.a('object');
    });
    it('should object have a property id', async () => {
      const result = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(db, 'query').resolves([[result]]);
      const product = await productsModel.getById(1);
      expect(product).to.have.a.property('id');
    });
    it('should object have a property name', async () => {
      const result = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(db, 'query').resolves([[result]]);
      const product = await productsModel.getById(1);
      expect(product).to.have.a.property('name');
      expect(product.name).to.be.equal('Martelo de Thor');
    });
  });
  describe('add', () => {
    it('should return a number', async () => {
      const insertId = 4;
      sinon.stub(db, 'query').resolves([{ insertId }]);

      const product = await productsModel.add({ "name": "Cinto do Batman" });
      expect(product).to.be.a('number');
    });
  });
});
