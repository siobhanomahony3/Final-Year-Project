var app = angular.module('shoppinglistCtrl', [])
app.controller('shoppinglistCtrl', ['$scope','$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Shopping List Page!';


    findAll();

    function findAll() {
        $http.get('/shoppingList')
            .success(function (data) {
                $scope.shoppingLists = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this Shopping List?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/shoppingList/' + id).success(function(data) {
                console.log(data);
                findAll();
            })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };




}
]);