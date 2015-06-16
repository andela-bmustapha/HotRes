var app = angular.module('hot-res', ['ui.router', 'ngCookies', 'angularMoment', 'angularFileUpload'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('loggedOut', {
        url: '/',
        views: {
          '' : {
            templateUrl: '../partials/nav-loggedOut.html'
          },
          'theView@loggedOut': {
            templateUrl: '../partials/landing.html',
            controller: 'MainCtrl'
          }
        }
      })

      .state('loggedOut.search', {
        url: 'search',
        views: {
          'theView': {
            templateUrl: '../partials/search-results.html',
            controller: 'hotelSearchCtrl'
          }
        }
      })

      .state('loggedOut.signUpLogIn', {
        url: 'signUpLogIn',
        views: {
          'theView': {
            templateUrl: '../partials/signUpLogIn.html',
            controller: 'SignUpLogInCtrl'
          }
        }
      })

      .state('loggedIn', {
        url: '/dashboard',
        views: {
          '' : {
            templateUrl: '../partials/nav-loggedIn.html'
          },
          'theView@loggedIn': {
            templateUrl: '../partials/dashboard.html',
            controller: 'DashboardMainCtrl'
          }
        }
      })

      .state('loggedIn.hotels', {
        url: '/hotels',
        views: {
          'dashView': {
            templateUrl: '../partials/manager-hotels.html',
            controller: 'ManagerHotelsCtrl'
          }
        }
      })

      .state('loggedIn.editProfile', {
        url: '/profile',
        views: {
          'dashView': {
            templateUrl: '../partials/manager-profile.html',
            controller: 'ManagerProfileCtrl'
          }
        }
      })

      .state('loggedIn.bookings', {
        url: '/bookings',
        views: {
          'dashView': {
            templateUrl: '../partials/hotel-bookings.html',
            controller: 'ManagerBookingsCtrl'
          }
        }
      })

      .state('loggedIn.hotelsAdd', {
        url: '/hotels/add',
        views: {
          'dashView': {
            templateUrl: '../partials/hotel-add.html',
            controller: 'addHotelCtrl'
          }
        }
      });

  }]);