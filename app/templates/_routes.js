'use strict';

myApp
    .config(['$routeProvider', function($routeProvider) {
	// Define your routes
        
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
        
        
}]);
