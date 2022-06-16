var promesa=new Promise(function(resolve,reject){
  setTimeout(function () {
    resolve("COMPLETADAAAAA")
    console.log("ya pasamos")
    console.log(promesa)
  }, 2);
})

console.log(promesa)
