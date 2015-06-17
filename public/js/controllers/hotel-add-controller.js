
// dashboard main controller

app.controller('addHotelCtrl', ['$scope', 'apiCall', '$state', 'logChecker', '$cookies', 'imageUploader', function($scope, apiCall, $state, logChecker, $cookies, imageUploader) {

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

  // function to validate form inputs
  function validate() {
    // set validated to tru by default
    var validated = true;

    // check hotel name
    if (!$scope.hotelName || !$scope.hotelRating || !$scope.hotelBookable || !$scope.hotelState || !$scope.hotelCity || !$scope.hotelAddress || !$scope.hotelDescription) {
      $scope.hotelAddErrorMessage = 'Some fields are required';
      validated = false;
    }

    // check for rating...
    if ($scope.hotelRating > 5) {
      if (!$scope.hotelAddErrorMessage) {
        $scope.hotelAddErrorMessage = 'Hotel rating must be between 1 and 5';
        validated = false;
      }
    }

    // convert the bookable model to lowercase
    if($scope.hotelBookable) {
      $scope.hotelBookable = $scope.hotelBookable.toLowerCase();
    }
    // check for availability
    if ($scope.hotelBookable !== 'yes') {
      if ($scope.hotelBookable !== 'no') {
        if (!$scope.hotelAddErrorMessage) {
          $scope.hotelAddErrorMessage = 'Availability can either be "yes" or "no"';
          validated = false;
        }
      }
    }

    return validated;
  }

  $scope.fileSelected = function(files) {
    if (files && files.length) {
      $scope.file = files[0];
    }
  };


  // function to save hotel to database
  $scope.saveHotel = function() {

    // make the save apiCall in here...
    // reset error message
    $scope.hotelAddErrorMessage = '';

    if (!validate()) {
      return;
    }

    // call the image upload service to handle image upload
    imageUploader.imageUpload($scope.file).progress(function(evt) {
      $scope.cloudinaryRequest = true;
    }).success(function(data) {
      // build up the requestObject
      var requestObject = {
        name: $scope.hotelName,
        managerId: managerId,
        state: $scope.hotelState,
        pictureUrl: data.url,
        city: $scope.hotelCity,
        address: $scope.hotelAddress,
        rating: $scope.hotelRating,
        description: $scope.hotelDescription,
        website: $scope.hotelWebsite,
        bookable: $scope.hotelBookable
      }

      // make api call to save hotel in database
      apiCall.addHotel(managerToken, requestObject).success(function(data) {
        if (data.message === 'Hotel add error') {
          alert(data.message);
        } else if (data.message === 'Hotel Added') {
          $scope.cloudinaryRequest = false;
          alert(data.message);
          // clear all models
          $scope.hotelName = '';
          $scope.hotelPictureUrl = '';
          $scope.hotelState = '';
          $scope.hotelCity = '';
          $scope.hotelAddress = '';
          $scope.hotelRating = '';
          $scope.hotelDescription = '';
          $scope.hotelWebsite = '';
          $scope.hotelBookable = '';
        }
      });
    }).error(function(err) {

    });
  }

}]);