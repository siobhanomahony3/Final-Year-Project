angular.module('mainController', ['authServices', 'userServices'])


.controller('mainCtrl', function (Auth, $timeout, $location,$rootScope, $window, User) {
    var app = this;

    app.loadme = false;

    $rootScope.$on('$routeChangeStart', function () {
        if (Auth.isLoggedIn()) {
            // console.log('Success: User is logged in')
            app.isLoggedIn   = true;
            Auth.getUser().then(function (data) {
                // console.log(data.data.username)
                app.username=data.data.username
                app.useremail=data.data.email

                User.getPermission().then(function (data) {
                    if(data.data.permission === 'admin'){
                        app.authorized = true;
                        app.loadme = true;
                    }  else{
                        app.loadme = true;

                    }
                });
            });
        } else {
            // console.log('Failure: User is not logged in')
            app.isLoggedIn = false;
            app.username= ''
            app.loadme = true;

        }
        if($location.hash() == '_=_'){
            $location.hash(null)
        }
    })



    this.facebook = function () {
        console.log($window.location.host) //localhost:3000
        console.log($window.location.protocol) //http:
        $window.location = $window.location.protocol+ '//' + $window.location.host + '/auth/facebook'


    }

    this.twitter = function () {
        console.log($window.location.host) //localhost:3000
        console.log($window.location.protocol) //http:
        $window.location = $window.location.protocol+ '//' + $window.location.host + '/auth/twitter'


    }


    this.google = function () {
        console.log($window.location.host) //localhost:3000
        console.log($window.location.protocol) //http:
        $window.location = $window.location.protocol+ '//' + $window.location.host + '/auth/google'


    }

    this.doLogin = function(loginData){
        app.loading = true;
        app.errorMsg = false;

        Auth.login(app.loginData).then(function (data) {

            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message+ '.......... Redirecting'
                $timeout(function () {
                    $location.path('/profile')
                    app.loginData = '';
                    app.successMsg = false;

                },2000);

            }else {
                app.loading = false;
                app.errorMsg = data.data.message

            }
        })

    }

    this.logout = function () {
        Auth.logout();
       $location.path('/logout')
        $timeout(function (){
            $location.path('/')
        },2000)
            

    }

})