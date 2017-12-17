var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    recipename: String,
    recipetype: String,
    ingredients: String,
    rating: {type: Number, default: 0}
});


module.exports = mongoose.model('Recipe', RecipeSchema);
