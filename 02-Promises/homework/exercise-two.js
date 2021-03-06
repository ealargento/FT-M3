'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  // ???
  Promise.all([promisifiedReadFile('poem-two/stanza-01.txt'),promisifiedReadFile('poem-two/stanza-02.txt')]).then(function([str,str2]){

    console.log('-- A. promisified version --')
    blue(str);
    blue(str2);
    console.log('-- A. promisified version done --');
  })
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  // var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  //   return 'poem-two/' + 'stanza-0' + n + '.txt';
  // });
  //
  // // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  // ???
  Promise.all([1,2,3,4,5,6,7,8].map(x=>promisifiedReadFile(`poem-two/stanza-0${x}.txt`))).then(function(str){

    console.log('-- B. promisified version --')
    str.forEach((item) => blue(item));

    console.log('-- B. promisified version done --');
  });
}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignor?? errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

   var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
     return 'poem-two/' + 'stanza-0' + n + '.txt';
   });
   console.log(filenames)
  //
  // // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  // ???
  filenames.reduce((p, fn, ix) => {
    console.log(p)
    return p.then((stanza) => {
      if (stanza) blue(stanza);
      return promisifiedReadFile(fn);
    });
  },
    Promise.resolve(false)
  ).then((stanza) => {
    console.log("Esta est?? antes del 8")
    blue(stanza);
    console.log('-- A. callback version done --')
  });
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 20, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  // var randIdx = Math.floor(Math.random() * filenames.length);
  // filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';
  //
  // // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  // ???
  filenames.reduce((p, fn, ix) => {
    console.log(p)
    return p.then((stanza) => {
      if (stanza) blue(stanza);
      return promisifiedReadFile(fn);
    });
  },
    Promise.resolve(false)
  ).then((stanza) => {
    console.log("Esta est?? justo antes del 8")
    blue(stanza);
    console.log('-- D. promisified version done --')
  }).catch(function(err) {
    magenta(new Error(err));
    console.log('-- D. promisified version done --')
  });
}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versi??n promisificada de fs.writeFile
   *
   */
  console.log("Estamos en el problema E")
  var archivo="./solsticio/venite_____pue.txt"
  var cadena="ESTA ES UNA PRUEBA PRUEBA PRUEBA PRUEBA"
  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu c??digo aqu??
    return new Promise(function (resolve, reject) {
    		fs.writeFile(filename, str,function (err) {
    			if (err) reject(err);
    			else resolve("Archivo guardado con ??xito");
    		});
    	});
  }
  promisifiedWriteFile(archivo,cadena).then(str=>blue(str)).catch(err=>magenta(new Error(err)))

}
