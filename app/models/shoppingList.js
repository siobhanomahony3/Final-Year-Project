var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
    item1: {type: String},
    item2: {type: String},
    item3: {type: String},
    item4: {type: String},
    item5: {type: String},
    item6: {type: String},
    item7: {type: String},
    item8: {type: String},
    item9: {type: String},
    item10: {type: String},
    item11: {type: String},
    item12: {type: String},
    item13: {type: String},
    item14: {type: String},
    item15: {type: String},



});




module.exports = mongoose.model('shoppingList', ShoppingListSchema);