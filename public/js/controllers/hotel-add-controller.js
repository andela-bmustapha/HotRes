
// dashboard main controller

app.controller('addHotelCtrl', ['$scope', 'apiCall', '$state', 'logChecker', '$cookies', function($scope, apiCall, $state, logChecker, $cookies) {

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
    if (!$scope.hotelName || !$scope.hotelRating || !$scope.hotelBookable || !$scope.hotelPictureUrl || !$scope.hotelState || !$scope.hotelCity || !$scope.hotelAddress || !$scope.hotelDescription) {
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

  // function to save hotel to database
  $scope.saveHotel = function() {

    // reset error message
    $scope.hotelAddErrorMessage = '';

    if (!validate()) {
      return;
    }

    // build up the requestObject
    var requestObject = {
      name: $scope.hotelName,
      managerId: managerId,
      pictureUrl: $scope.hotelPictureUrl,
      state: $scope.hotelState,
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
  }

}]);