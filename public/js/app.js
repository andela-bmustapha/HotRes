var app = angular.module('hot-res', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('loggedOut', {
        url: '/',
        views: {
          '' : {
            templateUrl: 'partials/nav-loggedOut.html'
          },
          'theView@loggedOut': {
            templateUrl: 'partials/landing.html',
            controller: 'MainCtrl'
          }
        }
      })

      .state('loggedOut.search', {
        url: 'search',
        views: {
          'theView': {
            templateUrl: 'partials/search-results.html',
            controller: 'hotelSearch'
          }
        }
      })

      .state('loggedOut.signUp', {
        url: 'signup',
        views: {
          'theView': {
            templateUrl: 'partials/signUp.html',
            controller: 'SignUpCtrl'
          }
        }
      })

      .state('loggedOut.signIn', {
        url: 'signin',
        views: {
          'theView': {
            templateUrl: 'partials/signIn.html',
            controller: 'SignInCtrl'
          }
        }
      });

  }]);