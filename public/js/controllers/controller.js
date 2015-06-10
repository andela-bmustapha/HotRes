
app.controller('MainCtrl', ['$rootScope', '$scope', 'apiCall', '$state', function($rootScope, $scope, apiCall, $state) {

  (function(){
    $(".button-collapse").sideNav();
  })();
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
}])

.controller('SignUpCtrl', ['$scope', function($scope) {

  (function(){
    $('ul.tabs').tabs()
  })();

}]);










