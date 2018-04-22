var app = angular.module('addShoppingList', [])
app.controller('addShoppingList',['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.message = 'Shopping List Page!';

    $scope.addShoppingList = function (addData) {
        $http.post('/addshoppingList', addData).success(function (data) {
            $scope.shoppingLists = data;
            $location.path('/shopping');
            console.log(data);
        })
            .error(function (data) {
                console.log('Error: ' + data);

            });
    };

}
]);