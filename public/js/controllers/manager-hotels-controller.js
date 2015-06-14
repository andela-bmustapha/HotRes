


// dashboard main controller

app.controller('ManagerHotelsCtrl', ['$scope', 'apiCall', 'logChecker', '$cookies', function($scope, apiCall, logChecker, $cookies) {

  // self invoking function to handle mobile view menu
  (function(){
    $(".button-collapse").sideNav();
    $('select').material_select();
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

  // function to be called on successful api call
  function processHotels(data) {
    // check if manager has no hotel by checking for the 
    // message key in returned data
    if (data.message) {
      $scope.managerHotelErrorMessage = 'You currently manage no hotel.';
    } else {
      $scope.managerHotels = data;
    }
  }

  // make api call to populate the dashboard nav bar
  // get managerId from cookies before api call
  apiCall.getManagerHotel(managerId, managerToken).success(processHotels);


  // function to run when hotel is saved
  function processHotelSave(data) {

    if (data.message === 'Server Error') {
      $scope.hotelSaveError = 'Sorry we can\'t complete your request. Try again later.' ;
    } else if (data.message === 'Error Updating Hotel') {
      $scope.hotelSaveError = 'There was an error updating hotel. Try again later.';
    } else if (data.message === 'Hotel updated') {
      // make api call to update manager's hotel...
      apiCall.getManagerHotel(managerId, managerToken).success(processHotels);
      alert('Hotel update!');
      $('#editHotelModal').closeModal();
    }
  }

  // function to open up hotel details
  $scope.viewHotel = function(hotel) {
    $scope.singleHotel = hotel;
  }

  // function to open up the hotel edit modal and assign values to models
  $scope.editHotel = function(hotel) {
    // remove error message
    $scope.hotelSaveError = '';

    // assign current hotel details to models
    $scope.hotelName = hotel.name;
    $scope.hotelPictureUrl = hotel.pictureUrl;
    $scope.hotelState = hotel.state;
    $scope.hotelCity = hotel.city;
    $scope.hotelAddress = hotel.address;
    $scope.hotelDescription = hotel.description;

    // open modal window
    $('#editHotelModal').openModal();
  }

  // function to save hotel
  $scope.saveHotel = function(hotel) {

    // validate the models before saving to database..
    if (!$scope.hotelName || !$scope.hotelPictureUrl || !$scope.hotelState || !$scope.hotelCity || !$scope.hotelAddress || !$scope.hotelDescription) {
      $scope.hotelSaveError = 'All fields are required!'
      return;
    }

    // check if no change was made to models...
    if ($scope.hotelName === hotel.name && $scope.hotelPictureUrl === hotel.pictureUrl && $scope.hotelState === hotel.state && $scope.hotelCity === hotel.city && $scope.hotelAddress === hotel.address && $scope.hotelDescription === hotel.description) {
      $scope.hotelSaveError = 'No change was made.'
      return;
    }

    // build up the request object
    var reqObject = {
      name: $scope.hotelName,
      pictureUrl: $scope.hotelPictureUrl,
      state: $scope.hotelState,
      city: $scope.hotelCity,
      address: $scope.hotelAddress,
      description: $scope.hotelDescription,
      bookable: $scope.hotelBookable
    }

    // make api call to save edited hotel to database
    apiCall.saveHotel(hotel._id, managerToken, reqObject).success(processHotelSave); 
  }

  // function to view hotel reviews
  $scope.viewReviews = function(hotel) {
    $('#hotelReviewModel').openModal();
    $scope.hotelReviews = hotel.reviews;
  }
  // function to close hotel review modal
  $scope.closeViewReviewsModal = function() {
    $('#hotelReviewModel').closeModal();
  }

}]);