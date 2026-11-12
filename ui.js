// PEXA digital: la pantalla. Todo lo que muestra sale del estado y toda jugada va por sala.enviar(), así después se cambia
// la Sala local por una Sala en internet sin tocar el resto: cada celu ve el mismo estado y manda sus jugadas.
(function(){
'use strict';
var P=window.PEXA, I=window.PEXA_ICONOS, K=window.PEXA_CARTAS, app=document.getElementById('app');
var INK=I.INK, CREMA=I.CREMA, COL={};P.REC.forEach(function(r){COL[r]=I.C[r].c1;});
var ZONA_TXT=['Cobran una fortuna y te mandan al lado del pantano.','El que lo maneja es un delincuente y te vende gato por liebre. Aparte sale carísimo y la comida siempre está seca.','Donde descansan las rodillas del plantel.','El diario de Pipes: usa el micrófono para defenestrar a los jugadores que le sacan la valla invicta.','El Sapo te cobra la inscripción por adelantado y te cambia el horario a último momento.'];
var PIZ=[
  {tit:'La Pizarra del Abuelo',sup:'#26397a',t:'#eef0f8',t2:'rgba(238,240,248,.68)',marco:'#4a63b0',frase:'El que no arriesga no pierde, pibe.',como:'Dirigió en todas las canchas de la isla, algunas antes de que existieran. Anteojos redondos, brazos cruzados y un consejo para cada ocasión, lo hayas pedido o no.',estilo:'Sin apuro y sin riesgos. Primero las cuentas claras: las Multas al día y la plata guardada. Al Palco se llega caminando, pero se llega.'},
  {tit:'La Pizarra del Míster',sup:'#232528',t:'#efe9da',t2:'rgba(239,233,218,.66)',marco:'#3a3a40',frase:'En Europa esto no pasa.',como:'Pasó seis meses en Europa y volvió con corbata y acento. Pelado, barba gris y una ceja siempre levantada: todo le parece mejorable, sobre todo vos.',estilo:'Plan a largo plazo y mercado internacional. Mira los Mercados de Pases antes que nadie, ficha lo justo y negocia como si cerrara un traspaso millonario.'},
  {tit:'La Pizarra de la Doña',sup:'#f3c4d6',t:'#3a1f2b',t2:'rgba(58,31,43,.68)',marco:'#e0609a',frase:'Acá se viene a entrenar.',como:'Alta, flaca y con un silbato que se escucha del otro lado del río. Ella dice que tiene los ojos verdes y media tribuna jura que son marrones: son verdes, con una pincelada de miel.',estilo:'Orden y sushi. Está convencida de que un buen roll antes de entrenar sube el rendimiento de cualquier Jugador. Arma el equipo por posiciones y en un trato no regala nada.'},
  {tit:'La Pizarra del Terror del Río',sup:'#c9241f',t:'#fff4ec',t2:'rgba(255,244,236,.72)',marco:'#ee2a24',frase:'¡Para adelante, siempre para adelante!',como:'Pelo gris, entradas bien ganadas y una sonrisa gigante que se ve desde la otra orilla. Le dicen el Terror, pero el único que se asusta es el rival.',estilo:'Todo al ataque y con la mejor cara. Primero el Delantero y después vemos. Se come las Multas sonriendo y hace las cuentas cuando ya está adentro del Palco.'},
  {tit:'La Pizarra del Gallo',sup:'#bfe9e3',t:'#0f3a35',t2:'rgba(15,58,53,.68)',marco:'#1fa89a',frase:'¡Posición de preacción!',como:'Cresta, pico y silbato. El profe de fútbol del colegio, el más querido por todos sus alumnos: generaciones enteras todavía se paran como él les enseñó.',estilo:'Todo empieza antes de que pase algo: rodillas flexionadas, cuerpo listo y la vista en la jugada. Se para donde va a caer la tirada y cuando salen los dados ya está en posición.'}];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
// Los nombres de los DTs, en un recuadro de su color. conDT los busca en un texto, sin tocar las etiquetas.
// El color del cono de cada DT en el partido (se puede elegir al armarlo)
function colJ(p){var c=p&&p.cc!=null&&P.CONOS[p.cc]?P.CONOS[p.cc]:(P.CONOS[p.dt]||P.CONOS[0]);return {color:c.c,tinta:c.t,o:c.o,n:c.n,col:c.col};}
function dtN(p){var c=colJ(p);return '<span class="dtn" style="--c:'+c.color+';--t:'+c.tinta+'">'+esc(p.nombre)+'</span>';}
function conDT(g,h){if(!g||!h)return h;var l=g.jug.slice().sort(function(a,b){return b.nombre.length-a.nombre.length;});
  return String(h).split(/(<[^>]+>)/).map(function(x,i){if(i%2)return x;l.forEach(function(p){x=x.split(esc(p.nombre)).join('\u0001'+p.id+'\u0002');});return x.replace(/\u0001(\d+)\u0002/g,function(m,id){return dtN(g.jug[+id]);});}).join('');}
function jugActual(){return sala.g||(ui.tuto&&ui.tuto.g)||null;}
function retratoJ(p){return p.cus?K.dtCustom(p.cus,false):K.retrato(p.dt);}
function enteroJ(p){return p.cus?K.dtCustom(p.cus,true):K.dtEntero(p.dt);}
function icoWa(s){return '<svg class="ic-wa" viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';}
function el(html){var d=document.createElement('div');d.innerHTML=html;return d;}
function icono(r,w){return '<svg viewBox="0 0 100 100" width="'+(w||46)+'" height="'+(w||46)+'" role="img" aria-label="'+P.NOMBRE_REC[r]+'">'+K.badge(r)+'</svg>';}
function iconoMulta(r,w){return '<svg viewBox="0 0 100 100" width="'+(w||46)+'" height="'+(w||46)+'" role="img" aria-label="'+P.MULTA[r]+'">'+I.multa(r)+'</svg>';}
function token(t,w){return '<span class="tk" style="width:'+w+'px;height:'+w+'px" role="img" aria-label="Token de '+(t==='V'?'Victoria':'Efectivo')+'">'+(t==='V'?K.tokenV():K.tokenE())+'</span>';}
// cono(jugador o número de DT, o {cc:índice de color})
function cono(d,w){var c=typeof d==='object'?colJ(d):colJ({cc:d});w=w||26;return '<svg class="cono" viewBox="-12.5 -14.5 25 28" width="'+w+'" height="'+(w*28/25).toFixed(1)+'" aria-hidden="true">'+I.cabala(c.o,c.color)+'</svg>';}
// Precio con los dibujos de los Recursos: 2 de Gol son dos pelotas
function precioIc(m,w){var s='';P.REC.forEach(function(r){for(var i=0;i<(m[r]||0);i++)s+=iconoCirc(r,w||24);});return '<span class="ics">'+s+'</span>';}
function nombreMercado(g,m){return 'Mercado del '+g.num[11+m]+' · '+P.ZONA[m];}
var PIPS={1:[[20,20]],2:[[11,11],[29,29]],3:[[11,11],[20,20],[29,29]],4:[[11,11],[29,11],[11,29],[29,29]],5:[[11,11],[29,11],[20,20],[11,29],[29,29]],6:[[11,11],[29,11],[11,20],[29,20],[11,29],[29,29]]};
function dado(n,tipo,s,cls){var az=tipo==='a',pip=az?'#fff':INK;return '<svg class="dd'+(cls?' '+cls:'')+'" viewBox="0 0 40 40" width="'+s+'" height="'+s+'" role="img" aria-label="Dado '+(az?'azul':'blanco')+': '+n+'"><rect x="2" y="2" width="36" height="36" rx="8" fill="'+(az?'#3f6aa6':'#fbf8f1')+'" stroke="'+INK+'" stroke-width="2.6"/>'+PIPS[n].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.7" fill="'+pip+'"/>';}).join('')+'</svg>';}
// Íconos chiquitos para El Relator y "Lo que fue pasando": se dibujan una vez y quedan como imagen
var _icoC={},_rxIco=null;
function icoImg(k,svg,alt,cls){var u=_icoC[k];if(!u){if(svg.indexOf('xmlns=')<0)svg=svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');u=_icoC[k]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}return '<img class="ico-t'+(cls?' '+cls:'')+'" src="'+u+'" alt="'+esc(alt)+'">';}
function icoRecT(r){return icoImg('r'+r,'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="'+COL[r]+'" stroke="'+INK+'" stroke-width="5"/><g transform="translate(13 13) scale(.74)">'+K.badge(r)+'</g></svg>','');}
function icoMulT(r){return icoImg('m'+r,'<svg viewBox="0 0 100 100">'+I.multa(r)+'</svg>','');}
function icoBenT(){return icoImg('ben',K.dorso('Beneficio'),'','ico-c');}
function icoTokT(t){return icoImg('t'+t,'<svg viewBox="0 0 100 100">'+(t==='V'?K.tokenV():K.tokenE())+'</svg>','');}
function rxE(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
// Las piezas del tablero en chiquito: hexágono del color del club, pentágono de Mala Fama, el Palco y la Boletería
function icoPiezaT(forma,color,num){var k='p'+forma+color+num;
  var pol=forma==='hex'?'50,4 90,27 90,73 50,96 10,73 10,27':'50,5 95,38 78,93 22,93 5,38';
  var dentro=forma==='bole'?'<circle cx="50" cy="50" r="45" fill="'+color+'" stroke="'+INK+'" stroke-width="6"/><circle cx="50" cy="50" r="27" fill="#fbf8f1"/><text x="50" y="64" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="40" fill="'+INK+'">$</text>':
    '<polygon points="'+pol+'" fill="'+color+'" stroke="'+INK+'" stroke-width="6" stroke-linejoin="round"/><text x="50" y="'+(forma==='hex'?67:69)+'" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="46" fill="#fbf8f1" stroke="'+INK+'" stroke-width="5" paint-order="stroke">'+num+'</text>';
  return icoImg(k,'<svg viewBox="0 0 100 100">'+dentro+'</svg>','','ico-pz');}
var _rxPz=null;
function conPiezas(x,g,T){
  if(!_rxPz){var nom={};P.REC.forEach(function(r){nom[esc(P.ESTADIO[r])]=['hex',COL[r],P.NUM[r]];nom[esc(P.PREDIO[r])]=['hex',COL[r],P.NUM[r]];});
    var l=Object.keys(nom).concat(P.ZONA.map(esc)).sort(function(a,b){return b.length-a.length;}).map(rxE).join('|');
    _rxPz={nom:nom,rx:new RegExp('Mercado del (\\d)( \\([^)]*\\))?|Boletería de ('+P.REC.map(function(r){return rxE(esc(P.PREDIO[r]));}).join('|')+'|'+P.REC.map(function(r){return rxE(P.NOMBRE_REC[r]);}).join('|')+')|('+l+')|(Palco)(?![A-Za-zÀ-ÿ])','g')};}
  var Z=_rxPz;
  return x.replace(Z.rx,function(m,mn,paren,bol,pz,palco){
    if(mn)return T('Mercado del '+mn+icoPiezaT('pent','#3a3530',mn))+(paren?T(paren):'');
    if(bol){var rb=null;P.REC.forEach(function(r){if(esc(P.PREDIO[r])===bol||P.NOMBRE_REC[r]===bol)rb=r;});return T(m+icoPiezaT('bole',COL[rb],''));}
    if(pz){var d=Z.nom[pz];if(d)return T(pz+icoPiezaT(d[0],d[1],d[2]));var zi=P.ZONA.map(esc).indexOf(pz);return T(pz+(g&&zi>=0?icoPiezaT('pent','#3a3530',g.num[11+zi]):''));}
    if(palco)return T('Palco'+icoPiezaT('pent','#5a5550',1));
    return m;});
}
// Un ícono al principio del renglón para lo que cierra algo: un Trato, el fin del turno
function icoRenglon(g,t){
  if(/^¡Trato!/.test(t))return '<span class="reg-ic" aria-hidden="true">🤝</span>';
  if(/^Termina el turno/.test(t))return '<span class="reg-ic" aria-hidden="true">🏁</span>';
  return '';}
function conIco(h,g){if(!h)return h;g=g||jugActual();
  if(!_rxIco){var L='A-Za-zÀ-ÿ',alt=function(o){return Object.keys(o).map(function(k){return o[k];}).sort(function(a,b){return b.length-a.length;}).map(function(s){return rxE(esc(s));}).join('|');},inv=function(o){var r={};Object.keys(o).forEach(function(k){r[esc(o[k])]=k;});return r;},bn={};Object.keys(P.BENEF).forEach(function(b){bn[b]=P.BENEF[b].n;});
    _rxIco={b:new RegExp('('+alt(bn)+'|Beneficios?)(?!['+L+'])','g'),m:new RegExp('(^|[^'+L+'])('+alt(P.MULTA)+')(?!['+L+'])','g'),mi:inv(P.MULTA),r:new RegExp('(^|[^'+L+'])('+alt(P.NOMBRE_REC)+')(?!['+L+'])','g'),ri:inv(P.NOMBRE_REC)};}
  var R=_rxIco;
  return String(h).split(/(<[^>]+>)/).map(function(x,i){if(i%2||!x)return x;var tk=[];function T(s){tk.push(s);return '\u0003'+(tk.length-1)+'\u0004';}
    x=x.replace(/(\d) \(azul\) y (\d) \(blanco\)/g,function(m,a,b){return T(dado(+a,'a',17,'dd-t'))+' y '+T(dado(+b,'b',17,'dd-t'));});
    x=conPiezas(x,g,T);
    x=x.replace(/Tokens? de (Victoria|Efectivo)/g,function(m,k){return T(icoTokT(k==='Victoria'?'V':'E')+m);});
    x=x.replace(R.b,function(m){return T(icoBenT()+m);});
    x=x.replace(R.m,function(m,a,n){return a+T(icoMulT(R.mi[n])+n);});
    x=x.replace(R.r,function(m,a,n){return a+T(icoRecT(R.ri[n])+n);});
    return x.replace(/\u0003(\d+)\u0004/g,function(m,n){return tk[+n];});}).join('');}
// El registro, agrupado por turno: número de turno y DT de turno con su color
function tabRegistro(g,yo){
  var ls=g.log.filter(function(l){return l.solo<0||l.solo===yo;}).slice(-70).reverse(),s='',cur=null,enCob=false;
  ls.forEach(function(l){var k=l.n+'|'+(l.j==null?'':l.j);
    if(k!==cur){if(enCob){s+='</div>';enCob=false;}if(cur!==null)s+='</div>';cur=k;var p=l.j!=null&&l.n>0?g.jug[l.j]:null,c=p?colJ(p):null;
      s+='<div class="reg-g"'+(c?' style="--dtc:'+c.color+';--dtt:'+c.tinta+'"':'')+'><div class="reg-h">'+(l.n>0?'<span class="reg-n">Turno '+l.n+'</span>':'<span class="reg-n">Arranque</span>')+(p?cono(p,13)+dtN(p):'')+'</div>';}
    // "Qué cobró cada uno": un renglón por DT, con un ícono por cada cosa que cobró
    if(l.cob&&!enCob){s+='<div class="reg-cob"><div class="reg-cob-t">Qué cobró cada uno</div>';enCob=true;}
    else if(!l.cob&&enCob){s+='</div>';enCob=false;}
    if(l.cob){var ic='';if(!l.cob.nadie){P.REC.forEach(function(r){for(var i=0;i<(l.cob.c[r]||0);i++)ic+=icoRecT(r);});l.cob.m.forEach(function(r){ic+=icoMulT(r);});}
      s+='<div class="reg-l reg-c">'+conDT(g,esc(l.t))+(ic?'<span class="reg-ics">'+ic+'</span>':'')+'</div>';return;}
    s+='<div class="reg-l'+(l.solo>=0?' priv':'')+'">'+conDT(g,icoRenglon(g,l.t)+conIco(esc(l.t),g))+'</div>';});
  if(enCob)s+='</div>';
  if(cur!==null)s+='</div>';
  return '<div class="reg" aria-live="polite">'+s+'</div>';}

// ---------- La Sala: guarda el estado y reparte las jugadas ----------
var CLAVE='pexa-partida';
var sala={g:null,
  guardar:function(){try{localStorage.setItem(CLAVE,JSON.stringify(this.g));}catch(e){}},
  cargar:function(){try{var t=localStorage.getItem(CLAVE);if(t){var g=JSON.parse(t);g.tiradas=g.tiradas||[];g.nTirada=g.nTirada||0;g.nEvento=g.nEvento||0;g.nLog=g.nLog||0;g.evs=g.evs||[];if(g.fase==='barras'){if(g.volverMover){g.mv.arreglo=true;g.fase='mover';}else g.fase='canje';}this.g=g;return true;}}catch(e){}return false;},
  borrar:function(){this.g=null;try{localStorage.removeItem(CLAVE);}catch(e){}},
  // La jugada: en este celu se aplica acá; en una sala por internet se aplica sobre el estado compartido. "luego" corre si salió bien.
  enviar:function(j,a,luego){
    if(this.red)return this.enviarRed(j,a,luego);
    var antes=this.g.oferta;
    try{P.accion(this.g,j,a);}catch(e){mostrarError(e.message);return false;}
    this.guardar();
    if(antes&&!this.g.oferta&&!this.g.jug[antes.de].bot&&a.t==='responder'){var pub=this.g.log.filter(function(l){return l.solo<0;}),u=pub[pub.length-1];if(u)mostrarAviso(u.t);}
    if(luego)luego();
    pintar();avanzarBots();return true;},
  enviarRed:function(j,a,luego){
    var err=null;
    this.red.transaccion('partida',function(cur){if(cur==null)return null;var g=JSON.parse(cur);err=null;try{P.accion(g,j,a);}catch(e){err=e.message;return;}g.nA=(g.nA||0)+1;g.tAct=Date.now();return JSON.stringify(g);},
      function(ok){if(err)mostrarError(err);else if(ok&&luego){luego();pintar();}});
    return true;},
  jugarBotRed:function(q,nA){
    this.red.transaccion('partida',function(cur){if(cur==null)return null;var g=JSON.parse(cur);if((g.nA||0)!==nA||P.quienDebe(g).indexOf(q)<0||!g.jug[q].bot)return;var a=P.botAccion(g,q);if(!a)return;try{P.accion(g,q,a);}catch(e){return;}g.nA=(g.nA||0)+1;g.tAct=Date.now();return JSON.stringify(g);},function(){});},
  // Llegó el estado nuevo de la sala
  recibir:function(txt){
    var ant=this.g,g=JSON.parse(txt);this.g=g;
    if(ant&&ant.oferta&&!g.oferta&&ant.oferta.de===this.asiento){var pub=g.log.filter(function(l){return l.solo<0;}),u=pub[pub.length-1];if(u&&/dice que no|Nadie toma/.test(u.t))mostrarAviso(u.t);}
    var tocaba=ant&&P.quienDebe(ant).indexOf(this.asiento)>=0,toca=P.quienDebe(g).indexOf(this.asiento)>=0;
    if(!tocaba&&toca&&g.fase!=='fin'){try{if(navigator.vibrate)navigator.vibrate(180);}catch(e){}}
    document.title=toca&&g.fase!=='fin'?'¡Te toca! · PEXA':'PEXA Dream Team';
    pintar();avanzarBots();}
};
var ui={vista:'simple',yo:null,cubierto:false,modal:null,bancoDa:null,descarte:null,verDT:null,cortes:{},tiradaVista:null,tiradaT:0,eventoVisto:null,cola:[],animando:false,logVisto:null,festejo:false,sinAnim:false,lobby:null};
try{ui.sinAnim=localStorage.getItem('pexa-sin-anim')==='1';}catch(e){}
function humanos(g){return g.jug.filter(function(p){return !p.bot;});}
// El reloj por turno: se dibuja solo, sin repintar la pantalla, y cuando llega a cero avisa al motor
var LIMITES=[[0,'Sin límite'],[45,'45 s'],[60,'1 min'],[120,'2 min']];
function textoReloj(ms){var s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}
function vencioRed(){sala.red.transaccion('partida',function(cur){if(cur==null)return null;var g=JSON.parse(cur);try{P.accion(g,-1,{t:'vencio'});}catch(e){return;}g.nA=(g.nA||0)+1;g.tAct=Date.now();return JSON.stringify(g);},function(){});}
function tickReloj(){
  var g=sala.g,e=document.getElementById('reloj');if(!g||!g.limite||!g.rel||g.fase==='fin'){if(e)e.hidden=true;return;}
  var r=g.rel,ahora=Date.now(),deben=P.quienDebe(g),hum=deben.filter(function(j){return !g.jug[j].bot;});
  if(ui.relPausa&&!sala.red){if(e){e.hidden=false;e.textContent='En pausa';e.classList.add('pausa');e.classList.remove('urgente');}return;}
  if(e){
    if(!hum.length&&r.pausa==null){e.hidden=true;}
    else{e.hidden=false;var rest=r.pausa!=null?r.pausa:r.fin-ahora;e.textContent=(r.pausa!=null?'En pausa ':'')+textoReloj(rest);e.classList.toggle('urgente',r.pausa==null&&rest<=10000);e.classList.toggle('pausa',r.pausa!=null);}
  }
  var mia=ui.yo!=null&&hum.indexOf(ui.yo)>=0;
  if(mia&&r.pausa==null){var s=Math.ceil((r.fin-ahora)/1000);if(s===10&&ui.avisoReloj!==r.clave){ui.avisoReloj=r.clave;try{if(navigator.vibrate)navigator.vibrate(120);}catch(x){}}}
  var limiteMs=g.oferta?r.oferFin:r.fin;if(!hum.length||ahora<limiteMs)return;
  // En una sala lo manda primero el que debe; si tiene el celu dormido, lo hace cualquier otro
  if(sala.red&&!mia&&ahora<limiteMs+3000)return;
  if(ui.vencioEnvio&&ahora-ui.vencioEnvio<4000)return;
  ui.vencioEnvio=ahora;
  if(mia){var abierta=document.querySelector('.modal');if(abierta)abierta.remove();ui.modal=null;ui.bancoDa=null;}
  if(sala.red)vencioRed();else sala.enviar(hum[0],{t:'vencio'});
}
setInterval(tickReloj,250);
function aviso(m,cls,ms){var v=document.querySelector('.toast');if(v)v.remove();var t=el('<div class="toast '+cls+'" role="alert">'+conDT(jugActual(),esc(m))+'</div>').firstChild;document.body.appendChild(t);setTimeout(function(){t.remove();},ms);}
function mostrarError(m){aviso(m,'',3200);}
function mostrarAviso(m){aviso(m,'ok',3800);}

// Los DTs automáticos juegan de a una jugada, con una pausa para poder seguirlos. Si la persona tiene una ventana abierta, esperan.
var timerBot=null,ESPERA_OFERTA=15000;
function claveOferta(o){return JSON.stringify([o.de,o.doy,o.pido]);}
function avanzarBots(){
  clearTimeout(timerBot);var g=sala.g;if(!g||g.fase==='fin'||ui.animando||ui.cola.length||ui.pausa)return;
  var enRed=!!sala.red;if(!enRed&&ui.modal&&ui.modal.tipo!=='descarte')return;
  var q=P.quienDebe(g).filter(function(j){return g.jug[j].bot;})[0];
  if(q==null)return;
  var hay=humanos(g).length>0,espera=g.fase==='canje'?(hay?420:200):650;
  if(g.fase==='canje'&&hay&&!g.oferta){var pre=P.botAccion(JSON.parse(JSON.stringify(g)),q);if(pre&&pre.t==='fin')espera=1700;} // da tiempo a ofrecerle un trato antes de que termine
  var fresca=Date.now()-ui.tiradaT;if(fresca<1500)espera=Math.max(espera,1500-fresca);
  // Oferta abierta con una persona que la puede tomar: las máquinas le dan tiempo a pensarla
  if(g.oferta&&g.oferta.a<0&&P.esperan(g.oferta).some(function(j){return !g.jug[j].bot;})){var kO=claveOferta(g.oferta);if(ui.ofertaK!==kO){ui.ofertaK=kO;ui.ofertaT=Date.now();}espera=Math.max(espera,ui.ofertaT+ESPERA_OFERTA-Date.now());}
  // En una sala, a las máquinas las juega el celu que armó la sala; si ese se durmió, las juega cualquier otro
  if(enRed&&!sala.soyHost)espera+=6000;
  timerBot=setTimeout(function(){if(!sala.g)return;if(enRed){sala.jugarBotRed(q,sala.g.nA||0);return;}if(ui.modal&&ui.modal.tipo!=='descarte')return;var a=P.botAccion(sala.g,q);if(a)sala.enviar(q,a);},espera);
}

// ---------- A quién le estamos mostrando la pantalla ----------
function actualizarYo(g){
  if(sala.red){ui.yo=sala.asiento;ui.cubierto=false;return;}
  var deben=P.quienDebe(g).filter(function(j){return !g.jug[j].bot;}), hs=humanos(g);
  if(!hs.length){ui.yo=null;return;}
  if(deben.length){
    if(ui.yo==null||deben.indexOf(ui.yo)<0){var nuevo=deben[0];if(ui.yo!=null&&hs.length>1)ui.cubierto=true;ui.yo=nuevo;ui.modal=null;ui.descarte=null;ui.verDT=null;}
  } else if(ui.yo==null)ui.yo=hs[0].id;
}

// ---------- Tablero ----------
function Pol(r,deg){var a=deg*Math.PI/180;return [r*Math.cos(a),r*Math.sin(a)];}
var TH=[],A=[],B=[],Cm=[],Cp=[],Dm=[],Dp=[],E=[],F=[];
for(var i=0;i<5;i++){var t=-54+72*i;TH.push(t);A.push(Pol(50,t+36));B.push(Pol(105,t+36));Cm.push(Pol(135,t-14));Cp.push(Pol(135,t+14));Dm.push(Pol(200,t-15.3));Dp.push(Pol(200,t+15.3));E.push(Pol(231,t));F.push(Pol(215,t+36));}
var XY=[].concat(A,B,Cm,Cp,Dm,Dp,E,F);XY[40]=[0,0];
function pts(l){return l.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');}
function cen(l){var x=0,y=0;l.forEach(function(p){x+=p[0];y+=p[1];});return [x/l.length,y/l.length];}
function prev(i){return (i+4)%5;}
function poligono(a){var i;if(a===0)return A;if(a<=5){i=a-1;return [A[prev(i)],A[i],B[i],Cp[i],Cm[i],B[prev(i)]];}
  if(a<=10){i=a-6;var j=(i+1)%5;return [B[i],Cp[i],Dp[i],F[i],Dm[j],Cm[j]];}i=a-11;return [Cm[i],Cp[i],Dp[i],E[i],Dm[i]];}
// El tablero original, armado una vez para cada partido y guardado como imagen: así no se redibuja en cada jugada
var FUENTES=null;
function traerFuentes(cb){if(FUENTES!==null){cb(FUENTES);return;}fetch('fuentes.css').then(function(r){return r.text();}).then(function(t){FUENTES=t;cb(t);},function(){FUENTES='';cb('');});}
function svgAImagen(svg,cb){traerFuentes(function(css){var txt=svg.replace(/(<svg[^>]*>)/,'$1<style>'+css+'</style>');var u=URL.createObjectURL(new Blob([txt],{type:'image/svg+xml'})),im=new Image();im.onload=function(){cb(im,u);};im.onerror=function(){URL.revokeObjectURL(u);cb(null);};im.src=u;});}
function pedirArte(g){
  var clave=g.rec.join(',')+'|'+g.num.join(',');if(ui.arte&&ui.arte.clave===clave)return ui.arte.url;
  if(ui.arteHaciendo===clave)return null;ui.arteHaciendo=clave;
  // Liviano para que no se trabe el celu: se dibuja una sola vez, y las fichas de las piezas recortan de esta misma imagen
  var o=[],z=[],L=window.innerWidth<1000?1200:1800;for(var i=0;i<5;i++){o.push(g.rec[6+i]);z.push(g.num[11+i]);}
  setTimeout(function(){svgAImagen(K.tableroArte(o,z).replace('width="2000" height="2000"','width="'+L+'" height="'+L+'"'),function(im,u){
    if(!im){ui.arteHaciendo=null;mostrarError('No se pudo armar el tablero detallado.');ui.vista='simple';if(sala.g||ui.tuto)pintar();return;}
    var cv=document.createElement('canvas');cv.width=cv.height=L;cv.getContext('2d').drawImage(im,0,0,L,L);URL.revokeObjectURL(u);
    cv.toBlob(function(b){cv.width=cv.height=0;ui.arte={clave:clave,url:URL.createObjectURL(b)};ui.arteHaciendo=null;if((sala.g||ui.tuto)&&!ui.modal)pintar();else if(ui.modal&&ui.modal.tipo==='pieza'&&sala.g){limpiarModales();pintarModal(sala.g,ui.yo,ui.yo!=null?sala.g.jug[ui.yo]:null);}},'image/jpeg',.82);});},30);
  return null;
}
// El dorso de los Jugadores, para mostrarlos en los Mercados del tablero detallado
function pedirDorso(){
  if(ui.dorso)return ui.dorso;if(ui.dorsoHaciendo)return null;ui.dorsoHaciendo=true;
  svgAImagen('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 252" width="164" height="252">'+ubicarSvg(K.dorso('Jugador'),0,0,164,252)+'</svg>',function(im,u){
    if(!im)return;var cv=document.createElement('canvas');cv.width=164;cv.height=252;cv.getContext('2d').drawImage(im,0,0,164,252);URL.revokeObjectURL(u);ui.dorso=cv.toDataURL('image/jpeg',.88);if((sala.g||ui.tuto)&&!ui.modal)pintar();});
  return null;
}
function dibujarTablero(g,marcados,encima){
  var url=ui.vista==='det'?pedirArte(g):null,det=!!url,vb=det?'-305 -305 610 610':'-274 -274 548 548';
  var s='<svg id="tablero" viewBox="'+vb+'" role="img" aria-label="Isla Pexa">';
  var cent=(marcados||[]).indexOf(P.CENTRO)>=0&&g.fase==='mover'&&P.gana(g,g.jug[g.turno]),barAnt=ui.barrasAntes;ui.barrasAntes=g.barras.slice();
  s+='<defs><radialGradient id="brilloPalco"><stop offset="0" stop-color="#fff8c9" stop-opacity="1"/><stop offset=".45" stop-color="#ffd83a" stop-opacity=".85"/><stop offset="1" stop-color="#ffb300" stop-opacity="0"/></radialGradient></defs>';
  if(det){s+='<image href="'+url+'" x="-320" y="-320" width="640" height="640"/>';
    var du=pedirDorso();if(du)for(var im=0;im<5;im++){var cm=Pol(K.geo.RS,TH[im]),nm=g.mercados[im].length;s+='<g transform="translate('+cm[0].toFixed(1)+' '+cm[1].toFixed(1)+') rotate('+(TH[im]+90)+')" pointer-events="none">';for(var jm=0;jm<nm;jm++)s+='<image href="'+du+'" x="'+((jm-(nm-1)/2)*13.5-9.5).toFixed(1)+'" y="-16" width="19" height="29.2"/>';s+='</g>';}}
  else{
  s+='<circle r="250" fill="#8fc3df"/>';
  s+='<polygon points="'+pts([].concat.apply([],[0,1,2,3,4].map(function(i){return [Dm[i],E[i],Dp[i],F[i]];})).map(function(p){return [p[0]*1.07,p[1]*1.07];}))+'" fill="#e8dcbc" stroke="#d2c29a" stroke-width="2"/>';
  for(var a=1;a<=15;a++){var pg=poligono(a),c=cen(pg),r=g.rec[a];
    s+='<polygon points="'+pts(pg)+'" fill="'+(r?COL[r]:'#5a5550')+'"/>';
    if(r&&a>5)s+='<g transform="translate('+(c[0]-14).toFixed(1)+' '+(c[1]-28).toFixed(1)+') scale(.28)">'+K.badge(r)+'</g>';
    var ny=r&&a>5?c[1]+13:c[1];
    s+='<circle cx="'+c[0].toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="15" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.2"/><circle cx="'+c[0].toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="12.4" fill="'+(r?COL[r]:'#111')+'"/><text x="'+c[0].toFixed(1)+'" y="'+(ny+7).toFixed(1)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="20" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.8" paint-order="stroke">'+g.num[a]+'</text>';}
  // El Palco: un pentágono más, del color de las zonas
  s+='<polygon points="'+pts(A)+'" fill="#5a5550"/>';
  var d='';P.ADJ.forEach(function(l,u){l.forEach(function(v){if(u<v)d+='M'+XY[u][0].toFixed(1)+' '+XY[u][1].toFixed(1)+'L'+XY[v][0].toFixed(1)+' '+XY[v][1].toFixed(1);});});
  s+='<path d="'+d+'" stroke="'+INK+'" stroke-width="8.4" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#fbfbf9" stroke-width="6" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#bdbdbd" stroke-width=".6" stroke-dasharray="2.4 2.2" fill="none"/>';
  for(var i2=0;i2<5;i2++){var pa=A[i2];s+='<path d="M0 0L'+pa[0].toFixed(1)+' '+pa[1].toFixed(1)+'" stroke="#e8c98f" stroke-width="5"/>';}
  s+='<circle r="15" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.2"/><circle r="12.4" fill="#111"/><text y="7" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="20" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.8" paint-order="stroke">1</text>';
  }
  // Las piezas que se activan con la tirada se iluminan
  var pasado=Date.now()-ui.tiradaT;
  if(g.dados&&pasado<3200){var vis={};g.dados.forEach(function(x){g.porNum[x].forEach(function(ar){vis[ar]=1;});});
    Object.keys(vis).forEach(function(ar){s+='<polygon class="activa" style="animation-delay:-'+(pasado/1000).toFixed(2)+'s" points="'+pts(poligono(+ar))+'" pointer-events="none"/>';});}
  // esquinas, Mercados y Boleterías
  P.NODOS.forEach(function(n){var q=XY[n.id],x=q[0].toFixed(1),y=q[1].toFixed(1);
    if(n.t==='E'){if(det)return;s+='<rect x="'+(q[0]-15)+'" y="'+(q[1]-11)+'" width="30" height="22" rx="3" fill="#b8323a" stroke="'+INK+'" stroke-width="1.2"/><rect x="'+(q[0]-11.5)+'" y="'+(q[1]-7.5)+'" width="23" height="15" rx="1.5" fill="#fdf3d2"/>';return;}
    if(det)return;
    if(n.t==='F'){var bo=g.rec[6+n.i];s+='<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+COL[bo]+'" stroke="'+INK+'" stroke-width="1.3"/><circle cx="'+x+'" cy="'+y+'" r="6.6" fill="#fbf8f1"/><text x="'+x+'" y="'+(q[1]+2.6)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="7" fill="'+INK+'">$</text>';return;}
    var ar=n.t==='B';s+='<circle cx="'+x+'" cy="'+y+'" r="7" fill="#fdfdfb" stroke="'+(ar?'#b8862b':INK)+'" stroke-width="'+(ar?2.2:1.1)+'"/>';
    if(n.t==='Dp'||n.t==='Dm'){var b2=P.boleDe(g,n.id);s+='<circle cx="'+x+'" cy="'+y+'" r="7" fill="'+COL[b2]+'" stroke="'+INK+'" stroke-width="1.1"/><circle cx="'+x+'" cy="'+y+'" r="2.6" fill="#fbf8f1"/>';}
  });
  // El centro del Palco resplandece cuando se puede entrar
  if(cent)s+='<g class="palco-brilla" pointer-events="none"><circle r="72" fill="url(#brilloPalco)"/>'+[0,1,2,3,4,5,6,7,8,9].map(function(q){return '<path d="M0-28L5-62L0-82L-5-62Z" fill="#ffe27a" transform="rotate('+(q*36)+')"/>';}).join('')+'<circle r="17" fill="#fff8c9" stroke="#b8862b" stroke-width="3"/></g>';
  // Barrabravas: ñoquis
  g.barras.forEach(function(k,ib){var q=XY[k],viene=!ui.sinAnim&&barAnt&&barAnt.length===g.barras.length&&barAnt[ib]!==k?XY[barAnt[ib]]:null;s+=viene?'<g class="barra-va" style="--dx:'+(viene[0]-q[0]).toFixed(1)+'px;--dy:'+(viene[1]-q[1]).toFixed(1)+'px">':'<g>';s+='<g transform="translate('+q[0].toFixed(1)+' '+q[1].toFixed(1)+') scale(1.7)" pointer-events="none"><ellipse rx="11" ry="8" fill="#fff" stroke="#fff" stroke-width="4.2"/><ellipse rx="11" ry="8" fill="#dcb98a" stroke="'+INK+'" stroke-width="1.4"/><path d="M-6-5q1.6 5 0 10M-2-6.6q1.6 6.6 0 13.2M2-6.6q1.6 6.6 0 13.2M6-5q1.6 5 0 10" fill="none" stroke="#a9825c" stroke-width="1"/></g></g>';});
  if(encima)s+=encima;
  // Marcas para tocar
  (marcados||[]).forEach(function(k){var q=XY[k],gr=P.NODOS[k]&&P.NODOS[k].t==='E',rr=gr?24:18;s+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+rr+'" fill="#fff" fill-opacity=".92" stroke="#111" stroke-width="1.4" pointer-events="none"/><circle class="lat" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+(rr-2)+'" fill="#ffd83a" stroke="#e8262a" stroke-width="4" pointer-events="none"/><circle class="lat-onda" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+rr+'" fill="none" stroke="#ffd83a" stroke-width="4" pointer-events="none"/>';});
  // Conos
  g.jug.forEach(function(p){if(p.pos<0)return;var q=XY[p.pos],c=colJ(p);s+='<g transform="translate('+q[0].toFixed(1)+' '+(q[1]-11).toFixed(1)+') scale(1.75)" pointer-events="none"><ellipse cy="12" rx="13" ry="4" fill="#000" opacity=".25"/>'+I.cabala(c.o,c.color,true)+I.cabala(c.o,c.color)+'</g>';
    // Tarjeta Roja: queda arriba de su Cábala hasta que se cumple (su próximo turno sin mover)
    if(p.roja)s+='<g transform="translate('+(q[0]+13).toFixed(1)+' '+(q[1]-48).toFixed(1)+')" pointer-events="none"><g class="roja-tab"><rect x="-10" y="-14" width="20" height="28" rx="3" fill="#d8261f" stroke="#fff" stroke-width="2.6"/><rect x="-10" y="-14" width="20" height="28" rx="3" fill="none" stroke="#111" stroke-width="1.1"/></g></g>';});
  // Cuántos Jugadores quedan en cada Mercado: arriba de todo y corrido hacia afuera, para que nada lo tape
  P.MERCADOS.forEach(function(k,m){var q=XY[k],d=Math.hypot(q[0],q[1])||1,cx=q[0]*(1+25/d),cy=q[1]*(1+25/d);s+='<g pointer-events="none"><rect x="'+(cx-15).toFixed(1)+'" y="'+(cy-9).toFixed(1)+'" width="30" height="18" rx="5" fill="#fdf3d2" stroke="#b8323a" stroke-width="2.2"/><text x="'+cx.toFixed(1)+'" y="'+(cy+4).toFixed(1)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="11" fill="#b8323a">'+g.mercados[m].length+'/4</text></g>';});
  return s+'</svg>';
}
function tocarTablero(ev,marcados,fn){
  var svg=ev.currentTarget,pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;var q=pt.matrixTransform(svg.getScreenCTM().inverse());
  var mejor=null,bd=26;(marcados||[]).forEach(function(k){var d=Math.hypot(XY[k][0]-q.x,XY[k][1]-q.y);if(d<bd){bd=d;mejor=k;}});
  if(mejor!=null&&fn){fn(mejor);return;}
  // Al mover, si tocás una esquina que no está marcada, te explica por qué no llegás
  var gm=jugActual();if(fn&&gm&&gm.fase==='mover'&&ui.yo===gm.turno){var kn=null,bn=16;P.NODOS.forEach(function(n){var d=Math.hypot(XY[n.id][0]-q.x,XY[n.id][1]-q.y);if(d<bn){bn=d;kn=n.id;}});if(kn!=null){mostrarAviso(porQueNo(gm,ui.yo,kn));return;}}
  // Tocar un cono o un Barrabrava: se ve grande y con lo que hace
  var g=jugActual(),cj=null,bc=17;if(g){g.jug.forEach(function(p){if(p.pos<0)return;var d=Math.hypot(XY[p.pos][0]-q.x,XY[p.pos][1]-11-q.y);if(d<bc){bc=d;cj=p.id;}});
    if(cj!=null){ui.modal={tipo:'cono',j:cj};pintar();return;}
    var kb=null,bb=16;g.barras.forEach(function(k){var d=Math.hypot(XY[k][0]-q.x,XY[k][1]-q.y);if(d<bb){bb=d;kb=k;}});
    if(kb!=null){ui.modal={tipo:'barra'};pintar();return;}}
  var pz=piezaEn(q.x,q.y);if(pz){ui.modal={tipo:'pieza',pz:pz};pintar();}
}
// Por qué no se puede ir a una esquina: ocupada, tapada por otra ficha, o queda a otra cantidad de pasos.
// Cuenta todos los puntos del camino: esquinas, Mercados de Pases y Boleterías.
function porQueNo(g,j,k){var p=g.jug[j],mv=g.mv||{pasos:[]},ps=mv.pasos||[];
  if(k===p.pos)return 'Ahí estás parado. Para terminar en el mismo lugar tendrías que dar toda la vuelta a una pieza con el número justo.';
  if(P.ocupado(g,k,j))return g.barras.indexOf(k)>=0?'Ahí hay un Barrabrava: no te podés parar.':'Ahí hay otra Cábala: no te podés parar.';
  function largos(bloq){var L={},nivel=[[p.pos,-1]];for(var n=1;n<=14;n++){var sig=[],vis={};nivel.forEach(function(e){P.ADJ[e[0]].forEach(function(v){if(v===e[1]||v===P.CENTRO)return;if(bloq&&P.ocupado(g,v,j))return;var key=v+'_'+e[0];if(vis[key])return;vis[key]=1;sig.push([v,e[0]]);if(v===k)L[n]=1;});});nivel=sig;}return Object.keys(L).map(Number);}
  var libre=largos(false),con=largos(true),toco=ps.join(' o ');
  if(ps.some(function(x){return libre.indexOf(x)>=0;})&&!ps.some(function(x){return con.indexOf(x)>=0;}))return 'Con '+toco+' pasos llegarías, pero una Cábala o un Barrabrava te tapa el camino.';
  var cerca=libre.filter(function(x){return x<=12;}).slice(0,4);
  return 'A esa esquina llegás con '+(cerca.length?cerca.join(', ').replace(/, (\d+)$/,' o $1'):'más')+' pasos, y te tocó '+toco+'. Ojo: cada Mercado de Pases y cada Boletería también cuentan como un paso.';}
function dentro(pt,l){var c=false;for(var i=0,j=l.length-1;i<l.length;j=i++){if(((l[i][1]>pt[1])!==(l[j][1]>pt[1]))&&(pt[0]<(l[j][0]-l[i][0])*(pt[1]-l[i][1])/(l[j][1]-l[i][1])+l[i][0]))c=!c;}return c;}
function piezaEn(x,y){
  var r=Math.hypot(x,y),an=Math.atan2(y,x)*180/Math.PI,dif=function(a){return Math.abs(((an-a+540)%360)-180);},i;
  for(i=0;i<5;i++){if(Math.hypot(x-E[i][0],y-E[i][1])<24||(r>228&&dif(TH[i])<13))return {t:'mercado',i:i};}
  for(i=0;i<5;i++){if(Math.hypot(x-F[i][0],y-F[i][1])<15||(r>222&&dif(TH[i]+36)<20))return {t:'boleteria',i:i};}
  for(var a=0;a<=15;a++){if(dentro([x,y],poligono(a)))return {t:'area',a:a};}
  return null;
}
// Historial al costado del tablero: la última tirada de cada DT
function historial(g,me){
  var vistos={},l=[],s='<div class="hist" aria-label="La última tirada de cada DT"><span class="hist-t">Dados</span>';
  (g.tiradas||[]).slice().reverse().forEach(function(x){if(!vistos[x.j]){vistos[x.j]=1;l.push(x);}});
  for(var i=0;i<g.n;i++){var x=l[i];s+=x?'<div class="ht'+(i===0?' ult':'')+'" style="border-left-color:'+colJ(g.jug[x.j]).color+'">'+dado(x.d[0],'a',17)+dado(x.d[1],'b',17)+'</div>':'<div class="ht vacio"></div>';}
  // Mercados vistos: abajo de todo, sobre el mar
  if(me)s+='<button class="hist-mer" id="abrMercados" aria-label="Mercados vistos" title="Mercados vistos">'+icoBinoculares(30)+'<small>Vistos</small></button>';
  return s+'</div>';
}
function dadosMesa(id){return '<button class="dados-mesa" id="'+(id||'tirar')+'" aria-label="Tirar los dados"><span class="dm-dados"><span class="dm-d dm-1">'+dado(5,'a',58)+'</span><span class="dm-d dm-2">'+dado(3,'b',58)+'</span></span><b>¡Tocá o revoleá los dados!</b></button>';}
var ICO_PAUSA='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1.2" fill="currentColor"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2" fill="currentColor"/></svg>';
var ICO_REG='<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><rect x="9" y="5" width="30" height="38" rx="4" fill="#fff8d6" stroke="#2b2620" stroke-width="2.6"/><path d="M15 15h18M15 22h18M15 29h12" stroke="#8a7f6e" stroke-width="2.6" stroke-linecap="round"/><circle cx="35" cy="36" r="9" fill="#3f6aa6" stroke="#2b2620" stroke-width="2.4"/><path d="M35 31v5.5l3.5 2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
var ICO_TRATO='<svg viewBox="0 0 48 32" width="34" height="23" aria-hidden="true"><path d="M2 9l9-4 7 3 6-2 7 2 7-3 8 4v11l-7 3-9 7c-2 1.6-4 1.2-5-.4-1.6 1-3.4.6-4.2-.8-1.8.6-3.4-.2-3.8-1.8-1.8 0-3-1.4-2.8-3.2L2 20Z" fill="#f2c79a" stroke="#2b2620" stroke-width="2" stroke-linejoin="round"/><path d="M24 7l-7 6c-1.4 1.4.4 3.6 2.2 2.6L25 12l9 8M19 23l3-2.6M23 25.4l3-2.6M27 26.8l2.4-2" fill="none" stroke="#2b2620" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 9v11M46 9v11" stroke="#2b2620" stroke-width="3" stroke-linecap="round"/></svg>';
var ICO_SILBATO='<svg viewBox="0 0 40 28" width="30" height="21" aria-hidden="true"><path d="M3 9h17a9 9 0 1 1-8.6 11.6H7a4 4 0 0 1-4-4Z" fill="#fff8d6" stroke="#2b2620" stroke-width="2.2" stroke-linejoin="round"/><circle cx="20" cy="18" r="3.2" fill="#2b2620"/><path d="M20 9V4h6" fill="none" stroke="#2b2620" stroke-width="2.2" stroke-linecap="round"/><path d="M31 5l4-3M33 10l5-1" stroke="#fff8d6" stroke-width="2.2" stroke-linecap="round"/></svg>';
// Revolear los dados: se arrastran con el dedo y se sueltan con impulso. Ruedan y rebotan dentro del tablero,
// y al frenarse se tira de verdad: los dados quedan donde cayeron, con el número que salió.
function revolear(bt,tirar,predecir){
  if(!bt)return;var tab=document.getElementById('tablero');if(!tab)return;
  var dd=bt.querySelectorAll('.dm-d'),capa=null,pts=[],arr=false,x0=0,y0=0,dados=[];
  function crear(){capa=el('<div class="revoleo" aria-hidden="true"><span class="rv-d">'+dado(5,'a',52)+'</span><span class="rv-d">'+dado(3,'b',52)+'</span></div>').firstChild;document.body.appendChild(capa);
    dados=[].map.call(capa.querySelectorAll('.rv-d'),function(e,i){var r=dd[i]?dd[i].getBoundingClientRect():bt.getBoundingClientRect();return {e:e,x:r.left+r.width/2,y:r.top+r.height/2,vx:0,vy:0,a:0,va:0,ox:(i?30:-30)};});pinta();}
  function pinta(){dados.forEach(function(d){d.e.style.transform='translate('+(d.x-26).toFixed(1)+'px,'+(d.y-26).toFixed(1)+'px) rotate('+d.a.toFixed(1)+'deg)';});}
  bt.style.touchAction='none';
  bt.addEventListener('pointerdown',function(e){if(e.button>0)return;x0=e.clientX;y0=e.clientY;pts=[[e.clientX,e.clientY,performance.now()]];arr=false;try{bt.setPointerCapture(e.pointerId);}catch(x){}});
  bt.addEventListener('pointermove',function(e){if(!pts.length)return;var dx=e.clientX-x0,dy=e.clientY-y0;
    if(!arr&&Math.hypot(dx,dy)>12){arr=true;ui.revoleando=true;crear();bt.classList.add('agarrado');}
    if(!arr)return;pts.push([e.clientX,e.clientY,performance.now()]);if(pts.length>6)pts.shift();
    dados.forEach(function(d,i){d.x+=((e.clientX+d.ox)-d.x)*.5;d.y+=((e.clientY+(i?8:-8))-d.y)*.5;d.a+=dx*.02;});pinta();});
  function suelta(){if(!pts.length)return;var p=pts;pts=[];if(!arr)return;
    var a=p[0],b=p[p.length-1],dt=Math.max(16,b[2]-a[2]),vx=(b[0]-a[0])/dt*1000,vy=(b[1]-a[1])/dt*1000,v=Math.hypot(vx,vy);
    // Aunque lo suelte despacio, los dados ruedan un poco hacia el centro del tablero
    var R=tab.getBoundingClientRect();if(v<500){var cx=R.left+R.width/2-b[0],cy=R.top+R.height/2-b[1],n=Math.hypot(cx,cy)||1;vx=vx*.4+cx/n*700;vy=vy*.4+cy/n*700;}
    if(Math.hypot(vx,vy)>2600){var k=2600/Math.hypot(vx,vy);vx*=k;vy*=k;}
    dados.forEach(function(d,i){d.vx=vx*(i?.9:1.08)+(Math.random()-.5)*160;d.vy=vy*(i?1.08:.9)+(Math.random()-.5)*160;d.va=(Math.random()<.5?-1:1)*(500+Math.random()*500);});
    // El número que va a salir se sabe desde ahora (los dados del juego salen de la semilla de la partida): los dados se frenan mostrándolo
    var pred=null;try{pred=predecir&&predecir();}catch(x){pred=null;}dados.forEach(function(d,i){d.fin=pred?pred[i]:null;d.fijo=false;});
    rodar(R);}
  bt.addEventListener('pointerup',suelta);bt.addEventListener('pointercancel',suelta);
  function rodar(R){var t0=performance.now(),ult=t0,cara=0,m=10,L=R.left+m+26,Rr=R.right-m-26,T=R.top+m+26,B=R.bottom-m-26;
    function paso(now){var dt=Math.min(.04,(now-ult)/1000);ult=now;var quieto=true;
      dados.forEach(function(d){d.x+=d.vx*dt;d.y+=d.vy*dt;d.a+=d.va*dt;
        if(d.x<L){d.x=L;d.vx=Math.abs(d.vx)*.62;d.va*=-.8;}if(d.x>Rr){d.x=Rr;d.vx=-Math.abs(d.vx)*.62;d.va*=-.8;}
        if(d.y<T){d.y=T;d.vy=Math.abs(d.vy)*.62;d.va*=-.8;}if(d.y>B){d.y=B;d.vy=-Math.abs(d.vy)*.62;d.va*=-.8;}
        var fr=Math.pow(.18,dt);d.vx*=fr;d.vy*=fr;d.va*=Math.pow(.12,dt);if(Math.hypot(d.vx,d.vy)>45)quieto=false;});
      // Choque entre los dos dados
      var a=dados[0],b=dados[1],dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)||1;if(dist<54){var nx=dx/dist,ny=dy/dist,s=(54-dist)/2;a.x-=nx*s;a.y-=ny*s;b.x+=nx*s;b.y+=ny*s;var rv=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(rv<0){a.vx+=rv*nx;a.vy+=rv*ny;b.vx-=rv*nx;b.vy-=rv*ny;}}
      // Mientras ruedan van cambiando de cara
      if(now-cara>90){cara=now;dados.forEach(function(d,i){var s=Math.hypot(d.vx,d.vy);if(s>220&&!quieto)d.e.innerHTML=dado(1+Math.floor(Math.random()*6),i?'b':'a',52);else if(d.fin&&!d.fijo){d.fijo=true;d.e.innerHTML=dado(d.fin,i?'b':'a',52);}});}
      pinta();
      if(!quieto&&now-t0<2600){requestAnimationFrame(paso);return;}
      dados.forEach(function(d,i){d.a=Math.round(d.a/90)*90;d.e.style.transition='transform .25s ease-out';if(d.fin&&!d.fijo){d.fijo=true;d.e.innerHTML=dado(d.fin,i?'b':'a',52);}});pinta();
      bt.classList.remove('agarrado');ui.revoleo={t:Date.now(),capa:capa};ui.revoleando=false;tirar();
      var mio=capa;setTimeout(function(){if(mio.parentNode&&(!ui.revoleo||ui.revoleo.capa!==mio))return;if(mio.parentNode){mio.remove();if(ui.revoleo&&ui.revoleo.capa===mio)ui.revoleo=null;}},5000);}
    requestAnimationFrame(paso);}
}
function mostrarTiro(d){
  // Si los dados se revolearon, se quedan donde cayeron y muestran el número que salió
  var rv=ui.revoleo;if(rv&&Date.now()-rv.t<5000&&rv.capa.parentNode){ui.revoleo=null;var ds=rv.capa.querySelectorAll('.rv-d');ds.forEach(function(x,i){var sv=x.querySelector('svg'),ya=sv&&sv.getAttribute('aria-label')===(i?'Dado blanco: ':'Dado azul: ')+d[i];if(!ya)x.innerHTML=dado(d[i],i?'b':'a',52);x.classList.add('cae');});rv.capa.classList.add('listo');setTimeout(function(){rv.capa.remove();},lento(1400));return;}
  var v=document.querySelector('.tiro');if(v)v.remove();
  var t=el('<div class="tiro" aria-hidden="true">'+dado(d[0],'a',74,'rueda')+dado(d[1],'b',74,'rueda r2')+'</div>').firstChild;document.body.appendChild(t);
  setTimeout(function(){t.remove();},1350);
}
// ---------- Animaciones: van de a una, en cola, y las máquinas esperan a que terminen ----------
function jugarCola(){
  if(ui.animando)return;
  var e=ui.cola.shift();
  if(!e){festejarSiToca();avanzarBots();return;}
  if(!sala.g)return;
  var ms=mostrarEvento(sala.g,e);ui.animando=true;
  setTimeout(function(){ui.animando=false;jugarCola();},ms);
}
function mostrarEvento(g,e){
  if(e.t==='turno')return mostrarTuTurno(g,e);
  if(e.t==='arranque')return mostrarArranque(g);
  if(e.t==='cobro')return mostrarCobro(g,e);
  if(e.t==='trato'||e.t==='banco'||e.t==='devuelve')return mostrarTrueque(g,e);
  if(e.t==='jugador')return mostrarFichaje(g,e);
  if(e.t==='compra')return mostrarCompra(g,e);
  if(e.t==='usa')return mostrarUso(g,e);
  if(e.t==='token')return mostrarToken(g,e);
  if(e.t==='multa')return mostrarPagoMulta(g,e);
  if(e.t==='efecto')return mostrarEfecto(g,e);
  return 0;
}
// Las animaciones duran un poco más para que se entienda qué pasa (Marcos, ronda 45)
function lento(ms){return Math.round(ms<=3000?ms*1.5:ms*1.2);}
function capa(html,ms){ms=lento(ms);var t=el(html.replace(/<div class="fj-tit">.*?<\/div>/,function(m){return conDT(jugActual(),m);})).firstChild;t.style.animationDuration=ms+'ms';document.body.appendChild(t);setTimeout(function(){t.remove();},ms);return ms;}
// ¡Es tu turno!
// Cada turno empieza con un cartel: grande si es el tuyo, más corto si es el de otro DT
function mostrarTuTurno(g,e){var j=e&&e.j!=null?e.j:ui.yo,p=g.jug[j];if(!p)return 0;var mio=j===ui.yo,c=colJ(p);
  return capa('<div class="fichaje tu-turno'+(mio?'':' de-otro')+'" style="--dtc:'+c.color+';--dtt:'+c.tinta+'" aria-hidden="true"><span class="tt-cara">'+retratoJ(p)+'</span><b class="tt-txt">'+(mio?'¡Es tu turno!':'Turno de '+esc(p.nombre))+'</b><small class="tt-n">Turno '+g.nTurnos+'</small></div>',mio?1600:1100);}
// El arranque del partido: suena el silbato, entran los DTs con sus Cábalas y la pelota cruza la pantalla
function mostrarArranque(g){
  var dts=g.jug.map(function(p,i){var c=colJ(p);return '<div class="ar-dt" style="--dtc:'+c.color+';animation-delay:'+(0.35+i*0.16).toFixed(2)+'s"><span class="ar-cara">'+retratoJ(p)+'</span>'+cono(p,22)+'<b>'+esc(p.nombre)+'</b></div>';}).join('');
  return capa('<div class="arranque" aria-hidden="true"><div class="ar-luces"></div><div class="ar-logo">'+K.logo('copa')+'</div><b class="ar-tit">¡Arranca el partido!</b><div class="ar-dts">'+dts+'</div><div class="ar-pelota">'+PELOTA+'</div><small class="ar-sub">'+(g.modo==='rapido'?'Partido rápido':'Partido completo')+' · '+g.n+' DTs</small></div>',3000);}
// Lo que cobraste vos con la tirada: lo de los demás no se muestra acá
function mostrarCobro(g,e){
  var u=g.ultTiro,yo=ui.yo;if(!u||u.n!==e.n||yo==null)return 0;
  var c=u.cob.filter(function(x){return x.j===yo;}),m=u.mul.filter(function(x){return x.j===yo;});if(!c.length&&!m.length)return 0;
  var car='';c.forEach(function(x){for(var i=0;i<x.n;i++)car+='<span class="cb-c" style="animation-delay:'+(.05+car.length%7*.03).toFixed(2)+'s">'+K.recurso(x.r)+'</span>';});
  var mu=m.map(function(x){return '<span class="cb-m'+(x.fr?' reb':'')+'">'+iconoMulta(x.r,70)+(x.fr?'<i class="sello">¡Rebotó!</i>':'')+'</span>';}).join('');
  var tit=c.length&&m.some(function(x){return !x.fr;})?'Cobraste, y te cayó una Multa':(c.length?'¡Cobraste!':(m.every(function(x){return x.fr;})?'Tu Defensor la rebotó':'Te cayó una Multa'));
  // Si intervino un Jugador tuyo (el Delantero que cobra doble o el Defensor que rebota la Multa), primero su animación
  var me=g.jug[yo],pre=e.pre||0,del=P.hab(me,3),dob=del&&c.some(function(x){return x.r===del;}),reb=m.filter(function(x){return x.fr;});
  if(dob){var cd=c.filter(function(x){return x.r===del;})[0];setTimeout(function(){ayudaJugador(g,yo,3,'¡Tu Delantero la mete!','Cobrás '+P.NOMBRE_REC[del]+' y tu Delantero de '+P.NOMBRE_REC[del]+' lo duplica: '+cd.n+' en vez de '+Math.ceil(cd.n/2)+'.','<div class="ay-mesa"><span class="ay-c">'+K.recurso(del)+'</span><b class="ay-x">×2</b><span class="ay-c ay-c2">'+K.recurso(del)+'</span><span class="ay-c ay-c3">'+K.recurso(del)+'</span></div>');},pre);pre+=lento(2600);}
  if(reb.length){var rr=reb[0].r;setTimeout(function(){ayudaJugador(g,yo,1,'¡Tu Defensor la rebota!','Salió una Multa de '+esc(P.MULTA[rr])+', pero tu Defensor de '+P.NOMBRE_REC[rr]+' no la deja pasar.','<div class="ay-mesa"><span class="ay-mu ay-rebota">'+iconoMulta(rr,70)+'</span></div>');},pre);pre+=lento(2600);}
  setTimeout(function(){capa('<div class="fichaje corto cobro" aria-hidden="true"><div class="fj-tit"><b>'+tit+'</b></div><div class="cb-fila">'+car+mu+'</div></div>',1800);},pre);
  return pre+lento(1800);
}
// Comprar un Beneficio: el dorso gira. Lo que tocó solo lo ve el que compró.
function mostrarCompra(g,e){
  var p=g.jug[e.j],mio=e.j===ui.yo,fr=mio?K.beneficio(P.BENEF[e.b].n):K.dorso('Beneficio');
  return capa('<div class="fichaje corto" aria-hidden="true"><div class="fj-tit"><b>¡'+esc(p.nombre)+' compra un Beneficio!</b><span>'+(mio?esc(P.BENEF[e.b].n)+'. Se usa desde tu próximo turno.':'Lo que le tocó queda en secreto.')+'</span></div><div class="fj-gira"><div class="fj-cara fj-dorso">'+K.dorso('Beneficio')+'</div><div class="fj-cara">'+fr+'</div></div></div>',1900);
}
// Usar un Beneficio: la carta se muestra a todos y le cae el sello
function mostrarUso(g,e){
  var p=g.jug[e.j];
  return capa('<div class="fichaje corto" aria-hidden="true"><div class="fj-tit"><b>'+esc(p.nombre)+' juega '+esc(P.BENEF[e.b].n)+'</b></div><div class="fj-pone">'+K.beneficio(P.BENEF[e.b].n)+'<i class="sello">¡Adentro!</i></div></div>',1900);
}
// Canjear un Token: los Recursos se juntan y sale el Token
function mostrarToken(g,e){
  var p=g.jug[e.j],l=[],pr=P.PRECIO[e.tk];P.REC.forEach(function(r){for(var i=0;i<(pr[r]||0);i++)l.push(r);});
  var cartas=l.map(function(r,i){var x=(i-(l.length-1)/2)*62;return '<span class="cj-c" style="--x:'+x+'px;animation-delay:'+(i*.08).toFixed(2)+'s">'+K.recurso(r)+'</span>';}).join('');
  return capa('<div class="fichaje corto" aria-hidden="true"><div class="fj-tit"><b>'+esc(p.nombre)+' canjea un Token</b><span>de '+(e.tk==='V'?'Victoria':'Efectivo')+'</span></div><div class="cj-mesa">'+cartas+'<span class="cj-tk">'+(e.tk==='V'?K.tokenV():K.tokenE())+'</span></div></div>',1700);
}
// Pagar una Multa: entra el Recurso y le cae el sello
// El Defensor cobra: el rival paga su Multa y la carta vuela, pasa por el escudo del Defensor y cae en la mano del dueño
function mostrarCobroDefensor(g,e){
  var p=g.jug[e.j],q=g.jug[e.para],con=e.con||e.r,cl=e.r,def=q.eq[1],mio=e.para===ui.yo,pago=e.j===ui.yo;
  var tit=mio?'¡Tu Defensor cobra!':'¡El Defensor de '+esc(q.nombre)+' cobra!';
  var sub=(pago?'Pagaste':esc(p.nombre)+' pagó')+' una Multa de '+esc(P.MULTA[cl])+' con 1 de '+P.NOMBRE_REC[con]+'. Como '+(mio?'tenés':esc(q.nombre)+' tiene')+' al Defensor de '+P.NOMBRE_REC[cl]+', ese Recurso va para '+(mio?'tu mano':'su mano')+' y no al Banco.';
  return capa('<div class="fichaje def-cobra" aria-hidden="true"><div class="fj-tit"><b>'+tit+'</b><span>'+sub+'</span></div><div class="dc-mesa"><div class="dc-lado">'+caraDT(g,e.j)+'<span class="dc-mu">'+iconoMulta(cl,64)+'<i class="sello">Pagada</i></span></div><div class="dc-centro"><span class="dc-def">'+(def?K.jugador(def.club,def.pos):K.dorso('Jugador'))+'<i class="dc-escudo">'+ICO_ESCUDO+'</i></span><span class="dc-carta">'+K.recurso(con)+'</span></div><div class="dc-lado">'+caraDT(g,e.para)+'<b class="dc-mas">+1</b></div></div></div>',3400);}
// Un Jugador entra en acción: su figurita salta al frente con su puesto, y abajo se ve lo que hizo
var AY_POS=['ARQUERO','DEFENSOR','VOLANTE','DELANTERO'];
function ayudaJugador(g,j,pos,tit,sub,mesa){var p=g.jug[j],c=p.eq[pos],cj=colJ(p);
  return capa('<div class="fichaje jug-ayuda" style="--dtc:'+cj.color+'" aria-hidden="true"><div class="fj-tit"><b>'+tit+'</b><span>'+sub+'</span></div><div class="ay-escena"><i class="ay-rayos"></i><span class="ay-jug">'+(c?K.jugador(c.club,c.pos):K.dorso('Jugador'))+'<b class="ay-pos">'+AY_POS[pos]+'</b></span></div>'+mesa+'</div>',2600);}
var ICO_ESCUDO='<svg viewBox="0 0 40 46" width="40" height="46"><path d="M20 2l16 6v12c0 12-7 19-16 24C11 39 4 32 4 20V8Z" fill="#ffd83a" stroke="#2b2620" stroke-width="3" stroke-linejoin="round"/><path d="M13 22l5 5 9-11" fill="none" stroke="#2b2620" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function mostrarPagoMulta(g,e){
  var p=g.jug[e.j];if(e.para!=null)return mostrarCobroDefensor(g,e);
  // Con el Arquero: paga con el Recurso de su club
  if(e.con&&e.con!==e.r){var mio=e.j===ui.yo;return ayudaJugador(g,e.j,0,mio?'¡Tu Arquero salva la Multa!':'¡El Arquero de '+esc(p.nombre)+' salva la Multa!',(mio?'Pagás':esc(p.nombre)+' paga')+' la Multa de '+esc(P.MULTA[e.r])+' con 1 de '+P.NOMBRE_REC[e.con]+', el Recurso de su Arquero.','<div class="ay-mesa"><span class="ay-c">'+K.recurso(e.con)+'</span><i class="ay-fl">➜</i><span class="ay-mu">'+iconoMulta(e.r,70)+'<i class="sello">Pagada</i></span></div>');}
  return capa('<div class="fichaje corto" aria-hidden="true"><div class="fj-tit"><b>'+esc(p.nombre)+' paga la Multa</b><span>'+esc(P.MULTA[e.r])+(e.para!=null?'. El pago es para '+esc(g.jug[e.para].nombre)+', por su Defensor.':'')+'</span></div><div class="cj-mesa"><span class="cj-c cj-solo">'+K.recurso(e.con||e.r)+'</span><span class="cj-mu">'+iconoMulta(e.r,130)+'<i class="sello">Pagada</i></span></div></div>',1600);
}
// El festejo: como si hubiera ganado el Mundial
function festejarSiToca(){var g=sala.g;if(!g||g.fase!=='fin'||ui.festejo)return;ui.festejo=true;mostrarMundial(g);}
var COPA='<svg class="copa" viewBox="0 0 120 170" aria-hidden="true"><defs><linearGradient id="oroCopa" x1="0" x2="1"><stop offset="0" stop-color="#a8761d"/><stop offset=".45" stop-color="#ffe27a"/><stop offset="1" stop-color="#b8862b"/></linearGradient></defs><path d="M28 16H6c0 32 10 48 30 52M92 16h22c0 32-10 48-30 52" fill="none" stroke="#b8862b" stroke-width="7"/><path d="M26 8h68c2 44-8 72-34 82C34 80 24 52 26 8Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><path d="M38 16q-2 34 12 54" fill="none" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/><path d="M50 90h20l3 26H47Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><path d="M34 116h52l7 22H27Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><rect x="20" y="138" width="80" height="20" rx="3" fill="#22305a" stroke="#2b2620" stroke-width="3"/><text x="60" y="153" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="13" fill="#ffe27a">PEXA</text><path d="M60 26l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="#fff8d6" stroke="#2b2620" stroke-width="1.6"/></svg>';
function mostrarMundial(g){
  var v=document.querySelector('.mundial');if(v)v.remove();
  var p=g.jug[g.ganador],cs=p.eq.filter(Boolean).map(function(c,i){return '<span class="mu-carta" style="animation-delay:'+(1+i*.28).toFixed(2)+'s">'+K.jugador(c.club,c.pos)+'</span>';}).join('');
  var t=el('<div class="mundial" role="dialog" aria-modal="true" aria-label="Campeón"><canvas></canvas><div class="mu-rayos"></div><div class="mu-in"><div class="mu-est">★ ★ ★</div>'+COPA+'<h1>¡Campeón del mundo!</h1><h2>'+esc(p.nombre)+'</h2><div class="mu-cono">'+cono(p,34)+'</div><p>¡Dale campeón, dale campeón! Levantó la Copa en el turno '+g.nTurnos+'.</p><div class="mu-eq">'+cs+'</div><button class="bt oro" id="muListo">Ver el certificado</button></div></div>').firstChild;
  document.body.appendChild(t);
  var fin=false;t.querySelector('#muListo').onclick=function(){fin=true;t.remove();var r=document.getElementById('resumen');if(r)r.scrollIntoView();};
  // Papelitos con los colores de los clubes
  var cv=t.querySelector('canvas'),c=cv.getContext('2d');if(!c||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))return;
  function medir(){cv.width=innerWidth;cv.height=innerHeight;}medir();
  var cols=['#3f6aa6','#4d7a3a','#d9a61c','#d4692a','#b23f3c','#fbf8f1','#ffe27a'],pap=[];
  for(var i=0;i<160;i++)pap.push({x:Math.random()*cv.width,y:-Math.random()*cv.height*1.4,w:5+Math.random()*7,h:8+Math.random()*9,v:1.6+Math.random()*3,o:Math.random()*6.3,f:Math.random()*.12+.03,col:cols[i%cols.length]});
  (function cuadro(){if(fin||!t.isConnected)return;c.clearRect(0,0,cv.width,cv.height);pap.forEach(function(q){q.y+=q.v;q.o+=q.f;q.x+=Math.sin(q.o)*1.3;if(q.y>cv.height+20){q.y=-20;q.x=Math.random()*cv.width;}c.save();c.translate(q.x,q.y);c.rotate(q.o);c.scale(Math.cos(q.o*2),1);c.fillStyle=q.col;c.fillRect(-q.w/2,-q.h/2,q.w,q.h);c.restore();});requestAnimationFrame(cuadro);})();
}
// El resumen del final
var MEN_IC={'Comerciante':'🤝','La vio':'🔮','Directo al Tribunal de Faltas':'⚖️','El Contador':'🧮','Mano larga':'🦝','Lo dejaron en patas':'🩴','El Cuponero':'🎟️','Mufa':'🐈‍⬛','Buchón':'🕵️','Modo Carrera':'🎮','Maratonista':'🏃','Amigo del Cajero':'🏦','Calesita':'🎠','Cobrador de Multas':'🧾','Seguro de Multas':'🛡️','Dados cargados':'🎲','No le compra a nadie':'🙅','Último orejón del tarro':'👂','Fútbol Champagne':'🍾','Rejunte':'🧲'};
var FILAS_DT=[['cobro','Recursos cobrados'],['ajenas','Pagos cobrados con su Defensor'],['frenadas','Multas rebotadas'],['multas','Multas que le cayeron'],['pago','Multas pagadas'],['tokens','Tokens canjeados'],['tratos','Tratos con otros DTs'],['banco','Cambios con el Banco'],['compro','Beneficios comprados'],['uso','Beneficios usados'],['robo','Cosas que robó'],['robado','Cosas que le robaron'],['espio','Mercados espiados'],['cambios','Jugadores cambiados'],['pasos','Intersecciones caminadas'],['tiros','Tiradas'],['unos','Unos sacados'],['devolvio','Recursos devueltos por el 1'],['enchufo','Multas enchufadas'],['rojas','Tarjetas Rojas recibidas']];
// Qué tanto pesó cada Jugador en el partido
function influencia(p,c){
  var o=(p.inf&&p.inf[c.club+c.pos])||{},R=P.NOMBRE_REC[c.club],d,n;
  if(c.pos===0){n=o.pagadas||0;d=n?'Pagó '+n+' Multa'+(n>1?'s':'')+' con '+R+'.':'No tuvo que pagar ninguna Multa.';n*=1.5;}
  else if(c.pos===1){var a=o.rebotes||0,b=o.ajenas||0;n=a+b;d=n?(a?'Le rebotó '+a+' Multa'+(a>1?'s':'')+'. ':'')+(b?'Cobró '+b+' pago'+(b>1?'s':'')+' de rivales.':''):'Nadie le pagó su Multa.';}
  else if(c.pos===2){n=o.cambios||0;d=n?'Hizo '+n+' cambio'+(n>1?'s':'')+' con descuento.':'No hizo ningún cambio.';}
  else{n=o.extra||0;d=n?'Sumó '+n+' de '+R+' de más.':'No llegó a cobrar de más.';}
  return {n:n,d:d,e:n>=8?3:(n>=4?2:(n>=1?1:0))};
}
function barras(items){var mx=0;items.forEach(function(x){mx=Math.max(mx,x[1]);});return '<div class="bars">'+items.map(function(x){return '<div class="bar">'+x[0]+'<span class="bar-v"><i style="width:'+(mx?Math.round(x[1]/mx*100):0)+'%;'+(x[2]?'background:'+x[2]:'')+'"></i></span><b>'+x[1]+'</b></div>';}).join('')+'</div>';}
// Cada desplegable, del color de un Recurso
function plega(tit,html,clave,abierto,r){ui.resAb=ui.resAb||{};var on=ui.resAb[clave]!=null?ui.resAb[clave]:abierto;return '<details class="res-pl" style="--plc:'+COL[r]+';--plt:'+(r==='picardia'?INK:'#fbf8f1')+'" data-resab="'+clave+'"'+(on?' open':'')+'><summary>'+tit+'</summary><div class="res-in">'+html+'</div></details>';}
function resumen(g,tableroH){
  var S=P.estadisticas,suma=function(k){var s=0;g.jug.forEach(function(p){s+=S(p)[k]||0;});return s;},T=P.tot(g);
  var car=g.caras||[],s='<div class="res" id="resumen">';
  // El Certificado va primero
  s+='<button class="cert-vista" id="certToca" aria-label="Certificado de campeón: tocalo para compartirlo o bajarlo" aria-expanded="'+(!!ui.certAb)+'">'+svgCertificado(g).replace(/ width="1080" height="1080"/,'')+'</button><div class="cert-pista" id="certPista"'+(ui.certAb?' hidden':'')+'>Tocá el certificado para compartirlo</div><div class="cert-bts" id="certBts"'+(ui.certAb?'':' hidden')+'><button class="bt wa" id="certWa">'+icoWa(22)+'<span>Compartir por WhatsApp</span></button><button class="bt chico" id="certPng">Bajar imagen</button></div>';
    // Primero las del campeón, de la más importante a la menos; después las de los demás
  var mens=P.menciones(g).map(function(m,i){m.o=i;return m;}).sort(function(a,b){var ga=a.j.indexOf(g.ganador)>=0?0:1,gb=b.j.indexOf(g.ganador)>=0?0:1;if(ga!==gb)return ga-gb;if(!ga&&(a.top?0:1)!==(b.top?0:1))return (a.top?0:1)-(b.top?0:1);return a.o-b.o;});
  s+=plega('Menciones honoríficas','<div class="res-men">'+mens.map(function(m,i){return '<div class="men'+(m.top?' top':'')+'" style="--gira:'+(i%2?1.2:-1.2)+'deg"><span class="men-ic">'+(MEN_IC[m.t]||'🏅')+'</span><b>'+esc(m.t)+'</b><span>'+esc(m.d)+'</span><div class="men-dt">'+m.j.map(function(id){return dtN(g.jug[id]);}).join('')+'</div></div>';}).join('')+'</div>','men',false,'gol');
  s+=plega('Números de cada DT','<div class="res-tabla"><table><thead><tr><th></th>'+g.jug.map(function(p){return '<th'+(p.id===g.ganador?' class="gano"':'')+'>'+dtN(p)+'</th>';}).join('')+'</tr></thead><tbody><tr><td>Jugadores</td>'+g.jug.map(function(p){return '<td>'+P.contratados(p)+'</td>';}).join('')+'</tr>'+FILAS_DT.map(function(f){var mx=0;g.jug.forEach(function(p){mx=Math.max(mx,S(p)[f[0]]||0);});return '<tr><td>'+f[1]+'</td>'+g.jug.map(function(p){var v=S(p)[f[0]]||0;return '<td'+(mx&&v===mx?' class="max"':'')+'>'+v+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>','num',false,'suerte');
  s+=plega('Los equipos',g.jug.map(function(p){var cs=p.eq.filter(Boolean);return '<div class="res-eq"><div class="res-eq-t">'+dtN(p)+'</div>'+(cs.length?'<div class="inf-l">'+cs.map(function(c){var f=influencia(p,c);return '<div class="inf"><button class="cartita" data-vercarta="'+c.club+'-'+c.pos+'" aria-label="Ver a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button><div><b>'+esc(P.nombreCarta(c))+'</b><span class="inf-e" aria-label="Influencia: '+f.e+' de 3">'+'★★★'.slice(0,f.e)+'<em>'+'★★★'.slice(f.e)+'</em></span><span>'+esc(f.d)+'</span></div></div>';}).join('')+'</div>':'<span class="nota">Sin Jugadores.</span>')+'</div>';}).join(''),'eq',false,'picardia');
  var cu=[[suma('tiros'),'Tiradas'],[suma('tratos')/2,'Tratos'],[suma('multas'),'Multas'],[suma('compro'),'Beneficios comprados'],[T.robR+T.robB,'Robos'],[suma('cobro'),'Recursos cobrados'],[T.robR,'Recursos robados'],[T.robB,'Beneficios robados'],[suma('banco'),'Tratos con el Banco'],[T.dob,'Dobles'],[T.rebotes,'Multas rebotadas'],[suma('ajenas'),'Pagos que cobró un Defensor'],[suma('devolvio'),'Recursos devueltos por el 1'],[T.goles,'Penales adentro'],[T.atajados,'Penales atajados'],[suma('espio'),'Espiadas a un Mercado'],[suma('pasos'),'Intersecciones caminadas'],[suma('cambios'),'Jugadores cambiados']];
  s+=plega('Curiosidades','<h4>Cuántas veces salió cada dado</h4>'+barras([1,2,3,4,5,6].map(function(n){return [dado(n,'b',24),car[n]||0];}))+'<h4>Multas que cayeron, por color</h4>'+barras(P.REC.map(function(r){return [iconoMulta(r,26),T.mul[r]||0,COL[r]];}))+'<h4>Recursos cobrados</h4>'+barras(P.REC.map(function(r){return [iconoCirc(r,26),T.cob[r]||0,COL[r]];}))+'<div class="res-datos cur">'+cu.map(function(x){return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>';}).join('')+'</div>','cur',false,'fans');
  s+=plega('Cómo quedó el tablero',tableroH,'tab',false,'sponsors');
  s+='<div class="fin-bts"><button class="bt festejo" id="verFestejo"><span class="fes-ic" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'+COPA.replace('class="copa"','class="fes-copa"')+'<span>Ver el festejo de nuevo</span></button><button class="bt fuerte" id="otra">Volver al inicio</button></div>';
  return s+'</div>';
}
// Un intercambio de Recursos: las cartas cruzan de un DT al otro. Se ve igual cuando negocian las máquinas.
function cartasVuelan(o,clase){var l=[];P.REC.forEach(function(r){for(var i=0;i<(o[r]||0);i++)l.push(r);});
  return l.slice(0,6).map(function(r,i){return '<span class="tq-c '+clase+'" style="animation-delay:'+(i*.13).toFixed(2)+'s">'+K.recurso(r)+'</span>';}).join('');}
function etiquetaDT(g,j){var p=g.jug[j];return '<div class="tq-dt">'+cono(p,34)+'<b>'+esc(p.nombre)+'</b></div>';}
function mostrarTrueque(g,e){
  // Cambio con el Banco usando al Volante (2 por 1 en cualquier lado, 1 por 1 en su Boletería)
  if(e.t==='banco'){var pv=g.jug[e.de],dv=null,tv=null;P.REC.forEach(function(r){if(e.doy[r])dv=r;if(e.pido[r])tv=r;});
    if(dv&&P.hab(pv,2)===dv&&e.doy[dv]<4){var miov=e.de===ui.yo,cs='';for(var iv=0;iv<e.doy[dv];iv++)cs+='<span class="ay-c"'+(iv?' style="margin-left:-34px"':'')+'>'+K.recurso(dv)+'</span>';
      return ayudaJugador(g,e.de,2,miov?'¡Tu Volante arma la jugada!':'¡El Volante de '+esc(pv.nombre)+' arma la jugada!',(miov?'Cambiás ':esc(pv.nombre)+' cambia ')+e.doy[dv]+' de '+P.NOMBRE_REC[dv]+' por 1 de '+P.NOMBRE_REC[tv]+(e.doy[dv]===1?', en la Boletería de '+P.NOMBRE_REC[dv]:'')+'.','<div class="ay-mesa">'+cs+'<i class="ay-fl">➜</i><span class="ay-c ay-sale">'+K.recurso(tv)+'</span></div>');}}
  var devuelve=e.t==='devuelve',banco=e.t==='banco'||devuelve,der=banco?'<div class="tq-dt"><span class="tq-banco">$</span><b>El Banco</b></div>':etiquetaDT(g,e.a);
  var t=el('<div class="trueque" aria-hidden="true"><h3>'+(devuelve?'¡Salió un 1! '+esc(g.jug[e.de].nombre)+' devuelve '+(e.cant!=null?e.cant:P.suma(e.doy)):(banco?'Cambio con el Banco':'¡Trato!'))+'</h3><div class="tq-fila">'+etiquetaDT(g,e.de)+'<div class="tq-mesa">'+cartasVuelan(e.doy,'ida')+cartasVuelan(e.pido,'vuelta')+'</div>'+der+'</div></div>').firstChild;
  var ms=lento(2100);t.style.animationDuration=ms+'ms';document.body.appendChild(t);setTimeout(function(){t.remove();},ms);return ms;
}
// Un fichaje: la carta aparece dada vuelta y gira hasta mostrar al Jugador
function mostrarFichaje(g,e){
  var p=g.jug[e.j],n=P.nombreCarta(e.c);
  var t=el('<div class="fichaje" aria-hidden="true"><div class="fj-tit"><b>¡'+esc(p.nombre)+(e.cambio?' cambia y trae a ':' contrata a ')+esc(n)+'!</b><span>'+P.POS[e.c.pos]+' de '+P.NOMBRE_REC[e.c.club]+(e.dev?'. Devuelve '+e.dev+' Multa'+(e.dev>1?'s':'')+' de '+esc(P.MULTA[e.c.club])+'.':'')+'</span></div><div class="fj-gira"><div class="fj-cara fj-dorso">'+K.dorso('Jugador')+'</div><div class="fj-cara">'+K.jugador(e.c.club,e.c.pos)+'</div></div></div>').firstChild;
  var ms=lento(2800);t.style.animationDuration=ms+'ms';document.body.appendChild(t);setTimeout(function(){t.remove();},ms);return ms;
}

// ---------- Que se entienda: lo que pasó con la última tirada, el camino al Palco, las reglas y las fichas ----------
function porDTirada(u){var porDT={};u.cob.forEach(function(c){(porDT[c.j]=porDT[c.j]||{c:[],m:[]}).c.push(c);});u.mul.forEach(function(m){(porDT[m.j]=porDT[m.j]||{c:[],m:[]}).m.push(m);});return porDT;}
// Qué dio la tirada, a la izquierda del tablero: solo dibujos
function tiradaCol(g){
  var u=g.ultTiro,s='<div class="qt" aria-label="Qué dio la última tirada">';
  if(!u)return s+'</div>';
  s+='<div class="qt-d">'+dado(u.d[0],'a',19)+dado(u.d[1],'b',19)+'</div>';
  var pd=porDTirada(u);
  Object.keys(pd).forEach(function(j){var x=pd[j],ic='';
    x.c.forEach(function(c){for(var i=0;i<c.n;i++)ic+=iconoCirc(c.r,17);});
    x.m.forEach(function(m){ic+='<span class="qt-m'+(m.fr?' fren':'')+'">'+iconoMulta(m.r,17)+'</span>';});
    s+='<button class="qt-dt" data-qt="'+j+'" aria-label="Qué cobró '+esc(g.jug[j].nombre)+'">'+cono(g.jug[j],17)+'<div class="qt-ic">'+ic+'</div></button>';});
  return s+'</div>';
}
// Al tocar un ícono de la izquierda: qué cobró ese DT con la última tirada, en palabras
function modalQt(g,j){
  var u=g.ultTiro,q=g.jug[j],x=u?porDTirada(u)[j]:null,f=[];
  if(x){x.c.forEach(function(c){f.push(filaFicha('<span class="ics">'+precioIc(pagoN(c.r,c.n),26)+'</span>',dtN(q)+' cobró '+c.n+' '+P.NOMBRE_REC[c.r],'Su Cábala toca una pieza de '+P.NOMBRE_REC[c.r]+' que salió con los dados'+(c.n>1&&P.hab(q,3)===c.r?', y su Delantero de '+P.NOMBRE_REC[c.r]+' cobra el doble':'')+'.'));});
    x.m.forEach(function(m){f.push(filaFicha(iconoMulta(m.r,34),m.fr?'A '+dtN(q)+' le rebotó '+esc(P.MULTA[m.r]):dtN(q)+' se llevó una Multa de '+esc(P.MULTA[m.r]),m.fr?'Su Defensor de '+P.NOMBRE_REC[m.r]+' la frena: no le cae.':'Su Cábala toca una Zona de Mala Fama que salió con los dados. Traba su '+P.NOMBRE_REC[m.r]+' hasta pagarla.'));});}
  return '<h2 class="tit-ic">'+cono(q,26)+'La última tirada</h2><div class="ej"><div class="ej-v">'+dado(u.d[0],'a',34)+dado(u.d[1],'b',34)+'</div></div><div class="qt-info">'+(f.length?f.join(''):'<p>'+dtN(q)+' no cobró nada.</p>')+'</div>';
}
function pagoN(r,n){var o={};o[r]=n;return o;}
// Lo mismo, contado por El Relator
function textoTirada(g){
  var u=g.ultTiro;if(!u||u.n!==g.nTirada||!g.dados)return '';
  // Lo que cobró cada uno ya está a la izquierda del tablero y en "Lo que fue pasando": acá solo los dados
  var dob=u.d[0]===u.d[1];
  var s='Salieron '+dado(u.d[0],'a',17,'dd-t')+' y '+dado(u.d[1],'b',17,'dd-t')+'.';
  if(dob)s+=' ¡Doble! Cada pieza paga dos veces y se camina la suma: '+(u.d[0]+u.d[1])+' pasos.';
  else if(u.d.indexOf(1)>=0)s+=' Salió un 1: se activa el Palco, y el que ya tenía más de 9 Recursos devuelve la mitad.';
  if(u.sinB.length)s+=' El Banco no alcanzó y nadie cobró '+u.sinB.map(function(r){return P.NOMBRE_REC[r];}).join(' ni ')+'.';
  return s;
}
function camino(g,me){
  if(g.fase==='ubicar'||g.fase==='barraIni'||g.fase==='fin')return '';
  var n=P.contratados(me),todos=P.REC.every(function(r){return me.mano[r]>=1;}),nm=P.suma(me.multas),pago=!!P.pagoEntrada(me,me.mano),eq=n>=g.meta,listo=eq&&pago;
  function it(ok,t,extra){return '<div class="cm-it'+(ok?' ok':'')+'"><span class="cm-m" aria-hidden="true">'+(ok?'✓':'')+'</span><div><b>'+t+'</b>'+(extra||'')+'</div></div>';}
  var s='<div class="camino'+(listo?' listo':'')+'"><h4>Tu camino a la Copa</h4>';
  s+=it(eq,'Equipo: '+n+' de '+g.meta+' Jugadores','<span class="cm-pos">'+P.POS.map(function(p,i){return '<i class="'+(me.eq[i]?'si':'')+'">'+p+'</i>';}).join('')+'</span>');
  s+=it(todos,'Un Recurso de cada tipo','<span class="ics cm-rec">'+P.REC.map(function(r){return '<span class="'+(me.mano[r]>=1?'':'apag')+'">'+iconoCirc(r,22)+'</span>';}).join('')+'</span>');
  s+=it(nm===0||pago,nm?'Multas: tenés '+nm+(pago?', y te alcanza para pagarlas al entrar':', pagalas o juntá con qué pagarlas'):'Sin Multas');
  s+=it(false,listo?'¡Ya podés levantar la Copa! Parate en un vértice del Palco y sacá el número justo':'Levantar la Copa en el centro del Palco');
  return s+'</div>';
}
function iconoCirc(r,w){return '<span class="circ" style="width:'+w+'px;height:'+w+'px;background:'+COL[r]+'">'+icono(r,Math.round(w*.8))+'</span>';}
function faltaPara(me,pr){var f=[];for(var k in pr){var x=pr[k]-me.mano[k];if(me.multas[k]&&!me.amnistia)f.push(P.NOMBRE_REC[k]+' trabado por Multa');else if(x>0)f.push(x+' de '+P.NOMBRE_REC[k]);}return f.length?'<span class="sub">Te falta: '+f.join(', ')+'.</span>':'';}
function consejoCanje(g,me){
  var nm=P.suma(me.multas),n=P.contratados(me),m=P.mercadoDe(me.pos);
  if(nm)return 'Tenés '+nm+' Multa'+(nm>1?'s':'')+': ese Recurso queda trabado hasta que pagues. Tocá Negocios y pagala con 1 de su tipo.';
  if(n>=g.meta)return P.gana(g,me)?'Tenés todo para levantar la Copa: terminá el turno y buscá un vértice del Palco.':'Tu equipo está completo: juntá 1 Recurso de cada tipo y andá al Palco a levantar la Copa.';
  if(m>=0&&!me.contrato&&g.mercados[m].length)return 'Estás en un Mercado de Pases: entrá a ver los Jugadores, y salí a canjear o negociar cuantas veces quieras.';
  var rap=g.modo==='rapido'&&g.meta===4,paga=rap?'En este partido, Arquero y Defensor cuestan 1 de Victoria; Volante y Delantero, 1 de Efectivo.':'Con uno de Victoria y uno de Efectivo se contrata un Jugador.';
  if(P.puedeContratarAlgo(g,me))return 'Ya tenés con qué contratar: caminá hasta un Mercado de Pases (las casillas rojas). '+(rap?paga:'');
  if(P.puedePagar(me,P.PRECIO.V)&&me.V<1)return 'Te alcanza para un Token de Victoria: tocá Negocios. '+paga;
  if(P.puedePagar(me,P.PRECIO.E)&&me.E<1)return 'Te alcanza para un Token de Efectivo: tocá Negocios. '+paga;
  return 'Te falta para un Token. Probá negociar con otro DT o cambiar con el Banco, en Negocios. Si no, terminá el turno.';
}
function costoJugador(g){return g&&g.modo==='rapido'&&g.meta===4?'cuesta 1 Token: <b>Arquero y Defensor</b> '+token('V',20)+', <b>Volante y Delantero</b> '+token('E',20):'cuesta '+token('V',20)+' + '+token('E',20);}
// Las reglas, cada una con un ejemplo dibujado
function ejFl(){return '<i class="ej-fl">➜</i>';}
function ej(cap,html){return '<div class="ej"><div class="ej-v">'+html+'</div>'+(cap?'<small>'+cap+'</small>':'')+'</div>';}
function ejCarta(svg,cls){return '<span class="ej-c'+(cls?' '+cls:'')+'">'+svg+'</span>';}
function ejNoqui(s){return '<svg viewBox="-13 -10 26 20" width="'+s+'" height="'+Math.round(s*20/26)+'" aria-hidden="true"><ellipse rx="11" ry="8" fill="#dcb98a" stroke="'+INK+'" stroke-width="1.6"/><path d="M-6-5q1.6 5 0 10M-2-6.6q1.6 6.6 0 13.2M2-6.6q1.6 6.6 0 13.2M6-5q1.6 5 0 10" fill="none" stroke="#a9825c" stroke-width="1"/></svg>';}
// Un pedazo de calle: cada lugar puede tener un ñoqui (n), una Cábala (c) o nada; f marca adónde cae el ñoqui
function ejCalle(l,f,cap){return '<div class="ej"><div class="ej-calle">'+l.map(function(x,i){return (i?'<i class="ej-tr"></i>':'')+'<span class="ej-l'+(f===i?' dest':'')+'">'+(x==='n'?ejNoqui(24):(x==='c'?cono(0,20):''))+'</span>';}).join('')+'</div><small>'+cap+'</small></div>';}
function ejPieza(color,num,oscura){return '<svg viewBox="0 0 92 80" width="74" height="64" aria-hidden="true"><polygon points="24,4 68,4 90,40 68,76 24,76 2,40" fill="'+color+'" stroke="'+INK+'" stroke-width="2.5"/>'+(oscura?'<polygon points="28,11 64,11 82,40 64,69 28,69 10,40" fill="none" stroke="#9a948c" stroke-width="1.6" stroke-dasharray="4 3"/>':'')+'<circle cx="46" cy="40" r="15" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.5"/><text x="46" y="48" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="21" fill="'+INK+'">'+num+'</text><g transform="translate(68 16) scale(.8)"><path d="M0-13L9 8H-9Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><rect x="-12" y="6.6" width="24" height="6" rx="1.8" fill="#fff" stroke="#111" stroke-width="1.6"/></g></svg>';}
function tabReglas(g,me){
  function pr(m){return precioIc(m,20);}
  function ic(r,w){return iconoCirc(r,w||26);}
  var cam=g&&me?camino(g,me):'',CO=COPA.replace('class="copa"','class="ej-copa"');
  var sec=[
    ['¿Cómo se gana?','Armá un equipo de <b>4 Jugadores</b>, uno por posición, juntá <b>1 Recurso de cada tipo</b> y <b>levantá la Copa</b> en el centro del Palco, con el número justo del dado blanco. Si tenés Multas, tienen que alcanzarte los Recursos para pagarlas al entrar y que igual te quede 1 de cada tipo.'+ej('Equipo completo + 1 de cada Recurso + el número justo = campeón.',[['gol',0],['picardia',1],['fans',2],['suerte',3]].map(function(x){return ejCarta(K.jugador(x[0],x[1]));}).join('')+'<i class="ej-mas">+</i>'+P.REC.map(function(r){return ic(r,22);}).join('')+ejFl()+CO)+(cam?'<div style="margin-top:8px">'+cam+'</div>':'')],
    ['Cómo arranca el partido','Por turno, cada DT pone su Cábala en un <b>punto de arranque</b> (las esquinas con estrella) y cobra 1 Recurso de cada hexágono que toca. Después, los <b>Barrabravas</b> van a los puntos de arranque que quedaron libres.'+ej('Tu Cábala toca tres piezas: arrancás con tres Recursos.',cono(0,26)+ejFl()+ic('gol')+ic('suerte')+ic('fans'))],
    ['Tu turno, paso a paso','<ol class="ej-pasos"><li>'+dado(4,'a',22)+dado(2,'b',22)+'<span><b>Tirás los dos dados.</b> Con cada número, cobran todos.</span></li><li>'+cono(0,22)+'<span><b>Movés tu Cábala</b> exactamente lo que marca el dado blanco. Con dobles, la suma de los dos. Nunca pegás la vuelta a la esquina de la que venís; todo lo demás vale: pasar otra vez por una esquina, por donde arrancaste o dar la vuelta a una pieza. No se pasa por encima de Cábalas ni Barrabravas.</span></li><li>'+ejNoqui(26)+'<span><b>Los Barrabravas avanzan solos</b> una intersección, en sentido horario.</span></li><li>'+token('V',24)+'<span><b>Canjeás y negociás</b> lo que quieras.</span></li><li><i class="ej-fl">✓</i><span><b>Terminás el turno.</b></span></li></ol>'],
    ['Cómo se cobra','Cada pieza del tablero tiene un número. Si sale ese número y tu Cábala toca la pieza, cobrás. Cobran todos, no solo el que tiró. Con dobles, la pieza paga dos veces.'+ej('Sale un 4 y tu Cábala toca una pieza azul con el 4: cobrás 1 de Gol.',dado(4,'a',34)+ejFl()+ejPieza(COL.gol,4)+ejFl()+ejCarta(K.recurso('gol')))+ej('Sale un 5 y tu Cábala toca una zona de Mala Fama con el 5: te cae 1 Multa.',dado(5,'a',34)+ejFl()+ejPieza('#3d3731',5,true)+ejFl()+iconoMulta('fans',44))],
    ['Salió un 1','Si sale un 1, el que <b>ya tenía más de 9 Recursos antes de tirar devuelve la mitad</b>. Además se activa el Palco: el que esté en un vértice se lleva una Multa.'+ej('Con 12 Recursos en la mano antes de tirar, si sale un 1 devolvés 6.',dado(1,'a',34)+ejFl()+'<b class="ej-n">12</b>'+ejFl()+'<b class="ej-n">6</b>')+ej('Si tenías 9 y llegaste a 11 con esta misma tirada, no devolvés nada.','<b class="ej-n">9</b>'+ejFl()+dado(1,'a',30)+ejFl()+'<b class="ej-n">11</b><i class="ej-fl">✓</i>')],
    ['Recursos y sus Multas','Cada club tiene su Recurso, su número y su Multa. Los números de los estadios y predios no cambian nunca.<div class="rm">'+P.REC.map(function(r){return '<div class="rm-f" style="--rc:'+COL[r]+'">'+iconoCirc(r,32)+'<span><b>'+P.NOMBRE_REC[r]+'</b><small>'+esc(P.CLUB[r])+'</small></span><b class="rm-n">'+P.NUM[r]+'</b>'+iconoMulta(r,32)+'<small class="rm-m">'+esc(P.MULTA[r])+'</small></div>';}).join('')+'</div>'],
    ['Multas','Cada Multa <b>traba un Recurso</b>: no lo podés usar hasta pagarla con 1 de ese Recurso, o con tu Arquero. Podés tener 5 como máximo: con 5, no te cae ninguna más.'+ej('Con la Multa de Fans, tus cartas de Fans quedan trabadas. Pagás 1 y se destraban.',iconoMulta('fans',44)+ejCarta(K.recurso('fans'),'trabada')+ejCarta(K.recurso('fans'),'trabada')+ejFl()+ic('fans')+ejFl()+ejCarta(K.recurso('fans')))],
    ['Tokens y Jugadores','Los Tokens se canjean en tu turno, y con ellos se contratan los Jugadores.'+ej('Token de Victoria',pr(P.PRECIO.V)+ejFl()+token('V',32))+ej('Token de Efectivo',pr(P.PRECIO.E)+ejFl()+token('E',32))+ej('Partido completo: cada Jugador cuesta los dos Tokens.',token('V',28)+token('E',28)+ejFl()+ejCarta(K.dorso('Jugador')))+ej('Partido rápido: Arquero y Defensor, 1 de Victoria. Volante y Delantero, 1 de Efectivo.',token('V',28)+ejFl()+ejCarta(K.jugador('gol',0))+ejCarta(K.jugador('gol',1))+'<i class="ej-mas"></i>'+token('E',28)+ejFl()+ejCarta(K.jugador('gol',2))+ejCarta(K.jugador('gol',3)))],
    ['Mercado de Pases','Parado en un Mercado, en tu turno, podés <b>entrar a mirar los Jugadores todas las veces que quieras</b>. Mirar es gratis. Si te falta un Token, salís, canjeás o negociás, y volvés a entrar. Se contrata uno por turno, y cambiar a uno que ya tenés cuesta 1 Token, el que quieras.'+ej('Tocás un Jugador y aparece el botón para contratarlo.',ejCarta(K.jugador('fans',2))+ejFl()+token('V',28)+token('E',28))],
    ['Qué hace cada Jugador','Cada uno tiene el Recurso de su club, y su habilidad usa ese Recurso.'+ej('<b>Arquero de Gol:</b> con Gol pagás cualquier Multa.',ic('gol')+ejFl()+iconoMulta('fans',36))+ej('<b>Defensor de Fans:</b> al contratarlo devolvés todas tus Multas de Fans. Desde ahí, la de Fans te rebota: no te cae.','<span class="ej-tacha">'+iconoMulta('fans',36)+'</span>')+ej('<b>Y además:</b> si un rival paga la Multa de Fans, ese pago es tuyo.',cono(1,24)+iconoMulta('fans',32)+ic('fans')+ejFl()+cono(0,24))+ej('<b>Volante de Gol:</b> cambiás 2 de Gol por 1 cualquiera, donde estés. En la Boletería de Gol, 1 por 1.',ic('gol')+ic('gol')+ejFl()+ic('sponsors'))+ej('<b>Delantero de Gol:</b> cuando cobrás Gol, levantás el doble.',ic('gol')+ejFl()+ic('gol')+ic('gol'))],
    ['Beneficios','Se usan desde tu próximo turno, uno por turno.'+ej('Un Beneficio es una sorpresa del mazo.',pr(P.PRECIO.B)+ejFl()+ejCarta(K.dorso('Beneficio')))+ej('Con 3 usados, cuando quieras, los entregás por 1 Recurso a elección.',ejCarta(K.dorso('Beneficio'))+ejCarta(K.dorso('Beneficio'))+ejCarta(K.dorso('Beneficio'))+ejFl()+ic('suerte'))],
    ['Cambiar con el Banco','Con el Banco se cambia en cualquier lugar. En una <b>Boletería</b> sale más barato: se usa desde las 3 esquinas de la punta del predio. Y si tenés el Volante de ese Recurso, ahí cambiás 1 por 1.'+ej('En cualquier lugar: 4 iguales por 1.',ic('gol',22)+ic('gol',22)+ic('gol',22)+ic('gol',22)+ejFl()+ic('suerte'))+ej('En la Boletería de Gol: das 2 de Gol y te llevás 1 del que quieras.',ic('gol')+ic('gol')+ejFl()+ic('picardia'))],
    ['Negociar','En tu turno, después de mover, podés ofrecer un trato en Negocios. La oferta va siempre para todos los DTs y se la lleva el primero que acepte. Cuando es el turno de otro, también podés ofrecerle a él.'+ej('Das lo que te sobra, pedís lo que te falta.',cono(0,24)+ic('fans')+'<i class="ej-fl">⇄</i>'+ic('gol')+cono(1,24))],
    ['El Palco','Desde un vértice podés espiar <b>uno solo</b> de los dos Mercados de Pases más cercanos: vos elegís cuál. Al centro solo se entra con todo listo para levantar la Copa (los Recursos de la mano, descontando lo que pagás de Multas), con el último paso: no es lugar de paso.'+ej('Mirás uno de los dos, no los dos.',icoBinoculares(38)+ejFl()+ejCarta(K.dorso('Jugador'))+'<b>o</b>'+ejCarta(K.dorso('Jugador')))],
    ['Barrabravas','Después de que movés tu Cábala, cada Barrabrava avanza <b>solo</b> una intersección en sentido horario, por su recorrido. Nadie puede pasar ni pararse donde hay un Barrabrava.'+ejCalle(['n','',''],1,'Si está libre, avanza uno.')+ejCalle(['n','c',''],2,'Si hay una Cábala, la salta.')+ejCalle(['n','n',''],0,'Si hay otro Barrabrava, se queda donde está.')]
  ];
  return '<div class="reglas"><p class="nota" style="margin:0">Tocá un tema para abrirlo. Y si tocás cualquier pieza del tablero, te cuenta para qué sirve.</p>'+sec.map(function(x,i){return '<details'+(i===0?' open':'')+'><summary>'+x[0]+'</summary><div>'+x[1]+'</div></details>';}).join('')+'</div>';
}
// La ilustración de una pieza: se dibuja recién cuando se pide, solo ese pedazo y bien nítido
function geoPieza(pz){
  var pol=null,cx,cy,rot,tam;
  if(pz.t==='area'){pol=poligono(pz.a);var c0=cen(pol);cx=c0[0];cy=c0[1];var a=pz.a;rot=a===0?0:(a<=5?TH[a-1]+90:(a<=10?TH[a-6]+126:TH[a-11]+90));tam=a===0?116:130;if(a>5){var ang=Math.atan2(cy,cx);cx+=8*Math.cos(ang);cy+=8*Math.sin(ang);}}
  else if(pz.t==='mercado'){var m=Pol(262,TH[pz.i]);cx=m[0];cy=m[1];rot=TH[pz.i]+90;tam=84;}
  else{var b=Pol(258,TH[pz.i]+36);cx=b[0];cy=b[1];rot=TH[pz.i]+126;tam=104;}
  return {pol:pol,cx:cx,cy:cy,rot:rot,tam:tam};
}
function cortePieza(pz,url){
  var G=geoPieza(pz),id='cp'+Math.floor(Math.random()*1e6);
  return '<svg viewBox="'+(G.cx-G.tam/2).toFixed(1)+' '+(G.cy-G.tam/2).toFixed(1)+' '+G.tam+' '+G.tam+'" aria-hidden="true">'+(G.pol?'<defs><clipPath id="'+id+'"><polygon points="'+pts(G.pol)+'"/></clipPath></defs>':'')+'<g transform="rotate('+(-G.rot).toFixed(1)+' '+G.cx.toFixed(1)+' '+G.cy.toFixed(1)+')"><image href="'+url+'" x="-320" y="-320" width="640" height="640"'+(G.pol?' clip-path="url(#'+id+')"':'')+'/>'+(G.pol?'<polygon points="'+pts(G.pol)+'" fill="none" stroke="#2b2620" stroke-width="1"/>':'')+'</g></svg>';
}
function filaFicha(ic,t,d){return '<div class="ff"><span class="ff-ic">'+ic+'</span><div><b>'+t+'</b><span>'+d+'</span></div></div>';}
function fichaPieza(g,pz){
  var f={tit:'',sup:'',color:'#5a5550',num:null,lore:'',filas:[],quien:[]};
  function tocan(a){return g.jug.filter(function(p){return p.pos>=0&&P.NODOS[p.pos]&&(P.NODOS[p.pos].areas||[]).indexOf(a)>=0;});}
  if(pz.t==='area'){var a=pz.a,r=g.rec[a],n=g.num[a];f.quien=tocan(a);f.num=n;
    if(a===0){f.tit='El Palco';f.sup='El centro de la isla';f.color='#22305a';
      f.filas=[filaFicha(dado(1,'b',30),'Con cada 1','El que esté parado en un vértice se lleva una Multa.'),filaFicha(icoBinoculares(30),'Desde el Palco se ve todo','Desde cada vértice podés espiar uno solo de los dos Mercados de Pases más cercanos.'),filaFicha('<span class="ff-copa">★</span>','Acá se levanta la Copa','Al centro se entra por el pasillo, con el último paso del dado blanco. Si tenés todo lo necesario, levantás la Copa; si no, quedás adentro y el 1 también te toca.')];}
    else if(r){var est=a<=5;f.tit=est?(/^Estadio /.test(P.ESTADIO[r])?'':'Estadio ')+P.ESTADIO[r]:P.PREDIO[r];f.sup=(est?'Estadio':'Predio')+' de '+P.CLUB[r];f.color=COL[r];
      f.filas=[filaFicha(iconoCirc(r,34),'Cobrás '+P.NOMBRE_REC[r],'Cuando sale un <b>'+n+'</b>, cada Cábala que toque esta pieza se lleva 1.'),filaFicha('<span class="ff-pos">DEL</span>','Con su Delantero','El Delantero de '+P.NOMBRE_REC[r]+' cobra el doble.')];
      if(!est)f.filas.push(filaFicha('<span class="ff-pos">$</span>','Boletería','En su punta está la Boletería de '+P.NOMBRE_REC[r]+'.'));}
    else{var z=a-11;f.tit=P.ZONA[z];f.sup='Zona de Mala Fama';f.color='#2b2620';f.lore=ZONA_TXT[z];
      f.filas=[filaFicha(multaGenerica(34),'Te cae una Multa','Cuando sale un <b>'+n+'</b>, cada Cábala que la toque saca 1 Multa de la bolsa, sin mirar. Puede ser de cualquiera de los cinco Recursos. Conviene no quedarse cerca.')];}
  } else if(pz.t==='mercado'){var mm=g.mercados[pz.i];f.tit='Mercado de Pases';f.sup=P.ZONA[pz.i];f.color='#b8323a';f.quien=g.jug.filter(function(p){return p.pos===P.MERCADOS[pz.i];});
    f.filas=[filaFicha('<span class="ff-pos">'+mm.length+'/4</span>','Jugadores','Quedan <b>'+mm.length+' de 4</b> en este Mercado.'),filaFicha(token('V',28)+token('E',28),'Para contratar','Parate acá. Un Jugador '+costoJugador(g)+'.'),filaFicha(icoBinoculares(30),'Mirar es gratis','En tu turno, todas las veces que quieras. Si ninguno te sirve, no pagás nada.')];}
  else{var b=g.rec[6+pz.i];f.tit='Boletería de '+P.NOMBRE_REC[b];f.sup=P.PREDIO[b];f.color=COL[b];
    f.filas=[filaFicha(iconoCirc(b,34),'Das 2 y elegís','Das 2 de '+P.NOMBRE_REC[b]+' y te llevás 1 del que quieras.'),filaFicha('<span class="ff-pos">3</span>','Las 3 esquinas son Boletería','La punta del predio y las dos esquinas de al lado: parado en cualquiera de las 3, canjeás como en la Boletería.'),filaFicha('<span class="ff-pos">1:1</span>','Con su Volante, 1 por 1','Si tenés el Volante de '+P.NOMBRE_REC[b]+', acá das 1 de '+P.NOMBRE_REC[b]+' y te llevás 1 del que quieras.'),filaFicha('<span class="ff-pos">4:1</span>','Afuera','Lejos de la Boletería, el Banco te pide 4 iguales por 1.')];}
  return f;
}
// La pieza en versión simple, con su nombre escrito: como en el tablero simplificado, pero grande
function piezaSimple(g,pz,f){
  var W=300,H=210,s='<svg class="pieza-g" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(f.tit)+'"><rect width="'+W+'" height="'+H+'" rx="12" fill="#8fc3df"/>';
  function poli(n,r,cx,cy,rot){var p=[];for(var i=0;i<n;i++){var a=(rot+i*360/n)*Math.PI/180;p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));}return p.join(' ');}
  function numero(x,y,n,col){return '<circle cx="'+x+'" cy="'+y+'" r="22" fill="#fbf8f1" stroke="'+INK+'" stroke-width="2"/><circle cx="'+x+'" cy="'+y+'" r="18" fill="'+col+'"/><text x="'+x+'" y="'+(y+10)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="28" fill="#fbf8f1" stroke="'+INK+'" stroke-width="2.4" paint-order="stroke">'+n+'</text>';}
  function cartel(t){var fs=Math.min(24,Math.floor(470/(t.length+2)));return '<rect x="14" y="'+(H-46)+'" width="'+(W-28)+'" height="36" rx="9" fill="#fbf8f1" stroke="'+INK+'" stroke-width="2.5"/><text x="'+W/2+'" y="'+(H-28+fs*.36).toFixed(1)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="'+fs+'" fill="'+INK+'">'+esc(t)+'</text>';}
  var cx=W/2,cy=82;
  if(pz.t==='area'){var a=pz.a,r=g.rec[a],hex=a>=1&&a<=10,col=r?COL[r]:(a===0?'#5a5550':'#3a3530');
    s+='<polygon points="'+poli(hex?6:5,76,cx,cy,hex?30:-90)+'" fill="'+col+'" stroke="'+INK+'" stroke-width="3.5" stroke-linejoin="round"/>';
    if(r)s+='<g transform="translate('+(cx-62)+' '+(cy-40)+') scale(.5)">'+K.badge(r)+'</g>'+numero(cx+28,cy+6,g.num[a],col);
    else if(a===0)s+=COPA.replace('<svg ','<svg x="'+(cx-24)+'" y="'+(cy-66)+'" width="48" height="68" ')+numero(cx,cy+26,1,'#111');
    else s+='<g transform="translate('+(cx-24)+' '+(cy-64)+') scale(.48)">'+multaGenInner()+'</g>'+numero(cx,cy+24,g.num[a],'#111');
    s+=cartel(f.tit);}
  else if(pz.t==='mercado'){var n=g.mercados[pz.i].length;
    s+='<rect x="'+(cx-80)+'" y="'+(cy-58)+'" width="160" height="112" rx="10" fill="#b8323a" stroke="'+INK+'" stroke-width="3.5"/><rect x="'+(cx-68)+'" y="'+(cy-46)+'" width="136" height="88" rx="6" fill="#fdf3d2"/>';
    for(var k=0;k<4;k++)s+='<rect x="'+(cx-58+k*30)+'" y="'+(cy-32)+'" width="26" height="40" rx="3" fill="'+(k<n?'#22305a':'none')+'" stroke="'+(k<n?INK:'#c9b98f')+'" stroke-width="2" stroke-dasharray="'+(k<n?'0':'4 3')+'"/>';
    // El texto va en tinta y adentro de lo crema: antes era rojo y se pisaba con el borde rojo
    s+='<text x="'+cx+'" y="'+(cy+32)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="17" fill="'+INK+'">'+n+' de 4</text>'+numero(cx+76,cy-52,g.num[11+pz.i],'#111')+cartel('Mercado del '+g.num[11+pz.i]);}
  else{var b=g.rec[6+pz.i],cb=COL[b],L=[70,102],T=[cx,46],R=[230,102];
    // La Boletería son las 3 esquinas de la punta del predio: las dos de los costados y la punta
    function esq(q,rr){return '<circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+rr+'" fill="'+cb+'" stroke="'+INK+'" stroke-width="3"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+(rr*.45).toFixed(1)+'" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.5"/>';}
    s+='<polygon points="'+L+' '+T+' '+R+' 230,170 70,170" fill="'+cb+'" opacity=".35"/><path d="M'+L+' L'+T+' L'+R+'" fill="none" stroke="#fbf8f1" stroke-width="13" stroke-linejoin="round"/><path d="M'+L+' L'+T+' L'+R+'" fill="none" stroke="'+INK+'" stroke-width="2.5" stroke-dasharray="7 5"/>'+esq(L,17)+esq(R,17)+'<circle cx="'+T[0]+'" cy="'+T[1]+'" r="30" fill="'+cb+'" stroke="'+INK+'" stroke-width="3.5"/><circle cx="'+T[0]+'" cy="'+T[1]+'" r="19" fill="#fbf8f1" stroke="'+INK+'" stroke-width="2"/><text x="'+T[0]+'" y="'+(T[1]+10)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="27" fill="'+INK+'">$</text>';
    [[L,'1',-1],[T,'2',0],[R,'3',1]].forEach(function(z){var x=z[0][0]+(z[2]?z[2]*24:30),y=z[0][1]+(z[2]?-20:-16);s+='<circle cx="'+x+'" cy="'+y+'" r="10" fill="#ffd83a" stroke="'+INK+'" stroke-width="2"/><text x="'+x+'" y="'+(y+4.5)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="13" fill="'+INK+'">'+z[1]+'</text>';});
    s+='<rect x="'+(cx-72)+'" y="118" width="144" height="26" rx="13" fill="#fbf8f1" stroke="'+INK+'" stroke-width="2"/><text x="'+cx+'" y="136" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="14" fill="'+INK+'">Las 3 esquinas</text>'+cartel('Boletería de '+P.NOMBRE_REC[b]);}
  return s+'</svg>';
}
function modalPieza(g,pz){
  var f=fichaPieza(g,pz),me=ui.yo!=null?g.jug[ui.yo]:null,vis=pz.t==='mercado'&&me?me.conoce[pz.i]:null;
  var vh=vis?'<div class="ficha-vistos"><b>'+icoBinoculares(26)+'Lo que viste en el turno '+vis.t+'</b>'+(vis.c.length?'<div class="pz-eq">'+vis.c.map(function(x){return '<button class="cartita" data-vercarta="'+x.club+'-'+x.pos+'" aria-label="Ver a '+esc(P.nombreCarta(x))+'">'+K.jugador(x.club,x.pos)+'</button>';}).join('')+'</div>':'<span>Estaba vacío.</span>')+'</div>':'';
  return '<div class="ficha" style="--fc:'+f.color+'"><div class="ficha-img">'+piezaSimple(g,pz,f)+'</div><div class="ficha-cab"><small>'+esc(f.sup)+'</small><h2>'+esc(f.tit)+'</h2></div>'+(f.lore?'<p class="ficha-lore">'+esc(f.lore)+'</p>':'')+vh+'<div class="ficha-filas">'+f.filas.join('')+'</div>'+(f.quien.length?'<div class="ficha-quien"><b>Acá están:</b>'+f.quien.map(function(q){return '<span>'+cono(q,16)+' '+esc(q.nombre)+'</span>';}).join('')+'</div>':'')+'</div>';
}
// Una Multa que representa a todas: el cartel de advertencia y abajo los cinco colores de los Recursos
function multaGenInner(){return '<rect x="2" y="2" width="96" height="96" rx="10" fill="'+INK+'"/><rect x="6" y="6" width="88" height="88" rx="7" fill="none" stroke="#f6efe0" stroke-width="2.6" stroke-dasharray="5 3"/><text x="50" y="25" text-anchor="middle" font-family="Bowlby One SC,Arial Black,sans-serif" font-size="15" fill="#f6efe0" letter-spacing="1">MULTA</text><path d="M50 31L72 69H28Z" fill="#ffd83a" stroke="#f6efe0" stroke-width="3" stroke-linejoin="round"/><path d="M50 43v13" stroke="'+INK+'" stroke-width="5.5" stroke-linecap="round"/><circle cx="50" cy="63" r="3.2" fill="'+INK+'"/>'+P.REC.map(function(r,i){return '<circle cx="'+(26+i*12)+'" cy="83" r="4.6" fill="'+COL[r]+'" stroke="#f6efe0" stroke-width="1.4"/>';}).join('');}
// El Mercado de Pases en chiquito: su pentágono con el número y la casilla roja del Mercado
function icoMercado(g,m,s){var n=g.num[11+m],p=[];for(var i=0;i<5;i++){var a=(-90+i*72)*Math.PI/180;p.push((24+21*Math.cos(a)).toFixed(1)+','+(26+21*Math.sin(a)).toFixed(1));}
  return '<svg class="ico-merc" viewBox="0 0 48 48" width="'+s+'" height="'+s+'" aria-hidden="true"><polygon points="'+p.join(' ')+'" fill="#3d3731" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><rect x="16" y="2" width="16" height="11" rx="2.5" fill="#b8323a" stroke="'+INK+'" stroke-width="1.8"/><rect x="19" y="5" width="10" height="5" rx="1" fill="#fdf3d2"/><circle cx="24" cy="30" r="10" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.8"/><text x="24" y="35.5" text-anchor="middle" font-family="Bowlby One SC,Arial Black,sans-serif" font-size="15" fill="'+INK+'">'+n+'</text></svg>';}
function multaGenerica(s){return '<svg class="multa-gen" viewBox="0 0 100 100" width="'+s+'" height="'+s+'" aria-hidden="true">'+multaGenInner()+'</svg>';}
// Más de 9 Recursos: qué pasa si sale un 1, con dibujos
function modalMas9(g,M){var q=g.jug[M.q],mia=M.q===ui.yo,n=P.suma(q.mano),d=Math.floor(n/2),cs='';
  for(var i=0;i<Math.min(n,12);i++)cs+='<span class="m9-c'+(i<d?' sale':'')+'">'+K.dorso('Recurso')+'</span>';
  return '<div class="m9-alarma">+9</div><h2 style="margin:0;text-align:center">'+(mia?'Tenés':esc(q.nombre)+' tiene')+' más de 9 Recursos</h2><div class="m9-ej"><div class="m9-mano">'+cs+'</div><div class="m9-paso">'+dado(1,'a',40)+'<span>Si en la próxima tirada sale un <b>1</b> en cualquiera de los dos dados…</span></div><div class="m9-paso m9-dev"><span class="m9-n">−'+d+'</span><span>…'+(mia?'devolvés':'devuelve')+' al Banco la mitad, redondeando para abajo: '+(mia?'tenés':'tiene')+' '+n+', '+(mia?'devolvés':'devuelve')+' <b>'+d+'</b>. Las elige quien las devuelve.</span></div></div>'+(mia?'<p class="nota" style="margin:0"><b>Para evitarlo, gastá antes:</b> canjeá Tokens, comprá Beneficios, pagá Multas o negociá, en Negocios.</p>':'');}
// Un lugar vacío para Multas: qué va ahí
function modalMultaVacia(){return '<div class="multa-g">'+multaGenerica(130)+'</div><h2 style="margin:0">Acá van tus Multas</h2><p style="margin:0">Te cae una cuando tu Cábala toca una <b>Zona de Mala Fama</b> (los pentágonos oscuros) y sale su número. Se saca de la bolsa sin mirar.</p><div class="qt-info">'+filaFicha(iconoMulta('fans',34),'Te traba un Recurso','Mientras no la pagues, no podés usar las cartas de ese Recurso.')+filaFicha(iconoCirc('fans',30),'Se paga con 1 de su Recurso','En tu turno, en Negocios › Pagar Multas.')+filaFicha('<span class="ff-pos">ARQ</span>','Tu Arquero','Con su Recurso pagás cualquier Multa.')+filaFicha('<span class="ff-pos">DEF</span>','Tu Defensor','Al contratarlo devolvés las Multas de su Recurso, y desde ahí te rebotan.')+'</div>';}
function icoBarra(s){return '<svg viewBox="-15 -11 30 22" width="'+s+'" height="'+Math.round(s*22/30)+'" aria-hidden="true"><ellipse rx="11" ry="8" fill="#dcb98a" stroke="'+INK+'" stroke-width="1.2"/><path d="M-6-5q1.6 5 0 10M-2-6.6q1.6 6.6 0 13.2M2-6.6q1.6 6.6 0 13.2M6-5q1.6 5 0 10" fill="none" stroke="#a9825c" stroke-width="1"/></svg>';}
function icoBinoculares(s){return '<svg class="ic-bino" viewBox="0 0 48 34" width="'+s+'" height="'+Math.round(s*34/48)+'" aria-hidden="true"><g fill="#fbf8f1" stroke="#2b2620" stroke-width="2.4" stroke-linejoin="round"><path d="M9 6c1-3 7-3 8 0l3 8h8l3-8c1-3 7-3 8 0l4 12H5Z" fill="#3a3f4a"/><circle cx="13" cy="22" r="10" fill="#3a3f4a"/><circle cx="35" cy="22" r="10" fill="#3a3f4a"/><circle cx="13" cy="22" r="6.2" fill="#9fd3ea"/><circle cx="35" cy="22" r="6.2" fill="#9fd3ea"/><rect x="20" y="15" width="8" height="9" fill="#3a3f4a"/></g><path d="M10 19.5q2-2 4.5-1.8M32 19.5q2-2 4.5-1.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>';}
function icoAnim(apagada){return '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><rect x="6" y="9" width="36" height="30" rx="4" fill="#fff8d6" stroke="#2b2620" stroke-width="2.6"/><path d="M6 16h36M6 32h36" stroke="#2b2620" stroke-width="2"/><path d="M12 9v7M20 9v7M28 9v7M36 9v7M12 32v7M20 32v7M28 32v7M36 32v7" stroke="#2b2620" stroke-width="2"/><path d="M20 19l10 5-10 5Z" fill="#b8323a" stroke="#2b2620" stroke-width="1.6" stroke-linejoin="round"/>'+(apagada?'<path d="M5 5L43 43M43 5L5 43" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M5 5L43 43M43 5L5 43" stroke="#d8261f" stroke-width="5.5" stroke-linecap="round"/>':'')+'</svg>';}
function icoReglas(){return '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><path d="M7 9q8-4 17 1v31q-9-5-17-1Z" fill="#fff8d6" stroke="#2b2620" stroke-width="2.6" stroke-linejoin="round"/><path d="M41 9q-8-4-17 1v31q9-5 17-1Z" fill="#fff8d6" stroke="#2b2620" stroke-width="2.6" stroke-linejoin="round"/><path d="M11 16q5-2 9 0M11 22q5-2 9 0M11 28q5-2 9 0M28 16q5-2 9 0M28 22q5-2 9 0M28 28q5-2 9 0" fill="none" stroke="#8a7f6e" stroke-width="2" stroke-linecap="round"/><circle cx="35" cy="36" r="8" fill="#ffd83a" stroke="#2b2620" stroke-width="2.4"/><text x="35" y="40.5" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="12" fill="#2b2620">?</text></svg>';}
function icoSalir(){return '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><path d="M8 5h22v38H8Z" fill="#fff8d6" stroke="#2b2620" stroke-width="2.6" stroke-linejoin="round"/><path d="M8 5l13 6v38L8 43Z" fill="#c9a26a" stroke="#2b2620" stroke-width="2.4" stroke-linejoin="round"/><circle cx="17" cy="27" r="1.8" fill="#2b2620"/><path d="M27 24h15M36 17l7 7-7 7" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 24h15M36 17l7 7-7 7" fill="none" stroke="#2b2620" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';}
// ---------- Animaciones que explican qué pasó ----------
function nombreRec(r,n){return (n>1?n+' de ':'1 de ')+P.NOMBRE_REC[r];}
function caraDT(g,j){var p=g.jug[j];return '<div class="ef-dt"><span class="ef-cara">'+retratoJ(p)+'</span><b>'+esc(p.nombre)+'</b></div>';}
// El penal: no se ve el dado. Hay suspenso (el arquero se mueve, el pateador toma carrera) y lo que dice si cobra es la pelota.
function mostrarPenal(g,e){
  var p=g.jug[e.j],mark=e.b==='penal',gol=e.ok,lado=e.lado||(e.dado%2?-1:1),ld=lado<0?'izq':'der',cj=colJ(p),tk=e.tk==='V'?'Victoria':'Efectivo';
  var red='<g class="pn-red'+(gol?' sacude':'')+'" stroke="#fff" stroke-width="1" opacity=".5"><path d="M80 36V130M100 36V130M120 36V130M140 36V130M160 36V130M180 36V130M200 36V130M220 36V130M60 56H240M60 76H240M60 96H240M60 116H240"/></g>';
  var arq='<g class="pn-arq '+(gol?'vuela-'+(lado<0?'der':'izq'):'vuela-'+ld)+'"><g class="pn-arq-bal"><circle cx="150" cy="84" r="10" fill="#e8b68f" stroke="#111" stroke-width="2"/><rect x="138" y="94" width="24" height="26" rx="5" fill="#d9a61c" stroke="#111" stroke-width="2"/><path d="M138 100L120 88M162 100L180 88" stroke="#d9a61c" stroke-width="7" stroke-linecap="round"/><path d="M143 120v10M157 120v10" stroke="#111" stroke-width="5" stroke-linecap="round"/></g></g>';
  var pat='<g class="pn-pat"><circle cx="0" cy="-30" r="8" fill="#e8b68f" stroke="#111" stroke-width="2"/><rect x="-9" y="-22" width="18" height="20" rx="4" fill="'+cj.color+'" stroke="#111" stroke-width="2"/><path d="M-4-2l-5 12M4-2l7 10" stroke="#111" stroke-width="4" stroke-linecap="round"/></g>';
  var svg='<svg class="pn-cancha" viewBox="0 0 300 170" aria-hidden="true"><rect width="300" height="170" fill="#4d8a3f"/><path d="M0 130H300" stroke="#fff" stroke-width="3"/>'+red+'<path d="M60 130V36H240V130" fill="none" stroke="#fff" stroke-width="7"/>'+arq+pat+'<g class="pn-pelota '+(gol?'gol-':'ataja-')+ld+'"><circle r="11" fill="#fff" stroke="#111" stroke-width="2"/><path d="M0-5l4.7 3.4-1.8 5.6h-5.8l-1.8-5.6z" fill="#111"/></g></svg>';
  var fest=gol&&mark?'<span class="pn-fest">'+K.escuelita('mark')+'</span>':'';
  var premio='<span class="pn-tk">'+token(e.tk,56)+'</span>';
  return capa('<div class="fichaje penal" aria-hidden="true"><div class="fj-tit"><b>'+esc(p.nombre)+' patea un '+esc(P.BENEF[e.b].n)+'</b><span>Si entra, se lleva un Token de '+tk+'.</span></div><div class="pn-marco">'+svg+fest+'</div><div class="pn-pie"><div class="pn-sus">¿Entra o no entra?</div><div class="pn-res '+(gol?'si':'no')+'">'+(gol?'¡GOOOL!'+premio+'<small>Se lleva un Token de '+tk+'</small>':'¡LO ATAJÓ!<small>No se lleva nada</small>')+'</div></div></div>',5000);
}
function mostrarEfecto(g,e){
  if(e.b==='penal'||e.b==='dudoso')return mostrarPenal(g,e);
  var p=g.jug[e.j],q=e.q!=null?g.jug[e.q]:null,tit='',sub='',cuerpo='',ms=2300;
  var mir=ui.yo===e.j||ui.yo===e.q;
  function flecha(izq,mid,der){return '<div class="ef-fila">'+izq+'<div class="ef-mid">'+mid+'<i>➜</i></div>'+der+'</div>';}
  function cartas(r,n){var s='';for(var i=0;i<Math.min(n,5);i++)s+='<span class="ef-c" style="animation-delay:'+(i*.12).toFixed(2)+'s">'+K.recurso(r)+'</span>';return s;}
  switch(e.b){
    case 'barrida':tit='¡'+p.nombre+' le barre '+nombreRec(e.r,e.cant)+' a '+q.nombre+'!';sub=e.cant?'Se lleva todos los de ese tipo.':'No tenía ninguno: la Barrida se perdió.';cuerpo=flecha(caraDT(g,e.q),cartas(e.r,e.cant),caraDT(g,e.j));ms=2800;break;
    case 'asistencia':tit=p.nombre+' le saca 1 Recurso a cada DT';cuerpo='<div class="ef-lista">'+e.rob.map(function(x){return flecha(caraDT(g,x.q),cartas(x.r,1),caraDT(g,e.j));}).join('')+'</div>';ms=2800;break;
    case 'adentro':tit=p.nombre+' le pasa sus Multas a '+q.nombre;sub=e.mul.length?e.mul.length+' Multa'+(e.mul.length>1?'s':'')+' cambian de dueño.':'';cuerpo=flecha(caraDT(g,e.j),e.mul.slice(0,5).map(function(r){return '<span class="ef-c">'+iconoMulta(r,46)+'</span>';}).join(''),caraDT(g,e.q));ms=2800;break;
    case 'dame':tit=p.nombre+' le roba un Beneficio a '+q.nombre;sub=mir?P.BENEF[e.rb].n:'Cuál fue, queda en secreto.';cuerpo=flecha(caraDT(g,e.q),'<span class="ef-c ef-ben">'+(mir?K.beneficio(P.BENEF[e.rb].n):K.dorso('Beneficio'))+'</span>',caraDT(g,e.j));ms=2800;break;
    case 'roja':tit='¡Tarjeta Roja para '+q.nombre+'!';sub='En su próximo turno no mueve su Cábala.';cuerpo='<div class="ef-fila">'+caraDT(g,e.q)+'<span class="ef-roja"></span></div>';ms=2600;break;
    case 'figuritas':tit=p.nombre+' y '+q.nombre+' se cambian las figuritas';sub=P.nombreCarta(e.c1)+' por '+P.nombreCarta(e.c2)+'.';cuerpo='<div class="ef-fila"><span class="ef-c ef-ben">'+K.jugador(e.c1.club,e.c1.pos)+'</span><i class="ef-cruz">⇄</i><span class="ef-c ef-ben">'+K.jugador(e.c2.club,e.c2.pos)+'</span></div>';ms=2800;break;
    case 'intervalores':tit=p.nombre+' le cambia un Token a '+q.nombre;cuerpo='<div class="ef-fila">'+caraDT(g,e.j)+token(e.da,52)+'<i class="ef-cruz">⇄</i>'+token(e.tk,52)+caraDT(g,e.q)+'</div>';break;
    case 'descuento':{tit=p.nombre+' juega el Alargue';var gn=e.gan||{},lc='';P.REC.forEach(function(r){for(var i=0;i<Math.min(gn[r]||0,6);i++)lc+='<span class="ef-c" style="animation-delay:'+(1.1+lc.length%9*.04+i*.12).toFixed(2)+'s">'+K.recurso(r)+'</span>';});
      sub=e.cob?'Toca un hexágono con el '+e.dado+': cobra el doble, '+P.textoOferta(gn)+'.':'Ningún hexágono con el '+e.dado+' toca su Cábala: no cobra nada.';
      cuerpo='<div class="al-dado">'+dado(e.dado,'a',76,'rueda')+'</div><div class="al-res">'+(e.cob?lc:'<div class="al-nada">Su mano queda igual<i class="sello">¡Nada!</i></div>')+'</div>';ms=3200;break;}
    case 'extra':tit=p.nombre+' se lleva un Recurso del Banco';cuerpo='<div class="ef-fila">'+cartas(e.gana[0],1)+'</div>';break;
    case 'uno':tit=p.nombre+' cambia 1 Recurso por 2';cuerpo='<div class="ef-fila">'+cartas(e.da,1)+'<i class="ef-cruz">➜</i>'+cartas(e.gana[0],1)+cartas(e.gana[1],1)+'</div>';break;
    case 'mano':case 'petro':tit=p.nombre+' se lleva un Token de '+(e.tk==='V'?'Victoria':'Efectivo');cuerpo='<div class="ef-fila">'+token(e.tk,84)+'</div>';break;
    case 'valor':tit=p.nombre+' cambia un Token con el Banco';cuerpo='<div class="ef-fila">'+token(e.da,64)+'<i class="ef-cruz">➜</i>'+token(e.tk,64)+'</div>';break;
    case 'exento':tit=p.nombre+' se saca de encima '+e.cant+' Multa'+(e.cant===1?'':'s');sub='Vuelven a la bolsa.';break;
    default:return 0;
  }
  return capa('<div class="fichaje corto efecto" aria-hidden="true"><div class="fj-tit"><b>'+esc(tit)+'</b>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</div>'+cuerpo+'</div>',ms);
}
// ---------- El final: compartir y el Certificado de Campeón ----------
// El mensaje para compartir: corto, con la figura y el desafío
function textoResumen(g){
  var p=g.jug[g.ganador],fig=null,fv=-1,rivales=g.jug.filter(function(q){return q.id!==g.ganador;}).map(function(q){return q.nombre;});
  p.eq.filter(Boolean).forEach(function(c){var f=influencia(p,c);if(f.n>fv){fv=f.n;fig=c;}});
  var lista=rivales.length>1?rivales.slice(0,-1).join(', ')+' y '+rivales[rivales.length-1]:rivales[0];
  var t='🏆 ¡'+p.nombre+' levantó la Copa en PEXA Dream Team!\n';
  t+=(rivales.length>1?'Les ganó a ':'Le ganó a ')+lista+'.\n';
  if(fig&&fv>0)t+='⭐ Figura del partido: '+P.nombreCarta(fig)+'.\n';
  return t+'\n¿Quién le saca la Copa? Armá tu Dream Team acá:\nhttps://pexa-dreamteam.github.io/';
}
function escXml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function ubicarSvg(svg,x,y,w,h){return svg.replace('<svg ','<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" ');}
// El Certificado: cuadrado, sobre fondo dorado, con el DT levantando la Copa y sus cuatro Jugadores festejando alrededor
function svgCertificado(g){
  var p=g.jug[g.ganador],W=1080,H=1080,D='font-family="Bowlby One SC, sans-serif"',cs=p.eq.filter(Boolean),hoy=new Date(g.t1||Date.now());
  var fecha=hoy.getDate()+' de '+['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][hoy.getMonth()]+' de '+hoy.getFullYear();
  var nom='¡'+p.nombre+' CAMPEÓN!',fs=Math.min(92,Math.floor(1000/(nom.length*.68)));
  var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'"><defs><radialGradient id="certOro" cx=".5" cy=".45" r=".78"><stop offset="0" stop-color="#ffeb9c"/><stop offset=".55" stop-color="#ecc452"/><stop offset="1" stop-color="#b8862b"/></radialGradient></defs><rect width="'+W+'" height="'+H+'" fill="url(#certOro)"/>';
  // Papelitos: siempre los mismos para el mismo partido
  var sem=(g.t1||1)%9973,cols=['#3f6aa6','#4d7a3a','#fbf8f1','#d4692a','#b23f3c','#22305a'];
  function az(){sem=(sem*16807+11)%2147483647;return (sem%1000)/1000;}
  for(var i=0;i<70;i++){var px=Math.round(40+az()*1000),py=Math.round(130+az()*840);s+='<rect x="'+px+'" y="'+py+'" width="'+Math.round(9+az()*8)+'" height="'+Math.round(14+az()*10)+'" rx="2" fill="'+cols[i%cols.length]+'" transform="rotate('+Math.round(az()*180)+' '+px+' '+py+')" opacity=".85"/>';}
  s+='<rect x="20" y="20" width="'+(W-40)+'" height="'+(H-40)+'" rx="18" fill="none" stroke="#22305a" stroke-width="9"/>';
  s+='<text x="540" y="122" text-anchor="middle" '+D+' font-size="'+fs+'" fill="#22305a" stroke="#fff8d6" stroke-width="10" paint-order="stroke" stroke-linejoin="round">'+escXml(nom)+'</text>';
  // Dos Jugadores de cada lado del DT: los de atrás primero, para que los de adelante queden encima
  var lugar=[[-4,566,300,330],[112,590,350,385],[618,590,350,385],[784,566,300,330]];
  function jugadorEn(i){if(cs[i]){var l=lugar[i];s+=ubicarSvg(K.festejo(cs[i].club,cs[i].pos),l[0],l[1],l[2],l[3]);}}
  jugadorEn(0);jugadorEn(3);
  s+=ubicarSvg(p.cus?K.dtCopaCus(p.cus):K.dtCopa(p.dt),312,140,456,820);
  jugadorEn(1);jugadorEn(2);
  s+=ubicarSvg(K.logo('copa'),44,950,86,86);
  s+='<text x="540" y="1032" text-anchor="middle" '+D+' font-size="38" fill="#22305a" stroke="#fff8d6" stroke-width="6" paint-order="stroke" stroke-linejoin="round">'+fecha+'</text>';
  return s+'</svg>';
}
function certificadoCanvas(g,cb){svgAImagen(svgCertificado(g),function(im,u){if(!im){cb(null);return;}var cv=document.createElement('canvas');cv.width=1080;cv.height=1080;cv.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(u);cb(cv);});}
function bajar(blob,nombre){var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=nombre;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},4000);}
function conCertificado(g,fn){if(ui.cert&&ui.cert.g===g.t1){fn(ui.cert.cv);return;}certificadoCanvas(g,function(cv){if(!cv){mostrarError('No se pudo armar el certificado.');return;}ui.cert={g:g.t1,cv:cv};fn(cv);});}
function nombreCert(g){return 'Campeon-PEXA-'+g.jug[g.ganador].nombre.normalize('NFD').replace(/[^\w]+/g,'-');}
function conectarCert(c,g){
  var png=c.querySelector('#certPng'),wa=c.querySelector('#certWa'),tc=c.querySelector('#certToca');
  // Tocando el Certificado aparecen las opciones
  if(tc)tc.onclick=function(){ui.certAb=!ui.certAb;tc.setAttribute('aria-expanded',ui.certAb);c.querySelector('#certBts').hidden=!ui.certAb;c.querySelector('#certPista').hidden=!!ui.certAb;};
  if(png)png.onclick=function(){conCertificado(g,function(cv){cv.toBlob(function(b){bajar(b,nombreCert(g)+'.png');},'image/png');});};
  // En el celu se comparte con el Certificado adjunto. Donde no se puede, se baja la imagen y se abre WhatsApp con el mensaje.
  if(wa)wa.onclick=function(){var t=textoResumen(g);conCertificado(g,function(cv){cv.toBlob(function(b){var f=new File([b],nombreCert(g)+'.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:t}).catch(function(){});}
    else{bajar(b,f.name);window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank','noopener');mostrarAviso('Bajamos el Certificado: adjuntalo en el chat de WhatsApp.');}},'image/png');});};
}
// Íconos del inicio y de la sala: uno por cada texto, para que se entienda de un vistazo
function icI(d,w){return '<svg class="ic-i" viewBox="0 0 24 24" width="'+(w||20)+'" height="'+(w||20)+'" aria-hidden="true">'+d+'</svg>';}
var TI='#2b2620';
var IC={
  tuto:icI('<rect x="2.5" y="4" width="19" height="12.5" rx="1.8" fill="#2f5a3a" stroke="'+TI+'" stroke-width="1.8"/><path d="M6 13l3.5-3.5 2.5 2.5L17 7" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6 7H17v2.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 16.5L6.5 21M16 16.5l1.5 4.5" stroke="'+TI+'" stroke-width="1.8" stroke-linecap="round"/>'),
  reglas:icI('<path d="M12 6.5C9.5 4.6 6 4.4 3 5v13.5c3-.6 6.5-.4 9 1.5 2.5-1.9 6-2.1 9-1.5V5c-3-.6-6.5-.4-9 1.5Z" fill="#fff8d6" stroke="'+TI+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6.5V20" stroke="'+TI+'" stroke-width="1.6"/><path d="M5.6 9.4a1.9 1.9 0 1 1 2.6 1.8c-.6.3-.8.6-.8 1.3" fill="none" stroke="#3f6aa6" stroke-width="1.6" stroke-linecap="round"/><circle cx="7.4" cy="14.6" r=".95" fill="#3f6aa6"/><path d="M14.5 9.5h4M14.5 12.5h4M14.5 15.5h3" stroke="#8a7f6e" stroke-width="1.5" stroke-linecap="round"/>'),
  online:icI('<rect x="2.5" y="7" width="7.5" height="13" rx="1.6" fill="#fff" stroke="'+TI+'" stroke-width="1.7"/><rect x="14" y="7" width="7.5" height="13" rx="1.6" fill="#fff" stroke="'+TI+'" stroke-width="1.7"/><path d="M8.5 5.2a5 5 0 0 1 7 0M10.3 7.2a2.3 2.3 0 0 1 3.4 0" fill="none" stroke="#3f6aa6" stroke-width="1.7" stroke-linecap="round"/><circle cx="6.25" cy="17.6" r=".9" fill="'+TI+'"/><circle cx="17.75" cy="17.6" r=".9" fill="'+TI+'"/>'),
  local:icI('<rect x="8" y="3.5" width="8" height="13.5" rx="1.6" fill="#fff" stroke="'+TI+'" stroke-width="1.7"/><circle cx="12" cy="14.6" r=".9" fill="'+TI+'"/><circle cx="4.2" cy="12.5" r="2.2" fill="#e8b68f" stroke="'+TI+'" stroke-width="1.4"/><path d="M1 21c.4-3 1.6-4.6 3.2-4.6S7 18 7.4 21" fill="#d4692a" stroke="'+TI+'" stroke-width="1.4"/><circle cx="19.8" cy="12.5" r="2.2" fill="#e8b68f" stroke="'+TI+'" stroke-width="1.4"/><path d="M16.6 21c.4-3 1.6-4.6 3.2-4.6S22.6 18 23 21" fill="#3f6aa6" stroke="'+TI+'" stroke-width="1.4"/>'),
  nombre:icI('<path d="M8 3l4 2.2L16 3l5 3-2 4.2-2-.8V21H7V9.4l-2 .8L3 6Z" fill="#22305a" stroke="'+TI+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.8 3.9a2.3 2.3 0 0 0 4.4 0" fill="none" stroke="#fff" stroke-width="1.3"/><text x="12" y="17" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="7.5" fill="#ffe27a">10</text>'),
  sala:icI('<path d="M2.5 19.5V9.5C6 6 18 6 21.5 9.5v10Z" fill="#8fc3df" stroke="'+TI+'" stroke-width="1.7" stroke-linejoin="round"/><path d="M5 19.5v-6.5c3.5-2 10.5-2 14 0v6.5" fill="#4d8a3f" stroke="'+TI+'" stroke-width="1.5"/><path d="M12 13v6.5M9.6 16.3a2.4 2.4 0 1 0 4.8 0" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M6 6.5V3.5l3 1.2-3 1.2" fill="#e8262a" stroke="'+TI+'" stroke-width="1.2" stroke-linejoin="round"/><path d="M18 6.5V3.5l3 1.2-3 1.2" fill="#ffd83a" stroke="'+TI+'" stroke-width="1.2" stroke-linejoin="round"/>'),
  copiar:icI('<rect x="8" y="2.8" width="12.5" height="14" rx="2" fill="#fff8d6" stroke="'+TI+'" stroke-width="1.7"/><rect x="3.5" y="7.2" width="12.5" height="14" rx="2" fill="#fff" stroke="'+TI+'" stroke-width="1.7"/><path d="M8.2 15.4l3.2-3.2M7.4 13.1l-1 1a1.9 1.9 0 0 0 2.7 2.7l1-1M12.2 14.5l1-1a1.9 1.9 0 0 0-2.7-2.7l-1 1" fill="none" stroke="#3f6aa6" stroke-width="1.5" stroke-linecap="round"/>'),
  modo:icI('<rect x="2.5" y="5" width="19" height="14" rx="1.5" fill="#4d8a3f" stroke="'+TI+'" stroke-width="1.7"/><path d="M12 5v14M2.5 9.5h3v5h-3M21.5 9.5h-3v5h3" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" stroke-width="1.3"/>'),
  tiempo:icI('<circle cx="12" cy="13.5" r="8" fill="#fff8d6" stroke="'+TI+'" stroke-width="1.8"/><path d="M12 13.5V9M12 13.5l3 2" stroke="#e8262a" stroke-width="1.8" stroke-linecap="round"/><path d="M9.5 3h5M12 3v2.5M18.6 6.4l1.6-1.6" stroke="'+TI+'" stroke-width="1.8" stroke-linecap="round"/>'),
  salir:icI('<path d="M13 3.5H5.5v17H13" fill="none" stroke="'+TI+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M5.5 3.5l6 2v15l-6 1z" fill="#c9a26b" stroke="'+TI+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M14.5 12H21M18 9l3 3-3 3" fill="none" stroke="#b23f3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  maquina:icI('<path d="M12 2.5v2.5" stroke="'+TI+'" stroke-width="1.6"/><circle cx="12" cy="2.6" r="1.3" fill="#e8262a"/><rect x="4.5" y="5.5" width="15" height="11.5" rx="3" fill="#cfd6de" stroke="'+TI+'" stroke-width="1.7"/><circle cx="9" cy="10.6" r="1.8" fill="#4fb8d8" stroke="'+TI+'" stroke-width="1"/><circle cx="15" cy="10.6" r="1.8" fill="#4fb8d8" stroke="'+TI+'" stroke-width="1"/><path d="M9 14.2h6" stroke="'+TI+'" stroke-width="1.4" stroke-linecap="round"/><path d="M2.5 10v3M21.5 10v3M8 17v3.5h8V17" fill="none" stroke="'+TI+'" stroke-width="1.6" stroke-linecap="round"/>'),
  persona:icI('<circle cx="12" cy="8" r="4" fill="#e8b68f" stroke="'+TI+'" stroke-width="1.7"/><path d="M4 21c.6-4.6 3.8-7 8-7s7.4 2.4 8 7Z" fill="#3f6aa6" stroke="'+TI+'" stroke-width="1.7" stroke-linejoin="round"/>'),
  entrar:icI('<path d="M11 3.5h7.5v17H11" fill="none" stroke="'+TI+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M2.5 12H13M10 9l3 3-3 3" fill="none" stroke="#2f7a3a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>')
};
// ---------- Inicio ----------
// Jugadores escondidos en el inicio, en lugares raros: uno se asoma al lado del logo, otro cuelga de las pestañas,
// otro hace jueguito arriba de todo y otro duerme la siesta sobre el botón de empezar. Cambian cada vez que se abre el juego.
var LJ_SEL=(function(){var l=[];P.REC.forEach(function(r){for(var p=0;p<4;p++)l.push([r,p]);});for(var i=l.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=l[i];l[i]=l[j];l[j]=x;}return l.slice(0,4);})();
function ljFig(i){var x=LJ_SEL[i];return K.festejo(x[0],x[1]);}
function ljNom(i){var x=LJ_SEL[i];return P.nombreCarta({club:x[0],pos:x[1]});}
function ljAsoma(){return '<span class="lj lj-asoma" aria-hidden="true" title="'+esc(ljNom(0))+'">'+ljFig(0)+'</span>';}
function ljColgado(){return '<span class="lj lj-colgado" aria-hidden="true"><i class="lj-soga"></i><span class="lj-fig">'+ljFig(1)+'</span></span>';}
function ljJueguito(){return '<span class="lj lj-jueguito" aria-hidden="true"><span class="lj-fig">'+ljFig(2)+'</span><span class="lj-pelota">'+PELOTA+'</span></span>';}
function ljEspia(){return '<span class="lj lj-espia" aria-hidden="true"><span class="lj-fig">'+ljFig(1)+'</span></span>';}
function ljSiesta(){return '<span class="lj lj-siesta" aria-hidden="true"><span class="lj-fig">'+ljFig(3)+'</span><b class="lj-z">Z<i>z</i><i>z</i></b></span>';}
// Los DTs aparecen en un orden al azar cada vez que se abre el juego (y de entrada juegan los primeros 4 de ese orden)
var ORDEN_DT=(function(){var a=[0,1,2,3,4];for(var i=4;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;})();
function ordenarSel(){conf.sel.sort(function(a,b){return ORDEN_DT.indexOf(a)-ORDEN_DT.indexOf(b);});}
var conf={limite:0,sel:ORDEN_DT.slice(0,4),modo:'completo',filas:[{h:true},{h:false},{h:false},{h:false},{h:false}],nombres:['','','','','']};
// Con clave, la caja es desplegable y en el título se ve lo elegido
function caja(tit,html,clave,valor){if(!clave)return '<section class="caja"><h3>'+tit+'</h3>'+html+'</section>';ui.cajas=ui.cajas||{};return '<details class="caja plega" data-caja="'+clave+'"'+(ui.cajas[clave]?' open':'')+'><summary><h3>'+tit+'</h3><span class="caja-val">'+esc(valor)+'</span></summary><div class="caja-in">'+html+'</div></details>';}
function cajaCuantos(n,attr,plega){return caja('¿Cuántos van a jugar?','<div class="sel" role="group" aria-label="Cuántos van a jugar">'+[2,3,4,5].map(function(x){return '<button class="chip" '+attr+'="'+x+'" aria-pressed="'+(n===x)+'">'+x+' DTs</button>';}).join('')+'</div><p class="nota" style="margin:0">Cada persona dirige a un DT. Los lugares libres los puede jugar la Máquina.</p>',plega?'cuantos':null,n+' DTs');}
var MODOS=[['completo','Partido completo','Cada DT arma un equipo de 4 Jugadores: Arquero, Defensor, Volante y Delantero. Cada uno cuesta 2 Tokens. Es el juego entero, de unos 30 a 45 minutos.'],['rapido','Partido rápido','También con 4 Jugadores, pero cuestan 1 Token: Arquero y Defensor, 1 de Victoria; Volante y Delantero, 1 de Efectivo. Termina antes: cerca de un cuarto menos de turnos.']];
// Modo de juego y tiempo por turno: dos botones de color, uno al lado del otro; cada toque pasa a la opción siguiente
var PELOTA='<svg class="ic-pelota" viewBox="-12 -12 24 24" aria-hidden="true"><circle r="10.5" fill="#fff" stroke="#2b2620" stroke-width="1.8"/><path d="M0-4.6l4.4 3.2-1.7 5.2h-5.4l-1.7-5.2z" fill="#2b2620"/><path d="M0-4.6V-10.3M4.4-1.4l5.6-1.8M2.7 3.8l3.4 4.7M-2.7 3.8l-3.4 4.7M-4.4-1.4l-5.6-1.8" stroke="#2b2620" stroke-width="1.4"/></svg>';
var ICO_PLAY='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff8d6" stroke="#2b2620" stroke-width="2"/><path d="M10 7.5l6 4.5-6 4.5z" fill="#2b2620"/></svg>';
var LAPIZ='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1-5L15.5 4.5a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3L9 19z" fill="#fff8d6" stroke="#2b2620" stroke-width="2" stroke-linejoin="round"/><path d="M13.5 6.5l4 4M4 20l5-1" stroke="#2b2620" stroke-width="2"/></svg>';
function botonesJuego(m,lim,attrM,attrL){var il=0;LIMITES.forEach(function(l,i){if(l[0]===lim)il=i;});
  var exM=m==='rapido'?'Cada Jugador cuesta 1 solo Token: el equipo se arma antes y el partido dura menos.':'El juego entero: cada Jugador cuesta 2 Tokens. Unos 30 a 45 min.';
  var exL=lim?'Cada DT tiene '+LIMITES[il][1]+' para jugar. Si se pasa, el juego sigue solo.':'Cada DT juega a su ritmo, sin reloj.';
  return '<div class="ini-bts"><button class="bt-op modo-'+m+'" '+attrM+'="'+(m==='rapido'?'completo':'rapido')+'" aria-label="Modo de juego: '+(m==='rapido'?'partido rápido':'partido completo')+'. '+exM+' Tocá para cambiarlo"><small>'+IC.modo+'Modo de juego <i aria-hidden="true">⇄</i></small><b>'+(m==='rapido'?'Partido rápido':'Partido completo')+'</b><em>'+exM+'</em></button><button class="bt-op tiempo" '+attrL+'="'+LIMITES[(il+1)%LIMITES.length][0]+'" aria-label="Tiempo por turno: '+LIMITES[il][1]+'. '+exL+' Tocá para cambiarlo"><small>'+IC.tiempo+'Tiempo por turno <i aria-hidden="true">⇄</i></small><b>'+LIMITES[il][1]+'</b><em>'+exL+'</em></button></div>';}
function cajaModo(m,attr,plega){return caja('Modo de juego','<div class="modos" role="group" aria-label="Modo de juego">'+MODOS.map(function(x){var on=m===x[0];return '<button class="modo" '+attr+'="'+x[0]+'" aria-pressed="'+on+'"><b>'+x[1]+'</b>'+(on?'<span>'+x[2]+'</span>':'')+'</button>';}).join('')+'</div>',plega?'modo':null,m==='rapido'?'Partido rápido':'Partido completo');}
function selectorLimite(actual,attr,plega){return caja('Tiempo por turno','<div class="sel" role="group" aria-label="Tiempo por turno">'+LIMITES.map(function(l){return '<button class="chip" '+attr+'="'+l[0]+'" aria-pressed="'+(actual===l[0])+'">'+l[1]+'</button>';}).join('')+'</div><p class="nota" style="margin:0">Si se acaba, el juego sigue por el colgado sin gastarle nada. Se frena mientras hay una oferta.</p>',plega?'tiempo':null,(LIMITES.filter(function(l){return l[0]===actual;})[0]||LIMITES[0])[1]);}
// Papelitos por toda la pantalla en el final del partido: viven fuera de #app para que no se reinicien con cada repintada
function confeti(on){var c=document.getElementById('confeti');
  if(!on){if(c)c.remove();return;}if(c)return;
  var cols=['#3f6aa6','#4d7a3a','#d9a61c','#d4692a','#b23f3c','#ffe27a','#f6efe0','#e0609a','#4fb8d8'],s='';
  for(var i=0;i<70;i++){var w=6+Math.random()*7,h=w*(.4+Math.random()*.9),x=Math.random()*100,dur=4.5+Math.random()*5,del=-Math.random()*dur,sw=(Math.random()*60-30).toFixed(0),r=Math.random()<.25;
    s+='<i style="left:'+x.toFixed(1)+'%;width:'+w.toFixed(1)+'px;height:'+(r?w:h).toFixed(1)+'px;background:'+cols[i%cols.length]+';border-radius:'+(r?'50%':'1px')+';animation-duration:'+dur.toFixed(2)+'s,'+(1+Math.random()*1.5).toFixed(2)+'s;animation-delay:'+del.toFixed(2)+'s,'+del.toFixed(2)+'s;--sw:'+sw+'px"></i>';}
  c=document.createElement('div');c.id='confeti';c.setAttribute('aria-hidden','true');c.innerHTML=s;document.body.appendChild(c);}
function pantallaInicio(){
  confeti(false);var hay=false;try{hay=!!localStorage.getItem(CLAVE);}catch(e){}
  var redOk=window.PEXA_RED&&PEXA_RED.disponible(),salaGuardada=null;try{salaGuardada=localStorage.getItem('pexa-sala');}catch(e){}
  if(!ui.iniTab)ui.iniTab=redOk?'online':'local';
  var s='<div class="ini ini-com'+(hay?' con-guardado':'')+'"><div class="ini-cab"><span class="logo">'+K.logo('copa')+'</span><h1>PEXA<small>DREAM TEAM</small></h1>'+ljAsoma()+ljJueguito()+'</div>';
  s+='<div class="hero"><h2>Armá tu Dream Team y levantá la Copa antes que nadie.</h2><ol class="hero-pasos"><li><div class="hp-vis hp-esc">'+P.REC.map(function(r){return iconoCirc(r,30);}).join('')+'</div><b>Juntá Recursos</b><span>Tirás los dados y cobran todos.</span></li><li><div class="hp-vis hp-car">'+[['fans',0],['gol',1],['picardia',2],['sponsors',3]].map(function(x){return '<span>'+K.jugador(x[0],x[1])+'</span>';}).join('')+'</div><b>Contratá 4 Jugadores</b><span>Uno por posición, a tu gusto.</span></li><li><div class="hp-vis">'+COPA.replace('class="copa"','class="hp-copa"')+'</div><b>Levantá la Copa</b><span>El primero en el Palco gana.</span></li></ol><div class="hero-dato">2 a 5 DTs · 30 a 45 minutos</div><div class="hero-bts"><button class="bt oro bt-ic" id="verTuto">'+IC.tuto+'<span>Tutorial</span></button><button class="bt bt-ic" id="verReglas">'+IC.reglas+'<span>¿Cómo se juega?</span></button></div></div>';
  s+='<div class="ini-tabs" role="tablist">'+(ui.iniTab==='online'?ljColgado():'')+'<button role="tab" data-itab="online" aria-selected="'+(ui.iniTab==='online')+'"><b>Juego online</b><span>'+IC.online+'Cada uno desde su celu</span></button><button role="tab" data-itab="local" aria-selected="'+(ui.iniTab==='local')+'"><b>Juego local</b><span>'+IC.local+'Todos en este aparato</span></button></div><div class="ini-panel">';
  if(ui.iniTab==='online'){
    if(redOk){
      s+='<label class="ent-ic">'+IC.nombre+'<input class="ent" id="miNombre" aria-label="Tu nombre" placeholder="Tu nombre" maxlength="12" value="'+esc(miNombre())+'"></label>';
      if(salaGuardada)s+='<button class="bt oro" id="volverSala">Volver a la sala '+esc(salaGuardada)+'</button>';
      s+=caja('¿Te pasaron un código?','<div class="fila"><input class="ent" id="codSala" aria-label="Código de la sala" placeholder="Código de 4 letras" maxlength="4" autocapitalize="characters"><button class="bt fuerte bt-ic" id="unirme">'+IC.entrar+'<span>Entrar</span></button></div>');
      s+=caja('¿Sos el que arma el partido?','<button class="bt oro bt-ic" id="crearSala">'+IC.sala+'<span>Armar una sala</span></button><p class="nota" style="margin:0">Te damos un link y un código para pasarles a tus amigos.</p>');
    } else s+='<div class="aviso"><b>Para jugar cada uno desde su celu</b>Entrá por el link público: <a href="https://pexa-dreamteam.github.io/">pexa-dreamteam.github.io</a></div>';
  } else {
    s+=botonesJuego(conf.modo,conf.limite,'data-m','data-lim');
    // Los cinco DTs: el botón de la izquierda lo suma o lo saca; el lápiz (o la cara) abre su ficha para editarlo
    var filas='';
    for(var k5=0;k5<5;k5++){var i=ORDEN_DT[k5],d=P.DTS[i],h=conf.filas[i].h,on=conf.sel.indexOf(i)>=0,nom=conf.nombres[i]||d.nombre;
      filas+='<div class="dtelige'+(on?' on':'')+'"><button class="dt-add" data-togdt="'+i+'" aria-pressed="'+on+'" aria-label="'+(on?'Sacar a ':'Sumar a ')+esc(nom)+'">'+(on?'✓':'+')+'</button><div class="dt-cara"><button class="dt-tog" data-edit="'+i+'" aria-label="Ver y editar a '+esc(nom)+'">'+(conf.cus&&conf.cus[i]?K.dtCustom(conf.cus[i],false):K.retrato(i))+'</button><button class="dt-lapiz" data-edit="'+i+'" aria-label="Editar a '+esc(nom)+'">'+LAPIZ+'</button></div>'+
        '<div class="dt-dat dt-lin"><b>'+esc(nom)+'</b>'+(on?'<button class="dt-quien'+(h?' per':'')+'" data-h="'+i+'" data-v="'+(h?0:1)+'" aria-label="Lo juega '+(h?'una persona':'la Máquina')+'. Tocá para cambiar">'+(h?IC.persona+'Persona':IC.maquina+'Máquina')+'</button>':'<span class="nota">No juega</span>')+'</div><button class="dt-cono" data-ccdt="'+i+'" aria-label="Cábala de '+esc(nom)+': '+P.CONOS[ccLocal(i)].n+'. Tocá para cambiarla">'+cono({cc:ccLocal(i)},24)+'</button></div>';}
    s+='<section class="caja lj-caja">'+ljEspia()+'<h3>¿Quiénes juegan? <small class="dt-cuenta">'+conf.sel.length+' DTs</small></h3>'+filas+'</section><div class="lj-cama">'+ljSiesta()+'<button class="bt bt-empezar" id="empezar">'+PELOTA+'<span>Empezar el partido</span>'+PELOTA+'</button></div>';
  }
  s+='</div>'+(hay?'<button class="bt bt-seguir" id="seguir">'+ICO_PLAY+'<span>Seguir el partido guardado</span></button>':'')+'</div>';
  app.innerHTML=s;
  var b=document.getElementById('seguir');if(b)b.onclick=function(){sala.cargar();ui.yo=null;reiniciarVista();ui.festejo=sala.g.fase==='fin';actualizarYo(sala.g);ui.cubierto=false;pintar();avanzarBots();};
  document.getElementById('verReglas').onclick=function(){guardarNombreInput();leerNombres();ui.modal={tipo:'reglas'};pintarModal(null,null,null);};
  document.getElementById('verTuto').onclick=function(){guardarNombreInput();leerNombres();ui.tuto=tutoNuevo();pintarTuto();window.scrollTo(0,0);};
  app.querySelectorAll('[data-caja]').forEach(function(x){x.ontoggle=function(){ui.cajas[x.dataset.caja]=x.open;};});
  app.querySelectorAll('[data-itab]').forEach(function(x){x.onclick=function(){guardarNombreInput();leerNombres();ui.iniTab=x.dataset.itab;pantallaInicio();};});
  if(redOk&&ui.iniTab==='online')conectarAmigos(salaGuardada);
  app.querySelectorAll('[data-edit]').forEach(function(x){x.onclick=function(){var i3=+x.dataset.edit;ui.modal={tipo:'editDT',i:i3,r:conf.cus&&conf.cus[i3]?JSON.parse(JSON.stringify(conf.cus[i3])):null,nombre:conf.nombres[i3]||P.DTS[i3].nombre,cc:ccLocal(i3),tomados:conf.sel.filter(function(q){return q!==i3;}).map(ccLocal)};pintarModal(null,null,null);};});
  // Tocando el cono pasa al color siguiente que no use otro DT
  app.querySelectorAll('[data-ccdt]').forEach(function(x){x.onclick=function(){leerNombres();var i3=+x.dataset.ccdt,v=colorSiguiente(ccLocal(i3),conf.sel.filter(function(q){return q!==i3;}).map(ccLocal));
    conf.cc=conf.cc||{};if(v!==i3)conf.cc[i3]=v;else delete conf.cc[i3];pantallaInicio();var b=app.querySelector('[data-ccdt="'+i3+'"]');if(b){b.classList.add('gira');b.focus();}};});
  app.querySelectorAll('[data-cuantos]').forEach(function(x){x.onclick=function(){leerNombres();var n=+x.dataset.cuantos,i2;
    while(conf.sel.length<n){for(i2=0;i2<5;i2++)if(conf.sel.indexOf(i2)<0){conf.sel.push(i2);break;}}
    while(conf.sel.length>n){var maq=conf.sel.filter(function(q){return !conf.filas[q].h;});conf.sel.splice(conf.sel.indexOf(maq.length?maq[maq.length-1]:conf.sel[conf.sel.length-1]),1);}
    ordenarSel();conf.sel.forEach(liberarCC);if(!conf.sel.some(function(q){return conf.filas[q].h;}))conf.filas[conf.sel[0]].h=true;pantallaInicio();};});
  app.querySelectorAll('[data-lim]').forEach(function(x){x.onclick=function(){leerNombres();conf.limite=+x.dataset.lim;pantallaInicio();};});
  app.querySelectorAll('[data-togdt]').forEach(function(x){x.onclick=function(){leerNombres();var v=+x.dataset.togdt,ix=conf.sel.indexOf(v);if(ix>=0){if(conf.sel.length<=2){mostrarAviso('Tienen que jugar 2 DTs como mínimo.');return;}conf.sel.splice(ix,1);}else{conf.sel.push(v);ordenarSel();liberarCC(v);}if(!conf.sel.some(function(q){return conf.filas[q].h;}))conf.filas[conf.sel[0]].h=true;pantallaInicio();};});
  app.querySelectorAll('[data-m]').forEach(function(x){x.onclick=function(){leerNombres();conf.modo=x.dataset.m;pantallaInicio();};});
  app.querySelectorAll('[data-h]').forEach(function(x){x.onclick=function(){leerNombres();conf.filas[+x.dataset.h].h=x.dataset.v==='1';pantallaInicio();};});
  app.querySelectorAll('[data-nom]').forEach(function(x){x.onfocus=function(){x.select();};});
  var em=document.getElementById('empezar');if(em)em.onclick=function(){leerNombres();
    var d=conf.sel.map(function(i){return {dt:i,nombre:conf.nombres[i].trim()||P.DTS[i].nombre,bot:!conf.filas[i].h,cus:conf.cus&&conf.cus[i]||null,cc:conf.cc&&conf.cc[i]!=null?conf.cc[i]:null};});
    sala.g=P.nuevaPartida({dts:d,modo:conf.modo,limite:conf.limite,semilla:Math.floor(Math.random()*1e9),t0:Date.now()});ui.yo=null;reiniciarVista();ui.verDT=null;sala.guardar();actualizarYo(sala.g);ui.cubierto=false;pintar();avanzarBots();};
}
function ccLocal(i){return conf.cc&&conf.cc[i]!=null?conf.cc[i]:i;}
// Al sumar un DT, si su Cábala ya la tiene otro de los que juegan, se lleva la primera libre (así no hay dos iguales)
function liberarCC(v){var tom=conf.sel.filter(function(q){return q!==v;}).map(ccLocal);if(tom.indexOf(ccLocal(v))<0)return;for(var c=0;c<P.CONOS.length;c++)if(tom.indexOf(c)<0){conf.cc=conf.cc||{};if(c===v)delete conf.cc[v];else conf.cc[v]=c;return;}}
function colorSiguiente(cur,tom){for(var k=1;k<=P.CONOS.length;k++){var c=(cur+k)%P.CONOS.length;if(tom.indexOf(c)<0)return c;}return cur;}
function guardarNombreInput(){var x=document.getElementById('miNombre');if(x){try{localStorage.setItem('pexa-nombre',x.value.trim());}catch(e){}}}
function reiniciarVista(){ui.certAb=false;ui.pausa=false;ui.relPausa=null;ui.negAb=null;ui.mercSel=null;ui.manoI=0;ui.turnoVisto=null;ui.resAb=null;ui.barrasAntes=null;ui.ofertaK=null;ui.tiradaVista=null;ui.eventoVisto=null;ui.cola=[];ui.animando=false;ui.logVisto=null;ui.festejo=false;ui.faseVista=null;}
function leerNombres(){app.querySelectorAll('[data-nom]').forEach(function(x){conf.nombres[+x.dataset.nom]=x.value;});}

// ---------- Lo que tiene que hacer cada uno ----------
function pintar(){
  if(ui.tuto){pintarTuto();return;}
  var g=sala.g;if(!g){if(sala.red&&ui.lobby)pantallaLobby();else pantallaInicio();return;}
  actualizarYo(g);
  if(g.nTirada!==ui.tiradaVista){if(ui.tiradaVista!=null&&g.dados){ui.tiradaT=Date.now();mostrarTiro(g.dados);if(!ui.sinAnim)ui.cola.push({t:'cobro',n:g.nTirada,pre:1250});}ui.tiradaVista=g.nTirada;}
  var nEv=g.nEvento||0;
  if(nEv!==ui.eventoVisto){if(ui.eventoVisto!=null&&!ui.sinAnim)(g.evs||[]).forEach(function(e){if(e.n>ui.eventoVisto)ui.cola.push(e);});ui.eventoVisto=nEv;}
  // Si otro DT te hizo algo con un Beneficio, te enterás en el momento
  var nLog=g.nLog||0;if(ui.logVisto!=null&&nLog>ui.logVisto){var gp=g.log.filter(function(l){return l.golpe&&l.i>ui.logVisto&&l.solo===ui.yo;});if(gp.length)aviso(gp[gp.length-1].t,'golpe',5200);}ui.logVisto=nLog;
  var yo=ui.yo,me=yo!=null?g.jug[yo]:null,marcados=[],tap=null,deben=P.quienDebe(g),miTurno=yo!=null&&deben.indexOf(yo)>=0;
  // Las ventanas que abre el propio juego: el Mercado de Pases y la devolución. Y si te hacen una oferta, se te muestra.
  if(ui.modal&&ui.modal.tipo==='mercado'&&(g.fase!=='mercado'||g.oferta||yo!==g.turno)){ui.modal=null;ui.mercSel=null;}
  // El arranque del partido y el comienzo de cada turno se anuncian siempre, aunque las animaciones estén apagadas
  if(g.fase==='ubicar'&&g.faltaUbicar.length===g.n&&ui.arranqueVisto!==g.t0){ui.arranqueVisto=g.t0;ui.cola.push({t:'arranque'});}
  if(g.fase==='tirar'&&ui.turnoVisto!==g.nTurnos){var mioT=me&&yo===g.turno;if(!(mioT&&ui.cubierto))ui.cola.push({t:'turno',j:g.turno});ui.turnoVisto=g.nTurnos;if(mioT)ui.manoI=0;}
  if(ui.modal&&ui.modal.tipo==='descarte'&&(g.fase!=='descarte'||g.descartes[yo]==null))ui.modal=null;

  if(g.oferta&&yo!=null&&P.esperan(g.oferta).indexOf(yo)>=0&&ui.modal&&!(ui.modal.tipo==='nego'&&ui.modal.contra)){ui.modal=null;}
  if(!ui.modal&&g.fase==='mercado'&&yo===g.turno&&!g.oferta)ui.modal={tipo:'mercado'};
  if(!ui.modal&&g.fase==='descarte'&&yo!=null&&g.descartes[yo]!=null)ui.modal={tipo:'descarte'};
  var h='',turno=g.fase==='ubicar'?g.jug[g.faltaUbicar[0]]:g.fase==='barraIni'?g.jug[deben[0]]:g.jug[g.turno];
  var esFin=g.fase==='fin';confeti(esFin);var tabVista='',cT=colJ(turno);
  h+=esFin?'<div class="juego es-fin"><span id="reloj" hidden></span>':'<div class="juego"><div class="barra barra-dt" style="--dtc:'+cT.color+';--dtt:'+cT.tinta+'"><button class="barra-cara" data-verdtj="'+turno.id+'" aria-label="Ver a '+esc(turno.nombre)+'">'+retratoJ(turno)+'</button><div class="q"><b>'+esc(turno.nombre)+'</b><span>'+(g.nTurnos?'Turno '+g.nTurnos+' · ':'')+esc(textoFase(g,yo))+'</span></div><span id="reloj" class="reloj" role="timer" aria-label="Tiempo del turno" hidden></span><button class="barra-pausa" id="abrPausa" aria-label="Pausa: reglas, animaciones, lo que fue pasando y salir" title="Pausa">'+ICO_PAUSA+'</button></div>';
  // Al final: el Certificado arriba de todo y el tablero, plegado
  var finH=esFin?resumen(g,'<div class="mesa mesa-fin">'+dibujarTablero(g,[])+tabVista+'</div>'):'';
  // qué se puede tocar
  if(miTurno&&!g.oferta){
    if(g.fase==='ubicar'){marcados=[0,1,2,3,4].map(function(i){return P.BASE.B+i;}).filter(function(k){return !P.ocupado(g,k);});tap=function(k){sala.enviar(yo,{t:'ubicar',k:k});};}
    if(g.fase==='barraIni'){marcados=(g.barraPaso===0?P.PALCO:[0,1,2,3,4].map(function(i){return P.BASE.B+i;})).filter(function(k){return !P.ocupado(g,k);});tap=function(k){sala.enviar(yo,{t:'barraIni',k:k});};}
    if(g.fase==='mover'){marcados=P.destinos(g,yo);tap=function(k){sala.enviar(yo,{t:'mover',k:k});};}
    if(g.fase==='espiar'){var ce=P.mercadosCercanos(me.pos).filter(function(m){return g.mercados[m].length;});marcados=ce.map(function(m){return P.MERCADOS[m];});
      tap=function(k){var m=P.MERCADOS.indexOf(k);sala.enviar(yo,{t:'espiar',m:m},function(){ui.modal={tipo:'visto',m:m};});};}

    if(ui.modal&&ui.modal.tipo==='gas'){marcados=P.NODOS.map(function(n){return n.id;}).filter(function(k){return P.enRecorrido(k)&&!P.ocupado(g,k)&&ui.modal.nodos.indexOf(k)<0;});tap=function(k){ui.modal.nodos.push(k);if(ui.modal.nodos.length===g.barras.length){var nd=ui.modal.nodos;ui.modal=null;sala.enviar(yo,{t:'usar',b:'gas',nodos:nd});}else pintar();};}
    if(ui.modal&&ui.modal.tipo==='tocarMercado'){marcados=[0,1,2,3,4].filter(function(m){return g.mercados[m].length;}).map(function(m){return P.MERCADOS[m];});tap=function(k){var m=P.MERCADOS.indexOf(k);ui.modal=null;sala.enviar(yo,{t:'usar',b:'espionaje',m:m},function(){ui.modal={tipo:'visto',m:m};});};}
  }
  var cDT=colJ(turno),pa=panelAccion(g,yo,me,miTurno),tt=g.fase!=='fin'?textoTirada(g):'';
  if(!esFin)h+='<div class="col-mesa">'+conDT(g,'<div class="relator" id="relator" style="--dtc:'+cDT.color+';--dtt:'+cDT.tinta+'"><span class="rel-tag">El Relator</span><b class="rel-tit">'+pa.tit+'</b><div class="rel-x">'+conIco(pa.txt)+'</div>'+(tt?'<div class="rel-t">'+conIco(tt)+'</div>':'')+(g.oferta&&me?panelOferta(g,yo):'')+'</div>');
  // Los dados bailan sobre el tablero esperando que los toques
  var dm=me&&g.fase==='tirar'&&yo===g.turno&&!g.oferta&&!ui.modal?dadosMesa():'';
  if(!esFin)h+='<div class="mesa">'+tiradaCol(g)+dibujarTablero(g,marcados)+historial(g,me)+tabVista+dm+'</div></div>';
  h+='<div class="col-der">'+finH;
  if(g.fase!=='fin'){if(!me)h+=espectador(g,pa);else h+=manos(g,yo,false)+acciones(g,yo,me,miTurno,pa);h+=pieDePagina(g,yo);}
  h+='</div></div>';
  app.innerHTML=h;tickReloj();ajustarPantalla();
  var sv=document.getElementById('tablero');if(sv)sv.addEventListener('click',function(ev){if(ui.modal&&ui.modal.tipo!=='gas'&&ui.modal.tipo!=='tocarMercado')return;tocarTablero(ev,marcados,tap);});
  conectar(g,yo,me);conectarAsa(g);conectarManos();if(g.fase==='fin')conectarCert(app,g);
  if(ui.faseVista!==g.fase){ui.faseVista=g.fase;if(['tirar','mover','ubicar','espiar'].indexOf(g.fase)>=0)window.scrollTo(0,0);}
  if(ui.modal&&ui.modal.tipo!=='gas'&&ui.modal.tipo!=='tocarMercado'&&!modalQuieto())pintarModal(g,yo,me);
  if(!ui.animando){if(ui.cola.length)jugarCola();else festejarSiToca();}
  if(ui.cubierto&&me&&humanos(g).length>1&&g.fase!=='fin'){var c=el('<div class="cubre"><div style="transform:scale(2.2);margin-bottom:14px">'+cono(me,30)+'</div><h2>Pasale el celu a '+esc(me.nombre)+'</h2><p>Lo que sigue es solo para sus ojos.</p><button class="bt oro" id="ya">Soy '+esc(me.nombre)+'</button></div>').firstChild;document.body.appendChild(c);document.getElementById('ya').onclick=function(){ui.cubierto=false;c.remove();};}
}
// En el celu todo entra en una pantalla: si algo sobra, el tablero se achica un poco (nunca menos de 210 px)
function ajustarPantalla(){
  var sv=document.getElementById('tablero');if(!sv||window.innerWidth>=1000||document.querySelector('.es-fin'))return;
  sv.style.maxHeight='';var sobra=document.documentElement.scrollHeight-window.innerHeight;if(sobra<=0)return;
  var h=sv.getBoundingClientRect().height;sv.style.maxHeight=Math.max(210,Math.floor(h-sobra))+'px';
}
function textoFase(g,yo){
  var mio=yo!=null&&yo===g.turno;
  switch(g.fase){
    case 'ubicar':return 'Elige dónde arrancar';case 'barraIni':return 'Pone un Barrabrava';case 'tirar':return mio?'Te toca tirar':'Tira los dados';
    case 'descarte':return 'Salió un 1: devolución';case 'mover':return mio?'Mové tu Cábala':'Mueve su Cábala';case 'espiar':return mio?'Mirá un Mercado de Pases':'Mira un Mercado de Pases';
    case 'canje':return g.oferta?'Hay una oferta en la mesa':(mio?'Pagá, negociá y canjeá':'Canjea y negocia');case 'mercado':return 'En el Mercado de Pases';case 'fin':return 'Terminó el partido';
  }
  return '';
}
// El Relator cuenta qué pasa (tit, txt) y prim es la fila de botones principal, si no es la de siempre
function panelAccion(g,yo,me,miTurno){
  function R(t,x,p){return {tit:t,txt:x||'',prim:p||''};}
  if(g.fase==='fin')return R('¡'+esc(g.jug[g.ganador].nombre)+' levantó la Copa!','La levantó con su Dream Team en '+g.nTurnos+' turnos.');
  if(!me)return R(ui.pausa?'Partido en pausa':'Juega la máquina','Todos los DTs son automáticos. Abajo podés ver cómo viene cada uno.','<button class="bt gr '+(ui.pausa?'oro':'fuerte')+'" id="pausaTog">'+(ui.pausa?'Seguir el partido':'Pausar el partido')+'</button>');
  if(g.oferta){var mia=P.esperan(g.oferta).indexOf(yo)>=0;return R(mia?'¡Te hicieron una oferta!':'Hay una oferta en la mesa',mia?'Mirala y contestá.':'');}
  if(g.fase==='descarte'&&g.descartes[yo]!=null)return R('Salió un 1: devolvé '+g.descartes[yo]+' Recursos','Tenés más de 9 en la mano.');
  if(ui.modal&&ui.modal.tipo==='gas')return R('Gas Pimienta','Tocá en el tablero el lugar del Barrabrava '+(ui.modal.nodos.length+1)+' de '+g.barras.length+'. Va en la Avenida Circunvalación.');
  if(ui.modal&&ui.modal.tipo==='tocarMercado')return R('Espionaje','Tocá en el tablero el Mercado de Pases que querés mirar.','<button class="bt gr" id="cancelarM">Cancelar</button>');
  if(!miTurno)return R('Espera',esc(g.fase==='ubicar'||g.fase==='barraIni'?'Está ubicando '+g.jug[P.quienDebe(g)[0]].nombre+'.':(g.fase==='descarte'?'Faltan devolver Recursos los demás.':'Es el turno de '+g.jug[g.turno].nombre+'.')));
  switch(g.fase){
    case 'ubicar':return R('Elegí tu punto de arranque','Tocá una de las esquinas que titilan. Cobrás 1 Recurso de cada hexágono que toca, así que mirá qué colores te convienen.');
    case 'barraIni':return R('Poné un Barrabrava',g.barraPaso===0?'En un vértice libre del Palco.':'En un punto de arranque libre.');
    case 'tirar':return R('Te toca tirar','Tocá los dados que bailan sobre el tablero. Con cada número cobran todos los que tocan esas piezas; el blanco, además, te dice cuánto caminás.');
    case 'mover':{var ds=P.destinos(g,yo),q=g.mv.quieto;
      return R(ds.length?'Mové tu Cábala':'No tenés camino',(g.dados[0]===g.dados[1]&&!g.mv.jet?'¡Doble! Caminás la suma de los dos dados. ':'')+(g.mv.jet?'Jet Privado: elegí cualquier intersección libre.':(g.mv.arreglo?'Los Barrabravas ya avanzaron. ':'')+(ds.length?'Tocá una de las esquinas marcadas. Tenés que caminar '+g.mv.pasos.join(' o ')+'.':'Te quedás donde estás.'))+(ds.indexOf(P.CENTRO)>=0?(P.gana(g,me)?' <b class="palco-si">¡Podés levantar la Copa! Tocá el centro del Palco.'+(P.suma(me.multas)?' Al entrar pagás tus '+P.suma(me.multas)+' Multas con lo que tenés en la mano.':'')+'</b>':''):''),(!ds.length||q)?'<button class="bt gr fuerte" id="quedarse">Quedarme acá</button>':'');}
    case 'espiar':return R('Desde el Palco se ve todo','Podés mirar uno solo: tocá en el tablero cuál de los dos Mercados de Pases marcados querés ver. Los otros tres quedan demasiado lejos.','<button class="bt gr" id="noEspiar">No mirar</button>');
    case 'mercado':return R(esc(nombreMercado(g,g.mercadoAbierto)),'Estás mirando los Jugadores de este Mercado.');
    case 'canje':{var m=P.mercadoDe(me.pos),entra=m>=0&&!me.contrato&&g.mercados[m].length;return R('Canjeá y negociá',esc(consejoCanje(g,me)),entra?'<button class="bt gr rojo ancho" data-abrir>Entrar al Mercado de Pases</button>'+filaTurno(g,yo,me,miTurno):'');}
  }
  return R('','');
}
function filaTurno(g,yo,me,miTurno){
  var mio=miTurno&&g.fase==='canje'&&!g.oferta;
  // Negocios se usa recién después de mover tu Cábala (también para ofrecerle un trato al DT del turno)
  var neg=g.fase==='canje'||g.fase==='mercado';
  return '<button class="bt gr bt-neg'+(hayCanje(g,yo,me)?' llama':'')+'" id="abrCanjes"'+(neg?'':' disabled')+'>'+ICO_TRATO+'<span>Negocios</span></button><button class="bt gr bt-fin" id="fin"'+(mio?'':' disabled')+'>'+ICO_SILBATO+'<span>Terminar turno</span></button>';
}
function hayCanje(g,yo,me){
  if(yo!==g.turno||g.oferta||(g.fase!=='canje'&&g.fase!=='mercado'))return false;
  return P.REC.some(function(r){return me.multas[r]&&me.mano[r]>0;})||P.puedePagar(me,P.PRECIO.V)||P.puedePagar(me,P.PRECIO.E)||P.puedePagar(me,P.PRECIO.B);
}
function acciones(g,yo,me,miTurno,pa){
  return g.fase==='fin'?'':'<div class="acc-prim">'+(pa.prim||filaTurno(g,yo,me,miTurno))+'</div>';
}
// Reglas, animaciones, lo que fue pasando y salir: todo adentro de la Pausa
function pieDePagina(g,yo){return '';}
function modalPausa(g,yo){
  return '<h2 class="pausa-tit">'+ICO_PAUSA+'Pausa</h2><p class="nota" style="margin:0;text-align:center">'+(sala.red?'El partido sigue para los demás: volvé pronto.':'El partido está frenado hasta que vuelvas.')+'</p><div class="pausa-bts"><button class="cuad c-reglas" id="abrReglas" title="Reglas" aria-label="Ver las reglas">'+icoReglas()+'</button><button class="cuad c-reg" id="abrRegistro" title="Lo que fue pasando" aria-label="Lo que fue pasando">'+ICO_REG+'</button><button class="cuad c-anim'+(ui.sinAnim?' off':'')+'" id="animTog" title="'+(ui.sinAnim?'Animaciones apagadas: tocá para prenderlas':'Animaciones prendidas: tocá para apagarlas')+'" aria-label="'+(ui.sinAnim?'Prender las animaciones':'Apagar las animaciones')+'" aria-pressed="'+(!ui.sinAnim)+'">'+icoAnim(ui.sinAnim)+'</button><button class="cuad c-salir" id="salir" title="Salir: el partido queda guardado" aria-label="Salir. El partido queda guardado">'+icoSalir()+'</button></div><button class="bt oro" data-cerrar>Seguir jugando</button>';
}
function panelDescarte(g,yo,me){
  var c=g.descartes[yo];if(!ui.descarte)ui.descarte=P.vacio();var d=ui.descarte,t=P.suma(d);
  return '<h2>Salió un 1: devolvé '+c+' Recursos</h2><p class="nota" style="margin:0">Tenés más de 9 en la mano. Elegí cuáles ('+t+' de '+c+').</p>'+P.REC.map(function(r){return '<div class="num"><span style="text-align:left;flex:1;font-family:var(--t);font-weight:700;display:flex;align-items:center;gap:6px">'+icono(r,28)+'× '+me.mano[r]+'</span><button data-dm="'+r+'" aria-label="Menos">−</button><span>'+d[r]+'</span><button data-dp="'+r+'" aria-label="Más">+</button></div>';}).join('')+'<button class="bt fuerte" id="descartar"'+(t===c?'':' disabled')+'>Devolver</button>';
}
function panelOferta(g,yo){
  var o=g.oferta,de=g.jug[o.de],abierta=o.a<0,yoContesto=P.esperan(o).indexOf(yo)>=0,me=yo!=null?g.jug[yo]:null;
  var puede=yoContesto&&P.REC.every(function(k){return o.pido[k]<=0||(me.mano[k]>=o.pido[k]&&P.usable(me,k));});
  var plegada=ui.ofPlegada===claveOferta(o),nueva=ui.ofVista!==claveOferta(o);ui.ofVista=claveOferta(o);
  // La oferta sale de abajo de El Relator, deslizándose (solo cuando aparece)
  var s='<div class="of'+(plegada?' plegada':'')+(nueva?' sale':'')+'"><div class="of-cuerpo"><div class="of-t">'+cono(de,24)+'<b>'+esc(de.nombre)+(abierta?' les ofrece a todos':' le ofrece a '+esc(g.jug[o.a].nombre))+'</b></div><div class="of-trato"><div><small>'+(yoContesto?'Te da':'Da')+'</small>'+precioIc(o.doy,34)+'</div><span class="of-fl">⇄</span><div><small>'+(yoContesto?'Te pide':'Pide')+'</small>'+precioIc(o.pido,34)+'</div></div>';
  if(abierta)s+='<div class="nota of-n">Se lo lleva el primero que acepte.</div>';
  var barra='';if(abierta&&yoContesto&&de.bot){if(ui.ofertaK!==claveOferta(o)){ui.ofertaK=claveOferta(o);ui.ofertaT=Date.now();}var ya=Date.now()-(ui.ofertaT||Date.now());if(ya<ESPERA_OFERTA)barra='<div class="of-barra" aria-hidden="true"><i style="animation-duration:'+ESPERA_OFERTA+'ms;animation-delay:-'+ya+'ms"></i></div>';}
  if(yoContesto&&!puede)s+='<div class="nota of-n">No tenés lo que te piden (o lo tenés trabado por una Multa). Podés rechazarla o contraofertar: el otro no se entera de qué tenés.</div>';
  if(yoContesto)s+='<div class="of-bts"><button class="bt of-si" data-resp="1"'+(puede?'':' disabled')+'>ACEPTAR</button><button class="bt of-no" data-resp="0">RECHAZAR</button><button class="bt of-contra" id="contraof">CONTRAOFERTAR</button></div>';
  else if(o.de===yo)s+='<div class="nota of-n">Esperando la respuesta…</div><button class="bt chico" data-resp="0">Retirar la oferta</button>';
  // El asa de abajo: se arrastra o se toca para plegar la oferta y espiar el tablero, sin cerrarla
  return s+'</div>'+barra+'<div class="of-asa" id="ofAsa" role="button" tabindex="0" aria-expanded="'+(!plegada)+'" aria-label="'+(plegada?'Desplegar la oferta':'Plegar la oferta para ver el tablero')+'"><span class="of-res">'+(plegada?'Oferta de '+esc(de.nombre)+': deslizá para abrirla':'Deslizá para ver el tablero')+'</span><i></i></div></div>';
}
function conectarAsa(g){
  var a=document.getElementById('ofAsa');if(!a||!g.oferta)return;
  var of=a.parentNode,c=of.querySelector('.of-cuerpo'),k=claveOferta(g.oferta),act=false,mov=false,y0=0,h0=0,H=0;
  function poner(pl){ui.ofPlegada=pl?k:null;c.style.maxHeight='';c.style.transition='';of.classList.toggle('plegada',pl);a.setAttribute('aria-expanded',String(!pl));a.setAttribute('aria-label',pl?'Desplegar la oferta':'Plegar la oferta para ver el tablero');a.querySelector('.of-res').textContent=pl?'Oferta de '+g.jug[g.oferta.de].nombre+': deslizá para abrirla':'Deslizá para ver el tablero';}
  a.onpointerdown=function(e){act=true;mov=false;y0=e.clientY;c.style.transition='none';h0=c.getBoundingClientRect().height;c.style.maxHeight='none';H=c.scrollHeight;c.style.maxHeight=h0+'px';try{a.setPointerCapture(e.pointerId);}catch(x){}e.preventDefault();};
  a.onpointermove=function(e){if(!act)return;var dy=e.clientY-y0;if(Math.abs(dy)>5)mov=true;c.style.maxHeight=Math.max(0,Math.min(H,h0+dy))+'px';};
  a.onpointerup=function(){if(!act)return;act=false;var h=c.getBoundingClientRect().height;poner(mov?h<H/2:h>H/2);};
  a.onpointercancel=function(){act=false;poner(ui.ofPlegada===k);};
  a.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();poner(ui.ofPlegada!==k);}};
}
// Adentro del Mercado solo están los Jugadores. Se toca uno para elegirlo y aparece el botón. Para canjear o negociar se sale y se vuelve a entrar.
function panelMercado(g,yo,me){
  var m=g.mercadoAbierto,cs=g.mercados[m],sel=ui.mercSel!=null&&cs[ui.mercSel]?ui.mercSel:null,full=P.contratados(me)>=g.meta;
  var s='<h2>'+esc(nombreMercado(g,m))+'</h2><p class="nota" style="margin:0">Solo vos ves estas cartas. Tocá un Jugador para elegirlo.</p><div class="mc-grid">';
  cs.forEach(function(c,i){s+='<div class="mc'+(sel===i?' elegida':'')+'"><button class="cartita" data-mercsel="'+i+'" aria-pressed="'+(sel===i)+'" aria-label="Elegir a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button><p>'+habilidadCarta(c)+'</p></div>';});
  s+='</div>';
  if(sel!=null){var c=cs[sel],tiene=!!me.eq[c.pos],tq=P.tokenDe(g,c);
    s+='<div class="mc-pie"><b>'+esc(P.nombreCarta(c))+' · '+P.POS[c.pos]+' de '+P.NOMBRE_REC[c.club]+'</b>';
    if(tiene)s+='<div class="fila"><button class="bt fuerte mc-con" data-cambiar="'+sel+'" data-tk="V"'+(me.V>=1?'':' disabled')+'><span>Cambiar</span>'+token('V',24)+'</button><button class="bt fuerte mc-con" data-cambiar="'+sel+'" data-tk="E"'+(me.E>=1?'':' disabled')+'><span>Cambiar</span>'+token('E',24)+'</button></div>'+(me.V+me.E<1?'<span class="sub">Te falta 1 Token: salí, canjeá y volvé a entrar.</span>':'<span class="sub">Ya tenés esa posición: cambiarlo cuesta 1 Token.</span>');
    else if(full)s+='<span class="sub">Tu equipo ya está completo.</span>';
    else{var ok=P.puedeFichar(g,me,c);s+='<button class="bt oro mc-con" data-contratar="'+sel+'"'+(ok?'':' disabled')+'><span>Contratar</span>'+(tq?token(tq,24):token('V',24)+token('E',24))+'</button>'+(ok?'':'<span class="sub">Te falta'+(tq?' 1 Token de '+(tq==='V'?'Victoria':'Efectivo'):(me.V<1&&me.E<1?'n 1 Token de Victoria y 1 de Efectivo':(me.V<1?' 1 Token de Victoria':' 1 Token de Efectivo')))+': salí, canjeá o negociá, y volvé a entrar.</span>');}
    s+='</div>';}
  return s;
}
// Cuánto cuesta contratar a un Jugador de esa posición: en el partido completo, 1 Token de cada uno; en el rápido, 1 solo (Victoria para Arquero y Defensor, Efectivo para Volante y Delantero)
function costoPos(g,i){var rap=g&&g.modo==='rapido'&&g.meta===4,tk=rap?(i<2?'V':'E'):null;
  var tks=tk?[tk]:['V','E'],nom={V:'Victoria',E:'Efectivo'};
  return '<div class="pos-costo"><b>Contratarlo cuesta</b><div class="pc-fila">'+tks.map(function(x,n){return (n?'<i class="pc-mas">+</i>':'')+'<span class="pc-tk">'+token(x,34)+'<small>1 Token de '+nom[x]+'</small></span>';}).join('')+'</div>'+
    '<div class="pc-precios">'+tks.map(function(x){return '<span>'+token(x,18)+' = '+precioIc(P.PRECIO[x],16)+'</span>';}).join('')+'</div>'+
    '<p class="nota" style="margin:0">'+(rap?'Partido rápido: Arquero y Defensor cuestan 1 Token de Victoria; Volante y Delantero, 1 de Efectivo.':(g?'Partido completo: todos cuestan 1 Token de Victoria y 1 de Efectivo.':'En el partido completo cuestan 1 Token de cada uno; en el rápido, 1 solo.'))+' Cambiar a uno que ya tenés cuesta 1 Token.</p></div>';}
// Los Jugadores de una posición que viste en los Mercados (para el lugar vacío de tu equipo)
function vistosDePos(g,me,i){var l=[];Object.keys(me.conoce).forEach(function(m){me.conoce[m].c.forEach(function(x){if(x.pos===i)l.push({x:x,m:+m,t:me.conoce[m].t});});});
  if(!l.length)return '<div class="pos-vistos vacio"><b>'+icoBinoculares(22)+'Los que viste</b><p class="nota" style="margin:0">Todavía no viste ningún '+P.POS[i]+' en los Mercados. Se ven desde el Palco, con Espionaje o entrando a un Mercado.</p></div>';
  return '<div class="pos-vistos"><b>'+icoBinoculares(22)+P.POS[i]+(l.length>1?'s':'')+' que viste</b><div class="pv-l">'+l.map(function(o){return '<button class="pv-c" data-vercarta="'+o.x.club+'-'+o.x.pos+'" aria-label="Ver a '+esc(P.nombreCarta(o.x))+'"><span class="cartita">'+K.jugador(o.x.club,o.x.pos)+'</span><small>'+icoMercado(g,o.m,18)+esc(nombreMercado(g,o.m))+'</small></button>';}).join('')+'</div><p class="nota" style="margin:0">Pueden haber cambiado desde que los viste.</p></div>';}
function habilidadCarta(c){return ['Podés usar '+P.NOMBRE_REC[c.club]+' para pagar cualquier Multa.','Al contratarlo devolvés tus Multas de '+P.MULTA[c.club]+' y desde ahí te rebotan. Si un rival la paga, ese pago es tuyo.','En cualquier lugar cambiás 2 de '+P.NOMBRE_REC[c.club]+' por 1 a elección. En la Boletería de '+P.NOMBRE_REC[c.club]+', 1 por 1.','Cuando cobrás '+P.NOMBRE_REC[c.club]+', levantás el doble.'][c.pos];}

// ---------- La mano: cartas abanicadas ----------
// Cada carta deja ver una franja según su "peso": los Beneficios más ancha, porque se tocan
function abanico(cartas,w,ancho){
  var n=cartas.length,h=w*630/410,tot=Math.min(40,6*(n-1)),xs=[0],sumaP=0,maxY=0,s='';
  for(var q=1;q<n;q++){sumaP+=((cartas[q].peso||1)+(cartas[q-1].peso||1))/2;xs.push(sumaP);}
  var u=sumaP?Math.min(w*.46,(ancho-w*(1+tot/70))/sumaP):0,largo=sumaP*u;
  cartas.forEach(function(c,i){var x=xs[i]*u-largo/2,t=largo?x/(largo/2):0,y=t*t*(largo/(4*w))*tot*.75;maxY=Math.max(maxY,y);
    var st='left:calc(50% + '+(x-w/2).toFixed(1)+'px);top:'+y.toFixed(1)+'px;width:'+w+'px;height:'+h.toFixed(1)+'px;transform:rotate('+(t*tot/2).toFixed(1)+'deg);z-index:'+(i+1);
    s+=c.data?'<button class="naipe'+(c.cls?' '+c.cls:'')+'" style="'+st+'" '+c.data+' aria-label="'+esc(c.label)+'">'+c.html+'</button>':'<div class="naipe'+(c.cls?' '+c.cls:'')+'" style="'+st+'">'+c.html+'</div>';});
  return '<div class="abanico" style="height:'+(h+maxY+10).toFixed(0)+'px">'+s+'</div>';
}
// Todas las manos, una al lado de la otra: se desliza entre la tuya y las de los rivales. La de un rival se ve con las cartas al revés.
function manoPanel(g,yo,q,verTodo){
  var mia=q.id===yo,abierta=mia||verTodo,ancho=(window.innerWidth>=1000?440:Math.min(window.innerWidth,520))-48,rs=[],bs=[],ml=[];
  P.REC.forEach(function(r){for(var i=0;i<q.mano[r];i++)rs.push(abierta?{html:K.recurso(r),cls:q.multas[r]?'trabada':'',data:'data-verrec="'+r+'"'+(mia?' data-mia="1"':''),label:'Ver la carta de '+P.NOMBRE_REC[r]}:{html:K.dorso('Recurso'),data:'data-verdorso="Recurso"',label:'Ver el dorso de una carta de Recurso'});for(var j=0;j<q.multas[r];j++)ml.push(r);});
  q.benef.forEach(function(b){bs.push(abierta?{peso:2,html:K.beneficio(P.BENEF[b].n),data:'data-verb="'+b+'"'+(mia?'':' data-solo="1"'),label:'Ver '+P.BENEF[b].n}:{peso:1,html:K.dorso('Beneficio'),data:'data-verdorso="Beneficio"',label:'Ver el dorso de una carta de Beneficio'});});
  q.nuevos.forEach(function(b){bs.push(abierta?{peso:2,html:K.beneficio(P.BENEF[b].n)+'<i class="nuevo">Nuevo</i>',data:'data-verb="'+b+'"'+(mia?' data-nuevo="1"':' data-solo="1"'),label:'Ver '+P.BENEF[b].n+', recién comprado'}:{peso:1,html:K.dorso('Beneficio'),data:'data-verdorso="Beneficio"',label:'Ver el dorso de una carta de Beneficio'});});
  // El nombre va en tinta sobre el fondo claro de la mano: se lee con cualquier color de cono. Con más de 9 aparece el botoncito de alarma.
  var nr=rs.length,riesgo=nr>9,cq=colJ(q),s='<div class="mano-p" style="--dtc:'+cq.color+';--dtt:'+cq.tinta+'"><div class="mano-t"><button class="mp-cara" data-verdtj="'+q.id+'" aria-label="Ver a '+esc(q.nombre)+'">'+retratoJ(q)+'</button><h3><span class="mp-nom">'+(mia?'Tu mano':esc(q.nombre))+'</span>'+(q.roja?' <em class="mp-roja" title="Tarjeta Roja"></em>':'')+'</h3>'+(riesgo?'<button class="mp-alarma" data-ver9="'+q.id+'" aria-label="'+(mia?'Tenés':'Tiene')+' más de 9 Recursos: tocá para ver qué pasa">+9</button>':'')+'<span class="mp-rec'+(riesgo?' riesgo':'')+'">'+nr+' Recurso'+(nr===1?'':'s')+'</span></div>';
  s+=nr+bs.length?abanico(rs.concat(bs),window.innerWidth>=1000?100:78,ancho):'<div class="nota mano-vacia">'+(mia?'Tenés la mano vacía.':'No tiene cartas.')+'</div>';
  s+='<div class="mp"><div class="mp-eq">'+['ARQ','DEF','VOL','DEL'].map(function(n,i){var c=q.eq[i];return c?'<button class="cartita" data-vercarta="'+c.club+'-'+c.pos+'" aria-label="Ver a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button>':'<button class="mp-v" data-verpos="'+i+'"'+(mia?' data-mia="1"':'')+' aria-label="Qué hace el '+P.POS[i]+(mia?' y cuáles viste en los Mercados':'')+'">'+n+'</button>';}).join('')+'</div><div class="mp-dat"><div class="mp-fila"><button class="mp-t'+(q.V?'':' apag')+'" data-vertk="V"'+(mia?' data-mia="1"':'')+' aria-label="Ver el Token de Victoria">'+token('V',26)+'<b>'+q.V+'</b></button><button class="mp-t'+(q.E?'':' apag')+'" data-vertk="E"'+(mia?' data-mia="1"':'')+' aria-label="Ver el Token de Efectivo">'+token('E',26)+'<b>'+q.E+'</b></button><button class="mp-t" data-verusados="'+q.id+'" aria-label="Ver los Beneficios usados"><span class="ben-d mp-ben">'+K.dorso('Beneficio')+'</span><b>'+q.usados.length+'/3</b></button></div><div class="mp-mul" aria-label="Multas">';
  for(var k=0;k<5;k++)s+=ml[k]?'<button class="mp-m" data-vermulta="'+ml[k]+'"'+(mia?' data-mia="1"':'')+' aria-label="Ver la Multa '+esc(P.MULTA[ml[k]])+'">'+iconoMulta(ml[k],22)+'</button>':'<button class="mp-m mp-mv" data-vermultav="1" aria-label="Lugar para una Multa: tocá para saber qué va acá"></button>';
  return s+'</div></div></div></div>';
}
function manos(g,yo,verTodo){
  var l=[];if(yo!=null)l.push(g.jug[yo]);g.jug.forEach(function(q){if(q.id!==yo)l.push(q);});
  if(verTodo){l=g.jug.slice();}
  var ver=Math.min(ui.manoI||0,l.length-1);
  // Sin botones: se desliza. La mano de al lado asoma por el borde, abajo hay un puntito por DT y una flecha que invita a deslizar.
  return '<div class="p-mano'+(ver===0?' al-ini':'')+(ver>=l.length-1?' al-fin':'')+'"><div class="manos" id="manos">'+l.map(function(q){return manoPanel(g,yo,q,verTodo);}).join('')+'</div><button class="mn-fl mn-der" aria-label="Ver la mano siguiente">›</button><button class="mn-fl mn-izq" aria-label="Ver la mano anterior">‹</button><div class="mn-tabs" role="group" aria-label="Ver la mano de">'+l.map(function(q,i){var cq=colJ(q),tu=q.id===g.turno&&g.fase!=='fin';return '<button class="mn-tab'+(i===ver?' on':'')+(tu?' turno':'')+'" data-irmano="'+i+'" style="--dtc:'+cq.color+';--dtt:'+cq.tinta+'" aria-label="Ver la mano de '+(q.id===yo?'vos':esc(q.nombre))+(tu?', que está jugando su turno':'')+'" aria-pressed="'+(i===ver)+'"><span>'+esc(nombreCorto(q.nombre))+'</span></button>';}).join('')+'</div></div>';
}
// En la pestaña va el nombre sin el artículo y con un tope de letras
function nombreCorto(n){n=String(n||'').replace(/^(El|La|Los|Las)\s+/,'');return n.length>11?n.slice(0,10)+'…':n;}
function conectarManos(){
  var m=document.getElementById('manos');if(!m)return;
  var pm=m.parentNode,ps=m.querySelectorAll('.mano-p'),pts=pm.querySelectorAll('.mn-tab'),pbs=pts;
  function marca(i){pts.forEach(function(b,j){b.classList.toggle('on',i===j);});pbs.forEach(function(b,j){b.setAttribute('aria-pressed',String(i===j));});pm.classList.toggle('al-ini',i===0);pm.classList.toggle('al-fin',i>=ps.length-1);}
  function ir(i){i=Math.max(0,Math.min(ps.length-1,i));ui.manoI=i;marca(i);m.scrollTo({left:ps[i].offsetLeft-ps[0].offsetLeft,behavior:'smooth'});}
  // Las flechas van a la mano de al lado y los puntitos, a la de cada DT
  var fi=pm.querySelector('.mn-izq');if(fi)fi.onclick=function(){ir(cual()-1);};
  pbs.forEach(function(b){b.onclick=function(){ir(+b.dataset.irmano);};});
  function cual(){var best=0,bd=1e9;ps.forEach(function(p,i){var d=Math.abs(p.offsetLeft-m.offsetLeft-m.scrollLeft);if(d<bd){bd=d;best=i;}});return best;}
  m.style.scrollBehavior='auto';var pi=ps[Math.min(ui.manoI||0,ps.length-1)];m.scrollLeft=pi?pi.offsetLeft-ps[0].offsetLeft:0;
  var tm=null;m.onscroll=function(){clearTimeout(tm);tm=setTimeout(function(){var i=cual();ui.manoI=i;marca(i);},80);};
  // La flecha también se puede tocar
  var fl=pm.querySelector('.mn-der');if(fl)fl.onclick=function(){ir(cual()+1);};
}
// Partido entre máquinas: se ve todo de todos
function espectador(g,pa){
  return '<div class="acc-prim">'+pa.prim+'</div>'+manos(g,null,true);
}
// Negocios: cinco tarjetas fijas, cada una con todos sus botones a la vista. Se usa recién después de mover tu Cábala.
function tabCanjes(g,yo,me){
  var mio=yo===g.turno&&(g.fase==='canje'||g.fase==='mercado')&&!g.oferta;
  function sec(k,ic,tit,pista,hay,html){return '<section class="ng ng-'+k+(hay?' hay':'')+'"><div class="ng-cab"><span class="ng-ic">'+ic+'</span><b>'+tit+'</b><small>'+pista+'</small></div><div class="ng-bts">'+html+'</div></section>';}
  function bt(attr,ok,html,lbl,cls){return '<button class="ng-bt'+(cls?' '+cls:'')+(ok?' ok':'')+'" '+attr+' aria-label="'+esc(lbl)+'"'+(ok?'':' disabled')+'>'+html+'</button>';}
  function falta(pr){var f=[];P.REC.forEach(function(r){var n=(pr[r]||0)-(P.usable(me,r)?me.mano[r]:0);if(n>0)f.push(n+' de '+P.NOMBRE_REC[r]);});return f.length?'. Te falta '+f.join(', '):'';}
  var s=me.amnistia&&mio?'<div class="aviso"><b>Amnistía activa</b>Tu próxima operación ignora las Multas.</div>':'';
  var turnoTxt=mio?'':'En tu turno';
  // Tokens
  var okV=mio&&g.tokens.V>0&&P.puedePagar(me,P.PRECIO.V),okE=mio&&g.tokens.E>0&&P.puedePagar(me,P.PRECIO.E);
  s+=sec('tokens',token('V',22)+token('E',22),'Canjear Tokens',turnoTxt||(okV||okE?'¡Te alcanza!':'Con Recursos'),okV||okE,
    bt('data-token="V"',okV,token('V',30)+'<span class="ng-pr">'+precioIc(P.PRECIO.V,15)+'</span>','Canjear un Token de Victoria'+falta(P.PRECIO.V))+
    bt('data-token="E"',okE,token('E',30)+'<span class="ng-pr">'+precioIc(P.PRECIO.E,15)+'</span>','Canjear un Token de Efectivo'+falta(P.PRECIO.E)));
  // Beneficios
  var okB=mio&&g.mazoB.length&&P.puedePagar(me,P.PRECIO.B);
  s+=sec('benef','<span class="ben-d">'+K.dorso('Beneficio')+'</span>','Comprar Beneficios',turnoTxt||('Quedan '+g.mazoB.length),okB,
    bt('id="comprarB"',okB,'<span class="ben-d ng-dorso">'+K.dorso('Beneficio')+'</span><span class="ng-tx">Comprar</span><span class="ng-pr">'+precioIc(P.PRECIO.B,15)+'</span>','Comprar un Beneficio'+falta(P.PRECIO.B),'ancho'));
  // Multas: una por botón; con Arquero, también se puede pagar con su Recurso
  var nm=P.suma(me.multas),mu='',arq=P.hab(me,0);
  P.REC.forEach(function(r){if(!me.multas[r])return;
    mu+=bt('data-pagar="'+r+'"',mio&&me.mano[r]>0,iconoMulta(r,26)+'<i class="ng-fl">➜</i>'+iconoCirc(r,20),'Pagar '+P.MULTA[r]+' con 1 de '+P.NOMBRE_REC[r]);
    if(arq&&arq!==r)mu+=bt('data-pagar="'+r+'" data-con="'+arq+'"',mio&&me.mano[arq]>0&&!me.multas[arq],iconoMulta(r,26)+'<i class="ng-fl">➜</i>'+iconoCirc(arq,20)+'<small class="ng-arq">ARQ</small>','Pagar '+P.MULTA[r]+' con tu Arquero, con 1 de '+P.NOMBRE_REC[arq]);});
  s+=sec('multas',multaGenerica(24),'Pagar Multas',nm?(turnoTxt||'Tenés '+nm):'Ninguna',mio&&nm>0,mu||'<span class="ng-nada">No tenés Multas.</span>');
  // Banco: primero elegís qué das; después, qué te llevás
  var bo=P.boleDe(g,me.pos),ba='';
  if(!ui.bancoDa||!mio)ba=P.REC.map(function(r){var t=P.tasaBanco(g,me,r),ok=mio&&me.mano[r]>=t&&P.usable(me,r);return bt('data-da="'+r+'"',ok,'<b class="ng-n">'+t+'×</b>'+iconoCirc(r,20),'Dar '+t+' de '+P.NOMBRE_REC[r],'chico');}).join('');
  else ba='<button class="ng-bt chico ng-vuelve" data-da="" aria-label="Elegir otro">'+'<b class="ng-n">'+P.tasaBanco(g,me,ui.bancoDa)+'×</b>'+iconoCirc(ui.bancoDa,20)+'<i class="ng-fl">➜</i></button>'+P.REC.filter(function(r){return r!==ui.bancoDa;}).map(function(r){return bt('data-toma="'+r+'"',g.banco[r]>0,iconoCirc(r,22),'Llevarte 1 de '+P.NOMBRE_REC[r],'chico ok-toma');}).join('');
  if(mio&&me.usados.length>=3&&!ui.bancoDa)ba+='<div class="ng-usados"><small>3 usados ➜</small>'+P.REC.map(function(r){return bt('data-usados="'+r+'"',g.banco[r]>0,iconoCirc(r,18),'Cambiar 3 Beneficios usados por 1 de '+P.NOMBRE_REC[r],'mini');}).join('')+'</div>';
  s+=sec('banco','<span class="ns-banco">4<i>➜</i>1</span>','Cambiar con el Banco',turnoTxt||(ui.bancoDa?'¿Qué te llevás?':(bo?'Boletería de '+P.NOMBRE_REC[bo]+': 2 por 1':'4 iguales por 1')),false,ba);
  // Negociar: directamente el botón de armar la oferta
  var espera=!mio&&g.fase==='canje'&&!g.oferta&&yo!==g.turno;
  if(mio)s+='<button class="ng-oferta" data-negociar>'+ICO_TRATO+'<span><b>Armar una oferta</b><small>Para todos: se la lleva el primero que acepte</small></span></button>';
  else if(espera)s+='<button class="ng-oferta" id="ofrecer">'+ICO_TRATO+'<span><b>Ofrecerle un trato</b><small>A '+esc(g.jug[g.turno].nombre)+', que está jugando</small></span></button>';
  else s+='<button class="ng-oferta" disabled>'+ICO_TRATO+'<span><b>Armar una oferta</b><small>'+(g.oferta?'Hay una oferta en la mesa':'Después de mover tu Cábala')+'</small></span></button>';
  return s;
}
function pagoDe(r){var o={};o[r]=1;return o;}
// Se puede pagar en tu turno después de mover, o antes de mover si ya tenés el equipo completo (para entrar al Palco sin Multas)
function puedeOperar(g,yo,me){return yo===g.turno&&!g.oferta&&(g.fase==='canje'||g.fase==='mercado'||(g.fase==='mover'&&P.contratados(me)>=g.meta));}
function botonesPago(g,yo,me,r){
  if(!me.multas[r])return '';var ok=puedeOperar(g,yo,me),arq=P.hab(me,0),s='<div class="ficha-acc">';
  s+='<button class="bt oro" data-pagar="'+r+'"'+(ok&&me.mano[r]>0?'':' disabled')+'>Pagar con 1 de '+P.NOMBRE_REC[r]+' '+iconoCirc(r,22)+'</button>';
  if(arq&&arq!==r)s+='<button class="bt" data-pagar="'+r+'" data-con="'+arq+'"'+(ok&&me.mano[arq]>0&&!me.multas[arq]?'':' disabled')+'>Pagar con tu Arquero: 1 de '+P.NOMBRE_REC[arq]+' '+iconoCirc(arq,22)+'</button>';
  s+=ok?(me.mano[r]>0?'':'<p class="nota" style="margin:0">No tenés '+P.NOMBRE_REC[r]+' en la mano para pagarla.</p>'):'<p class="nota" style="margin:0">Se paga en tu turno, después de mover tu Cábala.</p>';
  return s+'</div>';}
function botonToken(g,yo,me,tk){
  var ok=yo===g.turno&&!g.oferta&&(g.fase==='canje'||g.fase==='mercado'),pr=P.PRECIO[tk],alc=g.tokens[tk]>0&&P.puedePagar(me,pr);
  return '<div class="ficha-acc"><button class="bt oro" data-token="'+tk+'"'+(ok&&alc?'':' disabled')+'>Canjear '+token(tk,24)+' por '+precioIc(pr,18)+'</button>'+(ok?(alc?'':'<p class="nota" style="margin:0">Todavía no te alcanza.'+faltaPara(me,pr).replace(/<[^>]+>/g,' ')+'</p>'):'<p class="nota" style="margin:0">Se canjea en tu turno, después de mover tu Cábala.</p>')+'</div>';}
// Al pagar o canjear desde una ficha, la ficha se cierra
function cerrarFicha(){if(ui.modal&&/^(rec|multa|tok)$/.test(ui.modal.tipo)){ui.modal=ui.modal.volver||null;limpiarModales();}}
function precios(g){return '<div class="carta"><div class="op">'+token('V',30)+'<div><b>Token de Victoria</b>'+precioIc(P.PRECIO.V,22)+'</div></div><div class="op">'+token('E',30)+'<div><b>Token de Efectivo</b>'+precioIc(P.PRECIO.E,22)+'</div></div><div class="op"><span class="ben-d">'+K.dorso('Beneficio')+'</span><div><b>Beneficio</b>'+precioIc(P.PRECIO.B,22)+'</div></div><div class="op"><span class="ben-d">'+K.dorso('Jugador')+'</span><div><b>Jugador, en un Mercado de Pases</b><span class="sub">'+costoJugador(g)+'</span></div></div></div>';}
function tabMercados(g,me){
  var ks=Object.keys(me.conoce);
  if(!ks.length)return '<div class="nota">Todavía no viste ningún Mercado de Pases. Acá queda lo que veas: desde el Palco, con Espionaje o entrando a uno.</div>';
  return ks.map(function(m){var c=me.conoce[m];return '<div class="carta"><p class="mv-cab">'+icoMercado(g,+m,46)+'<span><b>'+esc(nombreMercado(g,+m))+'</b><br><small>Lo viste en el turno '+c.t+'</small></span></p>'+(c.c.length?'<div class="pz-eq">'+c.c.map(function(x){return '<button class="cartita" data-vercarta="'+x.club+'-'+x.pos+'" aria-label="Ver a '+esc(P.nombreCarta(x))+'">'+K.jugador(x.club,x.pos)+'</button>';}).join('')+'</div>':'<p>Vacío</p>')+'</div>';}).join('');
}


// ---------- Ventanas: cartas grandes, uso de Beneficios y negociación ----------
function usarBen(g,yo,b){var B=P.BENEF[b];
  if(b==='gas'){ui.modal={tipo:'gas',nodos:[]};pintar();window.scrollTo(0,0);return;}
  if(b==='espionaje'){ui.modal={tipo:'tocarMercado'};pintar();window.scrollTo(0,0);return;}
  if(!B.p){ui.modal=null;limpiarModales();if(sala.enviar(yo,{t:'usar',b:b})&&B.g==='mov')window.scrollTo(0,0);return;}
  ui.modal={tipo:'usar',b:b,a:{}};pintar();
}
function pintarModal(g,yo,me){
  var M=ui.modal,s='';
  if(M.tipo==='reglas')s='<h2>Reglas</h2>'+tabReglas(g,me)+'';
  if(M.tipo==='canjes')s='<h2 class="tit-ic">'+ICO_TRATO+'Negocios</h2>'+tabCanjes(g,yo,me)+'';
  if(M.tipo==='crear')s=modalCrear(M);
  if(M.tipo==='editDT')s=modalEditDT(M);
  if(M.tipo==='pausa')s=modalPausa(g,yo);
  if(M.tipo==='registro')s='<h2 class="tit-ic">'+ICO_REG+'Lo que fue pasando</h2><p class="nota" style="margin:0">Turno '+g.nTurnos+'. Lo último, arriba.</p>'+tabRegistro(g,yo);
  if(M.tipo==='mas9')s=modalMas9(g,M);
  if(M.tipo==='multaVacia')s=modalMultaVacia();
  if(M.tipo==='tok'){var tkV=M.tk==='V';s='<div class="multa-g">'+token(M.tk,150)+'</div><h2 style="margin:0">Token de '+(tkV?'Victoria':'Efectivo')+'</h2><div class="ej"><div class="ej-v">'+precioIc(P.PRECIO[M.tk],28)+ejFl()+token(M.tk,40)+'</div><small>Se canjea en tu turno.</small></div><p style="margin:0">Con Tokens se contratan los Jugadores, parado en un Mercado de Pases. '+(g&&g.modo==='rapido'&&g.meta===4?(tkV?'En este partido, el de Victoria paga a tu Arquero y a tu Defensor.':'En este partido, el de Efectivo paga a tu Volante y a tu Delantero.'):'Cada Jugador cuesta uno de Victoria y uno de Efectivo.')+' Cambiar a uno que ya tenés cuesta 1 Token.</p>';}
  if(M.tipo==='pos'){var PD=[['Arquero','Con su Recurso pagás cualquier Multa.'],['Defensor','Al contratarlo devolvés todas tus Multas de su Recurso. Desde ahí, esa Multa te rebota: no te cae. Y si un rival la paga, ese pago es tuyo.'],['Volante','En cualquier lugar cambiás 2 de su Recurso por 1 a elección. En la Boletería de su Recurso, 1 por 1.'],['Delantero','Cuando cobrás su Recurso, levantás el doble.']][M.i];s='<div class="grande chica">'+K.dorso('Jugador')+'</div><h2 style="margin:0">'+PD[0]+'</h2><p style="margin:0"><b>Qué hace:</b> '+PD[1]+'</p><p class="nota" style="margin:0">Hay un '+PD[0]+' por cada club, y su habilidad usa el Recurso de ese club. Se contrata en un Mercado de Pases.</p>'+costoPos(g,M.i);if(M.mia&&me&&g)s+=vistosDePos(g,me,M.i);}
  if(M.tipo==='usados'){var qu=g.jug[M.q];s='<h2>Beneficios usados</h2><p style="margin:0">'+dtN(qu)+' lleva <b>'+qu.usados.length+'</b>. Con 3 usados, cuando quiera, los entrega por 1 Recurso a elección.</p>'+(qu.usados.length?'<div class="pz-eq">'+qu.usados.map(function(b){return '<button class="cartita" data-verb="'+b+'" data-solo="1" aria-label="Ver '+esc(P.BENEF[b].n)+'">'+K.beneficio(P.BENEF[b].n)+'</button>';}).join('')+'</div>':'<p class="nota" style="margin:0">Todavía no usó ninguno.</p>');
    if(M.q===yo&&qu.usados.length>=3){if(yo===g.turno&&(g.fase==='canje'||g.fase==='mercado')&&!g.oferta)s+='<h3 style="font-size:16px;margin:4px 0 0">Entregá 3 y elegí tu Recurso</h3><div class="sel">'+P.REC.map(function(r){return '<button class="chip ic" data-usados="'+r+'" aria-label="'+P.NOMBRE_REC[r]+'"'+(g.banco[r]>0?'':' disabled')+'>'+iconoCirc(r,28)+'</button>';}).join('')+'</div>';
      else s+='<p class="nota" style="margin:0">No es obligatorio: los entregás cuando quieras, en tu turno, después de mover.</p>';}}
  if(M.tipo==='mercados')s='<h2 class="tit-ic">'+icoBinoculares(34)+'Mercados vistos</h2>'+tabMercados(g,me)+'';
  if(M.tipo==='mercado')s=panelMercado(g,yo,me);
  if(M.tipo==='descarte')s=panelDescarte(g,yo,me);
  if(M.tipo==='rec'){var rr=M.r;s='<div class="grande">'+K.recurso(rr)+'</div><h2 style="margin:0">'+P.NOMBRE_REC[rr]+'</h2><p style="margin:0">El Recurso de <b>'+esc(P.CLUB[rr])+'</b>. Se cobra cuando sale el <b>'+P.NUM[rr]+'</b> y tu Cábala toca su estadio o su predio.'+(me&&me.multas[rr]?' <b>Ahora está trabado por una Multa:</b> pagala para poder usarlo.':'')+'</p>';}
  if(M.tipo==='multa'){var mr=M.r;s='<div class="multa-g">'+iconoMulta(mr,210)+'</div><h2 style="margin:0">'+esc(P.MULTA[mr])+'</h2><p style="margin:0">Traba tus cartas de <b>'+P.NOMBRE_REC[mr]+'</b>: no las podés usar hasta pagarla. Se paga en Negocios, con 1 de '+P.NOMBRE_REC[mr]+'. Si un rival tiene al Defensor de '+P.NOMBRE_REC[mr]+', ese pago es para él.</p>';}
  // Desde tu mano: pagar la Multa (en la ficha de la Multa o del Recurso trabado) y canjear el Token
  if(M.mia&&me&&g){if((M.tipo==='rec'&&me.multas[M.r])||M.tipo==='multa')s+=botonesPago(g,yo,me,M.r);if(M.tipo==='tok')s+=botonToken(g,yo,me,M.tk);}
  if(M.tipo==='pieza')s=modalPieza(g,M.pz);
  if(M.tipo==='qt')s=modalQt(g,M.j);
  if(M.tipo==='dorso'){var esR=M.k==='Recurso';s='<div class="grande">'+K.dorso(M.k)+'</div><h2 style="margin:0">Carta de '+M.k+', boca abajo</h2><p style="margin:0">'+(esR?'Así ven los demás tus Recursos: saben cuántos tenés, pero no de qué club son. Los Recursos se cobran con los dados y se usan para comprar, canjear y pagar Multas.':'Así ven los demás tus Beneficios: saben cuántos tenés, pero no cuáles. Cada uno es una sorpresa del mazo; se usa desde el turno siguiente a comprarlo, uno por turno.')+'</p>';}
  if(M.tipo==='cono'){var pc=g.jug[M.j];s='<div class="multa-g">'+cono(pc,110)+'</div><h2 style="margin:0">La Cábala de '+dtN(pc)+'</h2><p style="margin:0">'+(function(){var cj=colJ(pc);return 'Es '+(cj.o==='muleta'?'la':'el')+' <b>'+cj.n+' '+cj.col+'</b>';})()+', la ficha de '+esc(pc.nombre)+' en la isla. En el fútbol, una cábala es lo que te trae suerte. Se mueve por las calles con el dado. Cuando sale un número, cobra de cada pieza con ese número que toque su esquina: Recursos de los Estadios y Predios, y Multas de las Zonas de Mala Fama.</p><p style="margin:0">Ahora está en <b>'+esc(P.nombreNodo(g,pc.pos))+'</b>.'+(pc.roja?' Tiene <b>Tarjeta Roja</b>: en su próximo turno no mueve su Cábala.':'')+'</p>';}
  if(M.tipo==='barra')s='<div class="multa-g">'+icoBarra(150)+'</div><h2 style="margin:0">Barrabrava</h2><p style="margin:0">Después de que movés tu Cábala, cada Barrabrava avanza <b>solo</b> una intersección en sentido horario, por su recorrido. Si adelante hay una Cábala, la salta; si hay otro Barrabrava, se queda donde está.</p><p style="margin:0">Nadie puede pasar ni pararse donde hay un Barrabrava.</p>';

  if(M.tipo==='dt'){var zd=PIZ[M.dt],dd=P.DTS[M.dt];s=M.cus?'<div class="dt-grande">'+K.dtCustom(M.cus,true)+'</div><h2 style="margin:0">'+esc(M.nom||dd.nombre)+'</h2><p class="dt-frase">Un DT hecho a medida.</p>':'<div class="dt-grande">'+K.dtEntero(M.dt)+'</div><h2 style="margin:0">'+esc(dd.nombre)+'</h2><p class="dt-frase">"'+esc(zd.frase)+'"</p><p style="margin:0">'+esc(zd.como)+'</p><p style="margin:0"><b>Cómo juega.</b> '+esc(zd.estilo)+'</p>';}
  if(M.tipo==='jug'){var c={club:M.club,pos:M.pos};s='<div class="grande">'+K.jugador(c.club,c.pos)+'</div><p style="margin:0"><b>'+P.POS[c.pos]+' de '+P.NOMBRE_REC[c.club]+'.</b> '+habilidadCarta(c)+'</p>';}
  if(M.tipo==='ben'){if(ui.tuto)M.solo=true;var ok=!M.solo&&!M.nuevo&&P.puedeUsarB(g,yo,M.b)&&!g.oferta;
    s='<div class="grande">'+K.beneficio(P.BENEF[M.b].n)+'</div>';
    if(!M.solo)s+=M.nuevo?'<p class="nota" style="margin:0">Recién comprado: se usa desde tu próximo turno.</p>':(ok?'':'<p class="nota" style="margin:0">'+esc(me.usoB&&yo===g.turno?'Ya usaste un Beneficio en este turno.':(yo!==g.turno?'Se usa en tu turno.':(P.BENEF[M.b].g==='mov'?'Se usa cuando te toca mover.':'Ahora no se puede usar.')))+'</p>');
    s+='<div class="fila">'+(ok?'<button class="bt fuerte" id="usarB">Usar</button>':'')+'</div>';}
  if(M.tipo==='visto'){var cs=g.mercados[M.m];s='<h2 class="tit-ic">'+icoMercado(g,M.m,38)+esc(nombreMercado(g,M.m))+'</h2><div class="pz-eq">'+cs.map(function(x){return '<button class="cartita" data-vercarta="'+x.club+'-'+x.pos+'" aria-label="Ver a '+esc(P.nombreCarta(x))+'">'+K.jugador(x.club,x.pos)+'</button>';}).join('')+'</div><p class="nota" style="margin:0">Tocá un Jugador para verlo en grande. Queda anotado en Mercados vistos: los demás no lo ven.</p>';}
  if(M.tipo==='usar'){var B=P.BENEF[M.b],ps=B.p||[];s='<h2>'+esc(B.n)+'</h2><p style="margin:0">'+esc(B.t)+'</p>';
    ps.forEach(function(p){
      if(p==='r'||p==='r2'||p==='da'){s+='<div class="nota" style="font-weight:700">'+(p==='da'?'Devolvés:':(p==='r2'?'Y también:':(M.b==='barrida'?'Recurso:':'Tomás:')))+'</div><div class="sel">'+P.REC.map(function(r){var dis=p==='da'&&(me.mano[r]<1||!P.usable(me,r));return '<button class="chip ic" data-par="'+p+'" data-val="'+r+'" aria-label="'+P.NOMBRE_REC[r]+'" aria-pressed="'+(M.a[p]===r)+'"'+(dis?' disabled':'')+'>'+iconoCirc(r,28)+'</button>';}).join('')+'</div>';}
      if(p==='dt')s+='<div class="nota" style="font-weight:700">DT:</div><div class="sel">'+g.jug.filter(function(q){return q.id!==yo;}).map(function(q){return '<button class="chip" data-par="dt" data-val="'+q.id+'" aria-pressed="'+(M.a.dt===q.id)+'">'+esc(q.nombre)+'</button>';}).join('')+'</div>';
      if(p==='tk')s+='<div class="nota" style="font-weight:700">Das tu Token de:</div><div class="sel">'+[['V','Victoria'],['E','Efectivo']].map(function(t){return '<button class="chip ic" data-par="tk" data-val="'+t[0]+'" aria-pressed="'+(M.a.tk===t[0])+'"'+(me[t[0]]>0?'':' disabled')+'>'+token(t[0],24)+t[1]+'</button>';}).join('')+'</div>';
      if(p==='pos')s+='<div class="nota" style="font-weight:700">Posición:</div><div class="sel">'+P.POS.map(function(n,i){return '<button class="chip" data-par="pos" data-val="'+i+'" aria-pressed="'+(M.a.pos===i)+'"'+(me.eq[i]?'':' disabled')+'>'+n+'</button>';}).join('')+'</div>';
    });
    var listo=ps.every(function(p){return p==='nodos'||M.a[p]!=null;});
    s+='<div class="fila"><button class="bt fuerte" id="confirmarB"'+(listo?'':' disabled')+'>Usar</button></div>';}
  if(M.tipo==='nego'){var o=M;
    s='<h2>'+(o.contra?'Contraoferta':'Negociar')+'</h2>';
    // La oferta del DT del turno va siempre para todos; los demás solo le pueden ofrecer al DT del turno
    s+='<p class="nota neg-para" style="margin:0">'+(o.contra?'Le contestás a '+dtN(g.jug[o.a])+'.':(o.a<0?'Para <b>todos los DTs</b>: se la lleva el primero que acepte.':'Para '+dtN(g.jug[o.a])+', que está jugando su turno.'))+'</p>';
    s+='<div class="negocio"><div class="neg-f neg-cab"><b></b><b>Das</b><b>Pedís</b></div>'+P.REC.map(function(r){var tr=!P.usable(me,r);return '<div class="neg-f" style="--rc:'+COL[r]+';--rt:'+(r==='picardia'?INK:'#fff')+'"><span class="neg-i">'+icono(r,34)+'<span class="neg-tx"><b>'+P.NOMBRE_REC[r]+'</b><small>'+(tr?'Trabado · ':'')+'Tenés <em>'+me.mano[r]+'</em></small></span></span><div class="num"><button data-nd="'+r+'" data-s="-1" aria-label="Das menos de '+P.NOMBRE_REC[r]+'">−</button><span>'+o.doy[r]+'</span><button data-nd="'+r+'" data-s="1" aria-label="Das más de '+P.NOMBRE_REC[r]+'"'+(o.doy[r]>=me.mano[r]||tr?' disabled':'')+'>+</button></div><div class="num"><button data-np="'+r+'" data-s="-1" aria-label="Pedís menos de '+P.NOMBRE_REC[r]+'">−</button><span>'+o.pido[r]+'</span><button data-np="'+r+'" data-s="1" aria-label="Pedís más de '+P.NOMBRE_REC[r]+'">+</button></div></div>';}).join('')+'</div>';
    s+='<div class="fila"><button class="bt fuerte" id="enviarO"'+(o.a!=null&&P.suma(o.doy)&&P.suma(o.pido)?'':' disabled')+'>Ofrecer</button></div>';}
  // Se sale con la cruz o tocando afuera. La devolución del 1 es obligatoria.
  var conX=M.tipo!=='descarte',sobre=(M.tipo==='nego'||M.tipo==='canjes'||M.tipo==='descarte')&&me?manoNego(me):'';
  var c2=el('<div class="modal'+(sobre?' con-mano':'')+'" role="dialog" aria-modal="true">'+sobre+'<div class="hoja">'+(conX?'<button class="hoja-asa" data-bajar aria-label="Cerrar: deslizá para abajo o tocá acá"><i></i></button>':'')+s+'</div></div>').firstChild;document.body.appendChild(c2);c2._m=M;
  if(ui.hojaDe===M)c2.querySelector('.hoja').scrollTop=ui.hojaTop||0;
  // Cerrar el Mercado es salir: se puede volver a entrar todas las veces que quieras
  var cerrado=false;function cierra(){if(cerrado)return;cerrado=true;if(M.tipo==='pausa'&&ui.relPausa){var dp=Date.now()-ui.relPausa;ui.relPausa=null;if(g&&g.rel&&g.rel.pausa==null){g.rel.fin+=dp;if(g.rel.oferFin)g.rel.oferFin+=dp;}}
    if(M.tipo==='mercado'&&!ui.tuto){ui.modal=null;ui.mercSel=null;limpiarModales();sala.enviar(yo,{t:'cerrar'});return;}ui.mercSel=M.tipo==='mercado'?null:ui.mercSel;ui.modal=M.volver||null;limpiarModales();pintar();avanzarBots();}
  // Se cierra bajando: tocando afuera, tocando la manija, con Escape o arrastrándola. Siempre se va deslizándose para abajo.
  var bajando=false;function baja(){if(bajando)return;bajando=true;var hh=c2.querySelector('.hoja');hh.classList.remove('entra');hh.style.transition='transform .24s cubic-bezier(.5,0,.8,.4)';hh.style.transform='translateY(110%)';c2.classList.add('se-va');setTimeout(cierra,230);}
  c2._baja=baja;
  if(conX){c2.addEventListener('click',function(e){if(e.target===c2)baja();});var ab=c2.querySelector('[data-bajar]');if(ab)ab.onclick=function(){if(Date.now()-(hj._arr||0)<350)return;baja();};}
  // Entra deslizándose desde abajo (solo la primera vez, no cuando se redibuja) y se cierra arrastrándola hacia abajo
  var hj=c2.querySelector('.hoja');if(ui.hojaDe!==M)hj.classList.add('entra');
  if(conX)deslizarParaCerrar(c2,hj,cierra);
  if(conX&&!ui.escBaja){ui.escBaja=true;document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;var mm=document.querySelectorAll('.modal');var u=mm[mm.length-1];if(u&&u._baja&&u.querySelector('[data-bajar]'))u._baja();});}
  if(g&&CON_BOTONES[M.tipo])conectarEn(c2,g,yo,me);
  if(ui.tuto&&ui.tutoHook)ui.tutoHook(c2,M);
  c2.querySelectorAll('[data-cerrar]').forEach(function(x){x.onclick=baja;});
  if(M.tipo==='crear')conectarCrear(c2,M);
  if(M.tipo==='editDT')conectarEditDT(c2,M);
  var ub=c2.querySelector('#usarB');if(ub)ub.onclick=function(){limpiarModales();usarBen(g,yo,M.b);};
  c2.querySelectorAll('[data-par]').forEach(function(x){x.onclick=function(){var v=x.dataset.val;if(x.dataset.par==='dt'||x.dataset.par==='pos')v=+v;M.a[x.dataset.par]=v;limpiarModales();pintarModal(g,yo,me);};});
  var cb=c2.querySelector('#confirmarB');if(cb)cb.onclick=function(){var a=Object.assign({t:'usar',b:M.b},M.a);limpiarModales();ui.modal=null;sala.enviar(yo,a);};
  c2.querySelectorAll('[data-nda]').forEach(function(x){x.onclick=function(){M.a=+x.dataset.nda;limpiarModales();pintarModal(g,yo,me);};});
  c2.querySelectorAll('[data-nd]').forEach(function(x){x.onclick=function(){M.doy[x.dataset.nd]=Math.max(0,M.doy[x.dataset.nd]+ +x.dataset.s);limpiarModales();pintarModal(g,yo,me);};});
  c2.querySelectorAll('[data-np]').forEach(function(x){x.onclick=function(){M.pido[x.dataset.np]=Math.max(0,M.pido[x.dataset.np]+ +x.dataset.s);limpiarModales();pintarModal(g,yo,me);};});
  var eo=c2.querySelector('#enviarO');if(eo)eo.onclick=function(){var a={t:M.contra?'contra':'proponer',a:M.a,doy:M.doy,pido:M.pido};limpiarModales();ui.modal=null;sala.enviar(yo,a);};
}
function manoNego(me){
  var rs=[],ancho=Math.min(window.innerWidth,520)-24;P.REC.forEach(function(r){for(var i=0;i<me.mano[r];i++)rs.push({html:K.recurso(r),cls:me.multas[r]?'trabada':''});});
  return '<div class="neg-mano" aria-label="Tus Recursos">'+(rs.length?abanico(rs,72,ancho):'<span>No tenés Recursos en la mano.</span>')+'</div>';
}
function deslizarParaCerrar(c2,hj,cierra){
  var y0=0,dy=0,va=false,listo=false;
  function ini(y,desdeAsa){if(hj.scrollTop>2&&!desdeAsa)return;y0=y;dy=0;va=true;listo=false;}
  function mueve(y,e){if(!va)return;dy=y-y0;if(!listo){if(dy>8){listo=true;hj.style.transition='none';}else if(dy<-4){va=false;return;}else return;}
    if(e&&e.cancelable)e.preventDefault();hj.style.transform='translateY('+Math.max(0,dy)+'px)';c2.style.background='rgba(20,20,30,'+Math.max(.2,.78-dy/600).toFixed(2)+')';}
  function fin(){if(!va)return;va=false;if(!listo)return;hj._arr=Date.now();hj.style.transition='transform .22s ease';
    if(dy>Math.min(140,hj.offsetHeight*.25)){hj.style.transform='translateY(110%)';setTimeout(cierra,200);}else{hj.style.transform='';c2.style.background='';}}
  hj.addEventListener('touchstart',function(e){ini(e.touches[0].clientY,!!e.target.closest('.hoja-asa'));},{passive:true});
  hj.addEventListener('touchmove',function(e){mueve(e.touches[0].clientY,e);},{passive:false});
  hj.addEventListener('touchend',fin);hj.addEventListener('touchcancel',fin);
  // Con el mouse, desde la manija de arriba
  var asa=hj.querySelector('.hoja-asa');if(asa){asa.onpointerdown=function(e){if(e.pointerType!=='mouse')return;ini(e.clientY,true);try{asa.setPointerCapture(e.pointerId);}catch(x){}};asa.onpointermove=function(e){if(e.pointerType==='mouse')mueve(e.clientY,null);};asa.onpointerup=function(e){if(e.pointerType==='mouse')fin();};}
}
function limpiarModales(){document.querySelectorAll('.modal').forEach(function(m){var h=m.querySelector('.hoja');if(h){ui.hojaDe=m._m;ui.hojaTop=h.scrollTop;}m.remove();});}
// Las ventanas que no cambian con el estado no se redibujan: así no pierden el lugar ni lo que abriste
var QUIETOS={reglas:1,rec:1,multa:1,pieza:1,dt:1,jug:1,visto:1,mercados:1,tok:1,pos:1,usados:1,qt:1,dorso:1,cono:1,barra:1,mas9:1,multaVacia:1};
var CON_BOTONES={pos:1,tok:1,canjes:1,mercados:1,mercado:1,descarte:1,reglas:1,jug:1,rec:1,multa:1,visto:1,pieza:1,usados:1,pausa:1,registro:1};
// ---------- Creá tu propio DT ----------
var RASGOS=[['pelo','Peinado',['Corto','Con entradas','Pelado','Revuelto','Medio','Largo','Ondas','Rodete']],['color','Color de pelo y barba',['Negro','Oscuro','Castaño','Claro','Rubio','Colorado','Gris','Canoso']],['barba','Barba',['Sin barba','Sombra','Barba corta','Barba larga','Candado','Chivita','Bigote','Bigote fino','Barba y bigote']],['ojos','Ojos',['Comunes','Sonrientes','Verdes','Azules','Miel']],['acc','Accesorios',['Nada','Anteojos redondos','Anteojos','Anteojos de sol','Silbato','Cresta de gallo']],['cara','Cara',['Ovalada','Redonda','Alargada','Cuadrada','Pera','En punta']],['gesto','Gesto',['Sonrisa','Sonrisa gigante','Canchero','Serio','Gritando']],['piel','Piel',['Muy clara','Clara','Media','Trigueña','Oscura']],['g','Es',['Varón','Mujer']],['ropa','Vestimenta',['Traje','Tracksuit','Musculosa','Camisa blanca','Delantal']],['pose','Pose',['Brazos cruzados','Festejando','Manos en los bolsillos','Dedo arriba','Manos arriba','Mostrando bíceps']],['anim','Movimiento',['Baile','Salto','Festejo','Pisotón','Saludo','No con la cabeza','Cejas','Lengua','Trompo']]];
function rasgosGuardados(){var d={g:'m',pelo:0,color:2,barba:0,ojos:0,acc:0,cara:0,gesto:0,piel:1,ropa:0,pose:0};try{var t=localStorage.getItem('pexa-midt');if(t)return Object.assign(d,JSON.parse(t));}catch(e){}return d;}
function modalCrear(M){var r=M.r;
  return '<h2>Creá tu propio DT</h2><div class="dt-grande chica">'+K.dtCustom(r,true)+'</div>'+RASGOS.map(function(x){var ops=x[2];return '<div class="cr-f"><b>'+x[1]+'</b><div class="sel">'+ops.map(function(n,i){var on=x[0]==='g'?(r.g==='f')===(i===1):r[x[0]]===i;return '<button class="chip" data-cr="'+x[0]+'" data-v="'+i+'" aria-pressed="'+on+'">'+esc(n)+'</button>';}).join('')+'</div></div>';}).join('')+'<button class="bt fuerte" id="crListo">Usar este DT</button>'+(M.habia?'<button class="bt chico" id="crSacar">Volver a un DT de la liga</button>':'');
}
// La ficha de cada DT: de cuerpo entero, con su descripción, el nombre y flechitas para cambiarle cada rasgo
function generoR(r){return r.g?r.g:(r.base!=null?(r.base===2?'f':'m'):'m');}
function opsRasgo(x,r){return x[2];}
// La ficha de cada DT: una flecha a cada lado. Cada toque muestra otra combinación de rasgos al azar;
// las que ya se vieron quedan en fila, así que ir y volver respeta la combinación que estaba. El original es el punto de partida.
function comboAzar(base){var r={base:base};RASGOS.forEach(function(x){if(x[0]==='g')r.g=Math.random()<.5?'m':'f';else r[x[0]]=Math.floor(Math.random()*x[2].length);});return r;}
function prepEditDT(M){if(!M.hist){M.hist=[M.r||null];M.hi=0;}if(M.cc==null)M.cc=M.i;return M;}
function modalEditDT(M){prepEditDT(M);var d=P.DTS[M.i],pz=PIZ[M.i]||{},r=M.r,tom=M.tomados||[];
  var fig;try{fig=r?K.dtCustom(r,true):K.dtEntero(M.i);}catch(e){fig=K.dtEntero(M.i);}
  return '<label class="ed-nomw"><input class="ent ed-nom" id="edNom" aria-label="Nombre del DT. Tocá para cambiarlo" maxlength="12" value="'+esc(M.nombre)+'"><span class="ed-lapiz" aria-hidden="true">'+LAPIZ+'</span></label><p class="ed-pista">Tocá el nombre para cambiarlo</p>'+(r?'':'<p class="ed-frase">«'+esc(pz.frase||'')+'»</p>')+
    '<div class="ed-grid"><button class="ed-fl ed-fl-g" data-ed="-1" aria-label="Combinación anterior">‹</button><div class="ed-fig">'+fig+'</div><button class="ed-fl ed-fl-g" data-ed="1" aria-label="Otra combinación">›</button></div>'+
    '<p class="ed-cap">'+(r?'Combinación '+(M.hi+1)+(r.anim!=null?' · Movimiento: <b>'+esc(RASGOS[RASGOS.length-1][2][r.anim])+'</b>':'')+'. Las flechas muestran otras; volviendo para atrás encontrás las que ya viste.':esc(pz.como||''))+'</p>'+
    '<button class="bt fuerte" id="edListo">Listo</button>'+(r?'<button class="bt chico" id="edOrig">Volver a '+esc(d.nombre)+' original</button>':'');
}function conectarEditDT(c,M){
  var n=c.querySelector('#edNom');if(n){n.oninput=function(){M.nombre=n.value;};n.onfocus=function(){n.select();};}
  function repinta(){var h=c.querySelector('.hoja'),top=h?h.scrollTop:0;limpiarModales();pintarModal(null,null,null);var nh=document.querySelector('.modal .hoja');if(nh)nh.scrollTop=top;}
  c.querySelectorAll('[data-ed]').forEach(function(b){b.onclick=function(){var dl=+b.dataset.ed;
    if(dl>0){if(M.hi<M.hist.length-1)M.hi++;else{M.hist.push(comboAzar(M.i));M.hi=M.hist.length-1;}}
    else{if(M.hi>0)M.hi--;else M.hist.unshift(comboAzar(M.i));}
    M.r=M.hist[M.hi]?JSON.parse(JSON.stringify(M.hist[M.hi])):null;repinta();};});
  var o=c.querySelector('#edOrig');if(o)o.onclick=function(){M.r=null;var k=M.hist.indexOf(null);if(k<0){M.hist.unshift(null);k=0;}M.hi=k;repinta();};
  var l=c.querySelector('#edListo');if(l)l.onclick=function(){var nom=(M.nombre||'').trim();limpiarModales();ui.modal=null;
    if(M.online){var id=idCliente();sala.red.transaccion('lobby',function(cur){if(cur==null)return null;var x=JSON.parse(cur);x.a.forEach(function(q){if(q&&q.id===id){if(M.r)q.cus=M.r;else delete q.cus;q.cc=M.cc;if(nom)q.nom=nom;}});return JSON.stringify(x);},function(){});
      if(nom)try{localStorage.setItem('pexa-nombre',nom);}catch(e){}if(ui.lobby)pantallaLobby();return;}
    conf.nombres[M.i]=nom||P.DTS[M.i].nombre;conf.cus=conf.cus||{};conf.cc=conf.cc||{};
    if(M.r)conf.cus[M.i]=M.r;else delete conf.cus[M.i];
    if(M.cc!==M.i)conf.cc[M.i]=M.cc;else delete conf.cc[M.i];
    pantallaInicio();};
}
function conectarCrear(c,M){
  c.querySelectorAll('[data-cr]').forEach(function(b){b.onclick=function(){var k=b.dataset.cr,v=+b.dataset.v;if(k==='g')M.r.g=v===1?'f':'m';else M.r[k]=v;var h=c.querySelector('.hoja'),top=h.scrollTop;limpiarModales();pintarModal(null,null,null);var n=document.querySelector('.modal .hoja');if(n)n.scrollTop=top;};});
  function fin(r){limpiarModales();ui.modal=null;
    if(sala.red){var id=idCliente();sala.red.transaccion('lobby',function(cur){if(cur==null)return null;var x=JSON.parse(cur);x.a.forEach(function(q){if(q&&q.id===id){if(r)q.cus=r;else delete q.cus;}});return JSON.stringify(x);},function(){});}
    else{conf.cus=conf.cus||{};if(r)conf.cus[M.para]=r;else delete conf.cus[M.para];pantallaInicio();}}
  var l=c.querySelector('#crListo');if(l)l.onclick=function(){try{localStorage.setItem('pexa-midt',JSON.stringify(M.r));}catch(e){}fin(M.r);};
  var sq=c.querySelector('#crSacar');if(sq)sq.onclick=function(){fin(null);};
}
function modalQuieto(){var m=document.querySelector('.modal');return !!(m&&ui.modal&&m._m===ui.modal&&QUIETOS[ui.modal.tipo]);}

// ---------- Botones ----------
function conectar(g,yo,me){
  if(!modalQuieto())limpiarModales();
  conectarEn(app,g,yo,me);
  var rg=document.getElementById('registro');if(rg)rg.ontoggle=function(){ui.regAbierto=rg.open;};
}
function conectarEn(raiz,g,yo,me){
  var $=function(id){return document.getElementById(id);};
  function on(id,fn){var x=$(id);if(x)x.onclick=fn;}
  function todos(sel,fn){raiz.querySelectorAll(sel).forEach(function(x){x.onclick=function(){fn(x);};});}
  on('otra',function(){dejarSala(true);sala.borrar();ui.modal=null;pantallaInicio();});
  on('salir',function(){clearTimeout(timerBot);ui.relPausa=null;limpiarModales();dejarSala(false);sala.g=null;ui.modal=null;pantallaInicio();});
  on('animTog',function(){ui.sinAnim=!ui.sinAnim;try{localStorage.setItem('pexa-sin-anim',ui.sinAnim?'1':'0');}catch(e){}pintar();});
  on('verFestejo',function(){mostrarMundial(g);});

  on('vistaTab',function(){ui.vista=ui.vista==='det'?'simple':'det';try{localStorage.setItem('pexa-vista',ui.vista);}catch(e){}pintar();});
  on('abrCanjes',function(){ui.bancoDa=null;ui.modal={tipo:'canjes'};pintar();});

  on('abrMercados',function(){ui.modal={tipo:'mercados'};pintar();});
  var enPausa=ui.modal&&ui.modal.tipo==='pausa'?ui.modal:null;
  on('abrReglas',function(){ui.modal={tipo:'reglas',volver:enPausa};pintar();});
  on('abrRegistro',function(){ui.modal={tipo:'registro',volver:enPausa};pintar();});
  // En la Pausa de un partido en este aparato también se frena el reloj
  on('abrPausa',function(){ui.modal={tipo:'pausa'};if(!sala.red&&g.rel&&g.rel.pausa==null&&!ui.relPausa)ui.relPausa=Date.now();pintar();});
  todos('[data-ver9]',function(x){ui.modal={tipo:'mas9',q:+x.dataset.ver9};pintar();});
  todos('[data-vermultav]',function(){ui.modal={tipo:'multaVacia'};pintar();});
  todos('[data-mercsel]',function(x){ui.mercSel=+x.dataset.mercsel;pintar();});
  todos('[data-verdtj]',function(x){var q=g.jug[+x.dataset.verdtj];ui.modal={tipo:'dt',dt:q.dt,cus:q.cus,nom:q.nombre};pintar();});
  todos('[data-qt]',function(x){ui.modal={tipo:'qt',j:+x.dataset.qt};pintar();});
  todos('[data-verpos]',function(x){ui.modal={tipo:'pos',i:+x.dataset.verpos,mia:x.dataset.mia==='1'};pintar();});
  todos('[data-vertk]',function(x){ui.modal={tipo:'tok',tk:x.dataset.vertk,mia:x.dataset.mia==='1'};pintar();});
  todos('[data-verusados]',function(x){ui.modal={tipo:'usados',q:+x.dataset.verusados};pintar();});
  // Los desplegables del final: uno abierto a la vez
  raiz.querySelectorAll('[data-resab]').forEach(function(x){x.ontoggle=function(){ui.resAb=ui.resAb||{};ui.resAb[x.dataset.resab]=x.open;if(x.open)raiz.querySelectorAll('[data-resab]').forEach(function(y){if(y!==x&&y.open)y.open=false;});};});
  on('pausaTog',function(){ui.pausa=!ui.pausa;pintar();if(!ui.pausa)avanzarBots();});

  on('tirar',function(){if(ui.revoleando)return;sala.enviar(yo,{t:'tirar'});});
  revolear(document.getElementById('tirar'),function(){sala.enviar(yo,{t:'tirar'});},function(){var c=JSON.parse(JSON.stringify(sala.g));P.accion(c,yo,{t:'tirar'});return c.dados;});
  on('quedarse',function(){sala.enviar(yo,{t:'quedarse'});});
  on('noEspiar',function(){sala.enviar(yo,{t:'noEspiar'});});
  on('cancelarM',function(){ui.modal=null;pintar();});
  on('fin',function(){ui.bancoDa=null;sala.enviar(yo,{t:'fin'});});
  todos('[data-abrir]',function(){ui.modal=null;limpiarModales();sala.enviar(yo,{t:'abrir'});});


  on('comprarB',function(){sala.enviar(yo,{t:'beneficio'});});
  on('descartar',function(){var d=ui.descarte;ui.descarte=null;sala.enviar(yo,{t:'descartar',mapa:d});});
  todos('[data-negociar]',function(){ui.modal={tipo:'nego',a:-1,doy:P.vacio(),pido:P.vacio(),volver:ui.modal&&ui.modal.tipo==='canjes'?ui.modal:null};pintar();});
  on('ofrecer',function(){if(!sala.red)clearTimeout(timerBot);ui.modal={tipo:'nego',a:g.turno,doy:P.vacio(),pido:P.vacio(),volver:ui.modal&&ui.modal.tipo==='canjes'?ui.modal:null};pintar();});
  // Las secciones de Negocios: una abierta a la vez
  raiz.querySelectorAll('[data-sec]').forEach(function(x){x.ontoggle=function(){var k=x.dataset.sec;if(x.open){ui.negAb=k;raiz.querySelectorAll('[data-sec]').forEach(function(y){if(y!==x&&y.open)y.open=false;});}else if(ui.negAb===k)ui.negAb=null;};});
  on('contraof',function(){var o=g.oferta;ui.modal={tipo:'nego',contra:true,a:o.de,doy:Object.assign({},o.pido),pido:Object.assign({},o.doy)};pintar();});

  todos('[data-verdt]',function(x){var v=+x.dataset.verdt;ui.verDT=v===yo?null:v;pintar();});
  // Ver una carta desde otra ventana: al cerrarla se vuelve a la que estaba
  todos('[data-verficha]',function(x){ui.modal={tipo:'dt',dt:+x.dataset.verficha,volver:ui.modal};pintar();});
  todos('[data-vercarta]',function(x){var q=x.dataset.vercarta.split('-');ui.modal={tipo:'jug',club:q[0],pos:+q[1],volver:ui.modal};pintar();});
  todos('[data-verdorso]',function(x){ui.modal={tipo:'dorso',k:x.dataset.verdorso,volver:ui.modal};pintar();});
  todos('[data-verrec]',function(x){ui.modal={tipo:'rec',r:x.dataset.verrec,mia:x.dataset.mia==='1',volver:ui.modal};pintar();});
  todos('[data-vermulta]',function(x){ui.modal={tipo:'multa',r:x.dataset.vermulta,mia:x.dataset.mia==='1',volver:ui.modal};pintar();});
  todos('[data-verb]',function(x){ui.modal={tipo:'ben',b:x.dataset.verb,nuevo:x.dataset.nuevo==='1',solo:x.dataset.solo==='1',volver:ui.modal};pintar();});
  todos('[data-pagar]',function(x){cerrarFicha();sala.enviar(yo,{t:'pagar',r:x.dataset.pagar,con:x.dataset.con||undefined});});
  todos('[data-token]',function(x){cerrarFicha();sala.enviar(yo,{t:'token',tk:x.dataset.token});});
  todos('[data-da]',function(x){ui.bancoDa=x.dataset.da;pintar();});
  todos('[data-toma]',function(x){var d=ui.bancoDa;ui.bancoDa=null;sala.enviar(yo,{t:'banco',da:d,toma:x.dataset.toma});});
  todos('[data-usados]',function(x){if(ui.modal&&ui.modal.tipo==='usados')ui.modal=null;sala.enviar(yo,{t:'usados',toma:x.dataset.usados});});
  todos('[data-contratar]',function(x){ui.mercSel=null;sala.enviar(yo,{t:'contratar',i:+x.dataset.contratar});});
  todos('[data-cambiar]',function(x){ui.mercSel=null;sala.enviar(yo,{t:'cambiar',i:+x.dataset.cambiar,tk:x.dataset.tk});});
  todos('[data-resp]',function(x){sala.enviar(yo,{t:'responder',ok:x.dataset.resp==='1'});});
  todos('[data-dm]',function(x){var r=x.dataset.dm;if(ui.descarte[r]>0)ui.descarte[r]--;pintar();});
  todos('[data-dp]',function(x){var r=x.dataset.dp;if(ui.descarte[r]<g.jug[yo].mano[r]&&P.suma(ui.descarte)<g.descartes[yo])ui.descarte[r]++;pintar();});
}
// ---------- Jugar con amigos: la sala por internet ----------
// Un "lobby" con los asientos y, cuando arranca, la "partida": las dos viven en la red como texto.
function miNombre(){try{return localStorage.getItem('pexa-nombre')||'';}catch(e){return '';}}
function idCliente(){var u=new URLSearchParams(location.search).get('yo');if(u)return 'c'+u;try{var i=localStorage.getItem('pexa-cliente');if(!i){i='c'+Math.random().toString(36).slice(2,11);localStorage.setItem('pexa-cliente',i);}return i;}catch(e){return 'c'+Math.random().toString(36).slice(2,11);}}
function codigoNuevo(){var l='ABCDEFGHJKMNPQRSTUVWXYZ',s='';for(var i=0;i<4;i++)s+=l[Math.floor(Math.random()*l.length)];return s;}
function leerNombreInput(){var x=document.getElementById('miNombre'),v=x?x.value.trim():miNombre();try{localStorage.setItem('pexa-nombre',v);}catch(e){}return v;}
function conectarAmigos(guardada){
  if(!document.getElementById('crearSala'))return;
  var cr=document.getElementById('crearSala'),un=document.getElementById('unirme'),vu=document.getElementById('volverSala'),co=document.getElementById('codSala');
  var pedir=new URLSearchParams(location.search).get('sala');if(pedir&&co)co.value=pedir.toUpperCase();
  cr.onclick=function(){var n=leerNombreInput();if(!n){mostrarError('Poné tu nombre.');return;}crearSala(n);};
  un.onclick=function(){var n=leerNombreInput(),c=(co.value||'').trim().toUpperCase();if(!n){mostrarError('Poné tu nombre.');return;}if(c.length!==4){mostrarError('No existe una sala con ese código.');marcarCodigoMal();return;}entrarSala(c,n);};
  if(vu)vu.onclick=function(){entrarSala(guardada,leerNombreInput()||'DT');};
}
function crearSala(nombre){
  var c=codigoNuevo(),red=PEXA_RED.abrir(c),id=idCliente();
  var l={n:2,modo:'completo',host:id,t:Date.now(),dts:ORDEN_DT.slice(),a:[{id:id,nom:nombre},null,null,null,null]};
  red.transaccion('lobby',function(cur){if(cur)return;return JSON.stringify(l);},function(ok){if(!ok){red.parar();crearSala(nombre);return;}conectarSala(c,red);});
}
function entrarSala(c,nombre){
  var red=PEXA_RED.abrir(c),id=idCliente(),err=null,vieja=false;
  red.transaccion('lobby',function(cur){err=null;vieja=false;if(cur==null)return null;var l=JSON.parse(cur),i;
    if(!l.empezo&&salaVencida(l.t)){vieja=true;return;}
    for(i=0;i<5;i++)if(l.a[i]&&l.a[i].id===id){if(nombre)l.a[i].nom=nombre;l.t=Date.now();return JSON.stringify(l);}
    if(l.empezo){err='Esa sala ya arrancó sin vos.';return;}
    for(i=0;i<l.n;i++)if(!l.a[i]){l.a[i]={id:id,nom:nombre};l.t=Date.now();return JSON.stringify(l);}
    // Si no queda lugar libre, se suma un DT más (hasta 5)
    if(l.n<5){l.a[l.n]={id:id,nom:nombre};l.n++;l.t=Date.now();return JSON.stringify(l);}
    err='La sala está llena.';return;},
    function(ok,val){if(vieja){cerrarSalaVieja(red);return;}if(err||!val){red.parar();mostrarError(err||'No existe una sala con ese código.');if(!err)marcarCodigoMal();return;}conectarSala(c,red);});
}
// Las salas cierran solas: después de 12 horas sin jugadas no se puede volver a entrar, y se borran de la red
var SALA_VENCE=12*3600*1000;
function salaVencida(t){return !t||Date.now()-t>SALA_VENCE;}
function cerrarSalaVieja(red){red.transaccion('partida',function(){return null;},function(){});red.transaccion('lobby',function(){return null;},function(){red.parar();});if(sala.red===red){sala.red=null;sala.g=null;}try{localStorage.removeItem('pexa-sala');}catch(e){}pantallaInicio();mostrarError('Esa sala ya cerró: pasaron más de 12 horas sin jugadas. Armá una nueva.');}
function marcarCodigoMal(){var co=document.getElementById('codSala');if(!co)return;co.classList.remove('mal');void co.offsetWidth;co.classList.add('mal');setTimeout(function(){co.classList.remove('mal');},1800);}
function conectarSala(c,red){
  sala.red=red;sala.codigo=c;sala.g=null;ui.lobby=null;reiniciarVista();ui.modal=null;ui.verDT=null;
  try{localStorage.setItem('pexa-sala',c);}catch(e){}
  var id=idCliente();
  red.escuchar('lobby',function(txt){if(!txt||sala.red!==red)return;ui.lobby=JSON.parse(txt);if(!sala.g)pantallaLobby();});
  red.escuchar('partida',function(txt){if(!txt||sala.red!==red)return;
    if(!sala.g){var g=JSON.parse(txt),s=-1;if(salaVencida(g.tAct||g.t0)){cerrarSalaVieja(red);return;}g.jug.forEach(function(p){if(p.cid===id)s=p.id;});if(s<0){dejarSala(true);mostrarError('Esa sala ya arrancó sin vos.');pantallaInicio();return;}
      sala.asiento=s;sala.soyHost=g.host===id;if(g.fase==='fin')ui.festejo=true;}
    sala.recibir(txt);});
}
function dejarSala(olvidar){if(sala.red){sala.red.parar();sala.red=null;sala.g=null;}document.title='PEXA Dream Team';if(olvidar){try{localStorage.removeItem('pexa-sala');}catch(e){}}}
function pantallaLobby(){
  var l=ui.lobby,id=idCliente(),host=l.host===id,c=sala.codigo,link=location.origin+location.pathname+'?sala='+c,listos=true,dts=l.dts||[0,1,2,3,4],i;
  // La Cábala que va a tener cada lugar: primero las elegidas a mano, después la de cada DT si está libre, si no la primera libre (igual que el motor)
  var ccEf=(function(){var r=[],us={},k,c;for(k=0;k<l.n;k++){var q=l.a[k];if(q&&q.cc!=null&&!us[q.cc]){r[k]=q.cc;us[q.cc]=1;}}for(k=0;k<l.n;k++){if(r[k]!=null||!l.a[k])continue;var d=dts[k];if(us[d])for(c=0;c<5;c++)if(!us[c]){d=c;break;}r[k]=d;us[d]=1;}return r;})();
  for(i=0;i<l.n;i++)if(!l.a[i])listos=false;
  // El código de la sala, bien grande: una letra por casillero
  var s='<div class="ini"><div class="sala-cab"><span class="logo logo-sala">'+K.logo('pexa')+'</span><div class="sala-cod" aria-label="Código de la sala: '+esc(c.split('').join(' '))+'"><small>Código de la sala</small><div>'+c.split('').map(function(x){return '<b>'+esc(x)+'</b>';}).join('')+'</div></div></div>';
  s+=caja('Pasales la sala a tus amigos','<div class="fila"><a class="bt chico compartir wa" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent('¿Jugamos a PEXA? Entrá acá: '+link+' (código '+c+')')+'">'+icoWa(20)+'<span>Mandar por WhatsApp</span></a><button class="bt chico compartir bt-ic" id="copiarLink">'+IC.copiar+'<span>Copiar el link</span></button></div><p class="nota" style="margin:0">También pueden entrar con el código <b>'+esc(c)+'</b>.</p>');
  if(host)s+=botonesJuego(l.modo,l.limite||0,'data-lm','data-ll');
  else s+='<p class="nota" style="margin:0">'+l.n+' DTs · '+(l.modo==='rapido'?'Partido rápido (Jugadores a 1 Token)':'Partido completo (Jugadores a 2 Tokens)')+' · '+(l.limite?'reloj de '+l.limite+' s por turno':'sin límite de tiempo')+'.</p>';
  // Un solo lugar para elegir o cambiar de DT: cada DT aparece una vez. El que arma la sala suma o saca DTs con el botón de la izquierda: así se define cuántos juegan.
  var filas='<p class="nota" style="margin:0">'+(host?'Con el botón de la izquierda sumás o sacás DTs: así se define cuántos juegan. ':'')+'Tocá la cara del DT que querés y el + para conocerlo. Con el lápiz le cambiás la cara y el nombre; tocando tu Cábala, la cambiás.</p>',miSi=-1;l.a.forEach(function(q,ix){if(q&&q.id===id&&ix<l.n)miSi=ix;});
  var lugarLibre=false,hayBot=false;for(i=0;i<l.n;i++){if(!l.a[i])lugarLibre=true;else if(l.a[i].bot)hayBot=true;}
  for(var k5=0;k5<5;k5++){var v=ORDEN_DT[k5],ix=dts.indexOf(v),en=ix<l.n,a=en?l.a[ix]:null,mio=a&&a.id===id,gente=a&&!a.bot,est=mio?esc(a.nom||'Vos')+' (vos)':(a?(a.bot?IC.maquina+' La Máquina':esc(a.nom||'Otro DT')+(a.id===l.host?' · armó la sala':'')):(en?'Libre: esperando a un amigo':'No juega'));
    filas+='<div class="dtelige'+(en?' on':'')+(mio?' mio':'')+'">'+(host?'<button class="dt-add" data-ltog="'+v+'" aria-pressed="'+en+'" aria-label="'+(en?'Sacar a ':'Sumar a ')+P.DTS[v].nombre+'"'+(gente?' disabled':'')+'>'+(en?'✓':'+')+'</button>':'')+'<div class="dt-cara"><button class="dt-tog" data-lpick="'+v+'" aria-label="Elegir a '+P.DTS[v].nombre+'" aria-pressed="'+(!!mio)+'"'+((gente&&!mio)||miSi<0?' disabled':'')+'>'+(a&&a.cus?K.dtCustom(a.cus,false):K.retrato(v))+'</button>'+(mio?'<button class="dt-lapiz" data-ledit="'+v+'" aria-label="Editar mi DT">'+LAPIZ+'</button>':'<button class="dt-mas" data-verficha="'+v+'" aria-label="Conocer a '+P.DTS[v].nombre+'">+</button>')+'</div><div class="dt-dat"><b>'+P.DTS[v].nombre+'</b><span class="nota">'+est+'</span></div>'+(host&&en&&(!a||a.bot)?'<button class="bt chico lb-maq" data-lb="'+ix+'">'+(a?'Dejar lugar':IC.maquina+'Máquina')+'</button>':(!en?'':(mio?'<button class="dt-cono" data-lcc="'+v+'" aria-label="Tu Cábala. Tocá para cambiarla">'+cono({cc:a.cc!=null?a.cc:v},24)+'</button>':cono({cc:(en&&ccEf[ix]!=null?ccEf[ix]:(a&&a.cc!=null?a.cc:v))},22))))+'</div>';}
  var miCus=miSi>=0&&l.a[miSi]&&l.a[miSi].cus;
  s+=caja('Elegí a tu DT',filas);
  if(host)s+='<button class="bt bt-empezar" id="arrancar"'+(listos?'':' disabled')+'>'+(listos?PELOTA+'<span>¡Arrancar el partido!</span>'+PELOTA:'<span>Faltan lugares por completar</span>')+'</button>';
  else s+='<div class="aviso"><b>Ya estás adentro</b>Esperá a que arranque el que armó la sala.</div>';
  s+='<button class="bt chico bt-ic" id="dejarLobby">'+IC.salir+'<span>Salir de la sala</span></button></div>';
  app.innerHTML=s;
  function lob(fn){sala.red.transaccion('lobby',function(cur){if(cur==null)return null;var x=JSON.parse(cur);fn(x);x.t=Date.now();return JSON.stringify(x);},function(){});}
  // Mi DT se edita igual que en el juego local: flechas, nombre y color del cono
  app.querySelectorAll('[data-ledit]').forEach(function(x){x.onclick=function(){var v4=+x.dataset.ledit,yoA=l.a[miSi]||{},tom=[];
    for(var k4=0;k4<l.n;k4++)if(k4!==miSi&&l.a[k4])tom.push(l.a[k4].cc!=null?l.a[k4].cc:dts[k4]);
    ui.modal={tipo:'editDT',online:true,i:v4,r:miCus?JSON.parse(JSON.stringify(miCus)):null,nombre:yoA.nom||miNombre()||P.DTS[v4].nombre,cc:yoA.cc!=null?yoA.cc:v4,tomados:tom};pintarModal(null,null,null);};});
  // Tocando tu Cábala pasa al color siguiente que no use otro DT
  app.querySelectorAll('[data-lcc]').forEach(function(x){x.onclick=function(){lob(function(y){var dd=y.dts||[0,1,2,3,4],me=-1,tom=[];y.a.forEach(function(q,k){if(q&&q.id===id&&k<y.n)me=k;});if(me<0)return;
    for(var k4=0;k4<y.n;k4++)if(k4!==me&&y.a[k4])tom.push(y.a[k4].cc!=null?y.a[k4].cc:dd[k4]);
    y.a[me].cc=colorSiguiente(y.a[me].cc!=null?y.a[me].cc:dd[me],tom);});};});
  // Sumar o sacar un DT: los que juegan son los primeros n de la lista
  app.querySelectorAll('[data-ltog]').forEach(function(x){x.onclick=function(){var v5=+x.dataset.ltog,ixv=dts.indexOf(v5);
    if(ixv<l.n&&l.n<=2){mostrarAviso('Tienen que jugar 2 DTs como mínimo.');return;}
    lob(function(y){var dd=y.dts||[0,1,2,3,4],o=dd.indexOf(v5);
      if(o<y.n){if(y.n<=2||(y.a[o]&&!y.a[o].bot))return;dd.splice(o,1);dd.push(v5);y.a.splice(o,1);y.a.push(null);y.n--;}
      else{if(y.n>=5)return;var t=dd[y.n];dd[y.n]=v5;dd[o]=t;y.a[y.n]=null;y.n++;}
      y.dts=dd;});};});
  document.getElementById('copiarLink').onclick=function(){try{navigator.clipboard.writeText(link).then(function(){mostrarAviso('Link copiado.');},function(){mostrarAviso(link);});}catch(e){mostrarAviso(link);}};
  document.getElementById('dejarLobby').onclick=function(){if(!host)lob(function(x){x.a=x.a.map(function(q){return q&&q.id===id?null:q;});});dejarSala(true);pantallaInicio();};
  app.querySelectorAll('[data-ll]').forEach(function(x){x.onclick=function(){lob(function(y){y.limite=+x.dataset.ll;});};});
  app.querySelectorAll('[data-lm]').forEach(function(x){x.onclick=function(){lob(function(y){y.modo=x.dataset.lm;});};});
  app.querySelectorAll('[data-verficha]').forEach(function(x){x.onclick=function(){ui.modal={tipo:'dt',dt:+x.dataset.verficha};pintarModal(null,null,null);};});
  app.querySelectorAll('[data-lpick]').forEach(function(x){x.onclick=function(){var v2=+x.dataset.lpick;lob(function(y){var dd=y.dts||[0,1,2,3,4],me=-1;y.a.forEach(function(q,ix2){if(q&&q.id===id&&ix2<y.n)me=ix2;});if(me<0)return;var o=dd.indexOf(v2);if(o===me)return;if(o<y.n&&y.a[o]&&!y.a[o].bot)return;var t=dd[me];dd[me]=v2;dd[o]=t;y.dts=dd;});};});
  app.querySelectorAll('[data-lb]').forEach(
function(x){x.onclick=function(){var k=+x.dataset.lb;lob(function(y){if(y.a[k]&&!y.a[k].bot)return;y.a[k]=y.a[k]?null:{bot:true};});};});
  var ar=document.getElementById('arrancar');if(ar)ar.onclick=function(){
    var d=[];for(var i2=0;i2<l.n;i2++){var q=l.a[i2],dq2=dts[i2];d.push({dt:dq2,nombre:q.bot?P.DTS[dq2].nombre:(q.nom||P.DTS[dq2].nombre),bot:!!q.bot,cid:q.id||null,cus:q.cus||null,cc:q.cc!=null?q.cc:null});}
    var txt=JSON.stringify(P.nuevaPartida({dts:d,modo:l.modo,limite:l.limite||0,semilla:Math.floor(Math.random()*1e9),t0:Date.now(),host:l.host}));
    sala.red.transaccion('partida',function(cur){if(cur)return;return txt;},function(ok){if(ok)lob(function(y){y.empezo=true;});});};
}
// En la compu: al cambiar el tamaño de la ventana se reacomoda, y la barra espaciadora tira los dados
var tamT=null;window.addEventListener('resize',function(){clearTimeout(tamT);tamT=setTimeout(function(){if(sala.g&&!ui.modal)pintar();},250);});
document.addEventListener('keydown',function(ev){if(ev.code!=='Space'||ev.repeat)return;var t=ev.target;if(t&&/INPUT|TEXTAREA|BUTTON|SELECT/.test(t.tagName))return;var b=document.getElementById('tirar');if(b&&!document.querySelector('.modal')){ev.preventDefault();b.click();}});
pintar();
(function(){var c=new URLSearchParams(location.search).get('sala');if(c&&window.PEXA_RED&&PEXA_RED.disponible()&&!sala.g){var n=miNombre();if(n)entrarSala(c.toUpperCase(),n);}})();
// ---------- Tutorial: una partida guionada sobre el tablero de verdad, con las mismas ventanas del juego. No pasa por el motor ni guarda nada. ----------
function tutoNuevo(){
  var g=P.nuevaPartida({dts:[{dt:0,nombre:'Vos'},{dt:1},{dt:2}],semilla:4242});
  g.jug[1].pos=P.BASE.B+2;g.jug[2].pos=P.BASE.B+4;g.barras=[];g.fase='canje';g.turno=0;g.oferta=null;
  return {g:g,i:0,hist:[]};
}
function cobraTuto(g,d){
  var cob=[];d.forEach(function(x){g.porNum[x].forEach(function(a){var r=g.rec[a];if(!r)return;g.jug.forEach(function(p){if(p.pos>=0&&P.NODOS[p.pos].areas.indexOf(a)>=0){p.mano[r]++;cob.push({j:p.id,r:r,n:1});}});});});
  g.dados=d;g.nTirada++;g.tiradas.push({d:d,j:0});g.ultTiro={n:g.nTirada,j:0,d:d,cob:cob,mul:[],sinB:[]};ui.tiradaT=Date.now();mostrarTiro(d);return cob;
}
function tutoRec(g){return P.REC.filter(function(r){return g.jug[0].mano[r]>0;})[0]||'gol';}
// La oferta del tutorial tiene que poder aceptarse: te pide algo que tenés (lo que más te sobra) y te da algo que el rival tiene y a vos te falta
function tutoTrato(g){var me=g.jug[0],ri=g.jug[1],mas=function(a,b){return me.mano[b]-me.mano[a];};
  var us=P.REC.filter(function(k){return P.usable(me,k);});if(!us.length){P.REC.forEach(function(k){me.multas[k]=0;});us=P.REC.slice();}
  var r=us.sort(mas)[0];if(me.mano[r]<1){me.mano[r]=1;}
  var o=P.REC.filter(function(k){return k!==r;}).sort(function(a,b){return me.mano[a]-me.mano[b];})[0];if(ri.mano[o]<1){ri.mano[o]=1;}
  var d=P.vacio(),p=P.vacio();d[o]=1;p[r]=1;return {doy:d,pido:p};}
function tutoFilas(l){return '<div class="tuto-filas">'+l.map(function(x){return '<div class="ff"><span class="ff-ic">'+x[0]+'</span><div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>';}).join('')+'</div>';}
var TUTO=[
  {tit:'Sos el DT',txt:function(){return 'Tu objetivo es armar un equipo de <b>4 Jugadores</b> y <b>levantar la Copa</b> en el centro de la isla, antes que nadie.';},marc:function(){return [P.CENTRO];},boton:'Empezar'},
  {tit:'Elegí dónde arrancar',txt:function(){return 'Cada pieza de color da un <b>Recurso</b>. Tu Cábala cobra de las piezas que toca. Tocá una de las esquinas que titilan: arrancás con 1 de cada pieza.';},
    marc:function(g){return [0,1,2,3,4].map(function(i){return P.BASE.B+i;}).filter(function(k){return !P.ocupado(g,k);});},
    tap:function(g,k){var me=g.jug[0];me.pos=k;P.NODOS[k].areas.forEach(function(a){if(g.rec[a])me.mano[g.rec[a]]++;});var li=[0,1,2,3,4].map(function(i){return P.BASE.B+i;}).filter(function(x){return !P.ocupado(g,x);});g.barras=[li[0]];}},
  {tit:'Tirá los dados',txt:function(){return 'Cada dado activa las piezas con ese número. <b>Cobran todas</b> las Cábalas que las tocan, aunque no sea su turno. Por eso se juega todo el tiempo. Ese ñoqui es un <b>Barrabrava</b>: enseguida vas a ver qué hace.';},
    boton:'Tirar los dados',acc:function(g){var me=g.jug[0],ar=P.NODOS[me.pos].areas.filter(function(a){return g.rec[a]&&g.num[a]!==3;});cobraTuto(g,[g.num[ar[0]],3]);}},
  {tit:function(g){return '¡Salieron '+g.dados[0]+' y '+g.dados[1]+'!';},txt:function(g){return textoTirada(g)+' A la izquierda del tablero queda siempre lo que dio la última tirada.';},boton:'Seguir'},
  {tit:'Mové tu Cábala',txt:function(g){return 'El <b>dado blanco</b> te dice cuánto caminás, exacto: '+g.dados[1]+' pasos. Tocá la casilla roja: es un <b>Mercado de Pases</b>, donde están los Jugadores.';},
    marc:function(g){return [P.MERCADOS[P.NODOS[g.jug[0].pos].i]];},
    tap:function(g,k){g.jug[0].pos=k;var pos=P.ANILLO.indexOf(g.barras[0]),sig=P.ANILLO[(pos+1)%15];if(g.jug.some(function(q){return q.pos===sig;}))sig=P.ANILLO[(pos+2)%15];g.barras=[sig];}},
  {tit:'Los Barrabravas avanzan solos',txt:function(){return 'El ñoqui avanzó una esquina en sentido horario. Este es su recorrido entero, la <b>Avenida Circunvalación</b>. Nadie puede pasar por donde está, así que a veces te cierra el camino que querías.';},
    encima:function(){return '<polygon class="ruta" points="'+P.ANILLO.map(function(k){return XY[k][0].toFixed(1)+','+XY[k][1].toFixed(1);}).join(' ')+'" pointer-events="none"/>';},boton:'Seguir'},
  {tit:'¡Cuidado con las zonas oscuras!',txt:function(){return 'Tu Cábala toca una zona de <b>Mala Fama</b> y salió su número: te cayó una <b>Multa</b>. Traba las cartas de ese Recurso (mirá las grises en tu mano) hasta que la pagues. Tocá <b>Negocios</b> y pagala.';},
    prep:function(g){var me=g.jug[0],z=11+P.NODOS[me.pos].i;cobraTuto(g,[g.num[z],g.num[z]===2?3:2]);var r=tutoRec(g);me.multas[r]=1;g.ultTiro.mul.push({j:0,r:r});},
    boton:'Negocios',claseBoton:'bt-neg',abre:'canjes',obj:'[data-pagar]',acc:function(g){var me=g.jug[0],r=P.REC.filter(function(k){return me.multas[k];})[0];me.multas[r]=0;me.mano[r]--;mostrarPagoMulta(g,{j:0,r:r});}},
  {tit:'Canjeá Recursos por Tokens',txt:function(){return 'Con Recursos se compran <b>Tokens</b>, y con Tokens se contratan Jugadores. Para que no tengas que esperar, te adelantamos lo que falta. Tocá <b>Negocios</b> y comprá el de Victoria.';},
    prep:function(g){var me=g.jug[0];P.REC.forEach(function(r){me.mano[r]=Math.max(me.mano[r],(P.PRECIO.V[r]||0)+(P.PRECIO.E[r]||0));});},
    boton:'Negocios',claseBoton:'bt-neg',abre:'canjes',obj:'[data-token="V"]',acc:function(g){var me=g.jug[0];for(var r in P.PRECIO.V)me.mano[r]-=P.PRECIO.V[r];me.V=1;mostrarToken(g,{j:0,tk:'V'});}},
  {tit:'Y otro de Efectivo',txt:function(){return 'En el Partido completo, cada Jugador cuesta uno de cada uno. En el Partido rápido, 1 solo. Tocá <b>Negocios</b> y comprá el de Efectivo.';},
    boton:'Negocios',claseBoton:'bt-neg',abre:'canjes',obj:'[data-token="E"]',acc:function(g){var me=g.jug[0];for(var r in P.PRECIO.E)me.mano[r]-=P.PRECIO.E[r];me.E=1;mostrarToken(g,{j:0,tk:'E'});}},
  {tit:'Contratá a tu primer Jugador',txt:function(){return 'Estás parado en un Mercado de Pases. Entrá, tocá un Jugador y contratalo. Podés entrar y salir todas las veces que quieras en tu turno.';},
    boton:'Entrar al Mercado de Pases',claseBoton:'rojo',abre:'mercado',
    elige:function(g,i){var me=g.jug[0],m=g.mercados[g.mercadoAbierto],c=m.splice(i,1)[0];me.eq[c.pos]=c;me.V=0;me.E=0;g.mercadoAbierto=null;ui.mercSel=null;mostrarFichaje(g,{j:0,c:c,cambio:false});}},
  {tit:'Te hacen una oferta',txt:function(){return 'En cualquier momento un DT puede ofrecerte un trato. Lo que a vos te sobra, a otro le falta. Contestale.';},
    prep:function(g){var t=tutoTrato(g);g.oferta={de:1,a:0,doy:t.doy,pido:t.pido,contras:0};},oferta:true,
    acc:function(g,si){var o=g.oferta,me=g.jug[0];g.oferta=null;if(si){P.REC.forEach(function(k){me.mano[k]+=o.doy[k]-o.pido[k];});mostrarTrueque(g,{t:'trato',de:1,a:0,doy:o.doy,pido:o.pido});}}},
  {tit:'Los Beneficios cambian todo',txt:function(){return 'Cuestan '+precioIc(P.PRECIO.B,20)+' y son cartas sorpresa: robarle a un rival, patear un penal, viajar en jet privado. Se usan desde tu próximo turno. Mirá las de tu mano: <b>tocá una</b> para verla en grande.';},
    prep:function(g){g.jug[0].benef=['barrida','penal','jet'];},boton:'Seguir',acc:function(g){g.jug[0].benef=[];}},
  {tit:'Cómo se gana',txt:function(){return 'No hay un solo camino. Mirá abajo algunas ideas para arrancar.';},
    extra:function(){return '<h3 class="tuto-tit">Algunos tips para tener en cuenta</h3>'+tutoFilas([[iconoCirc('gol',30)+iconoCirc('fans',30),'Tocá colores distintos','Parate donde se juntan piezas de números distintos: vas a cobrar más seguido.'],['<span class="ff-pos">DEL</span>','Buscá un buen Delantero','Cobra el doble de su Recurso. Si es del que más sale en tu zona, te adelantás.'],[iconoMulta('fans',30),'Esquivá las zonas oscuras','Una Multa te traba el Recurso justo cuando lo necesitás.'],['<span class="ff-pos">DEF</span>','No te olvides del Defensor','Su Multa te rebota, y si un rival la paga, ese pago es tuyo.'],[icoBinoculares(30),'Espiá antes de ir','Desde un vértice del Palco ves uno de los dos Mercados más cercanos y evitás caminar al pedo.'],['<i class="ej-fl">⇄</i>','Negociá todo el tiempo','Muchas veces el Recurso que te falta lo tiene alguien que le sobra.'],['<b class="ej-n">9</b>','No juntes más de 9','Si ya tenías más de 9 cuando sale un 1, devolvés la mitad. Gastá antes.'],['<span class="ben-d">'+K.dorso('Beneficio')+'</span>','Guardate un Beneficio','Sirve para frenar al que está por levantar la Copa.']]);},boton:'Seguir'},
  {tit:'¡Levantá la Copa!',txt:function(){return 'Pasaron los turnos: ya tenés los 4 Jugadores, 1 Recurso de cada tipo y ninguna Multa. El dado blanco marca 2, el número justo: un paso hasta un vértice del Palco y otro al centro. <b>Tocá el centro.</b>';},
    prep:function(g){var me=g.jug[0],li=[0,1,2,3,4].map(function(i){return P.BASE.B+i;}).filter(function(k){return !P.ocupado(g,k,0);});me.eq=[{club:'gol',pos:0},{club:'suerte',pos:1},{club:'picardia',pos:2},{club:'fans',pos:3}];P.REC.forEach(function(r){me.mano[r]=1;me.multas[r]=0;});me.pos=li[0];g.dados=[4,2];g.tiradas.push({d:g.dados,j:0});g.nTirada++;g.ultTiro={n:g.nTirada,j:0,d:g.dados,cob:[],mul:[],sinB:[]};},
    marc:function(){return [P.CENTRO];},tap:function(g){g.ganador=0;g.nTurnos=28;g.jug[0].pos=P.CENTRO;mostrarMundial(g);var b=document.getElementById('muListo');if(b)b.textContent='Seguir';}},
  {tit:'¡Ya sabés jugar!',txt:function(){return 'Si te olvidás de algo, en Reglas está todo con ejemplos, y tocando cualquier pieza del tablero te cuenta para qué sirve.';},fin:true}
];
// Antes de cada jugada se guarda una foto de todo: "Atrás" vuelve exactamente a como estaba
function tutoHacer(fn){
  var t=ui.tuto;t.hist.push(JSON.stringify(t.g));fn(t.g);
  function sigue(){t.i++;var p=TUTO[t.i];if(p&&p.prep)p.prep(t.g);ui.modal=null;pintarTuto();window.scrollTo(0,0);}
  if(document.querySelector('.mundial'))document.getElementById('muListo').addEventListener('click',sigue);else sigue();
}
function tutoSalir(){ui.tuto=null;ui.tutoHook=null;ui.modal=null;ui.oferta=null;limpiarModales();pantallaInicio();window.scrollTo(0,0);}
function pintarTuto(){
  var t=ui.tuto,g=t.g,p=TUTO[t.i],me=g.jug[0],m=p.marc?p.marc(g):[],val=function(x){return typeof x==='function'?x(g):x;},c=P.DTS[0];
  var h='<div class="juego tuto"><div class="barra">'+cono(0,28)+'<div class="q"><b>Tutorial</b><span>Paso '+(t.i+1)+' de '+TUTO.length+'</span></div><button class="x-cerrar" id="tutoX" aria-label="Salir del Tutorial">✕</button></div>';
  h+='<div class="col-mesa">'+conDT(g,'<div class="relator" style="--dtc:'+c.color+';--dtt:'+c.tinta+'"><span class="rel-tag">El Relator</span><b class="rel-tit">'+val(p.tit)+'</b><div class="rel-x">'+p.txt(g)+'</div>'+(p.oferta&&g.oferta?panelOferta(g,0):'')+'</div>')+'<div class="tuto-barra"><i style="width:'+Math.round((t.i+1)/TUTO.length*100)+'%"></i></div><div class="mesa">'+tiradaCol(g)+dibujarTablero(g,m,p.encima?p.encima():'')+historial(g)+'<button class="vista-tab" id="vistaTab">'+(ui.vista==='det'?(ui.arteHaciendo?'Armando el tablero…':'Ver tablero simplificado'):'Ver tablero detallado')+'</button>'+(p.boton==='Tirar los dados'?dadosMesa('tutoDados'):'')+'</div></div>';
  h+='<div class="col-der">'+(p.extra?'<div class="panel tuto-extra">'+p.extra(g)+'</div>':'')+manos(g,0,false);
  if(p.fin)h+='<div class="acc-prim"><button class="bt gr fuerte ancho" id="tutoVolver">Volver al inicio</button></div>';
  else h+='<div class="acc-prim">'+(t.i?'<button class="bt gr" id="tutoAtras">Atrás</button>':'')+(p.boton==='Tirar los dados'?'<span class="tuto-toca">Tocá los dados en el tablero</span>':p.boton?'<button class="bt gr '+(p.claseBoton||'oro')+'" id="tutoSig">'+(p.claseBoton==='bt-neg'?ICO_TRATO+'<span>'+esc(p.boton)+'</span>':esc(p.boton))+'</button>':'<span class="tuto-toca">'+(p.tap?'Tocá en el tablero':'Contestá la oferta')+'</span>')+'</div>';
  app.innerHTML=h+'</div></div>';
  conectarEn(app,g,0,me);conectarManos();conectarAsa(g);
  function on(id,fn){var x=document.getElementById(id);if(x)x.onclick=fn;}
  on('tutoX',tutoSalir);on('tutoVolver',tutoSalir);
  on('tutoAtras',function(){t.i--;t.g=JSON.parse(t.hist.pop());ui.modal=null;ui.mercSel=null;var v=document.querySelector('.mundial');if(v)v.remove();pintarTuto();window.scrollTo(0,0);});
  on('tutoDados',function(){tutoHacer(function(x){if(p.acc)p.acc(x);});});
  on('tutoSig',function(){if(p.abre){if(p.abre==='mercado')g.mercadoAbierto=P.NODOS[me.pos].i;ui.modal={tipo:p.abre};pintarTuto();return;}tutoHacer(function(x){if(p.acc)p.acc(x);});});
  on('vistaTab',function(){ui.vista=ui.vista==='det'?'simple':'det';try{localStorage.setItem('pexa-vista',ui.vista);}catch(e){}pintarTuto();});
  // La oferta se contesta en serio; la contraoferta queda para cuando juegues
  app.querySelectorAll('[data-resp]').forEach(function(b){b.onclick=function(){var si=b.dataset.resp==='1';tutoHacer(function(x){p.acc(x,si);});};});
  var cof=document.getElementById('contraof');if(cof)cof.disabled=true;
  // Las ventanas son las del juego: acá solo queda habilitado lo que hay que hacer en este paso
  ui.tutoHook=function(c2,M){var q=TUTO[ui.tuto.i];if(!q.abre||M.tipo!==q.abre)return;
    if(M.tipo==='mercado'){c2.querySelectorAll('[data-contratar]').forEach(function(b){b.onclick=function(){var i=+b.dataset.contratar;limpiarModales();tutoHacer(function(x){q.elige(x,i);});};});return;}
    c2.querySelectorAll('button').forEach(function(b){if(b.classList.contains('x-cerrar'))return;if(b.matches(q.obj)&&!b.disabled){b.classList.add('tuto-obj');b.onclick=function(){limpiarModales();tutoHacer(function(x){q.acc(x);});};}else b.disabled=true;});};
  var sv=document.getElementById('tablero');if(sv&&p.tap)sv.addEventListener('click',function(ev){var pt=sv.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;var q=pt.matrixTransform(sv.getScreenCTM().inverse()),mejor=null,bd=30;m.forEach(function(k){var d=Math.hypot(XY[k][0]-q.x,XY[k][1]-q.y);if(d<bd){bd=d;mejor=k;}});if(mejor!=null)tutoHacer(function(x){p.tap(x,mejor);});});
  limpiarModales();if(ui.modal)pintarModal(g,0,me);
  if(window.innerWidth<1000&&p.extra){var ex=app.querySelector('.tuto-extra');if(ex&&t.i>0)setTimeout(function(){ex.scrollIntoView({behavior:'smooth',block:'nearest'});},350);}
}
window.PEXA_SALA=sala;window.PEXA_UI=ui;window.PEXA_PINTAR=pintar;
})();
