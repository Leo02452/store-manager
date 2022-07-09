const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

use(chaiAsPromised);

describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('should be rejected when productsService.list is rejected', () => {
      sinon.stub(productsService, 'list').rejects();
      return expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and a list of products', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(productsService, 'list').resolves(result);
      await productsController.list({}, res);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });

  describe('getById', () => {
    it('should be rejected when productsService.checkIfExists is rejected', () => {
      sinon.stub(productsService, 'checkIfExists').rejects();
      return expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.getById is rejected', () => {
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'getById').rejects();
      return expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and the product', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'getById').resolves({ "id": 1, "name": "Martelo de Thor" });

      await productsController.getById(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({ "id": 1, "name": "Martelo de Thor" });
    });
  });

  describe('getByName', () => {
    it('should be rejected when productsService.getByName is rejected', () => {
      sinon.stub(productsService, 'getByName').rejects();
      return expect(productsController.getByName({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and a filtered list of products', async () => {
      const req = {
        query: { q: "Martelo" },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'getByName').resolves([{ "id": 1, "name": "Martelo de Thor" }]);

      await productsController.getByName(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal([{ "id": 1, "name": "Martelo de Thor" }]);
    });
  });

  describe('add', () => {
    it('should be rejected when productsService.validateBody is rejected', () => {
      sinon.stub(productsService, 'validateBody').rejects();
      return expect(productsController.add({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.add is rejected', () => {
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'add').rejects();
      return expect(productsController.add({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 201 and new product', async () => {
      const req = {
        body: { name: "Manopla do Thanos" },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      const newProduct = { id: 4, name: "Manopla do Thanos" };

      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'add').resolves(newProduct);

      await productsController.add(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0).args[0]).to.deep.equal(newProduct);
    });
  });

  describe('update', () => {
    it('should be rejected when productsService.validateBody is rejected', () => {
      sinon.stub(productsService, 'validateBody').rejects();
      return expect(productsController.update({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.checkIfExists is rejected', () => {
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').rejects();
      return expect(productsController.update({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.update is rejected', () => {
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'update').rejects();
      return expect(productsController.update({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 200 and updated product', async () => {
      const req = {
        body: { name: "Traje do Pantera" },
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      
      const updatedProduct = { id: 1, name: "Traje do Pantera" };
      
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'update').resolves(updatedProduct);

      await productsController.update(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should be rejected when productsService.checkIfExists is rejected', () => {
      sinon.stub(productsService, 'checkIfExists').rejects();
      return expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });
    it('should be rejected when productsService.remove is rejected', () => {
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'remove').rejects();
      return expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });
    it('should return status code 204', async () => {
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'remove').resolves();

      const req = {
        params: {
          id: 1
        },
      };
      const res = {
        sendStatus: sinon.stub().returns(),
      };

      await productsController.remove(req, res);
      expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });
});
