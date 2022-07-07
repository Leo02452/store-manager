const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');


describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('should return a list of products when db.query returns a list', () => {
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

      return expect(productsModel.list()).to.eventually.deep.equal(result);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productsModel.list()).to.eventually.be.rejected;
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
  describe('update', () => {
    it('should return a number', async () => {
      const affectedRows = 1;
      sinon.stub(db, 'query').resolves([{ affectedRows }]);

      const result = await productsModel.update(1, "Traje do pantera");
      expect(result).to.be.equal(true);
    });
  });
});
