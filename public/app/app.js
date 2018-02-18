angular.module('userApp',['appRoutes','addrecipeController','recipesController', 'emailCtrl','userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices']) //inject all other modules into this module, this module is then injected into the index page

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors')
})