let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
let datastore = require('../../models/customers');
describe('Customers',  () =>{
     describe('GET /customers',  () => {
        it('should return all the customers in an array', function(done) {
            chai.request(server)
              .get('/customers')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                  
                 let result = _.map(res.body, (customers) => {
                    return { phone: customers.phone } 
                    });
                expect(result).to.include( { phone: 888880} );
                expect(result).to.include( {phone: 888881} );
                done();
              });
        });
    });
  
    })