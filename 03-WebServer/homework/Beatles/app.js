var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

// http.createServer( function(req, res){
//
// 	res.writeHead(200, { 'Content-Type':'text/html' })
// 	var html = fs.readFileSync(__dirname +'/html/template.html', 'utf8'); //Codificamos el buffer para que sea una String
// 	var nombre = 'Soy Henry!'; //Esta es la variable con la que vamos a reemplazar el template
// 	html = html.replace('{nombre}', nombre); // Usamos el método replace es del objeto String
// 	res.end(html);
// }).listen(1337, '127.0.0.1');

http.createServer( function(req, res){
  if( req.url === '/'){ //Si la URL es /api devolvemos el objeto
		res.writeHead(200, { 'Content-Type':'text/html' })
    var html= fs.readFileSync('./index.html');
	  res.end( html );
	}

	if( req.url === '/api'){ //Si la URL es /api devolvemos el objeto
		res.writeHead(200, { 'Content-Type':'application/json' })
	  res.end( JSON.stringify(beatles) );
	}

	if(req.url === '/api/John%20Lennon'||req.url === "/api/Paul%20McCartney"||req.url === '/api/George%20Harrison'||req.url === "/api/Richard%20Starkey"){ //Si la URL es /api devolvemos el objeto
    var indices={
      "/api/John%20Lennon": 0,
      "/api/Paul%20McCartney": 1,
      "/api/George%20Harrison": 2,
      "/api/Richard%20Starkey": 3
    }
    console.log(indices["/api/John%20Lennon"])

		res.writeHead(200, { 'Content-Type':'text/html' })
    var template= fs.readFileSync('./beatle.html', 'utf8');
    template=template.replace('{nombre}', beatles[indices[req.url]].name)
    template=template.replace('{nombre}', beatles[indices[req.url]].name)
    template=template.replace('{nacimiento}', beatles[indices[req.url]].birthdate)
    template=template.replace('{fuente}', beatles[indices[req.url]].profilePic)
		res.end( template );
	}
}).listen(1337, '127.0.0.1');
