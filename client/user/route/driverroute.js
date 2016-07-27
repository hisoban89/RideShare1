var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    // .when('/driverlogin', {
    //   templateUrl: 'partials/driverlogin.html',
    //   controller: 'driverloginController',
    //   access: {restricted: false}
    // })
    .when('/logout', {
      controller: 'driverlogoutController',
      access: {restricted: true}
    })
    .when('/driverregister', {
      templateUrl: 'partials/driverregister.html',
      controller: 'driverregisterController',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isDriverLoggedIn()){
          $location.path('/driverlogin');
          $route.reload();
        }
      });
  });
});