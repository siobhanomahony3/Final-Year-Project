var recipe = require('../models/recipe');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var result = require("mongoose");



router.findAll = function(req, res) {
    recipe.find(function(err, recipes) {
        if (err)
            res.send(err);

        res.json(recipes);
    });
}


router.findOne = function(req, res) {

    recipe.find({ "_id" : req.params.id },function(err, recipes) {
        if (err)
            res.json({ message: 'Recipe NOT Found!', errmsg : err } );
        else
            res.json(recipes);
    });
}


router.incrementUpvotes = function(req, res) {

    recipe.findById(req.params.id, function(err,recipe) {
        if (err)
            res.send(err);
        else {
            recipe.rating += 1;
            recipe.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Recipe Upvoted!', data: recipe });
            });
        }
    });
}


router.incrementDownvotes = function(req, res) {

    recipe.findById(req.params.id, function(err,recipe) {
        if (err)
            res.send(err);
        else {
            recipe.rating -= 1;
            recipe.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Recipe Downvoted!', data: recipe });
            });
        }
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

router.addRecipe = function(req, res) {

    var recipes = new recipe();

    recipes.recipename = req.body.recipename;
    recipes.recipetype = req.body.recipetype;
    recipes.ingredients = req.body.ingredients;
    recipes.cookingInstructions = req.body.cookingInstructions;
    recipes.dietaryRestrictions = req.body.dietaryRestrictions;
    recipes.rating = req.body.rating;


    console.log('Adding Recipe: ' + JSON.stringify(recipes));

    recipes.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Recipe Added!', data: recipes });
    });
}


router.deleteRecipe = function(req, res) {

    recipe.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Recipe Deleted!'});
    });
}

router.updateRecipe = function(req, res) {

    recipe.findById(req.params.id, function(err,recipes) {
        if (err)
            res.send(err);
        else {
            recipes.recipename = req.body.recipename;
            recipes.recipetype = req.body.recipetype;
            recipes.ingredients = req.body.ingredients;
            recipes.cookingInstructions = req.body.ingredients;
            recipes.ingredients = req.body.ingredients;
            recipes.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Recipe Updated!', data: recipes });
            });
        }
    });
}

module.exports = router;