
  
//This is how to create a module
(function(){
  
  var MainController = function($scope){
    $scope.message = "Hello Angular";
  };

  app.controller("MainController", MainController);
  
  
  //Sample
  var PersonController = function($scope){
    var person = {
      firstName:"John",
      lastName:"Smith"
    }
    
    $scope.message = "Hello";
    $scope.person = person;
  };
  app.controller("PersonController", PersonController);
  

  
}());

 


