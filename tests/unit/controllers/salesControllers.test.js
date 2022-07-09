const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

use(chaiAsPromised);

describe('controllers/salesController', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('should be rejected when salesService.list is rejected', () => {
      sinon.stub(salesService, 'list').rejects();
      return expect(salesController.list({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and a list of sales', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(salesService, 'list').resolves(result);
      await salesController.list({}, res);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });

  describe('getById', () => {
    it('should be rejected when salesService.checkIfExists is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').rejects();
      return expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when salesService.getById is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'getById').rejects();
      return expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and the sale', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'getById').resolves(result);

      await salesController.getById(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });

  describe('add', () => {
    it('should be rejected when salesService.validateBody is rejected', () => {
      sinon.stub(salesService, 'validateBody').rejects();
      return expect(salesController.add({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.checkIfExists is rejected', () => {
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').rejects();
      return expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when salesService.add is rejected', () => {
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(salesService, 'add').rejects();
      return expect(salesController.add({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 201 and new sale', async () => {
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
      const req = {
        body: newSale,
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'add').resolves({ id: 4, itemsSold: newSale });

      await salesController.add(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 4, itemsSold: newSale });
    });
  });

  describe('update', () => {
    it('should be rejected when salesService.checkIfExists is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').rejects();
      return expect(salesController.update({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when salesService.validateBody is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'validateBody').rejects();
      return expect(salesController.update({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.checkIfExists is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').rejects();
      return expect(salesController.update({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when salesService.update is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'update').rejects();
      return expect(salesController.update({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and updated sale', async () => {
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
      const req = {
        body: saleToUpdate,
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'update').resolves({ saleId: 1, itemsUpdated: saleToUpdate });

      await salesController.update(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({ saleId: 1, itemsUpdated: saleToUpdate });
    });
  });

  describe('remove', () => {
    it('should be rejected when salesService.checkIfExists is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').rejects();
      return expect(salesController.remove({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when salesService.remove is rejected', () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'remove').rejects();
      return expect(salesController.remove({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 204', async () => {
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'remove').resolves();

      const req = {
        params: {
          id: 1
        },
      };
      const res = {
        sendStatus: sinon.stub().returns(),
      };

      await salesController.remove(req, res);
      expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });
});
