// PEXA digital: la pantalla. Todo lo que muestra sale del estado y toda jugada va por sala.enviar(), así después se cambia
// la Sala local por una Sala en internet sin tocar el resto: cada celu ve el mismo estado y manda sus jugadas.
(function(){
'use strict';
var P=window.PEXA, I=window.PEXA_ICONOS, K=window.PEXA_CARTAS, app=document.getElementById('app');
var INK=I.INK, CREMA=I.CREMA, COL={};P.REC.forEach(function(r){COL[r]=I.C[r].c1;});
var ZONA_TXT=['Cobran una fortuna y te mandan al lado del pantano.','El que lo maneja es un delincuente y te vende gato por liebre. Aparte sale carísimo y la comida siempre está seca.','Donde descansan las rodillas del plantel.','El diario de Pipes: usa el micrófono para defenestrar a los jugadores que le sacan la valla invicta.','El Sapo te cobra la inscripción por adelantado y te cambia el horario a último momento.'];
var PIZ=[
  {tit:'La Pizarra del Abuelo',sup:'#f1eee6',t:'#2b2620',t2:'rgba(43,38,32,.66)',marco:'#e4ded2',frase:'El que no arriesga no pierde, pibe.',como:'Dirigió en todas las canchas de la isla, algunas antes de que existieran. Anteojos redondos, brazos cruzados y un consejo para cada ocasión, lo hayas pedido o no.',estilo:'Sin apuro y sin riesgos. Primero las cuentas claras: las Multas al día y la plata guardada. Al Palco se llega caminando, pero se llega.'},
  {tit:'La Pizarra del Míster',sup:'#232528',t:'#efe9da',t2:'rgba(239,233,218,.66)',marco:'#3a3a40',frase:'En Europa esto no pasa.',como:'Pasó seis meses en Europa y volvió con corbata y acento. Pelado, barba gris y una ceja siempre levantada: todo le parece mejorable, sobre todo vos.',estilo:'Plan a largo plazo y mercado internacional. Mira los Mercados de Pases antes que nadie, ficha lo justo y negocia como si cerrara un traspaso millonario.'},
  {tit:'La Pizarra de la Doña',sup:'#f3c4d6',t:'#3a1f2b',t2:'rgba(58,31,43,.68)',marco:'#e0609a',frase:'Acá se viene a entrenar.',como:'Alta, flaca y con un silbato que se escucha del otro lado del río. Ella dice que tiene los ojos verdes y media tribuna jura que son marrones: son verdes, con una pincelada de miel.',estilo:'Orden y sushi. Está convencida de que un buen roll antes de entrenar sube el rendimiento de cualquier Jugador. Arma el equipo por posiciones y en un trato no regala nada.'},
  {tit:'La Pizarra del Terror del Río',sup:'#3f2c5e',t:'#f1e8f7',t2:'rgba(241,232,247,.68)',marco:'#7b4fa0',frase:'¡Para adelante, siempre para adelante!',como:'Pelo gris, entradas bien ganadas y una sonrisa gigante que se ve desde la otra orilla. Le dicen el Terror, pero el único que se asusta es el rival.',estilo:'Todo al ataque y con la mejor cara. Primero el Delantero y después vemos. Se come las Multas sonriendo y hace las cuentas cuando ya está adentro del Palco.'},
  {tit:'La Pizarra del Gallo',sup:'#bfe3f1',t:'#14313d',t2:'rgba(20,49,61,.68)',marco:'#4fb8d8',frase:'¡Posición de preacción!',como:'Cresta, pico y silbato. El profe de fútbol del colegio, el más querido por todos sus alumnos: generaciones enteras todavía se paran como él les enseñó.',estilo:'Todo empieza antes de que pase algo: rodillas flexionadas, cuerpo listo y la vista en la jugada. Se para donde va a caer la tirada y cuando salen los dados ya está en posición.'}];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function el(html){var d=document.createElement('div');d.innerHTML=html;return d;}
function icono(r,w){return '<svg viewBox="0 0 100 100" width="'+(w||46)+'" height="'+(w||46)+'" role="img" aria-label="'+P.NOMBRE_REC[r]+'">'+K.badge(r)+'</svg>';}
function iconoMulta(r,w){return '<svg viewBox="0 0 100 100" width="'+(w||46)+'" height="'+(w||46)+'" role="img" aria-label="'+P.MULTA[r]+'">'+I.multa(r)+'</svg>';}
function token(t,w){return '<span class="tk" style="width:'+w+'px;height:'+w+'px" role="img" aria-label="Token de '+(t==='V'?'Victoria':'Efectivo')+'">'+(t==='V'?K.tokenV():K.tokenE())+'</span>';}
function cono(d,w){var c=P.DTS[d];return '<svg class="cono" viewBox="0 0 24 28" width="'+(w||26)+'" height="'+((w||26)*28/24)+'" aria-hidden="true"><path d="M12 1.5L20 22H4Z" fill="'+c.color+'" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><rect x="1.5" y="21.5" width="21" height="5" rx="1.6" fill="'+c.color+'" stroke="#111" stroke-width="1.6"/></svg>';}
// Precio con los dibujos de los Recursos: 2 de Gol son dos pelotas
function precioIc(m,w){var s='';P.REC.forEach(function(r){for(var i=0;i<(m[r]||0);i++)s+=icono(r,w||24);});return '<span class="ics">'+s+'</span>';}
function nombreMercado(g,m){return 'Mercado del '+g.num[11+m]+' · '+P.ZONA[m];}
var PIPS={1:[[20,20]],2:[[11,11],[29,29]],3:[[11,11],[20,20],[29,29]],4:[[11,11],[29,11],[11,29],[29,29]],5:[[11,11],[29,11],[20,20],[11,29],[29,29]],6:[[11,11],[29,11],[11,20],[29,20],[11,29],[29,29]]};
function dado(n,tipo,s,cls){var az=tipo==='a',pip=az?'#fff':INK;return '<svg class="dd'+(cls?' '+cls:'')+'" viewBox="0 0 40 40" width="'+s+'" height="'+s+'" role="img" aria-label="Dado '+(az?'azul':'blanco')+': '+n+'"><rect x="2" y="2" width="36" height="36" rx="8" fill="'+(az?'#3f6aa6':'#fbf8f1')+'" stroke="'+INK+'" stroke-width="2.6"/>'+PIPS[n].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.7" fill="'+pip+'"/>';}).join('')+'</svg>';}

// ---------- La Sala: guarda el estado y reparte las jugadas ----------
var CLAVE='pexa-partida';
var sala={g:null,
  guardar:function(){try{localStorage.setItem(CLAVE,JSON.stringify(this.g));}catch(e){}},
  cargar:function(){try{var t=localStorage.getItem(CLAVE);if(t){var g=JSON.parse(t);g.tiradas=g.tiradas||[];g.nTirada=g.nTirada||0;g.nEvento=g.nEvento||0;g.nLog=g.nLog||0;g.evs=g.evs||[];if(g.fase==='barras'&&!g.barraPend)g.barraPend=g.barras.map(function(b,i){return i;});g.barraPend=g.barraPend||[];this.g=g;return true;}}catch(e){}return false;},
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
    this.red.transaccion('partida',function(cur){if(cur==null)return null;var g=JSON.parse(cur);err=null;try{P.accion(g,j,a);}catch(e){err=e.message;return;}g.nA=(g.nA||0)+1;return JSON.stringify(g);},
      function(ok){if(err)mostrarError(err);else if(ok&&luego){luego();pintar();}});
    return true;},
  jugarBotRed:function(q,nA){
    this.red.transaccion('partida',function(cur){if(cur==null)return null;var g=JSON.parse(cur);if((g.nA||0)!==nA||P.quienDebe(g).indexOf(q)<0||!g.jug[q].bot)return;var a=P.botAccion(g,q);if(!a)return;try{P.accion(g,q,a);}catch(e){return;}g.nA=(g.nA||0)+1;return JSON.stringify(g);},function(){});},
  // Llegó el estado nuevo de la sala
  recibir:function(txt){
    var ant=this.g,g=JSON.parse(txt);this.g=g;
    if(ant&&ant.oferta&&!g.oferta&&ant.oferta.de===this.asiento){var pub=g.log.filter(function(l){return l.solo<0;}),u=pub[pub.length-1];if(u&&/dice que no|Nadie toma/.test(u.t))mostrarAviso(u.t);}
    var tocaba=ant&&P.quienDebe(ant).indexOf(this.asiento)>=0,toca=P.quienDebe(g).indexOf(this.asiento)>=0;
    if(!tocaba&&toca&&g.fase!=='fin'){try{if(navigator.vibrate)navigator.vibrate(180);}catch(e){}}
    document.title=toca&&g.fase!=='fin'?'¡Te toca! · PEXA':'PEXA Dream Team';
    pintar();avanzarBots();}
};
var ui={tab:'canjes',yo:null,cubierto:false,modal:null,bancoDa:null,descarte:null,barraSel:null,verDT:null,tiradaVista:null,tiradaT:0,eventoVisto:null,cola:[],animando:false,logVisto:null,festejo:false,sinAnim:false,lobby:null};
try{ui.sinAnim=localStorage.getItem('pexa-sin-anim')==='1';}catch(e){}
function humanos(g){return g.jug.filter(function(p){return !p.bot;});}
function aviso(m,cls,ms){var v=document.querySelector('.toast');if(v)v.remove();var t=el('<div class="toast '+cls+'" role="alert">'+esc(m)+'</div>').firstChild;document.body.appendChild(t);setTimeout(function(){t.remove();},ms);}
function mostrarError(m){aviso(m,'',3200);}
function mostrarAviso(m){aviso(m,'ok',3800);}

// Los DTs automáticos juegan de a una jugada, con una pausa para poder seguirlos. Si la persona tiene una ventana abierta, esperan.
var timerBot=null;
function avanzarBots(){
  clearTimeout(timerBot);var g=sala.g;if(!g||g.fase==='fin'||ui.animando||ui.cola.length||ui.pausa)return;
  var enRed=!!sala.red;if(!enRed&&ui.modal)return;
  var q=P.quienDebe(g).filter(function(j){return g.jug[j].bot;})[0];
  if(q==null)return;
  var hay=humanos(g).length>0,espera=g.fase==='canje'?(hay?420:200):650;
  if(g.fase==='canje'&&hay&&!g.oferta){var pre=P.botAccion(JSON.parse(JSON.stringify(g)),q);if(pre&&pre.t==='fin')espera=1700;} // da tiempo a ofrecerle un trato antes de que termine
  var fresca=Date.now()-ui.tiradaT;if(fresca<1500)espera=Math.max(espera,1500-fresca);
  // En una sala, a las máquinas las juega el celu que armó la sala; si ese se durmió, las juega cualquier otro
  if(enRed&&!sala.soyHost)espera+=6000;
  timerBot=setTimeout(function(){if(!sala.g)return;if(enRed){sala.jugarBotRed(q,sala.g.nA||0);return;}if(ui.modal)return;var a=P.botAccion(sala.g,q);if(a)sala.enviar(q,a);},espera);
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
function dibujarTablero(g,marcados){
  var s='<svg id="tablero" viewBox="-252 -252 504 504" role="img" aria-label="Isla Pexa">';
  s+='<circle r="250" fill="#8fc3df"/>';
  s+='<polygon points="'+pts([].concat.apply([],[0,1,2,3,4].map(function(i){return [Dm[i],E[i],Dp[i],F[i]];})).map(function(p){return [p[0]*1.07,p[1]*1.07];}))+'" fill="#e8dcbc" stroke="#d2c29a" stroke-width="2"/>';
  for(var a=1;a<=15;a++){var pg=poligono(a),c=cen(pg),r=g.rec[a];
    s+='<polygon points="'+pts(pg)+'" fill="'+(r?COL[r]:'#5a5550')+'"/>';
    if(r&&a>5)s+='<g transform="translate('+(c[0]-14).toFixed(1)+' '+(c[1]-28).toFixed(1)+') scale(.28)">'+K.badge(r)+'</g>';
    var ny=r&&a>5?c[1]+13:c[1];
    s+='<circle cx="'+c[0].toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="15" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.2"/><circle cx="'+c[0].toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="12.4" fill="'+(r?COL[r]:'#111')+'"/><text x="'+c[0].toFixed(1)+'" y="'+(ny+7).toFixed(1)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="20" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.8" paint-order="stroke">'+g.num[a]+'</text>';}
  // El Palco, con una cara de cada color y su lugar del campeón
  for(var i=0;i<5;i++)s+='<polygon points="'+pts([[0,0],A[prev(i)],A[i]])+'" fill="'+COL[P.INNER[i]]+'"/>';
  // senderos
  var d='';P.ADJ.forEach(function(l,u){l.forEach(function(v){if(u<v)d+='M'+XY[u][0].toFixed(1)+' '+XY[u][1].toFixed(1)+'L'+XY[v][0].toFixed(1)+' '+XY[v][1].toFixed(1);});});
  s+='<path d="'+d+'" stroke="'+INK+'" stroke-width="8.4" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#fbfbf9" stroke-width="6" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#bdbdbd" stroke-width=".6" stroke-dasharray="2.4 2.2" fill="none"/>';
  for(var i2=0;i2<5;i2++){var pa=A[i2];s+='<path d="M0 0L'+pa[0].toFixed(1)+' '+pa[1].toFixed(1)+'" stroke="#e8c98f" stroke-width="5"/>';}
  // El centro del Palco: en este formato, su número
  s+='<circle r="15" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.2"/><circle r="12.4" fill="#b8862b"/><text y="7" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="20" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.8" paint-order="stroke">1</text>';
  // Las piezas que se activan con la tirada se iluminan
  var pasado=Date.now()-ui.tiradaT;
  if(g.dados&&pasado<3200){var vis={};g.dados.forEach(function(x){g.porNum[x].forEach(function(ar){vis[ar]=1;});});
    Object.keys(vis).forEach(function(ar){s+='<polygon class="activa" style="animation-delay:-'+(pasado/1000).toFixed(2)+'s" points="'+pts(poligono(+ar))+'" pointer-events="none"/>';});}
  // esquinas, Mercados y Boleterías
  P.NODOS.forEach(function(n){var q=XY[n.id],x=q[0].toFixed(1),y=q[1].toFixed(1);
    if(n.t==='E'){s+='<rect x="'+(q[0]-15)+'" y="'+(q[1]-11)+'" width="30" height="22" rx="3" fill="#b8323a" stroke="'+INK+'" stroke-width="1.2"/><rect x="'+(q[0]-11.5)+'" y="'+(q[1]-7.5)+'" width="23" height="15" rx="1.5" fill="#fdf3d2"/><text x="'+x+'" y="'+(q[1]+3)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="8.4" fill="#b8323a">'+g.mercados[n.i].length+'/4</text>';return;}
    if(n.t==='F'){var bo=g.rec[6+n.i];s+='<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+COL[bo]+'" stroke="'+INK+'" stroke-width="1.3"/><circle cx="'+x+'" cy="'+y+'" r="6.6" fill="#fbf8f1"/><text x="'+x+'" y="'+(q[1]+2.6)+'" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="7" fill="'+INK+'">$</text>';return;}
    var ar=n.t==='B';s+='<circle cx="'+x+'" cy="'+y+'" r="7" fill="#fdfdfb" stroke="'+(ar?'#b8862b':INK)+'" stroke-width="'+(ar?2.2:1.1)+'"/>';
    if(n.t==='Dp'||n.t==='Dm'){var b2=P.boleDe(g,n.id);s+='<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+COL[b2]+'"/>';}
  });
  // Barrabravas: ñoquis
  g.barras.forEach(function(k,ib){var q=XY[k];if(ui.barraSel===ib&&g.fase==='barras')s+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="20" fill="none" stroke="#ffe27a" stroke-width="4"/>';s+='<g transform="translate('+q[0].toFixed(1)+' '+q[1].toFixed(1)+') scale(1.35)"><ellipse rx="11" ry="8" fill="#dcb98a" stroke="'+INK+'" stroke-width="1.4"/><path d="M-6-5q1.6 5 0 10M-2-6.6q1.6 6.6 0 13.2M2-6.6q1.6 6.6 0 13.2M6-5q1.6 5 0 10" fill="none" stroke="#a9825c" stroke-width="1"/></g>';});
  // Marcas para tocar
  (marcados||[]).forEach(function(k){var q=XY[k],gr=P.NODOS[k]&&P.NODOS[k].t==='E';s+='<circle class="lat" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+(gr?20:13.5)+'" fill="#ffe27a" fill-opacity=".55" stroke="#c0392b" stroke-width="2.6" pointer-events="none"/>';});
  // Conos
  g.jug.forEach(function(p){if(p.pos<0)return;var q=XY[p.pos],c=P.DTS[p.dt];s+='<g transform="translate('+q[0].toFixed(1)+' '+(q[1]-8).toFixed(1)+') scale(1.35)" pointer-events="none"><ellipse cy="10" rx="12" ry="4" fill="#000" opacity=".25"/><path d="M0-13L9 8H-9Z" fill="'+c.color+'" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><rect x="-12" y="6.6" width="24" height="6" rx="1.8" fill="'+c.color+'" stroke="#111" stroke-width="1.6"/><text y="4.6" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="6.2" fill="'+c.tinta+'">10</text></g>';});
  return s+'</svg>';
}
function tocarTablero(ev,marcados,fn){
  var svg=ev.currentTarget,pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;var q=pt.matrixTransform(svg.getScreenCTM().inverse());
  var mejor=null,bd=30;marcados.forEach(function(k){var d=Math.hypot(XY[k][0]-q.x,XY[k][1]-q.y);if(d<bd){bd=d;mejor=k;}});
  if(mejor!=null)fn(mejor);
}
// Historial de las últimas 5 tiradas, al costado del tablero
function historial(g){
  var ts=(g.tiradas||[]).slice().reverse(),s='<div class="hist" aria-label="Últimas tiradas"><span class="hist-t">Dados</span>';
  for(var i=0;i<5;i++){var x=ts[i];s+=x?'<div class="ht'+(i===0?' ult':'')+'" style="border-left-color:'+P.DTS[g.jug[x.j].dt].color+'">'+dado(x.d[0],'a',17)+dado(x.d[1],'b',17)+'</div>':'<div class="ht vacio"></div>';}
  return s+'</div>';
}
function mostrarTiro(d){
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
  if(e.t==='trato'||e.t==='banco')return mostrarTrueque(g,e);
  if(e.t==='jugador')return mostrarFichaje(g,e);
  if(e.t==='compra')return mostrarCompra(g,e);
  if(e.t==='usa')return mostrarUso(g,e);
  if(e.t==='token')return mostrarToken(g,e);
  if(e.t==='multa')return mostrarPagoMulta(g,e);
  return 0;
}
function capa(html,ms){var t=el(html).firstChild;document.body.appendChild(t);setTimeout(function(){t.remove();},ms);return ms;}
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
function mostrarPagoMulta(g,e){
  var p=g.jug[e.j];
  return capa('<div class="fichaje corto" aria-hidden="true"><div class="fj-tit"><b>'+esc(p.nombre)+' paga la Multa</b><span>'+esc(P.MULTA[e.r])+'</span></div><div class="cj-mesa"><span class="cj-c cj-solo">'+K.recurso(e.con||e.r)+'</span><span class="cj-mu">'+iconoMulta(e.r,130)+'<i class="sello">Pagada</i></span></div></div>',1600);
}
// El festejo: como si hubiera ganado el Mundial
function festejarSiToca(){var g=sala.g;if(!g||g.fase!=='fin'||ui.festejo)return;ui.festejo=true;mostrarMundial(g);}
var COPA='<svg class="copa" viewBox="0 0 120 170" aria-hidden="true"><defs><linearGradient id="oroCopa" x1="0" x2="1"><stop offset="0" stop-color="#a8761d"/><stop offset=".45" stop-color="#ffe27a"/><stop offset="1" stop-color="#b8862b"/></linearGradient></defs><path d="M28 16H6c0 32 10 48 30 52M92 16h22c0 32-10 48-30 52" fill="none" stroke="#b8862b" stroke-width="7"/><path d="M26 8h68c2 44-8 72-34 82C34 80 24 52 26 8Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><path d="M38 16q-2 34 12 54" fill="none" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/><path d="M50 90h20l3 26H47Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><path d="M34 116h52l7 22H27Z" fill="url(#oroCopa)" stroke="#2b2620" stroke-width="3"/><rect x="20" y="138" width="80" height="20" rx="3" fill="#22305a" stroke="#2b2620" stroke-width="3"/><text x="60" y="153" text-anchor="middle" font-family="Bowlby One SC,sans-serif" font-size="13" fill="#ffe27a">PEXA</text><path d="M60 26l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="#fff8d6" stroke="#2b2620" stroke-width="1.6"/></svg>';
function mostrarMundial(g){
  var v=document.querySelector('.mundial');if(v)v.remove();
  var p=g.jug[g.ganador],cs=p.eq.filter(Boolean).map(function(c,i){return '<span class="mu-carta" style="animation-delay:'+(1+i*.28).toFixed(2)+'s">'+K.jugador(c.club,c.pos)+'</span>';}).join('');
  var t=el('<div class="mundial" role="dialog" aria-modal="true" aria-label="Campeón"><canvas></canvas><div class="mu-rayos"></div><div class="mu-in"><div class="mu-est">★ ★ ★</div>'+COPA+'<h1>¡Campeón del mundo!</h1><h2>'+esc(p.nombre)+'</h2><div class="mu-cono">'+cono(p.dt,34)+'</div><p>¡Dale campeón, dale campeón! Entró al Palco en el turno '+g.nTurnos+'.</p><div class="mu-eq">'+cs+'</div><button class="bt oro" id="muListo">Ver cómo fue el partido</button></div></div>').firstChild;
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
function resumen(g){
  var S=P.estadisticas,tot=function(k){var s=0;g.jug.forEach(function(p){s+=S(p)[k];});return s;};
  var min=g.t0&&g.t1?Math.max(1,Math.round((g.t1-g.t0)/60000)):null,car=g.caras||[],cm=0;for(var n=1;n<=6;n++)if((car[n]||0)>(car[cm]||0))cm=n;
  var s='<div class="res" id="resumen"><h2>Cómo fue el partido</h2><div class="res-datos">';
  [[g.nTurnos,'turnos'],min?[min,'minutos']:null,[tot('tiros'),'tiradas'],[tot('tratos')/2,'tratos'],[tot('multas'),'Multas'],[tot('compro'),'Beneficios']].forEach(function(x){if(x)s+='<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>';});
  s+='</div>';
  if(cm)s+='<p class="nota" style="margin:0;display:flex;align-items:center;gap:6px">'+dado(cm,'b',24)+'El número del partido: salió '+car[cm]+' veces.</p>';
  s+='<h3>Menciones honoríficas</h3><div class="res-men">'+P.menciones(g).map(function(m){return '<div class="men'+(m.top?' top':'')+'"><b>'+esc(m.t)+'</b><span>'+esc(m.d)+'</span><div class="men-dt">'+m.j.map(function(id){var q=g.jug[id];return '<i>'+cono(q.dt,15)+esc(q.nombre)+'</i>';}).join('')+'</div></div>';}).join('')+'</div>';
  s+='<h3>Los números de cada DT</h3><div class="res-tabla"><table><thead><tr><th>DT</th><th>Jug.</th><th>Tratos</th><th>Cobró</th><th>Multas</th><th>Compró</th><th>Usó</th></tr></thead><tbody>'+g.jug.map(function(p){var e=S(p);return '<tr'+(p.id===g.ganador?' class="gano"':'')+'><td>'+cono(p.dt,14)+' '+esc(p.nombre)+'</td><td>'+P.contratados(p)+'</td><td>'+e.tratos+'</td><td>'+e.cobro+'</td><td>'+e.multas+'</td><td>'+e.compro+'</td><td>'+e.uso+'</td></tr>';}).join('')+'</tbody></table></div>';
  s+='<h3>Los equipos</h3>'+g.jug.map(function(p){var cs=p.eq.filter(Boolean);return '<div class="res-eq"><span>'+cono(p.dt,16)+' '+esc(p.nombre)+'</span><div class="pz-eq">'+(cs.length?cs.map(function(c){return '<button class="cartita" data-vercarta="'+c.club+'-'+c.pos+'" aria-label="Ver a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button>';}).join(''):'<span class="nota">Sin Jugadores.</span>')+'</div></div>';}).join('');
  return s+'<button class="bt" id="verFestejo">Ver el festejo de nuevo</button></div>';
}
// Un intercambio de Recursos: las cartas cruzan de un DT al otro. Se ve igual cuando negocian las máquinas.
function cartasVuelan(o,clase){var l=[];P.REC.forEach(function(r){for(var i=0;i<(o[r]||0);i++)l.push(r);});
  return l.slice(0,6).map(function(r,i){return '<span class="tq-c '+clase+'" style="animation-delay:'+(i*.13).toFixed(2)+'s">'+K.recurso(r)+'</span>';}).join('');}
function etiquetaDT(g,j){var p=g.jug[j];return '<div class="tq-dt">'+cono(p.dt,34)+'<b>'+esc(p.nombre)+'</b></div>';}
function mostrarTrueque(g,e){
  var banco=e.t==='banco',der=banco?'<div class="tq-dt"><span class="tq-banco">$</span><b>El Banco</b></div>':etiquetaDT(g,e.a);
  var t=el('<div class="trueque" aria-hidden="true"><h3>'+(banco?'Cambio con el Banco':'¡Trato!')+'</h3><div class="tq-fila">'+etiquetaDT(g,e.de)+'<div class="tq-mesa">'+cartasVuelan(e.doy,'ida')+cartasVuelan(e.pido,'vuelta')+'</div>'+der+'</div></div>').firstChild;
  document.body.appendChild(t);setTimeout(function(){t.remove();},2100);return 2100;
}
// Un fichaje: la carta aparece dada vuelta y gira hasta mostrar al Jugador
function mostrarFichaje(g,e){
  var p=g.jug[e.j],n=P.nombreCarta(e.c);
  var t=el('<div class="fichaje" aria-hidden="true"><div class="fj-tit"><b>¡'+esc(p.nombre)+(e.cambio?' cambia y trae a ':' contrata a ')+esc(n)+'!</b><span>'+P.POS[e.c.pos]+' de '+P.NOMBRE_REC[e.c.club]+'</span></div><div class="fj-gira"><div class="fj-cara fj-dorso">'+K.dorso('Jugador')+'</div><div class="fj-cara">'+K.jugador(e.c.club,e.c.pos)+'</div></div></div>').firstChild;
  document.body.appendChild(t);setTimeout(function(){t.remove();},2800);return 2800;
}

// ---------- Inicio ----------
var conf={sel:[0,1,2,3],modo:'completo',filas:[{h:true},{h:false},{h:false},{h:false},{h:false}],nombres:['','','','','']};
function pantallaInicio(){
  var hay=false;try{hay=!!localStorage.getItem(CLAVE);}catch(e){}
  var redOk=window.PEXA_RED&&PEXA_RED.disponible(),salaGuardada=null;try{salaGuardada=localStorage.getItem('pexa-sala');}catch(e){}
  var s='<div class="ini"><span class="logo">'+K.logo('copa')+'</span><h1>PEXA<small>DREAM TEAM</small></h1>';
  if(hay)s+='<button class="bt fuerte" id="seguir">Seguir el partido</button>';
  if(redOk)s+='<div class="amigos"><h2>Jugar con amigos</h2><p class="nota" style="margin:0">Cada uno desde su celu. Uno arma la sala y les pasa el link a los demás.</p><input id="miNombre" aria-label="Tu nombre" placeholder="Tu nombre" maxlength="16" value="'+esc(miNombre())+'">'+(salaGuardada?'<button class="bt oro" id="volverSala">Volver a la sala '+esc(salaGuardada)+'</button>':'')+'<button class="bt fuerte" id="crearSala">Armar una sala</button><div class="fila"><input id="codSala" aria-label="Código de la sala" placeholder="Código" maxlength="4" autocapitalize="characters"><button class="bt" id="unirme">Entrar</button></div></div><h2 style="font-size:19px;margin-top:4px">O en este celular</h2>';
  s+=(redOk?'':'<h2 style="font-size:19px">Partido nuevo</h2>')+'';
  s+='<div class="sel" role="group" aria-label="Duración"><button class="chip" data-m="completo" aria-pressed="'+(conf.modo==='completo')+'">Completo: 4 Jugadores</button><button class="chip" data-m="rapido" aria-pressed="'+(conf.modo==='rapido')+'">Rápido: 3 Jugadores</button></div>';
  s+='<h3 style="font-size:16px;margin:0">Elegí los DTs: '+conf.sel.length+' de 5</h3><p class="nota" style="margin:0">Tocá la cara para sumarlo o sacarlo, y el + para conocerlo. Tienen que ser 2 como mínimo.</p>';
  for(var i=0;i<5;i++){var d=P.DTS[i],h=conf.filas[i].h,on=conf.sel.indexOf(i)>=0;s+='<div class="dtelige'+(on?' on':'')+'"><div class="dt-cara"><button class="dt-tog" data-togdt="'+i+'" aria-pressed="'+on+'" aria-label="'+(on?'Sacar a ':'Sumar a ')+d.nombre+'">'+K.retrato(i)+'</button><button class="dt-mas" data-verficha="'+i+'" aria-label="Conocer a '+d.nombre+'">+</button></div>'+(on?'<div class="dt-dat"><input data-nom="'+i+'" aria-label="Nombre de '+d.nombre+'" placeholder="'+d.nombre+'" maxlength="16" value="'+esc(conf.nombres[i]||d.nombre)+'"><div class="seg" role="group" aria-label="Quién juega"><button data-h="'+i+'" data-v="1" aria-pressed="'+h+'">Persona</button><button data-h="'+i+'" data-v="0" aria-pressed="'+(!h)+'">Máquina</button></div></div>':'<div class="dt-dat"><b>'+d.nombre+'</b><span class="nota">No juega. Tocá la cara para sumarlo.</span></div>')+cono(i,22)+'</div>';}
  s+='<button class="bt oro" id="empezar">Empezar el partido</button>';
  s+=redOk?'<p class="nota">En este celular se juega contra la máquina o pasándose el celu.</p></div>':'<p class="nota">Acá se juega en este celular, contra la máquina o pasándose el celu. Para jugar cada uno desde el suyo, entrá por el link público del juego.</p></div>';
  app.innerHTML=s;
  var b=document.getElementById('seguir');if(b)b.onclick=function(){sala.cargar();ui.yo=null;reiniciarVista();ui.festejo=sala.g.fase==='fin';actualizarYo(sala.g);ui.cubierto=false;pintar();avanzarBots();};
  if(redOk)conectarAmigos(salaGuardada);
  app.querySelectorAll('[data-togdt]').forEach(function(x){x.onclick=function(){leerNombres();var v=+x.dataset.togdt,ix=conf.sel.indexOf(v);if(ix>=0){if(conf.sel.length<=2){mostrarAviso('Tienen que jugar 2 DTs como mínimo.');return;}conf.sel.splice(ix,1);}else{conf.sel.push(v);conf.sel.sort();}if(!conf.sel.some(function(q){return conf.filas[q].h;}))conf.filas[conf.sel[0]].h=true;pantallaInicio();};});
  app.querySelectorAll('[data-verficha]').forEach(function(x){x.onclick=function(){leerNombres();ui.modal={tipo:'dt',dt:+x.dataset.verficha};pintarModal(null,null,null);};});
  app.querySelectorAll('[data-m]').forEach(function(x){x.onclick=function(){leerNombres();conf.modo=x.dataset.m;pantallaInicio();};});
  app.querySelectorAll('[data-h]').forEach(function(x){x.onclick=function(){leerNombres();conf.filas[+x.dataset.h].h=x.dataset.v==='1';pantallaInicio();};});
  app.querySelectorAll('[data-nom]').forEach(function(x){x.onfocus=function(){x.select();};});
  document.getElementById('empezar').onclick=function(){leerNombres();
    var d=conf.sel.map(function(i){return {dt:i,nombre:conf.nombres[i].trim()||P.DTS[i].nombre,bot:!conf.filas[i].h};});
    sala.g=P.nuevaPartida({dts:d,modo:conf.modo,semilla:Math.floor(Math.random()*1e9),t0:Date.now()});ui.yo=null;ui.tab='canjes';reiniciarVista();ui.verDT=null;sala.guardar();actualizarYo(sala.g);ui.cubierto=false;pintar();avanzarBots();};
}
function reiniciarVista(){ui.pausa=false;ui.tabVer=null;ui.tiradaVista=null;ui.eventoVisto=null;ui.cola=[];ui.animando=false;ui.logVisto=null;ui.festejo=false;ui.faseVista=null;}
function leerNombres(){app.querySelectorAll('[data-nom]').forEach(function(x){conf.nombres[+x.dataset.nom]=x.value;});}

// ---------- Lo que tiene que hacer cada uno ----------
function pintar(){
  var g=sala.g;if(!g){if(sala.red&&ui.lobby)pantallaLobby();else pantallaInicio();return;}
  actualizarYo(g);
  if(g.nTirada!==ui.tiradaVista){if(ui.tiradaVista!=null&&g.dados){ui.tiradaT=Date.now();mostrarTiro(g.dados);}ui.tiradaVista=g.nTirada;}
  var nEv=g.nEvento||0;
  if(nEv!==ui.eventoVisto){if(ui.eventoVisto!=null&&!ui.sinAnim)(g.evs||[]).forEach(function(e){if(e.n>ui.eventoVisto)ui.cola.push(e);});ui.eventoVisto=nEv;}
  // Si otro DT te hizo algo con un Beneficio, te enterás en el momento
  var nLog=g.nLog||0;if(ui.logVisto!=null&&nLog>ui.logVisto){var gp=g.log.filter(function(l){return l.golpe&&l.i>ui.logVisto&&l.solo===ui.yo;});if(gp.length)aviso(gp[gp.length-1].t,'golpe',5200);}ui.logVisto=nLog;
  var yo=ui.yo,me=yo!=null?g.jug[yo]:null,marcados=[],tap=null,deben=P.quienDebe(g),miTurno=yo!=null&&deben.indexOf(yo)>=0;
  var h='',turno=g.fase==='ubicar'?g.jug[g.faltaUbicar[0]]:g.fase==='barraIni'?g.jug[deben[0]]:g.jug[g.turno];
  h+='<div class="barra">'+cono(turno.dt,28)+'<div class="q"><b>'+esc(turno.nombre)+'</b><span>'+esc(textoFase(g,yo))+'</span></div>'+(g.dados?'<div class="dados">'+dado(g.dados[0],'a',36)+dado(g.dados[1],'b',36)+'</div>':'')+'</div>';
  if(g.fase==='fin')h+='<div class="campeon"><h2>¡'+esc(g.jug[g.ganador].nombre)+' campeón!</h2><p style="margin:4px 0 10px">Entró al Palco con su Dream Team en '+g.nTurnos+' turnos.</p><button class="bt fuerte" id="otra">Otro partido</button></div><div class="panel">'+resumen(g)+'</div>';
  // qué se puede tocar
  if(miTurno&&!g.oferta){
    if(g.fase==='ubicar'){marcados=[0,1,2,3,4].map(function(i){return P.BASE.B+i;}).filter(function(k){return !P.ocupado(g,k);});tap=function(k){sala.enviar(yo,{t:'ubicar',k:k});};}
    if(g.fase==='barraIni'){marcados=(g.barraPaso===0?P.PALCO:[0,1,2,3,4].map(function(i){return P.BASE.B+i;})).filter(function(k){return !P.ocupado(g,k);});tap=function(k){sala.enviar(yo,{t:'barraIni',k:k});};}
    if(g.fase==='mover'){marcados=P.destinos(g,yo);tap=function(k){sala.enviar(yo,{t:'mover',k:k});};}
    if(g.fase==='espiar'){var ce=P.mercadosCercanos(me.pos).filter(function(m){return g.mercados[m].length;});marcados=ce.map(function(m){return P.MERCADOS[m];});
      tap=function(k){var m=P.MERCADOS.indexOf(k);sala.enviar(yo,{t:'espiar',m:m},function(){ui.modal={tipo:'visto',m:m};});};}
    if(g.fase==='barras'){
      var mov=g.barraPend.filter(function(i){return P.opcionesBarra(g,i).length;});
      if(mov.indexOf(ui.barraSel)<0)ui.barraSel=mov.length===1?mov[0]:null;
      var aBarras=mov.filter(function(i){return i!==ui.barraSel;}).map(function(i){return g.barras[i];});
      var ops=ui.barraSel!=null?P.opcionesBarra(g,ui.barraSel):[];
      marcados=ops.concat(aBarras);
      tap=function(k){var ib=g.barras.indexOf(k);if(ib>=0&&mov.indexOf(ib)>=0){ui.barraSel=ib;pintar();return;}var i=ui.barraSel;ui.barraSel=null;sala.enviar(yo,{t:'barra',i:i,k:k});};}
    if(ui.modal&&ui.modal.tipo==='gas'){marcados=P.NODOS.map(function(n){return n.id;}).filter(function(k){return !P.ocupado(g,k)&&ui.modal.nodos.indexOf(k)<0;});tap=function(k){ui.modal.nodos.push(k);if(ui.modal.nodos.length===g.barras.length){var nd=ui.modal.nodos;ui.modal=null;sala.enviar(yo,{t:'usar',b:'gas',nodos:nd});}else pintar();};}
    if(ui.modal&&ui.modal.tipo==='tocarMercado'){marcados=[0,1,2,3,4].filter(function(m){return g.mercados[m].length;}).map(function(m){return P.MERCADOS[m];});tap=function(k){var m=P.MERCADOS.indexOf(k);ui.modal=null;sala.enviar(yo,{t:'usar',b:'espionaje',m:m},function(){ui.modal={tipo:'visto',m:m};});};}
  }
  h+='<div class="mesa">'+dibujarTablero(g,marcados)+historial(g)+'</div>';
  h+='<div class="panel" id="panel">'+panelAccion(g,yo,me,miTurno)+'</div>';
  if(me)h+=tabs(g,yo,me);else if(g.fase!=='fin')h+=espectador(g);
  app.innerHTML=h;
  var sv=document.getElementById('tablero');if(tap&&sv)sv.addEventListener('click',function(ev){tocarTablero(ev,marcados,tap);});
  conectar(g,yo,me);
  if(ui.faseVista!==g.fase){ui.faseVista=g.fase;if(g.fase==='mercado'){var pn=document.getElementById('panel');if(pn)pn.scrollIntoView();}else if(['tirar','mover','barras','ubicar','espiar','descarte'].indexOf(g.fase)>=0)window.scrollTo(0,0);}
  if(ui.modal&&ui.modal.tipo!=='gas'&&ui.modal.tipo!=='tocarMercado')pintarModal(g,yo,me);
  if(!ui.animando){if(ui.cola.length)jugarCola();else festejarSiToca();}
  if(ui.cubierto&&me&&humanos(g).length>1&&g.fase!=='fin'){var c=el('<div class="cubre"><div style="transform:scale(2.2);margin-bottom:14px">'+cono(me.dt,30)+'</div><h2>Pasale el celu a '+esc(me.nombre)+'</h2><p>Lo que sigue es solo para sus ojos.</p><button class="bt oro" id="ya">Soy '+esc(me.nombre)+'</button></div>').firstChild;document.body.appendChild(c);document.getElementById('ya').onclick=function(){ui.cubierto=false;c.remove();};}
}
function textoFase(g,yo){
  var mio=yo!=null&&yo===g.turno;
  switch(g.fase){
    case 'ubicar':return 'Elige dónde arrancar';case 'barraIni':return 'Pone un Barrabrava';case 'tirar':return mio?'Te toca tirar':'Tira los dados';
    case 'descarte':return 'Salió un 1: devolución';case 'mover':return mio?'Mové tu cono':'Mueve su cono';case 'espiar':return mio?'Mirá un Mercado de Pases':'Mira un Mercado de Pases';
    case 'barras':return mio?'Mové los Barrabravas':'Mueve los Barrabravas';case 'canje':return g.oferta?'Hay una oferta en la mesa':(mio?'Pagá, negociá y canjeá':'Canjea y negocia');case 'mercado':return 'En el Mercado de Pases';case 'fin':return 'Terminó el partido';
  }
  return '';
}
function panelAccion(g,yo,me,miTurno){
  if(g.fase==='fin')return '';
  if(!me)return '<div class="aviso"><b>'+(ui.pausa?'Partido en pausa':'Juega la máquina')+'</b>Todos los DTs son automáticos. Abajo podés ver cómo viene cada uno.</div><button class="bt '+(ui.pausa?'oro':'fuerte')+'" id="pausaTog">'+(ui.pausa?'Seguir el partido':'Pausar el partido')+'</button>';
  if(g.oferta)return panelOferta(g,yo);
  if(g.fase==='descarte'&&g.descartes[yo]!=null)return panelDescarte(g,yo,me);
  if(ui.modal&&ui.modal.tipo==='gas')return '<div class="aviso"><b>Gas Pimienta</b>Tocá en el tablero el lugar del Barrabrava '+(ui.modal.nodos.length+1)+' de '+g.barras.length+'.</div>';
  if(ui.modal&&ui.modal.tipo==='tocarMercado')return '<div class="aviso"><b>Espionaje</b>Tocá en el tablero el Mercado de Pases que querés mirar.</div><button class="bt chico" id="cancelarM">Cancelar</button>';
  if(!miTurno)return '<div class="aviso"><b>Espera</b>'+esc(g.fase==='ubicar'||g.fase==='barraIni'?'Está ubicando '+g.jug[P.quienDebe(g)[0]].nombre+'.':(g.fase==='descarte'?'Faltan devolver Recursos los demás.':'Es el turno de '+g.jug[g.turno].nombre+'.'))+'</div>'+(g.fase==='canje'?'<button class="bt chico" id="ofrecer">Ofrecerle un trato</button>':'');
  switch(g.fase){
    case 'ubicar':return '<div class="aviso"><b>Elegí tu punto de arranque</b>Tocá una de las esquinas marcadas. Cobrás 1 Recurso de cada hexágono que toca.</div>';
    case 'barraIni':return '<div class="aviso"><b>Poné un Barrabrava</b>'+(g.barraPaso===0?'En un vértice libre del Palco.':'En un punto de arranque libre.')+'</div>';
    case 'tirar':return '<button class="bt oro" id="tirar" style="min-height:58px;font-size:20px">Tirar los dados</button>';
    case 'mover':{var ds=P.destinos(g,yo),q=g.mv.quieto;
      return '<div class="aviso"><b>'+(ds.length?'Mové tu cono':'No tenés camino')+'</b>'+(g.dados[0]===g.dados[1]&&!g.mv.jet?'¡Doble! Caminás la suma de los dos dados. ':'')+(g.mv.jet?'Jet Privado: elegí cualquier intersección libre.':(g.mv.arreglo?'Los Barrabravas ya se movieron. ':'')+(ds.length?'Tocá una de las esquinas marcadas. Tenés que caminar '+g.mv.pasos.join(' o ')+'.':'Te quedás donde estás.'))+(ds.indexOf(P.CENTRO)>=0?' <b class="palco-si">¡Podés entrar al centro del Palco!'+(P.suma(me.multas)?' Al entrar pagás tus '+P.suma(me.multas)+' Multas con lo que tenés en la mano.':'')+'</b>':'')+'</div>'+
        ((!ds.length||q)?'<button class="bt fuerte" id="quedarse">Quedarme acá</button>':'');}
    case 'espiar':return '<div class="aviso"><b>Desde el Palco se ve todo</b>Tocá en el tablero uno de los dos Mercados de Pases marcados: los más cercanos. Los otros tres quedan demasiado lejos.</div><button class="bt chico" id="noEspiar">No mirar</button>';
    case 'barras':{var mov=g.barraPend.filter(function(i){return P.opcionesBarra(g,i).length;}),sel=ui.barraSel!=null;
      return '<div class="aviso"><b>'+(mov.length>1?'Barrabravas: quedan '+mov.length+' por mover':'Mové el Barrabrava')+'</b>'+(sel?'Tocá una esquina marcada: se mueve una intersección.'+(mov.length>1?' O tocá el otro ñoqui para mover ese primero.':''):'Tocá el ñoqui que querés mover primero.')+'</div>';}
    case 'mercado':return panelMercado(g,yo,me);
    case 'canje':return '<div class="fila"><button class="bt oro" id="negociar">Negociar</button><button class="bt fuerte" id="fin">Terminar el turno</button></div>';
  }
  return '';
}
function panelDescarte(g,yo,me){
  var c=g.descartes[yo];if(!ui.descarte)ui.descarte=P.vacio();var d=ui.descarte,t=P.suma(d);
  return '<div class="aviso"><b>Salió un 1: devolvé '+c+' Recursos</b>Tenés más de 9 en la mano. Elegí cuáles ('+t+' de '+c+').</div>'+P.REC.map(function(r){return '<div class="num"><span style="text-align:left;flex:1;font-family:var(--t);font-weight:700;display:flex;align-items:center;gap:6px">'+icono(r,28)+'× '+me.mano[r]+'</span><button data-dm="'+r+'" aria-label="Menos">−</button><span>'+d[r]+'</span><button data-dp="'+r+'" aria-label="Más">+</button></div>';}).join('')+'<button class="bt fuerte" id="descartar"'+(t===c?'':' disabled')+'>Devolver</button>';
}
function panelOferta(g,yo){
  var o=g.oferta,de=g.jug[o.de],abierta=o.a<0,le=P.leToca(o);
  var s='<div class="aviso"><b>'+esc(de.nombre)+(abierta?' les ofrece a todos':' le ofrece a '+esc(g.jug[o.a].nombre))+'</b><div class="trato"><span>Da</span>'+precioIc(o.doy,30)+'<span>Pide</span>'+precioIc(o.pido,30)+'</div>'+(abierta?'<span class="nota">Se lo lleva el primero que acepte.</span>':'')+'</div>';
  if(le===yo)s+='<div class="fila"><button class="bt fuerte" data-resp="1">Acepto</button><button class="bt" data-resp="0">No</button></div><button class="bt chico" id="contraof">Contraofertar</button>';
  else if(o.de===yo)s+='<div class="nota">Esperando la respuesta…</div><button class="bt chico" data-resp="0">Retirar la oferta</button>';
  return s;
}
function panelMercado(g,yo,me){
  var m=g.mercadoAbierto;
  var s='<div class="aviso"><b>'+esc(nombreMercado(g,m))+'</b>Mirá las cartas en secreto. Contratar cuesta '+token('V',22)+' + '+token('E',22)+'; cambiar un Jugador tuyo, 1 Token. Si ninguna te sirve, no pagás nada. Mientras está abierto podés seguir canjeando y negociando.</div>';
  // Los Tokens a mano, para no tener que salir del Mercado
  s+='<div class="mc-tok">'+['V','E'].map(function(t){var ok=g.tokens[t]>0&&P.puedePagar(me,P.PRECIO[t]);return '<div class="mc-t'+(me[t]?'':' falta')+'">'+token(t,30)+'<b>×'+me[t]+'</b>'+precioIc(P.PRECIO[t],17)+'<button class="bt chico" data-token="'+t+'"'+(ok?'':' disabled')+'>Canjear</button></div>';}).join('')+'</div><div class="fila"><button class="bt chico" id="irCanjes">Ver los canjes</button><button class="bt chico oro-c" id="negociar">Negociar</button></div><div class="mc-grid">';
  g.mercados[m].forEach(function(c,i){var tiene=!!me.eq[c.pos],full=P.contratados(me)>=g.meta;
    s+='<div class="mc"><button class="cartita" data-vercarta="'+c.club+'-'+c.pos+'" aria-label="Ver a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button><p>'+habilidadCarta(c)+'</p>';
    if(!tiene&&!full)s+='<button class="bt fuerte chico" data-contratar="'+i+'"'+(me.V>=1&&me.E>=1?'':' disabled')+'>Contratar</button>';
    else if(tiene)s+='<div class="fila"><button class="bt chico" data-cambiar="'+i+'" data-tk="V" aria-label="Cambiar por 1 Token de Victoria"'+(me.V>=1?'':' disabled')+'>'+token('V',22)+'</button><button class="bt chico" data-cambiar="'+i+'" data-tk="E" aria-label="Cambiar por 1 Token de Efectivo"'+(me.E>=1?'':' disabled')+'>'+token('E',22)+'</button></div>';
    s+='</div>';});
  return s+'</div><button class="bt" id="cerrarM">No contratar a nadie</button>';
}
function habilidadCarta(c){return ['Podés usar '+P.NOMBRE_REC[c.club]+' para pagar cualquier Multa.','La Multa de '+P.NOMBRE_REC[c.club]+' ('+P.MULTA[c.club]+') no te cae.','En cualquier lugar cambiás 2 de '+P.NOMBRE_REC[c.club]+' por 1 a elección.','Cuando cobrás '+P.NOMBRE_REC[c.club]+', levantás el doble.'][c.pos];}

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
function mano(g,yo,me){
  var ancho=Math.min(window.innerWidth,520)-48,rs=[],bs=[];
  P.REC.forEach(function(r){for(var i=0;i<me.mano[r];i++)rs.push({html:K.recurso(r),cls:me.multas[r]?'trabada':''});});
  me.benef.forEach(function(b){bs.push({peso:2,html:K.beneficio(P.BENEF[b].n),data:'data-verb="'+b+'"',label:'Ver '+P.BENEF[b].n});});
  me.nuevos.forEach(function(b){bs.push({peso:2,html:K.beneficio(P.BENEF[b].n)+'<i class="nuevo">Nuevo</i>',data:'data-verb="'+b+'" data-nuevo="1"',label:'Ver '+P.BENEF[b].n+', recién comprado'});});
  // Recursos y Beneficios van en el mismo abanico, como en la mano de verdad
  var s='<div class="mano-t"><h3>Tu mano</h3><span>'+rs.length+' Recursos · '+bs.length+' Beneficio'+(bs.length===1?'':'s')+(bs.length?'. Tocá un Beneficio para verlo':'')+'</span></div>';
  s+=rs.length+bs.length?abanico(rs.concat(bs),78,ancho):'<div class="nota">Tenés la mano vacía.</div>';
  s+='<div class="cuenta">'+P.REC.map(function(r){return '<span'+(me.multas[r]?' class="tr"':'')+'>'+icono(r,22)+me.mano[r]+'</span>';}).join('')+'</div>';
  return s;
}

// ---------- La Pizarra ----------
function pizarra(g,yo,me,q){
  var z=PIZ[q.dt],mia=q.id===yo,defecto=q.nombre===P.DTS[q.dt].nombre,tit=defecto?z.tit:'La Pizarra de '+q.nombre;
  var s='<div class="pz" style="--sup:'+z.sup+';--t:'+z.t+';--t2:'+z.t2+';--marco:'+z.marco+'"><div class="pz-cab"><button class="pz-ret" data-verficha="'+q.dt+'" aria-label="Ver a '+esc(P.DTS[q.dt].nombre)+' de cuerpo entero">'+K.retrato(q.dt)+'<span aria-hidden="true">+</span></button><div><h3>'+esc(tit)+'</h3><i>"'+esc(z.frase)+'"</i></div></div>';
  if(!mia)s+='<p class="pz-mano">En la mano: <b>'+P.suma(q.mano)+'</b> Recursos y <b>'+(q.benef.length+q.nuevos.length)+'</b> Beneficios'+(q.roja?' · <b>Tarjeta Roja</b>':'')+'</p>';
  s+='<div class="pz-eq">';
  P.POS.forEach(function(pn,i){var c=q.eq[i];s+=c?'<button class="cartita" data-vercarta="'+c.club+'-'+c.pos+'" aria-label="Ver a '+esc(P.nombreCarta(c))+'">'+K.jugador(c.club,c.pos)+'</button>':'<div class="pz-vacio"><b>'+pn.toUpperCase()+'</b><span>'+['Con su Recurso pagás cualquier Multa.','La Multa de su Recurso no te cae.','Cambiás 2 de su Recurso por 1.','Cobrás el doble de su Recurso.'][i]+'</span></div>';});
  s+='</div><div class="pz-fila"><div><h4>Tokens</h4><div class="pz-toks">'+['V','E'].map(function(t){return '<span class="'+(q[t]?'':'apag')+'">'+token(t,38)+'<b>×'+q[t]+'</b></span>';}).join('')+'</div></div><div><h4>Multas · máx. 5</h4><div class="pz-mul">';
  var ml=[];P.REC.forEach(function(r){for(var i=0;i<q.multas[r];i++)ml.push(r);});
  for(var k=0;k<5;k++)s+='<span class="pz-m">'+(ml[k]?iconoMulta(ml[k],32):'')+'</span>';
  s+='</div></div></div><h4>Beneficios usados <em>· 3 usados = 1 Recurso</em></h4><div class="pz-us">';
  if(q.usados.length)q.usados.forEach(function(b){s+='<button class="pz-u" data-verb="'+b+'" data-solo="1" aria-label="Ver '+esc(P.BENEF[b].n)+'"><span>'+K.beneficio(P.BENEF[b].n)+'</span></button>';});
  else s+='<span class="pz-nada">Van de costado, acá.</span>';
  s+='</div>';
  return s+'</div>';
}
// Partido entre máquinas: se ve todo de todos, y por defecto la Pizarra del que está jugando
function espectador(g){
  var ver=ui.verDT!=null?g.jug[ui.verDT]:g.jug[g.turno];
  var s='<div class="panel" style="padding-top:0"><div class="pz-sel" role="group" aria-label="Ver la Pizarra de">'+g.jug.map(function(q){return '<button data-verdt="'+q.id+'" aria-pressed="'+(q.id===ver.id)+'">'+cono(q.dt,16)+'<span>'+esc(q.nombre)+'</span></button>';}).join('')+'</div>';
  s+='<div class="mano">'+P.REC.map(function(r){return '<div class="mano-r" style="display:flex;align-items:center;gap:3px">'+icono(r,28)+'<b>'+ver.mano[r]+'</b></div>';}).join('')+'</div>';
  var bs=ver.benef.concat(ver.nuevos);
  s+='<div class="nota" style="margin:0"><b>Beneficios en la mano:</b> '+(bs.length?'':'ninguno')+'</div>'+(bs.length?'<div class="pz-eq">'+bs.map(function(b){return '<button class="cartita" data-verb="'+b+'" data-solo="1" aria-label="Ver '+esc(P.BENEF[b].n)+'">'+K.beneficio(P.BENEF[b].n)+'</button>';}).join('')+'</div>':'');
  s+=pizarra(g,null,null,ver)+'<div class="tabs" role="group" aria-label="Secciones">'+[['isla','La isla'],['reg','Registro']].map(function(t){var on=(ui.tabVer||'reg')===t[0];return '<button data-tabver="'+t[0]+'" aria-pressed="'+on+'">'+t[1]+'</button>';}).join('')+'</div>'+((ui.tabVer||'reg')==='isla'?tabIsla(g):tabRegistro(g,null));
  return s+'<button class="bt chico" id="animTog" style="margin-top:8px">Animaciones: '+(ui.sinAnim?'apagadas':'prendidas')+'</button><button class="bt chico" id="salir">Salir (el partido queda guardado)</button></div>';
}
function tabs(g,yo,me){
  var ver=ui.verDT!=null?g.jug[ui.verDT]:me;
  var s='<div class="panel" style="padding-top:0">'+mano(g,yo,me)+'<div class="pz-sel" role="group" aria-label="Ver la Pizarra de">'+g.jug.map(function(q){return '<button data-verdt="'+q.id+'" aria-pressed="'+(q.id===ver.id)+'">'+cono(q.dt,16)+'<span>'+(q.id===yo?'Tu Pizarra':esc(q.nombre))+'</span></button>';}).join('')+'</div>'+pizarra(g,yo,me,ver)+'</div>';
  s+='<div class="tabs" role="group" aria-label="Secciones">'+[['canjes','Canjes'],['mercados','Mercados'],['isla','La isla'],['reg','Registro']].map(function(t){return '<button data-tab="'+t[0]+'" aria-pressed="'+(ui.tab===t[0])+'">'+t[1]+'</button>';}).join('')+'</div><div class="panel">';
  if(ui.tab==='canjes')s+=tabCanjes(g,yo,me);
  if(ui.tab==='mercados')s+=tabMercados(g,me);
  if(ui.tab==='isla')s+=tabIsla(g);
  if(ui.tab==='reg')s+=tabRegistro(g,yo);
  return s+'<button class="bt chico" id="animTog" style="margin-top:8px">Animaciones: '+(ui.sinAnim?'apagadas':'prendidas')+'</button><button class="bt chico" id="salir">Salir (el partido queda guardado)</button></div>';
}
function tabCanjes(g,yo,me){
  var mio=yo===g.turno&&(g.fase==='canje'||g.fase==='mercado')&&!g.oferta,s='';
  if(!mio&&!(yo===g.turno&&g.fase==='mover'&&P.contratados(me)>=g.meta))return '<div class="nota">Los canjes se hacen en tu turno, después de mover el cono.</div>'+precios();
  // Multas
  P.REC.forEach(function(r){if(!me.multas[r])return;
    s+='<div class="op">'+iconoMulta(r,38)+'<div><b>Pagar '+P.MULTA[r]+'</b>'+precioIc(pagoDe(r),24)+'</div><button class="bt chico" data-pagar="'+r+'"'+(me.mano[r]>0?'':' disabled')+'>Pagar</button></div>';
    var arq=P.hab(me,0);if(arq&&arq!==r)s+='<div class="op">'+iconoMulta(r,38)+'<div><b>Pagar '+P.MULTA[r]+' con tu Arquero</b>'+precioIc(pagoDe(arq),24)+'</div><button class="bt chico" data-pagar="'+r+'" data-con="'+arq+'"'+(me.mano[arq]>0&&!me.multas[arq]?'':' disabled')+'>Pagar</button></div>';});
  if(!mio)return s||'<div class="nota">No tenés Multas para pagar.</div>';
  if(me.amnistia)s+='<div class="aviso"><b>Amnistía activa</b>Tu próxima operación ignora las Multas.</div>';
  // Mercado
  var m=P.mercadoDe(me.pos);
  if(m>=0&&g.fase!=='mercado')s+='<div class="op"><div><b>Mercado de Pases</b>'+(me.contrato?'Ya contrataste en este turno.':(me.miro?'Ya miraste en este turno.':(g.mercados[m].length?'Mirá las cartas y contratá.':'Se quedó sin cartas.')))+'</div><button class="bt fuerte chico" id="abrir"'+(!me.contrato&&!me.miro&&g.mercados[m].length&&me.V+me.E>=1?'':' disabled')+'>Entrar</button></div>';
  // Tokens
  s+='<div class="op">'+token('V',36)+'<div><b>Token de Victoria</b>'+precioIc(P.PRECIO.V,24)+'</div><button class="bt chico" data-token="V"'+(g.tokens.V>0&&P.puedePagar(me,P.PRECIO.V)?'':' disabled')+'>Canjear</button></div>';
  s+='<div class="op">'+token('E',36)+'<div><b>Token de Efectivo</b>'+precioIc(P.PRECIO.E,24)+'</div><button class="bt chico" data-token="E"'+(g.tokens.E>0&&P.puedePagar(me,P.PRECIO.E)?'':' disabled')+'>Canjear</button></div>';
  s+='<div class="op"><span class="ben-d">'+K.dorso('Beneficio')+'</span><div><b>Beneficio</b>'+precioIc(P.PRECIO.B,24)+'<span class="sub">Quedan '+g.mazoB.length+' en el mazo.</span></div><button class="bt chico" id="comprarB"'+(g.mazoB.length&&P.puedePagar(me,P.PRECIO.B)?'':' disabled')+'>Comprar</button></div>';
  // Banco
  var bo=P.boleDe(g,me.pos);
  s+='<h3 style="font-size:16px;margin-top:4px">Cambiar con el Banco</h3><div class="nota">'+(bo?'Estás en la Boletería de '+P.NOMBRE_REC[bo]+': das 1 de '+P.NOMBRE_REC[bo]+' y te llevás 1 del que quieras.':'En cualquier lugar: 4 iguales por 1.')+'</div>';
  s+='<div class="nota" style="font-weight:700">Das:</div><div class="sel">'+P.REC.map(function(r){var t=P.tasaBanco(g,me,r),ok=me.mano[r]>=t&&P.usable(me,r);return '<button class="chip ic" data-da="'+r+'" aria-label="Dar '+t+' de '+P.NOMBRE_REC[r]+'" aria-pressed="'+(ui.bancoDa===r)+'"'+(ok?'':' disabled')+'>'+t+'×'+icono(r,24)+'</button>';}).join('')+'</div>';
  if(ui.bancoDa)s+='<div class="nota" style="font-weight:700">Te llevás 1:</div><div class="sel">'+P.REC.filter(function(r){return r!==ui.bancoDa;}).map(function(r){return '<button class="chip ic" data-toma="'+r+'" aria-label="Llevarte '+P.NOMBRE_REC[r]+'"'+(g.banco[r]>0?'':' disabled')+'>'+icono(r,24)+'</button>';}).join('')+'</div>';
  if(me.usados.length>=3)s+='<h3 style="font-size:16px;margin-top:4px">3 Beneficios usados por 1 Recurso</h3><div class="sel">'+P.REC.map(function(r){return '<button class="chip ic" data-usados="'+r+'" aria-label="'+P.NOMBRE_REC[r]+'"'+(g.banco[r]>0?'':' disabled')+'>'+icono(r,24)+'</button>';}).join('')+'</div>';
  return s;
}
function pagoDe(r){var o={};o[r]=1;return o;}
function precios(){return '<div class="carta"><div class="op">'+token('V',30)+'<div><b>Token de Victoria</b>'+precioIc(P.PRECIO.V,22)+'</div></div><div class="op">'+token('E',30)+'<div><b>Token de Efectivo</b>'+precioIc(P.PRECIO.E,22)+'</div></div><div class="op"><span class="ben-d">'+K.dorso('Beneficio')+'</span><div><b>Beneficio</b>'+precioIc(P.PRECIO.B,22)+'</div></div><div class="op"><span class="ben-d">'+K.dorso('Jugador')+'</span><div><b>Jugador, en un Mercado de Pases</b><span class="ics">'+token('V',22)+token('E',22)+'</span></div></div></div>';}
function tabMercados(g,me){
  var ks=Object.keys(me.conoce);
  if(!ks.length)return '<div class="nota">Todavía no viste ningún Mercado de Pases. Acá queda lo que veas: desde el Palco, con Espionaje o entrando a uno.</div>';
  return ks.map(function(m){var c=me.conoce[m];return '<div class="carta"><p><b>'+esc(nombreMercado(g,+m))+'</b> (lo viste en el turno '+c.t+')</p>'+(c.c.length?'<div class="pz-eq">'+c.c.map(function(x){return '<button class="cartita" data-vercarta="'+x.club+'-'+x.pos+'" aria-label="Ver a '+esc(P.nombreCarta(x))+'">'+K.jugador(x.club,x.pos)+'</button>';}).join('')+'</div>':'<p>Vacío</p>')+'</div>';}).join('');
}
function disco(n,c){return '<span class="dsc" style="background:'+c+'">'+n+'</span>';}
function tabIsla(g){
  var s='<h3 style="font-size:16px">Zonas de Mala Fama</h3><div class="nota">Cuando sale su número, sacás 1 Multa si tu cono la toca.</div>';
  [0,1,2,3,4].map(function(i){return {i:i,n:g.num[11+i]};}).sort(function(a,b){return a.n-b.n;}).forEach(function(z){s+='<div class="op">'+disco(z.n,'#111')+'<div><b>'+esc(P.ZONA[z.i])+'</b>'+esc(ZONA_TXT[z.i])+'</div></div>';});
  s+='<h3 style="font-size:16px;margin-top:6px">Estadios y predios</h3>';
  P.REC.forEach(function(r){s+='<div class="op">'+disco(P.NUM[r],COL[r])+'<div><b>'+P.NOMBRE_REC[r]+' · '+esc(P.CLUB[r])+'</b>'+esc(P.ESTADIO[r])+' y '+esc(P.PREDIO[r])+'</div></div>';});
  s+='<div class="op">'+disco(1,'#b8862b')+'<div><b>El Palco</b>Desde cada vértice se ven los dos Mercados más cercanos. Con cada 1, el que esté en un vértice saca Multa.</div></div>';
  return s;
}
function tabRegistro(g,yo){return '<div class="reg" aria-live="polite">'+g.log.filter(function(l){return l.solo<0||l.solo===yo;}).slice(-60).reverse().map(function(l){return '<div'+(l.solo>=0?' class="priv"':'')+'>'+esc(l.t)+'</div>';}).join('')+'</div>';}

// ---------- Ventanas: cartas grandes, uso de Beneficios y negociación ----------
function usarBen(g,yo,b){var B=P.BENEF[b];
  if(b==='gas'){ui.modal={tipo:'gas',nodos:[]};pintar();window.scrollTo(0,0);return;}
  if(b==='espionaje'){ui.modal={tipo:'tocarMercado'};pintar();window.scrollTo(0,0);return;}
  if(!B.p){ui.modal=null;limpiarModales();if(sala.enviar(yo,{t:'usar',b:b})&&B.g==='mov')window.scrollTo(0,0);return;}
  ui.modal={tipo:'usar',b:b,a:{}};pintar();
}
function pintarModal(g,yo,me){
  var M=ui.modal,s='';
  if(M.tipo==='dt'){var zd=PIZ[M.dt],dd=P.DTS[M.dt];s='<div class="dt-grande">'+K.dtEntero(M.dt)+'</div><h2 style="margin:0">'+esc(dd.nombre)+'</h2><p class="dt-frase">"'+esc(zd.frase)+'"</p><p style="margin:0">'+esc(zd.como)+'</p><p style="margin:0"><b>Cómo juega.</b> '+esc(zd.estilo)+'</p><button class="bt" data-cerrar>Cerrar</button>';}
  if(M.tipo==='jug'){var c={club:M.club,pos:M.pos};s='<div class="grande">'+K.jugador(c.club,c.pos)+'</div><p style="margin:0"><b>'+P.POS[c.pos]+' de '+P.NOMBRE_REC[c.club]+'.</b> '+habilidadCarta(c)+'</p><button class="bt" data-cerrar>Cerrar</button>';}
  if(M.tipo==='ben'){var ok=!M.solo&&!M.nuevo&&P.puedeUsarB(g,yo,M.b)&&!g.oferta;
    s='<div class="grande">'+K.beneficio(P.BENEF[M.b].n)+'</div>';
    if(!M.solo)s+=M.nuevo?'<p class="nota" style="margin:0">Recién comprado: se usa desde tu próximo turno.</p>':(ok?'':'<p class="nota" style="margin:0">'+esc(me.usoB&&yo===g.turno?'Ya usaste un Beneficio en este turno.':(yo!==g.turno?'Se usa en tu turno.':(P.BENEF[M.b].g==='mov'?'Se usa cuando te toca mover.':'Ahora no se puede usar.')))+'</p>');
    s+='<div class="fila"><button class="bt" data-cerrar>Cerrar</button>'+(ok?'<button class="bt fuerte" id="usarB">Usar</button>':'')+'</div>';}
  if(M.tipo==='visto'){var cs=g.mercados[M.m];s='<h2>'+esc(nombreMercado(g,M.m))+'</h2><div class="pz-eq">'+cs.map(function(x){return '<div class="cartita">'+K.jugador(x.club,x.pos)+'</div>';}).join('')+'</div><p class="nota" style="margin:0">Queda anotado en tu pestaña Mercados: los demás no lo ven.</p><button class="bt fuerte" data-cerrar>Listo</button>';}
  if(M.tipo==='usar'){var B=P.BENEF[M.b],ps=B.p||[];s='<h2>'+esc(B.n)+'</h2><p style="margin:0">'+esc(B.t)+'</p>';
    ps.forEach(function(p){
      if(p==='r'||p==='r2'||p==='da'){s+='<div class="nota" style="font-weight:700">'+(p==='da'?'Devolvés:':(p==='r2'?'Y también:':(M.b==='barrida'?'Recurso:':'Tomás:')))+'</div><div class="sel">'+P.REC.map(function(r){var dis=p==='da'&&(me.mano[r]<1||!P.usable(me,r));return '<button class="chip ic" data-par="'+p+'" data-val="'+r+'" aria-label="'+P.NOMBRE_REC[r]+'" aria-pressed="'+(M.a[p]===r)+'"'+(dis?' disabled':'')+'>'+icono(r,26)+'</button>';}).join('')+'</div>';}
      if(p==='dt')s+='<div class="nota" style="font-weight:700">DT:</div><div class="sel">'+g.jug.filter(function(q){return q.id!==yo;}).map(function(q){return '<button class="chip" data-par="dt" data-val="'+q.id+'" aria-pressed="'+(M.a.dt===q.id)+'">'+esc(q.nombre)+'</button>';}).join('')+'</div>';
      if(p==='tk')s+='<div class="nota" style="font-weight:700">Das tu Token de:</div><div class="sel">'+[['V','Victoria'],['E','Efectivo']].map(function(t){return '<button class="chip ic" data-par="tk" data-val="'+t[0]+'" aria-pressed="'+(M.a.tk===t[0])+'"'+(me[t[0]]>0?'':' disabled')+'>'+token(t[0],24)+t[1]+'</button>';}).join('')+'</div>';
      if(p==='pos')s+='<div class="nota" style="font-weight:700">Posición:</div><div class="sel">'+P.POS.map(function(n,i){return '<button class="chip" data-par="pos" data-val="'+i+'" aria-pressed="'+(M.a.pos===i)+'"'+(me.eq[i]?'':' disabled')+'>'+n+'</button>';}).join('')+'</div>';
    });
    var listo=ps.every(function(p){return p==='nodos'||M.a[p]!=null;});
    s+='<div class="fila"><button class="bt" data-cerrar>Cancelar</button><button class="bt fuerte" id="confirmarB"'+(listo?'':' disabled')+'>Usar</button></div>';}
  if(M.tipo==='nego'){var o=M;
    s='<h2>'+(o.contra?'Contraoferta':'Negociar')+'</h2>';
    if(!o.contra)s+='<div class="sel">'+(yo===g.turno?'<button class="chip" data-nda="-1" aria-pressed="'+(o.a===-1)+'">A todos: el primero que acepte</button>':'')+g.jug.filter(function(q){return q.id!==yo&&(yo===g.turno||q.id===g.turno);}).map(function(q){return '<button class="chip" data-nda="'+q.id+'" aria-pressed="'+(o.a===q.id)+'">'+esc(q.nombre)+'</button>';}).join('')+'</div>';
    s+='<div class="negocio"><b></b><b style="text-align:center">Das</b><b style="text-align:center">Pedís</b>'+P.REC.map(function(r){return '<span class="neg-i">'+icono(r,30)+'<small>'+me.mano[r]+'</small></span><div class="num"><button data-nd="'+r+'" data-s="-1" aria-label="Das menos de '+P.NOMBRE_REC[r]+'">−</button><span>'+o.doy[r]+'</span><button data-nd="'+r+'" data-s="1" aria-label="Das más de '+P.NOMBRE_REC[r]+'"'+(o.doy[r]>=me.mano[r]||!P.usable(me,r)?' disabled':'')+'>+</button></div><div class="num"><button data-np="'+r+'" data-s="-1" aria-label="Pedís menos de '+P.NOMBRE_REC[r]+'">−</button><span>'+o.pido[r]+'</span><button data-np="'+r+'" data-s="1" aria-label="Pedís más de '+P.NOMBRE_REC[r]+'">+</button></div>';}).join('')+'</div>';
    s+='<div class="fila"><button class="bt" data-cerrar>Cancelar</button><button class="bt fuerte" id="enviarO"'+(o.a!=null&&P.suma(o.doy)&&P.suma(o.pido)?'':' disabled')+'>Ofrecer</button></div>';}
  var c2=el('<div class="modal" role="dialog" aria-modal="true"><div class="hoja">'+s+'</div></div>').firstChild;document.body.appendChild(c2);
  function cierra(){ui.modal=null;limpiarModales();pintar();avanzarBots();}
  c2.querySelectorAll('[data-cerrar]').forEach(function(x){x.onclick=cierra;});
  var ub=c2.querySelector('#usarB');if(ub)ub.onclick=function(){limpiarModales();usarBen(g,yo,M.b);};
  c2.querySelectorAll('[data-par]').forEach(function(x){x.onclick=function(){var v=x.dataset.val;if(x.dataset.par==='dt'||x.dataset.par==='pos')v=+v;M.a[x.dataset.par]=v;limpiarModales();pintarModal(g,yo,me);};});
  var cb=c2.querySelector('#confirmarB');if(cb)cb.onclick=function(){var a=Object.assign({t:'usar',b:M.b},M.a);limpiarModales();ui.modal=null;sala.enviar(yo,a);};
  c2.querySelectorAll('[data-nda]').forEach(function(x){x.onclick=function(){M.a=+x.dataset.nda;limpiarModales();pintarModal(g,yo,me);};});
  c2.querySelectorAll('[data-nd]').forEach(function(x){x.onclick=function(){M.doy[x.dataset.nd]=Math.max(0,M.doy[x.dataset.nd]+ +x.dataset.s);limpiarModales();pintarModal(g,yo,me);};});
  c2.querySelectorAll('[data-np]').forEach(function(x){x.onclick=function(){M.pido[x.dataset.np]=Math.max(0,M.pido[x.dataset.np]+ +x.dataset.s);limpiarModales();pintarModal(g,yo,me);};});
  var eo=c2.querySelector('#enviarO');if(eo)eo.onclick=function(){var a={t:M.contra?'contra':'proponer',a:M.a,doy:M.doy,pido:M.pido};limpiarModales();ui.modal=null;sala.enviar(yo,a);};
}
function limpiarModales(){document.querySelectorAll('.modal').forEach(function(m){m.remove();});}

// ---------- Botones ----------
function conectar(g,yo,me){
  limpiarModales();
  var $=function(id){return document.getElementById(id);};
  function on(id,fn){var x=$(id);if(x)x.onclick=fn;}
  function todos(sel,fn){app.querySelectorAll(sel).forEach(function(x){x.onclick=function(){fn(x);};});}
  on('otra',function(){dejarSala(true);sala.borrar();ui.modal=null;pantallaInicio();});
  on('salir',function(){clearTimeout(timerBot);dejarSala(false);sala.g=null;ui.modal=null;pantallaInicio();});
  on('animTog',function(){ui.sinAnim=!ui.sinAnim;try{localStorage.setItem('pexa-sin-anim',ui.sinAnim?'1':'0');}catch(e){}pintar();});
  on('verFestejo',function(){mostrarMundial(g);});
  on('irPalco',function(){window.scrollTo(0,0);});
  on('pausaTog',function(){ui.pausa=!ui.pausa;pintar();if(!ui.pausa)avanzarBots();});
  todos('[data-tabver]',function(x){ui.tabVer=x.dataset.tabver;pintar();});
  on('tirar',function(){sala.enviar(yo,{t:'tirar'});});
  on('quedarse',function(){sala.enviar(yo,{t:'quedarse'});});
  on('noEspiar',function(){sala.enviar(yo,{t:'noEspiar'});});
  on('cancelarM',function(){ui.modal=null;pintar();});
  on('fin',function(){ui.bancoDa=null;sala.enviar(yo,{t:'fin'});});
  on('abrir',function(){sala.enviar(yo,{t:'abrir'});});
  on('cerrarM',function(){sala.enviar(yo,{t:'cerrar'});});
  on('irCanjes',function(){ui.tab='canjes';pintar();var tb=app.querySelector('.tabs');if(tb)tb.scrollIntoView();});
  on('comprarB',function(){sala.enviar(yo,{t:'beneficio'});});
  on('descartar',function(){var d=ui.descarte;ui.descarte=null;sala.enviar(yo,{t:'descartar',mapa:d});});
  on('negociar',function(){ui.modal={tipo:'nego',a:-1,doy:P.vacio(),pido:P.vacio()};pintar();});
  on('ofrecer',function(){if(!sala.red)clearTimeout(timerBot);ui.modal={tipo:'nego',a:g.turno,doy:P.vacio(),pido:P.vacio()};pintar();});
  on('contraof',function(){var o=g.oferta;ui.modal={tipo:'nego',contra:true,a:o.de,doy:Object.assign({},o.pido),pido:Object.assign({},o.doy)};pintar();});
  todos('[data-tab]',function(x){ui.tab=x.dataset.tab;pintar();});
  todos('[data-verdt]',function(x){var v=+x.dataset.verdt;ui.verDT=v===yo?null:v;pintar();});
  todos('[data-verficha]',function(x){ui.modal={tipo:'dt',dt:+x.dataset.verficha};pintar();});
  todos('[data-vercarta]',function(x){var q=x.dataset.vercarta.split('-');ui.modal={tipo:'jug',club:q[0],pos:+q[1]};pintar();});
  todos('[data-verb]',function(x){ui.modal={tipo:'ben',b:x.dataset.verb,nuevo:x.dataset.nuevo==='1',solo:x.dataset.solo==='1'};pintar();});
  todos('[data-pagar]',function(x){sala.enviar(yo,{t:'pagar',r:x.dataset.pagar,con:x.dataset.con||undefined});});
  todos('[data-token]',function(x){sala.enviar(yo,{t:'token',tk:x.dataset.token});});
  todos('[data-da]',function(x){ui.bancoDa=x.dataset.da;pintar();});
  todos('[data-toma]',function(x){var d=ui.bancoDa;ui.bancoDa=null;sala.enviar(yo,{t:'banco',da:d,toma:x.dataset.toma});});
  todos('[data-usados]',function(x){sala.enviar(yo,{t:'usados',toma:x.dataset.usados});});
  todos('[data-contratar]',function(x){sala.enviar(yo,{t:'contratar',i:+x.dataset.contratar});});
  todos('[data-cambiar]',function(x){sala.enviar(yo,{t:'cambiar',i:+x.dataset.cambiar,tk:x.dataset.tk});});
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
  var cr=document.getElementById('crearSala'),un=document.getElementById('unirme'),vu=document.getElementById('volverSala'),co=document.getElementById('codSala');
  var pedir=new URLSearchParams(location.search).get('sala');if(pedir&&co)co.value=pedir.toUpperCase();
  cr.onclick=function(){var n=leerNombreInput();if(!n){mostrarError('Poné tu nombre.');return;}crearSala(n);};
  un.onclick=function(){var n=leerNombreInput(),c=(co.value||'').trim().toUpperCase();if(!n){mostrarError('Poné tu nombre.');return;}if(c.length!==4){mostrarError('El código tiene 4 letras.');return;}entrarSala(c,n);};
  if(vu)vu.onclick=function(){entrarSala(guardada,leerNombreInput()||'DT');};
}
function crearSala(nombre){
  var c=codigoNuevo(),red=PEXA_RED.abrir(c),id=idCliente();
  var l={n:4,modo:'completo',host:id,a:[{id:id,nom:nombre},null,null,null,null]};
  red.transaccion('lobby',function(cur){if(cur)return;return JSON.stringify(l);},function(ok){if(!ok){red.parar();crearSala(nombre);return;}conectarSala(c,red);});
}
function entrarSala(c,nombre){
  var red=PEXA_RED.abrir(c),id=idCliente(),err=null;
  red.transaccion('lobby',function(cur){err=null;if(cur==null)return null;var l=JSON.parse(cur),i;
    for(i=0;i<5;i++)if(l.a[i]&&l.a[i].id===id){if(nombre)l.a[i].nom=nombre;return JSON.stringify(l);}
    if(l.empezo){err='Esa sala ya arrancó sin vos.';return;}
    for(i=0;i<l.n;i++)if(!l.a[i]){l.a[i]={id:id,nom:nombre};return JSON.stringify(l);}
    err='La sala está llena.';return;},
    function(ok,val){if(err||!val){red.parar();mostrarError(err||'No existe esa sala.');return;}conectarSala(c,red);});
}
function conectarSala(c,red){
  sala.red=red;sala.codigo=c;sala.g=null;ui.lobby=null;reiniciarVista();ui.modal=null;ui.tab='canjes';ui.verDT=null;
  try{localStorage.setItem('pexa-sala',c);}catch(e){}
  var id=idCliente();
  red.escuchar('lobby',function(txt){if(!txt||sala.red!==red)return;ui.lobby=JSON.parse(txt);if(!sala.g)pantallaLobby();});
  red.escuchar('partida',function(txt){if(!txt||sala.red!==red)return;
    if(!sala.g){var g=JSON.parse(txt),s=-1;g.jug.forEach(function(p){if(p.cid===id)s=p.id;});if(s<0){dejarSala(true);mostrarError('Esa sala ya arrancó sin vos.');pantallaInicio();return;}
      sala.asiento=s;sala.soyHost=g.host===id;if(g.fase==='fin')ui.festejo=true;}
    sala.recibir(txt);});
}
function dejarSala(olvidar){if(sala.red){sala.red.parar();sala.red=null;sala.g=null;}document.title='PEXA Dream Team';if(olvidar){try{localStorage.removeItem('pexa-sala');}catch(e){}}}
function pantallaLobby(){
  var l=ui.lobby,id=idCliente(),host=l.host===id,c=sala.codigo,link=location.origin+location.pathname+'?sala='+c,listos=true;
  var dts=l.dts||[0,1,2,3,4];
  var s='<div class="ini"><h1 style="font-size:30px">Sala<small>'+esc(c)+'</small></h1>';
  s+='<div class="aviso"><b>Pasales el link a tus amigos</b>Entran, ponen su nombre y listo. Si no, el código es <b style="display:inline;font-size:inherit">'+esc(c)+'</b>.</div><a class="bt fuerte" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent('¿Jugamos a PEXA? Entrá acá: '+link)+'">Mandar por WhatsApp</a><button class="bt chico" id="copiarLink">Copiar el link</button>';
  if(host){s+='<div class="sel" role="group" aria-label="Cuántos DTs">'+[2,3,4,5].map(function(n){return '<button class="chip" data-ln="'+n+'" aria-pressed="'+(l.n===n)+'">'+n+' DTs</button>';}).join('')+'</div><div class="sel" role="group" aria-label="Duración"><button class="chip" data-lm="completo" aria-pressed="'+(l.modo==='completo')+'">Completo: 4 Jugadores</button><button class="chip" data-lm="rapido" aria-pressed="'+(l.modo==='rapido')+'">Rápido: 3 Jugadores</button></div>';}
  else s+='<p class="nota" style="margin:0">'+l.n+' DTs · partido '+(l.modo==='rapido'?'rápido (3 Jugadores)':'completo (4 Jugadores)')+'.</p>';
  for(var i=0;i<l.n;i++){var a=l.a[i],dq=dts[i];if(!a)listos=false;
    s+='<div class="asiento"><div class="dt-cara"><span class="dt-tog chico">'+K.retrato(dq)+'</span><button class="dt-mas" data-verficha="'+dq+'" aria-label="Conocer a '+P.DTS[dq].nombre+'">+</button></div><div class="as-n"><b>'+P.DTS[dq].nombre+'</b><br>'+(a?(a.bot?'La máquina':esc(a.nom||P.DTS[dq].nombre)+(a.id===id?' (vos)':'')+(a.id===l.host?' · armó la sala':'')):'<em>Esperando a alguien…</em>')+'</div>'+(host&&(!a||a.bot)?'<button class="bt chico" data-lb="'+i+'">'+(a?'Dejar lugar':'Máquina')+'</button>':'')+'</div>';}
  var miSi=-1;l.a.forEach(function(q,ix){if(q&&q.id===id&&ix<l.n)miSi=ix;});
  if(miSi>=0)s+='<h3 style="font-size:16px;margin:0">Cambiá de DT</h3><div class="dt-fila-sel">'+[0,1,2,3,4].map(function(v){var ixv=dts.indexOf(v),ocup=ixv<l.n&&l.a[ixv]&&!l.a[ixv].bot&&ixv!==miSi;return '<button class="dt-tog chico'+(dts[miSi]===v?' mio':'')+'" data-lpick="'+v+'" aria-label="Elegir a '+P.DTS[v].nombre+'" aria-pressed="'+(dts[miSi]===v)+'"'+(ocup?' disabled':'')+'>'+K.retrato(v)+'</button>';}).join('')+'</div>';
  if(host)s+='<button class="bt oro" id="arrancar"'+(listos?'':' disabled')+'>'+(listos?'¡Arrancar el partido!':'Faltan lugares por completar')+'</button>';
  else s+='<div class="aviso"><b>Ya estás adentro</b>Esperá a que arranque el que armó la sala.</div>';
  s+='<button class="bt chico" id="dejarLobby">Salir de la sala</button></div>';
  app.innerHTML=s;
  function lob(fn){sala.red.transaccion('lobby',function(cur){if(cur==null)return null;var x=JSON.parse(cur);fn(x);return JSON.stringify(x);},function(){});}
  document.getElementById('copiarLink').onclick=function(){try{navigator.clipboard.writeText(link).then(function(){mostrarAviso('Link copiado.');},function(){mostrarAviso(link);});}catch(e){mostrarAviso(link);}};
  document.getElementById('dejarLobby').onclick=function(){if(!host)lob(function(x){x.a=x.a.map(function(q){return q&&q.id===id?null:q;});});dejarSala(true);pantallaInicio();};
  app.querySelectorAll('[data-ln]').forEach(function(x){x.onclick=function(){var n=+x.dataset.ln;lob(function(y){for(var k=n;k<5;k++)if(y.a[k]&&!y.a[k].bot)return;for(var k2=n;k2<5;k2++)y.a[k2]=null;y.n=n;});};});
  app.querySelectorAll('[data-lm]').forEach(function(x){x.onclick=function(){lob(function(y){y.modo=x.dataset.lm;});};});
  app.querySelectorAll('[data-verficha]').forEach(function(x){x.onclick=function(){ui.modal={tipo:'dt',dt:+x.dataset.verficha};pintarModal(null,null,null);};});
  app.querySelectorAll('[data-lpick]').forEach(function(x){x.onclick=function(){var v=+x.dataset.lpick;lob(function(y){var dd=y.dts||[0,1,2,3,4],me=-1;y.a.forEach(function(q,ix){if(q&&q.id===id&&ix<y.n)me=ix;});if(me<0)return;var o=dd.indexOf(v);if(o<y.n&&y.a[o]&&!y.a[o].bot&&o!==me)return;var t=dd[me];dd[me]=v;dd[o]=t;y.dts=dd;});};});
  app.querySelectorAll('[data-lb]').forEach(function(x){x.onclick=function(){var k=+x.dataset.lb;lob(function(y){if(y.a[k]&&!y.a[k].bot)return;y.a[k]=y.a[k]?null:{bot:true};});};});
  var ar=document.getElementById('arrancar');if(ar)ar.onclick=function(){
    var d=[];for(var i2=0;i2<l.n;i2++){var q=l.a[i2],dq2=dts[i2];d.push({dt:dq2,nombre:q.bot?P.DTS[dq2].nombre:(q.nom||P.DTS[dq2].nombre),bot:!!q.bot,cid:q.id||null});}
    var txt=JSON.stringify(P.nuevaPartida({dts:d,modo:l.modo,semilla:Math.floor(Math.random()*1e9),t0:Date.now(),host:l.host}));
    sala.red.transaccion('partida',function(cur){if(cur)return;return txt;},function(ok){if(ok)lob(function(y){y.empezo=true;});});};
}
pintar();
(function(){var c=new URLSearchParams(location.search).get('sala');if(c&&window.PEXA_RED&&PEXA_RED.disponible()&&!sala.g){var n=miNombre();if(n)entrarSala(c.toUpperCase(),n);}})();
window.PEXA_SALA=sala;window.PEXA_UI=ui;window.PEXA_PINTAR=pintar;
})();
