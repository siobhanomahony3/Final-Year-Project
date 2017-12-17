var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var morgan = require('morgan')// <------Middleware------->
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router()
var appRoutes = require('./app/routes/api')(router)  //user router object with this route file
var path = require('path')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('./app/passport/passport.js')(passport, FacebookStrategy, TwitterStrategy, GoogleStrategy, app)

// <!-- All Routes -->
var recipe = require("./app/routes/recipe");



app.use(morgan('dev')); // logs requests eg. "GET /404" or "GET/home 200 in console
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname+ '/public'))//give frontend access to the public folder
app.use('/api', appRoutes);// defining backend routes to differentiate from frontend routes to avoid nameing conflictions




app.get('/recipe', recipe.findAll);
app.get('/recipe/:id', recipe.findOne);
app.post('/addrecipe', recipe.addRecipe);
app.delete('/recipe/:id', recipe.deleteRecipe);
app.put('/recipe/:id/update', recipe.updateRecipe);
app.put('/recipe/:id/rating', recipe.incrementUpvotes);
app.put('/recipe/:id/rating', recipe.incrementDownvotes);





mongoose.connect('mongodb://localhost:27017/appdb', function(err){
    if (err){
        console.log('Not connected to the db' + err)
    } else {
        console.log('Successfully Connected to the db')

    }
});


app.get('*',function (req,res) {
    res.sendFile(path.join(__dirname+ '/public/app/views/index.html'))
});





app.listen(port, function () {
    console.log('Running Server on port '+ port)
});
