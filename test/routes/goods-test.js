let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Goods', function (){
    describe('GET /goods',  () => {
        it('should return all the goods in an array', function(done) {
            chai.request(server)
              .get('/goods')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.a('array');
                  expect(res.body.length).to.equal(8);
                  let result = _.map(res.body, (goods) => {
                    return { id: goods.id,
                        amount: goods.amount } 
                    });
                expect(result).to.include( { id: 1001, amount: 1000  } );
                expect(result).to.include( { id: 1002, amount: 1000  } );
                done();
              });
        });
    });
});
