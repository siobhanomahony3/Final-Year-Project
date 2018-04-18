var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    recipename: {type: String},
    recipetype: {type: String},
    ingredients: {type: String},
    rating: {type: Number, default: 0},
    uploadImg: {type: String},
    time_created: {type: Date, default: Date.now},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]


    // createdFor:{type: String, required: true},§
    // createdBy:{type: String,required: true}
});




module.exports = mongoose.model('Recipe', RecipeSchema);
