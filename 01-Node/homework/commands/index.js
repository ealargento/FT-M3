var fs = require('fs');

module.exports = {
  date: function() {process.stdout.write(Date());},
  pwd: function() {process.stdout.write(process.cwd());},
  echo: function(strings) {process.stdout.write(strings);},
  cat: function(file) {
    fs.readFile(file,'utf8',function(err,datos){
      if (err) throw err;
      process.stdout.write(datos)
      process.stdout.write("prompt > ");
    })

  },

  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      process.stdout.write("prompt > ");
  });
  }
}
