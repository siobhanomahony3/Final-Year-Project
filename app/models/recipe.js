var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    recipename: {type: String},
    recipetype: {type: String},
    ingredients: {type: String},
    rating: {type: Number, default: 0}
});


module.exports = mongoose.model('Recipe', RecipeSchema);
