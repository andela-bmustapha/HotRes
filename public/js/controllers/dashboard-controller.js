
// dashboard main controller

app.controller('DashboardMainCtrl', ['$scope', 'apiCall', '$state', 'logChecker', '$cookies', function($scope, apiCall, $state, logChecker, $cookies) {

  // self invoking function to handle mobile view menu
  (function(){
    $(".button-collapse").sideNav();
  })();

  /* check for cookies. If cookies are found, then manager is still logged in,
      then load dashboard by making api calls to retrieve manager's infomation,
      else, redirect to the front page.
  */
  if (!logChecker.isLoggedIn()) {
    $state.go('loggedOut');
  }

  // get values from cookies
  var managerId = $cookies.get('managerId');
  var managerToken = $cookies.get('managerToken');

  // function to handle the dashboard population apiCall success
  function populateDash(data) {
    $scope.managerDetails = data;
    if (!$scope.managerDetails.imageUrl) {
      $scope.managerDetails.imageUrl = 'img/avatar.png';
    }
  }



  // make api call to populate the dashboard nav bar
  // get managerId from cookies before api call
  apiCall.getSingleManager(managerId).success(populateDash);


















  // logout function
  $scope.dashLogout = function() {
    logChecker.logout();
    $state.go('loggedOut');
  };

}]);