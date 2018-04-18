var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    created_by: String,
    body: { type: String, required: true },
    rating: { type: Number, default: 0 },
    time_created: { type: Date, default: Date.now },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
});



mongoose.model('Comment', CommentSchema);