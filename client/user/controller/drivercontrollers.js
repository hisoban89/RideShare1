angular.module('myApp').controller('driverloginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.driverlogin = function () {
      // initial values
      $scope.error    = false;
      $scope.disabled = true;

      // call login from service
      AuthService.driverlogin($scope.loginForm.dusername, $scope.loginForm.dpassword)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled  = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error        = true;
          $scope.errorMessage = "Invalid username or password";
          $scope.disabled     = false;
          $scope.loginForm    = {};
        });

    };

}]);

angular.module('myApp').controller('driverlogoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/driverlogin');
        });

    };

}]);

angular.module('myApp').controller('driverregisterController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.driverregister = function () {
      // initial values
      $scope.error    = false;
      $scope.disabled = true;

      // call driverregister from service
      AuthService.driverregister(
        $scope.registerForm.driverfname,
        $scope.registerForm.driverlname,
        $scope.registerForm.username,
        $scope.registerForm.password
      )
        // handle success
        .then(function () {
          $location.path('/driverlogin');
          $scope.disabled     = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error        = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled     = false;
          $scope.registerForm = {};
        });

    };

}]);