//import { cwd } from 'node:process';

const commands = require('./commands/index.js');

// Output un prompt
process.stdout.write('pROmpt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var raw = data.toString().trim(); // remueve la nueva línea
  var argus
  if (raw.slice(0,4)==="echo") {
    argus=raw.slice(5)
    cmd="echo"

  }else if (raw.slice(0,3)==="cat") {
    argus=raw.slice(4)
    cmd="cat"
  } else {
    cmd=raw
  }

  var dale=commands[cmd]//Por qué si coloco solo comands [cmd] no me anda? y debo colocar dale()
  console.log(commands[cmd])
  dale(argus)

  process.stdout.write('\nprompt > ');
});
