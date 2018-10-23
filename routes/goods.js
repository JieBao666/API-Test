let Good = require('../models/goods');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/shoppingdb');

var mongodbUri ='mongodb://baojie:bj19960324@ds223063.mlab.com:23063/shoppingdb';
mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});
function getByValue(array, id) {

    var result = array.filter(function (obj) {
        return obj.id == id;
    });
    return result ? result[0] : undefined; // or undefined
}
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Good.find(function(err, goods) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(goods,null,5));
    });
}

router.findByPrice = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.goods_price;
    var _filter = {
        $or: [
            {goods_price : {$gt : keyword}}
        ]
    }
   var count = 0;
       Good.count(_filter,function (err,doc) {
           if(err){
               res.json({errmsg:err});
           }else{
               count =doc;
           }

       });
       Good.find(_filter).limit(10).exec(function (err,good) {
           if (err) {
               res.json({errmsg: err});
           } else {
               res.send(JSON.stringify(good, null, 5));
           }
       });



}
router.addGood = (req, res) => {
    //Add a new donation to our list
    var good = new Good();

    good.goods_name = req.body.goods_name;
    good.amount = req.body.amount;
    good.goods_price = req.body.goods_price;

    good.save(function(err) {
        if (err)
            res.json({ message: 'Good NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Good Successfully Added!', data: good });
    });
}
router.incrementAmount = (req, res) => {

    Good.findById(req.params.id, function(err,good) {
        if (err)
            res.json({ message: 'Good NOT Found!', errmsg : err } );
        else {
            good.amount += 1;
            good.save(function (err) {
                if (err)
                    res.json({ message: 'Good NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Good Successfully Upvoted!', data: good });
            });
        }
    });
}
router.deleteGood = (req, res) => {
    //Delete the selected donation based on its id
    Good.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Good NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Good Successfully Deleted!'});
    });
}
module.exports = router;