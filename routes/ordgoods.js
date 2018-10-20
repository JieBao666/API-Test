let Ordgood = require('../models/ordgoods');
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
    return result ? result[0] : undefined; // or undefined
}
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Ordgood.find(function(err, ordgoods) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(ordgoods,null,5));
    });
}
router.findByName = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.goods_name;
    var _filter = {
       $or: [
            {goods_name : {$regex : keyword, $options: '$i'}}
        ],
        $aggregate: [
            {$lookup:{
                from:"customers",
                    localField: "customer_id",
                    foreignField:"id",
                    as: "inventory_docs"
                }}
        ]
    }

    var count = 0;
    Ordgood.count(_filter,function (err,doc) {
        if(err){
            res.json({errmsg:err});
        }else{
            count =doc;
        }

    });
    Ordgood.find(_filter).limit(10).exec(function (err,ordgoods) {
        if (err) {
            res.json({errmsg: err});
        } else {
            res.send(JSON.stringify(ordgoods, null, 5));
        }
    });
}
router.incrementAmount = (req, res) => {

    Good.findById(req.params.id, function(err,ordgoods) {
        if (err)
            res.json({ message: 'Good NOT Found!', errmsg : err } );
        else {
            ordgoods.number += 1;
            ordgoods.save(function (err) {
                if (err)
                    res.json({ message: 'Good NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Good Successfully Upvoted!', data: ordgoods });
            });
        }
    });
}
module.exports = router;