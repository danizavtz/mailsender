const { parse } = require('dotenv');

process.env.NODE_ENV = 'test';
const fs = require('fs'),
    expect = require('chai').expect,
    Mailer = require('nodemailer/lib/mailer'),
    sinon = require('sinon'),
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(),
    api = supertest(server);
    const sandbox = sinon.createSandbox();

describe('#Sendmail', () => {
    afterEach((done) => {
        sandbox.restore();
        done();
    })
    describe('POST', () => {
        it('Check failed in sendemail routine', (done) => {
            const content = fs.readFileSync('test/mockedresponses/errorresult.json')
            sandbox.stub(Mailer.prototype, 'sendMail').rejects(content);
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
            sandbox.stub(Mailer.prototype, 'sendMail').resolves(content);
            api.post('/sendmail')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});
