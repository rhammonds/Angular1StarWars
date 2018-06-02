(function(){
  
  var StarWarsController = function($scope, $http, $interval, $log){
    var onUserComplete = function(response){
      
      //$scope.users = response.data.results;  
        response.data.results.forEach(function(entry) {          
          $scope.users.push({name: entry.name, url: entry.url, films: entry.films})
        });
        console.log($scope.users);
    };

    var onFilmsComplete = function(response){
      $scope.films = response.data.results;   
    };
     
    var onError = function(reason){
      $scope.error = "Could not fetch data";
    }
    
    //Load characters
    $scope.users =[];
    $http.get("https://swapi.co/api/people/?page=1") 
      .then(onUserComplete, onError);  

    $http.get("https://swapi.co/api/people/?page=2") 
      .then(onUserComplete, onError);  
    
      $http.get("https://swapi.co/api/people/?page=3") 
      .then(onUserComplete, onError);  

      $http.get("https://swapi.co/api/people/?page=4") 
      .then(onUserComplete, onError);  

    //Load films
    $http.get("https://swapi.co/api/films/?page=1") 
      .then(onFilmsComplete, onError);  

    var onGetUserComplete = function(response){      
        $scope.person = response.data;        
    };
    
    var onGetWorldsComplete = function(response){
      $scope.world = response.data; 
    };

    var onGetCharacterFilmsComplete = function(response){
      $scope.filmList.push({title: response.data.title, release_date:response.data.release_date, episode:response.data.episode_id});       
    };

    var onGetFilmCharactersComplete = function(response){
      $scope.characterList.push({name: response.data.name});       
    };

    var onGetFilmComplete = function(response){
      $scope.filmFound = response.data;
    };
    
    //Get selected character
    $scope.getPerson = function(){
      $scope.filmList = [];
      $scope.error  
      $scope.person = null;

      let x = $scope.selectedPerson.url.substr(-2).replace('/','') ;
      
      $http.get("https://swapi.co/api/people/"+ x +"?format=json") 
        .then(onGetUserComplete, onError); 
      
        if($scope.selectedPerson.homeworld){
          $http.get($scope.selectedPerson.homeworld.replace('http:','https:') + "?format=json") 
          .then(onGetWorldsComplete, onError);          
        }
        
      if($scope.selectedPerson.films){
        $scope.selectedPerson.films.forEach(function(entry) {
          $http.get(entry.replace('http:','https:')  + "?format=json") 
              .then(onGetCharacterFilmsComplete, onError);  
        });   
      }
    }
    
    //Get selected film
    $scope.getFilm = function(){     
      $scope.characterList = [];
      $scope.error  
      $scope.filmFound = null;

      let x = $scope.selectedFilm.url.substr(-2).replace('/','') ;
      
      $http.get("https://swapi.co/api/films/"+ x +"?format=json") 
        .then(onGetFilmComplete, onError); 
      
        if($scope.selectedFilm.characters){
          $scope.selectedFilm.characters.forEach(function(entry) {
            $http.get(entry.replace('http:','https:')  + "?format=json") 
                .then(onGetFilmCharactersComplete, onError);  
          });   
        }        
    }
    
  };

  app.controller("StarWarsController", StarWarsController);
   

}()); 