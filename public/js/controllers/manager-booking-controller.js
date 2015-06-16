


// dashboard main controller

app.controller('ManagerBookingsCtrl', ['$scope', 'apiCall', 'logChecker', '$cookies', function($scope, apiCall, logChecker, $cookies) {


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

  // function to refresh bookings
  function refreshBookings() {
    // make api call to get all manager's bookings
    apiCall.pullManagerReservations(managerId).success(function(data) {
      if (data.message === 'No new booking') {
        $scope.showBookings = false;
        $scope.noBookingMessage = data.message;
      } else {
        $scope.managerBookings = data;
        $scope.showBookings = true;
      }
    });
  }

  // make api call to get all manager's bookings
  refreshBookings();

  // function to handle the treat buttons
  $scope.treat = function(booking) {
    // make api call to mark as treated
    apiCall.treatReservation(managerToken, booking._id).success(function(data) {
      if (data.message === 'Booking marked as treated') {
        alert(data.message);
        // make api call to refresh booking
        refreshBookings();
      } else if (data.message === 'Booking can\'t be treated at the moment') {
        alert(data.message);
      } else if (data.message === 'Fetch error') {
        alert('Error fetching data from database');
      }
    });
  }

  // function to handle the delete buttons
  $scope.delete = function(booking) {
    var action = confirm("Do you really want to delete?");
    if (action === true) {
      // make api call to delete
      apiCall.deleteReservation(managerToken, booking._id).success(function(data) {
        if (data.message === 'Successfully deleted') {
          alert('Booking deletion successful');
          // make api call to refresh booking
          refreshBookings();
        } else {
          alert('Deletion failed');
        }
      });
    }
  }

}]);