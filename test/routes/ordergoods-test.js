let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Ordgoods', function (){
    
    
        describe('GET /ordgoods',  () => {
            it('should return all the ordgoods in an array', function(done) {
                chai.request(server)
                  .get('/ordgoods')
                  .end(function(err, res)  {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (ordgood) => {
                        return { 
                            number: ordgood.number } 
                        });
                    expect(result).to.include( { number: 2 } );
                    expect(result).to.include( { number: 3 } );
                   // expect(result).to.include({number:20});
                    done();
                  });
            });
        });
    
    describe('POST /ordgoods', function () {
        it('should return confirmation message and update ordergoodsdb', function(done) {
          let ordgood = { 
            _id:2001,
            goods_name: 'mutton',
            id:1004,
            customers_id:4,
            goods_price:2.5,
            number:20,
          };
          chai.request(server)
            .post('/ordgoods')
            .send(ordgood)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message').equal('Ordgood Successfully Added!' ); 
              done();
          });
          after(function  (done) {
            chai.request(server)
                .get('/ordgoods')
                .end(function(err, res) {
                    let result = _.map(res.body, (ordgoods) => {
                        return { 
                            number: ordgoods.number };
                    }  );
                   
                    expect(result).to.include( { number:21  } );
                    done();
                });
        });  // end-after
      });
      it('should return a message for null content',function(done) {
        chai.request(server)
        .post('/ordgoods')
        .end(function(err, res) {
          //  expect(res).to.have.status(404);
            expect(res.body).to.have.property('message','Ordgood NOT Added!' ) ;
            done();
        });

      })
  }); 
 
    describe('GET /ordgoods/:goods_name',  () => {
        it('should return fuzzy ordgoods in an array', function(done) {
            chai.request(server)
              .get('/ordgoods/b')
              .end(function(err, res)  {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
               expect(res.body.length).to.equal(1);
                let result = _.map(res.body, (ordgood) => {
                    return { 
                        number: ordgood.number } 
                    });
                expect(result).to.include( { number: 3 } );
                
                done();
              });
        });
    });
    describe('PUT /ordgoods/:id/number' ,() => {
        it('should return a message and the number increased by 1', function(done) {
           chai.request(server)
              .put('/ordgoods/2001/number')
              .end(function(err, res) {
                  
                let ordgood = res.body.data ;
                  expect(ordgood).to.include( {number:21  } );
                  
                  done();
              });
      });
      it('should return a message for invalid  id', function(done) {
        chai.request(server)
            .put('/ordgoods/5bcsa/number')
            .end(function(err, res) {
              //  expect(res).to.have.status(404);
                expect(res.body).to.have.property('message','Ordgood NOT Found!' ) ;
                done();
            });
    });
    });
});
