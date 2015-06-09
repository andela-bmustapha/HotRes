
// global url
var Mainurl = 'http://localhost:8000';

app.controller('MainCtrl', ['$rootScope', '$scope', 'apiCall', '$state', function($rootScope, $scope, apiCall, $state) {


  /* stand alone functions to handle
  *  api call promises...
  */
  function processResult(data) {
    // later to check if an array is returned...
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
    var url = Mainurl + '/api/hotels?';
    
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

    apiCall.hotelSearch(url).success(processResult);

  };
}])

.controller('SignUpCtrl', ['$scope', function($scope) {

}])

.controller('SignInCtrl', ['$scope', function($scope) {

}])

.controller('hotelSearch', ['$scope', 'apiCall', function($scope, apiCall) {

  /* stand alone functions to handle api call
     success results
  */
 
  // function for review saving...
  function reviewSuccess(data) {
    console.log(data);
  }



  $scope.openBookingModal = function() {
    $('#booking').openModal();
  };
  $scope.closeBookingModal = function() {
    $('#booking').closeModal();
  };

  // handle the add reviews modal box operations
  $scope.openAddReviewModal = function(hotel) {
    $scope.hotelId = hotel._id;
    $('#addReviews').openModal();
  };

  $scope.saveReviewModal = function(hotelId) {
    if (!$scope.name || !$scope.comment) {
      return;
    }
    // construct the url
    var url = Mainurl + '/api/hotels/reviews/' + hotelId;
    // build the request object
    var reqObject = {
      name: $scope.name,
      review: $scope.comment
    }

    // make the api call to send request to save review in database
    apiCall.saveReview(url, reqObject).success(reviewSuccess);
    $('#addReviews').closeModal();
  };

  // handle the review modal box operations
  $scope.openViewReviewsModal = function(hotel) {
    $scope.reviews = hotel.reviews;
    $('#viewReviews').openModal();
  };
  $scope.closeViewReviewsModal = function() {
    $('#viewReviews').closeModal();
  };

}]);










