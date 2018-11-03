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

router.home = (req, res) => {
    res.sendFile('../public/index.ejs');
};
function getByValue(array, customers_id) {

    var result = array.filter(function (obj) {
        return obj.customers_id == customers_id;
    });
    return result ? result[0] : undefined; // or undefined
}
let findById = (arr, id) => {
    let result  = arr.filter(function(o) { return o.id == id;} );
    return result ? result[0] : null; // or undefined
}
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

   Ordgood.find(function(err,ordgoods) {
      if (err)
          res.send(err);

          res.send(JSON.stringify(ordgoods, null, 5));
    });
}
router.findByName = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.goods_name;
    var _filter = {
       $or: [
            {goods_name : {$regex : keyword, $options: '$i'}}
        ]
    }
    Ordgood.find(_filter).limit(10).exec(function (err,ordgoods) {
        if (err) {
            res.json({errmsg: err});
        } else {
            res.send(JSON.stringify(ordgoods, null, 5));
        }
    });
}
router.addOrder = (req, res) => {
    var ordgood = new Ordgood();
    ordgood.id = req.body.id;
    ordgood.goods_name = req.body.goods_name;
    ordgood.customers_id = req.body.customers_id;
    ordgood.number = req.body.number;
    ordgood._id = req.body._id;
    ordgood.goods_price = req.body.goods_price;

    ordgood.save(function(err) {
        if (err)
            res.json({ message: 'Ordgood NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Ordgood Successfully Added!', data: ordgood });
    });
}
router.incrementNumber = (req, res) => {

    Ordgood.findById(req.params.id, function(err,ordgood) {
        if (err)
            res.json({ message: 'Ordgood NOT Found!', errmsg : err } );
        else {
            ordgood.number += 1;
            ordgood.save(function (err) {
                if (err)
                    res.json({ message: 'Ordgood NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Ordgood Successfully Upvoted!', data: ordgood });
            });
        }
    });
}
router.deleteOrdgood = (req, res) => {
    Ordgood.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Ordgood NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Ordgood Successfully Deleted!'});
    });
}
module.exports = router;