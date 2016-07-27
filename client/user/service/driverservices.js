angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create driver variable
    var driver = null;

    // return available functions for use in the controllers
    return ({
      isDriverLoggedIn: isDriverLoggedIn,
      getStatus: getStatus,
      driverlogin: driverlogin,
      logout: logout,
      driverregister: driverregister,
    });

    function isDriverLoggedIn() {
      if(driver) {
        return true;
      } else {
        return false;
      }
    }

    function getStatus() {
      return $http.get('/driver/driverstatus')
      // handle success
      .success(function (data) {
        if(data.status){
          driver = true;
        } else {
          driver = false;
        }
      })
      // handle error
      .error(function (data) {
        driver = false;
      });
    }

    function driverlogin(dusername, dpassword) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/driver/driverlogin',
        {username: dusername, password: dpassword})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            driver = true;
            deferred.resolve();
          } else {
            driver = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          driver = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/driver/logout')
        // handle success
        .success(function (data) {
          driver = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          driver = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function driverregister(driverfname, driverlname, username, password) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/driver/driverregister',
        {driverfname: driverfname, driverlname: driverlname, username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });
      // return promise object
      return deferred.promise;

    }

}]);