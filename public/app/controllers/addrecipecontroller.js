var app = angular.module('addrecipeController', [])


app.controller('addrecipeController',['$scope', '$location', '$http', function($scope, $location, $http){
    $scope.message = 'Recipes Page!';

    $scope.addRecipe = function(addData){
        $http.post('/addrecipe', addData).success(function(data){
            $scope.recipes=data;
            $location.path('/recipes');
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' +data);

            });
    };
}


]);