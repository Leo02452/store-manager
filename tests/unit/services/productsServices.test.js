const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const NotFoundError = require('../../../services/notFoundError');

use(chaiAsPromised);

beforeEach(() => {
  sinon.restore();
});

describe('services/productsService', () => {
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

      sinon.stub(productsModel, 'list').resolves(result);
      const productsList = await productsService.list();
      expect(productsList).to.be.a('array');
      expect(productsList.length).to.be.equal(3);
    });
  });
  describe('getById', () => {
    it('should return a object', async () => {
      const result = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(productsModel, 'getById').resolves(result);

      const product = await productsService.getById(1);
      expect(product).to.be.a('object');
    });
  describe('add', () => {
    it('should return a object', async () => {
      const insertId = 4;
      sinon.stub(productsModel, 'add').resolves(insertId);

      const result = { "id": 4, "name": "Cinto do Batman" };
      sinon.stub(productsModel, 'getById').resolves(result);

      const product = await productsService.add({ "name": "Cinto do Batman" });
      expect(product).to.be.a('object');
    });
    // it('should throw error when name is less than 5 characters', () => {
    //   return expect(productsService.validateBodyAdd({ name: "Céu" })).to.be.rejectedWith("name length must be at least 5 characters long");
    // });
  });
      sinon.stub(productsModel, 'getById').resolves(undefined);

      expect(productsService.getById(88)).to.be.rejectedWith(NotFoundError);
    });
  });
});
