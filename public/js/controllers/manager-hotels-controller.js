


// dashboard main controller

app.controller('ManagerHotelsCtrl', ['$scope', 'apiCall', 'logChecker', '$cookies', 'imageUploader', function($scope, apiCall, logChecker, $cookies, imageUploader) {

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

  // make api call to populate the manager's hotel dash
  // get managerId from cookies before api call
  apiCall.getManagerHotel(managerId, managerToken).success(processHotels);

  $scope.fileSelected = function(files) {
    if (files && files.length) {
      $scope.file = files[0];
    }
  };

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
    $scope.hotelState = hotel.state;
    $scope.hotelCity = hotel.city;
    $scope.hotelAddress = hotel.address;
    $scope.hotelDescription = hotel.description;
    $scope.hotelBookable = hotel.bookable;

    // open modal window
    $('#editHotelModal').openModal();
  }

  // function to save hotel
  $scope.saveHotel = function(hotel) {

    // validate the models before saving to database..
    if (!$scope.hotelName || !$scope.hotelState || !$scope.hotelCity || !$scope.hotelAddress || !$scope.hotelDescription || !$scope.hotelBookable) {
      $scope.hotelSaveError = 'All fields are required!'
      return;
    }

    // check if no change was made to models...
    if ($scope.hotelName === hotel.name && $scope.hotelState === hotel.state && $scope.hotelCity === hotel.city && $scope.hotelAddress === hotel.address && $scope.hotelDescription === hotel.description && $scope.hotelBookable === hotel.bookable && !$scope.file) {
      $scope.hotelSaveError = 'No change was made.'
      return;
    }

    // check if bookable model is filled correctly
    $scope.hotelBookable = $scope.hotelBookable.toLowerCase();
    if ($scope.hotelBookable !== 'yes') {
      if ($scope.hotelBookable !== 'no') {
        if (!$scope.hotelAddErrorMessage) {
          $scope.hotelSaveError = 'Availability can either be "yes" or "no"';
          validated = false;
          return;
        }
      }
    }

    // build up the request object
    var reqObject = {
      name: $scope.hotelName,
      state: $scope.hotelState,
      city: $scope.hotelCity,
      address: $scope.hotelAddress,
      description: $scope.hotelDescription,
      bookable: $scope.hotelBookable
    }

    // check if $scope.file is available before sending to cloudinary
    if ($scope.file) {
      imageUploader.imageUpload($scope.file).progress(function(evt) {}).success(function(data) {
        reqObject.pictureUrl = data.url;
        // make api call to save edited hotel to database
        apiCall.saveHotel(hotel._id, managerToken, reqObject).success(processHotelSave);
      });
    } else {
      // make api call to save edited hotel to database
      apiCall.saveHotel(hotel._id, managerToken, reqObject).success(processHotelSave);
    }
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

  // function to delete hotel
  $scope.deleteHotel = function(hotel) {

    // display a prompt to confirm delete
    var action = confirm("Are you sure you want to delete " + hotel.name);
    if (action !== true) {
      return;
    } else {
      // make api call to delete hotel
      apiCall.deleteHotel(managerToken, hotel._id).success(function(data) {
        if (data.message === 'Successfully deleted') {
          $scope.singleHotel = '';
          alert('Hotel successfully deleted!');
          // refresh hotel list here...
          apiCall.getManagerHotel(managerId, managerToken).success(processHotels);
          $scope.singleHotel = '';
        } else if (data.message === 'Unauthorized Access. Mismatched token.') {
          alert(data.message);
        } else if (data.message === 'Unauthorized Access') {
          alert(data.message);
        }
      });
    }
  }

  // function to close edit modal box
  $scope.closeEditModal = function() {
    $('#editHotelModal').closeModal();
  }

}]);