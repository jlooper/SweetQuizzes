'use strict';

angular.module('sweetQuizzes')
  .controller('MainCtrl', function ($scope, $famous) {
    
    var Engine     = $famous['famous/core/Engine'];
    var Surface    = $famous['famous/core/Surface'];
    var Flipper    = $famous['famous/views/Flipper'];
    var Modifier   = $famous['famous/core/Modifier'];
    
    var mainContext = Engine.createContext();
    mainContext.setPerspective(500);
      
    $scope.gridLayoutOptions = {
       dimensions: [2, 1]
    };      

    $scope.flipper = new Flipper();
    
    var frontSurface = new Surface({
        size : [300, 300],
        content : 'question',
        properties : {
            background : '#F09BA2',
            lineHeight : '300px',
            textAlign  : 'center',
            border: '5px solid #BDA193', 
            borderRadius: '10px'          
        }
    });

    var backSurface = new Surface({
        size : [300, 300],
        content : 'answer',
        properties : {
            background : '#FBC5C5',
            color : 'black',
            lineHeight : '300px',
            textAlign  : 'center',
            border: '5px solid #BDA193',
            borderRadius: '10px',
        }
    });

    $scope.flipper.setFront(frontSurface);
    $scope.flipper.setBack(backSurface);

    $scope.centerModifier = new Modifier({
        align : [.5,.5],
        origin : [.5,.5]
    });

    mainContext.add($scope.centerModifier).add($scope.flipper);

    var toggle = false;
    frontSurface.on('click', function(){
        var angle = toggle ? 0 : Math.PI;
        $scope.flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
        toggle = !toggle;
    });
    backSurface.on('click', function(){
        var angle = toggle ? 0 : Math.PI;
        $scope.flipper.setAngle(angle, {curve : 'easeInOut', duration : 500});
        toggle = !toggle;
    });
      
     
    /*$scope.changeQA = function($event) {
      console.log('change');
      console.log($event);
    };
    $scope.storeQA = function($event) {
      console.log( 'store');
      console.log($event);
    };*/
       

  });
