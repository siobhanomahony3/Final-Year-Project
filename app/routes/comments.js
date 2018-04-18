var comment = require('../models/comments');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



router.findAllComments = function(req, res) {
    comment.find(function(err, comments) {
        if (err)
            res.send(err);

        res.json(comments);
    });
}

router.findOneComment = function(req, res) {

    comment.find({ "_id" : req.params.id },function(err, comments) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.json(comments);
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

router.addComment = function(req, res) {

    var comments = new user();

    comments.body = req.body.body;
    comments.rating = req.body.rating;


    console.log('Comment User: ' + JSON.stringify(comments));

    comments.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Comment Added!', data: comments });
    });
}
router.incrementUpvotes = function(req, res) {

    comments.findById(req.params.id, function(err,comments) {
        if (err)
            res.send(err);
        else {
            comments.rating += 1;
            comments.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Recipe Upvoted!', data: comments });
            });
        }
    });
}


router.deleteComment = function(req, res) {

    user.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Comment Deleted!'});
    });
}




module.exports = router;