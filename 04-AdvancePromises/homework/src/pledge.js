'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(arg) {


  if ("function"!==typeof arg) {
    throw new TypeError("El executor debe ser de tipo function")
  }

  this._state="pending"
  this._handlerGroups=[]


  this._internalResolve=function(data){
    this._state==="pending" ? this._value=data : null
    this._state==="pending" ? this._state="fulfilled" : null
    this._callHandlers()
  }

  this._internalReject=function(err){
    this._state==="pending" ? this._value=err : null
    this._state==="pending" ? this._state="rejected" : null
    this._callHandlers()
  }
  var resolve=this._internalResolve.bind(this)
  var reject=this._internalReject.bind(this)


  arg(resolve,reject)

  this.then = function (successCb, errorCb){
        if (typeof successCb !== "function"){

            successCb = false
        }

        if (typeof errorCb !== "function"){
            errorCb = false
        }
        var downstreamPromise=new $Promise(()=>{})
        let handlerss = {
            successCb,
            errorCb,
            downstreamPromise,
        }


        this._handlerGroups.push(handlerss)
        console.log(this._handlerGroups)
        if (this._state !== "pending") this._callHandlers()

        return downstreamPromise
    }
}

$Promise.prototype._callHandlers=function(){
  while (this._handlerGroups.length>0) {
    var manejador=this._handlerGroups.shift()


  if (this._state==="fulfilled"&&typeof manejador.successCb==="function") {
    try {
      let result=manejador.successCb(this._value)
      if (result instanceof $Promise) {
        result.then(function(){
        manejador.downstreamPromise._internalResolve(result._value)
        },function(){
        manejador.downstreamPromise._internalReject(result._value)
        })

      }else {
        manejador.downstreamPromise._internalResolve(result)
      }

    } catch (e) {
      manejador.downstreamPromise._internalReject(e)
    }

  }else if (this._state==="rejected"&&typeof manejador.errorCb==="function") {
    try {
      let result=manejador.errorCb(this._value)
      if (result instanceof $Promise) {
        result.then(function(){
        manejador.downstreamPromise._internalResolve(result._value)
        },function(){
        manejador.downstreamPromise._internalReject(result._value)
        })
      }else {
      manejador.downstreamPromise._internalResolve(result)
      }

    } catch (e) {
      manejador.downstreamPromise._internalReject(e)
    }


  }else if (this._state==="fulfilled"&&manejador.successCb===false) {
    manejador.downstreamPromise._internalResolve(this._value)
  }else if (this._state==="rejected"&&manejador.errorCb===false) {
    manejador.downstreamPromise._internalReject(this._value)
  }




  }
}

$Promise.prototype.catch=function(errorCb){
  return this.then(null,errorCb)
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
