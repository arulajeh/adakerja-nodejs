const chai = require('chai');
const request = require('supertest');
const server = require('../index');
const env = require('dotenv').config().parsed;

chai.should();

describe('Check webhook API', () => {
  describe('GET /webhook', () => {
    it('should return CHALLENGE_ACCEPTED', (done) => {
      request(server)
        .get('/webhook?hub.verify_token=' + env.VERIFY_TOKEN + '&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe')
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          res.text.should.be.a('string');
          res.text.should.equal('CHALLENGE_ACCEPTED');
          done();
        });
    });
  });

  describe('POST /webhook', () => {
    it('should check EVENT_RECEIVED', (done) => {
      request(server)
        .post('/webhook')
        .send({
          "object": "page",
          "entry": [{
            "messaging": [
              { "message": "TEST_MESSAGE" }
            ]
          }]
        })
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          res.text.should.be.a('string');
          res.text.should.equal('EVENT_RECEIVED');
          done();
        });
    });

    it('should receive event with page_id', (done) => {
      request(server)
        .post('/webhook')
        .send({
          "object": "page",
          "entry": [{
            "id": env.PAGE_ID,
            "time": 1457764198246,
            "messaging": [{
              "sender": {
                "id": "1000123456789"
              },
              "recipient": {
                "id": env.PAGE_ID
              },
              "timestamp": 1457764197627,
              "message": {
                "mid": "mid.1457764197618:41d102a3e1ae206a38",
                "seq": 73,
                "text": "hello, world!"
              }
            }]
          }]
        })
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          res.text.should.be.a('string');
          res.text.should.equal('EVENT_RECEIVED');
          done();
        });
    });

  });

});

describe('Check messages API', () => {

  describe('GET /messages', () => {
    it('should return array of all messages', (done) => {
      request(server)
        .get('/messages')
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /messages/:id', () => {
    it('should return message by id', (done) => {
      const id = 59;
      request(server)
        .get('/messages/' + id)
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          if (res.body) {
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userid');
            res.body.should.have.property('message');
          }
          done();
        });
    });
  });

  describe('GET /summary', () => {
    it('should return summary of all messages', (done) => {
      request(server)
        .get('/summary')
        .end(function (err, res) {
          if (err) throw err;
          res.statusCode.should.equal(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});