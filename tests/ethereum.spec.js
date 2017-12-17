let chai = require('chai');
let chaiHttp = require('chai-http');
let chaiString = require('chai-string');
let server = require('./../bin/www');
let should = chai.should();
var nock = require('nock');
var cheerio = require('cheerio');

chai.use(chaiHttp);
chai.use(chaiString);

describe('Ethereum', () => {

    before((done) => {
        nock('https://api.blockcypher.com/v1/eth/main/addrs/738d145faabb1e00cf5a017588a9c0f998318012')
            .get('/balance')
            .reply(200, {
                    address: '738d145faabb1e00cf5a017588a9c0f998318012',
                    total_received: 9762206505909058000,
                    total_sent: 9742951942909057000,
                    balance: 19254563000000000,
                    unconfirmed_balance: 0,
                    final_balance: 19254563000000000,
                    n_tx: 704,
                    unconfirmed_n_tx: 0,
                    final_n_tx: 704,
                    nonce: 414,
                    pool_nonce: 414
                });
        nock('https://api.blockcypher.com/v1/eth/main/addrs/fake-wallet')
            .get('/balance')
            .reply(400);
        done();
    })

    describe('/GET index', () => {
        it('it should return 200', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET wallet value', () => {
        it('it should return 200', (done) => {
            chai.request(server)
                .get('/?address=738d145faabb1e00cf5a017588a9c0f998318012')
                .end((err, res) => {
                    res.should.have.status(200);
                    let $ = cheerio.load(res.text);
                    let resultElem = $('#result').text();
                    resultElem.should.startWith("0.019254563");
                    done();
                });
        });
    });

    describe('/GET wallet value', () => {
        it('it should return 400', (done) => {
            chai.request(server)
                .get('/?address=fake-wallet')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});