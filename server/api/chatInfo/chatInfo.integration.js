'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newChatInfo;

describe('ChatInfo API:', function() {
  describe('GET /api/chatInfos', function() {
    var chatInfos;

    beforeEach(function(done) {
      request(app)
        .get('/api/chatInfos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chatInfos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(chatInfos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/chatInfos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/chatInfos')
        .send({
          name: 'New ChatInfo',
          info: 'This is the brand new chatInfo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newChatInfo = res.body;
          done();
        });
    });

    it('should respond with the newly created chatInfo', function() {
      expect(newChatInfo.name).to.equal('New ChatInfo');
      expect(newChatInfo.info).to.equal('This is the brand new chatInfo!!!');
    });
  });

  describe('GET /api/chatInfos/:id', function() {
    var chatInfo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/chatInfos/${newChatInfo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chatInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      chatInfo = {};
    });

    it('should respond with the requested chatInfo', function() {
      expect(chatInfo.name).to.equal('New ChatInfo');
      expect(chatInfo.info).to.equal('This is the brand new chatInfo!!!');
    });
  });

  describe('PUT /api/chatInfos/:id', function() {
    var updatedChatInfo;

    beforeEach(function(done) {
      request(app)
        .put(`/api/chatInfos/${newChatInfo._id}`)
        .send({
          name: 'Updated ChatInfo',
          info: 'This is the updated chatInfo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedChatInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChatInfo = {};
    });

    it('should respond with the updated chatInfo', function() {
      expect(updatedChatInfo.name).to.equal('Updated ChatInfo');
      expect(updatedChatInfo.info).to.equal('This is the updated chatInfo!!!');
    });

    it('should respond with the updated chatInfo on a subsequent GET', function(done) {
      request(app)
        .get(`/api/chatInfos/${newChatInfo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let chatInfo = res.body;

          expect(chatInfo.name).to.equal('Updated ChatInfo');
          expect(chatInfo.info).to.equal('This is the updated chatInfo!!!');

          done();
        });
    });
  });

  describe('PATCH /api/chatInfos/:id', function() {
    var patchedChatInfo;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/chatInfos/${newChatInfo._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ChatInfo' },
          { op: 'replace', path: '/info', value: 'This is the patched chatInfo!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedChatInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChatInfo = {};
    });

    it('should respond with the patched chatInfo', function() {
      expect(patchedChatInfo.name).to.equal('Patched ChatInfo');
      expect(patchedChatInfo.info).to.equal('This is the patched chatInfo!!!');
    });
  });

  describe('DELETE /api/chatInfos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/chatInfos/${newChatInfo._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when chatInfo does not exist', function(done) {
      request(app)
        .delete(`/api/chatInfos/${newChatInfo._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
