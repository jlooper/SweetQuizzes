'use strict';

angular.module('sweetQuizzes')
  .factory('config', function () {
      var CLIENT_ID = "your-client-id"      
    return {
      getClientId: function(){
        return CLIENT_ID;
      }
    };
  });