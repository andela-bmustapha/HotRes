
// hotel search controller

app.controller('hotelSearchCtrl', ['$rootScope', '$scope', 'apiCall', 'logChecker', '$state', function($rootScope, $scope, apiCall, logChecker, $state) {


  // check logged in state
  if (logChecker.isLoggedIn()) {
    $state.go('loggedIn');
  }

  if (!$rootScope.apiData) {
    $state.go('loggedOut');
  }

  // scope variables for pagination
  $scope.currentPage = 1;
  $scope.pageSize = 20;

  // function to save booking infomation to database
  $scope.makeReservation = function() {
    // build up the request object
    var reqObject = {
      hotelId: $scope.hotelToBookId,
      hotelName: $scope.hotelToBookName,
      managerId: $scope.hotelToBookManagerId,
      bookerName: $scope.bookerName,
      checkInDate: $scope.bookStartDate,
      checkOutDate: $scope.bookEndDate,
      comment: $scope.bookerComment
    };

    // make api call to save booking to database
    apiCall.sendReservation(reqObject).success(function(data) {
      if (data.message === 'Reservation sent') {
        // clear all models
        $scope.hotelToBookId = '';
        $scope.hotelToBookName = '';
        $scope.hotelToBookManagerId = '';
        $scope.bookerName = '';
        $scope.bookStartDate = '';
        $scope.bookEndDate = '';
        $scope.bookerComment = '';

        // alert user
        alert('Reservation sent!');
        $('#booking').closeModal();
      }
    });
  }

  $scope.openBookingModal = function(hotel) {
    // save hotel id to a scope variable
    $scope.hotelToBookId = hotel._id;
    $scope.hotelToBookName = hotel.name;
    $scope.hotelToBookManagerId = hotel.managerId;
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
      $scope.reviewErrorMessage = 'Name and Comment are required';
      return;
    }
    // construct the url
    var url = '/api/hotels/reviews/' + hotelId;
    // build the request object
    var reqObject = {
      name: $scope.name,
      review: $scope.comment
    }

    // make the api call to send request to save review in database
    apiCall.saveReview(url, reqObject).success(function(data) {
      $scope.name = '';
      $scope.comment = '';
      // review added success modal to be called from here...
      alert('Review sent');
      $('#addReviews').closeModal();
    });
  };



  // handle the review modal box operations
  $scope.openViewReviewsModal = function(hotel) {

    // clear error message and review array
    $scope.reviewReport = '';
    $scope.reviews = [];
    
    // build the api url
    var url = '/api/hotels/' + hotel._id;

    // make the api call
    apiCall.hotelSearch(url).success( function (data) {
      if (data.reviews.length === 0) {
        $scope.reviewReport = 'No Reviews.';
        $('#viewReviews').openModal();
      } else {
        $scope.reviews = data.reviews;
        $('#viewReviews').openModal();
      }
    }).error(function(err) {
      $scope.error = 'We can\'t fetch the reviews at the moment. Please try again...';
    });
  };


  $scope.closeViewReviewsModal = function() {
    $('#viewReviews').closeModal();
  };

  $scope.closeAddReviewsModal = function() {
    $('#addReviews').closeModal();
  }

}]);