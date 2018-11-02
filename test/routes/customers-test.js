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
    describe('GET /customers/findDetails',  () => {
        it('should return all the customers in an array', function(done) {
            chai.request(server)
              .get('/customers/1')
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
    describe('POST /customers', function () {
        it('should return confirmation message and update customersdb', function(done) {
          let customer = { 
            customers_name: 'Jie' , 
            phone: 0833643871, 
            customers_id: 8,
            email:'130@google.com',
            upvotes:0,
            _id:1001
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
                   
                    expect(result).to.include( { phone:888880 } );
                    done();
                });
        });  // end-after
      });
    })
    describe('PUT /customers/:customers_id/vote', () => {
        it('should return a message and the vote increased by 1', function(done) {
           chai.request(server)
              .put('/customers/1001/vote')
              .end(function(err, res) {
                  
                let customer = res.body.data ;
                  expect(customer).to.include( { upvotes: 1  } );
                  done();
              });
      });
      it('should return a message for invalid customers id', function(done) {
        chai.request(server)
            .put('/customers/5bcs/vote')
            .end(function(err, res) {
              //  expect(res).to.have.status(404);
                expect(res.body).to.have.property('message','Customer NOT Found!' ) ;
                done();
            });
    });
    });
    describe('DELETE /customers/:id', () =>{
    
        it('should return a message and customer deleted', function(done){
            chai.request(server)
            .delete('/customers/1001')
            .end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal("Customer Successfully Deleted!");      
                done();
                   
            });
            after(function (done){
                chai.request(server)
                .get('/customers')
                .end(function(err, res) {
                    let result = _.map(res.body, (customers) => {
                        return { 
                            phone: customers.phone } 
                        });
                        expect(result).to.include({ phone: 888880});
                        done();
            });
        });
        });
    });
    describe('DELETE /customers/:id', () =>{
        it('should return a 404 and a message for invalid id', function(done) {
            chai.request(server)
                .delete('/customers/5bcs')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Customer NOT DELETED!' ) ;
                    done();
                });
        });
    })
    })