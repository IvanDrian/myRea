angular.module('myRea.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter step:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $rootScope.enableRightSideMenu = true;
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

.controller('dealStatusController', 
    ['$scope', 'stepFactory', 'baseURL', 
    function($scope, stepFactory, baseURL) {

      $scope.baseURL = baseURL;
      
      stepFactory.query({
          featured: "true"
        },
        function (response) {
            var steps = response;
            
            for (var i=0; i < steps.length; i++) {
              if (steps[i].status == 1) {
                $scope.step = steps[i];
                break;
              }
            }
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      $scope.currentStatusOfDeal = function() {
        return 'On Track';
      };
    }
  ]
)

.controller('stepsController', 
    ['$anchorScroll', '$location', '$scope', '$rootScope', 'steps', 'baseURL', 
    function($anchorScroll, $location, $scope, $rootScope, steps, baseURL) {

      $scope.baseURL = baseURL;
      $scope.steps = steps;

      $scope.$on('$ionicView.beforeEnter', function (e, data) { 
        $rootScope.myTitle = 'Timeline';
      }); 
      
      console.log($scope.steps);
    }
  ]
)

.controller('MenuCtrl', function($scope, $rootScope, $ionicHistory, $state) {
  $rootScope.enableRightSideMenu = true;
  
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
})

.controller('stepDetailsController', 
  ['$scope', '$rootScope', '$stateParams', 'step', 'stepFactory', 'baseURL', '$ionicModal', '$ionicPlatform', 
    function ($scope, $rootScope, $stateParams, step, stepFactory, baseURL, $ionicModal, $ionicPlatform) {
      $scope.baseURL = baseURL;
      $scope.step = step;
      $scope.showStep = false;
      $scope.message="Loading step details...";
      
      $scope.step = stepFactory.get({id:$stateParams.id})
      .$promise.then(
              function(response){
                $scope.step = response;
                $scope.showStep = true;
                $rootScope.myTitle = response.name; 
              },
              function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
              }
      );  
      
      $scope.$on('$ionicView.loaded', function (e, data) { 
        $rootScope.enableRightSideMenu = false;
        $rootScope.showHome = true;
      });

      $scope.$on('$ionicView.unloaded', function (e, data) { 
        $rootScope.enableRightSideMenu = true;
        $rootScope.showHome = false;
      }); 
    }
  ]
)
;
