'use strict';

angular.module('sweetQuizzes')
  .factory('config', function () {
      var CLIENT_ID = "cvRpjKgZvE"      
    return {
      getClientId: function(){
        return CLIENT_ID;
      }
    };
  });