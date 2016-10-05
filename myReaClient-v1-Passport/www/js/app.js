// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('myRea', ['ionic', 'myRea.controllers', 'myRea.services'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }



    });
    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.dealStatus', {
		url: '/dealStatus',
		views: {
		  'menuContent': {
        templateUrl: 'templates/dealStatus.html',
        controller: 'dealStatusController'
		  }
		}
	})

	.state('app.myAccount', {
      url: '/myAccount',
      views: {
        'menuContent': {
          templateUrl: 'templates/myAccount.html'
        }
      }
    })	
	
	.state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
	
	
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'eventsController',
          resolve: {
            events:  ['eventFactory', function(eventFactory){
              return eventFactory.query();
            }]
          }
        }
      }
    })
	
	.state('app.eventDetails', {
      url: '/events/{id}',
      views: {
        'menuContent': {
          templateUrl: 'templates/eventDetails.html',
		  controller: 'eventDetailsController',
			resolve: {
				event: ['$stateParams','eventFactory', function($stateParams, eventFactory){
					return eventFactory.get({id:$stateParams.id});
				}]
			}		  
        }
      }
    })
	
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dealStatus');
});
