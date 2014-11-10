'use strict';

angular.module('sweetQuizzes')
  .factory('quizlet', function (config, $http) {
    var _getBaseUrl = function(quizId){
      return "https://api.quizlet.com/2.0/sets/"+quizId+"?client_id="+config.getClientId()+"&whitespace=1&callback=JSON_CALLBACK";         
    }

    return {
        
     getQuiz: function(quizId){
            var url = _getBaseUrl(quizId);
            return $http.jsonp(url);
        }
     
    };
  });