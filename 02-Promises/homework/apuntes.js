

// Algunas notas para recordar más rápidamente el código

var Promise = require('bluebird'),  //recuerda que dentro del require sin ./ se puede hacer cuando es un módulo nativo o del "core" de node.js
    exerciseUtils = require('./utils');  //este es un módulo que no es nativo por lo que hay que colocar "./" para hacer referencia a la ruta

//************** DOUBT **********//
var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });
//por qué se coloca el return? afecta si no?

// interesante: puedes correr una función llamandola como una variable, es decir, como lo que guarda una variable
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

//Otro ejemplo de lo mismo:
function epale() {
  console.log("acá estamos")
}
epale();
var tomate=epale
tomate()
// El resultado de esto será dos veces el mensaje "acá estamos" por la consola

//************** DOUBT **********//
// promise version (hint: don't need to nest `then` calls)
// ???
promisifiedReadFile('poem-one/stanza-02.txt').then( function(str){
  console.log('-- C. promisified version (stanza two)--');
  blue(str);
  return promisifiedReadFile('poem-one/stanza-03.txt');
}, null).then( function(str){
  console.log('-- C. promisified version (stanza three)--');
  blue(str);
  console.log('-- C. promisified version done --');
}, null)
}
//*******************************//
