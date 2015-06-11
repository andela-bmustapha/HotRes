
// dashboard main controller

app.controller('DashboardMainCtrl', ['$scope', 'apiCall', '$state', 'logChecker', function($scope, apiCall, $state, logChecker) {

  // self invoking function to handle mobile view menu
  (function(){
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  })();

  /* check for cookies. If cookies are found, then manager is still logged in,
      then load dashboard by making api calls to retrieve manager's infomation,
      else, redirect to the front page.
  */
  if (!logChecker.isLoggedIn()) {
    $state.go('loggedOut');
  }



  // logout function
  $scope.dashLogout = function() {
    logChecker.logout();
    $state.go('loggedOut');
  };

}]);