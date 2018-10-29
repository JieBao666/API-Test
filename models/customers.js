let mongoose = require('mongoose');
let CustomersSchema = new mongoose.Schema({
        customers_name: String,
        phone: Number,
        customers_id: Number,
        email: String,
        upvotes: {type: Number, default: 0}

    },
    { collection: 'customersdb' });

module.exports = mongoose.model('Customer', CustomersSchema);



