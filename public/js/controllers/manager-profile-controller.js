


// dashboard main controller

app.controller('ManagerProfileCtrl', ['$scope', 'apiCall', 'logChecker', '$cookies', '$state', 'imageUploader', function($scope, apiCall, logChecker, $cookies, $state, imageUploader) {

  // self invoking function to handle mobile view menu
  (function(){
    $(".button-collapse").sideNav();
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

  $scope.fileSelected = function(files) {
    if (files && files.length) {
      $scope.file = files[0];
    }
  };

  // function to save edited manager's info to database
  $scope.saveManager = function() {

    // clear error message each time the save button is clicked
    $scope.profileUpdateErrorMessage = '';

    if (!$scope.file && !$scope.managerName) {
      $scope.profileUpdateErrorMessage = 'No change was made';
      return;
    }


    // if name is entered, do some simple validation checks
    if ($scope.managerName) {
      // check for the lenght of the name entered
      if ($scope.managerName.length < 5) {
        $scope.profileUpdateErrorMessage = 'Name must be 5 characters or more';
        return;
      }
      // check for presence of number in name
      if (/\d+/.test($scope.managerName)) {
        $scope.profileUpdateErrorMessage = 'Name cannot contain a number';
        return;
      }
    }

    // build up the request object
    var reqObject = {}
    if ($scope.managerName) {
      reqObject.name = $scope.managerName;
    }

    // database save api call function
    function saveManagerDetails() {
      // make api call to save the info into database if all validation pass
      apiCall.saveManager(managerId, managerToken, reqObject).success(function(data) {
        // check for message from server...
        if (data.message === 'Server Error') {
          $scope.profileUpdateErrorMessage = 'Sorry we can\'t process your request now. Try again later';
        }
        if (data.message === 'Manager update failed') {
          $scope.profileUpdateErrorMessage = data.message;
        }
        if (data.message === 'Manager updated!') {
          
          swal("Success", "Manager Profile Updated!", "success");
          
          // clear models
          $scope.managerName = '';

          // make api call to refresh dashboard details
          apiCall.getSingleManager(managerId);
        }
      });
    }

    // check if file is defined...
    if ($scope.file) {
      // call the image upload service to handle image upload
      imageUploader.imageUpload($scope.file).progress(function(evt) {
        $scope.cloudinaryRequest = true;
      }).success(function(data) {
        $scope.cloudinaryRequest = false;
        reqObject.imageUrl = data.url;
        saveManagerDetails();
      });
    } else { // no image was selected
      // make api call to save the info into database if all validation pass
      saveManagerDetails();
    }

  }

}]);