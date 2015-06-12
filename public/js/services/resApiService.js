/*
  api-call service that makes the api call using the 
  andgular in-built $http service for AJAX calls
*/

app.factory('apiCall',['$http', function($http) {

  return {
    hotelSearch: function(url) {
      return  $http.get(url);
    },
    saveReview: function(url, reqObject) {
      return $http.post(url, reqObject);
    },
    managerSignUp: function(reqObject) {
      return $http.post('/api/managers', reqObject);
    },
    managerLogin: function(reqObject) {
      return $http.post('/api/managers/login', reqObject);
    },
    getSingleManager: function(managerId) {
      return $http.get('api/managers/' + managerId);
    }
  };

}]);