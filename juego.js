// PEXA: Dream Team, versión digital. El motor del juego para personas: mismas reglas que reglamento-pexa.html.
// El estado de la partida es un objeto plano (se puede guardar y mandar por internet tal cual) y todo pasa por accion(g, quien, acc).
(function(root){
'use strict';

var REC=['gol','suerte','picardia','fans','sponsors'];
var NOMBRE_REC={gol:'Gol',suerte:'Suerte',picardia:'Picardía',fans:'Fans',sponsors:'Sponsors'};
var CLUB={gol:'Sportivo Goleador',suerte:'Trébol Athletic',picardia:'Deportivo Viveza',fans:'Hinchada Unida',sponsors:'Sponsor Juniors'};
var MULTA={gol:'Offside',suerte:'Mufa',picardia:'VAR',fans:'Mala Prensa',sponsors:'Corrupción'};
var PRECIO={V:{gol:2,suerte:1,picardia:1},E:{picardia:1,fans:1,sponsors:2},B:{suerte:1,fans:1}};
var INNER=['gol','suerte','picardia','fans','sponsors'];
var NUM={gol:2,suerte:3,picardia:4,fans:5,sponsors:6};
var ESTADIO={gol:'La Canasta',suerte:'La Fortuna',picardia:'La Astucia',fans:'La Pasión',sponsors:'Estadio La Serena'};
var PREDIO={gol:'Bajo Nono',suerte:'Restaurante La Serena',picardia:'Banadi',fans:'La Milla',sponsors:'La Canterita'};
var ZONA=['Estacionamiento La Canterita','Rotisería El Chulengo','Cementerio de Rodillas','Diario La Pipeta','Oficina del Sapo'];
var POS=['Arquero','Defensor','Volante','Delantero'];
var HABILIDAD=['Podés usar su Recurso para pagar cualquier Multa.','Al contratarlo devolvés todas tus Multas de su Recurso. Desde ahí, esa Multa te rebota: no te cae. Y si un rival la paga, ese pago es tuyo.','En cualquier lugar cambiás 2 de su Recurso por 1 a elección. En la Boletería de su Recurso, 1 por 1.','Cuando cobrás su Recurso, levantás el doble.'];
var PLANTEL={gol:['Polaco','Moncho','Nano','Cocho'],suerte:['Caba','Mosca','Tanos','Topo'],picardia:['Pipes','Tomo','Krupo','Chun'],fans:['Tuki','Joaquinho','Baigo','Juane'],sponsors:['Nico','Falso Topo','Guido','Cale']};
var DTS=[{id:'abuelo',nombre:'El Abuelo',color:'#233a7a',tinta:'#f6efe0'},{id:'mister',nombre:'El Míster',color:'#26231f',tinta:'#f6efe0'},{id:'dona',nombre:'La Doña',color:'#e77fb3',tinta:'#2b2620'},{id:'loco',nombre:'El Terror del Río',color:'#ee2a24',tinta:'#fff'},{id:'profe',nombre:'El Gallo',color:'#1fa89a',tinta:'#f6efe0'}];
// Las cinco Cábalas (las fichas de los DTs), cada una de su color: por defecto, una por DT en el orden de los DTs
var CONOS=[{c:'#233a7a',t:'#f6efe0',n:'Cono',o:'cono',col:'azul Piluso'},{c:'#26231f',t:'#f6efe0',n:'Muleta',o:'muleta',col:'negra'},{c:'#e77fb3',t:'#2b2620',n:'Piluso',o:'piluso',col:'rosa'},{c:'#ee2a24',t:'#fff',n:'Botín',o:'botin',col:'rojo'},{c:'#1fa89a',t:'#f6efe0',n:'Guante',o:'guante',col:'turquesa'}];
// El azul del Cono y el rojo del Botín se parecen a Gol y Sponsors, pero la forma las distingue
var BENEF={
  tactica:{n:'Cambio de Táctica',t:'Después de tirar, elegí con qué dado mover.',g:'mov'},
  ganador:{n:'Equipo que gana no se toca',t:'Después de tirar, podés no mover tu Cábala.',g:'mov'},
  contra:{n:'Contraataque',t:'Después de tirar, mové la suma de los dos dados.',g:'mov'},
  libre:{n:'Cancha Libre',t:'Este turno tu Cábala puede pasar por encima de Cábalas y Barrabravas.',g:'mov'},
  volador:{n:'Arquero Volador',t:'Después de tirar, mové una intersección más o una menos de lo que marca el dado blanco.',g:'mov'},
  jet:{n:'Jet Privado',t:'En vez de mover, poné tu Cábala en cualquier intersección libre. También sirve para levantar la Copa en el centro del Palco si ya cumplís todo para ganar.',g:'mov'},
  extra:{n:'Recurso Extra',t:'Tomá del Banco 1 Recurso a elección.',p:['r']},
  uno:{n:'Intercambio 1:2',t:'Devolvé 1 Recurso al Banco y tomá 2 a elección.',p:['da','r','r2']},
  asistencia:{n:'Asistencia Forzosa',t:'Robale 1 Recurso al azar a cada DT.'},
  descuento:{n:'Alargue',t:'Tirá el dado azul. Solo vos cobrás, y solo Recursos. Si tu Cábala no toca un hexágono con ese número, no cobrás nada; si lo toca, levantás el doble.'},
  barrida:{n:'Barrida',t:'Elegí un DT y nombrá un Recurso: te llevás todos los que tenga de ese tipo. Si no tiene ninguno, perdiste el Beneficio.',p:['dt','r']},
  penal:{n:'Penal Burdo',t:'Tirá un dado. Con 4, 5 o 6, tomá un Token de Victoria. Con 1, 2 o 3, lo atajaron.'},
  dudoso:{n:'Penal Dudoso',t:'Tirá un dado. Con 4, 5 o 6, tomá un Token de Efectivo. Con 1, 2 o 3, lo atajaron.'},
  amnistia:{n:'Amnistía',t:'Hacé un canje o un intercambio como si no tuvieras Multas. Vale para una sola operación.'},
  exento:{n:'Amigo del Poder',t:'Devolvé todas tus Multas sin pagarlas.'},
  adentro:{n:'La Tenés Adentro',t:'Pasale todas tus Multas a otro DT (hasta llegar a su límite de 5).',p:['dt']},
  mano:{n:'La Mano de Dios',t:'Tomá 1 Token de Victoria del Banco.'},
  petro:{n:'Petrodólares',t:'Tomá 1 Token de Efectivo del Banco.'},
  valor:{n:'Valor por Valor',t:'Cambiá con el Banco 1 Token tuyo por uno del otro tipo.',p:['tk']},
  intervalores:{n:'Intercambio de Valores',t:'Cambiale a otro DT 1 Token tuyo por uno suyo del otro tipo. No se puede negar.',p:['dt','tk']},
  espionaje:{n:'Espionaje',t:'Mirá en secreto las cartas de un Mercado de Pases.',p:['m']},
  figuritas:{n:'Cambio de Figuritas',t:'Elegí un DT que tenga un Jugador de una posición que vos también tenés: se cambian esos dos Jugadores.',p:['dt','pos']},
  dame:{n:'Dame un Beneficio',t:'Robale al azar 1 Beneficio sin usar a otro DT.',p:['dt']},
  roja:{n:'Tarjeta Roja',t:'Elegí un DT: en su próximo turno no mueve su Cábala.',p:['dt']},
  gas:{n:'Gas Pimienta',t:'Reubicá a todos los Barrabravas en intersecciones libres de la Avenida Circunvalación.',p:['nodos']},
  arreglo:{n:'Sospechoso Arreglo',t:'Este turno movés los Barrabravas antes que tu Cábala.',g:'mov'}
};

// ---------- Tablero ----------
// Áreas: 0 Palco · 1-5 estadios · 6-10 predios · 11-15 zonas de mala fama. Intersecciones: A (vértices del Palco), B (arranque), Cm, Cp, Dm, Dp, E (Mercado de Pases), F (Boletería).
var NODOS=[],ADJ=[],DIST=[],ANILLO=[],PALCO=[],MERCADOS=[];
var BASE={A:0,B:5,Cm:10,Cp:15,Dm:20,Dp:25,E:30,F:35}, CENTRO=40;
function ix(t,i){return BASE[t]+((i%5)+5)%5;}
(function(){
  for(var k=0;k<40;k++){NODOS.push({id:k,areas:[]});ADJ.push([]);}
  function ar(t,i,l){var n=NODOS[ix(t,i)];n.areas=l;n.t=t;n.i=i;}
  function ed(a,b){if(ADJ[a].indexOf(b)<0){ADJ[a].push(b);ADJ[b].push(a);}}
  for(var i=0;i<5;i++){var s=(i+1)%5,a=(i+4)%5;
    ar('A',i,[0,1+i,1+s]);ar('B',i,[1+i,1+s,6+i]);ar('Cm',i,[1+i,11+i,6+a]);ar('Cp',i,[1+i,11+i,6+i]);
    ar('Dm',i,[11+i,6+a]);ar('Dp',i,[11+i,6+i]);ar('E',i,[11+i]);ar('F',i,[6+i]);}
  for(var i=0;i<5;i++){
    ed(ix('A',i),ix('A',i+1));ed(ix('A',i),ix('B',i));ed(ix('B',i),ix('Cp',i));ed(ix('Cp',i),ix('Cm',i));ed(ix('Cm',i),ix('B',i-1));
    ed(ix('Cp',i),ix('Dp',i));ed(ix('Dp',i),ix('E',i));ed(ix('E',i),ix('Dm',i));ed(ix('Dm',i),ix('Cm',i));
    ed(ix('Dp',i),ix('F',i));ed(ix('F',i),ix('Dm',i+1));
    ANILLO.push(ix('Cm',i),ix('Cp',i),ix('B',i));PALCO.push(ix('A',i));MERCADOS.push(ix('E',i));}
  for(var a2=0;a2<40;a2++){var d=[],q=[a2];for(var k2=0;k2<40;k2++)d.push(99);d[a2]=0;
    while(q.length){var u=q.shift();ADJ[u].forEach(function(v){if(d[v]>d[u]+1){d[v]=d[u]+1;q.push(v);}});}
    DIST.push(d);}
})();
var PREDIOS_OK=[];
(function(){function perm(a,l){if(l===5){PREDIOS_OK.push(a.slice());return;}
  REC.forEach(function(r){if(a.indexOf(r)>=0||r===INNER[l]||r===INNER[(l+1)%5])return;a.push(r);perm(a,l+1);a.pop();});}perm([],0);})();

// ---------- Azar con semilla: la semilla vive en el estado ----------
function az(g){var s=g.seed|0;s=s+0x6D2B79F5|0;g.seed=s;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}
function dado(g){return 1+Math.floor(az(g)*6);}
function mezclar(g,a){for(var i=a.length-1;i>0;i--){var j=Math.floor(az(g)*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function vacio(){return {gol:0,suerte:0,picardia:0,fans:0,sponsors:0};}
function suma(o){var s=0;for(var k in o)s+=o[k];return s;}
function falla(m){throw new Error(m);}

function nombreArea(g,a){if(a===0)return 'El Palco';if(a<=5)return ESTADIO[g.rec[a]];if(a<=10)return PREDIO[g.rec[a]];return ZONA[a-11];}
function nombreNodo(g,k){
  if(k===CENTRO)return 'el centro del Palco';
  var n=NODOS[k];
  if(n.t==='E')return 'el Mercado del '+g.num[11+n.i]+' ('+ZONA[n.i]+')';
  if(n.t==='F')return 'la Boletería de '+PREDIO[g.rec[6+n.i]];
  if(n.t==='A')return 'un vértice del Palco';
  return 'la esquina de '+n.areas.map(function(a){return nombreArea(g,a);}).join(', ');
}
function anotar(g,txt,solo,gp){g.nLog=(g.nLog||0)+1;var e={i:g.nLog,n:g.nTurnos,j:g.turno,t:txt,solo:solo==null?-1:solo};if(gp)e.golpe=1;g.log.push(e);if(g.log.length>160)g.log.shift();}
// Lo que le hacen a un DT: la pantalla se lo avisa en el momento
function golpe(g,txt,id){anotar(g,txt,id,true);}
// Las estadísticas del partido: se van sumando y al final salen las menciones
function st(p){return p.st||(p.st={tratos:0,compro:0,uso:0,multas:0,pago:0,frenadas:0,cobro:0,robo:0,robado:0,espio:0,cambios:0,unos:0,pasos:0,banco:0,tokens:0,dados:0,tiros:0,rojas:0,devolvio:0,enchufo:0,ajenas:0});}
// Lo que la pantalla festeja con una animación: viaja en el estado, así cada celu lo ve igual
// Para el resumen del final
function totales(g){return g.tot||(g.tot={mul:vacio(),cob:vacio(),robR:0,robB:0,dob:0,goles:0,atajados:0,rebotes:0});}
function infl(p,pos,campo,n){var c=p.eq[pos];if(!c)return;p.inf=p.inf||{};var k=c.club+c.pos,o=p.inf[k]=p.inf[k]||{};o[campo]=(o[campo]||0)+(n||1);}
function evento(g,e){g.nEvento=(g.nEvento||0)+1;e.n=g.nEvento;g.evento=e;g.evs=g.evs||[];g.evs.push(e);if(g.evs.length>8)g.evs.shift();}

// ---------- Partida ----------
// cfg: {dts:[{dt:0-4, nombre, bot}], modo:'completo'|'rapido', semilla}
function nuevaPartida(cfg){
  var n=cfg.dts.length;
  var g={v:1,reg:cfg.reglas||null,limite:cfg.limite||0,rel:null,t0:cfg.t0||0,host:cfg.host||null,seed:(cfg.semilla||1)*7919+13,n:n,modo:cfg.modo||'completo',meta:4,num:[],rec:[],porNum:[[],[],[],[],[],[],[]],banco:{},tokens:{V:6,E:6},bolsa:{},
    mazoB:[],descB:[],mercados:[],jug:[],barras:[],turno:0,primero:0,nTurnos:0,ganador:null,log:[],fase:'ubicar',faltaUbicar:[],dados:null,mv:null,descartes:{},oferta:null,barraPaso:0,tiradas:[],nTirada:0,mercadoAbierto:null,ultimaVista:null};
  var pre=PREDIOS_OK[Math.floor(az(g)*PREDIOS_OK.length)];
  g.rec[0]=null;for(var i=0;i<5;i++){g.rec[1+i]=INNER[i];g.rec[6+i]=pre[i];g.rec[11+i]=null;}
  var zonas=mezclar(g,[2,3,4,5,6]);
  g.num[0]=1;for(var k=1;k<=10;k++)g.num[k]=NUM[g.rec[k]];for(var k2=11;k2<=15;k2++)g.num[k2]=zonas[k2-11];
  for(var a=0;a<16;a++)g.porNum[g.num[a]].push(a);
  REC.forEach(function(r){g.banco[r]=20;g.bolsa[r]=4;});
  Object.keys(BENEF).forEach(function(b){if(n===5&&(b==='gas'||b==='arreglo'))return;if(n===2&&b==='gas')return;g.mazoB.push(b);});
  mezclar(g,g.mazoB);
  var cartas=[];REC.forEach(function(r){for(var p=0;p<4;p++)cartas.push({club:r,pos:p});});mezclar(g,cartas);
  for(var m=0;m<5;m++)g.mercados.push(cartas.slice(m*4,m*4+4));
  cfg.dts.forEach(function(d,j){var ini=DTS[d.dt];g.jug.push({id:j,cid:d.cid||null,dt:d.dt,nombre:d.nombre||ini.nombre,bot:!!d.bot,pos:-1,mano:vacio(),multas:vacio(),V:0,E:0,eq:[null,null,null,null],
    benef:[],nuevos:[],usados:[],conoce:{},roja:false,usoB:false,amnistia:false,contrato:false,miro:false,cus:d.cus||null,cc:d.cc!=null&&CONOS[d.cc]?d.cc:d.dt});});
  // Dos DTs con la misma Cábala no: el que llega después toma el primero libre
  // (primero se respetan los colores elegidos a mano, después los de siempre)
  var usados={},elegido=function(j){return cfg.dts[j].cc!=null&&!!CONOS[cfg.dts[j].cc];};
  [true,false].forEach(function(pasada){g.jug.forEach(function(p,j){if(elegido(j)!==pasada)return;if(usados[p.cc]){for(var c=0;c<CONOS.length;c++)if(!usados[c]){p.cc=c;break;}}usados[p.cc]=1;});});
  // Empieza el que saca más en el dado; se ubica en sentido horario desde ahí
  g.primero=Math.floor(az(g)*n);g.turno=g.primero;
  for(var q=0;q<n;q++)g.faltaUbicar.push((g.primero+q)%n);
  anotar(g,'Se arma Isla Pexa. Ubica primero '+g.jug[g.primero].nombre+'.');
  return g;
}
function ocupado(g,k,excepto){for(var j=0;j<g.jug.length;j++)if(g.jug[j].pos===k&&j!==excepto)return true;return g.barras.indexOf(k)>=0;}
function contratados(p){return p.eq.filter(Boolean).length;}
function hab(p,pos){return p.noHab===pos?null:(p.eq[pos]?p.eq[pos].club:null);}
// Partido rápido: cada Jugador cuesta 1 Token, el de Victoria para Arquero y Defensor, el de Efectivo para Volante y Delantero
function tokenDe(g,c){return g.modo==='rapido'&&g.meta===4?(c.pos<2?'V':'E'):null;}
function puedeFichar(g,p,c){var t=tokenDe(g,c);return t?p[t]>=1:p.V>=1&&p.E>=1;}
function puedeContratarAlgo(g,p){return g.modo==='rapido'&&g.meta===4?p.V+p.E>=1:p.V>=1&&p.E>=1;}
// En prueba, solo para el simulador (g.reg.defLimite): con Defensor, un tope de Multas más bajo
function maxMultas(g,p){return g.reg&&g.reg.defLimite&&hab(p,1)?g.reg.defLimite:5;}
// También en prueba, solo para el simulador (g.reg.def): otros atributos posibles para el Defensor
function defPrueba(g){return g.reg&&g.reg.def;}
function usable(p,r){return p.multas[r]===0||p.amnistia;}
// Para entrar al Palco: las Multas se pueden pagar en el acto, siempre que después quede 1 Recurso de cada tipo.
// Devuelve cómo se pagan ([multa, con qué]) o null si no alcanza. El Arquero paga cualquier Multa con su Recurso, una vez saldadas las de ese tipo.
function pagoEntrada(p,mano){
  var m={},arq=hab(p,0),orden=REC.slice(),pagos=[];REC.forEach(function(k){m[k]=mano[k];});
  if(arq){orden.splice(orden.indexOf(arq),1);orden.unshift(arq);}
  for(var i=0;i<5;i++){var r=orden[i];for(var n=0;n<p.multas[r];n++){
    if(m[r]>1){m[r]--;pagos.push([r,r]);}
    else if(arq&&arq!==r&&m[arq]>1){m[arq]--;pagos.push([r,arq]);}
    else return null;}}
  return REC.every(function(k){return m[k]>=1;})?pagos:null;
}
function gana(g,p,mano){return contratados(p)>=g.meta&&!!pagoEntrada(p,mano||p.mano);}
function boleDe(g,k){var n=NODOS[k];if(!n)return null;if(n.t==='F'||n.t==='Dp')return g.rec[6+n.i];if(n.t==='Dm')return g.rec[6+(n.i+4)%5];return null;}
function mercadoDe(k){var n=NODOS[k];return n&&n.t==='E'?n.i:-1;}
// El centro del Palco no es una intersección más: está en el Palco (le toca el 1) y se llega desde cualquier vértice
function areasDe(k){return k===CENTRO?[0]:(NODOS[k]&&NODOS[k].areas)||[];}
function dd(a,b){if(a===b)return 0;if(a===CENTRO)return 1+Math.min.apply(null,PALCO.map(function(z){return DIST[z][b];}));if(b===CENTRO)return dd(b,a);return DIST[a][b];}
// Cuántos hay que dar de r para llevarse 1 de otro: la mejor tasa que tiene el DT donde está parado
// La Boletería pide 2 de su Recurso por 1 de otro. El Volante de ese Recurso, parado en esa Boletería, cambia 1 por 1.
function tasaBanco(g,p,r,k){var t=4,v=hab(p,2);if(v===r)t=2;if(boleDe(g,k==null?p.pos:k)===r)t=v===r?1:2;return t;}
function nombreCarta(c){return PLANTEL[c.club][c.pos];}
function textoCarta(c){return nombreCarta(c)+', '+POS[c.pos]+' de '+NOMBRE_REC[c.club];}

// ---------- Armado ----------
function ubicar(g,j,k){
  if(g.faltaUbicar[0]!==j)falla('No es tu momento de ubicar.');
  if(!NODOS[k]||NODOS[k].t!=='B'||ocupado(g,k))falla('Elegí un punto de arranque libre.');
  var p=g.jug[j];p.pos=k;g.faltaUbicar.shift();
  NODOS[k].areas.forEach(function(a){var r=g.rec[a];if(r&&g.banco[r]>0){g.banco[r]--;p.mano[r]++;}});
  anotar(g,p.nombre+' arranca en '+nombreNodo(g,k)+'.');
  if(g.faltaUbicar.length)return;
  var libres=[];for(var i=0;i<5;i++)if(!ocupado(g,ix('B',i)))libres.push(ix('B',i));
  if(g.n===2){g.fase='barraIni';g.barraPaso=0;return;}
  g.barras=libres;
  empezarTurno(g);
}
function barraInicial(g,j,k){
  // Con 2 DTs: el primero pone uno en la Peatonal del Palco, el otro en un arranque libre y el primero, el último
  var quien=g.barraPaso===1?(g.primero+1)%2:g.primero;
  if(quien!==j)falla('Ahora pone el Barrabrava el otro DT.');
  if(g.barraPaso===0){if(PALCO.indexOf(k)<0||ocupado(g,k))falla('Va en un vértice libre del Palco.');}
  else if(!NODOS[k]||NODOS[k].t!=='B'||ocupado(g,k))falla('Va en un punto de arranque libre.');
  g.barras.push(k);g.barraPaso++;
  if(g.barraPaso===3)empezarTurno(g);
}

// ---------- Turno ----------
function empezarTurno(g){
  var p=g.jug[g.turno];g.nTurnos++;
  p.benef=p.benef.concat(p.nuevos);p.nuevos=[];p.usoB=false;p.contrato=false;p.miro=false;p.amnistia=false;p.propuso=0;
  if(defPrueba(g)==='limpia'&&hab(p,1)){var rl=REC.filter(function(k){return p.multas[k]>0;})[0];if(rl){p.multas[rl]--;g.bolsa[rl]++;}}
  g.dados=null;g.mv=null;g.fase='tirar';
}
function tirarDados(g){
  var p=g.jug[g.turno],d=[dado(g),dado(g)];g.dados=d;g.nTirada++;g.tiradas.push({d:d,j:g.turno});if(g.tiradas.length>5)g.tiradas.shift();
  var es=st(p);es.tiros++;es.dados+=d[0]+d[1];if(d[0]===1)es.unos++;if(d[1]===1)es.unos++;g.caras=g.caras||[0,0,0,0,0,0,0];g.caras[d[0]]++;g.caras[d[1]]++;
  anotar(g,p.nombre+' tira '+d[0]+' (azul) y '+d[1]+' (blanco).');
  g.ultTiro={n:g.nTirada,j:g.turno,d:d,cob:[],mul:[],sinB:[]};if(d[0]===d[1])totales(g).dob++;
  // Con un 1 devuelve la mitad solo el que ya tenía más de 9 antes de esta tirada
  var antes=g.jug.map(function(q){return suma(q.mano);});
  cobrar(g,d);resumenCobro(g);
  if(d[0]===1||d[1]===1)g.jug.forEach(function(q){if(antes[q.id]>9&&!(defPrueba(g)==='mano'&&hab(q,1))){var dv=Math.floor(suma(q.mano)/2);g.descartes[q.id]=dv;anotar(g,'Salió un 1 y '+q.nombre+' tenía más de 9 Recursos ('+antes[q.id]+'): devuelve la mitad, '+dv+'.');}});
  if(Object.keys(g.descartes).length){g.fase='descarte';return;}
  iniciarMover(g);
}
function cobrar(g,d){
  // Recursos primero. Si el Banco no alcanza para todos los que cobran un Recurso, ese Recurso no lo cobra nadie en esta tirada.
  var pide={};REC.forEach(function(r){pide[r]=[];});
  d.forEach(function(x){g.porNum[x].forEach(function(a){var r=g.rec[a];if(!r)return;
    g.jug.forEach(function(p){if(p.pos<0||areasDe(p.pos).indexOf(a)<0)return;pide[r].push([p,hab(p,3)===r?2:1]);});});});
  REC.forEach(function(r){var tot=0;pide[r].forEach(function(x){tot+=x[1];});if(!tot)return;
    if(tot>g.banco[r]){anotar(g,'El Banco no alcanza: nadie cobra '+NOMBRE_REC[r]+' en esta tirada.');if(g.ultTiro)g.ultTiro.sinB.push(r);return;}
    var porJ={};pide[r].forEach(function(x){x[0].mano[r]+=x[1];g.banco[r]-=x[1];porJ[x[0].id]=(porJ[x[0].id]||0)+x[1];st(x[0]).cobro+=x[1];totales(g).cob[r]+=x[1];if(x[1]>1)infl(x[0],3,'extra',x[1]-1);});
    Object.keys(porJ).forEach(function(id){if(g.ultTiro)g.ultTiro.cob.push({j:+id,r:r,n:porJ[id]});});});
  d.forEach(function(x){g.porNum[x].forEach(function(a){if(g.rec[a])return;
    g.jug.forEach(function(p){if(p.pos<0||areasDe(p.pos).indexOf(a)<0)return;sacarMulta(g,p);});});});
}
function sacarMulta(g,p){
  if(suma(p.multas)>=maxMultas(g,p))return;
  var tot=suma(g.bolsa);if(!tot)return;
  if(defPrueba(g)==='porTirada'&&hab(p,1)&&p.frT!==g.nTirada){p.frT=g.nTirada;st(p).frenadas++;return;}
  var x=az(g)*tot,r=REC[4];for(var i=0;i<5;i++){x-=g.bolsa[REC[i]];if(x<0){r=REC[i];break;}}
  if(hab(p,1)===r){st(p).frenadas++;totales(g).rebotes++;infl(p,1,'rebotes');if(g.ultTiro)g.ultTiro.mul.push({j:p.id,r:r,fr:1});return;}
  g.bolsa[r]--;p.multas[r]++;st(p).multas++;totales(g).mul[r]++;if(g.ultTiro)g.ultTiro.mul.push({j:p.id,r:r});
  if(defPrueba(g)==='rivales')g.jug.forEach(function(q){if(q.id!==p.id&&hab(q,1)===r&&g.banco[r]>0){g.banco[r]--;q.mano[r]++;}});
}
// Lo que cobró cada uno con la tirada: un renglón por DT ("El Abuelo cobra 2 Fans y 1 Corrupción"). Las Multas también se "cobran".
function resumenCobro(g){
  var u=g.ultTiro;if(!u)return;var por={},orden=[];
  function de(j){if(!por[j]){por[j]={c:{},m:[],fr:[]};orden.push(j);}return por[j];}
  u.cob.forEach(function(x){var o=de(x.j);o.c[x.r]=(o.c[x.r]||0)+x.n;});
  u.mul.forEach(function(x){var o=de(x.j);(x.fr?o.fr:o.m).push(x.r);});
  orden.sort(function(a,b){return b-a;}); // al revés: el registro se lee de lo último a lo primero
  if(!orden.length){anotarCobro(g,'Nadie cobra nada.',{nadie:1});return;}
  orden.forEach(function(j){var o=por[j],l=[];
    REC.forEach(function(r){if(o.c[r])l.push(o.c[r]+' '+NOMBRE_REC[r]);});
    var mm={};o.m.forEach(function(r){mm[r]=(mm[r]||0)+1;});REC.forEach(function(r){if(mm[r])l.push(mm[r]+' '+MULTA[r]);});
    var t=l.length?g.jug[j].nombre+' cobra '+(l.length>1?l.slice(0,-1).join(', ')+' y '+l[l.length-1]:l[0]):g.jug[j].nombre+' no cobra nada';
    if(o.fr.length)t+=' (le rebota '+o.fr.map(function(r){return MULTA[r];}).join(' y ')+' en su Defensor)';
    anotarCobro(g,t+'.',{j:j,c:o.c,m:o.m,fr:o.fr});});
}
function anotarCobro(g,txt,c){anotar(g,txt);g.log[g.log.length-1].cob=c;}
function descartar(g,j,mapa){
  var c=g.descartes[j];if(!c)falla('No tenés que devolver nada.');
  var p=g.jug[j],t=0;REC.forEach(function(r){var v=mapa[r]||0;if(v<0||v>p.mano[r])falla('No tenés tantos.');t+=v;});
  if(t!==c)falla('Tenés que devolver '+c+'.');
  REC.forEach(function(r){var v=mapa[r]||0;p.mano[r]-=v;g.banco[r]+=v;});
  var dio=limpia(mapa);delete g.descartes[j];st(p).devolvio+=c;evento(g,{t:'devuelve',de:j,doy:dio,pido:vacio(),cant:c});anotar(g,p.nombre+' devuelve '+c+' Recursos por el 1: '+textoOferta(dio)+'.');
  if(!Object.keys(g.descartes).length)iniciarMover(g);
}
// Con dobles se camina la suma de los dos dados
function pasosBase(g){return g.dados[0]===g.dados[1]?g.dados[0]+g.dados[1]:g.dados[1];}
function iniciarMover(g){
  var p=g.jug[g.turno];g.mv={pasos:[pasosBase(g)],libre:defPrueba(g)==='pasa'&&!!hab(p,1),jet:false,quieto:false,arreglo:false};
  if(p.roja){p.roja=false;anotar(g,p.nombre+' tiene Tarjeta Roja y no mueve.');despuesDeMover(g);return;}
  g.fase='mover';
}
function destinos(g,j){
  var p=g.jug[j],res={},mv=g.mv;if(!mv)return [];
  if(mv.jet){NODOS.forEach(function(n){if(!ocupado(g,n.id))res[n.id]=1;});if(gana(g,p))res[CENTRO]=1;return Object.keys(res).map(Number);}
  var puede=gana(g,p);
  mv.pasos.forEach(function(pasos){
    (function dfs(u,q,ant){
      if(q===0){if(!ocupado(g,u,j))res[u]=1;return;}
      // Al centro del Palco solo entra el que ya tiene todo para ganar, con el último paso y desde un vértice: no es lugar de paso
      if(q===1&&puede&&NODOS[u]&&NODOS[u].t==='A')res[CENTRO]=1;
      // Nunca se pega la vuelta: no se vuelve a la esquina de la que se acaba de venir. Todo lo demás vale (pasar de nuevo por una esquina o por donde se arrancó, dar la vuelta a una pieza más de una vez).
      (u===CENTRO?PALCO:ADJ[u]).forEach(function(v){if(v===ant)return;if(!mv.libre&&ocupado(g,v,j))return;dfs(v,q-1,u);});
    })(p.pos,pasos,-1);});
  return Object.keys(res).map(Number);
}
// Desde un vértice del Palco se puede mirar uno de los dos Mercados de Pases más cercanos; los otros tres quedan demasiado lejos
function mercadosCercanos(k){var n=NODOS[k];return n&&n.t==='A'?[n.i,(n.i+1)%5]:[];}
function mover(g,j,k){
  var p=g.jug[j];
  if(destinos(g,j).indexOf(k)<0)falla('A ese lugar no llegás con este número.');
  if(k===CENTRO&&defPrueba(g)==='ultimo'){var ul=g.jug.filter(function(q){return q.id!==j&&hab(q,1)&&!q.usoUlt;})[0];if(ul){ul.usoUlt=true;st(ul).frenadas++;despuesDeMover(g);return;}}
  if(p.pos>=0&&!g.mv.jet)st(p).pasos+=dd(p.pos,k);
  var dest=k===CENTRO?'':nombreNodo(g,k);
  p.pos=k;anotar(g,p.nombre+(k===CENTRO?' va al centro del Palco.':' va '+(dest.indexOf('el ')===0?'al '+dest.slice(3):'a '+dest)+'.'));
  if(k===CENTRO&&!gana(g,p)){anotar(g,p.nombre+' queda adentro del Palco sin poder levantar la Copa.');despuesDeMover(g);return;}
  if(k===CENTRO){var pg=pagoEntrada(p,p.mano);pg.forEach(function(x){pagar(g,j,x[0],x[1]);});g.comoGano={jet:!!g.mv.jet,pagos:pg.length};g.t1=Date.now();g.ganador=j;g.fase='fin';anotar(g,'¡'+p.nombre+' levanta la Copa con su Dream Team y gana el partido!');return;}
  if(NODOS[k].t==='A'&&mercadosCercanos(k).some(function(m){return g.mercados[m].length;})){g.fase='espiar';return;}
  despuesDeMover(g);
}
function quedarse(g,j){
  if(!g.mv.quieto&&destinos(g,j).length)falla('Tenés adónde moverte: el dado blanco es exacto.');
  anotar(g,g.jug[j].nombre+(g.mv.quieto?' no mueve: equipo que gana no se toca.':' no tiene camino y se queda.'));
  despuesDeMover(g);
}
function despuesDeMover(g){
  if(g.mv&&g.mv.arreglo){g.fase='canje';return;}
  iniciarBarras(g,false);
}
// Los Barrabravas avanzan solos una intersección en sentido horario, por su recorrido: la Circunvalación o la Peatonal del Palco.
// Si hay un cono en el camino lo saltan; a otro Barrabrava no lo saltan nunca: se quedan donde están.
// Gas Pimienta solo manda Barrabravas a la Avenida Circunvalación (decidido por Marcos, ronda 43)
function enRecorrido(k){return ANILLO.indexOf(k)>=0;}
function iniciarBarras(g,volver){
  g.barras.forEach(function(k,ib){var ruta=PALCO.indexOf(k)>=0?PALCO:ANILLO,pos=ruta.indexOf(k);if(pos<0)return;var s1=ruta[(pos+1)%ruta.length];
    if(g.barras.indexOf(s1)>=0)return;
    if(g.jug.some(function(q){return q.pos===s1;})){var s2=ruta[(pos+2)%ruta.length];if(g.barras.indexOf(s2)>=0||g.jug.some(function(q){return q.pos===s2;}))return;s1=s2;}
    g.barras[ib]=s1;});
  terminarBarras(g,volver);
}
function terminarBarras(g,volver){
  if(volver){g.mv.arreglo=true;g.fase='mover';return;}
  g.fase='canje';
}
function fin(g){
  if(g.oferta)falla('Primero resolvé la oferta que está en la mesa.');
  var p=g.jug[g.turno];p.amnistia=false;
  anotar(g,'Termina el turno de '+p.nombre+'.');
  g.turno=(g.turno+1)%g.n;empezarTurno(g);
}

// ---------- Multas y canjes ----------
function pagar(g,j,r,con){
  var p=g.jug[j];con=con||r;
  if(g.fase!=='canje'&&g.fase!=='mercado'&&!(g.fase==='mover'&&contratados(p)>=g.meta))falla('Ahora no podés pagar Multas.');
  if(p.multas[r]<=0)falla('No tenés esa Multa.');
  if(con!==r){if(hab(p,0)!==con)falla('Solo tu Arquero paga con otro Recurso.');if(p.multas[con]>0)falla('Antes pagá la Multa de '+NOMBRE_REC[con]+'.');}
  if(p.mano[con]<1)falla('No tenés '+NOMBRE_REC[con]+'.');
  // El pago va al Banco, salvo que un rival tenga al Defensor de ese Recurso: entonces es para él
  var def=g.jug.filter(function(q){return q.id!==j&&hab(q,1)===r;})[0];
  p.mano[con]--;p.multas[r]--;g.bolsa[r]++;
  if(def){def.mano[con]++;st(def).cobro++;st(def).ajenas++;infl(def,1,'ajenas');}else g.banco[con]++;
  if(con!==r)infl(p,0,'pagadas');
  st(p).pago++;evento(g,{t:'multa',j:j,r:r,con:con,para:def?def.id:null});anotar(g,p.nombre+' paga una Multa de '+MULTA[r]+(def?': el pago es para '+def.nombre+', por su Defensor.':'.'));
  if(def)golpe(g,'Tu Defensor cobró: '+p.nombre+' pagó la Multa de '+MULTA[r]+' y te llevás 1 de '+NOMBRE_REC[con]+'.',def.id);
}
function puedePagar(p,precio){for(var k in precio)if(!usable(p,k)||p.mano[k]<precio[k])return false;return true;}
function gastar(g,p,precio){for(var k in precio){p.mano[k]-=precio[k];g.banco[k]+=precio[k];}p.amnistia=false;}
function comprarToken(g,j,t){
  var p=g.jug[j];if(g.tokens[t]<=0)falla('El Banco no tiene Tokens de ese tipo.');
  if(!puedePagar(p,PRECIO[t]))falla('Te faltan Recursos (o los tenés trabados por una Multa).');
  gastar(g,p,PRECIO[t]);g.tokens[t]--;p[t]++;st(p).tokens++;evento(g,{t:'token',j:j,tk:t});anotar(g,p.nombre+' canjea un Token de '+(t==='V'?'Victoria':'Efectivo')+'.');
}
function comprarBeneficio(g,j){
  var p=g.jug[j];if(!g.mazoB.length)falla('Se acabó el mazo de Beneficios.');
  if(!puedePagar(p,PRECIO.B))falla('Te faltan Recursos (o los tenés trabados por una Multa).');
  gastar(g,p,PRECIO.B);var b=g.mazoB.pop();p.nuevos.push(b);st(p).compro++;evento(g,{t:'compra',j:j,b:b});
  anotar(g,p.nombre+' compra un Beneficio.');anotar(g,'Te tocó '+BENEF[b].n+'.',j);
}
function cambioBanco(g,j,da,toma){
  var p=g.jug[j];if(da===toma)falla('Elegí otro Recurso.');if(g.banco[toma]<=0)falla('El Banco no tiene de ese.');
  if(!usable(p,da))falla('Ese Recurso está trabado por una Multa.');
  var t=tasaBanco(g,p,da);if(p.mano[da]<t)falla('Necesitás '+t+' de '+NOMBRE_REC[da]+'.');
  if(boleDe(g,p.pos)===da)totales(g).bole=(totales(g).bole||0)+1;
  if(hab(p,2)===da)infl(p,2,'cambios');
  p.mano[da]-=t;g.banco[da]+=t;g.banco[toma]--;p.mano[toma]++;p.amnistia=false;
  st(p).banco++;var dio=vacio(),llevo=vacio();dio[da]=t;llevo[toma]=1;evento(g,{t:'banco',de:j,doy:dio,pido:llevo});
  anotar(g,p.nombre+' cambia '+t+' de '+NOMBRE_REC[da]+' por 1 de '+NOMBRE_REC[toma]+'.');
}
function canjearUsados(g,j,toma){
  var p=g.jug[j];if(p.usados.length<3)falla('Hacen falta 3 Beneficios usados.');if(g.banco[toma]<=0)falla('El Banco no tiene de ese.');
  g.descB=g.descB.concat(p.usados.splice(0,3));g.banco[toma]--;p.mano[toma]++;
  anotar(g,p.nombre+' cambia 3 Beneficios usados por 1 de '+NOMBRE_REC[toma]+'.');
}
// ---------- Mercado de Pases ----------
function verCartas(g,j,m,txt){g.jug[j].conoce[m]={t:g.nTurnos,c:g.mercados[m].slice()};if(txt)anotar(g,g.jug[j].nombre+' '+txt+' un Mercado de Pases.');}
function abrirMercado(g,j){
  var p=g.jug[j],m=mercadoDe(p.pos);if(m<0)falla('Tenés que estar parado en un Mercado de Pases.');
  // Se puede entrar y salir todas las veces que quieras durante el turno, también después de contratar (para mirar)
  if(!g.mercados[m].length)falla('Este Mercado se quedó sin cartas.');
  p.miro=true;g.mercadoAbierto=m;g.fase='mercado';verCartas(g,j,m);
}
function contratar(g,j,ix2){
  var p=g.jug[j],m=g.mercadoAbierto,c=g.mercados[m][ix2];if(!c)falla('Esa carta no está.');
  if(p.contrato)falla('Ya contrataste en este turno: una contratación por turno.');
  if(p.eq[c.pos])falla('Ya tenés esa posición: podés cambiarlo.');
  if(contratados(p)>=g.meta)falla('Tu equipo ya está completo.');
  if(!puedeFichar(g,p,c)){var tq=tokenDe(g,c);falla(tq?'Este Jugador se paga con 1 Token de '+(tq==='V'?'Victoria':'Efectivo')+'.':'Se paga con 1 Token de Victoria y 1 de Efectivo.');}
  var tkj=tokenDe(g,c);
  g.mercados[m].splice(ix2,1);p.eq[c.pos]=c;if(tkj){p[tkj]--;g.tokens[tkj]++;}else{p.V--;p.E--;g.tokens.V++;g.tokens.E++;}p.contrato=true;
  anotar(g,'¡'+p.nombre+' contrata a '+textoCarta(c)+'!');var dv=devuelveConDefensor(g,p,c);evento(g,{t:'jugador',j:j,c:c,cambio:false,dev:dv});cerrarMercado(g,j);
}
// Al contratar a un Defensor se devuelven a la bolsa todas las Multas de su Recurso, sin pagarlas
function devuelveConDefensor(g,p,c){
  if(c.pos!==1||!p.multas[c.club])return 0;var n=p.multas[c.club];g.bolsa[c.club]+=n;p.multas[c.club]=0;
  anotar(g,p.nombre+' devuelve '+n+' Multa'+(n===1?'':'s')+' de '+MULTA[c.club]+' gracias a su Defensor.');return n;
}
function cambiarJugador(g,j,ix2,tk){
  var p=g.jug[j],m=g.mercadoAbierto,c=g.mercados[m][ix2];if(!c)falla('Esa carta no está.');
  if(p.contrato)falla('Ya contrataste en este turno: una contratación por turno.');
  if(!p.eq[c.pos])falla('No tenés esa posición: se contrata, no se cambia.');
  if(p[tk]<1)falla('No tenés ese Token.');
  var viejo=p.eq[c.pos];g.mercados[m].splice(ix2,1);g.mercados[m].push(viejo);p.eq[c.pos]=c;p[tk]--;g.tokens[tk]++;p.contrato=true;st(p).cambios++;
  anotar(g,p.nombre+' cambia a su '+POS[c.pos]+': ahora juega '+textoCarta(c)+'.');var dv=devuelveConDefensor(g,p,c);evento(g,{t:'jugador',j:j,c:c,cambio:true,dev:dv});cerrarMercado(g,j);
}
function cerrarMercado(g,j){verCartas(g,j,g.mercadoAbierto);g.mercadoAbierto=null;g.fase='canje';}

// ---------- Negociación: siempre entre el DT del turno y otro DT. a = -1: oferta abierta a todos, la toma el primero que acepta ----------
// Al ofrecer solo se revisa lo que da el que ofrece: lo que tiene el otro es secreto. Recién al aceptar se revisa que pueda cumplir.
function validarOferta(g,o,acepta){
  if(o.de===o.a)falla('Elegí a otro DT.');
  if(o.a<0){if(o.de!==g.turno)falla('La oferta abierta la hace el DT del turno.');}
  else if(o.de!==g.turno&&o.a!==g.turno)falla('Se negocia con el DT del turno.');
  if(!suma(o.doy)||!suma(o.pido))falla('Tenés que dar y pedir algo.');
  var d=g.jug[o.de],a=o.a<0?null:g.jug[o.a];
  REC.forEach(function(r){if(o.doy[r]>0&&(d.mano[r]<o.doy[r]||!usable(d,r)))falla(d.nombre+' no puede dar '+NOMBRE_REC[r]+'.');
    if(acepta&&a&&o.pido[r]>0&&(a.mano[r]<o.pido[r]||!usable(a,r)))falla('No tenés '+NOMBRE_REC[r]+' para dar (o lo tenés trabado por una Multa).');});
}
function puedeDar(p,o){return REC.every(function(r){return o[r]<=0||(p.mano[r]>=o[r]&&usable(p,r));});}
// Si todos dijeron que no, se cae la oferta
function prepAbierta(g){var o=g.oferta;if(!o||o.a>=0)return;
  if(!o.faltan.length){g.oferta=null;anotar(g,'Nadie toma la oferta de '+g.jug[o.de].nombre+'.');}}
function proponer(g,j,a,doy,pido){
  if(g.fase!=='canje'&&g.fase!=='mercado')falla('Se negocia en la fase de canjes.');if(g.oferta)falla('Ya hay una oferta en la mesa.');
  var o={de:j,a:a,doy:limpia(doy),pido:limpia(pido),contras:0};validarOferta(g,o);g.jug[j].propuso=(g.jug[j].propuso||0)+1;
  if(a<0){o.faltan=[];for(var i=1;i<g.n;i++)o.faltan.push((j+i)%g.n);}
  g.oferta=o;
  anotar(g,g.jug[j].nombre+(a<0?' les ofrece a todos ':' le ofrece a '+g.jug[a].nombre+' ')+textoOferta(o.doy)+' por '+textoOferta(o.pido)+'.');
  prepAbierta(g);
}
function limpia(o){var r=vacio();REC.forEach(function(k){r[k]=Math.max(0,(o&&o[k])|0);});return r;}
function textoOferta(o){return REC.filter(function(r){return o[r]>0;}).map(function(r){return o[r]+' '+NOMBRE_REC[r];}).join(' + ');}
function esperan(o){return o.a<0?o.faltan.slice():[o.a];}
function responder(g,j,ok){
  var o=g.oferta;if(!o)falla('No hay oferta.');
  if(esperan(o).indexOf(j)<0&&!(o.de===j&&!ok))falla('Esa oferta no es para vos.');
  if(!ok){
    if(o.de===j){anotar(g,g.jug[j].nombre+' retira la oferta.');g.oferta=o.previa||null;prepAbierta(g);return;}
    anotar(g,g.jug[j].nombre+' dice que no.');
    if(o.a<0){o.faltan.splice(o.faltan.indexOf(j),1);prepAbierta(g);return;}
    g.oferta=o.previa||null;prepAbierta(g);return;
  }
  var t={de:o.de,a:j,doy:o.doy,pido:o.pido};validarOferta(g,t,true);g.oferta=null;
  var d=g.jug[o.de],a=g.jug[j];
  REC.forEach(function(r){d.mano[r]+=o.pido[r]-o.doy[r];a.mano[r]+=o.doy[r]-o.pido[r];});d.amnistia=false;a.amnistia=false;
  anotar(g,'¡Trato! '+d.nombre+' da '+textoOferta(o.doy)+' y '+a.nombre+' da '+textoOferta(o.pido)+'.');
  st(d).tratos++;st(a).tratos++;evento(g,{t:'trato',de:d.id,a:a.id,doy:o.doy,pido:o.pido});
}
function contraofertar(g,j,doy,pido){
  var o=g.oferta;if(!o||esperan(o).indexOf(j)<0)falla('No hay oferta para contestar.');
  var nu={de:j,a:o.de,doy:limpia(doy),pido:limpia(pido),contras:(o.contras||0)+1};validarOferta(g,nu);
  if(o.a<0){o.faltan.splice(o.faltan.indexOf(j),1);nu.previa=o;}else if(o.previa)nu.previa=o.previa;
  g.oferta=nu;
  anotar(g,g.jug[j].nombre+' contraoferta: '+textoOferta(nu.doy)+' por '+textoOferta(nu.pido)+'.');
}

// ---------- Beneficios ----------
function otro(g,j,dt){var q=g.jug[dt];if(!q||dt===j)falla('Elegí a otro DT.');return q;}
function puedeUsarB(g,j,b){
  var p=g.jug[j];if(j!==g.turno||p.benef.indexOf(b)<0||p.usoB)return false;
  if(BENEF[b].g==='mov')return g.fase==='mover';
  if(g.fase!=='mover'&&g.fase!=='canje'&&g.fase!=='mercado')return false;
  if(b==='descuento')return g.fase==='canje'||g.fase==='mercado';
  return true;
}
function usarBeneficio(g,j,b,a){
  a=a||{};var p=g.jug[j];
  if(!puedeUsarB(g,j,b))falla('Ese Beneficio no se puede usar ahora.');
  if(defPrueba(g)==='escudo'&&a.dt!=null&&a.dt!==j&&g.jug[a.dt]&&hab(g.jug[a.dt],1)&&['barrida','dame','roja','adentro','figuritas','intervalores'].indexOf(b)>=0){usaYAnota(g,p,b);return;}

  var q=null,tok=function(t){return t==='V'||t==='E';},ef=null,nl0=g.nLog||0;
  switch(b){
    case 'tactica':g.mv.pasos=[g.dados[0],g.dados[1]];break;
    case 'ganador':g.mv.quieto=true;break;
    case 'contra':g.mv.pasos=[g.dados[0]+g.dados[1]];break;
    case 'libre':g.mv.libre=true;break;
    case 'volador':var bv=pasosBase(g);g.mv.pasos=bv>1?[bv+1,bv-1]:[bv+1];break;
    case 'jet':g.mv.jet=true;break;
    case 'extra':if(g.banco[a.r]<=0)falla('El Banco no tiene de ese.');g.banco[a.r]--;p.mano[a.r]++;ef={gana:[a.r]};break;
    case 'uno':if(p.mano[a.da]<1||!usable(p,a.da))falla('No podés dar ese Recurso.');
      p.mano[a.da]--;g.banco[a.da]++;
      if(g.banco[a.r]<1||g.banco[a.r2]<(a.r===a.r2?2:1)){p.mano[a.da]++;g.banco[a.da]--;falla('El Banco no tiene de esos.');}
      g.banco[a.r]--;p.mano[a.r]++;g.banco[a.r2]--;p.mano[a.r2]++;p.amnistia=false;ef={da:a.da,gana:[a.r,a.r2]};break;
    case 'asistencia':ef={rob:[]};g.jug.forEach(function(o){if(o===p||!suma(o.mano))return;var l=[];REC.forEach(function(k){for(var i=0;i<o.mano[k];i++)l.push(k);});var r=l[Math.floor(az(g)*l.length)];o.mano[r]--;p.mano[r]++;st(p).robo++;st(o).robado++;totales(g).robR++;ef.rob.push({q:o.id,r:r});golpe(g,p.nombre+' te robó 1 de '+NOMBRE_REC[r]+' con Asistencia Forzosa.',o.id);});break;
    case 'descuento':var x=dado(g),cob=0,gan=vacio(),toca=false;
      g.porNum[x].forEach(function(ar){var r=g.rec[ar];if(r&&areasDe(p.pos).indexOf(ar)>=0){toca=true;var c=Math.min(2*(hab(p,3)===r?2:1),g.banco[r]);g.banco[r]-=c;p.mano[r]+=c;gan[r]+=c;cob+=c;}});
      anotar(g,'En el Alargue sale un '+x+'. '+(cob?p.nombre+' cobra el doble: '+textoOferta(gan)+'.':(toca?'El Banco no tiene: '+p.nombre+' no cobra nada.':p.nombre+' no toca ningún hexágono con ese número: no cobra nada.')));ef={dado:x,cob:cob,gan:gan};break;
    case 'barrida':q=otro(g,j,a.dt);if(REC.indexOf(a.r)<0)falla('Nombrá un Recurso.');var cb=q.mano[a.r];q.mano[a.r]=0;p.mano[a.r]+=cb;
      anotar(g,p.nombre+' le barre '+cb+' de '+NOMBRE_REC[a.r]+' a '+q.nombre+'.');st(p).robo+=cb;st(q).robado+=cb;totales(g).robR+=cb;golpe(g,p.nombre+' te barrió '+cb+' de '+NOMBRE_REC[a.r]+' con Barrida.',q.id);ef={q:q.id,r:a.r,cant:cb};break;
    case 'penal':case 'dudoso':var t=b==='penal'?'V':'E';if(g.tokens[t]<=0)falla('El Banco no tiene ese Token.');var z=dado(g);
      totales(g)[z>=4?'goles':'atajados']++;if(z>=4){g.tokens[t]--;p[t]++;anotar(g,'¡Penal adentro! '+p.nombre+' se lleva un Token de '+(t==='V'?'Victoria':'Efectivo')+'.');}else anotar(g,'¡Lo atajaron! '+p.nombre+' no se lleva nada.');ef={dado:z,ok:z>=4,tk:t,lado:az(g)<.5?-1:1};break;
    case 'amnistia':p.amnistia=true;break;
    case 'exento':var nx=suma(p.multas);REC.forEach(function(k){g.bolsa[k]+=p.multas[k];p.multas[k]=0;});ef={cant:nx};break;
    case 'adentro':q=otro(g,j,a.dt);ef={q:q.id,mul:[]};REC.forEach(function(k){while(p.multas[k]>0&&suma(q.multas)<5){p.multas[k]--;q.multas[k]++;st(p).enchufo++;ef.mul.push(k);}});golpe(g,p.nombre+' te pasó sus Multas con La Tenés Adentro.',q.id);break;
    case 'mano':case 'petro':var t2=b==='mano'?'V':'E';if(g.tokens[t2]<=0)falla('El Banco no tiene ese Token.');g.tokens[t2]--;p[t2]++;ef={tk:t2};break;
    case 'valor':if(!tok(a.tk)||p[a.tk]<1)falla('No tenés ese Token.');var ot=a.tk==='V'?'E':'V';if(g.tokens[ot]<=0)falla('El Banco no tiene del otro tipo.');p[a.tk]--;g.tokens[a.tk]++;g.tokens[ot]--;p[ot]++;ef={da:a.tk,tk:ot};break;
    case 'intervalores':q=otro(g,j,a.dt);if(!tok(a.tk)||p[a.tk]<1)falla('No tenés ese Token.');var ot2=a.tk==='V'?'E':'V';if(q[ot2]<1)falla('Ese DT no tiene del otro tipo.');p[a.tk]--;q[a.tk]++;q[ot2]--;p[ot2]++;golpe(g,p.nombre+' te cambió un Token con Intercambio de Valores.',q.id);ef={q:q.id,da:a.tk,tk:ot2};break;
    case 'espionaje':if(!g.mercados[a.m]||!g.mercados[a.m].length)falla('Ese Mercado está vacío.');st(p).espio++;verCartas(g,j,a.m);g.ultimaVista={j:j,m:a.m};break;
    case 'figuritas':q=otro(g,j,a.dt);if(!p.eq[a.pos]||!q.eq[a.pos])falla('Los dos tienen que tener esa posición.');var tc=p.eq[a.pos];p.eq[a.pos]=q.eq[a.pos];q.eq[a.pos]=tc;golpe(g,p.nombre+' te cambió a tu '+POS[a.pos]+' con Cambio de Figuritas.',q.id);ef={q:q.id,c1:tc,c2:p.eq[a.pos]};break;
    case 'dame':q=otro(g,j,a.dt);var lb=q.benef.concat(q.nuevos);if(!lb.length)falla('Ese DT no tiene Beneficios sin usar.');var rb=lb[Math.floor(az(g)*lb.length)];var ib=q.benef.indexOf(rb);if(ib>=0)q.benef.splice(ib,1);else q.nuevos.splice(q.nuevos.indexOf(rb),1);p.nuevos.push(rb);anotar(g,'Le sacaste '+BENEF[rb].n+'.',j);st(p).robo++;st(q).robado++;totales(g).robB++;golpe(g,p.nombre+' te robó '+BENEF[rb].n+' con Dame un Beneficio.',q.id);ef={q:q.id,rb:rb};break;
    case 'roja':q=otro(g,j,a.dt);q.roja=true;st(q).rojas++;anotar(g,'Tarjeta Roja para '+q.nombre+': en su próximo turno no mueve su Cábala.');golpe(g,p.nombre+' te sacó Tarjeta Roja: en tu próximo turno no movés.',q.id);ef={q:q.id};break;
    case 'gas':if(!a.nodos||a.nodos.length!==g.barras.length)falla('Elegí un lugar para cada Barrabrava.');var viejos=g.barras;g.barras=[];
      for(var i2=0;i2<a.nodos.length;i2++){if(!NODOS[a.nodos[i2]]||!enRecorrido(a.nodos[i2])||ocupado(g,a.nodos[i2])){g.barras=viejos;falla('Tienen que ser intersecciones libres y distintas, en la Avenida Circunvalación.');}g.barras.push(a.nodos[i2]);}break;
    case 'arreglo':usaYAnota(g,p,b);anotar(g,'Los Barrabravas avanzan antes que la Cábala de '+p.nombre+'.');g.mv.arreglo=true;iniciarBarras(g,true);return;
  }
  // Primero se cuenta qué Beneficio se usó y después qué pasó
  usaYAnota(g,p,b);adelantar(g,nl0);
  var tx=textoEfecto(g,p,b,ef,q,a);if(tx)anotar(g,tx);
  if(ef){ef.t='efecto';ef.b=b;ef.j=j;evento(g,ef);}
}
// Lleva el último renglón del registro antes de los que se anotaron desde nl0
function adelantar(g,nl0){
  var L=g.log,k=(g.nLog-1)-nl0;if(k<=0||!L.length)return;
  var e=L.pop(),ix=Math.max(0,L.length-k);if(ix>=L.length){L.push(e);return;}
  e.i=L[ix].i;for(var m=ix;m<L.length;m++)L[m].i++;L.splice(ix,0,e);
}
function textoEfecto(g,p,b,ef,q,a){
  var tk=function(t){return 'Token de '+(t==='V'?'Victoria':'Efectivo');};
  switch(b){
    case 'extra':return p.nombre+' toma 1 '+NOMBRE_REC[ef.gana[0]]+' del Banco.';
    case 'uno':return p.nombre+' devuelve 1 '+NOMBRE_REC[ef.da]+' y toma 1 '+NOMBRE_REC[ef.gana[0]]+' y 1 '+NOMBRE_REC[ef.gana[1]]+'.';
    case 'asistencia':return ef.rob.length?p.nombre+' le saca '+ef.rob.map(function(x){return '1 '+NOMBRE_REC[x.r]+' a '+g.jug[x.q].nombre;}).join(', ')+'.':'Nadie tenía Recursos para sacarle.';
    case 'exento':return p.nombre+' devuelve '+ef.cant+' Multa'+(ef.cant===1?'':'s')+' sin pagar'+(ef.cant===1?'la':'las')+'.';
    case 'adentro':return p.nombre+' le pasa '+ef.mul.length+' Multa'+(ef.mul.length===1?'':'s')+' a '+q.nombre+'.';
    case 'mano':case 'petro':return p.nombre+' toma un '+tk(ef.tk)+' del Banco.';
    case 'valor':return p.nombre+' cambia con el Banco un '+tk(ef.da)+' por un '+tk(ef.tk)+'.';
    case 'intervalores':return p.nombre+' le cambia a '+q.nombre+' un '+tk(ef.da)+' por un '+tk(ef.tk)+'.';
    case 'figuritas':return p.nombre+' y '+q.nombre+' se cambian el '+POS[a.pos]+': '+nombreCarta(ef.c1)+' por '+nombreCarta(ef.c2)+'.';
    case 'gas':return 'Los Barrabravas cambian de lugar.';
    case 'dame':return p.nombre+' le roba un Beneficio a '+q.nombre+'.';
    case 'espionaje':return p.nombre+' mira en secreto el Mercado del '+g.num[11+a.m]+'.';
    case 'tactica':return p.nombre+' elige con qué dado mover.';
    case 'ganador':return p.nombre+' puede quedarse donde está.';
    case 'contra':return p.nombre+' camina la suma de los dados: '+(g.dados[0]+g.dados[1])+'.';
    case 'libre':return 'Este turno la Cábala de '+p.nombre+' pasa por encima de todo.';
    case 'volador':return p.nombre+' puede caminar '+g.mv.pasos.join(' o ')+'.';
    case 'jet':return p.nombre+' puede ir a cualquier intersección libre.';
    case 'amnistia':return 'La próxima operación de '+p.nombre+' no mira las Multas.';
  }
  return '';
}
function usaYAnota(g,p,b){p.benef.splice(p.benef.indexOf(b),1);p.usados.push(b);p.usoB=true;st(p).uso++;evento(g,{t:'usa',j:p.id,b:b});anotar(g,p.nombre+' usa '+BENEF[b].n+'.');}

// ---------- Quién tiene que decidir ahora ----------
function quienDebe(g){
  if(g.fase==='fin')return [];
  if(g.fase==='ubicar')return [g.faltaUbicar[0]];
  if(g.fase==='barraIni')return [g.barraPaso===1?(g.primero+1)%2:g.primero];
  if(g.fase==='descarte')return Object.keys(g.descartes).map(Number);
  if(g.oferta)return esperan(g.oferta);
  return [g.turno];
}

// ---------- El reloj opcional por turno ----------
// Queda dentro del estado para que todos los celus vean lo mismo. Se frena mientras hay una oferta en la mesa.
function claveReloj(g){
  if(g.fase==='fin')return null;
  if(g.fase==='ubicar'||g.fase==='barraIni')return 'u'+g.fase+g.faltaUbicar.length+'-'+g.barraPaso;
  if(g.fase==='descarte')return 'd'+g.nTurnos+'-'+g.nTirada;
  return 't'+g.nTurnos;
}
function reloj(g){
  if(!g.limite)return;
  var ahora=Date.now(),ms=g.limite*1000,k=claveReloj(g),r=g.rel;
  if(!r||r.clave!==k){var cortado=k&&k.charAt(0)==='t'&&g.relVencio===g.nTurnos;r=g.rel={clave:k,fin:ahora+(cortado?0:ms),pausa:null,oferKey:null,oferFin:0};}
  if(g.oferta){
    if(r.pausa==null)r.pausa=Math.max(0,r.fin-ahora);
    var ok=JSON.stringify([g.oferta.de,g.oferta.a,g.oferta.doy,g.oferta.pido,g.oferta.faltan||0]);
    if(r.oferKey!==ok){r.oferKey=ok;r.oferFin=ahora+Math.max(ms,60000);}
  } else {
    if(r.pausa!=null){r.fin=ahora+Math.max(r.pausa,10000);r.pausa=null;}
    r.oferKey=null;
  }
}
// Lo mínimo que hace el juego por el que se colgó: sin gastar nada ni usar Beneficios
function jugadaForzada(g,q){
  switch(g.fase){
    case 'canje':return {t:'fin'};
    case 'mercado':return {t:'cerrar'};
    case 'espiar':return {t:'noEspiar'};
    case 'tirar':return {t:'tirar'};
    case 'mover':{var ds=destinos(g,q),sin=ds.filter(function(k){return k!==CENTRO;});
      if(sin.length)return {t:'mover',k:sin[Math.floor(az(g)*sin.length)]};
      return ds.length?{t:'mover',k:ds[0]}:{t:'quedarse'};}
    default:return botAccion(g,q);
  }
}
function vencer(g){
  if(!g.limite||!g.rel)falla('Este partido no tiene reloj.');
  var ahora=Date.now(),r=g.rel;
  if(g.oferta){
    if(ahora<r.oferFin-1500)falla('Todavía hay tiempo.');
    var ofe=g.oferta;esperan(ofe).forEach(function(q){if(g.oferta!==ofe||g.jug[q].bot||esperan(ofe).indexOf(q)<0)return;anotar(g,g.jug[q].nombre+' no contestó a tiempo: la oferta se toma como un no.');accion0(g,q,{t:'responder',ok:false});});return;

  }
  if(ahora<r.fin-1500)falla('Todavía hay tiempo.');
  var deben=quienDebe(g);if(!deben.some(function(x){return !g.jug[x].bot;}))falla('Le toca a la máquina.');
  anotar(g,'A '+deben.map(function(x){return g.jug[x].nombre;}).join(' y ')+' se le acabó el tiempo.');
  deben.forEach(function(x){if(!g.jug[x].bot)golpe(g,'Se te acabó el tiempo: el juego siguió por vos.',x);});
  if(r.clave.charAt(0)==='t')g.relVencio=g.nTurnos;
  var pasos=0;
  while(claveReloj(g)===r.clave&&g.fase!=='fin'&&!g.oferta&&pasos++<40){var d=quienDebe(g)[0];accion0(g,d,jugadaForzada(g,d));}
}
// ---------- Todas las jugadas pasan por acá ----------
function accion(g,j,a){
  if(a.t==='vencio')vencer(g);else accion0(g,j,a);
  reloj(g);
}
function accion0(g,j,a){
  if(g.fase==='fin')falla('El partido terminó.');
  var esTurno=j===g.turno;
  function turno(f){if(!esTurno)falla('No es tu turno.');if(f&&f.indexOf(g.fase)<0)falla('Ahora no se puede.');if(g.oferta)falla('Primero resolvé la oferta que está en la mesa.');}
  switch(a.t){
    case 'ubicar':if(g.fase!=='ubicar')falla('Ahora no se puede.');ubicar(g,j,a.k);break;
    case 'barraIni':if(g.fase!=='barraIni')falla('Ahora no se puede.');barraInicial(g,j,a.k);break;
    case 'tirar':turno(['tirar']);tirarDados(g);break;
    case 'descartar':if(g.fase!=='descarte')falla('Ahora no se puede.');descartar(g,j,a.mapa);break;
    case 'mover':turno(['mover']);mover(g,j,a.k);break;
    case 'quedarse':turno(['mover']);quedarse(g,j);break;
    case 'espiar':turno(['espiar']);if(mercadosCercanos(g.jug[j].pos).indexOf(a.m)<0)falla('Desde acá solo se ve uno de los dos Mercados más cercanos.');if(g.mercados[a.m].length){st(g.jug[j]).espio++;verCartas(g,j,a.m);g.ultimaVista={j:j,m:a.m};anotar(g,g.jug[j].nombre+' mira en secreto el Mercado del '+g.num[11+a.m]+'.');}else falla('Ese Mercado está vacío.');despuesDeMover(g);break;
    case 'noEspiar':turno(['espiar']);despuesDeMover(g);break;
    case 'pagar':if(!esTurno)falla('No es tu turno.');if(g.oferta)falla('Primero resolvé la oferta.');pagar(g,j,a.r,a.con);break;
    case 'token':turno(['canje','mercado']);comprarToken(g,j,a.tk);break;
    case 'beneficio':turno(['canje','mercado']);comprarBeneficio(g,j);break;
    case 'banco':turno(['canje','mercado']);cambioBanco(g,j,a.da,a.toma);break;
    case 'usados':turno(['canje','mercado']);canjearUsados(g,j,a.toma);break;
    case 'usar':if(!esTurno)falla('No es tu turno.');if(g.oferta)falla('Primero resolvé la oferta.');usarBeneficio(g,j,a.b,a);break;
    case 'abrir':turno(['canje']);abrirMercado(g,j);break;
    case 'contratar':turno(['mercado']);contratar(g,j,a.i);break;
    case 'cambiar':turno(['mercado']);cambiarJugador(g,j,a.i,a.tk);break;
    case 'cerrar':turno(['mercado']);cerrarMercado(g,j);break;
    case 'proponer':proponer(g,j,a.a,a.doy,a.pido);break;
    case 'responder':responder(g,j,a.ok);break;
    case 'contra':contraofertar(g,j,a.doy,a.pido);break;
    case 'fin':turno(['canje']);fin(g);break;
    default:falla('Jugada desconocida.');
  }
  return g;
}

// ---------- El resumen del partido: las menciones honoríficas ----------
// Se la lleva el que más tiene (si hay empate, todos los empatados); si empatan todos o nadie hizo nada, no se entrega.
function menciones(g){
  var l=[];
  function mas(tit,txt,val){var b=-1,q=[];g.jug.forEach(function(p){var v=val(p);if(v>b){b=v;q=[p.id];}else if(v===b)q.push(p.id);});if(b>0&&q.length<g.n)l.push({t:tit,d:b===1?txt.replace('# veces','una vez').replace('# intersecciones','1 intersección').replace(/# (\S+?)s\b/,'1 $1'):txt.replace('#',String(b).replace('.',',')),j:q});}
  var s=function(k){return function(p){return st(p)[k];};};
  g.jug.forEach(function(p){var e=p.eq.filter(Boolean);if(e.length<g.meta)return;var cl={};e.forEach(function(c){cl[c.club]=1;});var n=Object.keys(cl).length;
    if(n===1)l.push({t:'Fútbol Champagne',d:'Armó el equipo completo de un solo color: '+CLUB[e[0].club]+'.',j:[p.id],top:1});
    if(n===e.length)l.push({t:'Rejunte',d:'Armó el equipo completo con todos colores distintos.',j:[p.id],top:1});});
  if(g.ganador!=null){var c=g.comoGano||{};if(c.jet)l.push({t:'Sobrado',d:'Entró al Palco en Jet Privado.',j:[g.ganador],top:1});if(c.pagos)l.push({t:'Pagó en la puerta',d:'Entró al Palco saldando '+c.pagos+(c.pagos===1?' Multa':' Multas')+' en el acto.',j:[g.ganador],top:1});}
  mas('Comerciante','Hizo # tratos con otros DTs.',s('tratos'));
  mas('La vio','Compró # Beneficios.',s('compro'));
  mas('Directo al Tribunal de Faltas','Se llevó # Multas.',s('multas'));
  mas('El Contador','Cobró # Recursos en todo el partido.',s('cobro'));
  mas('Mano larga','Les sacó # cosas a los demás.',s('robo'));
  mas('Lo dejaron en patas','Le robaron # cosas.',s('robado'));
  mas('El Cuponero','Usó # Beneficios.',s('uso'));
  mas('Mufa','Sacó # unos en los dados.',s('unos'));
  mas('Buchón','Espió # veces los Mercados de Pases.',s('espio'));
  mas('Modo Carrera','Cambió # veces a un Jugador de su equipo.',s('cambios'));
  mas('Maratonista','Caminó # intersecciones por la isla.',s('pasos'));
  mas('Amigo del Cajero','Cambió # veces con el Banco.',s('banco'));
  mas('Calesita','Devolvió # Recursos por culpa del 1.',s('devolvio'));
  mas('Cobrador de Multas','Su Defensor le hizo cobrar # Multas ajenas.',s('ajenas'));
  mas('Seguro de Multas','Le rebotaron # Multas en su Defensor.',s('frenadas'));
  mas('Dados cargados','Mejor promedio de dados: # por tirada.',function(p){var e=st(p);return e.tiros>=5?Math.round(e.dados/e.tiros*10)/10:0;});
  var noTrato=g.jug.filter(function(p){return st(p).tratos===0;});if(noTrato.length&&noTrato.length<g.n)l.push({t:'No le compra a nadie',d:'Terminó el partido sin hacer un solo trato.',j:noTrato.map(function(p){return p.id;})});
  var pocos=-1;g.jug.forEach(function(p){var n=contratados(p);if(pocos<0||n<pocos)pocos=n;});var ult=g.jug.filter(function(p){return contratados(p)===pocos;});if(ult.length<g.n)l.push({t:'Último orejón del tarro',d:pocos===0?'Terminó sin contratar a nadie.':'Terminó con '+pocos+(pocos===1?' Jugador':' Jugadores')+'.',j:ult.map(function(p){return p.id;})});
  return l;
}

// ---------- DTs automáticos ----------
// Qué le falta a un DT para la próxima meta: los Tokens que necesita ya, 1 de cada Recurso al final y sus Multas
function requerido(g,p){var r=vacio(),f=g.meta-contratados(p);
  if(f>0){if(p.V<1)for(var k in PRECIO.V)r[k]+=PRECIO.V[k];if(p.E<1)for(var k2 in PRECIO.E)r[k2]+=PRECIO.E[k2];}
  if(f<=1)REC.forEach(function(k3){r[k3]+=1;});
  REC.forEach(function(k4){r[k4]+=p.multas[k4];});return r;}
function deficit(g,p){var q=requerido(g,p),d={};REC.forEach(function(k){d[k]=Math.max(0,q[k]-p.mano[k]);});return d;}
function sobrante(g,p){var q=requerido(g,p),s={};REC.forEach(function(k){s[k]=p.multas[k]===0?Math.max(0,p.mano[k]-q[k]):0;});return s;}
function tocados(g,k){var o={};if(NODOS[k])NODOS[k].areas.forEach(function(a){if(g.rec[a])o[g.rec[a]]=1;});return o;}
// Cuánto vale una mano para un DT: lo que necesita ya vale mucho; lo que va a necesitar después, algo; lo que le sobra, casi nada.
// Lo que cobra seguido donde está parado vale un poco menos que lo que le cuesta conseguir.
function utilidad(g,p,m){
  var rq=requerido(g,p),f=g.meta-contratados(p),sec=vacio(),fa=tocados(g,p.pos),u=0,tot=0;
  if(f>1){var nv=Math.max(0,f-p.V-(p.V<1?1:0)),ne=Math.max(0,f-p.E-(p.E<1?1:0));
    for(var a in PRECIO.V)sec[a]+=PRECIO.V[a]*nv;for(var b in PRECIO.E)sec[b]+=PRECIO.E[b]*ne;}
  REC.forEach(function(r){var h=m[r],w=fa[r]?.8:1.1,x=Math.min(h,rq[r]),y=Math.min(h-x,sec[r]),z=h-x-y;u+=x*3*w+y*1.1*w+z*.2;tot+=h;});
  if(tot>9)u-=(tot-9)*.4;
  return u;
}
function aplicar(m,mas,menos){var r={};REC.forEach(function(k){r[k]=m[k]+(mas[k]||0)-(menos[k]||0);});return r;}
// El DT p recibe "rec" y entrega "da" en un trato con q: cuánto gana él y cuánto lo ayuda al otro
function evaluarTrato(g,p,q,rec,da){
  var yo=utilidad(g,p,aplicar(p.mano,rec,da))-utilidad(g,p,p.mano);
  var m2=aplicar(q.mano,da,rec),el=utilidad(g,q,m2)-utilidad(g,q,q.mano);
  if(gana(g,q,m2)&&!gana(g,q))return -99; // no le doy lo último que le falta para ganar
  var peso=.3+.25*contratados(q)/g.meta+(lider(g,p.id)===q.id?.2:0);
  return yo-peso*Math.max(el,0);
}
function margen(p){return [.2,.6,.4,.8,.3][p.dt];}
function valorNodo(g,p,k){var d=deficit(g,p),v=0,del=hab(p,3);areasDe(k).forEach(function(a){var r=g.rec[a];if(r)v+=(d[r]>0?1:.3)*(del===r?2:1);else v-=.6;});return v;}
function faltanPos(g,p){var f=[];for(var i=0;i<4;i++)if(!p.eq[i])f.push(i);return contratados(p)>=g.meta?[]:f;}
function puntaje(g,p,k){
  // Al centro solo conviene entrar para ganar: si no, únicamente cuando no queda otra
  if(k===CENTRO)return gana(g,p)?1e6:-1e6;
  var s=valorNodo(g,p,k),f=faltanPos(g,p);
  if(contratados(p)>=g.meta){var m=99;PALCO.forEach(function(a){m=Math.min(m,dd(k,a));});s+=m===0?8:(m<=5?10-m:0);}
  if(puedeContratarAlgo(g,p)&&f.length){var mejor=0;for(var i=0;i<5;i++){if(!g.mercados[i].length)continue;var c=p.conoce[i],sirve=c?c.c.some(function(x){return f.indexOf(x.pos)>=0&&puedeFichar(g,p,x);}):true;if(!sirve)continue;var d=dd(k,MERCADOS[i]);mejor=Math.max(mejor,d===0?40:14/(1+d));}s+=mejor;}
  var bo=boleDe(g,k);if(bo){var sb=sobrante(g,p),df=deficit(g,p),t=0;REC.forEach(function(r){if(r!==bo)t+=df[r];});s+=Math.min(Math.floor(sb[bo]/tasaBanco(g,p,bo,k)),t)*1.2;}
  return s+az(g)*.05;
}
function lider(g,j){var b=-1,v=-1;g.jug.forEach(function(q){if(q.id===j)return;var x=contratados(q)*10+q.V*3+q.E*3;if(x>v){v=x;b=q.id;}});return b;}
// Lo mejor que puede hacer con una forma de moverse (sin moverse todavía)
function mejorCon(g,p,j,cambio){
  var viejo=g.mv,o={};for(var k in viejo)o[k]=viejo[k];for(var c in cambio)o[c]=cambio[c];g.mv=o;
  var ds=destinos(g,j),b=-1e9;ds.forEach(function(x){b=Math.max(b,puntaje(g,p,x));});g.mv=viejo;return b;
}
function botMovimiento(g,j,p){
  if(p.usoB)return null;
  var base=mejorCon(g,p,j,{}),op=[],d=g.dados;
  var cuesta={tactica:4,contra:4,volador:4,libre:4,jet:11,ganador:4};
  if(p.benef.indexOf('tactica')>=0&&d[0]!==d[1])op.push(['tactica',{pasos:[d[0],d[1]]}]);
  if(p.benef.indexOf('contra')>=0)op.push(['contra',{pasos:[d[0]+d[1]]}]);
  if(p.benef.indexOf('volador')>=0){var bv2=pasosBase(g);op.push(['volador',{pasos:bv2>1?[bv2+1,bv2-1]:[bv2+1]}]);}
  if(p.benef.indexOf('libre')>=0)op.push(['libre',{libre:true}]);
  if(p.benef.indexOf('jet')>=0)op.push(['jet',{jet:true}]);
  var mejor=null,gm=0;
  op.forEach(function(x){var v=mejorCon(g,p,j,x[1]),ga=v-base-cuesta[x[0]];if(v>=1e6)ga=1e7;if(ga>gm){gm=ga;mejor=x[0];}});
  if(p.benef.indexOf('ganador')>=0&&p.pos!==CENTRO){var aca=puntaje(g,p,p.pos),ga2=aca-base-cuesta.ganador;if(ga2>gm){gm=ga2;mejor='ganador';}}
  if(mejor)return {t:'usar',b:mejor};
  if(p.benef.indexOf('arreglo')>=0&&g.n>2&&g.barras.length&&p.benef.length>=3)return {t:'usar',b:'arreglo'};
  return null;
}
function botBeneficio(g,j,p,f2){
  if(p.usoB||!p.benef.length)return null;
  var ben=p.benef.filter(function(b){return puedeUsarB(g,j,b);}),tiene=function(b){return ben.indexOf(b)>=0;};
  var li=lider(g,j),L=li>=0?g.jug[li]:null,d=deficit(g,p),s=sobrante(g,p),multas=suma(p.multas);
  if(tiene('exento')&&(multas>=2||(f2<=0&&multas>=1)))return {t:'usar',b:'exento'};
  if(tiene('adentro')&&multas>=2&&L&&suma(L.multas)<5)return {t:'usar',b:'adentro',dt:li};
  var nv=f2>0&&p.V<Math.min(f2,2),ne=f2>0&&p.E<Math.min(f2,2);
  if(tiene('amnistia')&&multas>0){var trabado=function(pr,t){if(g.tokens[t]<=0)return false;var x=true,tr=false;for(var k in pr){if(p.mano[k]<pr[k])x=false;if(p.multas[k]>0)tr=true;}return x&&tr;};
    if((p.V<1&&f2>0&&trabado(PRECIO.V,'V'))||(p.E<1&&f2>0&&trabado(PRECIO.E,'E')))return {t:'usar',b:'amnistia'};}
  if(nv&&tiene('mano')&&g.tokens.V>0)return {t:'usar',b:'mano'};
  if(ne&&tiene('petro')&&g.tokens.E>0)return {t:'usar',b:'petro'};
  if(nv&&tiene('penal')&&g.tokens.V>0)return {t:'usar',b:'penal'};
  if(ne&&tiene('dudoso')&&g.tokens.E>0)return {t:'usar',b:'dudoso'};
  if(tiene('valor')&&f2>0){if(p.V>=2&&p.E<1&&g.tokens.E>0)return {t:'usar',b:'valor',tk:'V'};if(p.E>=2&&p.V<1&&g.tokens.V>0)return {t:'usar',b:'valor',tk:'E'};}
  if(tiene('intervalores')&&f2>0){for(var i=0;i<g.n;i++){if(i===j)continue;var q=g.jug[i];if(p.V>=2&&p.E<1&&q.E>=1)return {t:'usar',b:'intervalores',dt:i,tk:'V'};if(p.E>=2&&p.V<1&&q.V>=1)return {t:'usar',b:'intervalores',dt:i,tk:'E'};}}
  if(tiene('roja')&&L&&!L.roja&&(contratados(L)>=2||contratados(L)>contratados(p)))return {t:'usar',b:'roja',dt:li};
  if(tiene('dame')){var bq=-1,bn=0;g.jug.forEach(function(q2){if(q2.id===j)return;var c=q2.benef.length+q2.nuevos.length;if(c>bn){bn=c;bq=q2.id;}});if(bq>=0)return {t:'usar',b:'dame',dt:bq};}
  if(tiene('barrida')){var bv=1,bd=-1,br=null;g.jug.forEach(function(q3){if(q3.id===j)return;REC.forEach(function(r){var v=q3.mano[r]+(d[r]>0?1:0)+(q3.id===li?.5:0);if(q3.mano[r]>=2&&v>bv){bv=v;bd=q3.id;br=r;}});});if(br)return {t:'usar',b:'barrida',dt:bd,r:br};}
  if(tiene('asistencia')&&g.jug.some(function(q4){return q4.id!==j&&suma(q4.mano)>0;}))return {t:'usar',b:'asistencia'};
  var quiero=REC.filter(function(k){return d[k]>0&&g.banco[k]>0;});
  if(tiene('uno')&&quiero.length){var dar=REC.filter(function(k){return s[k]>=1&&quiero.indexOf(k)<0&&usable(p,k);})[0];if(dar&&g.banco[quiero[0]]>=2)return {t:'usar',b:'uno',da:dar,r:quiero[0],r2:quiero[1]||quiero[0]};}
  if(tiene('extra')&&quiero.length)return {t:'usar',b:'extra',r:quiero[0]};
  if(tiene('descuento')&&suma(p.mano)<8&&Object.keys(tocados(g,p.pos)).length>=2)return {t:'usar',b:'descuento'};
  if(tiene('espionaje')&&f2>0){var ms=[0,1,2,3,4].filter(function(m){return g.mercados[m].length&&!p.conoce[m];}).sort(function(a,b){return dd(p.pos,MERCADOS[a])-dd(p.pos,MERCADOS[b]);});if(ms.length)return {t:'usar',b:'espionaje',m:ms[0]};}
  if(tiene('figuritas')){for(var pz=3;pz>=0;pz--){if(!p.eq[pz])continue;for(var i2=0;i2<g.n;i2++){if(i2===j)continue;var c2=g.jug[i2].eq[pz];if(c2&&c2.club!==p.eq[pz].club&&d[c2.club]>d[p.eq[pz].club])return {t:'usar',b:'figuritas',dt:i2,pos:pz};}}}
  if(tiene('gas')&&L&&g.barras.length){var libres=NODOS.map(function(n){return n.id;}).filter(function(k){return !ocupado(g,k)&&enRecorrido(k);}),ce=L.pos===CENTRO||L.pos<0?[]:ADJ[L.pos].filter(function(k){return !ocupado(g,k)&&enRecorrido(k);}),el2=[];ce.concat(libres).forEach(function(k){if(el2.length<g.barras.length&&el2.indexOf(k)<0)el2.push(k);});if(ce.length&&el2.length===g.barras.length)return {t:'usar',b:'gas',nodos:el2};}
  return null;
}
function botResponde(g,j,p){
  var o=g.oferta,q=g.jug[o.de],puede=REC.every(function(k){return o.pido[k]<=0||(p.mano[k]>=o.pido[k]&&usable(p,k));});
  if(!puede)return {t:'responder',ok:false};
  if(evaluarTrato(g,p,q,o.doy,o.pido)>margen(p))return {t:'responder',ok:true};
  // Si no le conviene, a veces contesta con lo que sí le serviría
  if(!(o.contras>=1)){var d=deficit(g,p),s=sobrante(g,p),r=REC.filter(function(k){return o.doy[k]>0&&d[k]>0&&q.mano[k]>0&&usable(q,k);})[0];
    if(r){var da=REC.filter(function(k){return k!==r&&s[k]>=1&&usable(p,k);}).sort(function(a,b){return s[b]-s[a];})[0];
      if(da){var doy=vacio(),pido=vacio();doy[da]=1;pido[r]=1;if(evaluarTrato(g,p,q,pido,doy)>margen(p))return {t:'contra',doy:doy,pido:pido};}}}
  return {t:'responder',ok:false};
}
function botPropone(g,j,p){
  if(p.propuso>=1||g.n<2||az(g)>.7)return null;
  var d=deficit(g,p),s=sobrante(g,p),r=REC.filter(function(k){return d[k]>0&&g.jug.some(function(q){return q.id!==j&&q.mano[k]>0&&usable(q,k);});})[0];
  if(!r)return null;
  var da=REC.filter(function(k){return k!==r&&s[k]>=1&&usable(p,k);}).sort(function(a,b){return s[b]-s[a];})[0];
  if(!da)return null;
  var doy=vacio(),pido=vacio();doy[da]=s[da]>=3?2:1;pido[r]=1;
  if(utilidad(g,p,aplicar(p.mano,pido,doy))<=utilidad(g,p,p.mano))return null;
  return {t:'proponer',a:-1,doy:doy,pido:pido};
}
function botAccion(g,j){
  var p=g.jug[j];
  if(g.fase==='descarte'){var c=g.descartes[j],mapa=vacio(),sb=sobrante(g,p),t=p.mano;for(var i=0;i<c;i++){var r=null,bv=-1e9;REC.forEach(function(k){if(t[k]-mapa[k]<=0)return;var v=(sb[k]-mapa[k])*10+t[k]-mapa[k];if(v>bv){bv=v;r=k;}});mapa[r]++;}return {t:'descartar',mapa:mapa};}
  if(g.oferta)return botResponde(g,j,p);
  if(g.fase==='ubicar'){var lb=NODOS.filter(function(n){return n.t==='B'&&!ocupado(g,n.id);}),b=lb[0];lb.forEach(function(n){if(valorNodo(g,p,n.id)>valorNodo(g,p,b.id))b=n;});return {t:'ubicar',k:b.id};}
  if(g.fase==='barraIni'){var l2=g.barraPaso===0?PALCO:NODOS.filter(function(n){return n.t==='B';}).map(function(n){return n.id;});l2=l2.filter(function(k){return !ocupado(g,k);});return {t:'barraIni',k:l2[Math.floor(az(g)*l2.length)]};}
  if(g.fase==='tirar')return {t:'tirar'};
  if(g.fase==='mover'){
    if(p.benef.indexOf('jet')>=0&&!p.usoB&&gana(g,p))return {t:'usar',b:'jet'};
    if(contratados(p)>=g.meta)for(var m=0;m<5;m++){var rr=REC[m];if(p.multas[rr]>0&&p.mano[rr]>0)return {t:'pagar',r:rr};}
    if(!g.mv.quieto&&!g.mv.jet&&!g.mv.arreglo){var um=botMovimiento(g,j,p);if(um)return um;}
    var ds=destinos(g,j);if(!ds.length)return {t:'quedarse'};
    if(g.mv.quieto)return {t:'quedarse'};
    var bk=ds[0],bs=-1e9;ds.forEach(function(k){var v=puntaje(g,p,k);if(v>bs){bs=v;bk=k;}});return {t:'mover',k:bk};
  }
  if(g.fase==='espiar'){var ce=mercadosCercanos(p.pos).filter(function(m2){return g.mercados[m2].length;}),no=ce.filter(function(m2){return !p.conoce[m2];});return {t:'espiar',m:(no.length?no:ce)[0]};}
  if(g.fase==='mercado'){var f=faltanPos(g,p),cs=g.mercados[g.mercadoAbierto],pref=[1.5,1,2,3],bi=-1,bp=-1;cs.forEach(function(x,i2){if(f.indexOf(x.pos)>=0&&pref[x.pos]>bp&&puedeFichar(g,p,x)){bp=pref[x.pos];bi=i2;}});return bi>=0?{t:'contratar',i:bi}:{t:'cerrar'};}
  if(g.fase==='canje'){
    // g.reg.pagaTarde (solo simulador): como una persona, paga cuando le sobra o cuando ya tiene el equipo
    for(var i3b=0;i3b<5;i3b++){var r3=REC[i3b];if(p.multas[r3]>0&&p.mano[r3]>0&&(!(g.reg&&g.reg.pagaTarde)||p.mano[r3]>=3||contratados(p)>=g.meta))return {t:'pagar',r:r3};}

    var f2=g.meta-contratados(p);
    if(f2>0&&p.V<1&&g.tokens.V>0&&puedePagar(p,PRECIO.V))return {t:'token',tk:'V'};
    if(f2>0&&p.E<1&&g.tokens.E>0&&puedePagar(p,PRECIO.E))return {t:'token',tk:'E'};
    var ub=botBeneficio(g,j,p,f2);if(ub)return ub;
    if(p.usados.length>=3){var dd=deficit(g,p),tt=REC.filter(function(k){return g.banco[k]>0;}).sort(function(a,b3){return dd[b3]-dd[a];})[0];if(tt)return {t:'usados',toma:tt};}
    var d4=deficit(g,p),s4=sobrante(g,p);
    var orden=REC.filter(function(k){return d4[k]>0&&g.banco[k]>0;});
    for(var q=0;q<orden.length;q++){var dest=orden[q];for(var w=0;w<5;w++){var da=REC[w];if(da===dest)continue;if(s4[da]>=tasaBanco(g,p,da))return {t:'banco',da:da,toma:dest};}}
    var tr=botPropone(g,j,p);if(tr)return tr;
    if(g.mazoB.length&&puedePagar(p,PRECIO.B)&&p.benef.length+p.nuevos.length<3&&((s4.suerte>=1&&s4.fans>=1)||(s4.suerte+s4.fans>=1&&d4.suerte+d4.fans===0)||suma(p.mano)>=8))return {t:'beneficio'};
    if(mercadoDe(p.pos)>=0&&!p.miro&&!p.contrato&&puedeContratarAlgo(g,p)&&faltanPos(g,p).length&&g.mercados[mercadoDe(p.pos)].length)return {t:'abrir'};
    return {t:'fin'};
  }
  return null;
}

root.PEXA={REC:REC,NOMBRE_REC:NOMBRE_REC,CLUB:CLUB,MULTA:MULTA,PRECIO:PRECIO,INNER:INNER,NUM:NUM,ESTADIO:ESTADIO,PREDIO:PREDIO,ZONA:ZONA,POS:POS,HABILIDAD:HABILIDAD,PLANTEL:PLANTEL,DTS:DTS,CONOS:CONOS,BENEF:BENEF,
  NODOS:NODOS,ADJ:ADJ,PALCO:PALCO,MERCADOS:MERCADOS,CENTRO:CENTRO,BASE:BASE,mercadosCercanos:mercadosCercanos,esperan:esperan,ANILLO:ANILLO,enRecorrido:enRecorrido,tokenDe:tokenDe,puedeFichar:puedeFichar,puedeContratarAlgo:puedeContratarAlgo,
  nuevaPartida:function(cfg){var g=nuevaPartida(cfg);reloj(g);return g;},accion:accion,quienDebe:quienDebe,destinos:destinos,tot:totales,botAccion:botAccion,puedeUsarB:puedeUsarB,
  gana:gana,pagoEntrada:pagoEntrada,menciones:menciones,estadisticas:st,contratados:contratados,usable:usable,suma:suma,tasaBanco:tasaBanco,boleDe:boleDe,mercadoDe:mercadoDe,hab:hab,ocupado:ocupado,nombreNodo:nombreNodo,nombreArea:nombreArea,nombreCarta:nombreCarta,textoCarta:textoCarta,textoOferta:textoOferta,puedePagar:puedePagar,vacio:vacio};
})(typeof window!=='undefined'?window:this);
