let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
//let datastore = require('../../models/goods');
describe('Goods',  () =>{
    /*beforeEach(function(){  
        while(datastore.length > 0) {
            datastore.pop();    
        }
        datastore.push(
            {id: 1010, goods_name: 'banana', amount: 1600,goods_price : 3.0}
            );
        datastore.push(
            {id: 1011, goods_name: 'lemon', amount: 1200,goods_price : 2.0}
            );
    });*/
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
    describe('GET /goods/:goods_price', ()=>{
        //beforeEach(function(){   
           //  let goods_price = 4.0 ;
          //  })
        
        it('should return the goods which price are larger than 4.0', function(done){
            chai.request(server)
            .get('/goods/4')
            .end((err, res) => {
            //let result = res.body.goods_name;
           expect(res).to.have.status(200);
           expect(res.body.length).to.equal(1);
           let result = _.map(res.body, (goods) => {
            return { id: goods.id} 
            });
            expect(result).to.include({id: 1006});
            done();
        })
    })
    })
})
