let mongoose = require('mongoose');
let CustomersSchema = new mongoose.Schema({
        _id : Number,
        customers_name: String,
        phone: Number,
        customers_id: Number,
        email: String,
        upvotes: Number
      
    },
    { collection: 'customersdb' });

module.exports = mongoose.model('Customer', CustomersSchema);



