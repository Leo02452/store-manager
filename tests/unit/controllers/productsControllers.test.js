const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

use(chaiAsPromised);

beforeEach(() => {
  sinon.restore();
});

describe('controllers/productsController', () => {
  describe('list', () => {
    it('should return status code 200 and a list of products', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

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
      await productsController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(result)).to.be.equal(true);
    });
  });
  describe('getById', () => {
    it('should return status code 200 when id is valid', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      sinon.stub(productsService, 'getById').resolves({ "id": 1, "name": "Martelo de Thor" });
      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ "id": 1, "name": "Martelo de Thor" })).to.be.equal(true);
    });
  });
  describe('add', () => {
    it('should return status code 201 when name is valid', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { "name": "Cinto do Batman" };

      const createdProduct = { "id": 4, "name": "Cinto do Batman" };
      sinon.stub(productsService, 'add').resolves(createdProduct);

      await productsController.add(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ "id": 4, "name": "Cinto do Batman" })).to.be.equal(true);
    });
  //   it('422 when name is less than 5 characters', async () => {
  //     const req = {};
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub();

  //     req.body = { "name": "Céu" };

  //     // const createdProduct = { "id": 4, "name": "Cinto do Batman" };
  //     // sinon.stub(productsService, 'add').resolves(createdProduct);

  //     return expect(productsController.add(req, res)).to.be.rejectedWith('ValidationError');
  //   });
  });
  describe('update', () => {
    it('should return status code 200 when name is valid', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { "id": 1 }
      req.body = { "name": "Traje do Pantera" };
      const updatedProduct = { "id": 1, "name": "Traje do Pantera" };

      sinon.stub(productsService, 'update').resolves(updatedProduct);

      await productsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(updatedProduct)).to.be.equal(true);
    });
  });
});
