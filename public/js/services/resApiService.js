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
    }
  };

}]);