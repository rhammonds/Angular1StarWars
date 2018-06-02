(function(){
  
  var StarWarsController = function($scope, $http){
    var onUserComplete = function(response){
      //console.log(response.data); 
        //$scope.users = [response.data];
        //$scope.users = response.data.results;
        
        let items = response.data.results.filter( item =>
          item.name.toLowerCase()
          .includes($scope.personname.toLowerCase()))
        
        $scope.users = items;
    };
     
    var onError = function(reason){
      $scope.error = "Could not fetch people";
    }
    
    $scope.search = function(){
      $http.get("https://swapi.co/api/people/?format=json") 
        .then(onUserComplete, onError);        
    }
    
    
    var onGetUserComplete = function(response){
      console.log(response.data); 
        $scope.person = response.data;

    };
    
    $scope.getPerson = function(personid){
      let x = personid.substr(-2).replace('/','');
      $http.get("https://swapi.co/api/people/"+x+"?format=json") 
        .then(onGetUserComplete, onError);        
    }
    
      
    $scope.message = "People";    
  };
  app.controller("StarWarsController", StarWarsController);
   
  

}()); 