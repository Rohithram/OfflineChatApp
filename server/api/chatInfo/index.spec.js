'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var chatInfoCtrlStub = {
  index: 'chatInfoCtrl.index',
  show: 'chatInfoCtrl.show',
  create: 'chatInfoCtrl.create',
  upsert: 'chatInfoCtrl.upsert',
  patch: 'chatInfoCtrl.patch',
  destroy: 'chatInfoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var chatInfoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './chatInfo.controller': chatInfoCtrlStub
});

describe('ChatInfo API Router:', function() {
  it('should return an express router instance', function() {
    expect(chatInfoIndex).to.equal(routerStub);
  });

  describe('GET /api/chatInfos', function() {
    it('should route to chatInfo.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'chatInfoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/chatInfos/:id', function() {
    it('should route to chatInfo.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'chatInfoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/chatInfos', function() {
    it('should route to chatInfo.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'chatInfoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/chatInfos/:id', function() {
    it('should route to chatInfo.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'chatInfoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/chatInfos/:id', function() {
    it('should route to chatInfo.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'chatInfoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/chatInfos/:id', function() {
    it('should route to chatInfo.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'chatInfoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
