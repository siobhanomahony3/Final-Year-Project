var shoppingList = require('../models/shoppingList');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var result = require("mongoose");



router.findAll = function(req, res) {
    shoppingList.find(function(err, shoppingLists) {
        if (err)
            res.send(err);

        res.json(shoppingLists);
    });
}


router.findOne = function(req, res) {

    shoppingList.find({ "_id" : req.params.id },function(err, shoppingLists) {
        if (err)
            res.json({ message: 'Shopping List NOT Found!', errmsg : err } );
        else
            res.json(shoppingLists);
    });
}


function getByValue(arr,id)
{
    var result;
    result= arr.filter(function (o) {
        return o.id==id;
    });

    return result ? result[0] : null;


}
router.addShoppingList = function(req, res) {

    var shoppingLists = new shoppingList();

    shoppingLists.item1 = req.body.item1;
    shoppingLists.item2 = req.body.item2;
    shoppingLists.item3 = req.body.item3;
    shoppingLists.item4 = req.body.item4;
    shoppingLists.item5 = req.body.item5;
    shoppingLists.item6 = req.body.item6;
    shoppingLists.item7 = req.body.item7;
    shoppingLists.item8 = req.body.item8;
    shoppingLists.item9 = req.body.item9;
    shoppingLists.item10 = req.body.item10;
    shoppingLists.item11 = req.body.item11;
    shoppingLists.item12 = req.body.item12;
    shoppingLists.item13 = req.body.item13;
    shoppingLists.item14 = req.body.item14;
    shoppingLists.item15 = req.body.item15;



    console.log('Adding Shopping List: ' + JSON.stringify(shoppingList));

    shoppingLists.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Shopping List Added!', data: shoppingList });
    });
}



router.deleteShoppingList = function(req, res) {

    shoppingList.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Shopping List Deleted!'});
    });
}



module.exports = router;