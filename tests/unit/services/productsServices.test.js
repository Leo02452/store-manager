const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const NotFoundError = require('../../../services/notFoundError');
// const { ValidationError } = require('joi');

use(chaiAsPromised);

describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('validateBody', () => {
    it('should return the body when the body is valid', () => {
      const validBody = { name: "Hulkbuster" };

      expect(productsService.validateBody(validBody)).to.be.deep.equal(validBody);
    });
    // it('should thrown an error if the body is empty', () => {
    //   return expect(productsService.validateBody({})).to.eventually.be.rejectedWith(ValidationError);
    // });
  });

  describe('checkIfExists', () => {
    it('should return nothing in successfully case', () => {
      sinon.stub(productsModel, 'getById').resolves({ "id": 1, "name": "Martelo de Thor" });

      return expect(productsService.checkIfExists(1)).to.eventually.be.undefined;
    });
    it('should thrown an error if product is not found', () => {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      return expect(productsService.checkIfExists(0)).to.eventually.be.rejectedWith(NotFoundError);
    });
    it('should be rejected when seriesModel.getById is rejected', () => {
      sinon.stub(productsModel, 'getById').rejects();
      return expect(productsService.checkIfExists(1)).to.eventually.be.rejected;
    });
  });

  describe('list', () => {
    it('should return a list of products when productsModel.list returns a list of products', () => {
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

      return expect(productsService.list()).to.eventually.deep.equal(result);
    });
    it('should be rejected when productsModel.list is rejected', () => {
      sinon.stub(productsModel, 'list').rejects();
      return expect(productsService.list()).to.eventually.be.rejected;
    });
  });

  describe('getById', () => {
    it('should return an object when productsModel.getById returns an object', () => {
      const result = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(productsModel, 'getById').resolves(result);

      return expect(productsService.getById(1)).to.eventually.deep.equal(result);
    });
    it('should be rejected when productsModel.getById is rejected', () => {
      sinon.stub(productsModel, 'getById').rejects();
      return expect(productsService.getById(1)).to.eventually.be.rejected;
    });
  });

  describe('getByName', () => {
    it('should return a filtered list when productsModel.getByName returns a filtered list', () => {
      const result = [{ "id": 1, "name": "Martelo de Thor" }];

      sinon.stub(productsModel, 'getByName').resolves(result);

      return expect(productsService.getByName("Martelo")).to.eventually.deep.equal(result);
    });
    it('should be rejected when productsModel.getByName is rejected', () => {
      sinon.stub(productsModel, 'getByName').rejects();
      return expect(productsService.getByName("Martelo")).to.eventually.be.rejected;
    });
  });

  describe('add', () => {
    it('should return an object when productsModel.add returns an id', () => {
      sinon.stub(productsModel, 'add').resolves(4);

      return expect(productsService.add("Manopla do Thanos")).to.eventually.deep.equal({ id: 4, name: "Manopla do Thanos" });
    });
    it('should be rejected when productsModel.add is rejected', () => {
      sinon.stub(productsModel, 'add').rejects();
      return expect(productsService.add("Manopla do Thanos")).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    it('should return an object in successfully case', () => {
      sinon.stub(productsModel, 'update').resolves();

      return expect(productsService.update(1, "Traje do Pantera")).to.eventually.deep.equal({ id: 1, name: "Traje do Pantera" });
    });
    it('should be rejected when productsModel.update is rejected', () => {
      sinon.stub(productsModel, 'update').rejects();
      return expect(productsService.update(1, "Traje do Pantera")).to.eventually.be.rejected;
    });
  });

  describe('remove', () => {
    it('should return nothing in successfully case', () => {
      sinon.stub(productsModel, 'remove').resolves();

      return expect(productsService.remove(1)).to.eventually.be.undefined;
    });
    it('should be rejected when productsModel.remove is rejected', () => {
      sinon.stub(productsModel, 'remove').rejects();
      return expect(productsService.remove(1)).to.eventually.be.rejected;
    });
  });
});
