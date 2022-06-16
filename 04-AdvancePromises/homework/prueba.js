
function mi_func(dato){
  console.log(dato)
  return "EPALE"
}

var promiseB

var promiseA= new Promise(function(resolve,reject){
  resolve("hello");

})
console.log(promiseA) //1

promiseB=promiseA.then(mi_func)

console.log(promiseB) //2

setTimeout(function() {
   console.log(promiseB);
}, 2000);

promiseB.then(console.log)
promiseB.then(console.log)
