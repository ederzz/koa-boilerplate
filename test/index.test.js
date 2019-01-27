const app = require('../index')
const server = app.listen()
const request = require('supertest').agent(server)
const expect = require('chai').expect

describe('index routes test:', () => {
    before(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    after(() => {})

    it('GET /', function (done) {
        request
            .get('/')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.text).to.be.equal('here is home.')
                done()
            })
    })
    it('GET /test', function (done) {
        request
            .get('/test')
            .expect(200, (_, res) => {
                expect(/^<\!DOCTYPE html>[\s\S]*<\/html>$/.test(res.text))
                    .to
                    .be
                    .true
                done()
            })
    })
    it('GET /query', function (done) {
        request
            .get('/query?name=jzx')
            .expect(200, function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.text).to.be.equal('参数存放在url后面，name=jzx')
                done()
            })
    })
    it('GET /param/:id', function (done) {
        request
            .get('/param/22')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.text).to.be.equal('参数存放在url中，用户id:22')
                done()
            })
    })
    it('GET /static', function () {
        request
            .get('/static')
            .expect(200, 'di{color: #ff0;}')
    })
    it('ALL /all', function (done) {
        request
            .get('/all')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.text).to.be.equal('request method is all.')
                done()
            })
    })
    it('POST /user', function (done) {
        request
            .post('/user')
            .field('name', 'jzx')
            .field('age', '18')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.text).to.be.equal('post传参：18岁的jzx')
                done()
            })
    })
})