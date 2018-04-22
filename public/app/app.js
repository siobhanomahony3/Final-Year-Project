angular.module('userApp',['appRoutes','addrecipeController', 'recipesController', 'emailCtrl','userControllers', 'googlemapsCtrl', 'userServices', 'ngAnimate', 'mainController', 'authServices','addShoppingList','shoppinglistCtrl' ]) //inject all other modules into this module, this module is then injected into the index page

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors')
})