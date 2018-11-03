let mongoose = require('mongoose');
let OrdgoodsSchema = new mongoose.Schema({
    _id:Number,
    goods_name: String,
    id:Number,
    customers_id:Number,
    goods_price:String,
    number:Number,
},
{collection: 'ordergoodsdb'});
module.exports = mongoose.model('Ordgood', OrdgoodsSchema);
