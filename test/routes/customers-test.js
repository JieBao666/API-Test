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
    /*describe('GET /customers/findOne',  () => {
        it('should return all the customers in an array', function(done) {
            chai.request(server)
              .get('/customers/1')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                  
                expect(res.body).to.include('order_details');
               
                done();
              });
        });
    });*/
    describe('POST /customers', function () {
        it('should return confirmation message and update customersdb', function(done) {
          let customer = { 
            customers_name: 'Jie' , 
            phone: 0833643871, 
            customers_id: 8,
            email:'130@google.com',
            upvotes:0
          };
          chai.request(server)
            .post('/customers')
            .send(customer)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message').equal('Customer Successfully Added!' ); 
              done();
          });
          after(function  (done) {
            chai.request(server)
                .get('/customers')
                .end(function(err, res) {
                    let result = _.map(res.body, (customers) => {
                        return { 
                            phone: customers.phone };
                    }  );
                   
                    expect(result).to.include( { phone:0833643871  } );
                    done();
                });
        });  // end-after
      });
    })
    })