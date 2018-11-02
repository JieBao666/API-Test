let Customer = require('../models/customers');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://baojie:bj19960324@ds223063.mlab.com:23063/shoppingdb';
mongoose.connect(mongodbUri);
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

function getByValue(array, customers_id) {

    var result = array.filter(function (obj) {
        return obj.customers_id == customers_id;
    });
    return result ? result[0] : undefined;
}
let findById = (arr, id) => {
    let result  = arr.filter(function(o) { return o.id == id;} );
    return result ? result[0] : null; // or undefined
}

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Customer.find(function(err, customers) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(customers,null,5));
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
      Customer.aggregate([{
               $lookup:{
                  from:"ordergoodsdb",
                  localField: "customers_id",
                  foreignField:"customers_id",
                  as:"order_details"
               }
           }],function (err,customers) {

           if (err) {
               res.json({errmsg: err});
           } else {
               res.send(JSON.stringify(customers, null, 5));
           }
       });
}
router.addCustomer = (req, res) => {
    var customer = new Customer();

    customer.customer_name = req.body.customers_name;
    customer.phone = req.body.phone;
    customer.email = req.body.email;

    customer.save(function(err) {
        if (err)
            res.json({ message: 'Customer NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Customer Successfully Added!', data: customer });
    });
}
router.incrementUpvotes = (req, res) => {
    Customer.findById(req.params.customers_id, function(err,customer) {
        if (err)
            res.json({ message: 'Customer NOT Found!', errmsg : err } );
        else {
            customer.upvotes += 1;
            customer.save(function (err) {
                if (err)
                    res.json({ message: 'Customer NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Customer Successfully Upvoted!', data: customer });
            });
        }
    });
}

router.deleteCustomer = (req, res) => {
    Customer.findByIdAndRemove(req.params.customers_id, function(err) {
        if (err)
            res.json({ message: 'Customer NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Customer Successfully Deleted!'});
    });
}
module.exports = router;