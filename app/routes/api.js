var User = require('../models/user');
var Comment = require('../models/comments');
var recipe = require('../models/recipe');
var jwt = require('jsonwebtoken');
var secret = 'siobhan0303';
var passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');




module.exports =  function(router){


    var options = {
        auth: {
            api_user: 'siobhanomahony3',
            api_key: 'aghadine3'
        }
    }

    var client = nodemailer.createTransport(sgTransport(options));


    var app = this;
    app.token = jwt;

    router.post('/users', function(req, res) {
        var user = new User(); // Create new User object
        user.username = req.body.username; // Save username from request to User object
        user.password = req.body.password; // Save password from request to User object
        user.email = req.body.email; // Save email from request to User object
        user.name = req.body.name; // Save name from request to User object
        user.temporarytoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail

        // Check if request is valid and not empty or null
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    // Check if any validation errors exists (from user model)
                    if (err.errors !== null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); // Display error in validation (username)
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
                        } else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    } else if (err) {
                        // Check if duplication error exists
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'That username is already taken' }); // Display error if username already taken
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'That e-mail is already taken' }); // Display error if e-mail already taken
                            }
                        } else {
                            res.json({ success: false, message: err }); // Display any other error
                        }
                    }
                } else {
                    // Create e-mail object to send to user
                    var email = {
                        from: 'Cookz Staff, Cookz@localhost.com',
                        to: user.email,
                        subject: 'Cookz Activation Link',
                        text: 'Hello ' + user.name + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost3000/activate/' + user.temporarytoken,
                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/activate/' + user.temporarytoken + '">http://localhost:3000/activate/</a>'
                    };
                    // Function to send e-mail to the user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error with sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log success message to console if sent
                            console.log(user.email); // Display e-mail that it was sent to
                        }
                    });
                    res.json({ success: true, message: 'Account registered! Please check your e-mail for activation link.' }); // Send success message back to controller/request
                }
            });
        }
    });



// Route to check if username chosen on registration page is taken
    router.post('/checkusername', function(req, res) {
        User.findOne({ username: req.body.username }).select('username').exec(function(err, user) {
            if (err) {
                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                var email = {
                    from: 'Cookz Staff, Cookz@localhost.com',
                    to: user.email,
                    subject: 'Cookz Activation Link',
                    text: 'Hello ' + user.name + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost3000/activate/' + user.temporarytoken,
                    html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/activate/' + user.temporarytoken + '">http://localhost:3000/activate/</a>'
                };
                // Function to send e-mail to myself
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console if sent
                        console.log(user.email); // Display e-mail that it was sent to
                    }
                });
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (user) {
                    res.json({ success: false, message: 'That username is already taken' }); // If user is returned, then username is taken
                } else {
                    res.json({ success: true, message: 'Valid username' }); // If user is not returned, then username is not taken
                }
            }
        });
    });

    // Route to check if e-mail chosen on registration page is taken
    router.post('/checkemail', function(req, res) {
        User.findOne({ email: req.body.email }).select('email').exec(function(err, user) {
            if (err) {
                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                var email = {
                    from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                    to: 'gugui3z24@gmail.com',
                    subject: 'Error Logged',
                    text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                    html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                };
                // Function to send e-mail to myself
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console if sent
                        console.log(user.email); // Display e-mail that it was sent to
                    }
                });
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (user) {
                    res.json({ success: false, message: 'That e-mail is already taken' }); // If user is returned, then e-mail is taken
                } else {
                    res.json({ success: true, message: 'Valid e-mail' }); // If user is not returned, then e-mail is not taken
                }
            }
        });
    });



    router.post('/authenticate', function (req, res) {
        // res.send('testing new route')
        User.findOne({username: req.body.username}).select(' name email username password').exec(function (err, user) {
            if(err) throw err;
            if(!user){res.json({success: false, message:'Could not authenticate user'
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
                    res.json({success: false, message:'Could not authenticate password'
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



    router.post('/authenticate', function(req, res) {
        var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
        User.findOne({ username: loginUser }).select('email username password active').exec(function(err, user) {
            if (err) {
                if (!user) {
                    res.json({ success: false, message: 'Username not found' }); // Username not found in database
                } else if (user) {
                    // Check if user does exist, then compare password provided by user
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' }); // Password was not provided
                    } else {
                        var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
                        } else if (!user.active) {
                            res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true }); // Account is not activated
                        } else {
                            var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // Logged in: Give user token
                            res.json({ success: true, message: 'User authenticated!', token: token }); // Return token in JSON object to controller
                        }
                    }
                }
            }
        });
    });


    router.put('/activate/:token', function(req, res) {
        User.findOne({ temporarytoken: req.params.token }, function(err, user) {
            if (err) {
                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                var email = {
                    from: 'Cookz Staff, Cookz@localhost.com',
                    to: user.email,
                    subject: 'Account Activated',
                    text: 'Hello ' + user.name + ', Your account has been successfully activated!',
                    html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                };
                // Function to send e-mail to myself
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console if sent
                        console.log(user.email); // Display e-mail that it was sent to
                    }
                });
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                var token = req.params.token; // Save the token from URL for verification
                // Function to verify the user's token
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        res.json({ success: false, message: 'Activation link has expired.' }); // Token is expired
                    } else if (!user) {
                        res.json({ success: false, message: 'Activation link has expired.' }); // Token may be valid but does not match any user in the database
                    } else {
                        user.temporarytoken = false; // Remove temporary token
                        user.active = true; // Change account status to Activated
                        // Mongoose Method to save user into the database
                        user.save(function(err) {
                            if (err) {
                                console.log(err); // If unable to save user, log error info to console/terminal
                            } else {
                                // If save succeeds, create e-mail object
                                var email = {
                                    from: 'Cookz Staff, Cookz@localhost.com',
                                    to: user.email,
                                    subject: 'Account Activated',
                                    text: 'Hello ' + user.name + ', Your account has been successfully activated!',
                                    html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                                };
                                // Send e-mail object to user
                                client.sendMail(email, function(err, info) {
                                    if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
                                });
                                res.json({ success: true, message: 'Account activated!' }); // Return success message to controller
                            }
                        });
                    }
                });
            }
        });
    });



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


    router.get('/permission',  function (req, res) {
        User.findOne({username: req.decoded.username}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "No user was found"});
            } else {
                res.json({ success: true, permission: user.permission});
            }

        });


    });

}