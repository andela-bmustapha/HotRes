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
    },
    getManagerHotel: function(managerId, managerToken) {
      var req = {
        method: 'GET',
        url: '/api/hotels/manager/' + managerId,
        headers: {
          'x-access-token': managerToken
        }
      }
      return $http(req);
    },
    saveHotel: function(hotelId, managerToken, reqObject) {
      var req = {
        method: 'PUT',
        url: '/api/hotels/' + hotelId,
        headers: {
          'x-access-token': managerToken
        },
        data: reqObject
      }
      return $http(req);
    }
  };

}]);