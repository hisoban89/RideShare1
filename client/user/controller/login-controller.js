myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {
    //alert($scope.loginForm.username);
    
    //$scope.message = $scope.loginForm.username;
      // initial values
      $scope.error    = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          // console.log($scope.loginForm.username);
          $scope.username = $scope.loginForm.username;
          $location.path('/');
          $scope.disabled  = false;
          $scope.loginForm = {};
          // console.log($scope.loginForm);
        })
        // handle error
        .catch(function () {
          $scope.error        = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled     = false;
          $scope.loginForm    = {};
        });

    };

}]);