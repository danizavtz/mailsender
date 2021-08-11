process.env.NODE_ENV = 'test';
const fs = require('fs'),
    expect = require('chai').expect,
    nock = require('nock'),
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(process.env.PORT),
    api = supertest(server);

describe('#Sendmail', () => {
    describe('POST', () => {
        it('Check failed in sendemail routine', (done) => {
            const content = fs.readFileSync('test/mockedresponses/errorresult.json')
            const parsedcontent = JSON.parse(content)
            nock(`http://127.0.0.1:${process.env.PORT}`).post('/sendmail').reply(500, parsedcontent)
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
            const parsedcontent = JSON.parse(content)
            nock(`http://127.0.0.1:${process.env.PORT}`).post('/sendmail').reply(200, parsedcontent)
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
