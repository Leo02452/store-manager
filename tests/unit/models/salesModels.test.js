const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

use(chaiAsPromised);

describe('models/salesModel', () => {
  beforeEach(sinon.restore);

  describe('exists', () => {
    it('should return an empty list when db.query returns an empty list', () => {
      sinon.stub(db, 'query').resolves([[]]);

      return expect(salesModel.exists(0)).to.eventually.deep.equal([]);
    });
    it('should return a list with one item when db.query returns a list with one item', () => {
      const result = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      sinon.stub(db, 'query').resolves([result]);

      return expect(salesModel.exists(1)).to.eventually.deep.equal(result);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.exists(1)).to.eventually.be.rejected;
    });
  });

  describe('list', () => {
    it('should return a list of sales when db.query returns a list', () => {
      const result = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      sinon.stub(db, 'query').resolves([result]);

      return expect(salesModel.list()).to.eventually.deep.equal(result);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.list()).to.eventually.be.rejected;
    });
  });

  describe('getById', () => {
    it('should return a list when db.query returns a list', () => {
      const result = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      sinon.stub(db, 'query').resolves([result]);

      return expect(salesModel.getById(1)).to.eventually.deep.equal(result);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.getById(1)).to.eventually.be.rejected;
    });
  });

  describe('add', () => {
    const newSale = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    it('should return an id when db.query returns an id', () => {      
      sinon.stub(db, 'query').resolves([{ insertId: 4 }]);

      return expect(salesModel.add(newSale)).to.eventually.deep.equal(4);
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.add(newSale)).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    it('should return nothing in successfully case', async () => {
      sinon.stub(db, 'query').resolves();

      return expect(salesModel.update(10, 1, 1)).to.eventually.be.undefined;
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.update(10, 1, 1)).to.eventually.be.rejected;
    });
  });

  describe('remove', () => {
    it('should return nothing in successfully case', async () => {
      sinon.stub(db, 'query').resolves();

      return expect(salesModel.remove(1)).to.eventually.be.undefined;
    });
    it('should be rejected when db.query is rejected', () => {
      sinon.stub(db, 'query').rejects();
      return expect(salesModel.remove(1)).to.eventually.be.rejected;
    });
  });
});
