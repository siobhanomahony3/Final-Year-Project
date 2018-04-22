var app = angular.module('recipesController', [])
app.controller('recipesController', ['$scope','$http', function($scope, $http, User) {
    // create a message to display in our view
    $scope.message = 'Recipes Page!';


    findAll();

    function findAll() {
        $http.get('/recipe')
            .success(function (data) {
                $scope.recipes = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

      $scope.incrementUpvotes = function(id){
            $http.put('/recipe/' + id + '/rating')
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    $scope.incrementDownvotes = function(id){
        $http.put('/recipe/' + id + '/rating')
            .success(function(data) {
                console.log(data);
                findAll();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this Recipe?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/recipe/' + id).success(function(data) {
                console.log(data);
                findAll();
            })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    $scope.current = {};

    $scope.update = function (recipe) {
        console.log(recipe._id);
        $scope.current = recipe;
    };

    $scope.save = function () {
        console.log($scope.current._id);
        $http.put('recipe/' + $scope.current._id + '/update', $scope.current).success(function (data) {
            console.log(data);
            findAll()
            $scope.current = ""
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    }

}
]);