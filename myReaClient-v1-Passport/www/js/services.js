'use strict';

angular.module('myRea.services', ['ngResource'])
    .constant("baseURL","http://localhost:3000/")
    .factory('eventFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "events/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])
    
    .factory('$localStorage', ['$window', function($window) {
      return {
        store: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        storeObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key,defaultValue) {
          return JSON.parse($window.localStorage[key] || defaultValue);
        }
      }
    }])
    









    .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        return $resource(baseURL+"feedback/:id");
    }])
    


;
