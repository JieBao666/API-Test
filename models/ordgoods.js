/*let mongoose = require('mongoose');
let OrdgoodsSchema = new mongoose.Schema({
    goods_name: String,
    id:Number,
    customers_id:Number,
    goods_price:String,
    number:Number,
},
{collection: 'ordergoodsdb'});
module.exports = mongoose.model('Ordgood', OrdgoodsSchema);
*/
var Ordgood = [
	{id: 1001,goods_name: 'apple',customers_id:1, goods_price:1.5,number:20}
];

module.exports = Ordgood;