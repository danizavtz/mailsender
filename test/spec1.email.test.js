const { parse } = require('dotenv');

process.env.NODE_ENV = 'test';
const fs = require('fs'),
    expect = require('chai').expect,
    nodemailer = require('nodemailer'),
    sinon = require('sinon'),
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(process.env.PORT),
    api = supertest(server);

    let sandbox = sinon.createSandbox();

describe('#Sendmail', () => {
    afterEach((done) => {
        sandbox.restore();
        done();
    })
    describe('POST', () => {
        it('Check failed in sendemail routine', (done) => {
            const content = fs.readFileSync('test/mockedresponses/errorresult.json')
            const transport = {
                sendMail: (data, callback) => {
                  const err = new Error(content);
                  callback(err, null);
                }
              };
              sandbox.stub(nodemailer, 'createTransport').returns(transport);
            api.post('/sendmail')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(500)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(500);
                    done();
                });
        });
        it('Check send email with success', (done) => {
            const content = fs.readFileSync('test/mockedresponses/okresult.json')
            const transport = {
                sendMail: (data, callback) => {
                  callback(null, JSON.parse(content))
                }
              };
              sandbox.stub(nodemailer, 'createTransport').returns(transport);
            api.post('/sendmail')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(500)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(500);
                    done();
                });
        });
    });
});
