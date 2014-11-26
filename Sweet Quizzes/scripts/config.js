'use strict';

angular.module('sweetQuizzes')
  .factory('config', function () {
      var CLIENT_ID = "my_client_id"      
    return {
      getClientId: function(){
        return CLIENT_ID;
      }
    };
  });