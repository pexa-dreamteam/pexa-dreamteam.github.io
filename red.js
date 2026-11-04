// PEXA digital: la conexión de las salas. Dos caminos con la misma forma:
//  - Firebase Realtime Database, cuando config.js trae la configuración (el juego publicado).
//  - Una red de mentira entre pestañas (?red=prueba, solo en la computadora), para probar las salas sin internet.
// Cada sala guarda dos textos: "lobby" y "partida". Las jugadas se aplican con una transacción: si dos DTs juegan a la vez, una se reintenta.
(function(){
'use strict';
var PRUEBA=new URLSearchParams(location.search).get('red')==='prueba'&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
var cfg=window.PEXA_FIREBASE||null,fb=null;

function salaPrueba(cod){
  var oyentes=[],pref='pexa-red-'+cod+'-';
  function onSt(e){if(!e.key||e.key.indexOf(pref)!==0)return;var c=e.key.slice(pref.length);oyentes.forEach(function(o){if(o.c===c)o.fn(e.newValue);});}
  window.addEventListener('storage',onSt);
  return {
    escuchar:function(c,fn){oyentes.push({c:c,fn:fn});setTimeout(function(){fn(localStorage.getItem(pref+c));},0);},
    transaccion:function(c,fn,cb){setTimeout(function(){var cur=localStorage.getItem(pref+c),nu=fn(cur);
      if(nu===undefined){if(cb)cb(false,cur);return;}
      if(nu===null)localStorage.removeItem(pref+c);else localStorage.setItem(pref+c,nu);
      oyentes.forEach(function(o){if(o.c===c)o.fn(nu);});if(cb)cb(true,nu);},Math.random()*30);},
    parar:function(){oyentes=[];window.removeEventListener('storage',onSt);}
  };
}
function salaFirebase(cod){
  var base=fb.database().ref('salas/'+cod),activos=[];
  return {
    escuchar:function(c,fn){var r=base.child(c),h=r.on('value',function(s){fn(s.val());});activos.push([r,h]);},
    transaccion:function(c,fn,cb){base.child(c).transaction(fn,function(err,ok,snap){if(cb)cb(!err&&ok,snap?snap.val():null);},false);},
    parar:function(){activos.forEach(function(a){a[0].off('value',a[1]);});activos=[];}
  };
}
window.PEXA_RED={
  disponible:function(){return PRUEBA||!!(cfg&&window.firebase);},
  abrir:function(cod){
    if(PRUEBA)return salaPrueba(cod);
    if(!fb)fb=firebase.apps.length?firebase.app():firebase.initializeApp(cfg);
    return salaFirebase(cod);
  }
};
})();
