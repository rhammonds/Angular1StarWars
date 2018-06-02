(function(){
  
  var StarWarsController = function($scope, $http){
    var onUserComplete = function(response){
      console.log(response.data); 
        //$scope.users = [response.data];
        $scope.users = response.data.results;
        
        let items = response.data.results.filter( item =>
          item.name.toLowerCase()
          .includes(this.state.filter.toLowerCase()))
        
        $scope.users = items;
      };
     
    var onError = function(reason){
      $scope.error = "Could not featch people";
    }
    
    $http.get("https://swapi.co/api/people/?format=json") 
      .then(onUserComplete, onError);  
      
    $scope.message = "People";    
  };
  app.controller("StarWarsController", StarWarsController);
   
  

}()); 