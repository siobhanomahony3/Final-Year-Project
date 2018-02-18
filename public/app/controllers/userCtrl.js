angular.module('userControllers', ['userServices'])


    .controller('regCtrl', function ($http, $location, $timeout, User) {

        var app = this;

        this.regUser = function(regData, valid){
            app.loading = true;
            app.errorMsg = false;
            if(valid){
                User.create(app.regData).then(function (data) {

                    if(data.data.success){
                        app.loading = false;
                        app.successMsg = data.data.message+ '.......... Redirecting'
                        $timeout(function () {
                            $location.path('/login')
                        },2000);

                    }else {
                        app.loading = false;
                        app.errorMsg = data.data.message

                    }
                });


            }else{

                app.loading = false;
                app.errorMsg = 'Please ensure form is fulled out properly';
            }

        };


        this.checkUsername = function(regData){
            app.checkingUsername =true;
            app.usernameMsg=false;
            app.usernameInvalid=false;
            User.checkUsername(regData).then(function(data){
                if (data.data.success){
                    app.checkingUsername=false;
                    app.usernameInvalid=false;
                    app.usernameMsg = data.data.message;
                }else{
                    app.checkingUsername =false;
                    app.usernameInvalid=true;
                    app.usernameMsg = data.data.message;
                }
            });
        }
        this.checkEmail = function(regData){
            app.checkingEmail =true;
            app.emailMsg=false;
            app.emailInvalid=false;
            User.checkEmail(regData).then(function(data){
                if (data.data.success){
                    app.checkingEmail=false;
                    app.emailInvalid=false;
                    app.emailMsg = data.data.message;
                }else{
                    app.checkingEmail =false;
                    app.emailInvalid=true;
                    app.emailMsg = data.data.message;
                }
            });
        }


    })

    // Custom directive to check matching passwords
    .directive('match', function() {
        return {
            restrict: 'A', // Restrict to HTML Attribute
            controller: function($scope) {
                $scope.confirmed = false; // Set matching password to false by default

                // Custom function that checks both inputs against each other
                $scope.doConfirm = function(values) {
                    // Run as a loop to continue check for each value each time key is pressed
                    values.forEach(function(ele) {
                        // Check if inputs match and set variable in $scope
                        if ($scope.confirm == ele) {
                            $scope.confirmed = true; // If inputs match
                        } else {
                            $scope.confirmed = false; // If inputs do not match
                        }
                    });
                };
            },

            link: function(scope, element, attrs) {

                // Grab the attribute and observe it
                attrs.$observe('match', function() {
                    scope.matches = JSON.parse(attrs.match); // Parse to JSON
                    scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other
                });

                // Grab confirm ng-model and watch it
                scope.$watch('confirm', function() {
                    scope.matches = JSON.parse(attrs.match); // Parse to JSON
                    scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other
                });
            }
        };
    })

    .controller('facebookCtrl', function ($routeParams, Auth, $location, $window) {
        var app = this;

        if($window.location.pathname == '/facebookerror'){
            app.errorMsg = 'Email address of Facebook account used is not registered'

        }else {
            Auth.facebook($routeParams.token)
            $location.path('/profile')}
    })

    .controller('twitterCtrl', function ($routeParams, Auth, $location, $window) {
        var app = this;

        if($window.location.pathname == '/twittererror'){
            app.errorMsg = 'Email address of Twitter account used is not registered'

        }else {
            Auth.facebook($routeParams.token)
            $location.path('/profile')}
    })

    .controller('googleCtrl', function ($routeParams, Auth, $location, $window) {
        var app = this;

        if($window.location.pathname == '/googleerror'){
            app.errorMsg = 'Email address of Google+ account used is not registered'

        }else {
            Auth.facebook($routeParams.token)
            $location.path('/profile')}
    })