var User = require('../models/user')
var jwt = require('jsonwebtoken')
var secret = 'siobhan0303';




module.exports =  function(router){
    var app = this;
    app.token = jwt;

    router.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username
    user.password = req.body.password
    user.email = req.body.email

    if (req.body.username == null || req.body.username =='' || req.body.password == null || req.body.password =='' || req.body.email == null || req.body.email ==''){
        res.json({
            success:false,
            message:'Ensure nothing is left empty'
        })
    }else user.save(function (err) {
        if( err){
            res.json({
                success:false,
                message:'Username or Email already exists'
            })
        }else{
            res.json({
                success:true,
                message:'User Created!'})
    }
    });


    })


    router.post('/authenticate', function (req, res) {
        // res.send('testing new route')
        User.findOne({username: req.body.username}).select('email username password').exec(function (err, user) {
            if(err) throw err;

            if(!user){
                res.json({
                    success: false,
                    message:'Could not authenticate user'
                })
            }else if (user){
                if(req.body.password){
                var validPassword = user.comparePassword(req.body.password)
                }else {
                    res.json({
                        success: false,
                        message:'No password provided'
                    })
                }
                if(!validPassword){
                    res.json({
                        success: false,
                        message:'Could not authenticate password'
                    })
                }else {
                    app.token = jwt.sign({
                        username:user.username,
                        email:user.email
                    }, secret, {expiresIn: '24hr'})
                    res.json({
                        success: true,
                        message:'User authenticated',
                        token : token
                    })
                }
            }
        })
    })

    router.use(function (req, res, next) {
       var token = req.body.token || req.body.query || req.headers['x-access-token']

        if (token){
            jwt.verify(token, secret, function (err, decoded) {
                if (err){
                    res.json({
                        success: false,
                        message: 'Token invalid'
                    })
                }else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.json({
                success: false,
                message: 'No token provided'
            })
        }
    })


    router.post('/me', function (req, res) {
        res.send(req.decoded)
    })
    return router; //returns route to the server when accessed

}