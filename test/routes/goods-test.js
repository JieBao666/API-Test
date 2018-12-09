import chai from 'chai';
import chaiHttp from 'chai-http' ;
//import server from '../../bin/www';
var server = null ;
let expect = chai.expect;
import _ from 'lodash';
import things from 'chai-things';
chai.use( things);
chai.use(chaiHttp);

describe('Goods',  () =>{
    before(function(){
        delete require.cache[require.resolve('../../bin/www')];
        delete require.cache[require.resolve('../../models/goods')];
        server = require('../../bin/www');
    });
    after(function (done) {
        server.close(done);
    });
    describe('GET /goods',  () => {
        it('should return all the goods in an array', function(done) {
            chai.request(server)
                .get('/goods')
                .end((err, res) => {
                    expect(res).to.have.status(200);

                    // expect(res.body.length).to.equal(8);
                    let result = _.map(res.body, (goods) => {
                        return { id: goods.id,
                            amount: goods.amount };
                    });
                    expect(result).to.include( { id: 1003, amount: 1000 } );
                    expect(result).to.include( { id: 1002, amount: 1000  } );
                    done();
                });
        });
    });
    describe('GET /goods/:goods_price', ()=>{
        it('should return the goods which price are larger than 4.0', function(done){
            chai.request(server)
                .get('/goods/4')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (goods) => {
                        return { id: goods.id};
                    });
                    expect(result).to.include({id: 1006});
                    done();
                });
        });
    });
    describe('POST /goods', function () {
        it('should return confirmation message and update shoppingdb', function(done) {
            let good = {
                _id: 2012,
                id: 1014,
                goods_name: 'rice',
                goods_price: '1.5',
                amount:1400
            };
            chai.request(server)
                .post('/goods')
                .send(good)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Good Successfully Added!' );
                    done();
                });
            after(function  (done) {
                chai.request(server)
                    .get('/goods')
                    .end(function(err, res) {
                        let result = _.map(res.body, (goods) => {
                            return {
                                amount: goods.amount };
                        }  );

                        expect(result).to.include( { amount: 1000  } );
                        done();
                    });
            });  // end-after
        });
    });
    describe('PUT /goods/:id/amount', () => {
        it('should return a message and the amount increased by 1', function(done) {
            chai.request(server)
                .put('/goods/2012/amount')
                .end(function(err, res) {

                    let good = res.body.data ;
                    expect(good).to.include( { amount: 1401  } );
                    done();
                });
        });
        it('should return a message for invalid goods id', function(done) {
            chai.request(server)
                .put('/goods/5bf/amount')
                .end(function(err, res) {
                    //  expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Good NOT Found!' ) ;
                    done();
                });
        });
    });
    describe('DELETE /goods/:id', () =>{

        it('should return a message and good deleted', function(done){
            chai.request(server)
                .delete('/goods/2012')
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Good Successfully Deleted!');
                    done();

                });
            after(function (done){
                chai.request(server)
                    .get('/goods')
                    .end(function(err, res) {
                        let result = _.map(res.body, (goods) => {
                            return { id: goods.id,
                                amount: goods.amount };
                        });
                        expect(result).to.include({id: 1002, amount: 1000});
                        done();
                    });
            });
        });
    });
    describe('DELETE /goods/:id', () =>{
        it('should return a 404 and a message for invalid id', function(done) {
            chai.request(server)
                .delete('/goods/5bf')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message','Good NOT DELETED!' ) ;
                    done();
                });
        });
    });
});
