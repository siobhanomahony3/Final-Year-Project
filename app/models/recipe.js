var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    created_by: {type: String},
    recipename: {type: String},
    recipetype: {type: String},
    ingredients: {type: String},
    cookingInstructions:{type: String},
    allergies: {type: String},
    rating: {type: Number, default: 0},
    uploadImg: { data: Buffer, contentType: String },
    time_created: {type: Date, default: Date.now},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});




module.exports = mongoose.model('Recipe', RecipeSchema);
