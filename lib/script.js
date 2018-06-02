//Javascript patterns
var work = function(){
  console.log("working");
};

var doWork = function(f){
  
  console.log("starting");
  try{
    f();
  }
  catch(ex){
    console.log(ex);
  }
  console.log("end");
}

doWork(work);

// modules
// revealing module pattern
var createWorker = function(){
  
  var task1 = function(){
    console.log("task1")
  }
  
  var task2 = function(){
    console.log("task2")
  }
  
  return{
    job1:task1,job2:task2
  }
}

var worker2 = createWorker();
worker2.job1();
worker2.job2();





