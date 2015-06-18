
app.controller('MainCtrl', ['$rootScope', '$scope', 'apiCall', '$state', 'logChecker', function($rootScope, $scope, apiCall, $state, logChecker) {

  (function(){
    $(".button-collapse").sideNav();
  })();

  // check logged in state
  if (logChecker.isLoggedIn()) {
    $state.go('loggedIn');
  }

  // scope variables for pagination
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  // make api call to show four featured hotels
  apiCall.hotelSearch('/api/hotels').success(function(data) {
    $scope.featuredHotels = [];
    if (data.length > 4) {
      for (x = 0; x <= 3; x++) {
        $scope.featuredHotels.push(data[x]);
      }
    } else {
      $scope.featuredHotels = data;
    }
  });

  
  /* stand alone functions to handle
  *  api call promises...
  */
  function processResult(data) {
    if (data.constructor === Array) {
      $rootScope.apiData = data;
      $state.go('loggedOut.search');
    } else {
      $scope.errorMessage = data.message;
    }
  }


  // define function that handles user hotel search
  $scope.search = function() {

    // construct the api call url
    var url = '/api/hotels?';
    
    if ($scope.state && $scope.city) {
      url += 'state=' + $scope.state + '&city=' + $scope.city;    
    } else if ($scope.state) {
      url += 'state=' + $scope.state;
    } else if ($scope.city) {
      url += 'city=' + $scope.city;
    } else {
      $scope.errorMessage = 'Enter a state or city to search';
      return;
    }

    // make api call
    apiCall.hotelSearch(url).success(processResult);

  };
}]);










