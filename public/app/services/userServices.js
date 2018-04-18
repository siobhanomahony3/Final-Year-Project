angular.module('userServices', [])

    .factory('User', function ($http) {

        userFactory = {}

        userFactory.create = function (regData) {
            return $http.post('/api/users', regData)
        }

        // Check if username is available at registration
        userFactory.checkUsername = function(regData) {
            return $http.post('/api/checkusername', regData);
        };

        // Check if e-mail is available at registration
        userFactory.checkEmail = function(regData) {
            return $http.post('/api/checkemail', regData);
        };

        userFactory.activeAccount = function(token){
            return $http.put('/api/activate/' + token);
        }

        return userFactory;
    })

