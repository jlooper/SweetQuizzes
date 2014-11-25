'use strict';

angular.module('sweetQuizzes')
    .controller('MainCtrl', function ($scope, $famous, quizlet) {

        var Engine = $famous['famous/core/Engine'];
        var Surface = $famous['famous/core/Surface'];
        var Flipper = $famous['famous/views/Flipper'];
        var Modifier = $famous['famous/core/Modifier'];
        var Timer = $famous['famous/utilities/Timer'];
        var Easing = $famous['famous/transitions/Easing'];
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var SpringTransition = $famous['famous/transitions/SpringTransition'];
        Transitionable.registerMethod('spring', SpringTransition);
       
        $scope.index = 0;
        //sample quiz
        $scope.quizId = 2273151;
        $scope.reviewQuizData=[];
             

        var mainContext = Engine.createContext();
        
        $scope.gridLayoutOptions = {
            dimensions: [2, 1]
        };
        
        $scope.getNewQuiz = function (quiz) {
            if(angular.isDefined(quiz)){
               $scope.quizId = quiz.quizId;
                if($scope.quizData){
                    $scope.clear()
                }
                $scope.loadQuiz()
                }
            else{
                alert("Please enter a quiz id from Quizlet. Try 2154706")
            }
        };
        
        $scope.getReviewQuiz = function (quiz) {
           
                    $scope.clear()
                    $scope.quizData = $scope.reviewQuizData;
                    $scope.buildInterface();
                
        };

        $scope.loadQuiz = function () {            
            var promise = quizlet.getQuiz($scope.quizId);
            
            promise.success(function (data) {
                $scope.quizTitle = data.title;
                $scope.quizData = data.terms;
                $scope.buildInterface();
               
            });
            promise.error(function () {
                console.log("API ERROR!", arguments);
            })
        };

        $scope.buildInterface = function() {
            if(!angular.isDefined($scope.quizData)){
                alert("Sorry, that quiz id seems to be invalid")
            } 
            else {
                if($scope.quizData.length>0){
                
                $scope.flipper = new Flipper();
                $scope.centerModifier = new Modifier({
                      origin: [0.5, 0.25],
                      align: [0.5, 0.25]
                    });
            
                
                var frontSurface = new Surface({
                        size: [200, 200],
                        content: $scope.quizData[$scope.index].term,
                        properties: {
                            background: '#F09BA2',
                            textAlign: 'center',
                            border: '5px solid #FBC5C5',
                            borderRadius: '10px',
                            padding:'10px'
                        }
                    });
    
                    var backSurface = new Surface({
                        size: [200, 200],
                        content: $scope.quizData[$scope.index].definition,
                        properties: {
                            background: '#FBC5C5',
                            color: 'black',
                            textAlign: 'center',
                            border: '5px solid #FBC5C5',
                            borderRadius: '10px',
                            padding:'10px'
                        }
                    });
    
                    $scope.flipper.setFront(frontSurface);
                    $scope.flipper.setBack(backSurface);
                
                    var toggle = false;
                    frontSurface.on('click', function () {
                        var angle = toggle ? 0 : Math.PI;
                        $scope.flipper.setAngle(angle, {
                            curve: 'easeOutBounce',
                            duration: 800
                        });
                       toggle = !toggle;
                    });
                    backSurface.on('click', function () {
                        var angle = toggle ? 0 : Math.PI;
                        $scope.flipper.setAngle(angle, {
                            curve: 'easeOutBounce',
                            duration: 800
                        });
                            
                        toggle = !toggle;
                    });
                    
                    var spring = {
                       method: 'spring',
                       period: 1000,
                       dampingRatio: 0.3
                    };
                
                
                
                    $scope.centerModifier.setTransform(
                      Transform.translate(0,200,0),spring
                    );
                    mainContext.add($scope.centerModifier).add($scope.flipper);
                    
                }
                else{
                    alert("all done!")
                }
            }
        };
        $scope.clear = function(){
            $scope.quizData=[];
            $scope.centerModifier.setTransform(
              Transform.translate(-300,800,0),
              { duration : 200, curve: 'easeInOut' }
            );
        };
        $scope.nextQuestion = function() {
            //remove learned question
            $scope.quizData.splice($scope.index, 1);
            $scope.centerModifier.setTransform(
              Transform.translate(-300,800,0),
              { duration : 200, curve: 'easeInOut' }
            );
            
            Timer.setTimeout(function() {
                 $scope.buildInterface()
            }, 1000);
           
        };
        $scope.storeQuestion = function() {
            //capture the data for future review
            $scope.quizData.splice($scope.index, 1);            

            
            $scope.reviewData = $scope.quizData[$scope.index]
            $scope.reviewQuizData.push($scope.reviewData);
            
                        
            $scope.centerModifier.setTransform(
              Transform.translate(300,800,0),
              { duration : 200, curve: 'easeInOut' }
            );
            
            Timer.setTimeout(function() {
                 $scope.buildInterface()
            }, 1000);
           
        };


    });