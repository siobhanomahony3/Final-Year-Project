var app = angular.module('appRoutes',['ngRoute']);

app.service('updateRecipeService', function(){
    var updateRecipeService = {
        recipename:'',
        recipetype:'',
        ingredients:'',
        cookingInstructions:'',
        allergies:'',
        newRecipe:''
    };
    return updateRecipeService;
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider


        .when('/',{
            templateUrl: 'app/views/pages/home.ejs'
        })

        .when('/recipes/:id', {
            templateUrl : 'app/views/pages/recipes/recipes.ejs',
            controller  : 'recipesController',
            authenticated: true
        })

        .when('/addrecipe', {
            templateUrl : 'app/views/pages/recipes/addrecipe.ejs',
            controller  : 'addrecipeController',
            authenticated: true
        })

        .when('/shopping', {
            templateUrl : 'app/views/pages/recipes/shoppingList.ejs',
            controller  : 'shoppinglistCtrl',
            authenticated: true
        })

        .when('/addshoppingList', {
            templateUrl : 'app/views/pages/recipes/addshoppingList.ejs',
            controller  : 'addShoppingList',
            authenticated: true
        })

        .when('/management',{

            templateUrl: 'app/views/pages/management/management.ejs',
            controller: 'managementCtrl',
            controllerAs: 'management',
            authenticated: true,
            permission: ['admin', 'moderator']

        })

        .when('/googleMaps', {
            templateUrl : 'app/views/pages/recipes/googleMaps.ejs',
            authenticated: true
        })

        .when('/nonuser', {
            templateUrl : 'app/views/pages/recipes/nonuser.ejs',

        })

        .when('/login',{

            templateUrl: 'app/views/pages/users/login.ejs',
            authenticated: false

        })
        .when('/register',{

            templateUrl: 'app/views/pages/users/register.ejs',
            controller: 'regCtrl',
            controllerAs: 'register', //nickname for controller
            authenticated: false
        })

        .when('/logout',{
            templateUrl: 'app/views/pages/users/logout.ejs',
            authenticated: true
        })
        .when('/camera',{

            templateUrl: 'app/views/pages/recipes/camera.ejs',
            authenticated: true
        })

        .when('/profile',{

            templateUrl: 'app/views/pages/users/profile.ejs',
            // controller: 'regCtrl',
            // controllerAs: 'register' //nickname for controller
            authenticated: true

        })

        .when('/policy',{

            templateUrl: 'app/views/pages/privatepolicy.ejs',
            // controller: 'regCtrl',
            // controllerAs: 'register' //nickname for controller

        })


        .when('/facebook/:token',{

            templateUrl: 'app/views/pages/users/social/social.html',
            controller: 'facebookCtrl',
            controllerAs: 'facebook', //nickname for controller,
            authenticated: false

        })

        .when('/twitter/:token',{

            templateUrl: 'app/views/pages/users/social/social.html',
            controller: 'twitterCtrl',
            controllerAs: 'twitter', //nickname for controller
            authenticated: false


        })
        .when('/resetusername', {
            templateUrl:'app/views/pages/users/reset/username.html',
            controller: 'usernameCtrl',
            controllerAs: 'username',
            authenticated: false
        })

        .when('/activate/:token', {
            templateUrl:'app/views/pages/users/activation/activate.html',
            controller: 'emailCtrl',
            controllerAs: 'email'

        })

        .when('/facebookerror',{

            templateUrl: 'app/views/pages/users/login.ejs',
            controller: 'facebookCtrl',
            controllerAs: 'facebook', //nickname for controller
            authenticated: false

        })

        .when('/twittererror',{

            templateUrl: 'app/views/pages/users/login.ejs',
            controller: 'twitterCtrl',
            controllerAs: 'twitter', //nickname for controller
            authenticated: false

        })

        .when('/googleerror',{

            templateUrl: 'app/views/pages/users/login.ejs',
            controller: 'googleCtrl',
            controllerAs: 'google', //nickname for controller
            authenticated: false

        })

        .when('/google/:token',{

            templateUrl: 'app/views/pages/users/social/social.html',
            controller: 'googleCtrl',
            controllerAs: 'google', //nickname for controller
            authenticated: false

        })
        .otherwise({
            redirectTo: '/'
        })   // redirects users to the home page if the url is incorrect or does not exist


    $locationProvider.html5Mode({
        enabled:true,
        requireBase: false
    })

})

app.run(['$rootScope', 'Auth', '$location','User' ,function ($rootScope, Auth, $location, User) {
    $rootScope.$on('$routeChangeStart',  function (event, next, current) {

        if(next.$$route.authenticated == true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/')
            }else if (next.$$route.permission) {
                User.getPermission().then(function (data) {
                    if (next.$$route.permission[0] !== data.data.permission){
                        if (next.$$route.permission[1] !== data.data.permission){
                            event.preventDefault();
                            $location.path('/');
                        }
                    }

                });
            }

        }else if (next.$$route.authenticated == false){

            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile')
            }

        }else console.log("does not matter")

        // console.log(next.$$route.authenticated = true)
        // console.log(Auth.isLoggedIn())
    })


}]);
