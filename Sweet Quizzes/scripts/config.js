'use strict';

angular.module('sweetQuizzes')
  .factory('config', function () {
      var CLIENT_ID = "your-client-d"      
    return {
      getClientId: function(){
        return CLIENT_ID;
      }
    };
  });