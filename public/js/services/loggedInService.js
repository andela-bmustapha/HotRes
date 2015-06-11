

app.factory('logChecker', ['$cookies', function($cookies) {

  return {
    isLoggedIn: function() {
      var managerCookie = $cookies.get('managerId');
      if (managerCookie) {
        return true;
      } else {
        return false;
      }
    },
    logout: function() {
      $cookies.remove('managerId');
    }
  };
}]);