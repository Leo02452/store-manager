const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const NotFoundError = require('../../../services/notFoundError');
// const { ValidationError } = require('joi');

use(chaiAsPromised);

describe('services/salesService', () => {
  beforeEach(sinon.restore);

  describe('validateBody', () => {
    it('should return the body when the body is valid', () => {
      const validBody = { productId: 1, quantity: 10 };

      expect(salesService.validateBody(validBody)).to.be.deep.equal(validBody);
    });
    // it('should thrown an error if the body is empty', () => {
    //   return expect(salesService.validateBody({})).to.eventually.be.rejectedWith(ValidationError);
    // });
  });

  describe('checkIfExists', () => {
    it('should return nothing in successfully case', () => {
      sinon.stub(salesModel, 'exists').resolves([{
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]);

      return expect(salesService.checkIfExists(1)).to.eventually.be.undefined;
    });
    it('should thrown an error if sale is not found', () => {
      sinon.stub(salesModel, 'exists').resolves([]);

      return expect(salesService.checkIfExists(0)).to.eventually.be.rejectedWith(NotFoundError);
    });
    it('should be rejected when seriesModel.exists is rejected', () => {
      sinon.stub(salesModel, 'exists').rejects();
      return expect(salesService.checkIfExists(1)).to.eventually.be.rejected;
    });
  });

  describe('list', () => {
    it('should return a list of sales when salesModel.list returns a list of sales', () => {
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
      sinon.stub(salesModel, 'list').resolves(result);

      return expect(salesService.list()).to.eventually.deep.equal(result);
    });
    it('should be rejected when salesModel.list is rejected', () => {
      sinon.stub(salesModel, 'list').rejects();
      return expect(salesService.list()).to.eventually.be.rejected;
    });
  });

  describe('getById', () => {
    it('should return a list when salesModel.getById returns a list', () => {
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

      sinon.stub(salesModel, 'getById').resolves(result);

      return expect(salesService.getById(1)).to.eventually.deep.equal(result);
    });
    it('should be rejected when salesModel.getById is rejected', () => {
      sinon.stub(salesModel, 'getById').rejects();
      return expect(salesService.getById(1)).to.eventually.be.rejected;
    });
  });

  describe('add', () => {
    const sale = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    it('should return an object when salesModel.add returns an id', () => {
      sinon.stub(salesModel, 'add').resolves(4);

      return expect(salesService.add(sale)).to.eventually.deep.equal({ id: 4, itemsSold: sale });
    });
    it('should be rejected when salesModel.add is rejected', () => {
      sinon.stub(salesModel, 'add').rejects();
      return expect(salesService.add(sale)).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    const saleToUpdate = [
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 2,
        "quantity": 50
      }
    ];
    it('should return an object in successfully case', () => {
      sinon.stub(salesModel, 'update').resolves();

      return expect(salesService.update(1, saleToUpdate)).to.eventually.deep.equal({ saleId: 1, itemsUpdated: saleToUpdate });
    });
    it('should be rejected when salesModel.update is rejected', () => {
      sinon.stub(salesModel, 'update').rejects();
      return expect(salesService.update(1, saleToUpdate)).to.eventually.be.rejected;
    });
  });

  describe('remove', () => {
    it('should return nothing in successfully case', () => {
      sinon.stub(salesModel, 'remove').resolves();

      return expect(salesService.remove(1)).to.eventually.be.undefined;
    });
    it('should be rejected when salesModel.remove is rejected', () => {
      sinon.stub(salesModel, 'remove').rejects();
      return expect(salesService.remove(1)).to.eventually.be.rejected;
    });
  });
});
