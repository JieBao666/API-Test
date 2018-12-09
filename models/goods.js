let mongoose = require('mongoose');

let GoodsSchema = new mongoose.Schema({
    _id:Number,
    goods_name: String,
    amount: Number,
    id: Number,
    goods_price: String
},

{ collection: 'shoppingdb' });

module.exports = mongoose.model('Good', GoodsSchema);
