angular.module('userControllers', ['userServices'])


.controller('regCtrl', function ($http, $location, $timeout, User) {

    var app = this;

    this.regUser = function(regData){
        app.loading = true;
        app.errorMsg = false;
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
        })

    }
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