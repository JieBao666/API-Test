let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
let datastore = require('../../models/ordgoods');
describe('Ordgoods', function (){
    beforeEach(function(){  
        while(datastore.length > 0) {
            datastore.pop();
        }  
        datastore.push( 
            {id: 1005,goods_name: 'a',customers_id:2, goods_price:1.5,number:20}
        );
        datastore.push( 
            {id: 1006,goods_name: 'b',customers_id:3, goods_price:1.5,number:30}
        );
    });
    describe('Ordgoods', function (){
        describe('GET /ordgoods',  () => {
            it('should return all the donations in an array', function(done) {
                chai.request(server)
                  .get('/ordgoods')
                  .end(function(err, res)  {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(2);
                    let result = _.map(res.body, (ordgood) => {
                        return { 
                            number: ordgood.number } 
                        });
                    expect(result).to.include( { number: 20 } );
                    expect(result).to.include( { number: 30 } );
                   // expect(result).to.include({number:20});
                    done();
                  });
            });
        });
    });
})