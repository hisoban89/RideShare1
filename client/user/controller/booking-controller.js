angular.module('myApp').controller('bookingController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.booking = function () {
      // initial values
      $scope.error    = false;
      $scope.disabled = true;

      // call booking from service
      AuthService.booking($scope.bookingForm.booking)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled    = false;
          $scope.bookingForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error        = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled     = false;
          $scope.bookingForm  = {};
        });

    };

}]);