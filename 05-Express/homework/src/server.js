//const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.get("/", function (req,res){
  res.send("epale")
})

server.get("/posts", function (req,res){
  if (req.query.term) {
    let temp=posts.filter(elem=>elem.title.includes(req.query.term)||elem.contents.includes(req.query.term))
    res.json(temp)
  } else {
    res.json(posts)
  }
})

server.get("/posts/:author/:title", function (req,res){

  let temp=posts.filter(elem=>elem.author===req.params.author&&elem.title===req.params.title)//.replace("%20"," "))

  if (temp.length>0) {
    res.json(temp)
  }else {
    res.status(422).json({error: "No existe ningun post con dicho titulo y autor indicado"})
  }
})

server.post("/posts", function(req,res){
 if (req.body.author === undefined || req.body.title === undefined || req.body.contents === undefined ) {
   res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"} )
 }else {
  var post={
    author: req.body.author,
    title: req.body.title,
    contents: req.body.contents
  }
  posts.push(post)
  post.id=posts.length
  res.status(200).json(post)
}
})

server.post("/posts/author/:author", function(req,res){
 if (req.params.author === undefined || req.body.title === undefined || req.body.contents === undefined ) {
   res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"} )
 }else {
  var post={
    author: req.params.author,
    title: req.body.title,
    contents: req.body.contents
  }
  post.id?post.id++:post.id=0
  posts.push(post)
  res.status(200).json(post)
}
})

server.get("/posts/:author", function (req,res){
  let temp=posts.filter(elem=>elem.author.includes(req.params.author))

  if (temp.length>0) {
    res.json(temp)
  }else {
    res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"} )
  }
})

server.put("/posts", function(req,res){
 if (req.body.id === undefined || req.body.title === undefined || req.body.contents === undefined ) {
   res.status(422).json({error: "No se recibieron los parámetros necesarios para modificar el Post"} )
 }else {
   var bandera=0

   posts.forEach(function(elem){
     if (elem.id===req.body.id) {
       elem.title=req.body.title
       elem.contents=req.body.contents

       bandera=1
       res.status(200).json(elem)
     }
   })
   !bandera>0?res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"}):null
 }
})

server.delete("/posts", function(req,res){
 if (req.body.id === undefined) {
   res.status(422).json({error: "No se recibieron los parámetros necesarios para modificar el Post"} )
 }else {
   var eliminar
   for (var i = 0; i < posts.length; i++) {
     if (posts[i].id===req.body.id) {
       eliminar=i
     }
   }
   console.log({"aca estamos": posts, eliminar})
     if (eliminar!=undefined) {
       posts.splice(eliminar,1)
       res.status(200).json({success: true})
     }else {
       res.status(422).json({error: "No se recibieron los parámetros necesarios para modificar el Post"} )
     }

 }
})

// última ruta: eliminar posts de un autor
server.delete("/author", function(req,res){
 if (req.body.author === undefined) {
   res.status(422).json({error: "No se recibió el parámetro autor"} )
 }else {
   var eliminados=[]
   var posts2=[...posts]

   posts.forEach(function(elem){
     if (elem.author===req.body.author) {
       console.log({"posts (pre)": posts})
       eliminados.push(posts2.splice(elem.id-1,1)[0])
       console.log({"posts (post)": posts})
     }
   })
   posts=posts2

   eliminados.length>0?res.status(200).json(eliminados):res.status(422).json({error: "No existe el autor indicado"} )

 }
})



module.exports = { posts, server };
