'use strict';

angular.module('sweetQuizzes')
  .factory('config', function () {
      var CLIENT_ID = "cvRpjKgZvE"
      var USER_NAME = "jlooper"
    return {
      getUserName: function(){
        return USER_NAME;
      },
      getClientId: function(){
        return CLIENT_ID;
      }
    };
  });