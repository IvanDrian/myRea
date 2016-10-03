angular.module('myRea.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // =============================
  // Form data for the login modal
  // -----------------------------
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  // ==============================
  // Form data for the logout modal
  // ------------------------------
  $scope.logoutData = {};

  // Create the logout modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.logoutModal = modal;
  });

  // Triggered in the logout modal to close it
  $scope.closeLogout = function() {
    $scope.logoutModal.hide();
  };

  // Open the logout modal
  $scope.logout = function() {
	console.log('Doing logout');
    $scope.logoutModal.show();
  };

  // Perform the logout action when the user submits the logout form
  $scope.doLogout = function() {
    console.log('Doing logout', $scope.logoutData);

    // Simulate a logout delay. Remove this and replace with your logout
    // code if using a logout system
    $timeout(function() {
      $scope.closeLogout();
    }, 1000);
  };
  
  // Satus
  $scope.satusName = function( status) {
	  if( status == 0) return 'Not Started';
	  if( status == 1) return 'In Progress';
	  if( status == 2) return 'Completed';
	  if( status == 3) return 'Overdue';
  
	  return 'UNKNOWN';
  }
})

.controller('eventsController', 
    ['$scope', 'events', 'baseURL', 
		function($scope, events, baseURL) {

			$scope.baseURL = baseURL;
			$scope.showDetails = false;
			$scope.events = events;

			$scope.toggleDetails = function() {
				$scope.showDetails = !$scope.showDetails;
			};

			console.log($scope.events);
		}
	]
)
.controller('eventDetailsController', 
	['$scope', '$stateParams', 'event', 'eventFactory', 'baseURL', '$ionicModal', '$ionicPlatform', 
		function ($scope, $stateParams, event, eventFactory, baseURL, $ionicModal, $ionicPlatform) {
			$scope.baseURL = baseURL;
			$scope.event = event;
			$scope.showEvent = false;
			$scope.message="Loading event details...";
			
			$scope.event = eventFactory.get({id:$stateParams.id})
			.$promise.then(
							function(response){
								$scope.event = response;
								$scope.showEvent = true;
							},
							function(response) {
								$scope.message = "Error: "+response.status + " " + response.statusText;
							}
			);
		}
	]
)
;
