const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const NotFoundError = require('../../../services/notFoundError');

use(chaiAsPromised);

beforeEach(() => {
  sinon.restore();
});

describe('controllers/productsController', () => {
  describe('list should return status code', () => {
    it('200 and a list of products', async () => {
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
    it('200 when id is valid', async () => {
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
    it('404 when id is invalid', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'claudio' };

      sinon.stub(productsService, 'getById').resolves(undefined);

      expect(productsController.getById(req, res)).to.be.rejectedWith(NotFoundError);
    });
  });
});
