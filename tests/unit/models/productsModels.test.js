const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

use(chaiAsPromised);

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
    it('should return an object when db.query returns an object', () => {
      const result = { "id": 1, "name": "Martelo de Thor" };

      sinon.stub(db, 'query').resolves([[result]]);

      return expect(productsModel.getById(1)).to.eventually.deep.equal(result);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productsModel.getById()).to.eventually.be.rejected;
    });
  });

  describe('add', () => {
    it('should return an id when db.query returns an id', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 4 }]);

      return expect(productsModel.add({ name: "Capa do Dr. Estranho" })).to.eventually.deep.equal(4);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productsModel.add({ name: "Capa do Dr. Estranho" })).to.eventually.be.rejected;
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
