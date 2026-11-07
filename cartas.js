// Generado por armar-cartas.ps1 desde arte-pexa.html: no editar a mano.
(function(){
  var INK='#2b2620', CREMA='#f6efe0', DORADO='#b8862b', PILUSO='#22305a', GUANTE='#8fd6c0';
  var uid=0; function U(p){return (p||'i')+(uid++);}
  function $(id){return document.getElementById(id);}
  function n1(v){return (+v).toFixed(1);}
  // Azar con semilla, para que el dibujo salga siempre igual
  function azar(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  // ---------- Clubes, íconos ----------
  var C={
    gol:{nombre:'Sportivo Goleador',rec:'Gol',c1:'#3f6aa6',c2:CREMA,fondo:'#dbe5f2'},
    suerte:{nombre:'Trébol Athletic',rec:'Suerte',c1:'#4d7a3a',c2:'#efe2b8',fondo:'#dfe9d3'},
    picardia:{nombre:'Deportivo Viveza',rec:'Picardía',c1:'#d9a61c',c2:INK,fondo:'#f6e8bb'},
    fans:{nombre:'Hinchada Unida',rec:'Fans',c1:'#d4692a',c2:CREMA,fondo:'#f6dcc8'},
    sponsors:{nombre:'Sponsor Juniors',rec:'Sponsors',c1:'#b23f3c',c2:'#d9b25a',fondo:'#f1d4d0'}
  };
  var ORDEN=['gol','suerte','picardia','fans','sponsors'];
  var HEART='M0 0C-4-6-14-8-14-16C-14-22-8-25-4-23C-2-22-1-20 0-18C1-20 2-22 4-23C8-25 14-22 14-16C14-8 4-6 0 0Z';
  function trebol(cx,cy,s,fill){return [45,135,225,315].map(function(a){return '<path d="'+HEART+'" fill="'+fill+'" transform="translate('+cx+' '+cy+') rotate('+a+') scale('+s+')"/>';}).join('');}
  // v17: cada Recurso se representa con el Escudo de su club, en un cuadrado de 100 × 100
  function badge(k){return '<svg x="0" y="0" width="100" height="100" viewBox="-2.3 0 104.6 110">'+escudoClub(k)+'</svg>';}
  // v16: escudos de club de verdad, cada uno con su contorno y sus cosas de la historia del club
  function escudoClub(k){
    var id=U('es'), c=C[k], ORO='#e2bd57', D='font-family="Bowlby One SC, sans-serif"', M='font-family="Courier Prime, monospace" font-weight="700"';
    function tx(x,y,fs,fill,t,extra){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" '+D+' font-size="'+fs+'" fill="'+fill+'"'+(extra||'')+'>'+t+'</text>';}
    function marco(d,trim,inner,encima){return '<defs><clipPath id="'+id+'"><path d="'+d+'"/></clipPath></defs><g clip-path="url(#'+id+')">'+inner+'</g><path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="5.6" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+trim+'" stroke-width="2.6" stroke-linejoin="round"/>'+(encima||'');}
    if(k==='gol'){ // redondo, con el anillo del nombre: los tejedores de redes y la pelota de cuero
      var s='<rect width="100" height="110" fill="#24395e"/><defs><clipPath id="'+id+'d"><circle cx="50" cy="55" r="31.5"/></clipPath><path id="'+id+'a" d="M13.5 55A36.5 36.5 0 0 1 86.5 55"/><path id="'+id+'b" d="M7.5 55A42.5 42.5 0 0 0 92.5 55"/></defs>';
      s+='<circle cx="50" cy="55" r="31.5" fill="'+c.c1+'"/><g clip-path="url(#'+id+'d)" stroke="'+CREMA+'" stroke-width=".9" opacity=".55">';
      for(var q=-60;q<=160;q+=9)s+='<path d="M'+q+' 15L'+(q+90)+' 105M'+(q+90)+' 15L'+q+' 105"/>';
      s+='</g><circle cx="50" cy="55" r="31.5" fill="none" stroke="'+ORO+'" stroke-width="1.6"/>';
      s+='<g transform="translate(50 51)"><circle r="18.5" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="2"/>';
      var pn=[];for(var a=-90;a<270;a+=72)pn.push([6.6*Math.cos(a*Math.PI/180),6.6*Math.sin(a*Math.PI/180)]);
      s+='<polygon points="'+pn.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="'+INK+'"/>';
      pn.forEach(function(p){var e=Math.atan2(p[1],p[0]),x=18.5*Math.cos(e),y=18.5*Math.sin(e);s+='<path d="M'+p[0].toFixed(1)+' '+p[1].toFixed(1)+'L'+(x*.72).toFixed(1)+' '+(y*.72).toFixed(1)+'" stroke="'+INK+'" stroke-width="1.5"/>';
        var e1=e-.3,e2=e+.3;s+='<path d="M'+(13.5*Math.cos(e1)).toFixed(1)+' '+(13.5*Math.sin(e1)).toFixed(1)+'L'+(13.5*Math.cos(e2)).toFixed(1)+' '+(13.5*Math.sin(e2)).toFixed(1)+'L'+(18.2*Math.cos(e2+.1)).toFixed(1)+' '+(18.2*Math.sin(e2+.1)).toFixed(1)+'A18.2 18.2 0 0 0 '+(18.2*Math.cos(e1-.1)).toFixed(1)+' '+(18.2*Math.sin(e1-.1)).toFixed(1)+'Z" fill="'+INK+'"/>';});
      s+='</g><path d="M24 68Q50 77 76 68L78 79Q50 88 22 79Z" fill="'+ORO+'" stroke="'+INK+'" stroke-width="1.4" stroke-linejoin="round"/><path id="'+id+'c" d="M24 76.8Q50 85.3 76 76.8" fill="none"/><text '+D+' font-size="8.4" letter-spacing="1.4" text-anchor="middle" fill="'+INK+'"><textPath href="#'+id+'c" startOffset="50%">S · G</textPath></text>';
      s+='<text '+D+' font-size="7.7" letter-spacing=".2" text-anchor="middle" fill="'+CREMA+'"><textPath href="#'+id+'a" startOffset="50%">SPORTIVO GOLEADOR</textPath></text><text '+D+' font-size="8" letter-spacing="1" text-anchor="middle" fill="'+ORO+'"><textPath href="#'+id+'b" startOffset="50%">★ 1921 ★</textPath></text>';
      return marco('M50 9A46 46 0 1 1 49.99 9Z',ORO,s);
    }
    if(k==='suerte'){ // el más viejo de la isla: escudo inglés de tres lóbulos, trébol y cinta
      var d='M6 21Q6 12 14 12Q22 12 26 16Q31 5 50 5Q69 5 74 16Q78 12 86 12Q94 12 94 21V56C94 80 72 95 50 104C28 95 6 80 6 56Z';
      var s='<rect width="100" height="110" fill="'+c.c1+'"/><rect x="50" width="50" height="110" fill="#3b6130"/>';
      for(var x=12;x<100;x+=12.8)s+='<path d="M'+x+' 0V110" stroke="'+c.c2+'" stroke-width=".7" opacity=".28"/>';
      s+='<path d="M50 46Q53 62 62 76" fill="none" stroke="'+c.c2+'" stroke-width="5.4" stroke-linecap="round"/><path d="M50 46Q53 62 62 76" fill="none" stroke="'+ORO+'" stroke-width="3" stroke-linecap="round"/>';
      [45,135,225,315].forEach(function(a){s+='<path d="'+HEART+'" fill="'+ORO+'" stroke="'+c.c2+'" stroke-width="1.5" stroke-linejoin="round" transform="translate(50 44) rotate('+a+') scale(1.08)"/>';});
      s+='<circle cx="50" cy="44" r="2" fill="#2f4f25"/>';
      s+=tx(16.5,47,9.5,c.c2,'19')+tx(83.5,47,9.5,c.c2,'03');
      var en='<path d="M9 73L1 71L5 79L1 87L12 85M91 73L99 71L95 79L99 87L88 85" fill="#cdbf91" stroke="'+INK+'" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 69Q50 84 92 69L92 82Q50 97 8 82Z" fill="'+c.c2+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/><path id="'+id+'c" d="M10 79.6Q50 93.6 90 79.6" fill="none"/><text '+D+' font-size="6.7" text-anchor="middle" fill="#2f4f25"><textPath href="#'+id+'c" startOffset="50%">TRÉBOL ATHLETIC</textPath></text>';
      return marco(d,ORO,s,en);
    }
    if(k==='picardia'){ // anguloso y a rayas, con La Avispa guiñando el ojo en el medio
      var d='M50 5L92 19V62Q92 77 50 105Q8 77 8 62V19Z';
      var s='<rect width="100" height="110" fill="'+c.c1+'"/>';
      [8,36,64].map(function(x){s+='<rect x="'+(x+7)+'" width="14" height="110" fill="'+INK+'"/>';});
      s+='<path d="M0 0H100V30L50 40L0 30Z" fill="'+INK+'"/><path d="M0 30L50 40L100 30" fill="none" stroke="'+c.c1+'" stroke-width="1.6"/>';
      s+='<text x="50" y="20" text-anchor="middle" '+M+' font-size="5.6" letter-spacing=".6" fill="'+c.c1+'">DEPORTIVO</text>'+tx(50,31,10.4,c.c1,'VIVEZA');
      s+='<circle cx="50" cy="62" r="21.5" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="2.6"/><circle cx="50" cy="62" r="18.5" fill="none" stroke="'+c.c1+'" stroke-width="1.1"/>';
      s+='<g transform="translate(51 63) rotate(-14)"><ellipse cx="3" cy="-9.5" rx="5.2" ry="9" transform="rotate(-24 3 -9.5)" fill="#cfe3ea" stroke="'+INK+'" stroke-width="1.1"/><ellipse cx="9" cy="-8" rx="4" ry="7.4" transform="rotate(14 9 -8)" fill="#cfe3ea" stroke="'+INK+'" stroke-width="1.1"/>';
      s+='<path d="M15 -3L22 0L15 3Z" fill="'+INK+'"/><ellipse cx="6" cy="0" rx="10.5" ry="6.4" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="1.5"/><path d="M3-5.6Q5 0 3 5.6M8-5.6Q10 0 8 5.6M12.6-4.2Q14 0 12.6 4.2" fill="none" stroke="'+INK+'" stroke-width="2.5"/>';
      s+='<circle cx="-8.5" cy="0" r="7.2" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="1.5"/><circle cx="-11" cy="-1.4" r="1.3" fill="'+INK+'"/><path d="M-7.6-1.6Q-5.8-3.4-4-1.6" fill="none" stroke="'+INK+'" stroke-width="1.2" stroke-linecap="round"/><path d="M-12 2.6Q-8.6 5.6-5 2.4" fill="none" stroke="'+INK+'" stroke-width="1.1" stroke-linecap="round"/><path d="M-11-6.6Q-13-11-16-11.4M-7-7Q-7.6-11-10-12.4" fill="none" stroke="'+INK+'" stroke-width="1"/></g>';
      s+='<path d="M38 90H62L50 101Z" fill="'+INK+'"/><text x="50" y="96" text-anchor="middle" '+M+' font-size="6" fill="'+c.c1+'">1986</text>';
      return marco(d,c.c1,s);
    }
    if(k==='fans'){ // bandera de tres puntas: el bombo que se toca desde 1960, con el sol de la tribuna
      var d='M6 10Q28 21 50 10Q72 21 94 10V58C94 82 72 96 50 105C28 96 6 82 6 58Z';
      var s='<rect width="100" height="110" fill="'+c.c1+'"/>';
      for(var a=-180;a<180;a+=30){var r=a*Math.PI/180,r2=(a+15)*Math.PI/180;s+='<path d="M50 62L'+(50+95*Math.cos(r)).toFixed(1)+' '+(62+95*Math.sin(r)).toFixed(1)+'L'+(50+95*Math.cos(r2)).toFixed(1)+' '+(62+95*Math.sin(r2)).toFixed(1)+'Z" fill="#e8884d"/>';}
      s+=tx(50,33,10.2,CREMA,'HINCHADA','  stroke="'+INK+'" stroke-width=".35"');
      s+=tx(16.5,66,8,CREMA,'19')+tx(83.5,66,8,CREMA,'60');
      s+='<path d="M24 37L43 50M76 37L57 50" stroke="'+INK+'" stroke-width="3.4" stroke-linecap="round"/><path d="M24 37L43 50M76 37L57 50" stroke="#e8d4a6" stroke-width="1.7" stroke-linecap="round"/><circle cx="24" cy="37" r="3.7" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.3"/><circle cx="76" cy="37" r="3.7" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.3"/>';
      s+='<path d="M27 52V71A23 7 0 0 0 73 71V52Z" fill="#7a2e12" stroke="'+INK+'" stroke-width="1.7"/><path d="M27 55L34.7 72L42.3 56.6L50 74L57.7 56.6L65.3 72L73 55" fill="none" stroke="'+CREMA+'" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 71A23 7 0 0 0 73 71" fill="none" stroke="'+ORO+'" stroke-width="2.4"/><ellipse cx="50" cy="52" rx="23" ry="7" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.7"/><ellipse cx="50" cy="52" rx="23" ry="7" fill="none" stroke="'+ORO+'" stroke-width="1"/>';
      s+=tx(50,92,10,CREMA,'UNIDA',' stroke="'+INK+'" stroke-width=".35"');
      return marco(d,CREMA,s);
    }
    // Sponsor Juniors: plata y superioridad. Corona torcida con el sol atrás ("todo lo que toca la luz es nuestro"), monograma de joyería y lema en latín
    var d='M14 24Q33 25 50 15Q67 25 86 24V60C86 82 67 96 50 106C33 96 14 82 14 60Z', OS='#6e2321';
    var s='<rect width="100" height="110" fill="'+c.c1+'"/>';
    for(var a=-5;a<190;a+=20){var r1=a*Math.PI/180,r2=(a+10)*Math.PI/180;s+='<path d="M50 22L'+(50+120*Math.cos(r1)).toFixed(1)+' '+(22+120*Math.sin(r1)).toFixed(1)+'L'+(50+120*Math.cos(r2)).toFixed(1)+' '+(22+120*Math.sin(r2)).toFixed(1)+'Z" fill="'+OS+'" opacity=".55"/>';}
    // arriba, chiquito, el sponsor con su cabaña
    s+='<path d="M0 24H100V33.5H0Z" fill="'+ORO+'"/><path d="M0 33.9H100" stroke="'+INK+'" stroke-width="1"/><g transform="translate(29.5 25)"><path d="M0 7.2L3.8 .6L7.6 7.2Z" fill="'+OS+'" stroke="'+INK+'" stroke-width=".55" stroke-linejoin="round"/><rect x="2.8" y="4.1" width="2" height="1.6" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".3"/></g><text x="55" y="31" text-anchor="middle" '+D+' font-size="4.6" letter-spacing=".4" fill="'+INK+'">LA SERENA</text>';
    // las iniciales, con punto y serifa, como en una tarjeta de escribanía
    var LS='M24 1L25 13L23.5 13C22 6 17 2.5 12.5 2.5C8 2.5 5.5 5 5.5 8.5C5.5 12 8.5 14 14 17C21 20.8 26 24 26 30C26 36 20.5 41 13.5 41C10 41 7 40 5 39C4 38.5 3 38.5 2.5 41L1 41L0 28L1.5 28C3 35 8 39 13.5 39C18 39 21 36.5 21 32.5C21 28.5 18 26.5 12 23C5.5 19.4 1.5 16.5 1.5 10.5C1.5 5 6 1 12.5 1C15.5 1 18 1.7 20 2.7C21.5 3.4 22.2 3 22.7 1Z';
    var LJ='M9 1H30V2.5C26.5 2.7 25.5 3.5 25.5 7V29C25.5 36.5 21 41 14.5 41C9.5 41 5.5 38.5 5.5 34.5C5.5 32 7.3 30.5 9.5 30.5C11.5 30.5 13 32 13 34C13 36 11.5 36.8 11.5 38C11.5 39 12.5 39.5 14 39.5C17.5 39.5 19.5 36 19.5 29V7C19.5 3.5 18.5 2.7 9 2.5Z';
    [[LS,23.5],[LJ,54.5]].forEach(function(q){s+='<path d="'+q[0]+'" transform="translate('+q[1]+' 37.5) scale(.72)" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round" paint-order="stroke"/>';});
    s+='<circle cx="46.3" cy="65" r="1.7" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/><circle cx="77.5" cy="65" r="1.7" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/>';
    // abajo, en la punta, el sobre: mejor no preguntar
    s+='<g transform="translate(50 87.5) rotate(-7)"><rect x="-10.5" y="-6.5" width="21" height="13" rx=".8" fill="#c9a877" stroke="'+INK+'" stroke-width="1"/><path d="M-10.5-6.5L0 1L10.5-6.5" fill="none" stroke="'+INK+'" stroke-width=".9" stroke-linejoin="round"/><circle cy="1" r="2.8" fill="#26272b" stroke="'+INK+'" stroke-width=".5"/><text y="2.9" text-anchor="middle" '+D+' font-size="4.6" fill="'+ORO+'">$</text></g>';
    s+=tx(32,86,5,ORO,'20')+tx(68,86,5,ORO,'01');
    var en='';
    // el sol que sale atrás de la corona
    for(var a=-172;a<=-8;a+=20.5){var r=a*Math.PI/180,lr=Math.min(17+19*Math.abs(Math.cos(r)),15.5/Math.abs(Math.sin(r)));en+='<path d="M'+(50+11*Math.cos(r-.11)).toFixed(1)+' '+(18+11*Math.sin(r-.11)).toFixed(1)+'L'+(50+lr*Math.cos(r)).toFixed(1)+' '+(18+lr*Math.sin(r)).toFixed(1)+'L'+(50+11*Math.cos(r+.11)).toFixed(1)+' '+(18+11*Math.sin(r+.11)).toFixed(1)+'Z" fill="'+ORO+'" stroke="'+INK+'" stroke-width=".7" stroke-linejoin="round"/>';}
    // la corona, torcida
    en+='<g transform="rotate(-9 50 16)"><path d="M36 20L33 7L42 12.5L50 3.5L58 12.5L67 7L64 20Z" fill="'+ORO+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/><path d="M36 17.4H64" stroke="'+INK+'" stroke-width=".8"/><circle cx="33" cy="6.5" r="1.8" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/><circle cx="50" cy="3.2" r="2" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/><circle cx="67" cy="6.5" r="1.8" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/><circle cx="50" cy="14" r="1.5" fill="'+c.c1+'" stroke="'+INK+'" stroke-width=".6"/></g>';
    // el lema: "todo es nuestro"
    en+='<path d="M28 72.5L23.5 71L25.8 75L23.5 79L30 78M72 72.5L76.5 71L74.2 75L76.5 79L70 78" fill="#cdbf91" stroke="'+INK+'" stroke-width=".9" stroke-linejoin="round"/><path d="M27 70.5Q50 75.5 73 70.5L73 77Q50 82 27 77Z" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1" stroke-linejoin="round"/><path id="'+id+'c" d="M28 75.2Q50 80 72 75.2" fill="none"/><text font-family="Courier Prime, monospace" font-weight="700" font-size="4" letter-spacing=".25" text-anchor="middle" fill="'+OS+'"><textPath href="#'+id+'c" startOffset="50%">OMNIA NOSTRA</textPath></text>';
    return marco(d,ORO,s,en);
  }
  function escuditoPiluso(x,y,s){
    return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-10-9l4-1.5 1 2.5h10l1-2.5 4 1.5v9c0 6-4 10-10 12-6-2-10-6-10-12z" fill="#f4efe3"/><path d="M-4.5-1q0-4 4.5-4t4.5 4zM-6.5 0.5q6.5-2.5 13 0l-.8 1.3q-5.7-2-11.4 0z" fill="'+PILUSO+'"/></g>';
  }

  // ---------- Caricaturas: cuerpo entero, cabeza enorme y un chiste por Jugador ----------
  var PIEL={oscura:['#8d5a3a','#6f4329'],clara:['#f4d0ae','#dfac86'],palida:['#fbeadc','#ecc8ae'],media:['#e8b68f','#cc9068'],trigueña:['#d6a074','#b47b53'],sil:['#3a332b','#2b2620']};
  var PELO={negro:'#251a14',oscuro:'#47311f',castano:'#73492a',claro:'#a87a4a',rubio:'#ddb465',colorado:'#b0592c',canas:'#d9d5cc',gris:'#8f8d88'};
  var SHORT={gol:'#24395e',suerte:CREMA,picardia:INK,fans:CREMA,sponsors:'#6e2321'};
  var BANDA={gol:CREMA,suerte:'#efe2b8',picardia:INK,fans:CREMA,sponsors:'#d9b25a'};

  function mano(x,y,r,piel,tipo,rot){
    var s='<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+(rot||0)+')">';
    if(tipo==='guante') s+='<rect x="'+(-r)+'" y="'+(-r*1.25)+'" width="'+(r*2)+'" height="'+(r*2.5)+'" rx="'+(r*.8)+'" fill="'+GUANTE+'" stroke="'+INK+'" stroke-width="2.4"/>'+
      '<path d="M'+(-r*.45)+' '+(-r*1.2)+'v'+(r*1.1)+'M0 '+(-r*1.25)+'v'+(r*1.15)+'M'+(r*.45)+' '+(-r*1.2)+'v'+(r*1.1)+'" stroke="#3d8a74" stroke-width="1.8"/>'+
      '<rect x="'+(-r*1.05)+'" y="'+(r*.55)+'" width="'+(r*2.1)+'" height="'+(r*.65)+'" rx="2" fill="#2f6f5e" stroke="'+INK+'" stroke-width="2"/><ellipse cx="'+(-r*1.05)+'" cy="'+(-r*.1)+'" rx="'+(r*.42)+'" ry="'+(r*.7)+'" fill="'+GUANTE+'" stroke="'+INK+'" stroke-width="2.2"/>';
    else if(tipo==='pulgar') s+='<rect x="'+(-r*.32)+'" y="'+(-r*2)+'" width="'+(r*.75)+'" height="'+(r*1.5)+'" rx="'+(r*.37)+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.2"/><circle r="'+r+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.4"/>';
    else if(tipo==='dedo') s+='<rect x="'+(-r*.3)+'" y="'+(-r*2.3)+'" width="'+(r*.62)+'" height="'+(r*1.8)+'" rx="'+(r*.31)+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.2"/><circle r="'+r+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.4"/>';
    else if(tipo==='palma') s+=[-.6,-.2,.2,.6].map(function(dx){return '<rect x="'+(dx*r-r*.2)+'" y="'+(-r*1.9)+'" width="'+(r*.42)+'" height="'+(r*1.3)+'" rx="'+(r*.21)+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="1.8"/>';}).join('')+
      '<ellipse rx="'+r+'" ry="'+(r*.95)+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.4"/>';
    else s+='<circle r="'+r+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.4"/><path d="M'+(-r*.55)+' '+(-r*.25)+'q'+(r*.55)+' '+(-r*.4)+' '+(r*1.1)+' 0" fill="none" stroke="'+piel[1]+'" stroke-width="1.6" stroke-linecap="round"/>';
    return s+'</g>';
  }
  function brazo(pp,ancho,color){
    var d='M'+pp.map(function(p){return n1(p[0])+' '+n1(p[1]);}).join('L');
    return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="'+(ancho+4.5)+'" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="'+ancho+'" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function pelota(x,y,r){return '<g transform="translate('+n1(x)+' '+n1(y)+') scale('+(r/10)+')"><circle r="10" fill="#fff" stroke="'+INK+'" stroke-width="2"/><path d="M0-4l3.8 2.8-1.5 4.5h-4.6l-1.5-4.5z" fill="'+INK+'"/><path d="M0-4V-10M3.8-1.2l5.6-1.8M2.3 3.3l3.4 4.8M-2.3 3.3l-3.4 4.8M-3.8-1.2l-5.6-1.8" stroke="'+INK+'" stroke-width="1.3"/></g>';}
  function curita(x,y,rot){return '<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+rot+')"><rect x="-8" y="-3" width="16" height="6" rx="2.5" fill="#e9c7a0" stroke="'+INK+'" stroke-width="1.2"/><rect x="-3" y="-3" width="6" height="6" fill="#d9a87a"/></g>';}
  function chispa(x,y,r){return '<path d="M'+x+' '+(y-r)+'L'+(x+r*.3)+' '+(y-r*.3)+'L'+(x+r)+' '+y+'L'+(x+r*.3)+' '+(y+r*.3)+'L'+x+' '+(y+r)+'L'+(x-r*.3)+' '+(y+r*.3)+'L'+(x-r)+' '+y+'L'+(x-r*.3)+' '+(y-r*.3)+'Z" fill="#f2c94c" stroke="'+INK+'" stroke-width="1.4" stroke-linejoin="round"/>';}
  function globo(x,y,wd,txt,tx,ty){
    return '<path d="M'+n1(x+wd*.55)+' '+(y+24)+'L'+n1(tx)+' '+n1(ty)+'L'+n1(x+wd*.72)+' '+(y+24)+'Z" fill="#fff" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><rect x="'+x+'" y="'+y+'" width="'+wd+'" height="26" rx="12" fill="#fff" stroke="'+INK+'" stroke-width="2.2"/>'+
      '<path d="M'+n1(x+wd*.55+1.5)+' '+(y+24.5)+'H'+n1(x+wd*.72-1.5)+'" stroke="#fff" stroke-width="3"/><text x="'+(x+wd/2)+'" y="'+(y+18)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="12" fill="'+INK+'">'+txt+'</text>';
  }

  function camiseta(k,cx,T,W,sw,wa,o){
    var c=C[k], id=U('rm'), h=W-T;
    var p='M'+(cx-sw)+' '+(T+12)+'Q'+(cx-sw)+' '+T+' '+(cx-sw+14)+' '+(T-1)+'L'+(cx+sw-14)+' '+(T-1)+'Q'+(cx+sw)+' '+T+' '+(cx+sw)+' '+(T+12)+'L'+(cx+wa)+' '+W+'L'+(cx-wa)+' '+W+'Z';
    var d='', rm=(o&&o.remera)||'lisa';
    // La Escuelita: cada uno con su camiseta roja
    if(k==='escuelita'){
      if(rm==='banda') d='<path d="M'+(cx-sw-12)+' '+(T-6)+'H'+(cx-sw+8)+'L'+(cx+sw+12)+' '+(W+2)+'H'+(cx+sw-8)+'Z" fill="#fff" stroke="'+INK+'" stroke-width="1.4"/>';
      if(rm==='españa') d='<rect x="'+(cx-sw-4)+'" y="'+(T-4)+'" width="7" height="'+(h+8)+'" fill="#f2c94c"/><rect x="'+(cx+sw-3)+'" y="'+(T-4)+'" width="7" height="'+(h+8)+'" fill="#f2c94c"/><circle cx="'+(cx+sw*.42)+'" cy="'+n1(T+h*.32)+'" r="4.5" fill="#f2c94c" stroke="'+INK+'" stroke-width="1"/>';
      if(rm==='rayas') for(var xr=cx-sw+8;xr<cx+sw;xr+=14) d+='<rect x="'+(xr-3)+'" y="'+(T-4)+'" width="6" height="'+(h+8)+'" fill="#fff"/>';
      if(rm==='mitad') d='<rect x="'+cx+'" y="'+(T-4)+'" width="'+(sw+6)+'" height="'+(h+8)+'" fill="'+PILUSO+'"/><path d="M'+(cx+4)+' '+n1(T+h*.5)+'l6-6 6 6 6-6 6 6 6-6" fill="none" stroke="#4f8fd6" stroke-width="3"/>';
    }
    if(k==='gol') d='<rect x="0" y="'+n1(T+h*.36)+'" width="200" height="'+n1(h*.2)+'" fill="'+CREMA+'"/>';
    if(k==='suerte') d=trebol(cx-sw*.42,T+h*.38,.3,DORADO);
    if(k==='picardia') for(var x=cx-sw+4;x<cx+sw;x+=15) d+='<rect x="'+(x-3.5)+'" y="'+(T-4)+'" width="7" height="'+(h+8)+'" fill="'+INK+'"/>';
    if(k==='fans') d='<rect x="0" y="0" width="'+n1(cx-sw*.42)+'" height="230" fill="'+CREMA+'" opacity=".9"/><rect x="'+n1(cx+sw*.42)+'" y="0" width="200" height="230" fill="'+CREMA+'" opacity=".9"/><text x="'+cx+'" y="'+n1(T+h*.72)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="13" fill="'+CREMA+'">12</text>';
    if(k==='sponsors') d='<rect x="'+(cx-19)+'" y="'+n1(T+h*.4)+'" width="38" height="11" rx="1.5" fill="'+c.c2+'"/><text x="'+cx+'" y="'+n1(T+h*.4+7.9)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="6.2" fill="#1f3a2b">LA SERENA</text>'+
      '<rect x="'+(cx-sw+7)+'" y="'+(T+8)+'" width="10" height="7" fill="'+CREMA+'"/><rect x="'+(cx+sw-17)+'" y="'+(T+8)+'" width="10" height="7" fill="'+c.c2+'"/>';
    return '<defs><clipPath id="'+id+'"><path d="'+p+'"/></clipPath></defs><path d="'+p+'" fill="'+c.c1+'"/><g clip-path="url(#'+id+')">'+d+'<rect x="'+n1(cx+sw*.4)+'" y="'+(T-4)+'" width="'+sw+'" height="'+(h+8)+'" fill="#000" opacity=".12"/></g><path d="'+p+'" fill="none" stroke="'+INK+'" stroke-width="2.8" stroke-linejoin="round"/>';
  }
  function piernas(k,o,cx,W,lx,lw,piel){
    var c=C[k], s='', banda=k==='picardia'?INK:BANDA[k];
    [-1,1].forEach(function(sg){
      var x=cx+sg*lx, dir=o.gag==='izq'?-1:sg;
      if(o.descalzo){
        // En patas, como buen brasileño
        s+='<path d="M'+x+' '+(W+10)+'V200" stroke="'+INK+'" stroke-width="'+(lw+4.5)+'" stroke-linecap="round"/><path d="M'+x+' '+(W+10)+'V200" stroke="'+piel[0]+'" stroke-width="'+lw+'" stroke-linecap="round"/>';
        s+='<path d="M'+n1(x-dir*(lw/2+1))+' 197Q'+n1(x-dir*(lw/2+2))+' 210 '+n1(x+dir*4)+' 210H'+n1(x+dir*(lw/2+9))+'Q'+n1(x+dir*(lw/2+12))+' 204 '+n1(x+dir*(lw/2+2))+' 199Z" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/>';
        for(var t=0;t<4;t++) s+='<circle cx="'+n1(x+dir*(lw/2+8.5-t*3.1))+'" cy="206" r="'+(t?1.5:1.9)+'" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="1"/>';
      } else {
        s+='<path d="M'+x+' '+(W+10)+'V194" stroke="'+INK+'" stroke-width="'+(lw+4.5)+'" stroke-linecap="round"/><path d="M'+x+' '+(W+10)+'V194" stroke="'+piel[0]+'" stroke-width="'+lw+'" stroke-linecap="round"/>';
        s+='<rect x="'+n1(x-lw/2-1.5)+'" y="188" width="'+(lw+3)+'" height="16" rx="2" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="2"/><rect x="'+n1(x-lw/2-.5)+'" y="191" width="'+(lw+1)+'" height="3" fill="'+banda+'"/>';
        s+='<path d="M'+n1(x-dir*(lw/2+2))+' 202Q'+n1(x-dir*(lw/2+3))+' 211 '+n1(x+dir*3)+' 211H'+n1(x+dir*(lw/2+11))+'Q'+n1(x+dir*(lw/2+13))+' 205 '+n1(x+dir*(lw/2+3))+' 203Z" fill="'+INK+'"/>';
        s+='<path d="M'+n1(x-dir*2)+' 211h'+(dir*3)+'M'+n1(x+dir*5)+' 211h'+(dir*3)+'" stroke="#bbb" stroke-width="1.6"/>';
      }
      if(o.gag==='izq') s+='<text x="'+n1(x-dir*0-3)+'" y="208.5" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="6" fill="'+CREMA+'">IZQ</text>';
      // Rodillera de neoprene: rodillas operadas de LCA, ya recuperadas
      var rod=o.rodillera;
      if(rod==='dos'||(rod==='izq'&&sg<0)||(rod==='der'&&sg>0)) s+='<rect x="'+n1(x-lw/2-3)+'" y="179" width="'+(lw+6)+'" height="9.5" rx="3" fill="#25272c" stroke="'+INK+'" stroke-width="1.6"/><ellipse cx="'+x+'" cy="184" rx="'+n1(lw*.28+1.2)+'" ry="2.4" fill="none" stroke="#7a8089" stroke-width="1.4"/>';
      if(o.gag==='patadas') s+=curita(x,180+sg*4,sg*35);
    });
    return s;
  }
  // Pelo cuando no hay piluso
  function peloArriba(o,cx,cy,w,top,pelo){
    var est=o.corte||'corto', v=est==='porra'?2:(o.vol||0), s='', rd=azar(w*13+v);
    if(est==='pelado') return '<path d="M'+n1(cx-w*.55)+' '+(top+16)+'Q'+n1(cx-w*.25)+' '+(top+4)+' '+n1(cx+w*.15)+' '+(top+7)+'" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/><ellipse cx="'+n1(cx+w*.38)+'" cy="'+(top+14)+'" rx="5" ry="3" fill="#fff" opacity=".5"/>';
    var p='M'+(cx-w-2)+' '+(cy-2)+'C'+(cx-w-5)+' '+(top-14-v)+' '+(cx+w+5)+' '+(top-14-v)+' '+(cx+w+2)+' '+(cy-2)+'L'+(cx+w-5)+' '+(cy-12)+'C'+(cx+w-8)+' '+(top+20)+' '+(cx+16)+' '+(top+14)+' '+(cx+2)+' '+(top+20)+'C'+(cx-14)+' '+(top+10)+' '+(cx-w+8)+' '+(top+20)+' '+(cx-w+5)+' '+(cy-12)+'Z';
    var R=(cy-2)-(top-3-v*.75);
    if(est==='entradas') p='M'+(cx-w-2)+' '+(cy-2)+'C'+(cx-w-5)+' '+(top-12-v)+' '+(cx+w+5)+' '+(top-12-v)+' '+(cx+w+2)+' '+(cy-2)+'L'+(cx+w-5)+' '+(cy-12)+'C'+(cx+w-7)+' '+(top+4)+' '+n1(cx+w*.5)+' '+(top-4)+' '+n1(cx+w*.3)+' '+(top+6)+'Q'+cx+' '+(top+18)+' '+n1(cx-w*.3)+' '+(top+6)+'C'+n1(cx-w*.5)+' '+(top-4)+' '+(cx-w+7)+' '+(top+4)+' '+(cx-w+5)+' '+(cy-12)+'Z';
    if(est==='revuelto'||est==='ondas'){
      [-.85,-.55,-.25,.05,.35,.65,.9].forEach(function(i){
        var x=cx+i*(w+2), y=(cy-2)-R*Math.sqrt(1-i*i);
        if(est==='ondas') s+='<circle cx="'+n1(x)+'" cy="'+n1(y+2)+'" r="'+n1(8+rd()*3)+'" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.6"/>';
        else { var d=(rd()-.5)*22+i*14; s+='<path d="M'+n1(x-7)+' '+n1(y+6)+'L'+n1(x+d)+' '+n1(y-12-rd()*8)+'L'+n1(x+7)+' '+n1(y+6)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>'; }
      });
    }
    s+='<path d="'+p+'" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.8" stroke-linejoin="round"/>';
    s+='<path d="M'+(cx-w*.55)+' '+(top+4-v*.5)+'Q'+(cx-w*.1)+' '+(top-6-v*.7)+' '+(cx+w*.3)+' '+(top-3-v*.6)+'" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".18"/>';
    if(est==='porra'){
      // La porra que crece para arriba, no para los costados
      var pv=o.vol||30, ink='', fil='', bri='';
      for(var i=0;i<5;i++){
        var yc=top+4-i*(pv+4)/4, nq=i<4?5:4, ww=w*(.74+i*.03);
        for(var q=0;q<nq;q++){
          var xq=cx-ww+(2*ww)*q/(nq-1)+(rd()-.5)*4, r=11+rd()*3;
          ink+='<circle cx="'+n1(xq)+'" cy="'+n1(yc)+'" r="'+n1(r+2.6)+'" fill="'+INK+'"/>';
          fil+='<circle cx="'+n1(xq)+'" cy="'+n1(yc)+'" r="'+n1(r)+'" fill="'+pelo+'"/>';
          if(i>0&&q%2) bri+='<path d="M'+n1(xq-4)+' '+n1(yc-2)+'q4-5 8 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".22"/>';
        }
      }
      s+=ink+fil+bri;
    }
    if(o.flequillo==='recto') s+='<path d="M'+(cx-w+3)+' '+(top+8)+'C'+(cx-w+5)+' '+(top+32)+' '+(cx-14)+' '+(top+30)+' '+(cx-7)+' '+(top+24)+'L'+(cx-1)+' '+(top+32)+'L'+(cx+5)+' '+(top+24)+'L'+(cx+11)+' '+(top+31)+'C'+(cx+18)+' '+(top+26)+' '+(cx+w-5)+' '+(top+30)+' '+(cx+w-3)+' '+(top+8)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>';
    if(o.flequillo==='lado') s+='<path d="M'+(cx-w+3)+' '+(top+10)+'C'+(cx-w+8)+' '+(top+30)+' '+(cx+4)+' '+(top+27)+' '+(cx+w-2)+' '+(top+21)+'C'+(cx+w-8)+' '+(top+6)+' '+cx+' '+(top+2)+' '+(cx-w+3)+' '+(top+10)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>';
    if(est==='medio'||est==='largo'){
      var ln=est==='largo'?44:22;
      [-1,1].forEach(function(sg){s+='<path d="M'+(cx+sg*(w+2))+' '+(cy-10)+'Q'+(cx+sg*(w+11))+' '+(cy+ln*.45)+' '+(cx+sg*(w+3))+' '+(cy+ln)+'Q'+(cx+sg*(w-4))+' '+(cy+ln*.4)+' '+(cx+sg*(w-6))+' '+(cy-12)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>';});
    }
    if(est==='largo') s+='<path d="M'+cx+' '+(top-6-v)+'Q'+(cx-3)+' '+(top+6)+' '+(cx-12)+' '+(top+19)+'" fill="none" stroke="'+INK+'" stroke-width="2" opacity=".45"/>';
    return s;
  }
  // Pelo que asoma bajo el piluso o el casco
  function peloCostado(o,cx,yb,w,pelo){
    var s='', largo={corto:16,medio:30,largo:40,revuelto:24,ondas:20}[o.corte||'corto'];
    [-1,1].forEach(function(sg){
      var x0=cx+sg*(w+2);
      s+='<path d="M'+(x0-sg*16)+' '+(yb+12)+'Q'+(x0+sg*9)+' '+(yb+14+largo*.4)+' '+(x0-sg*1)+' '+(yb+14+largo)+'Q'+(x0-sg*5)+' '+(yb+20)+' '+(x0-sg*18)+' '+(yb+18)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>';
    });
    return s;
  }
  // El piluso, en los colores del club (uno solo por equipo lo usa)
  function gorro(cx,yb,w,rot,k){
    var c1=C[k].c1, b=BANDA[k], cw=w*.86, bw=w+22;
    var s='<g transform="rotate('+(rot||0)+' '+cx+' '+yb+')">';
    s+='<path d="M'+n1(cx-cw)+' '+yb+'C'+n1(cx-cw)+' '+(yb-30)+' '+n1(cx-cw+7)+' '+(yb-41)+' '+cx+' '+(yb-42)+'C'+n1(cx+cw-7)+' '+(yb-41)+' '+n1(cx+cw)+' '+(yb-30)+' '+n1(cx+cw)+' '+yb+'Z" fill="'+c1+'" stroke="'+INK+'" stroke-width="3"/>';
    s+='<path d="M'+n1(cx-cw+8)+' '+(yb-6)+'C'+n1(cx-cw+6)+' '+(yb-26)+' '+n1(cx-cw+12)+' '+(yb-35)+' '+n1(cx-cw+22)+' '+(yb-38)+'" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".25"/>';
    s+='<path d="M'+n1(cx-cw+1)+' '+(yb-8)+'Q'+cx+' '+(yb-14)+' '+n1(cx+cw-1)+' '+(yb-8)+'" fill="none" stroke="'+b+'" stroke-width="6"/>';
    s+='<path d="M'+n1(cx-cw)+' '+(yb-2)+'Q'+cx+' '+(yb-9)+' '+n1(cx+cw)+' '+(yb-2)+'L'+n1(cx+bw)+' '+(yb+14)+'Q'+n1(cx+bw+3)+' '+(yb+21)+' '+n1(cx+bw-7)+' '+(yb+20)+'Q'+cx+' '+(yb+4)+' '+n1(cx-bw+7)+' '+(yb+20)+'Q'+n1(cx-bw-3)+' '+(yb+21)+' '+n1(cx-bw)+' '+(yb+14)+'Z" fill="'+c1+'" stroke="'+INK+'" stroke-width="3" stroke-linejoin="round"/>';
    s+='<path d="M'+n1(cx-bw+8)+' '+(yb+15)+'Q'+cx+' '+(yb+1)+' '+n1(cx+bw-8)+' '+(yb+15)+'" fill="none" stroke="'+b+'" stroke-width="1.4" stroke-dasharray="3 2.5" opacity=".7"/>';
    s+='<g transform="translate('+(cx-9)+' '+(yb-36)+') scale(.18)">'+badge(k)+'</g>';
    return s+'</g>';
  }
  function casco(cx,yb,w){
    var s='';
    [-1,1].forEach(function(sg){s+='<path d="M'+(cx+sg*(w-6))+' '+(yb-14)+'C'+(cx+sg*(w+18))+' '+(yb-14)+' '+(cx+sg*(w+30))+' '+(yb-32)+' '+(cx+sg*(w+24))+' '+(yb-58)+'C'+(cx+sg*(w+16))+' '+(yb-40)+' '+(cx+sg*(w+6))+' '+(yb-32)+' '+(cx+sg*(w-10))+' '+(yb-30)+'Z" fill="#f3ead2" stroke="'+INK+'" stroke-width="2.6" stroke-linejoin="round"/>'+
      '<path d="M'+(cx+sg*(w+14))+' '+(yb-22)+'l'+(sg*6)+' -5M'+(cx+sg*(w+21))+' '+(yb-33)+'l'+(sg*5)+' -2" stroke="#c9b98f" stroke-width="2"/>';});
    s+='<path d="M'+(cx-w-4)+' '+(yb+6)+'C'+(cx-w-4)+' '+(yb-48)+' '+(cx+w+4)+' '+(yb-48)+' '+(cx+w+4)+' '+(yb+6)+'Z" fill="#a7b0b8" stroke="'+INK+'" stroke-width="3"/>';
    s+='<path d="M'+(cx-w*.6)+' '+(yb-14)+'Q'+(cx-w*.4)+' '+(yb-32)+' '+(cx-w*.05)+' '+(yb-36)+'" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".4"/>';
    s+='<rect x="'+(cx-5)+'" y="'+(yb-37)+'" width="10" height="40" fill="#c9a24a" stroke="'+INK+'" stroke-width="2"/>';
    s+='<rect x="'+(cx-w-6)+'" y="'+(yb-3)+'" width="'+(2*w+12)+'" height="11" rx="4" fill="#c9a24a" stroke="'+INK+'" stroke-width="2.4"/>';
    for(var i=-3;i<=3;i++) s+='<circle cx="'+n1(cx+i*w/3.4)+'" cy="'+(yb+2.5)+'" r="1.7" fill="'+INK+'"/>';
    return s;
  }

  function minero(cx,yb,w){
    var s='<path d="M'+(cx-w-2)+' '+(yb+4)+'C'+(cx-w-2)+' '+(yb-46)+' '+(cx+w+2)+' '+(yb-46)+' '+(cx+w+2)+' '+(yb+4)+'Z" fill="#f2c94c" stroke="'+INK+'" stroke-width="3"/>';
    s+='<path d="M'+(cx-w*.6)+' '+(yb-12)+'Q'+(cx-w*.45)+' '+(yb-30)+' '+(cx-w*.1)+' '+(yb-34)+'" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".4"/>';
    s+='<rect x="'+(cx-w-8)+'" y="'+(yb-2)+'" width="'+(2*w+16)+'" height="9" rx="4" fill="#e0b23a" stroke="'+INK+'" stroke-width="2.4"/>';
    s+='<rect x="'+(cx-10)+'" y="'+(yb-27)+'" width="20" height="15" rx="3" fill="#8a9096" stroke="'+INK+'" stroke-width="2"/><circle cx="'+cx+'" cy="'+(yb-19.5)+'" r="5.5" fill="#fff6c8" stroke="'+INK+'" stroke-width="1.6"/>';
    s+='<g stroke="#f2c94c" stroke-width="2.4" stroke-linecap="round"><path d="M'+cx+' '+(yb-30)+'v-8M'+(cx-9)+' '+(yb-29)+'l-5-6M'+(cx+9)+' '+(yb-29)+'l5-6"/></g>';
    return s;
  }

  function fondo(k,o){
    var c=C[k], s='<rect width="200" height="220" fill="'+c.fondo+'"/>', rd=azar((o.w||40)*7+(o.h||3));
    for(var r=0;r<12;r++){var a=(r*30)*Math.PI/180,b=7*Math.PI/180;
      s+='<path d="M100 96L'+n1(100+260*Math.cos(a-b))+' '+n1(96+260*Math.sin(a-b))+'L'+n1(100+260*Math.cos(a+b))+' '+n1(96+260*Math.sin(a+b))+'Z" fill="'+c.c1+'" opacity=".13"/>';}
    if(o.gag==='muralla'){
      s+='<g fill="none" stroke="#9c5a3c" stroke-width="2" opacity=".35">';
      for(var y=0;y<220;y+=16){s+='<path d="M0 '+y+'H200"/>';for(var x=(y/16)%2?0:20;x<200;x+=40) s+='<path d="M'+x+' '+y+'v16"/>';}
      s+='</g>';
    }
    if(o.gag==='nieve'){
      for(var q=0;q<36;q++) s+='<circle cx="'+n1(rd()*200)+'" cy="'+n1(rd()*215)+'" r="'+n1(1.3+rd()*2.3)+'" fill="#fff" stroke="#9fb6c8" stroke-width=".6"/>';
      s+='<g transform="translate(22 118)"><rect x="-6" y="0" width="12" height="46" rx="6" fill="#fff" stroke="'+INK+'" stroke-width="2"/><rect x="-2" y="32" width="4" height="12" fill="#d8453a"/><circle cx="0" cy="50" r="8" fill="#d8453a" stroke="'+INK+'" stroke-width="2"/><path d="M6 10h-4M6 18h-4M6 26h-4" stroke="'+INK+'" stroke-width="1.2"/><text x="0" y="76" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="15" fill="'+INK+'">5°</text></g>';
    }
    if(o.gag==='topera'){
      // Montañitas de tierra, y un topo de verdad que se asoma
      s+='<path d="M-6 216Q22 170 52 216Z" fill="#8a5a32" stroke="'+INK+'" stroke-width="2.2"/><path d="M150 216Q178 178 206 216Z" fill="#8a5a32" stroke="'+INK+'" stroke-width="2.2"/>';
      s+='<g fill="#5e3b1f">'+[[14,206],[26,198],[36,208],[166,206],[178,200],[190,209],[30,190]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2"/>';}).join('')+'</g>';
      s+='<g transform="translate(22 186)"><ellipse cx="0" cy="0" rx="10" ry="8" fill="#5a5560" stroke="'+INK+'" stroke-width="2"/><circle cx="-3.5" cy="-2" r="1.3" fill="'+INK+'"/><circle cx="3.5" cy="-2" r="1.3" fill="'+INK+'"/><ellipse cx="0" cy="3" rx="3.4" ry="2.4" fill="#f08aa0" stroke="'+INK+'" stroke-width="1.2"/><path d="M-12 7h6M6 7h6" stroke="#f0b7c8" stroke-width="3" stroke-linecap="round"/></g>';
    }
    if(o.gag==='flash'){
      s+='<g transform="translate(34 34)"><path d="M0-26L6-8L24-12L10 2L22 18L4 10L0 28L-4 10L-22 18L-10 2L-24-12L-6-8Z" fill="#fff6c8" stroke="#f2c94c" stroke-width="2.4" stroke-linejoin="round"/><circle r="7" fill="#fff"/></g>';
      s+='<text x="170" y="30" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="15" fill="'+INK+'" transform="rotate(10 170 30)">¡CLIC!</text>';
    }
    if(o.gag==='zzz') s+='<g font-family="Bowlby One SC, sans-serif" fill="#4f78b0" opacity=".75"><text x="16" y="62" font-size="30">Z</text><text x="40" y="38" font-size="22">Z</text><text x="58" y="20" font-size="15">Z</text></g>';
    if(o.gag==='pulpo') for(var q=0;q<14;q++){var bx=rd()*200, by=10+rd()*150, br=2+rd()*4; s+='<circle cx="'+n1(bx)+'" cy="'+n1(by)+'" r="'+n1(br)+'" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="1.2" opacity=".8"/>';}
    if(o.gag==='polvo'){
      // La pelota del rival, hecha polvo de un chasquido
      s+='<g opacity=".9">'+pelota(36,150,11)+'</g>';
      for(var q=0;q<26;q++){var px=44+rd()*44, py=118+rd()*44, sz=1.6+rd()*3.4; s+='<rect x="'+n1(px+q*.6)+'" y="'+n1(py-q*1.2)+'" width="'+n1(sz)+'" height="'+n1(sz)+'" fill="'+INK+'" opacity="'+n1(Math.max(.12,.75-q*.025))+'" transform="rotate('+Math.round(rd()*60)+' '+n1(px)+' '+n1(py)+')"/>';}
      s+='<path d="M26 150a10 10 0 0 1 20 0" fill="'+c.fondo+'" opacity=".55"/>';
    }
    if(o.gag==='caballo'){
      s+='<g fill="#c9a77a" opacity=".55"><circle cx="16" cy="196" r="13"/><circle cx="32" cy="200" r="10"/><circle cx="8" cy="182" r="8"/><circle cx="28" cy="186" r="7"/></g>';
      s+='<g fill="none" stroke="'+INK+'" stroke-width="3" opacity=".75">'+[[22,40],[52,24],[36,70]].map(function(p){return '<path d="M'+(p[0]-6)+' '+(p[1]+6)+'V'+p[1]+'a6 6 0 0 1 12 0V'+(p[1]+6)+'" transform="rotate(-80 '+p[0]+' '+p[1]+')"/>';}).join('')+'</g>';
    }
    if(o.gag==='sushi') [[26,38,13],[172,28,11],[20,120,10],[182,108,12],[44,78,8],[160,70,8]].forEach(function(m,ix){s+='<g transform="translate('+m[0]+' '+m[1]+') rotate('+(ix*40)+') scale('+(m[2]/10)+')" opacity=".78"><rect x="-10" y="-8" width="20" height="16" rx="5" fill="#1f2a24"/><ellipse rx="8" ry="5.8" fill="#fbf8f1"/><ellipse rx="3.8" ry="2.9" fill="'+(ix%2?'#7fbf6a':'#ee7f4a')+'"/></g>';});
    if(o.gag==='sakura') for(var q=0;q<16;q++){var fx=rd()*200, fy=rd()*170, fr=rd()*360; s+='<g transform="translate('+n1(fx)+' '+n1(fy)+') rotate('+Math.round(fr)+')" fill="#f5b3c6" stroke="#d97c98" stroke-width=".8"><ellipse cx="0" cy="-3" rx="2.4" ry="3.6"/><ellipse cx="3" cy="1" rx="2.4" ry="3.6" transform="rotate(72 3 1)"/><ellipse cx="-3" cy="1" rx="2.4" ry="3.6" transform="rotate(-72 -3 1)"/></g>';}
    if(o.gag==='eq'){
      var EQC=['#e04f9a','#7b4fa0','#4fb8d8','#6ff07a'];
      for(var q=0;q<9;q++){var hq=10+rd()*38; s+='<rect x="'+(8+q*7)+'" y="'+n1(56-hq)+'" width="5" height="'+n1(hq)+'" rx="1.5" fill="'+EQC[q%4]+'" opacity=".75"/>';}
      s+='<text x="160" y="26" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="11" fill="#e04f9a" stroke="#fff" stroke-width=".6" transform="rotate(8 160 26)">JONI BOIS</text>';
    }
    if(o.gag==='parrilla') s+='<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"><path d="M168 70q-12-10 0-20t0-22"/><path d="M184 60q-10-8 0-17t0-18"/></g>';
    if(o.gag==='murcielago') s+='<g transform="translate(34 28) rotate(-10)" fill="'+INK+'" opacity=".8"><path d="M0 2C-4-4-10-6-22-4C-16 0-18 4-14 8C-10 4-6 6-4 10C-2 6 2 6 4 10C6 6 10 4 14 8C18 4 16 0 22-4C10-6 4-4 0 2Z"/><circle cy="0" r="4"/><path d="M-3-3l-1-4 3 2M3-3l1-4-3 2"/></g>';
    if(o.gag==='ciego') s+=pelota(24,150,9)+'<g stroke="'+INK+'" stroke-width="2" stroke-linecap="round" opacity=".5"><path d="M38 146h34M38 152h44M36 158h26"/></g>';
    if(o.gag==='jet') s+='<g transform="translate(44 30) rotate(-14)" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"><path d="M-30 0Q-30-6-20-6H22Q32-6 34 0Q32 6 22 6H-20Q-30 6-30 0Z" fill="#fff"/><path d="M-4-6L-14-22H-6L10-6ZM-4 6L-14 22H-6L10 6ZM-26-5L-32-16H-26L-18-6Z" fill="#dfe6ee"/><path d="M-12-1h4M-4-1h4M4-1h4M12-1h4" stroke="#4f8fd6" stroke-width="2.4"/></g><g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M6 52h-26M10 44h-16"/></g>';
    if(o.gag==='penal') s+='<g fill="none" stroke="#fff" stroke-width="4" opacity=".85"><path d="M118 176V122H198V176"/></g><g stroke="#fff" stroke-width="1" opacity=".5"><path d="M128 122v54M140 122v54M152 122v54M164 122v54M176 122v54M188 122v54M118 134h80M118 146h80M118 158h80M118 170h80"/></g>';
    if(o.gag==='marcador') s+='<g transform="translate(4 6) rotate(-4)"><rect width="66" height="46" rx="4" fill="'+INK+'"/><rect x="3" y="3" width="60" height="40" rx="2" fill="none" stroke="#f2c94c" stroke-width="1" opacity=".5"/><text x="33" y="13" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="6.4" letter-spacing=".5" fill="#f2c94c">TORNEO EL SAPO</text><text x="8" y="26" font-family="Courier Prime, monospace" font-weight="700" font-size="6" fill="#fff">ESCUELITA</text><text x="59" y="27" text-anchor="end" font-family="Bowlby One SC, sans-serif" font-size="11" fill="#6ff07a">5</text><text x="8" y="38" font-family="Courier Prime, monospace" font-weight="700" font-size="6" fill="#fff">AC MARTÍNEZ</text><text x="59" y="39" text-anchor="end" font-family="Bowlby One SC, sans-serif" font-size="11" fill="#6ff07a">0</text></g>';
    if(o.gag==='corre'||o.gag==='caballo') s+='<g stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M8 100h40M2 120h46M12 140h32M6 160h40"/></g>';
    return s;
  }

  function figura(k,o){
    var c=C[k], sil=o.foto===false, piel=PIEL[sil?'sil':(o.piel||'clara')], pelo=PELO[o.pelo||'castano'], pb=PELO[o.colorBarba||o.pelo||'castano'];
    var cx=100, w=o.w||46, j=o.jaw||36, hh=o.h||52, bot=o.bot||130, cy=bot-hh, top=cy-hh;
    var cu=o.cuerpo||'normal', sw={flaco:21,grandote:35,musculoso:37}[cu]||29, wa={flaco:16,grandote:30,musculoso:24}[cu]||23, aw={flaco:5.5,grandote:10,musculoso:13}[cu]||8;
    var T=bot-4, W=o.cintura||166, h=W-T, lx=Math.max(9,wa*.5), lw={flaco:6,grandote:11,musculoso:10}[cu]||8, nw={flaco:8,grandote:15,musculoso:15}[cu]||11;
    var yb=cy-hh*.5+(o.gorroY||0);
    var alto=sil?top-4:(o.casco?yb-58:(o.minero?yb-48:(o.gorro?yb-44:top-10-(o.vol||0)-(o.corte==='porra'?8:0))))-(o.antenas?26:0)-(o.aureola?18:0)-(o.gallo?22:0);
    var e=(alto<6?(206)/(212-alto):1)*(o.zoom||1);
    function Z(x,y){return [100+(x-100)*e,212-(212-y)*e];}
    var f='', fr='';
    f+='<ellipse cx="100" cy="211" rx="'+(sw+18)+'" ry="5" fill="#000" opacity=".16"/>';
    if(o.corte==='largo') f+='<path d="M'+(cx-w-4)+' '+(cy-26)+'C'+(cx-w-26)+' '+(cy+14)+' '+(cx-w-8)+' '+(cy+44)+' '+(cx-w-24)+' '+(cy+84)+'C'+(cx-w-4)+' '+(cy+86)+' '+(cx-w+8)+' '+(cy+74)+' '+(cx-w+14)+' '+(cy+62)+'L'+(cx+w-14)+' '+(cy+62)+'C'+(cx+w-8)+' '+(cy+74)+' '+(cx+w+8)+' '+(cy+84)+' '+(cx+w+28)+' '+(cy+78)+'C'+(cx+w+10)+' '+(cy+44)+' '+(cx+w+28)+' '+(cy+12)+' '+(cx+w+4)+' '+(cy-26)+'Z" fill="'+pelo+'" stroke="'+INK+'" stroke-width="3"/>';
    if(o.gallo){ // v17: El Gallo: cresta arriba y plumas de cola atrás
      f+='<path d="M'+(cx-17)+' '+(top+7)+'C'+(cx-26)+' '+(top-8)+' '+(cx-15)+' '+(top-18)+' '+(cx-8)+' '+(top-8)+'C'+(cx-11)+' '+(top-26)+' '+(cx+5)+' '+(top-30)+' '+(cx+5)+' '+(top-10)+'C'+(cx+9)+' '+(top-24)+' '+(cx+24)+' '+(top-17)+' '+(cx+17)+' '+(top+7)+'Z" fill="#d6382e" stroke="'+INK+'" stroke-width="2.8" stroke-linejoin="round"/>';
      [['#d6382e',-34],['#e0a22b',-52],['#2f7a5a',-70]].forEach(function(pl){f+='<path d="M0 0C-8-14-30-26-54-20C-44-12-30-4 0 6Z" transform="translate('+(cx-wa+5)+' '+(W-4)+') rotate('+(pl[1]+40)+')" fill="'+pl[0]+'" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/>';});
    }
    if(o.rodete) f+='<circle cx="'+(cx+6)+'" cy="'+(top-8)+'" r="13" fill="'+pelo+'" stroke="'+INK+'" stroke-width="2.8"/><path d="M'+(cx-2)+' '+(top-12)+'q8-6 15 0" fill="none" stroke="#fff" stroke-width="2" opacity=".2"/>';
    if(o.alas) [-1,1].forEach(function(sg){
      f+='<g transform="translate('+(cx+sg*(sw-4))+' '+(T+6)+') rotate('+(sg*-32)+')"><ellipse cx="'+(sg*32)+'" cy="-12" rx="34" ry="13" fill="#d8eef6" fill-opacity=".8" stroke="'+INK+'" stroke-width="2.2"/>'+
        '<path d="M0 0Q'+(sg*26)+' -15 '+(sg*62)+' -14M'+(sg*12)+' -5Q'+(sg*34)+' -4 '+(sg*56)+' -3M'+(sg*22)+' -10l'+(sg*8)+' -12M'+(sg*40)+' -13l'+(sg*6)+' -10" fill="none" stroke="#7da3b3" stroke-width="1.4"/></g>';
    });
    if(o.mancuernas) [[cx-sw-30,204],[cx-sw-22,196]].forEach(function(p){
      f+='<g transform="translate('+p[0]+' '+p[1]+')"><rect x="-12" y="-1.8" width="24" height="3.6" fill="#8a9096" stroke="'+INK+'" stroke-width="1.2"/><rect x="-15" y="-7" width="6" height="14" rx="1.5" fill="#3a3f4a" stroke="'+INK+'" stroke-width="1.6"/><rect x="9" y="-7" width="6" height="14" rx="1.5" fill="#3a3f4a" stroke="'+INK+'" stroke-width="1.6"/></g>';
    });
    if(o.caballo) f+='<path d="M'+(cx-wa+4)+' '+(W-6)+'C'+(cx-wa-22)+' '+(W-14)+' '+(cx-wa-40)+' '+(W+6)+' '+(cx-wa-34)+' '+(W+36)+'C'+(cx-wa-27)+' '+(W+26)+' '+(cx-wa-22)+' '+(W+28)+' '+(cx-wa-16)+' '+(W+38)+'C'+(cx-wa-13)+' '+(W+22)+' '+(cx-wa-6)+' '+(W+12)+' '+(cx-wa+6)+' '+(W+6)+'Z" fill="#7a4a25" stroke="'+INK+'" stroke-width="2.6" stroke-linejoin="round"/><path d="M'+(cx-wa-8)+' '+(W-2)+'Q'+(cx-wa-26)+' '+(W+8)+' '+(cx-wa-26)+' '+(W+24)+'" fill="none" stroke="#a9733f" stroke-width="2" stroke-linecap="round"/>';
    f+=piernas(k,o,cx,W,lx,lw,piel);
    if(o.kilt){
      // Pollera escocesa, a cuadros
      var kid=U('kt'), kp='M'+(cx-wa-1)+' '+(W-3)+'H'+(cx+wa+1)+'L'+(cx+wa+8)+' '+(W+15)+'H'+(cx-wa-8)+'Z', kd='';
      for(var xk=cx-wa-8;xk<cx+wa+8;xk+=9) kd+='<rect x="'+xk+'" y="'+(W-4)+'" width="3" height="22" fill="#b23f3c" opacity=".85"/>';
      kd+='<rect x="'+(cx-wa-9)+'" y="'+(W+2)+'" width="'+(2*wa+18)+'" height="3.5" fill="#1f3a6b"/><rect x="'+(cx-wa-9)+'" y="'+(W+10)+'" width="'+(2*wa+18)+'" height="2" fill="#f2c94c" opacity=".8"/>';
      f+='<defs><clipPath id="'+kid+'"><path d="'+kp+'"/></clipPath></defs><path d="'+kp+'" fill="#2f5a46"/><g clip-path="url(#'+kid+')">'+kd+'</g><path d="M'+(cx-8)+' '+(W+1)+'l-3 14M'+(cx+8)+' '+(W+1)+'l3 14M'+cx+' '+(W+1)+'v14" stroke="'+INK+'" stroke-width="1.2" opacity=".5"/><path d="'+kp+'" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linejoin="round"/>';
    } else f+='<path d="M'+(cx-wa-1)+' '+(W-3)+'H'+(cx+wa+1)+'L'+(cx+wa+5)+' '+(W+15)+'H'+(cx+2)+'L'+cx+' '+(W+7)+'L'+(cx-2)+' '+(W+15)+'H'+(cx-wa-5)+'Z" fill="'+SHORT[k]+'" stroke="'+INK+'" stroke-width="2.6" stroke-linejoin="round"/>';
    if(o.gag==='defender'||o.gag==='pisa') f+=pelota(cx+lx+16,203,8);
    if(o.gag==='murcielago') f+=pelota(cx+3,203,8.5);
    if(o.gag==='penal') f+=pelota(cx-lx-14,204,8)+'<ellipse cx="'+(cx-lx-14)+'" cy="212" rx="9" ry="2.5" fill="#fff"/>';
    if(o.gag==='corre'||o.gag==='caballo') f+=pelota(cx+lx+18,202,8);
    if(o.gag==='caño') f+='<g stroke="'+INK+'" stroke-width="2" stroke-linecap="round" opacity=".55"><path d="M'+(cx+14)+' 196h16M'+(cx+16)+' 202h22M'+(cx+14)+' 208h14"/></g>'+pelota(cx,203,7.5);
    // Tentáculos del Pulpo: salen de atrás de la camiseta, cada uno con su guante
    var tent=[];
    if(o.tentaculos){
      var TC='#cf6f8f', TS='#f6c1d0';
      [[-1,20,96],[-1,12,140],[-1,30,184],[1,180,96],[1,188,140],[1,170,184]].forEach(function(t,i){
        var sg=t[0], x0=cx+sg*(sw-10), y0=T+12+(i%3)*12, x1=t[1], y1=t[2], qx=(x0+x1)/2+sg*4, qy=Math.min(y0,y1)-24+(i%3)*16;
        var d='M'+n1(x0)+' '+n1(y0)+'Q'+n1(qx)+' '+n1(qy)+' '+x1+' '+y1;
        f+='<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="15" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+TC+'" stroke-width="10.5" stroke-linecap="round"/>';
        for(var u=.3;u<.9;u+=.15){var a=(1-u)*(1-u),b=2*(1-u)*u,cc=u*u; f+='<circle cx="'+n1(a*x0+b*qx+cc*x1)+'" cy="'+n1(a*y0+b*qy+cc*y1+2.5)+'" r="2" fill="'+TS+'" stroke="'+INK+'" stroke-width=".8"/>';}
        tent.push([x1,y1,sg*(30+(i%3)*25)]);
      });
    }
    f+=camiseta(k,cx,T,W,sw,wa,o);
    if(o.delantal){
      // Delantal de asador, bien manchado
      var ap='M'+(cx-12)+' '+(T+6)+'H'+(cx+12)+'V'+(T+20)+'H'+(cx+wa+2)+'L'+(cx+wa+5)+' '+(W+16)+'H'+(cx-wa-5)+'L'+(cx-wa-2)+' '+(T+20)+'H'+(cx-12)+'Z';
      f+='<path d="M'+(cx-12)+' '+(T+7)+'L'+(cx-nw)+' '+(T-2)+'M'+(cx+12)+' '+(T+7)+'L'+(cx+nw)+' '+(T-2)+'" stroke="#d8cfbd" stroke-width="3"/>';
      f+='<path d="'+ap+'" fill="#efe8da" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M'+(cx-wa-2)+' '+(T+22)+'h-7M'+(cx+wa+2)+' '+(T+22)+'h7" stroke="#d8cfbd" stroke-width="3" stroke-linecap="round"/>';
      f+='<rect x="'+(cx-9)+'" y="'+(T+30)+'" width="18" height="11" rx="2" fill="none" stroke="#c8bda8" stroke-width="1.6"/>';
      f+=[[cx-10,T+14,4,3,'#8a5a32',.55],[cx+9,T+36,4,6,'#a3442c',.5],[cx-13,W+4,7,3.4,'#6b4a2b',.45],[cx+12,W+9,3,2.4,'#8a5a32',.5],[cx-2,T+46,2.4,2,'#a3442c',.5]].map(function(m){return '<ellipse cx="'+m[0]+'" cy="'+m[1]+'" rx="'+m[2]+'" ry="'+m[3]+'" fill="'+m[4]+'" opacity="'+m[5]+'"/>';}).join('');
    }
    if(o.salvavidas){
      f+='<ellipse cx="'+cx+'" cy="'+(W-8)+'" rx="'+(sw+7)+'" ry="10" fill="none" stroke="'+INK+'" stroke-width="13"/><ellipse cx="'+cx+'" cy="'+(W-8)+'" rx="'+(sw+7)+'" ry="10" fill="none" stroke="#e8402f" stroke-width="9"/>'+
        '<ellipse cx="'+cx+'" cy="'+(W-8)+'" rx="'+(sw+7)+'" ry="10" fill="none" stroke="#fff" stroke-width="9" stroke-dasharray="11 11"/>';
    }
    if(o.faja) f+='<path d="M'+(cx-wa-2)+' '+(W-20)+'H'+(cx+wa+2)+'L'+(cx+wa+3)+' '+(W-4)+'H'+(cx-wa-3)+'Z" fill="#e6d3b0" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M'+(cx-wa+4)+' '+(W-16)+'v8M'+(cx-wa+10)+' '+(W-16)+'v8M'+(cx+wa-4)+' '+(W-16)+'v8M'+(cx+wa-10)+' '+(W-16)+'v8" stroke="#bfa57a" stroke-width="1.6"/><rect x="'+(cx-9)+'" y="'+(W-17)+'" width="18" height="10" rx="2" fill="#d4bf98" stroke="'+INK+'" stroke-width="1.4"/>';
    // cuello
    f+='<path d="M'+(cx-nw)+' '+(bot-16)+'V'+(T+5)+'Q'+cx+' '+(T+14)+' '+(cx+nw)+' '+(T+5)+'V'+(bot-16)+'Z" fill="'+piel[1]+'" stroke="'+INK+'" stroke-width="2.4"/>';
    f+='<path d="M'+(cx-nw-3)+' '+(T-1)+'L'+cx+' '+(T+11)+'L'+(cx+nw+3)+' '+(T-1)+'" fill="none" stroke="'+(k==='picardia'?INK:BANDA[k])+'" stroke-width="4" stroke-linejoin="round"/>';
    if(o.auriculares) f+='<path d="M'+(cx-nw-7)+' '+(T+3)+'Q'+cx+' '+(T+22)+' '+(cx+nw+7)+' '+(T+3)+'" fill="none" stroke="#2b2f37" stroke-width="4.5" stroke-linecap="round"/>'+[-1,1].map(function(sg){return '<ellipse cx="'+(cx+sg*(nw+8))+'" cy="'+(T+3)+'" rx="6.5" ry="8.5" fill="#2b2f37" stroke="'+INK+'" stroke-width="2"/><ellipse cx="'+(cx+sg*(nw+8))+'" cy="'+(T+3)+'" rx="3" ry="4.6" fill="#e04f9a"/>';}).join('');
    if(o.corbata) f+='<path d="M'+(cx-nw-3)+' '+(T-1)+'L'+(cx-4)+' '+(T+22)+'M'+(cx+nw+3)+' '+(T-1)+'L'+(cx+4)+' '+(T+22)+'" stroke="#f4f1ea" stroke-width="6"/><path d="M'+(cx-4)+' '+(T+5)+'L'+(cx+4)+' '+(T+5)+'L'+(cx+6)+' '+(T+34)+'L'+cx+' '+(T+40)+'L'+(cx-6)+' '+(T+34)+'Z" fill="'+o.corbata+'" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/>';
    if(o.silbato) f+='<path d="M'+(cx-nw)+' '+(T+2)+'L'+(cx+2)+' '+(T+22)+'L'+(cx+nw)+' '+(T+2)+'" fill="none" stroke="#e2bd57" stroke-width="1.6"/><g transform="translate('+(cx+4)+' '+(T+25)+') rotate(-15)"><rect x="-7" y="-4" width="14" height="8" rx="3" fill="#e2bd57" stroke="'+INK+'" stroke-width="1.6"/><circle cx="-2" cy="0" r="1.6" fill="'+INK+'"/></g>';
    if(o.mono) f+='<g transform="translate('+cx+' '+(T+8)+')"><path d="M0 0L-14-8V8ZM0 0L14-8V8Z" fill="#d4692a" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><rect x="-4" y="-4.5" width="8" height="9" rx="2" fill="#b8541f" stroke="'+INK+'" stroke-width="2"/></g>';
    if(o.gag==='pulpo') f+='<g fill="rgba(220,235,245,.7)" stroke="'+INK+'" stroke-width="2"><circle cx="'+(cx-7)+'" cy="'+(T+16)+'" r="5.5"/><circle cx="'+(cx+7)+'" cy="'+(T+16)+'" r="5.5"/></g><path d="M'+(cx-1.5)+' '+(T+16)+'h3M'+(cx-12.5)+' '+(T+15)+'l-5-6M'+(cx+12.5)+' '+(T+15)+'l5-6" stroke="'+INK+'" stroke-width="2"/>';
    // cosas sobre la camiseta
    if(o.gag==='patadas') f+='<g transform="translate('+(cx-sw*.42)+' '+n1(T+h*.74)+') rotate(-25)" opacity=".45"><path d="M-5-11C2-12 6-6 5 0C4 8 2 12-2 12C-6 12-7 6-7 0C-7-6-8-10-5-11Z" fill="'+INK+'"/></g><g fill="'+C[k].fondo+'" opacity=".9" transform="translate('+(cx-sw*.42)+' '+n1(T+h*.74)+') rotate(-25)"><circle cx="-2" cy="-7" r="1.3"/><circle cx="2" cy="-5" r="1.3"/><circle cx="-3" cy="2" r="1.3"/><circle cx="1" cy="8" r="1.3"/></g>';
    if(o.gag==='ciego') f+='<g fill="rgba(220,235,245,.7)" stroke="'+INK+'" stroke-width="2"><circle cx="'+(cx-7)+'" cy="'+(T+16)+'" r="5.5"/><circle cx="'+(cx+7)+'" cy="'+(T+16)+'" r="5.5"/></g><path d="M'+(cx-1.5)+' '+(T+16)+'h3M'+(cx-12.5)+' '+(T+15)+'l-5-6M'+(cx+12.5)+' '+(T+15)+'l5-6" stroke="'+INK+'" stroke-width="2"/>';
    if(o.gag==='fichaje') f+='<path d="M'+(cx-nw)+' '+(T+2)+'L'+(cx+2)+' '+(T+22)+'L'+(cx+nw)+' '+(T+2)+'" fill="none" stroke="#e8e2d4" stroke-width="1.6"/><g transform="translate('+(cx+4)+' '+(T+25)+') rotate(-15)"><rect x="-7" y="-4" width="14" height="8" rx="3" fill="#c7ccd1" stroke="'+INK+'" stroke-width="1.6"/><circle cx="-2" cy="0" r="1.6" fill="'+INK+'"/></g>'+
      '<path d="M'+(cx+sw-10)+' '+(T+8)+'L'+(cx+sw-6)+' '+(T+22)+'" stroke="'+INK+'" stroke-width="1.2"/><g transform="translate('+(cx+sw-5)+' '+(T+29)+') rotate(12)"><path d="M-12-7H9L13 0L9 7H-12Z" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.6"/><circle cx="8" cy="0" r="1.5" fill="'+INK+'"/><text x="-2" y="3" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="8" fill="#b23f3c">$$$</text></g>';
    if(o.gag==='papai'){
      f+='<path d="M'+(cx-sw+8)+' '+(T)+'L'+(cx-14)+' '+(T+22)+'M'+(cx+sw-8)+' '+(T)+'L'+(cx+14)+' '+(T+22)+'" stroke="#3d5a4a" stroke-width="5"/>';
      f+='<rect x="'+(cx-18)+'" y="'+(T+16)+'" width="36" height="'+Math.min(30,h-6)+'" rx="10" fill="#5d7d6a" stroke="'+INK+'" stroke-width="2.4"/>';
      f+='<circle cx="'+cx+'" cy="'+(T+14)+'" r="12" fill="#f4d0ae" stroke="'+INK+'" stroke-width="2.4"/><path d="M'+(cx-3)+' '+(T+3)+'q4-5 6 1" fill="none" stroke="'+INK+'" stroke-width="1.8"/><path d="M'+(cx-7)+' '+(T+13)+'q2.5 2 5 0M'+(cx+2)+' '+(T+13)+'q2.5 2 5 0" fill="none" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/><circle cx="'+cx+'" cy="'+(T+20)+'" r="3.5" fill="#7fc4e8" stroke="'+INK+'" stroke-width="1.4"/><ellipse cx="'+(cx-8)+'" cy="'+(T+17)+'" rx="3" ry="2" fill="#ee7d68" opacity=".45"/><ellipse cx="'+(cx+8)+'" cy="'+(T+17)+'" rx="3" ry="2" fill="#ee7d68" opacity=".45"/>';
    }
    if(o.gag==='cronista') f+='<path d="M'+(cx-nw-2)+' '+(T-2)+'Q'+(cx-sw-6)+' '+(T-2)+' '+(cx-sw-4)+' '+(T+12)+'L'+(cx-sw+2)+' '+(T+40)+'H'+(cx-sw+16)+'L'+(cx-nw+2)+' '+(T+8)+'Z" fill="#a8222a" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><path d="M'+(cx-sw-3)+' '+(T+20)+'L'+(cx-nw-1)+' '+(T+14)+'M'+(cx-sw-1)+' '+(T+28)+'L'+(cx-sw+11)+' '+(T+24)+'" stroke="'+INK+'" stroke-width="3"/><path d="M'+(cx-sw+3)+' '+(T+40)+'v5M'+(cx-sw+7)+' '+(T+40)+'v5M'+(cx-sw+11)+' '+(T+40)+'v5M'+(cx-sw+15)+' '+(T+40)+'v5" stroke="#a8222a" stroke-width="1.6"/>';

    // ---- cabeza ----
    var s='', ey=cy+(o.ojoY||4);
    [-1,1].forEach(function(sg){var ox=cx+sg*(w-1);s+='<ellipse cx="'+ox+'" cy="'+(ey+4)+'" rx="9" ry="12.5" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.8"/><path d="M'+(ox+sg*3)+' '+(ey-2)+'q'+(sg*4)+' 6 0 12" fill="none" stroke="'+piel[1]+'" stroke-width="2.4" stroke-linecap="round"/>';});
    var cab='M'+(cx-w)+' '+(cy-8)+'C'+(cx-w)+' '+(top-6)+' '+(cx+w)+' '+(top-6)+' '+(cx+w)+' '+(cy-8)+'C'+(cx+w)+' '+n1(cy+hh*.45)+' '+(cx+j)+' '+(bot-4)+' '+cx+' '+bot+'C'+(cx-j)+' '+(bot-4)+' '+(cx-w)+' '+n1(cy+hh*.45)+' '+(cx-w)+' '+(cy-8)+'Z';
    var cid=U('cab');
    s+='<defs><clipPath id="'+cid+'"><path d="'+cab+'"/></clipPath></defs><path d="'+cab+'" fill="'+piel[0]+'"/>';
    if(sil){
      s+='<path d="'+cab+'" fill="none" stroke="'+INK+'" stroke-width="3.2"/><text x="'+cx+'" y="'+(cy+20)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="54" fill="'+CREMA+'">?</text>';
    } else {
      s+='<g clip-path="url(#'+cid+')"><ellipse cx="'+(cx+w*.95)+'" cy="'+(cy+12)+'" rx="'+(w*.62)+'" ry="'+(hh*1.3)+'" fill="'+piel[1]+'" opacity=".6"/><ellipse cx="'+(cx-w*.35)+'" cy="'+(cy-6)+'" rx="'+(w*.35)+'" ry="'+(hh*.4)+'" fill="#fff" opacity=".18"/></g>';
      if(o.pintura) s+='<g clip-path="url(#'+cid+')"><path d="M'+(cx-w-4)+' '+(ey-15)+'L'+(cx+w+4)+' '+(ey-23)+'L'+(cx+w+4)+' '+(ey+7)+'L'+(cx-w-4)+' '+(ey+14)+'Z" fill="#3d6cc4" opacity=".82"/></g>';
      var my=ey+(o.bocaY||30), L=o.largoBarba||0;
      function barba(op,largo){
        var p='M'+(cx-w+1)+' '+(cy-6)+'C'+(cx-w)+' '+(bot+largo*.6)+' '+(cx-j-6)+' '+(bot+largo)+' '+cx+' '+(bot+largo)+'C'+(cx+j+6)+' '+(bot+largo)+' '+(cx+w)+' '+(bot+largo*.6)+' '+(cx+w-1)+' '+(cy-6)+
          'L'+(cx+w-7)+' '+(cy+4)+'C'+(cx+w-12)+' '+(my+2)+' '+(cx+20)+' '+(my-12)+' '+cx+' '+(my-12)+'C'+(cx-20)+' '+(my-12)+' '+(cx-w+12)+' '+(my+2)+' '+(cx-w+7)+' '+(cy+4)+'Z';
        return '<path d="'+p+'" fill="'+pb+'" opacity="'+op+'"/>';
      }
      if(o.barba==='sombra'||o.sombra) s+='<g clip-path="url(#'+cid+')">'+barba(.28,0)+'</g>';
      if(o.barba==='corta'){ s+=barba(1,L||5)+'<path d="M'+(cx-w+3)+' '+(cy+8)+'C'+(cx-w+4)+' '+(bot+3)+' '+(cx-j)+' '+(bot+(L||5))+' '+cx+' '+(bot+(L||5))+'" fill="none" stroke="'+INK+'" stroke-width="2" opacity=".35"/>';}
      if(o.barba==='llena'){
        s+=barba(1,L||14);
        for(var q=-3;q<=3;q++){s+='<circle cx="'+(cx+q*j/3.3)+'" cy="'+(bot+(L||14)-3-Math.abs(q)*3)+'" r="9" fill="'+pb+'"/>';}
        s+='<g fill="none" stroke="#000" stroke-width="1.6" opacity=".22" stroke-linecap="round">'+[-24,-12,0,12,24].map(function(dx){return '<path d="M'+(cx+dx)+' '+(bot-6)+'q2 8 0 16"/>';}).join('')+'</g>';
      }
      if(o.barba==='candado') s+='<path d="M'+(cx-12)+' '+(bot-12)+'Q'+cx+' '+(bot+10)+' '+(cx+12)+' '+(bot-12)+'Q'+cx+' '+(bot-5)+' '+(cx-12)+' '+(bot-12)+'Z" fill="'+pb+'" stroke="'+INK+'" stroke-width="1.6"/>';
      s+='<path d="'+cab+'" fill="none" stroke="'+INK+'" stroke-width="3.2"/>';
      if(o.barba==='llena'||o.barba==='corta') s+='<path d="M'+(cx-w+1)+' '+(cy-6)+'v12M'+(cx+w-1)+' '+(cy-6)+'v12" stroke="'+pb+'" stroke-width="7"/>';
      if(o.surcos) s+='<path d="M'+(cx-5)+' '+(bot-10)+'v7M'+(cx+5)+' '+(bot-10)+'v7M'+(cx-11)+' '+(bot-12)+'v6M'+(cx+11)+' '+(bot-12)+'v6" stroke="'+piel[1]+'" stroke-width="2.2" stroke-linecap="round"/>';
      if(o.cachetes) s+='<ellipse cx="'+(cx-w*.6)+'" cy="'+(ey+16)+'" rx="10" ry="6" fill="#e8574a" opacity=".35"/><ellipse cx="'+(cx+w*.6)+'" cy="'+(ey+16)+'" rx="10" ry="6" fill="#e8574a" opacity=".35"/>';
      // ojos
      var ex=w*.42, er=o.ojo||7;
      [-1,1].forEach(function(sg){
        var x=cx+sg*ex;
        if(o.ojos==='ciego'){
          s+='<path d="M'+(x-er-2)+' '+(ey+1)+'Q'+x+' '+(ey-3)+' '+(x+er+2)+' '+(ey+1)+'" fill="none" stroke="'+INK+'" stroke-width="3.4" stroke-linecap="round"/><path d="M'+(x+sg*(er+3))+' '+(ey-3)+'l'+(sg*5)+' -3M'+(x+sg*(er+3))+' '+(ey+3)+'l'+(sg*5)+' 2" stroke="'+INK+'" stroke-width="1.8" stroke-linecap="round"/>';
        } else if(o.ojos==='felices'||(o.ojos==='guino'&&sg===1)){
          s+='<path d="M'+(x-er)+' '+(ey+1)+'Q'+x+' '+(ey-er*1.1)+' '+(x+er)+' '+(ey+1)+'" fill="none" stroke="'+INK+'" stroke-width="3.2" stroke-linecap="round"/>';
        } else {
          var px=o.ojos==='bizco'?x-sg*er*.42:x+(o.mira||0)*er*.3, py=ey+(o.ojos==='bizco'?er*.32:er*.12);
          s+='<ellipse cx="'+x+'" cy="'+ey+'" rx="'+er+'" ry="'+n1(er*.86)+'" fill="#fff" stroke="'+INK+'" stroke-width="2.4"/>'+
            (o.iris?'<circle cx="'+n1(px)+'" cy="'+n1(py)+'" r="'+n1(er*.64)+'" fill="'+o.iris+'" stroke="'+INK+'" stroke-width="1.2"/>'+(o.irisMiel?'<path d="M'+n1(px)+' '+n1(py)+'L'+n1(px+er*.1)+' '+n1(py+er*.58)+'A'+n1(er*.58)+' '+n1(er*.58)+' 0 0 0 '+n1(px+er*.58)+' '+n1(py+er*.1)+'Z" fill="'+o.irisMiel+'"/>':'')+'<circle cx="'+n1(px)+'" cy="'+n1(py)+'" r="'+n1(er*.3)+'" fill="'+INK+'"/>':'<circle cx="'+n1(px)+'" cy="'+n1(py)+'" r="'+n1(er*.55)+'" fill="'+INK+'"/>')+'<circle cx="'+n1(px+er*.22)+'" cy="'+n1(py-er*.28)+'" r="'+n1(er*.2)+'" fill="#fff"/>';
          if(o.ojos==='dormidos') s+='<path d="M'+(x-er-1)+' '+ey+'Q'+x+' '+(ey-er*1.3)+' '+(x+er+1)+' '+ey+'Z" fill="'+piel[1]+'" stroke="'+INK+'" stroke-width="2.4"/>';
          else s+='<path d="M'+(x-er-1)+' '+(ey-1)+'Q'+x+' '+(ey-er*1.15)+' '+(x+er+1)+' '+(ey-1)+'" fill="none" stroke="'+INK+'" stroke-width="3.2" stroke-linecap="round"/>';
        }
        var alto2=o.cejaAlta||0, xi=x-sg*(er+3), xo=x+sg*(er+3);
        s+='<path class="an-ceja" d="M'+n1(xi)+' '+n1(ey-er-4-alto2+(o.cejaEnojo||0))+'Q'+x+' '+n1(ey-er-10-alto2)+' '+n1(xo)+' '+n1(ey-er-5-alto2-(o.cejaEnojo||0)*.4)+'" fill="none" stroke="'+(o.extra==='disfraz'?INK:pelo)+'" stroke-width="'+(o.ceja||3.5)+'" stroke-linecap="round"/>';
      });
      // nariz
      var ns=o.nariz||1.2;
      if(o.gallo){ // el pico y la barbilla
        s+='<path d="M'+(cx-5)+' '+(ey+24)+'C'+(cx-8)+' '+(ey+36)+' '+(cx+8)+' '+(ey+36)+' '+(cx+5)+' '+(ey+24)+'Z" fill="#d6382e" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>';
        s+='<path d="M'+(cx-13)+' '+(ey+9)+'Q'+cx+' '+(ey+3)+' '+(cx+13)+' '+(ey+9)+'L'+cx+' '+(ey+29)+'Z" fill="#f0a52b" stroke="'+INK+'" stroke-width="2.6" stroke-linejoin="round"/><path d="M'+(cx-12.4)+' '+(ey+10.5)+'Q'+cx+' '+(ey+15)+' '+(cx+12.4)+' '+(ey+10.5)+'" fill="none" stroke="'+INK+'" stroke-width="1.8"/>';
      } else {
      s+='<path d="M'+(cx-2)+' '+(ey+2)+'Q'+n1(cx-4*ns)+' '+n1(ey+10*ns)+' '+n1(cx-3*ns)+' '+n1(ey+13*ns)+'" fill="none" stroke="'+piel[1]+'" stroke-width="2.4" stroke-linecap="round"/>';
      s+='<ellipse cx="'+cx+'" cy="'+n1(ey+16*ns)+'" rx="'+n1(7.5*ns)+'" ry="'+n1(6.2*ns)+'" fill="'+(o.narizColor||(o.extra==='disfraz'?'#ef9a86':(o.cachetes?'#f0a48e':piel[0])))+'" stroke="'+INK+'" stroke-width="2.4"/>'+
        '<ellipse cx="'+n1(cx-2.4*ns)+'" cy="'+n1(ey+14*ns)+'" rx="'+n1(2.2*ns)+'" ry="'+n1(1.5*ns)+'" fill="#fff" opacity=".5"/>';
      }
      if(o.bigote==='fino') s+=[-1,1].map(function(sg){return '<path d="M'+cx+' '+(my-7)+'C'+(cx+sg*8)+' '+(my-12)+' '+(cx+sg*18)+' '+(my-7)+' '+(cx+sg*23)+' '+(my-15)+'C'+(cx+sg*25)+' '+(my-5)+' '+(cx+sg*12)+' '+(my-3)+' '+cx+' '+(my-4)+'Z" fill="'+pb+'" stroke="'+INK+'" stroke-width="1.6" stroke-linejoin="round"/>';}).join('');
      if(o.bigote==='grueso') s+='<path d="M'+(cx-22)+' '+(my-1)+'C'+(cx-20)+' '+(my-15)+' '+(cx-6)+' '+(my-14)+' '+cx+' '+(my-9)+'C'+(cx+6)+' '+(my-14)+' '+(cx+20)+' '+(my-15)+' '+(cx+22)+' '+(my-1)+'C'+(cx+12)+' '+(my-6)+' '+(cx-12)+' '+(my-6)+' '+(cx-22)+' '+(my-1)+'Z" fill="'+(o.extra==='disfraz'?INK:pb)+'" stroke="'+INK+'" stroke-width="2"/>';
      // boca
      var mw=o.boca||13;
      if(o.sinBoca){
        // v15: la boca queda escondida en la barba
      } else if(o.gesto==='grin'){
        var mid=U('bo');
        var bp='M'+(cx-mw)+' '+my+'Q'+cx+' '+(my-3)+' '+(cx+mw)+' '+my+'Q'+(cx+mw*.8)+' '+(my+mw*1.25)+' '+cx+' '+(my+mw*1.3)+'Q'+(cx-mw*.8)+' '+(my+mw*1.25)+' '+(cx-mw)+' '+my+'Z';
        s+='<defs><clipPath id="'+mid+'"><path d="'+bp+'"/></clipPath></defs><path d="'+bp+'" fill="#6b2219"/><g clip-path="url(#'+mid+')"><rect x="'+(cx-mw)+'" y="'+(my-4)+'" width="'+(mw*2)+'" height="'+(mw*.48+4)+'" fill="#fff"/>'+
          '<path d="M'+(cx-mw*.5)+' '+(my-4)+'v'+(mw*.52+3)+'M'+cx+' '+(my-4)+'v'+(mw*.52+4)+'M'+(cx+mw*.5)+' '+(my-4)+'v'+(mw*.52+3)+'" stroke="#d8d0c4" stroke-width="1.4"/><ellipse cx="'+cx+'" cy="'+(my+mw*1.25)+'" rx="'+(mw*.6)+'" ry="'+(mw*.42)+'" fill="#e0675a"/></g><path d="'+bp+'" fill="none" stroke="'+INK+'" stroke-width="2.8" stroke-linejoin="round"/>';
        if(!o.cachetes) s+='<ellipse cx="'+(cx-w*.62)+'" cy="'+(my-6)+'" rx="8" ry="5" fill="#ee7d68" opacity=".3"/><ellipse cx="'+(cx+w*.62)+'" cy="'+(my-6)+'" rx="8" ry="5" fill="#ee7d68" opacity=".3"/>';
      } else if(o.gesto==='paletas'){
        // Boca grande con las dos paletas bien marcadas
        var mid=U('bo');
        var bp='M'+(cx-mw)+' '+my+'Q'+cx+' '+(my-3)+' '+(cx+mw)+' '+my+'Q'+(cx+mw*.8)+' '+(my+mw*1.1)+' '+cx+' '+(my+mw*1.15)+'Q'+(cx-mw*.8)+' '+(my+mw*1.1)+' '+(cx-mw)+' '+my+'Z';
        s+='<defs><clipPath id="'+mid+'"><path d="'+bp+'"/></clipPath></defs><path d="'+bp+'" fill="#6b2219"/><g clip-path="url(#'+mid+')"><ellipse cx="'+cx+'" cy="'+n1(my+mw*1.1)+'" rx="'+n1(mw*.6)+'" ry="'+n1(mw*.4)+'" fill="#e0675a"/></g>';
        [-1,1].forEach(function(sg){var x0=cx+sg*mw*.44; s+='<path d="M'+n1(x0)+' '+(my-2.5)+'V'+n1(my+mw*.6)+'Q'+n1((x0+cx)/2)+' '+n1(my+mw*.74)+' '+cx+' '+n1(my+mw*.6)+'V'+(my-2.5)+'Z" fill="#fff" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/>';});
        s+='<path d="'+bp+'" fill="none" stroke="'+INK+'" stroke-width="2.8" stroke-linejoin="round"/>';
      } else if(o.gesto==='grita'){
        s+='<ellipse cx="'+cx+'" cy="'+(my+mw*.5)+'" rx="'+mw+'" ry="'+n1(mw*.85)+'" fill="#6b2219" stroke="'+INK+'" stroke-width="2.8"/><ellipse cx="'+cx+'" cy="'+n1(my+mw*.95)+'" rx="'+n1(mw*.55)+'" ry="'+n1(mw*.3)+'" fill="#e0675a"/><rect x="'+n1(cx-mw*.6)+'" y="'+n1(my-mw*.3)+'" width="'+n1(mw*1.2)+'" height="'+n1(mw*.3)+'" rx="1" fill="#fff"/>';
      } else if(o.gesto==='sonrisa'){
        s+='<path d="M'+(cx-mw)+' '+(my-2)+'Q'+cx+' '+(my+mw*.75)+' '+(cx+mw)+' '+(my-2)+'" fill="none" stroke="'+INK+'" stroke-width="3.2" stroke-linecap="round"/><path d="M'+(cx-mw-2)+' '+(my-4)+'l3 3M'+(cx+mw+2)+' '+(my-4)+'l-3 3" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round"/>';
      } else if(o.gesto==='canchero'){
        s+='<path d="M'+(cx-mw)+' '+(my+1)+'Q'+(cx-2)+' '+(my+5)+' '+(cx+mw)+' '+(my-5)+'" fill="none" stroke="'+INK+'" stroke-width="3.2" stroke-linecap="round"/>';
      } else if(!o.gallo){
        s+='<path d="M'+(cx-mw*.8)+' '+(my+1)+'Q'+cx+' '+(my+(o.gesto==='firme'?-1:3))+' '+(cx+mw*.8)+' '+(my+1)+'" fill="none" stroke="#7a3a2c" stroke-width="3.4" stroke-linecap="round"/>';
      }
      if(o.lengua) s+='<g transform="'+(o.lenguaC?'translate('+cx+' '+n1(my+mw*.92)+')':'translate('+(cx+mw-3)+' '+(my+1)+') rotate(-25)')+'"><path d="M-5 0Q-6 11 0 12Q6 11 5 0Z" fill="#e0675a" stroke="'+INK+'" stroke-width="2"/><path d="M0 2v6" stroke="#b8453a" stroke-width="1.3"/></g>';
      if(o.barbijo) s+='<path d="M'+(cx-j+1)+' '+(bot-12)+'L'+(cx-w+3)+' '+(ey+4)+'M'+(cx+j-1)+' '+(bot-12)+'L'+(cx+w-3)+' '+(ey+4)+'" stroke="#f6f3ee" stroke-width="2.2"/><path d="M'+(cx-j+1)+' '+(bot-12)+'Q'+cx+' '+(bot-16)+' '+(cx+j-1)+' '+(bot-12)+'L'+(cx+j-5)+' '+(bot+7)+'Q'+cx+' '+(bot+11)+' '+(cx-j+5)+' '+(bot+7)+'Z" fill="#9fd0e6" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><path d="M'+(cx-j+4)+' '+(bot-6)+'H'+(cx+j-4)+'M'+(cx-j+5)+' '+bot+'H'+(cx+j-5)+'" stroke="#6aa8c4" stroke-width="1.4"/>';
      if(o.anteojos||o.lentes){
        var red=o.anteojos==='redondos', gl2=o.lentes?'#1d1d24':'rgba(255,255,255,.18)';
        [-1,1].forEach(function(sg){var x=cx+sg*ex;
          s+=red?'<circle cx="'+x+'" cy="'+ey+'" r="'+(er+5)+'" fill="'+gl2+'" stroke="'+INK+'" stroke-width="3"/>':'<rect x="'+(x-er-6)+'" y="'+(ey-er-3)+'" width="'+(er*2+12)+'" height="'+(er*2+5)+'" rx="'+(o.lentes?6:3)+'" fill="'+gl2+'" stroke="'+INK+'" stroke-width="3"/>';
          if(o.lentes) s+='<path d="M'+(x-er+1)+' '+(ey-er+1)+'l6 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>';
        });
        s+='<path d="M'+(cx-ex+er+(red?5:6))+' '+(ey-1)+'Q'+cx+' '+(ey-6)+' '+(cx+ex-er-(red?5:6))+' '+(ey-1)+'M'+(cx-ex-er-5)+' '+(ey-2)+'L'+(cx-w)+' '+(ey-5)+'M'+(cx+ex+er+5)+' '+(ey-2)+'L'+(cx+w)+' '+(ey-5)+'" fill="none" stroke="'+INK+'" stroke-width="3"/>';
      }
      if(o.extra==='disfraz') s+='<g fill="rgba(255,255,255,.18)" stroke="'+INK+'" stroke-width="3.2"><circle cx="'+(cx-ex)+'" cy="'+ey+'" r="'+(er+6)+'"/><circle cx="'+(cx+ex)+'" cy="'+ey+'" r="'+(er+6)+'"/></g><path d="M'+(cx-ex+er+6)+' '+ey+'H'+(cx+ex-er-6)+'M'+(cx-ex-er-6)+' '+(ey-2)+'L'+(cx-w)+' '+(ey-6)+'M'+(cx+ex+er+6)+' '+(ey-2)+'L'+(cx+w)+' '+(ey-6)+'" stroke="'+INK+'" stroke-width="3.2"/>'+
        '<path d="M'+(cx+w-4)+' '+(ey+8)+'q5 7 0 11q-5-4 0-11z" fill="#9fd3f0" stroke="'+INK+'" stroke-width="1.4"/>';
      if(o.extra==='trebol') s+=trebol(cx+24,bot+(o.largoBarba||14)-12,.5,'#5f9a45')+'<circle cx="'+(cx+24)+'" cy="'+(bot+(o.largoBarba||14)-12)+'" r="2.2" fill="'+DORADO+'"/>';
      if(o.gag==='patadas') s+=curita(cx-w*.5,ey+20,-30)+curita(cx+w*.55,cy-hh*.35,20);
      // pelo y sombrero
      if(o.gorro){ s+=peloCostado(o,cx,yb,w,pelo)+gorro(cx,yb,w,o.gorroRot||0,k); }
      else if(o.casco){ s+=peloCostado(o,cx,yb+6,w,pelo)+casco(cx,yb,w); }
      else if(o.minero){ s+=peloCostado(o,cx,yb+6,w,pelo)+minero(cx,yb,w); }
      else s+=peloArriba(o,cx,cy,w,top,pelo);
      if(o.hachimaki) s+='<path d="M'+(cx-w-1)+' '+(top+25)+'l-15 5 4 7zM'+(cx-w-1)+' '+(top+28)+'l-10 13 7 0z" fill="#f6f3ee" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M'+(cx-w-1)+' '+(top+21)+'Q'+cx+' '+(top+11)+' '+(cx+w+1)+' '+(top+21)+'L'+(cx+w+1)+' '+(top+30)+'Q'+cx+' '+(top+20)+' '+(cx-w-1)+' '+(top+30)+'Z" fill="#f6f3ee" stroke="'+INK+'" stroke-width="2.2"/><circle cx="'+cx+'" cy="'+(top+20.5)+'" r="4" fill="#d8453a"/>';
      if(o.caballo) [-1,1].forEach(function(sg){var ox=cx+sg*w*.62, oy=yb-24; s+='<g transform="translate('+n1(ox)+' '+oy+') rotate('+(sg*14)+')"><path d="M-8 6Q-10-14 0-28Q10-14 8 6Z" fill="#8a5a34" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M-3.5 3Q-4-10 0-19Q4-10 3.5 3Z" fill="#e9a58f"/></g>';});
      if(o.antenas) [-1,1].forEach(function(sg){s+='<path d="M'+(cx+sg*10)+' '+(top+2)+'Q'+(cx+sg*14)+' '+(top-20)+' '+(cx+sg*28)+' '+(top-28)+'" fill="none" stroke="'+INK+'" stroke-width="2.8" stroke-linecap="round"/><circle cx="'+(cx+sg*28)+'" cy="'+(top-28)+'" r="5" fill="'+INK+'"/>';});
      if(o.aureola) s+='<ellipse cx="'+cx+'" cy="'+(top-26)+'" rx="'+n1(w*.7)+'" ry="8" fill="none" stroke="'+INK+'" stroke-width="7.5"/><ellipse cx="'+cx+'" cy="'+(top-26)+'" rx="'+n1(w*.7)+'" ry="8" fill="none" stroke="#f2c94c" stroke-width="4"/>';
      if(o.venda) s+='<path d="M'+(cx-w-1)+' '+(top+24)+'Q'+cx+' '+(top+14)+' '+(cx+w+1)+' '+(top+24)+'L'+(cx+w+1)+' '+(top+33)+'Q'+cx+' '+(top+23)+' '+(cx-w-1)+' '+(top+33)+'Z" fill="#f6f3ee" stroke="'+INK+'" stroke-width="2.4"/><ellipse cx="'+n1(cx+w*.42)+'" cy="'+(top+24)+'" rx="5" ry="3.4" fill="#d8453a" opacity=".85"/><path d="M'+(cx-w-1)+' '+(top+27)+'l-9-4 2 8zM'+(cx-w-1)+' '+(top+29)+'l-8 7 9 0z" fill="#f6f3ee" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/>';
      if(o.vapor){ s+='<g clip-path="url(#'+cid+')"><rect x="'+(cx-w)+'" y="'+top+'" width="'+(2*w)+'" height="'+(bot-top)+'" fill="#e8402f" opacity=".2"/></g>'; [-1,1].forEach(function(sg){var x=cx+sg*(w+14), y=ey-14; s+='<g fill="#fff" stroke="'+INK+'" stroke-width="1.8"><circle cx="'+x+'" cy="'+y+'" r="6"/><circle cx="'+(x+sg*7)+'" cy="'+(y-7)+'" r="7.5"/><circle cx="'+(x+sg*3)+'" cy="'+(y-16)+'" r="5"/></g>';}); }
      if(o.gag==='papai') s+='<path d="M'+(cx-w+1)+' '+(top+22)+'Q'+cx+' '+(top+8)+' '+(cx+w-1)+' '+(top+22)+'L'+(cx+w-1)+' '+(top+31)+'Q'+cx+' '+(top+17)+' '+(cx-w+1)+' '+(top+31)+'Z" fill="#2f9a4a" stroke="'+INK+'" stroke-width="2.2"/><path d="M'+(cx-w+3)+' '+(top+26.5)+'Q'+cx+' '+(top+12.5)+' '+(cx+w-3)+' '+(top+26.5)+'" fill="none" stroke="#f2c94c" stroke-width="2.4"/>';
      if(o.gag==='ciego') s+='<text x="'+(cx+w+16)+'" y="'+(cy-10)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="24" fill="'+INK+'">?</text><text x="'+(cx-w-14)+'" y="'+(cy+2)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="17" fill="'+INK+'" transform="rotate(-14 '+(cx-w-14)+' '+cy+')">?</text>';
      if(o.gag==='muralla') s+=pelota(cx-w*.45,top-12,9)+'<path d="M'+(cx-w*.45-14)+' '+(top-20)+'l-6-5M'+(cx-w*.45-16)+' '+(top-8)+'l-8 0M'+(cx-w*.45+12)+' '+(top-24)+'l4-7" stroke="'+INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    }
    // Las clases an-* no cambian el dibujo: las usa la versión digital para animar gestos. La lengua está oculta.
    if(!sil&&!o.barbijo) s+='<g class="an-len" opacity="0"><path d="M'+(cx-8)+' '+(my+2)+'q0 17 8 17q8 0 8-17z" fill="#e8574a" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><path d="M'+cx+' '+(my+5)+'v8" stroke="#a8322a" stroke-width="1.8" stroke-linecap="round"/></g>';
    f+='<g class="an-cab" style="transform-origin:'+cx+'px '+bot+'px">'+s+'</g>';

    // ---- brazos y poses ----
    var L0=[cx-sw+6,T+10], R0=[cx+sw-6,T+10], dL=[cx-sw-6,W-4], dR=[cx+sw+6,W-4];
    var gl=o.arquero?'guante':null, hr=o.arquero?(cu==='flaco'?12.5:10.5):Math.max(7,aw*.55+4.5);
    var ar=[[[L0,dL],gl,0],[[R0,dR],gl,0]], pre='', post='';
    switch(o.pose){
      case 'tantea': ar=[[[L0,[cx-sw-16,T+20],[cx-sw-30,T+6]],'guante',-60],[[R0,[cx+sw+16,T+16],[cx+sw+32,T]],'guante',65]]; break;
      case 'arriba': ar=[[[L0,[cx-w-4,T-4],[cx-w-16,cy-14]],'guante',-15],[[R0,[cx+w+4,T-4],[cx+w+16,cy-14]],'guante',15]]; break;
      case 'festeja': ar=[[[L0,[cx-w-4,T-4],[cx-w-16,cy-14]],'palma',-15],[[R0,[cx+w+4,T-4],[cx+w+16,cy-14]],'palma',15]]; break;
      case 'copa': // levantando la Copa: las manos la agarran de la base, arriba de la cabeza
        ar=[[[L0,[cx-w-12,cy-8],[cx-27,alto+2]],'palma',-20],[[R0,[cx+w+12,cy-8],[cx+27,alto+2]],'palma',20]];
        var cg=U('cg');
        pre+='<defs><linearGradient id="'+cg+'" x1="0" x2="1"><stop offset="0" stop-color="#a8761d"/><stop offset=".45" stop-color="#ffe27a"/><stop offset="1" stop-color="#b8862b"/></linearGradient></defs><g transform="translate('+(cx-48)+' '+(alto-126)+') scale(.8)"><path d="M28 16H6c0 32 10 48 30 52M92 16h22c0 32-10 48-30 52" fill="none" stroke="#8a6a25" stroke-width="7"/><path d="M26 8h68c2 44-8 72-34 82C34 80 24 52 26 8Z" fill="url(#'+cg+')" stroke="'+INK+'" stroke-width="3"/><path d="M38 16q-2 34 12 54" fill="none" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/><path d="M50 90h20l3 26H47Z" fill="url(#'+cg+')" stroke="'+INK+'" stroke-width="3"/><path d="M34 116h52l7 22H27Z" fill="url(#'+cg+')" stroke="'+INK+'" stroke-width="3"/><rect x="20" y="138" width="80" height="20" rx="3" fill="#22305a" stroke="'+INK+'" stroke-width="3"/><text x="60" y="153" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="13" fill="#ffe27a">PEXA</text><path d="M60 26l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="#fff8d6" stroke="'+INK+'" stroke-width="1.6"/></g>';
        break;
      case 'asador':
        ar=[[[L0,dL],'guante',0],[[R0,[cx+sw+16,T+20],[cx+sw+22,T+4]],null,0]];
        var hx=cx+sw+22, hy=T+4;
        pre+='<path d="M'+(hx-2)+' '+hy+'L'+(hx+8)+' '+(hy-44)+'M'+(hx+3)+' '+hy+'L'+(hx+12)+' '+(hy-42)+'" stroke="#8a9096" stroke-width="3" stroke-linecap="round"/>';
        post+='<g transform="translate('+(hx+10)+' '+(hy-50)+') rotate(-28)"><rect x="-15" y="-6.5" width="30" height="13" rx="6.5" fill="#a3442c" stroke="'+INK+'" stroke-width="2.2"/><path d="M-8-2h5M1 1h5M9-2h3" stroke="#e08a6a" stroke-width="1.8" stroke-linecap="round"/></g><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".75"><path d="M'+(hx+4)+' '+(hy-62)+'q-6-6 0-12t0-12"/><path d="M'+(hx+16)+' '+(hy-64)+'q-5-5 0-10t0-10"/></g>';
        break;
      case 'biceps': ar=[[[L0,[cx-sw-26,T+6],[cx-sw-30,T-22]],null,0],[[R0,[cx+sw+26,T+6],[cx+sw+30,T-22]],null,0]];
        post+=[-1,1].map(function(sg){return '<ellipse cx="'+(cx+sg*(sw+12))+'" cy="'+(T+3)+'" rx="12" ry="10" fill="'+piel[0]+'" stroke="'+INK+'" stroke-width="2.6"/><path d="M'+(cx+sg*(sw+1))+' '+(T+4)+'q'+(sg*6)+' -6 '+(sg*13)+' -3" fill="none" stroke="'+piel[1]+'" stroke-width="2"/>'+chispa(cx+sg*(sw+34),T-30,5);}).join('');
        break;
      case 'hombros': ar=[[[L0,[cx-sw-16,T+22],[cx-sw-26,T+8]],'palma',-35],[[R0,[cx+sw+16,T+22],[cx+sw+26,T+8]],'palma',35]]; break;
      case 'pelota': ar=[[[L0,[cx-sw-16,T+4],[cx-sw-18,T-20]],null,0],[[R0,[cx+sw+16,T+20],[cx+sw+2,T+40]],null,0]];
        pre+=pelota(cx+sw+6,T+28,14); post+=chispa(cx-36,192,6)+chispa(cx+34,182,5); break;
      case 'frota': ar=[[[L0,[cx-sw-8,T+28],[cx-7,T+30]],null,0],[[R0,[cx+sw+8,T+28],[cx+7,T+30]],null,0]];
        post+='<g fill="none" stroke="'+INK+'" stroke-width="2" stroke-linecap="round"><path d="M'+(cx-20)+' '+(T+44)+'q-4 4-8 2M'+(cx+20)+' '+(T+44)+'q4 4 8 2M'+(cx-6)+' '+(T+17)+'l-3-5M'+(cx+6)+' '+(T+17)+'l3-5"/></g>'; break;
      case 'oreja': ar=[[[L0,dL],null,0],[[R0,[cx+sw+18,T+4],[cx+w+12,ey+8]],'palma',-75]];
        post+='<g fill="none" stroke="'+INK+'" stroke-width="2.2" stroke-linecap="round"><path d="M'+(cx+w+26)+' '+(ey-4)+'q5 10 0 20"/><path d="M'+(cx+w+33)+' '+(ey-9)+'q8 15 0 30"/></g>'; break;
      case 'bebe': ar=[[[L0,[cx-sw-6,T+30],[cx-14,T+44]],null,0],[[R0,[cx+sw+6,T+30],[cx+14,T+44]],null,0]]; break;
      case 'cruzados': ar=[[[L0,[cx-sw-4,T+24],[cx+sw-4,T+22]],null,0],[[R0,[cx+sw+4,T+30],[cx-sw+4,T+30]],null,0]]; break;
      case 'señala': ar=[[[L0,dL],null,0],[[R0,[cx+sw+16,T],[cx+sw+20,T-26]],'dedo',0]]; break;
      case 'micro': ar=[[[L0,dL],'guante',0],[[R0,[cx+sw+16,T+20],[cx+22,T+6]],'guante',-25]];
        pre+='<path d="M'+(cx+22)+' '+(T+6)+'L'+(cx+14)+' '+(bot-14)+'" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/><rect x="'+(cx+15)+'" y="'+(bot-6)+'" width="13" height="10" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="1.6" transform="rotate(-20 '+(cx+21)+' '+(bot-1)+')"/><text x="'+(cx+21)+'" y="'+(bot+1.5)+'" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="6" fill="#b23f3c" transform="rotate(-20 '+(cx+21)+' '+(bot-1)+')">TV</text>';
        post+='<circle cx="'+(cx+13)+'" cy="'+(bot-17)+'" r="7" fill="#3a3f4a" stroke="'+INK+'" stroke-width="2"/><path d="M'+(cx+8)+' '+(bot-19)+'h10M'+(cx+8)+' '+(bot-15)+'h10M'+(cx+13)+' '+(bot-23)+'v12" stroke="#7d8591" stroke-width="1"/>'; break;
      case 'tarjeta': ar=[[[L0,dL],null,0],[[R0,[cx+sw+16,T],[cx+sw+20,T-24]],null,0]];
        post+='<g transform="translate('+(cx+sw+22)+' '+(T-50)+') rotate(12)"><rect x="-11" y="-16" width="22" height="30" rx="2.5" fill="#e3262b" stroke="'+INK+'" stroke-width="2.4"/><path d="M-6-11v18" stroke="#fff" stroke-width="2.4" opacity=".4"/></g><path d="M'+(cx+sw+40)+' '+(T-72)+'l6-6M'+(cx+sw+44)+' '+(T-56)+'l8-1M'+(cx+sw+6)+' '+(T-74)+'l-4-7" stroke="'+INK+'" stroke-width="2.2" stroke-linecap="round"/>'; break;
      case 'binoculares': ar=[[[L0,[cx-sw-8,T+14],[cx-ex,ey+20]],null,0],[[R0,[cx+sw+8,T+14],[cx+ex,ey+20]],null,0]];
        pre+=[-1,1].map(function(sg){var x=cx+sg*ex;return '<rect x="'+(x-er-5)+'" y="'+(ey-er-6)+'" width="'+(er*2+10)+'" height="'+(er*2+16)+'" rx="7" fill="#3a3f4a" stroke="'+INK+'" stroke-width="2.6"/><ellipse cx="'+x+'" cy="'+(ey-1)+'" rx="'+(er+2)+'" ry="'+(er+1)+'" fill="#7fb3d5" stroke="'+INK+'" stroke-width="2.2"/><path d="M'+(x-3)+' '+(ey-4)+'l4-2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>';}).join('')+'<rect x="'+(cx-ex+er+4)+'" y="'+(ey-3)+'" width="'+(2*ex-2*er-8)+'" height="9" fill="#2b2f37" stroke="'+INK+'" stroke-width="2"/>'; break;
      case 'corre': ar=[[[L0,[cx-sw-14,T+22],[cx-sw-2,T+36]],null,0],[[R0,[cx+sw+14,T+6],[cx+sw+24,T-10]],null,0]]; break;
      case 'valija': ar=[[[L0,[cx-sw-8,T+24],[cx-sw-10,W+4]],null,0],[[R0,[cx+sw+16,T+2],[cx+sw+22,T-20]],'palma',15]];
        pre+='<g transform="translate('+(cx-sw-10)+' '+(W+8)+')"><path d="M-7 0v-5q0-3 3-3h8q3 0 3 3v5" fill="none" stroke="'+INK+'" stroke-width="2.6"/><rect x="-20" y="0" width="40" height="28" rx="5" fill="#8a5a32" stroke="'+INK+'" stroke-width="2.6"/><path d="M-20 9h40" stroke="#5e3b1f" stroke-width="2"/><rect x="-15" y="13" width="11" height="9" rx="2" fill="#4f8fd6" transform="rotate(-10 -10 17)"/><rect x="3" y="12" width="12" height="9" rx="2" fill="#f2c94c" transform="rotate(8 9 16)"/></g>'; break;
      case 'herradura': ar=[[[L0,dL],'guante',0],[[R0,[cx+sw+16,T+2],[cx+sw+20,T-22]],'guante',10]];
        post+='<g transform="translate('+(cx+sw+20)+' '+(T-50)+')"><path d="M-13 10V-2a13 13 0 0 1 26 0V10h-7V-2a6 6 0 0 0-12 0V10z" fill="#aab3bb" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><g fill="'+INK+'"><circle cx="-9.5" cy="6" r="1.3"/><circle cx="-9.5" cy="0" r="1.3"/><circle cx="9.5" cy="6" r="1.3"/><circle cx="9.5" cy="0" r="1.3"/></g></g>'+chispa(cx+sw+40,T-62,6)+chispa(cx+sw+2,T-70,4.5)+chispa(cx+sw+42,T-34,4); break;
      case 'cartel': ar=[[[L0,dL],null,0],[[R0,[cx+sw+20,T+4],[cx+sw+26,T-14]],null,0]];
        pre+='<g transform="translate('+(cx+sw+28)+' '+(T-38)+')"><rect x="-27" y="-18" width="54" height="34" rx="4" fill="#22252b" stroke="'+INK+'" stroke-width="2.6"/><rect x="-23" y="-14" width="46" height="26" rx="2" fill="#111"/><text x="0" y="8" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="22" fill="#6ff07a">+5</text></g>'; break;
      case 'pizarra': ar=[[[L0,dL],null,0],[[R0,[cx+sw+20,T+4],[cx+sw+26,T-14]],null,0]];
        pre+='<g transform="translate('+(cx+sw+28)+' '+(T-40)+')"><rect x="-29" y="-21" width="58" height="40" rx="3" fill="#8a6a45" stroke="'+INK+'" stroke-width="2.6"/><rect x="-25" y="-17" width="50" height="32" fill="#2f5a46"/><g stroke="#f2ede2" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M-18-10l5 5M-13-10l-5 5M10 3l5 5M15 3l-5 5"/><circle cx="-5" cy="7" r="3.6"/><path d="M-14 0q8 12 16 5" stroke-dasharray="3 3"/><path d="M-4-8q12-6 18 2"/></g></g>'; break;
      case 'figuritas': ar=[[[L0,[cx-sw-16,T+4],[cx-sw-20,T-20]],null,0],[[R0,[cx+sw+16,T+4],[cx+sw+20,T-20]],null,0]];
        post+=[-1,1].map(function(sg){return '<g transform="translate('+(cx+sg*(sw+21))+' '+(T-42)+') rotate('+(sg*12)+')"><rect x="-12" y="-17" width="24" height="34" rx="2.5" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="2.2"/><rect x="-9" y="-14" width="18" height="21" fill="'+PILUSO+'"/><circle cx="0" cy="-6" r="5" fill="#f4d0ae" stroke="'+INK+'" stroke-width="1.2"/><path d="M-6 7q6-8 12 0" fill="#4f8fd6"/><path d="M-8 11h16M-6 14h12" stroke="'+INK+'" stroke-width="1.2"/></g>';}).join(''); break;
      case 'manodedios': ar=[[[L0,dL],null,0],[[R0,[cx+sw+14,T-4],[cx+sw+16,T-30]],'palma',0]];
        post+='<g stroke="#f2c94c" stroke-width="3.4" stroke-linecap="round">'+[0,45,90,135,180,225,270,315].map(function(a){var r=a*Math.PI/180, x0=cx+sw+16, y0=T-74;return '<path d="M'+n1(x0+19*Math.cos(r))+' '+n1(y0+19*Math.sin(r))+'L'+n1(x0+27*Math.cos(r))+' '+n1(y0+27*Math.sin(r))+'"/>';}).join('')+'</g>'+tokV(cx+sw+16,T-74,15); break;
      case 'trofeo': ar=[[[L0,dL],null,0],[[R0,[cx+sw+16,T],[cx+sw+18,T-24]],null,0]];
        var tx=cx+sw+18, ty=T-30;
        post+='<g transform="translate('+tx+' '+ty+')"><path d="M-14-30h28v6c0 11-6 17-14 18-8-1-14-7-14-18z" fill="#e2bd57" stroke="'+INK+'" stroke-width="2.4"/><path d="M-14-25c-8 0-9 11 0 12M14-25c8 0 9 11 0 12" fill="none" stroke="'+INK+'" stroke-width="2.2"/><rect x="-4" y="-7" width="8" height="7" fill="#c79d3d" stroke="'+INK+'" stroke-width="2"/><path d="M-9-27c0 8 2 13 5 16" fill="none" stroke="#fff" stroke-width="2.2" opacity=".6"/></g>'+
          '<g transform="translate('+tx+' '+(ty+4)+')"><rect x="-25" y="-5" width="50" height="11" rx="2" fill="#8a6a45" stroke="'+INK+'" stroke-width="1.8"/><text x="0" y="3" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="6.6" fill="#f2c94c">PRETEMPORADA</text></g>';
        break;
      case 'camara': ar=[[[L0,[cx-sw-8,T+26],[cx-17,T+30]],null,0],[[R0,[cx+sw+8,T+26],[cx+17,T+30]],null,0]];
        pre+='<path d="M'+(cx-nw-2)+' '+T+'L'+(cx-15)+' '+(T+22)+'M'+(cx+nw+2)+' '+T+'L'+(cx+15)+' '+(T+22)+'" stroke="#2b2f37" stroke-width="2.6"/>'+
          '<g transform="translate('+cx+' '+(T+29)+')"><rect x="-14" y="-18" width="11" height="7" rx="1.5" fill="#2b2f37" stroke="'+INK+'" stroke-width="2"/><rect x="-21" y="-12" width="42" height="26" rx="4" fill="#2b2f37" stroke="'+INK+'" stroke-width="2.4"/><circle r="9.5" fill="#555b66" stroke="'+INK+'" stroke-width="2.2"/><circle r="5.8" fill="#7fb3d5" stroke="'+INK+'" stroke-width="1.6"/><path d="M-2.5-2.5l3.5-1.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><rect x="12" y="-9" width="6" height="4" rx="1" fill="#f2c94c"/></g>'; break;
      case 'jeringa': ar=[[[L0,dL],null,0],[[R0,[cx+sw+16,T+2],[cx+sw+20,T-22]],null,0]];
        pre+='<g transform="translate('+(cx+sw+20)+' '+(T-22)+') rotate(16)"><path d="M0 8v10" stroke="'+INK+'" stroke-width="3"/><rect x="-7" y="17" width="14" height="4" rx="2" fill="#c7ccd1" stroke="'+INK+'" stroke-width="1.6"/>'+
          '<rect x="-6.5" y="-36" width="13" height="44" rx="2" fill="#eef6f9" stroke="'+INK+'" stroke-width="2.2"/><rect x="-5" y="-32" width="10" height="22" fill="#8fd6c0" opacity=".85"/><path d="M-6.5-28h4M-6.5-22h4M-6.5-16h4M-6.5-10h4" stroke="'+INK+'" stroke-width="1.1"/>'+
          '<rect x="-10" y="4" width="20" height="4" rx="1.5" fill="#c7ccd1" stroke="'+INK+'" stroke-width="1.6"/><path d="M0-36v-16" stroke="#8a9096" stroke-width="2"/><circle cx="0" cy="-56" r="2.2" fill="#8fd6c0" stroke="'+INK+'" stroke-width=".8"/></g>'; break;
      case 'espada': ar=[[[L0,[cx-sw-14,T+20],[cx-sw-4,T+38]],null,0],[[R0,[cx+sw+14,T-2],[cx+sw+18,T-26]],null,0]];
        pre+=pelota(cx-sw-12,T+44,13);
        pre+='<g transform="translate('+(cx+sw+18)+' '+(T-26)+') rotate(14)"><path d="M-3.5-6V-60L0-68L3.5-60V-6Z" fill="#dfe4e8" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/><path d="M0-10V-60" stroke="#fff" stroke-width="1.3" opacity=".8"/>'+
          '<rect x="-3" y="-6" width="6" height="15" rx="1.5" fill="#5e3b1f" stroke="'+INK+'" stroke-width="1.4"/><path d="M-15-6Q0-13 15-6" fill="none" stroke="'+INK+'" stroke-width="6.5" stroke-linecap="round"/><path d="M-15-6Q0-13 15-6" fill="none" stroke="#c9a24a" stroke-width="3.5" stroke-linecap="round"/><circle cx="0" cy="11" r="3.6" fill="#c9a24a" stroke="'+INK+'" stroke-width="1.4"/></g>'; break;
      case 'chasquido': var hx2=cx+w+18, hy2=T-18; ar=[[[L0,dL],null,0],[[R0,[cx+sw+22,T+2],[hx2,hy2]],null,0]];
        pre+='<g transform="translate('+hx2+' '+hy2+')"><rect x="-8" y="6" width="16" height="7" rx="2" fill="#e2bd57" stroke="'+INK+'" stroke-width="1.8"/><circle cx="-4" cy="9.5" r="1.6" fill="#5b8de0"/><circle cx="0" cy="9.5" r="1.6" fill="#e04f4f"/><circle cx="4" cy="9.5" r="1.6" fill="#6fbf5a"/></g>';
        post+='<g stroke="'+INK+'" stroke-width="2.2" stroke-linecap="round"><path d="M'+(hx2-14)+' '+(hy2-12)+'l-6-6M'+(hx2)+' '+(hy2-16)+'v-8M'+(hx2+14)+' '+(hy2-12)+'l6-6"/></g><text x="'+(hx2-4)+'" y="'+(hy2-26)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="13" fill="'+INK+'">¡CHAS!</text>'; break;
      case 'hacha': ar=[[[L0,dL],null,0],[[R0,[cx+sw+20,T+6],[cx+sw+26,T-16]],null,0]];
        post+='<g transform="translate('+(cx+sw+26)+' '+(T-16)+') rotate(-12)"><rect x="-3.5" y="-50" width="7" height="66" rx="3.5" fill="#9a6b3e" stroke="'+INK+'" stroke-width="2.2"/><path d="M2-48Q28-60 30-38Q28-22 2-30Z" fill="#c7ccd1" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M25-52Q32-38 25-25" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/></g>'; break;
      case 'libreta': ar=[[[L0,[cx-sw-12,T+24],[cx-18,T+30]],null,0],[[R0,[cx+sw+10,T+26],[cx+5,T+32]],null,0]];
        pre+='<g transform="translate('+(cx-9)+' '+(T+28)+') rotate(-8)"><rect x="-16" y="-20" width="31" height="37" rx="2" fill="#fff" stroke="'+INK+'" stroke-width="2.2"/><path d="M-16-15h31" stroke="#b23f3c" stroke-width="1.4"/><path d="M-11-9h20M-11-3h20M-11 3h14M-11 9h18" stroke="#9aa3ab" stroke-width="1.4"/><path d="M-11-20v-3M-5-20v-3M1-20v-3M7-20v-3" stroke="'+INK+'" stroke-width="1.6"/></g>';
        post+='<path d="M'+(cx+5)+' '+(T+32)+'l-11-13" stroke="'+INK+'" stroke-width="5.5" stroke-linecap="round"/><path d="M'+(cx+5)+' '+(T+32)+'l-11-13" stroke="#2f6fcf" stroke-width="3" stroke-linecap="round"/>'; break;
      case 'dibuja': ar=[[[L0,[cx-sw-14,T+18],[cx-sw-10,T+4]],null,0],[[R0,[cx+sw+12,T+22],[cx+sw-2,T+10]],null,0]];
        // v15: en el cuaderno, su dragón japonés
        pre+='<g transform="translate('+(cx-sw-28)+' '+(T-13)+') rotate(-6) scale(1.2)"><rect x="-21" y="-24" width="42" height="46" rx="2" fill="#fff" stroke="'+INK+'" stroke-width="2.2"/><path d="M-16-24v-4M-8-24v-4M0-24v-4M8-24v-4M16-24v-4" stroke="'+INK+'" stroke-width="1.6"/>'+
          '<path d="M-17 17C-9 21 3 19 5 11C7 3-9 3-8-5C-7-13 3-14 8-11" fill="none" stroke="'+INK+'" stroke-width="6.4" stroke-linecap="round"/><path d="M-17 17C-9 21 3 19 5 11C7 3-9 3-8-5C-7-13 3-14 8-11" fill="none" stroke="#3f9a5a" stroke-width="4" stroke-linecap="round"/>'+
          '<path d="M-11 15.5l-2-4.5 4.5 2.8M-3 16.5l1-4.8 2.8 3.8M2.5 7l4-3-.2 5M-4-1l-4.6-1.8 4-2M-9.5-9l-3.6-3 4.6-.6M-2-13l-.8-4.6 3.6 3" fill="#d8453a" stroke="'+INK+'" stroke-width=".9" stroke-linejoin="round"/>'+
          '<path d="M5-16.5Q12-19 16-13L18-9L12.5-7.5L10-5.5Q5-6 4-10Z" fill="#3f9a5a" stroke="'+INK+'" stroke-width="1.3" stroke-linejoin="round"/>'+
          '<path d="M7-16.5L3-21.5M10-17L9-22.5" stroke="#b8862b" stroke-width="1.6" stroke-linecap="round"/><circle cx="10.5" cy="-13" r="1.5" fill="#fff" stroke="'+INK+'" stroke-width=".8"/>'+
          '<path d="M18-8Q17-3 15-1M12-7Q12-2 9 .5" fill="none" stroke="'+INK+'" stroke-width=".9" stroke-linecap="round"/><path d="M18-11l2.5-1.6-.6 2 1.6.4-2.6 1.2z" fill="#f08a2c"/></g>';
        post+='<path d="M'+(cx+sw-2)+' '+(T+10)+'l-8-14" stroke="'+INK+'" stroke-width="5.5" stroke-linecap="round"/><path d="M'+(cx+sw-2)+' '+(T+10)+'l-8-14" stroke="#f2c94c" stroke-width="3" stroke-linecap="round"/>'; break;
      case 'casco': ar=[[[L0,dL],null,0],[[R0,[cx+sw+16,T+10],[cx+sw+18,T-6]],null,0]];
        pre+='<g transform="translate('+(cx+sw+18)+' '+(T-30)+') rotate(8)"><path d="M-21 14V-5C-21-31 21-31 21-5V14Q0 23-21 14Z" fill="#d9dde2" stroke="'+INK+'" stroke-width="2.6"/><path d="M-13-17Q-6-25 6-24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>'+
          '<path d="M-17-4H17V6Q0 11-17 6Z" fill="#1d1d24" stroke="'+INK+'" stroke-width="2"/><path d="M-12 1h24" stroke="#e04f9a" stroke-width="2.2" stroke-dasharray="4 2"/></g>'; break;
    }
    var mangas='';
    function grupoBrazo(a,ia,x){return '<g class="an-br'+ia+'" style="transform-origin:'+n1(a[0][0][0])+'px '+n1(a[0][0][1])+'px">'+x+'</g>';}
    ar.forEach(function(a,ia){ f+=grupoBrazo(a,ia,brazo(a[0],aw,piel[0])); });
    f+=pre;
    [L0,R0].forEach(function(p,i){mangas+='<ellipse cx="'+n1(p[0]+(i?2:-2))+'" cy="'+(p[1]-1)+'" rx="'+(aw*.5+6)+'" ry="'+(aw*.4+6)+'" fill="'+(o.remera==='mitad'&&i?PILUSO:(o.manga||c.c1))+'" stroke="'+INK+'" stroke-width="2.4"/>';});
    f+=mangas;
    if(o.extra==='cinta') f+='<g transform="rotate(-12 '+(L0[0]-6)+' '+(L0[1]+12)+')"><rect x="'+(L0[0]-14)+'" y="'+(L0[1]+7)+'" width="17" height="10" rx="2" fill="#2f6fcf" stroke="'+INK+'" stroke-width="1.8"/><text x="'+(L0[0]-5.5)+'" y="'+(L0[1]+15.5)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="8.5" fill="#fff">C</text></g>';
    ar.forEach(function(a,ia){var p=a[0][a[0].length-1]; f+=grupoBrazo(a,ia,mano(p[0],p[1],a[1]==='guante'?hr:Math.max(7,aw*.55+4.5),piel,a[1]||'puño',a[2]));});
    tent.forEach(function(t,i){ f+=mano(t[0],t[1],8.5,piel,'guante',t[2]); if(i===3) f+=pelota(t[0]+4,t[1]-16,10); });
    f+=post;

    var out=o.sinFondo?'':fondo(k,o);
    if(o.palitos) f+='<g transform="translate('+(cx-48)+' '+(T+20)+') rotate(-18)"><path d="M-16 8L24 -13M-16 13L24 -6" stroke="'+INK+'" stroke-width="4.2" stroke-linecap="round"/><path d="M-16 8L24 -13M-16 13L24 -6" stroke="#b8793a" stroke-width="2.2" stroke-linecap="round"/><g transform="translate(14 -12)"><rect x="-11" y="-9" width="22" height="18" rx="6" fill="#1f2a24" stroke="'+INK+'" stroke-width="2"/><ellipse rx="9" ry="6.5" fill="#fbf8f1"/><ellipse rx="4.4" ry="3.4" fill="#ee7f4a"/></g></g>';
    if(o.globo){var t=Z(o.globo[1],o.globo[2]); out+=globo(6,6,o.globo[3]||100,o.globo[0],t[0],t[1]);}
    out+='<g class="fig"><g transform="translate(100 '+(212+(o.dy||0))+') scale('+e.toFixed(3)+') translate(-100 -212)">'+f+'</g></g>';
    if(sil) out+='<rect x="38" y="194" width="124" height="20" rx="4" fill="'+INK+'" opacity=".85"/><text x="100" y="208.5" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="12" letter-spacing="1" fill="'+CREMA+'">PRÓXIMAMENTE</text>';
    return out;
  }

  // Rasgos sacados de las fotos de FOTOS GENERAL, exagerados. n: apodo, a: apodo del apodo, d: qué se exageró
  var TOPO={piel:'clara',pelo:'oscuro',w:50,jaw:44,h:48,ojos:'felices',ceja:4,cejaAlta:5,nariz:1.15,gesto:'grin',boca:22,corte:'revuelto',vol:2};
  var PLANTEL={
    gol:[
      {n:'Polaco',a:'El Vikingo',o:{arquero:true,piel:'clara',pelo:'rubio',colorBarba:'rubio',w:56,jaw:50,h:50,ojo:6,ceja:3,nariz:1.35,barba:'corta',largoBarba:6,gesto:'grin',boca:18,cachetes:true,casco:true,corte:'medio',pose:'arriba',gag:'nieve',rodillera:'der'},
        d:'Casco vikingo, manga corta y una sonrisa de oreja a oreja mientras nieva y el termómetro marca 5°. Él no tiene frío. Rodillera en la derecha: rodilla recuperada.'},
      {n:'Moncho',a:'El Mugre',o:{piel:'trigueña',pelo:'negro',w:48,jaw:40,h:52,ojo:6,ceja:4,cejaEnojo:1.5,nariz:1.3,corte:'corto',vol:2,gesto:'firme',cuerpo:'grandote',pose:'cruzados',gag:'muralla',rodillera:'izq'},
        d:'Brazos cruzados delante de una pared y la pelota que le rebota en la frente: no pierde ni una por arriba. Rodillera en la izquierda, la del LCA, ya recuperada.'},
      {n:'Nano',a:'El Anestesista',o:{piel:'clara',pelo:'claro',w:48,jaw:34,h:50,ojo:8.5,ceja:2.4,nariz:.9,gesto:'sonrisa',boca:9,gorro:true,corte:'corto',barbijo:true,pose:'jeringa',gag:'zzz'},
        d:'Cara de nene y ojos enormes. Vende anestesia y la controla en el quirófano: barbijo colgando, la jeringa en alto y, alrededor, todos dormidos. Arma el juego y le pega a los tiros libres.'},
      {n:'Cocho',a:'El Lindo',o:{piel:'clara',pelo:'castano',w:42,jaw:36,h:46,bot:112,ojo:6,ceja:5,cejaEnojo:4,nariz:1.35,barba:'llena',largoBarba:10,bigote:'grueso',corte:'medio',gesto:'grita',boca:11,extra:'trebol',cuerpo:'grandote',pose:'espada',pintura:true,kilt:true,rodillera:'dos'},
        d:'Le dicen El Lindo, y ahí lo tenés: guerrero escocés con pintura azul, pollera a cuadros, la espada en alto y la pelota bajo el brazo. Barba más corta y una rodillera en cada pierna: las dos rodillas operadas de LCA, recuperadas.'}],
    suerte:[
      {n:'Caba',a:'El Pulpo',o:{arquero:true,piel:'media',pelo:'negro',w:42,jaw:26,h:58,ojos:'ciego',ceja:4,nariz:1.45,barba:'candado',sombra:true,bigote:'fino',gorro:true,gorroY:12,gesto:'grin',boca:11,pose:'arriba',tentaculos:true,gag:'pulpo'},
        d:'Sin anteojos no ve nada, y aun así ataja todo: parece que tuviera ocho brazos. Los anteojos, colgados de la camiseta; los tentáculos, con guantes.'},
      {n:'Mosca',a:'El Fotógrafo',o:{piel:'clara',pelo:'negro',w:46,jaw:40,h:50,ojo:7,ceja:4.5,nariz:1.2,barba:'llena',largoBarba:10,gesto:'paletas',boca:15,corte:'corto',vol:1,alas:true,antenas:true,pose:'camara',gag:'flash'},
        d:'Pelo corto y prolijo, barba tupida, bocota y paletas. Con alas y antenitas de mosca, siempre zumbando alrededor del partido con la cámara colgada: el fotógrafo del equipo.'},
      {n:'Tanos',a:'El Titán',o:{piel:'clara',pelo:'oscuro',w:44,jaw:40,h:46,ojo:6.5,ceja:4.5,cejaEnojo:2,nariz:1.2,gesto:'canchero',boca:11,bocaY:23,corte:'porra',vol:30,surcos:true,cuerpo:'flaco',zoom:.88,pose:'chasquido',gag:'polvo'},
        d:'Chiquito, con la porra que le crece para arriba y el mentón con surcos. Chasquea los dedos y la pelota del rival se hace polvo.'},
      {n:'Topo',a:'Rey de la Pretemporada',o:Object.assign({},TOPO,{minero:true,narizColor:'#f08aa0',nariz:1.35,gesto:'paletas',boca:17,pose:'trofeo',gag:'topera',rodillera:'der'}),
        d:'Un topo de verdad: casco de minero, nariz rosada y paletas, entre montañitas de tierra y con la copa de la pretemporada en alto. Rodillera en la derecha: se está recuperando y ya vuelve.'}],
    picardia:[
      {n:'Pipes',a:'El Cronista',o:{arquero:true,piel:'clara',pelo:'negro',w:36,jaw:24,h:56,ojo:6.5,ceja:5,nariz:1.3,corte:'corto',vol:3,gesto:'grita',boca:8,cuerpo:'flaco',pose:'micro',gag:'cronista'},
        d:'Flaquito, con los guantes que le quedan enormes, el poncho salteño al hombro y el micrófono en la mano: está transmitiendo la actualidad de Boca.'},
      {n:'Tomo',a:'El Ambizurdo',o:{piel:'media',pelo:'negro',w:46,jaw:44,h:50,ojo:6,ceja:6.5,nariz:1.25,gesto:'grin',boca:20,corte:'ondas',vol:6,cuerpo:'musculoso',pose:'biceps',gag:'izq',mancuernas:true},
        d:'El que más entrena: doble bíceps, sonrisa de propaganda y las mancuernas al lado. Le pega igual con las dos, por eso tiene dos botines izquierdos.'},
      {n:'Krupo',a:'El Hacha',o:{piel:'clara',pelo:'claro',w:38,jaw:27,h:60,ojo:6,ceja:3.5,cejaEnojo:3,nariz:1.45,barba:'candado',sombra:true,corte:'largo',gesto:'canchero',boca:11,lengua:true,pose:'hacha'},
        d:'Melena larga, se relame y lleva el hacha al hombro: vio una pelota dividida y ya se está por tirar a barrer.'},
      {n:'Chun',a:'El Caballo',o:{piel:'clara',pelo:'castano',colorBarba:'colorado',w:46,jaw:36,h:54,ojo:7,ceja:5,cejaEnojo:2,nariz:1.25,barba:'corta',largoBarba:3,gorro:true,gesto:'grita',boca:9,pose:'corre',gag:'caballo',rodillera:'dos',caballo:true},
        d:'Barba colorada bien recortada y una rodillera en cada pierna: las dos rodillas recuperadas. Orejas y cola de caballo: agarra la pelota y galopa para adelante con todo, dejando una nube de polvo.'}],
    fans:[
      {n:'Tuki',a:'Tuki-Taka',o:{arquero:true,piel:'clara',pelo:'oscuro',w:52,jaw:46,h:50,ojo:6.5,ojos:'dormidos',ceja:3.5,nariz:1.6,barba:'sombra',corte:'corto',vol:3,gesto:'sonrisa',boca:12,pose:'asador',gag:'parrilla',delantal:true,rodillera:'izq'},
        d:'Hermano menor de Baigo, asador oficial e inventor del Tuki-Taka. Delantal manchado de grasa, el guante en una mano y la pinza con el chori en la otra. Rodillera en la izquierda: rodilla recuperada.'},
      {n:'Joaquinho',a:'O Papai',o:{piel:'media',pelo:'oscuro',w:38,jaw:26,h:60,bot:122,ojo:6,ceja:4.5,nariz:1.6,bigote:'fino',corte:'corto',vol:4,gesto:'grin',boca:12,pose:'bebe',gag:'papai',descalzo:true},
        d:'Lateral derecho que juega como brasileño: en patas, con la vincha verde y amarela, el bigote finito y el bebé en el canguro.'},
      {n:'Baigo',a:'El Psicólogo',o:{piel:'media',pelo:'oscuro',w:36,jaw:28,h:64,ojo:6,ceja:4,nariz:1.5,barba:'corta',largoBarba:4,bigote:'grueso',gorro:true,gesto:'sonrisa',boca:9,extra:'cinta',pose:'libreta',rodillera:'dos',zoom:.86,globo:['¿CÓMO TE SENTÍS?',86,100,160]},
        d:'Psicólogo deportivo: la cinta de capitán, la libreta en la mano y la pregunta de siempre, hasta para el árbitro. Rodilleras en las dos rodillas.'},
      {n:'Juane',a:'El Dragón',o:Object.assign({},TOPO,{w:48,jaw:40,h:50,corte:'corto',vol:3,barba:'candado',sombra:true,gesto:'sonrisa',boca:11,hachimaki:true,pose:'dibuja',gag:'sakura'}),
        d:'Tranquilo y llevadero, con la vincha y el cuaderno de dibujo: le encanta la cultura japonesa y, entre jugada y jugada, dibuja su dragón. Un delantero de lujo.'}],
    sponsors:[
      {n:'Nico',a:'El Loco de la Tribuna',o:{arquero:true,piel:'clara',pelo:'castano',w:48,jaw:38,h:54,ojo:6.5,lentes:true,ceja:4,cejaAlta:3,nariz:1.3,barba:'sombra',gesto:'grin',boca:16,lengua:true,lenguaC:true,corte:'pelado',auriculares:true,pose:'arriba',gag:'caño'},
        d:'Pelado, anteojos negros y auriculares: dicen que es igualito a un productor de música famoso. Juega poco y mal, pero no falta nunca a la cancha. Medio loco y querido por todos; la pelota, por supuesto, le pasa entre las piernas.'},
      {n:'Falso Topo',a:'El Fichaje Estrella',o:{piel:'trigueña',pelo:'negro',w:40,jaw:32,h:60,ojo:6,ceja:5,nariz:1.75,barba:'corta',largoBarba:5,sinBoca:true,corte:'corto',gorro:true,gag:'fichaje'},
        d:'Más morocho que Topo, con barba, la cara larga y buena nariz. Ex B Nacional, con el silbato de personal trainer y la etiqueta de precio todavía puesta: lo trajeron como estrella.'},
      {n:'Guido',a:'El Salvador',o:Object.assign({},TOPO,{ojos:null,ojo:6.5,ceja:4.5,cejaAlta:2,nariz:1.25,w:48,jaw:40,h:50,corte:'corto',vol:3,gesto:'sonrisa',boca:14,salvavidas:true,aureola:true,pose:'señala',gag:'pisa'}),
        d:'El invitado que salva los partidos: llega con la aureola y el salvavidas puesto. Se para en el medio, recupera, cuida la pelota y reparte. Cada vez que viene, se agradece.'},
      {n:'Cale',a:'Joni Bois',o:{piel:'media',pelo:'negro',w:46,jaw:42,h:52,ojo:6,ceja:5.5,nariz:1.25,barba:'candado',sombra:true,gesto:'canchero',boca:14,corte:'largo',auriculares:true,pose:'casco',gag:'eq'},
        d:'Cara parecida a la de Tomo, pero con el pelo largo y lacio y barbita corta. De noche es Joni Bois: toca música electrónica con un casco de robot puesto.'}]
  };
  var POS=['ARQUERO','DEFENSOR','VOLANTE','DELANTERO'];

  function carta(k,j,num){
    var c=C[k], p=PLANTEL[k][j], pos=POS[j], tc=k==='picardia'?INK:CREMA, zz=U('zz'), cl=U('cl');
    var nombre=p.n, fs=Math.min(50,Math.floor(520/(nombre.length+1.5)));
    var s='<svg viewBox="0 0 410 630" role="img" aria-label="Figurita de '+nombre+(p.a?', '+p.a:'')+', '+pos.toLowerCase()+' de '+c.nombre+'">';
    s+='<defs><pattern id="'+zz+'" width="44" height="22" patternUnits="userSpaceOnUse"><path d="M-2 18L10 6L22 18L34 6L46 18" fill="none" stroke="'+tc+'" stroke-width="5" opacity=".14"/></pattern><clipPath id="'+cl+'"><rect x="22" y="66" width="366" height="402" rx="14"/></clipPath></defs>';
    s+='<rect x="3" y="3" width="404" height="624" rx="24" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="5"/><rect x="3" y="3" width="404" height="624" rx="24" fill="url(#'+zz+')"/>';
    s+='<text x="26" y="50" font-family="Bowlby One SC, sans-serif" font-size="30" letter-spacing="1" fill="'+tc+'">'+pos+'</text>';
    s+='<g transform="translate(336 8) scale(.54)">'+badge(k)+'</g>';
    s+='<g clip-path="url(#'+cl+')"><svg x="22" y="66" width="366" height="402" viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice">'+figura(k,p.o)+'</svg></g>';
    s+='<rect x="22" y="66" width="366" height="402" rx="14" fill="none" stroke="'+INK+'" stroke-width="5"/>';
    s+='<rect x="22" y="480" width="366" height="98" rx="14" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="4"/>';
    s+='<text x="205" y="'+(p.a?522+fs*.3:536+fs*.3)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="'+fs+'" fill="'+INK+'">'+nombre+'</text>';
    if(p.a) s+='<text x="205" y="563" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-style="italic" font-weight="700" font-size="'+Math.min(24,Math.floor(560/p.a.length))+'" fill="#8a5f16">'+p.a+'</text>';
    s+='<text x="205" y="610" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="15" letter-spacing="2" fill="'+tc+'">'+c.nombre.toUpperCase()+'</text>';
    s+='<text x="384" y="610" text-anchor="end" font-family="Bowlby One SC, sans-serif" font-size="20" fill="'+tc+'">'+(num<10?'0':'')+num+'</text>';
    return s+'</svg>';
  }
  function franja(x,y,w,h){return ORDEN.map(function(k,i){return '<rect x="'+(x+i*w/5)+'" y="'+y+'" width="'+(w/5)+'" height="'+h+'" fill="'+C[k].c1+'"/>';}).join('');}
  // v16: el logo de PEXA son solo los 5 Estadios, en colores lisos. modo 'pexa': el nombre en el medio; modo 'copa': pentágono blanco con el trofeo. Va centrado en (0,0), en un cuadrado de -142 a 142.
  function logoSolo(){var l=[];for(var a=0;a<5;a++){var d=(-18+72*a)*Math.PI/180;l.push((54*Math.cos(d)).toFixed(1)+','+(54*Math.sin(d)).toFixed(1));}var h=l.join(' ');
    return '<polygon points="'+h+'" fill="'+PILUSO+'" stroke="'+CREMA+'" stroke-width="7" stroke-linejoin="round"/><text y="10" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="25.5" letter-spacing=".3" fill="'+CREMA+'">PEXA</text>';}
  var VB_SOLO='-60 -60 120 110';
  function logoPexa(modo){
    function pol(r,d){var a=d*Math.PI/180;return [r*Math.cos(a),r*Math.sin(a)];}
    function ptos(l){return l.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');}
    var pa=[],pb=[],cm=[],cp=[],or=['gol','suerte','picardia','fans','sponsors'],s='',cuerpo='';
    for(var i=0;i<5;i++){var t=-54+72*i;pa.push(pol(54,t+36));pb.push(pol(105,t+36));cm.push(pol(135,t-14));cp.push(pol(135,t+14));}
    for(var i=0;i<5;i++){var a=(i+4)%5,h=ptos([pa[a],pa[i],pb[i],cp[i],cm[i],pb[a]]);s+='<polygon points="'+h+'" fill="'+CREMA+'" stroke="'+CREMA+'" stroke-width="10" stroke-linejoin="round"/>';cuerpo+='<polygon points="'+h+'" fill="'+C[or[i]].c1+'" stroke="'+CREMA+'" stroke-width="4.6" stroke-linejoin="round"/>';}
    s+=cuerpo+'<polygon points="'+ptos(pa)+'" fill="'+PILUSO+'" stroke="'+CREMA+'" stroke-width="4.6" stroke-linejoin="round"/>';
    if(modo==='copa')s+='<g transform="translate(0 1) scale(3.45)" stroke="#8a6a25" stroke-linejoin="round"><path d="M-5.2-5.6H-8C-8-2-6.4-.4-4.2 0M5.2-5.6H8C8-2 6.4-.4 4.2 0" fill="none" stroke-width="1.2"/><path d="M-5.4-7.4H5.4V-3C5.4 .6 2.8 2.6 1.2 3.2V5.2H3.6V7.6H-3.6V5.2H-1.2V3.2C-2.8 2.6-5.4 .6-5.4-3Z" fill="#e2bd57" stroke-width=".7"/><path d="M-3.2-6V-2.6" fill="none" stroke="#fff6d8" stroke-width="1.1" stroke-linecap="round"/></g>';
    else s+='<text y="10" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="25.5" letter-spacing=".3" fill="'+CREMA+'">PEXA</text>';
    return s;
  }
  var ORDEN_D=['gol','suerte','picardia','fans','sponsors'];
  function dorso(tipo){
    // v17: Jugadores en violeta y negro, Recursos en celeste y blanco, Beneficios en rosa clarito y blanco (la suplente de Piluso)
    // v18: Recursos multicolor (Azul, Verde, Amarillo, Naranja, Rojo) y Beneficios en verde y naranja, los Recursos que los compran
    var pal={Jugador:{li:'#120c1f',fd:'#4a2d82',zz:['#120c1f','#4a2d82'],ma:'#d6c2f5',bo:'#120c1f',fs:58},Recurso:{li:PILUSO,fd:C.gol.c1,zz:ORDEN_D.map(function(k){return C[k].c1;}),ma:CREMA,bo:INK,fs:58},Beneficio:{li:'#2f4f25',fd:C.suerte.c1,zz:[C.suerte.c1,C.fans.c1],ma:CREMA,bo:INK,fs:50}}[tipo];
    var zz=U('zz'), s='<svg viewBox="0 0 410 630" role="img" aria-label="Dorso de las cartas '+tipo+'">';
    var alto=34,pz='';pal.zz.forEach(function(col,ix){var y=ix*alto;pz+='<path d="M-30 '+(y-17)+'L-15 '+(y-32)+'L0 '+(y-17)+'L15 '+(y-32)+'L30 '+(y-17)+'L45 '+(y-32)+'L60 '+(y-17)+'L75 '+(y-32)+'L90 '+(y-17)+'V'+(y+alto*2)+'H-30Z" fill="'+col+'"/>';});
    var ultimo=pal.zz.length*alto;pz+='<path d="M-30 '+(ultimo-17)+'L-15 '+(ultimo-32)+'L0 '+(ultimo-17)+'L15 '+(ultimo-32)+'L30 '+(ultimo-17)+'L45 '+(ultimo-32)+'L60 '+(ultimo-17)+'L75 '+(ultimo-32)+'L90 '+(ultimo-17)+'V'+(ultimo+alto)+'H-30Z" fill="'+pal.zz[0]+'"/>';
    // v19: líneas más gruesas: el mismo zigzag, casi al doble
    s+='<defs><pattern id="'+zz+'" width="60" height="'+ultimo+'" patternUnits="userSpaceOnUse" patternTransform="scale(1.9)">'+pz+'</pattern></defs>';
    // v20: entre el borde de la carta y la línea de adentro, un color liso que rodea toda la carta
    s+='<rect x="3" y="3" width="404" height="624" rx="24" fill="'+pal.li+'" stroke="'+INK+'" stroke-width="5"/><rect x="24" y="24" width="362" height="582" rx="14" fill="'+pal.fd+'"/><rect x="24" y="24" width="362" height="582" rx="14" fill="url(#'+zz+')"/><rect x="24" y="24" width="362" height="582" rx="14" fill="none" stroke="'+pal.ma+'" stroke-width="4"/>';
    s+='<svg x="33" y="56" width="344" height="344" viewBox="-142 -142 284 284">'+logoPexa('pexa')+'</svg>';
    s+='<text x="205" y="505" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="'+pal.fs+'" letter-spacing="1" fill="#fff" stroke="'+pal.bo+'" stroke-width="10" stroke-linejoin="round" paint-order="stroke">'+tipo.toUpperCase()+'</text>';
    return s+'</svg>';
  }
  function sapo(){var V='#6fae4a', V2='#4f8a34';
    return '<ellipse cx="96" cy="172" rx="52" ry="6" fill="#000" opacity=".14"/>'+
      '<path d="M50 168C40 120 56 84 96 82C136 84 152 120 142 168Z" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/><ellipse cx="96" cy="140" rx="30" ry="26" fill="#cfe3a0"/>'+
      '<path d="M66 102Q96 92 126 102L120 112Q96 104 72 112Z" fill="#fff" stroke="'+INK+'" stroke-width="2"/><path d="M96 104v18" stroke="'+INK+'" stroke-width="1.6"/><g transform="translate(96 126)"><rect x="-9" y="-4" width="18" height="9" rx="4" fill="#c7ccd1" stroke="'+INK+'" stroke-width="2"/><circle cx="-3" cy=".5" r="2" fill="'+INK+'"/></g>'+
      '<ellipse cx="96" cy="70" rx="46" ry="30" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/>'+
      [-1,1].map(function(sg){var x=96+sg*26;return '<circle cx="'+x+'" cy="46" r="16" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/><circle cx="'+x+'" cy="46" r="10" fill="#fff" stroke="'+INK+'" stroke-width="2"/><rect x="'+(x-7+sg*2)+'" y="43.5" width="14" height="5" rx="2.5" fill="'+INK+'"/><path d="M'+(x-13)+' 38q13-8 26 0" fill="none" stroke="'+V2+'" stroke-width="3" stroke-linecap="round"/>';}).join('')+
      '<path d="M64 80Q96 100 128 80" fill="none" stroke="'+INK+'" stroke-width="3.4" stroke-linecap="round"/><path d="M118 84q8 0 10-6" fill="none" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="68" cy="72" rx="7" ry="4" fill="#e8574a" opacity=".3"/><ellipse cx="124" cy="72" rx="7" ry="4" fill="#e8574a" opacity=".3"/>'+
      '<path d="M60 28Q96 6 132 28L136 36H56Z" fill="'+INK+'"/><path d="M128 32h28q4 0 2 4H130Z" fill="'+INK+'"/><text x="96" y="31" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="7" fill="#f2c94c">ORGANIZACIÓN</text>'+
      '<g transform="translate(160 118) rotate(-14)"><rect x="-22" y="-14" width="44" height="28" rx="3" fill="#e9dcc0" stroke="'+INK+'" stroke-width="2.6"/><path d="M-22-14L0 3 22-14" fill="none" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><rect x="-14" y="-26" width="30" height="15" rx="2" fill="#94c48c" stroke="'+INK+'" stroke-width="1.8"/><text x="1" y="-14.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="11" fill="#2f5a26">$</text></g>'+
      '<circle cx="142" cy="128" r="9" fill="'+V+'" stroke="'+INK+'" stroke-width="2.4"/><path d="M132 132q-8 6-6 16" fill="none" stroke="'+INK+'" stroke-width="10" stroke-linecap="round"/><path d="M132 132q-8 6-6 16" fill="none" stroke="'+V+'" stroke-width="6.4" stroke-linecap="round"/>';
  }
  // el Sapo en el tablero: centrado en (x, y), s = mm por unidad del dibujo
  function sapito(x,y,s){return '<g transform="translate('+n1(x)+' '+n1(y)+') scale('+s+') translate(-100 -95)">'+sapo()+'</g>';}
  // canchita de fútbol 5, de sintético y con el alambrado
  var MULTA={
    gol:['Offside',function(c){return '<path d="M30 82V16" stroke="'+c+'" stroke-width="8" stroke-linecap="round"/><path d="M34 18H76V48H34Z" fill="'+c+'"/><path d="M48 18H62V33H48ZM34 33H48V48H34ZM62 33H76V48H62Z" fill="'+INK+'"/>';}],
    suerte:['Mufa',function(c){return '<path d="M66 82Q88 82 84 64Q81 54 88 48" fill="none" stroke="'+c+'" stroke-width="6" stroke-linecap="round"/><path d="M32 88Q28 62 44 50H56Q72 62 68 88Z" fill="'+c+'"/>'+
      '<path d="M33 31L31 9L47 22ZM67 31L69 9L53 22Z" fill="'+c+'"/><circle cx="50" cy="36" r="18" fill="'+c+'"/><path d="M35.5 25L34 15L42 22ZM64.5 25L66 15L58 22Z" fill="'+INK+'" opacity=".45"/>'+
      '<ellipse cx="42" cy="34" rx="5" ry="4" fill="#f2c94c"/><ellipse cx="58" cy="34" rx="5" ry="4" fill="#f2c94c"/><path d="M42 30.5V37.5M58 30.5V37.5" stroke="'+INK+'" stroke-width="2.2" stroke-linecap="round"/><path d="M47 42H53L50 45.5Z" fill="'+INK+'"/>'+
      '<path d="M30 42L14 39M30 46L14 48M70 42L86 39M70 46L86 48" stroke="'+c+'" stroke-width="2" stroke-linecap="round"/>';}],
    picardia:['VAR',function(c){return '<rect x="14" y="18" width="72" height="50" rx="6" fill="none" stroke="'+c+'" stroke-width="8"/><text x="50" y="54" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="25" fill="'+c+'">VAR</text><path d="M50 68V80M32 84H68" stroke="'+c+'" stroke-width="8" stroke-linecap="round"/>';}],
    fans:['Mala Prensa',function(c){return '<g transform="rotate(-6 50 50)"><path d="M18 14H72L82 24V86H18Z" fill="'+c+'"/><path d="M72 14V24H82Z" fill="'+INK+'" opacity=".35"/>'+
      '<path d="M23 19H69V33H23Z" fill="'+INK+'"/><text x="46" y="30.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="11" fill="'+c+'">PIPETA</text><path d="M24 39H77" stroke="'+INK+'" stroke-width="5"/>'+
      '<path d="M24 47H46V75H24Z" fill="'+INK+'"/><path d="M35 51V64" stroke="'+c+'" stroke-width="5" stroke-linecap="round"/><circle cx="35" cy="70" r="2.8" fill="'+c+'"/>'+
      '<path d="M52 49H76M52 56H76M52 63H76M52 70H70M24 81H76" stroke="'+INK+'" stroke-width="3"/></g>';}],
    sponsors:['Corrupción',function(c){return '<path d="M12 28H88V80H12Z" fill="'+c+'"/><path d="M12 28L50 56L88 28" fill="none" stroke="'+INK+'" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="66" r="12" fill="'+INK+'"/><text x="50" y="74" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="20" fill="'+c+'">$</text>';}]
  };
  // ---------- Cartas de Beneficio: protagonizadas por La Escuelita ----------
  C.escuelita={nombre:'La Escuelita',c1:'#c8312b',c2:CREMA,fondo:'#f4dcd6'};
  BANDA.escuelita=CREMA; SHORT.escuelita=INK;
  var ROJO='#c8312b', PC=PIEL.clara;
  function tokV(x,y,r){return '<g transform="translate('+(x-r)+' '+(y-r)+') scale('+(r/50)+')"><circle cx="50" cy="50" r="47" fill="#d9b25a" stroke="'+INK+'" stroke-width="3"/><circle cx="50" cy="50" r="40" fill="#e9c874" stroke="#a5822f" stroke-width="2"/><path d="M50 21L57.4 41.6L79.3 42.4L62 55.9L68 77L50 64.6L32 77L38 55.9L20.7 42.4L42.6 41.6Z" fill="#fff6d8" stroke="#8a6a25" stroke-width="2.6" stroke-linejoin="round"/></g>';}
  function tokE(x,y,r){return '<g transform="translate('+(x-r)+' '+(y-r)+') scale('+(r/50)+')"><circle cx="50" cy="50" r="47" fill="#3f8a5a" stroke="'+INK+'" stroke-width="3"/><circle cx="50" cy="50" r="40" fill="#4f9d68" stroke="#2c6a42" stroke-width="2"/><text x="50" y="71" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="58" fill="#e7f3df" stroke="#2c6a42" stroke-width="2.4" paint-order="stroke">$</text></g>';}
  function multaT(k,x,y,s,rot){return '<g transform="translate('+x+' '+y+') rotate('+(rot||0)+') scale('+s+') translate(-50 -50)"><rect x="2" y="2" width="96" height="96" rx="10" fill="'+INK+'"/><rect x="6" y="6" width="88" height="88" rx="7" fill="none" stroke="'+C[k].c1+'" stroke-width="2.6" stroke-dasharray="5 3"/>'+MULTA[k][1](C[k].c1)+'</g>';}
  function bdg(k,x,y,s){return '<g transform="translate('+(x-50*s)+' '+(y-50*s)+') scale('+s+')">'+badge(k)+'</g>';}
  function dado(x,y,s,n,fill,rot){
    var P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[n];
    var pip=fill===CREMA?INK:CREMA;
    return '<g transform="translate('+x+' '+y+') rotate('+(rot||0)+')"><rect x="'+(-s/2)+'" y="'+(-s/2)+'" width="'+s+'" height="'+s+'" rx="'+(s*.2)+'" fill="'+fill+'" stroke="'+INK+'" stroke-width="2.6"/>'+P.map(function(p){return '<circle cx="'+n1(p[0]*s*.26)+'" cy="'+n1(p[1]*s*.26)+'" r="'+n1(s*.09)+'" fill="'+pip+'"/>';}).join('')+'</g>';
  }
  function flecha(d,color){return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="8" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+(color||CREMA)+'" stroke-width="4" stroke-linecap="round"/>';}
  function punta(x,y,rot,color){return '<path d="M0-9L11 0L0 9Z" fill="'+(color||CREMA)+'" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round" transform="translate('+x+' '+y+') rotate('+rot+')"/>';}
  function sello(x,y,txt,rot,fs){var w=txt.length*(fs||18)*.78+20;return '<g transform="translate('+x+' '+y+') rotate('+rot+')" opacity=".92"><rect x="'+(-w/2)+'" y="-18" width="'+w+'" height="36" rx="4" fill="none" stroke="#c8312b" stroke-width="4"/><rect x="'+(-w/2+5)+'" y="-13" width="'+(w-10)+'" height="26" rx="2" fill="none" stroke="#c8312b" stroke-width="1.4"/><text x="0" y="'+((fs||18)*.36)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="'+(fs||18)+'" fill="#c8312b">'+txt+'</text></g>';}
  function dorsoB(x,y,rot){return '<g transform="translate('+x+' '+y+') rotate('+rot+')"><rect x="-22" y="-32" width="44" height="64" rx="5" fill="'+C.suerte.c1+'" stroke="'+INK+'" stroke-width="2.4"/><path d="M-20.8 12L-11 2L0 12L11 2L20.8 12V30.8H-20.8Z" fill="'+C.fans.c1+'"/><rect x="-22" y="-32" width="44" height="64" rx="5" fill="none" stroke="'+INK+'" stroke-width="2.4"/><text x="0" y="8" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="22" fill="'+CREMA+'">B</text></g>';}

  // Ilustraciones de los Beneficios sin protagonista (espacio 200 × 180)
  var ILUS={
    extra:function(){var ks=['gol','suerte','picardia','fans','sponsors'];return ks.map(function(k,i){var a=(-150+i*30)*Math.PI/180;return bdg(k,100+70*Math.cos(a),140+70*Math.sin(a),.36);}).join('')+'<text x="100" y="150" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="56" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="3" paint-order="stroke">+1</text>';},
    unoauno:function(){return bdg('gol',46,92,.5)+bdg('fans',148,66,.42)+bdg('suerte',158,124,.42)+flecha('M68 64Q100 44 124 60')+punta(126,62,30)+flecha('M68 120Q100 138 132 128')+punta(134,127,-10)+'<text x="98" y="100" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="24" fill="'+INK+'" paint-order="stroke" stroke="'+CREMA+'" stroke-width="4">1:2</text>';},
    asistencia:function(){return bdg('picardia',40,40,.32)+bdg('fans',160,36,.32)+bdg('suerte',100,24,.32)+'<g stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 5" fill="none"><path d="M48 58q18 30 34 46M152 54q-16 30-32 50M100 42v50"/></g>'+mano(100,132,30,PC,'palma',0)+'<path d="M64 150q-12 4-20 0M136 150q12 4 20 0" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round" fill="none"/>';},
    // Barrida: el botín de La Escuelita entra derecho a la pelota y el Recurso sale volando
    barrida:function(){return '<path d="M10 160H190" stroke="'+INK+'" stroke-width="2.4" stroke-dasharray="6 5" opacity=".5"/><g fill="#e9dcc0" stroke="'+INK+'" stroke-width="2"><ellipse cx="44" cy="156" rx="18" ry="7"/><ellipse cx="70" cy="160" rx="12" ry="5"/></g>'+
      '<g transform="translate(100 128) rotate(-12) scale(1.3)"><rect x="-84" y="-10" width="70" height="20" rx="6" fill="'+PIEL.clara+'" stroke="'+INK+'" stroke-width="2.6"/><rect x="-26" y="-11" width="22" height="22" rx="3" fill="'+ROJO+'" stroke="'+INK+'" stroke-width="2.6"/><path d="M-26-4h22M-26 4h22" stroke="'+CREMA+'" stroke-width="2.4"/>'+
      '<path d="M-6-12h20q18 0 18 14v6H-6z" fill="'+INK+'"/><path d="M2-6l8 0M6-1l8 0" stroke="'+CREMA+'" stroke-width="2"/><g fill="'+INK+'"><rect x="-2" y="8" width="4" height="5" rx="1"/><rect x="10" y="8" width="4" height="5" rx="1"/><rect x="22" y="8" width="4" height="5" rx="1"/></g></g>'+
      pelota(172,146,12)+bdg('picardia',152,58,.44)+'<g stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"><path d="M126 96l-10 8M140 100l-3 10M114 84l-12 2"/></g><text x="76" y="62" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="24" fill="'+INK+'" transform="rotate(-10 76 62)">¡ZAS!</text>';},    dudoso:function(){return '<g transform="translate(70 92) rotate(-4)"><rect x="-44" y="-34" width="88" height="60" rx="6" fill="#1f2a36" stroke="'+INK+'" stroke-width="3"/><rect x="-37" y="-27" width="74" height="46" fill="#2f4a5a"/><path d="M-37 9l20-14 14 10 20-18 20 18v14h-74z" fill="#3f6a7a"/><text x="0" y="2" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="22" fill="#dcb02e">VAR</text><path d="M0 26v12M-18 42h36" stroke="#dcb02e" stroke-width="5" stroke-linecap="round"/></g>'+tokE(152,118,30)+'<g font-family="Bowlby One SC, sans-serif" fill="'+INK+'"><text x="146" y="60" font-size="34" transform="rotate(12 146 60)">?</text><text x="176" y="46" font-size="22" transform="rotate(-10 176 46)">?</text></g>';},
    amnistia:function(){return multaT('gol',100,88,.95,-6)+sello(100,96,'ANULADA',-16,22);},
    exento:function(){return multaT('suerte',60,82,.62,-14)+multaT('picardia',140,82,.62,12)+multaT('fans',100,110,.62,0)+sello(100,100,'ARCHIVADO',-12,22);},
    manodedios:function(){return '<g stroke="#f2c94c" stroke-width="4" stroke-linecap="round" opacity=".9">'+[0,40,80,120,160,200,240,280,320].map(function(a){var r=a*Math.PI/180;return '<path d="M'+n1(130+36*Math.cos(r))+' '+n1(64+36*Math.sin(r))+'L'+n1(130+48*Math.cos(r))+' '+n1(64+48*Math.sin(r))+'"/>';}).join('')+'</g>'+tokV(130,64,28)+mano(74,126,30,PC,'palma',-28)+'<ellipse cx="74" cy="168" rx="26" ry="5" fill="#000" opacity=".12"/>';},
    petro:function(){return '<g transform="translate(66 96)"><rect x="-30" y="-46" width="60" height="92" rx="8" fill="#2c3440" stroke="'+INK+'" stroke-width="3"/><path d="M-30-18h60M-30 18h60" stroke="#55606e" stroke-width="5"/><ellipse cx="0" cy="-46" rx="30" ry="7" fill="#3a4452" stroke="'+INK+'" stroke-width="3"/><path d="M-6 0q6-12 12 0a6 6 0 0 1-12 0z" fill="#f2c94c" stroke="'+INK+'" stroke-width="1.6"/></g>'+tokE(140,92,32)+'<path d="M108 40q4 8 0 12q-4-4 0-12zM176 150q4 8 0 12q-4-4 0-12z" fill="#2c3440" stroke="'+INK+'" stroke-width="1.6"/>';},
    valorxvalor:function(){return tokV(56,90,32)+tokE(144,90,32)+flecha('M70 44Q100 26 130 44')+punta(132,46,35)+flecha('M130 136Q100 154 70 136')+punta(68,134,215);},
    intvalores:function(){return mano(34,126,24,PC,'palma',60)+mano(166,62,24,PIEL.media,'palma',240)+tokV(82,108,24)+tokE(118,78,24)+'<g stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round" opacity=".6"><path d="M96 130l14-6M104 56l-14 6"/></g>';},
    dame:function(){return dorsoB(66,108,-16)+dorsoB(100,104,0)+dorsoB(134,108,16)+'<g transform="translate(150 50) rotate(24)">'+dorsoB(0,0,0)+'</g>'+mano(178,24,18,PC,'palma',200)+'<path d="M124 30l-10-6M128 70l-12 2" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round"/>';},
    gas:function(){return '<g transform="translate(58 118) rotate(-20)"><rect x="-16" y="-34" width="32" height="70" rx="6" fill="#e05a4f" stroke="'+INK+'" stroke-width="3"/><rect x="-8" y="-46" width="16" height="12" rx="2" fill="#c7ccd1" stroke="'+INK+'" stroke-width="2.4"/><rect x="-16" y="-10" width="32" height="18" fill="#f6efe0"/><text x="0" y="4" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="8" fill="'+INK+'">GAS</text></g>'+
      '<g fill="#e9e4da" stroke="'+INK+'" stroke-width="2.4"><circle cx="112" cy="70" r="20"/><circle cx="140" cy="56" r="24"/><circle cx="160" cy="88" r="22"/><circle cx="128" cy="96" r="20"/></g><g fill="#e9e4da"><circle cx="132" cy="76" r="24"/></g><text x="138" y="88" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="22" fill="'+INK+'">¡AY!</text>';},
    // El Sapo: el organizador del torneo de La Escuelita, con la gorra, el silbato y el sobre
    arreglo:function(){
      return '<g transform="translate(8 10) rotate(-6)"><rect width="74" height="26" rx="4" fill="'+INK+'"/><text x="37" y="11" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="8" letter-spacing="1" fill="#f2c94c">TORNEO</text><text x="37" y="22" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="10" fill="#f2c94c">EL SAPO</text></g>'+
        '<g transform="translate(110 180) scale(.85) translate(-110 -180)">'+sapo()+'<path d="M178 92l8-8M184 104l10-2M172 84l2-10" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round"/></g>';},
  };

  // Protagonistas: rasgos de las fotos de las carpetas ESCUELITA, con lo que contó Cocho de cada uno
  var ESC={
    capitano:['Capitano',{piel:'clara',pelo:'negro',w:46,jaw:40,h:52,ojos:'felices',ceja:5,nariz:1.3,barba:'llena',largoBarba:8,bigote:'grueso',corte:'ondas',vol:8,gesto:'grin',boca:16,extra:'cinta',pose:'cruzados',remera:'banda',gag:'marcador'},'Barba tupida, rulos y brazos cruzados. Atrás, el tablero del Torneo El Sapo: 5 a 0 contra AC Martínez, el clásico que salía campeón siempre. Después de eso, el equipo no se toca.'],
    teo:['Teo',{piel:'clara',pelo:'negro',w:44,jaw:36,h:52,ojo:6.5,ceja:4.5,nariz:1.25,barba:'corta',largoBarba:3,corte:'ondas',vol:5,gesto:'grin',boca:14,pose:'figuritas',remera:'lisa'},'El hermano de Capitano: los mismos rulos, menos barba y dos figuritas en la mano.'],
    piolo:['Piolo',{piel:'palida',pelo:'colorado',colorBarba:'colorado',w:42,jaw:32,h:56,ceja:4,nariz:1.35,barba:'corta',largoBarba:4,corte:'corto',vol:2,flequillo:'lado',gesto:'canchero',boca:11,pose:'corre',gag:'corre',remera:'rayas',globo:['¡ES MÍA!',70,40,94]},'Colorado, bien blanco y con el flequillo al costado. Recupera atrás y se va solo hasta el arco: pasarla, ni loco.'],
    tai:['Tai',{piel:'clara',pelo:'negro',w:52,jaw:48,h:50,ojo:6.5,iris:'#5f9fc4',ceja:4,nariz:1.3,corte:'entradas',vol:0,cachetes:true,gesto:'canchero',boca:13,cuerpo:'grandote',faja:true,pose:'manodedios',remera:'lisa'},'El goleador de cuando éramos chicos. Volvió de la hernia más lento, más pesado y con más entradas, con la faja puesta, pero la magia no la perdió.'],
    m:['M',{piel:'clara',pelo:'castano',w:44,jaw:34,h:54,ceja:5,nariz:1.3,barba:'corta',largoBarba:3,corte:'corto',vol:2,gesto:'grin',boca:15,pose:'cartel',remera:'lisa'},'Barba recortada y la mejor energía del equipo. Con la pelota se las arreglaba como podía, pero metía garra hasta el último minuto: el del descuento.'],
    muchi:['Muchi',{arquero:true,piel:'palida',pelo:'negro',w:40,jaw:30,h:56,ojo:5.5,ceja:4,nariz:1.3,corte:'corto',vol:1,anteojos:'redondos',gesto:'grin',boca:15,cuerpo:'flaco',pose:'corre',gag:'corre',remera:'lisa'},'Blanco como si nunca hubiera visto el sol. Arquero que sale jugando y se corre toda la cancha: a veces termina en gol y a veces, en gol en contra.'],
    mark:['Mark',Object.assign({},PLANTEL.gol[3].o,{remera:'lisa',gag:'penal',pose:'señala',extra:null,largoBarba:16}),'Cocho en La Escuelita: ponía bien el cuerpo, pisaba la pelota y le pegaba fuerte y con dirección, de puntín.'],
    sora:['Sora',{piel:'clara',pelo:'castano',w:54,jaw:50,h:50,ojo:6,ceja:6,cejaEnojo:6,nariz:1.3,barba:'corta',largoBarba:4,corte:'corto',vol:3,flequillo:'recto',gesto:'grita',boca:10,vapor:true,pose:'señala',remera:'lisa',manga:INK,globo:['¡ADENTRO!',76,38,104]},'Flequillo, cachetes y la cara roja: a Sora lo calentaron. Señala al rival y le pasa todo lo que tiene encima.'],
    golzalez:['Golzález',{piel:'clara',pelo:'negro',w:44,jaw:34,h:54,ojo:6,ceja:5,nariz:1.4,barba:'corta',largoBarba:2,corte:'ondas',vol:14,anteojos:'rectos',venda:true,gesto:'canchero',boca:12,pose:'binoculares',remera:'españa'},'Rulos, barbita corta y la venda de cuando lo empujaron contra la reja. Se sabe a todos los jugadores de memoria: los vio por la tele.'],
    fer:['Fer',{piel:'clara',pelo:'rubio',w:52,jaw:46,h:50,ojo:6.5,ceja:3,nariz:1.1,corte:'corto',vol:6,gesto:'sonrisa',boca:12,cachetes:true,pose:'pizarra',remera:'lisa'},'Cara redonda y sonrisa tranquila. El jugador correcto: callado, siempre bien parado y sin equivocarse nunca.'],
    juambo:['Juambo',{piel:'clara',pelo:'oscuro',w:42,jaw:30,h:58,ojo:6,ceja:4.5,cejaAlta:2,nariz:1.4,barba:'candado',bigote:'fino',corte:'corto',vol:3,rodete:true,gesto:'canchero',boca:11,mono:true,pose:'valija',gag:'jet',remera:'lisa'},'Pelo largo atado en rodete, bigote con chivita y moño: el más elegante de La Escuelita viaja en jet privado.'],
    gaspi:['Gaspi',{piel:'clara',pelo:'negro',w:46,jaw:38,h:54,ojo:6,ceja:5.5,cejaEnojo:2.5,nariz:1.3,barba:'sombra',corte:'corto',vol:5,gesto:'firme',boca:10,cuerpo:'musculoso',pose:'tarjeta',remera:'lisa'},'Peleador de MMA, marcado hasta las cejas y con el fade recién hecho. Con Gaspi no se discute: la roja la saca él.'],
    pancho:['Pancho',Object.assign({},{piel:'palida',pelo:'colorado',w:42,jaw:32,h:56,ceja:4,nariz:1.35,corte:'corto',vol:2,flequillo:'lado',gesto:'grin',boca:13,pose:'corre',gag:'corre',remera:'lisa'}),'Sin foto: dibujado como Piolo, pero sin barba. Encuentra la cancha libre y se va por el medio.']
  };
  // Un Beneficio de cada uno: el mazo no repite (v6)
  var BENEF=[
    ['Movimiento','Cambio de Táctica',1,'Después de tirar, elegí con qué dado mover.','fer'],
    ['Movimiento','Equipo que gana no se toca',1,'Después de tirar, podés no mover tu cono.','capitano'],
    ['Movimiento','Contraataque',1,'Después de tirar, mové la suma de los dos dados.','piolo'],
    ['Movimiento','Cancha Libre',1,'Este turno tu cono puede pasar por encima de conos y Barrabravas.','pancho'],
    ['Movimiento','Arquero Volador',1,'Después de tirar, mové una intersección más o una menos de lo que marca el dado blanco.','muchi'],
    ['Movimiento','Jet Privado',1,'En vez de mover, poné tu cono en cualquier intersección libre o, si ya cumplís todo para ganar, levantá la Copa en el centro del Palco.','juambo'],
    ['Recursos','Recurso Extra',1,'Tomá del Banco 1 Recurso a elección.',null,'extra'],
    ['Recursos','Intercambio 1:2',1,'Devolvé 1 Recurso al Banco y tomá 2 a elección.',null,'unoauno'],
    ['Recursos','Asistencia Forzosa',1,'Robale 1 Recurso al azar a cada DT.',null,'asistencia'],
    ['Recursos','Alargue',1,'Tirá el dado azul y cobrás solo vos: si tu cono toca un hexágono de ese número, levantás el doble. Si no, nada.','m'],
    ['Recursos','Barrida',1,'Elegí un DT y nombrá un Recurso: te llevás todos los que tenga de ese tipo. Si no tiene, perdiste el Beneficio.',null,'barrida'],
    ['Dados','Penal Burdo',1,'Tirá un dado. Con 4, 5 o 6, tomá un Token de Victoria del Banco. Con 1, 2 o 3, lo atajaron.','mark'],
    ['Dados','Penal Dudoso',1,'Tirá un dado. Con 4, 5 o 6, tomá un Token de Efectivo del Banco. Con 1, 2 o 3, lo atajaron.',null,'dudoso'],
    ['Multas','Amnistía',1,'Hacé un canje o un intercambio como si no tuvieras Multas. Vale para una sola operación.',null,'amnistia'],
    ['Multas','Amigo del Poder',1,'Devolvé todas tus Multas sin pagarlas.',null,'exento'],
    ['Multas','La Tenés Adentro',1,'Pasale todas tus Multas a otro DT (hasta llegar a su límite de 5).','sora'],
    ['Tokens','La Mano de Dios',1,'Tomá 1 Token de Victoria del Banco.','tai'],
    ['Tokens','Petrodólares',1,'Tomá 1 Token de Efectivo del Banco.',null,'petro'],
    ['Tokens','Valor por Valor',1,'Cambiá con el Banco 1 Token tuyo por uno del otro tipo.',null,'valorxvalor'],
    ['Tokens','Intercambio de Valores',1,'Cambiale a otro DT 1 Token tuyo por uno suyo del otro tipo. No se puede negar.',null,'intvalores'],
    ['Rivales','Espionaje',1,'Mirá en secreto las cartas de un Mercado de Pases.','golzalez'],
    ['Rivales','Cambio de Figuritas',1,'Elegí un DT que tenga un Jugador de una posición que vos también tenés: se cambian esos dos Jugadores.','teo'],
    ['Rivales','Dame un Beneficio',1,'Robale al azar 1 Beneficio sin usar a otro DT.',null,'dame'],
    ['Rivales','Tarjeta Roja',1,'Elegí un DT: en su próximo turno no mueve su cono.','gaspi'],
    ['Barras','Gas Pimienta',1,'Reubicá a todos los Barrabravas en intersecciones libres de la Circunvalación o de la Peatonal. No se usa con 2 DTs.',null,'gas'],

    ['Barras','Sospechoso Arreglo',1,'Este turno movés los Barrabravas antes que tu cono.',null,'arreglo']
  ];
  function lineas(txt,max){var L=[],cur='';txt.split(' ').forEach(function(p){if(cur&&(cur+' '+p).length>max){L.push(cur);cur=p;}else cur=cur?cur+' '+p:p;});L.push(cur);return L;}
  function cartaBen(b,i){
    var cat=b[0], nom=b[1], cant=b[2], txt=b[3], q=b[4]?ESC[b[4]]:null, zz=U('zz'), cl=U('cl');
    var s='<svg viewBox="0 0 410 630" role="img" aria-label="Carta de Beneficio '+nom+(q?', protagonizada por '+q[0]:'')+'">';
    s+='<defs><pattern id="'+zz+'" width="44" height="22" patternUnits="userSpaceOnUse"><path d="M-2 18L10 6L22 18L34 6L46 18" fill="none" stroke="'+CREMA+'" stroke-width="5" opacity=".14"/></pattern><clipPath id="'+cl+'"><rect x="22" y="62" width="366" height="330" rx="14"/></clipPath></defs>';
    s+='<rect x="3" y="3" width="404" height="624" rx="24" fill="'+ROJO+'" stroke="'+INK+'" stroke-width="5"/><rect x="3" y="3" width="404" height="624" rx="24" fill="url(#'+zz+')"/>';
    s+='<text x="26" y="46" font-family="Bowlby One SC, sans-serif" font-size="26" letter-spacing="1" fill="'+CREMA+'">BENEFICIO</text><text x="384" y="44" text-anchor="end" font-family="Courier Prime, monospace" font-weight="700" font-size="16" letter-spacing="2" fill="'+CREMA+'">'+cat.toUpperCase()+'</text>';
    var inner=q?figura('escuelita',Object.assign({zoom:.84,dy:-32},q[1])):fondo('escuelita',{w:i+3,h:i+5})+'<g class="fig g-dibujo" style="transform-origin:100px 90px"><g transform="translate(0 4)">'+ILUS[b[5]]()+'</g></g>';
    s+='<g clip-path="url(#'+cl+')"><svg x="22" y="62" width="366" height="330" viewBox="0 0 200 180" preserveAspectRatio="xMidYMid slice">'+inner+'</svg></g>';
    s+='<rect x="22" y="62" width="366" height="330" rx="14" fill="none" stroke="'+INK+'" stroke-width="5"/>';
    if(q) s+='<g transform="translate('+(368-q[0].length*8.5)+' 98) rotate(6)"><rect x="'+(-q[0].length*8.5-12)+'" y="-17" width="'+(q[0].length*17+24)+'" height="34" rx="4" fill="'+CREMA+'" opacity=".95" stroke="'+INK+'" stroke-width="3"/><text x="0" y="9" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="21" fill="'+ROJO+'">'+q[0].toUpperCase()+'</text></g>';
    s+='<rect x="22" y="402" width="366" height="186" rx="14" fill="'+CREMA+'" stroke="'+INK+'" stroke-width="4"/>';
    var fs=Math.max(19,Math.min(32,Math.floor(470/nom.length))), L=lineas(txt,30), y0=482;
    s+='<text x="205" y="'+(434+fs*.2)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="'+fs+'" fill="'+INK+'">'+nom+'</text>';
    var fl=L.length>4?18.5:21, st=L.length>4?22:26;
    s+=L.map(function(l,ix){return '<text x="205" y="'+(y0+ix*st)+'" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-size="'+fl+'" fill="#3b342b">'+l+'</text>';}).join('');
    s+='<g transform="translate(28 594) scale(.28)">'+badge('suerte')+'</g><g transform="translate(58 594) scale(.28)">'+badge('fans')+'</g>';
    s+='<text x="205" y="614" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="14" letter-spacing="2" fill="'+CREMA+'">'+'LIGA PEXA · T1'+'</text>';
    if(cant>1) s+='<text x="384" y="614" text-anchor="end" font-family="Bowlby One SC, sans-serif" font-size="18" fill="'+CREMA+'">×'+cant+'</text>';
    return s+'</svg>';
  }
  var DT_FIG={
    abuelo:{c1:'#f2efe8',o:{piel:'clara',pelo:'canas',colorBarba:'canas',w:46,jaw:40,h:52,ojo:5.5,ceja:5.5,nariz:1.45,barba:'llena',largoBarba:6,bigote:'grueso',corte:'entradas',vol:0,anteojos:'redondos',gesto:'sonrisa',boca:11,pose:'cruzados'}},
    mister:{c1:'#26272b',o:{piel:'clara',pelo:'canas',colorBarba:'canas',w:44,jaw:38,h:54,ojo:6,ceja:5,cejaAlta:3,nariz:1.3,barba:'llena',largoBarba:4,bigote:'grueso',corte:'pelado',vol:0,gesto:'canchero',boca:12,corbata:'#7b4fa0',pose:'cruzados'}},
    dona:{c1:'#e0609a',o:{piel:'media',pelo:'negro',w:38,jaw:27,h:54,bot:116,cintura:152,cuerpo:'flaco',ojo:8,iris:'#4f9a56',irisMiel:'#c8923a',ceja:3,cejaEnojo:2,nariz:1.05,corte:'largo',vol:5,gesto:'firme',boca:10,silbato:true,pose:'señala',gag:'sushi',palitos:true}},
    loco:{c1:'#7b4fa0',o:{piel:'clara',pelo:'gris',colorBarba:'gris',w:46,jaw:38,h:52,ojos:'felices',ojo:7,ceja:5,cejaAlta:3,nariz:1.35,corte:'entradas',vol:8,gesto:'grin',boca:22,pose:'arriba'}},
    profe:{c1:'#4fb8d8',o:{piel:'clara',pelo:'castano',w:45,jaw:34,h:52,ojo:7,ceja:4.5,cejaAlta:2,corte:'corto',vol:0,gallo:true,gesto:'mudo',boca:0,silbato:true,pose:'libreta',zoom:.86,globo:['¡PREACCIÓN!',70,44,104]}}
  };
  Object.keys(DT_FIG).forEach(function(id){var d=DT_FIG[id];C['dt_'+id]={nombre:'DT',c1:d.c1,c2:CREMA,fondo:'#efe7d4'};SHORT['dt_'+id]=id==='abuelo'?'#9a958c':INK;BANDA['dt_'+id]=CREMA;});
  function retratoDT(dt){return '<svg x="9" y="5" width="22" height="24" viewBox="45 18 110 120">'+figura('dt_'+dt.id,Object.assign({},DT_FIG[dt.id].o,{gag:null,globo:null,palitos:false}))+'</svg>';}
  // ---------- Tablero ----------
  function P(r,deg){var a=deg*Math.PI/180;return [r*Math.cos(a),r*Math.sin(a)];}
  function pts(list){return list.map(function(p){return n1(p[0])+','+n1(p[1]);}).join(' ');}
  function cen(list){var x=0,y=0;list.forEach(function(p){x+=p[0];y+=p[1];});return [x/list.length,y/list.length];}
  function shrink(list,f,c){c=c||cen(list);return list.map(function(p){return [c[0]+(p[0]-c[0])*f,c[1]+(p[1]-c[1])*f];});}
  var TH=[],A=[],B=[],Cm=[],Cp=[],Dm=[],Dp=[],E=[],F=[];
  // El Palco con una punta arriba: los estadios arrancan arriba a la derecha y siguen en sentido horario
  for(var i=0;i<5;i++){var t=-54+72*i;TH.push(t);A.push(P(50,t+36));B.push(P(105,t+36));Cm.push(P(135,t-14));Cp.push(P(135,t+14));Dm.push(P(200,t-15.3));Dp.push(P(200,t+15.3));E.push(P(231,t));F.push(P(215,t+36));}
  function prev(i){return (i+4)%5;}
  var hexIn=[],pent=[],hexOut=[];
  for(var i=0;i<5;i++){var j2=(i+1)%5;hexIn.push([A[prev(i)],A[i],B[i],Cp[i],Cm[i],B[prev(i)]]);pent.push([Cm[i],Cp[i],Dp[i],E[i],Dm[i]]);hexOut.push([B[i],Cp[i],Dp[i],F[i],Dm[j2],Cm[j2]]);}
  // Estadios fijos, en el orden de las caras del Palco. Los predios van al azar (este es un armado de ejemplo, sin vecinos del mismo color).
  var INNER=['gol','suerte','picardia','fans','sponsors'], OUTER=['picardia','fans','sponsors','gol','suerte'];
  var NUMERO={gol:2,suerte:3,picardia:4,fans:5,sponsors:6}, ZNUM=[5,6,2,3,4];
  var ESTADIO={gol:'La Canasta',suerte:'La Fortuna',picardia:'La Astucia',fans:'La Pasión',sponsors:'La Serena'};
  var FORMA_TXT={gol:'porque cuando te hacen muchos goles, te llenaron la canasta: atrás del arco, una canasta llena de pelotas',suerte:'con una herradura en la tribuna y tréboles de cuatro hojas escondidos entre la gente',picardia:'con la tribuna a rayas y un zorro que guiña: el más astuto del barrio',fans:'con trapos, bombo, bengalas y papelitos: la tribuna que nunca deja de cantar',sponsors:'lleva el nombre del sponsor: la entrada es una cabaña con su ventanita y los carteles dicen La Serena'};
  var PREDIO={gol:'Bajo Nono',suerte:'La Serena',picardia:'Banadi',fans:'La Milla',sponsors:'La Canterita'};
  var PREDIO_L={gol:['Bajo Nono'],suerte:['Restaurante','La Serena'],picardia:['Banadi'],fans:['La Milla'],sponsors:['La Canterita']};
  var ZONA=[['Estacionamiento','La Canterita'],['Rotisería','El Chulengo'],['Cementerio','de Rodillas'],['Diario','La Pipeta'],['Oficina','del Sapo']];
  var ZONA_TXT=['cobran una fortuna y te mandan al lado del pantano','el que lo maneja es un delincuente y te vende gato por liebre. Aparte sale carísimo y la comida siempre está seca','donde descansan las rodillas del plantel','el diario de Pipes, usa el micrófono para defenestrar a los jugadores que le sacan la valla invicta','el Sapo te cobra la inscripción por adelantado y te cambia el horario a último momento'];
  var PASTO='#a9d18e', PASTO2='#93c27a', AGUA='#8fc3df', RJ='#c8312b';

  function G(x,y,ang){return '<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+n1(ang||0)+')">';}
  function arbol(x,y,r,tono){
    var v=tono||0;
    return '<ellipse cx="'+n1(x+r*.35)+'" cy="'+n1(y+r*.4)+'" rx="'+n1(r)+'" ry="'+n1(r*.8)+'" fill="#000" opacity=".14"/><circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="'+n1(r)+'" fill="'+(['#4e8a3a','#3f7a35','#5b9a42'][v%3])+'" stroke="#2f5a26" stroke-width=".7"/>'+
      '<circle cx="'+n1(x-r*.3)+'" cy="'+n1(y-r*.3)+'" r="'+n1(r*.5)+'" fill="#78b45a" opacity=".85"/>';
  }
  function auto(x,y,ang,color){return '<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+n1(ang)+')"><rect x="-4.2" y="-2.3" width="8.4" height="4.6" rx="1.4" fill="'+color+'" stroke="'+INK+'" stroke-width=".5"/><rect x="-1" y="-1.8" width="3" height="3.6" rx=".6" fill="#cfe3ee"/></g>';}
  function techo(x,y,w,h,ang,color){return '<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+n1(ang)+')"><rect x="'+n1(-w/2+1.2)+'" y="'+n1(-h/2+1.6)+'" width="'+w+'" height="'+h+'" fill="#000" opacity=".18"/><rect x="'+n1(-w/2)+'" y="'+n1(-h/2)+'" width="'+w+'" height="'+h+'" fill="'+color+'" stroke="'+INK+'" stroke-width=".6"/><path d="M'+n1(-w/2)+' 0H'+n1(w/2)+'" stroke="#000" stroke-width=".6" opacity=".25"/><rect x="'+n1(-w/2)+'" y="'+n1(-h/2)+'" width="'+w+'" height="'+n1(h/2)+'" fill="#fff" opacity=".15"/></g>';}
  // v12: detalles chicos para los predios
  function sombrilla(x,y,r,c1,c2){var s='<circle cx="'+n1(x+1)+'" cy="'+n1(y+1.4)+'" r="'+r+'" fill="#000" opacity=".18"/>';for(var q=0;q<8;q++){var a0=q*45*Math.PI/180,a1=(q+1)*45*Math.PI/180;s+='<path d="M'+n1(x)+' '+n1(y)+'L'+n1(x+r*Math.cos(a0))+' '+n1(y+r*Math.sin(a0))+'L'+n1(x+r*Math.cos(a1))+' '+n1(y+r*Math.sin(a1))+'Z" fill="'+(q%2?c2:c1)+'" stroke="'+INK+'" stroke-width=".3"/>';}return s+'<circle cx="'+n1(x)+'" cy="'+n1(y)+'" r=".7" fill="'+INK+'"/>';}
  function personita(x,y,c){return '<circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="1.6" fill="'+c+'" stroke="'+INK+'" stroke-width=".3"/><circle cx="'+n1(x)+'" cy="'+n1(y-.2)+'" r=".85" fill="#e8c39e" stroke="'+INK+'" stroke-width=".2"/>';}
  function gente(rd,n,x0,y0,w,h){var s='',cs=['#e05a4f','#3f6aa6','#f2c94c','#fff','#4d7a3a','#d4692a'];for(var q=0;q<n;q++)s+=personita(x0+rd()*w,y0+rd()*h,cs[Math.floor(rd()*6)]);return s;}
  function mesita(x,y){var s='';[[0,-3.2],[3.2,0],[0,3.2],[-3.2,0]].forEach(function(p){s+='<rect x="'+n1(x+p[0]-1)+'" y="'+n1(y+p[1]-1)+'" width="2" height="2" rx=".4" fill="#a37c52" stroke="'+INK+'" stroke-width=".25"/>';});return s+'<circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="2.3" fill="#fbf8f1" stroke="'+INK+'" stroke-width=".4"/>';}
  function bici(x,y,c){return '<g transform="translate('+n1(x)+' '+n1(y)+')" fill="none" stroke="'+INK+'" stroke-width=".4"><circle cx="-2.6" r="1.8"/><circle cx="2.6" r="1.8"/><path d="M-2.6 0L-.6-2.6H2L2.6 0M-.6-2.6L0 0" stroke="'+c+'" stroke-width=".7"/></g>';}
  function banderines(x0,y0,x1,y1,n){var s='<path d="M'+n1(x0)+' '+n1(y0)+'Q'+n1((x0+x1)/2)+' '+n1((y0+y1)/2+3)+' '+n1(x1)+' '+n1(y1)+'" fill="none" stroke="'+INK+'" stroke-width=".3"/>',cs=['#e05a4f','#f2c94c','#3f6aa6','#fff','#4d7a3a'];
    for(var q=1;q<n;q++){var t=q/n,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t+3*4*t*(1-t)*.5;s+='<path d="M'+n1(x-1.1)+' '+n1(y)+'h2.2l-1.1 2.2z" fill="'+cs[q%5]+'" stroke="'+INK+'" stroke-width=".2"/>';}return s;}
  function cartelito(x,y,w,txt,fondo,tinta){return '<path d="M'+n1(x)+' '+n1(y+2.6)+'v5" stroke="'+INK+'" stroke-width=".8"/><rect x="'+n1(x-w/2)+'" y="'+n1(y-2.6)+'" width="'+w+'" height="5.2" rx=".8" fill="'+fondo+'" stroke="'+INK+'" stroke-width=".5"/><text x="'+n1(x)+'" y="'+n1(y+1.3)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="3.4" fill="'+tinta+'">'+txt+'</text>';}
  function canchita(x,y,ang,w,h,tierra){
    var s='<g transform="translate('+n1(x)+' '+n1(y)+') rotate('+n1(ang)+')"><rect x="'+(-w/2)+'" y="'+(-h/2)+'" width="'+w+'" height="'+h+'" fill="#5ea85a"/>';
    for(var k=0;k<6;k+=2){s+='<rect x="'+n1(-w/2+k*w/6)+'" y="'+(-h/2)+'" width="'+n1(w/6)+'" height="'+h+'" fill="#56a052"/>';}
    s+='<g fill="none" stroke="#fff" stroke-width=".8"><rect x="'+n1(-w/2+1.5)+'" y="'+n1(-h/2+1.5)+'" width="'+(w-3)+'" height="'+(h-3)+'"/><path d="M0 '+n1(-h/2+1.5)+'V'+n1(h/2-1.5)+'"/><circle r="'+n1(h/6)+'"/><rect x="'+n1(-w/2+1.5)+'" y="'+n1(-h/4)+'" width="'+n1(w/7)+'" height="'+n1(h/2)+'"/><rect x="'+n1(w/2-1.5-w/7)+'" y="'+n1(-h/4)+'" width="'+n1(w/7)+'" height="'+n1(h/2)+'"/></g>';
    s+='<rect x="'+n1(-w/2-1.4)+'" y="-2.5" width="1.4" height="5" fill="#fff"/><rect x="'+n1(w/2)+'" y="-2.5" width="1.4" height="5" fill="#fff"/></g>';
    return s;
  }
  function rotP(x,y,dx,dy,ang){var a=ang*Math.PI/180;return [x+dx*Math.cos(a)-dy*Math.sin(a),y+dx*Math.sin(a)+dy*Math.cos(a)];}
  function rotulo(x,y,arr,fs,sub){
    var s='', y0=y-(arr.length-1)*fs*.52-(sub?fs*.4:0);
    arr.forEach(function(t,i){s+='<text x="'+n1(x)+'" y="'+n1(y0+i*fs*1.04+fs*.36)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="'+fs+'" fill="'+INK+'" paint-order="stroke" stroke="#fbf8f1" stroke-width="3" stroke-linejoin="round">'+t+'</text>';});
    if(sub) s+='<text x="'+n1(x)+'" y="'+n1(y0+(arr.length-1)*fs*1.04+fs*1.3)+'" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-style="italic" font-weight="700" font-size="'+n1(fs*.66)+'" fill="#4d463c" paint-order="stroke" stroke="#fbf8f1" stroke-width="2.4" stroke-linejoin="round">'+sub+'</text>';
    return s;
  }

  // Estadios: una cancha de verdad, con uno de sus laterales contra el Palco (del otro lado de la Peatonal).
  // Coordenadas locales: el Palco queda abajo (y positiva) y el río arriba, así todo se lee mirando desde el centro.
  function local(list,c,ang){var a=-ang*Math.PI/180,co=Math.cos(a),si=Math.sin(a);return list.map(function(p){var x=p[0]-c[0],y=p[1]-c[1];return [x*co-y*si,x*si+y*co];});}
  function poly(list,attr){return '<polygon points="'+pts(list)+'" '+attr+'/>';}
  var DETALLE={
    gol:function(){ // la canasta llena de pelotas
      var s='<path d="M14.5-17.5H28.5L26.5-8H16.5Z" fill="#c99a5b" stroke="'+INK+'" stroke-width=".7" stroke-linejoin="round"/><path d="M15.5-14H27.5M16-11H27M18.5-17.5L19-8M21.5-17.5V-8M24.5-17.5L24-8" stroke="#9a7040" stroke-width=".5"/>';
      return s+pelota(17.6,-19.4,2.5)+pelota(21.5,-20.6,2.5)+pelota(25.3,-19.3,2.5)+pelota(19.6,-22.6,2.2)+pelota(23.6,-22.8,2.2);
    },
    suerte:function(){ // herradura dorada
      var s='<path d="M16.5-20V-14.5a4.5 4.5 0 0 0 9 0V-20" fill="none" stroke="'+INK+'" stroke-width="3.6" stroke-linecap="round"/><path d="M16.5-20V-14.5a4.5 4.5 0 0 0 9 0V-20" fill="none" stroke="#e2bd57" stroke-width="2.2" stroke-linecap="round"/>';
      [[16.5,-17.5],[16.8,-13.5],[25.5,-17.5],[25.2,-13.5],[21,-10.1]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r=".45" fill="'+INK+'"/>';});
      return s;
    },
    picardia:function(){ // el zorro que guiña
      var s='<path d="M14.5-21L17.5-14.5L21-8L24.5-14.5L27.5-21L23.2-16.8H18.8Z" fill="#d97a2b" stroke="'+INK+'" stroke-width=".7" stroke-linejoin="round"/>';
      s+='<path d="M18-13.2L21-8L24-13.2Q21-11.6 18-13.2Z" fill="#fbf3dc"/><circle cx="21" cy="-8.7" r=".9" fill="'+INK+'"/>';
      s+='<circle cx="18.9" cy="-14.6" r=".8" fill="'+INK+'"/><path d="M22.3-14.6q.9-.9 1.8 0" fill="none" stroke="'+INK+'" stroke-width=".6" stroke-linecap="round"/>';
      return s;
    },
    fans:function(){ // el bombo
      var s='<rect x="15.5" y="-18.5" width="11" height="8" fill="#d4692a" stroke="'+INK+'" stroke-width=".7"/><path d="M15.5-18.5l2.75 8 2.75-8 2.75 8 2.75-8" fill="none" stroke="'+CREMA+'" stroke-width=".6"/>';
      s+='<ellipse cx="21" cy="-18.5" rx="5.5" ry="1.6" fill="#f3ead6" stroke="'+INK+'" stroke-width=".6"/><path d="M27-22.5L23.5-19.5M14.5-23L18-19.8" stroke="#8a5a32" stroke-width=".8" stroke-linecap="round"/><circle cx="27.3" cy="-22.8" r="1" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".4"/><circle cx="14.2" cy="-23.3" r="1" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".4"/>';
      return s;
    },
    sponsors:function(){ // la entrada con forma de cabaña, con su ventanita, y la tetera
      var s='<g transform="translate(20 -8.5) scale(.5)"><path d="M-11 0L0-17L11 0Z" fill="#b07a48"/><rect x="-3.4" y="-9.5" width="6.8" height="4.4" fill="#f2d27a" stroke="'+INK+'" stroke-width=".9"/>'+
        '<path d="M-19 0L0-29L19 0Q17-2 15 0T11 0L0-17L-11 0Q-13-2-15 0T-19 0Z" fill="#23402e" stroke="'+INK+'" stroke-width="1.2" stroke-linejoin="round"/></g>';
      s+='<g transform="translate(28 -10) scale(.42)"><ellipse cx="0" cy="-1" rx="7" ry="6" fill="#2f7a4a" stroke="'+INK+'" stroke-width="1.4"/><path d="M-6 0Q-12-1-13-6" fill="none" stroke="#2f7a4a" stroke-width="2.4"/><circle cx="0" cy="-8" r="1.6" fill="'+DORADO+'"/></g>';
      return s;
    }
  };
  function estadio(i){
    var k=INNER[i], c=C[k], hx=hexIn[i], ce=cen(hx), ang=TH[i]+90, hl=local(hx,ce,ang), fg=k==='picardia'?INK:CREMA, rd=azar(40+i);
    var bowl=shrink(hl,.9,[0,0]), id=U('bw'), s=G(ce[0],ce[1],ang);
    s+=poly(hl,'fill="'+PASTO2+'"')+poly(shrink(hl,.95,[0,0]),'fill="'+PASTO+'"');
    // la tribuna, en los colores del club
    s+=poly(bowl,'fill="#000" opacity=".2" transform="translate(1.2 1.6)"')+poly(bowl,'fill="'+c.c1+'" stroke="'+INK+'" stroke-width="1.4" stroke-linejoin="round"');
    s+='<defs><clipPath id="'+id+'"><polygon points="'+pts(bowl)+'"/></clipPath></defs><g clip-path="url(#'+id+')">';
    if(k==='picardia') for(var a=0;a<360;a+=14) s+=poly([[0,0],P(90,a),P(90,a+7)],'fill="'+INK+'" opacity=".8"');
    [.8,.7,.6].forEach(function(f){s+=poly(shrink(hl,f,[0,0]),'fill="none" stroke="'+(k==='picardia'?'#f6e8bb':c.fondo)+'" stroke-width="1" stroke-dasharray="1.4 1" opacity=".55"');});
    // la gente
    for(var q=0;q<150;q++){var px=-60+rd()*120, py=-46+rd()*84; s+='<circle cx="'+n1(px)+'" cy="'+n1(py)+'" r=".85" fill="'+['#fff',INK,'#f2c94c','#e05a4f',fg][Math.floor(rd()*5)]+'"/>';}
    if(k==='suerte') [[-40,6],[38,12],[-34,-20],[36,-24],[-12,-6]].forEach(function(p){s+=trebol(p[0],p[1],.11,'#e2bd57');});
    if(k==='fans'){
      [[-41,8],[-41,20],[41,8],[41,20],[-16,-7],[10,-7]].forEach(function(p,q){s+='<rect x="'+(p[0]-2.6)+'" y="'+(p[1]-3)+'" width="5.2" height="6" fill="'+(q%2?CREMA:'#d4692a')+'" stroke="'+INK+'" stroke-width=".4"/><path d="M'+(p[0]-2.6)+' '+p[1]+'h5.2" stroke="'+(q%2?'#d4692a':CREMA)+'" stroke-width="1.2"/>';});
      [[-44,-6],[44,-10],[-30,-26],[30,-28]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.6" fill="#ff7a4a" opacity=".35"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.4" fill="#ffd25a"/>';});
      for(var q=0;q<40;q++) s+='<rect x="'+n1(-50+rd()*100)+'" y="'+n1(-40+rd()*42)+'" width="1.2" height=".8" fill="#fff" transform="rotate('+Math.floor(rd()*90)+')"/>';
    }
    s+='</g>'+poly(shrink(hl,.86,[0,0]),'fill="none" stroke="'+fg+'" stroke-width=".5" opacity=".45"');
    if(k==='sponsors') for(var q=0;q<6;q++){var a2=bowl[q],b2=bowl[(q+1)%6];for(var t=.1;t<.95;t+=.16)s+='<circle cx="'+n1(a2[0]+(b2[0]-a2[0])*t)+'" cy="'+n1(a2[1]+(b2[1]-a2[1])*t)+'" r=".9" fill="#ffe27a" stroke="'+INK+'" stroke-width=".25"/>';}
    // la cancha: el lateral de abajo da a la Peatonal, enfrente del Palco
    s+='<rect x="-31" y="1" width="62" height="38" fill="#4f9a4c"/>'+canchita(0,20,0,54,30);
    s+='<rect x="-26" y="1.4" width="52" height="2.6" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".3"/><text x="0" y="3.35" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="1.9" letter-spacing=".3" fill="#1f3a2b">LA SERENA · LA SERENA · LA SERENA</text>';
    [-29.6,27.4].forEach(function(x){s+='<rect x="'+x+'" y="8" width="2.2" height="24" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".3"/><text transform="translate('+(x+1.6)+' 20) rotate(-90)" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="1.6" fill="#1f3a2b">LA SERENA</text>';});
    [[-37,-1],[37,-1],[-26,-31],[26,-31]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.2" fill="#fff8c8" stroke="'+INK+'" stroke-width=".7"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="1" fill="#fff"/>';});
    // la tribuna de enfrente: escudo, marcador con el ícono del Recurso y un detalle propio
    s+='<rect x="-29.5" y="-22" width="17" height="18.5" rx="2" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".6"/><svg x="-28.5" y="-21.3" width="15" height="16.5" viewBox="0 0 100 110">'+escudoClub(k)+'</svg>';
    s+='<path d="M-6-7V-3M6-7V-3" stroke="'+INK+'" stroke-width="1.2"/><rect x="-10" y="-21" width="20" height="14.5" rx="1.4" fill="#1d1b19" stroke="'+INK+'" stroke-width=".8"/><rect x="-8.6" y="-19.6" width="17.2" height="11.7" rx=".8" fill="none" stroke="'+c.c1+'" stroke-width=".6"/>';
    // v18: en vez de repetir el escudo, el marcador muestra el nombre de la cancha y un resultado
    s+='<text x="0" y="-15.6" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="2.5" fill="#ffd66b">'+({gol:'CANASTA',suerte:'FORTUNA',picardia:'ASTUCIA',fans:'PASIÓN',sponsors:'LA SERENA'})[k]+'</text><text x="0" y="-10" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="5.6" fill="#6ff07a">'+({gol:'9-0',suerte:'1-0',picardia:'1-0',fans:'2-2',sponsors:'3-1'})[k]+'</text>';
    s+=DETALLE[k]();
    // el número va en el círculo central de la cancha, pero se dibuja arriba del filtro (en dibujarTablero) para que tenga el mismo blanco que los demás
    // el nombre, en el techo de la tribuna
    s+='<rect x="-28" y="-36.6" width="56" height="11.4" rx="2.2" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="1"/><rect x="-26.6" y="-35.2" width="53.2" height="8.6" rx="1.4" fill="none" stroke="'+fg+'" stroke-width=".4" opacity=".7"/>';
    s+='<text x="0" y="-32" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="2.6" letter-spacing=".6" fill="'+fg+'">ESTADIO</text><text x="0" y="-27.1" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="5.2" fill="'+fg+'">'+ESTADIO[k].toUpperCase()+'</text>';
    return s+'</g>';
  }

  // El Palco: cinco caras, cada una es la tribuna de un estadio. En el centro, el lugar del campeón
  function palco(){
    var W=[];for(var i=0;i<5;i++) W.push(P(33,TH[i]+36));
    var s='<polygon points="'+pts(shrink(W,1.5,[0,0]))+'" fill="#000" opacity=".18" transform="translate(2 3)"/>';
    for(var i=0;i<5;i++){
      var a=W[prev(i)], b=W[i], k=INNER[i];
      var a3=[a[0]*1.5,a[1]*1.5], b3=[b[0]*1.5,b[1]*1.5], fg=k==='picardia'?INK:CREMA;
      s+='<polygon points="'+pts([a,b,b3,a3])+'" fill="'+C[k].c1+'" stroke="'+INK+'" stroke-width="1"/>';
      [1.12,1.24,1.36].forEach(function(f){var p1=[(a[0]+(b[0]-a[0])*.12)*f,(a[1]+(b[1]-a[1])*.12)*f], p2=[(a[0]+(b[0]-a[0])*.88)*f,(a[1]+(b[1]-a[1])*.88)*f];
        s+='<path d="M'+n1(p1[0])+' '+n1(p1[1])+'L'+n1(p2[0])+' '+n1(p2[1])+'" stroke="'+fg+'" stroke-width="2.2" stroke-dasharray="2.4 1.2" opacity=".75"/>';});
    }
    s+='<polygon points="'+pts(W)+'" fill="#9fd0e6" stroke="'+INK+'" stroke-width="1.2"/>';
    var R=shrink(W,.78,[0,0]);
    for(var i=0;i<5;i++) s+='<polygon points="'+pts([[0,0],R[prev(i)],R[i]])+'" fill="'+C[INNER[i]].c1+'" stroke="'+INK+'" stroke-width=".6"/>';
    // cinco pasillos, de cada esquina de la Peatonal al centro: por ahí se entra a ganar
    for(var i=0;i<5;i++){var p1=P(12,TH[i]+36), p2=P(44,TH[i]+36), d='M'+n1(p1[0])+' '+n1(p1[1])+'L'+n1(p2[0])+' '+n1(p2[1]);
      s+='<path d="'+d+'" stroke="#a9825c" stroke-width="7.4"/><path d="'+d+'" stroke="#e8c98f" stroke-width="6"/><path d="'+d+'" stroke="'+DORADO+'" stroke-width="1" stroke-dasharray="1.6 1.6"/>';}
    s+='<circle r="12.6" fill="#000" opacity=".2" transform="translate(1 1.4)"/><circle r="12.6" fill="#f6e7b0" stroke="'+DORADO+'" stroke-width="2.6"/><circle r="12.6" fill="none" stroke="'+INK+'" stroke-width=".7"/><circle r="9" fill="none" stroke="'+DORADO+'" stroke-width=".7" stroke-dasharray="1.2 1"/>';
    // v14: el trofeo, para que no se confunda con el Token de Victoria
    s+='<g stroke="#8a6a25" stroke-linejoin="round"><path d="M-5.2-5.6H-8C-8-2-6.4-.4-4.2 0M5.2-5.6H8C8-2 6.4-.4 4.2 0" fill="none" stroke-width="1.2"/><path d="M-5.4-7.4H5.4V-3C5.4 .6 2.8 2.6 1.2 3.2V5.2H3.6V7.6H-3.6V5.2H-1.2V3.2C-2.8 2.6-5.4 .6-5.4-3Z" fill="#e2bd57" stroke-width=".7"/><path d="M-3.2-6V-2.6" fill="none" stroke="#fff6d8" stroke-width="1.1" stroke-linecap="round"/></g>';
    return s;
  }

  // Senderos: los bordes de todas las áreas, por donde caminan los conos (antes: avenida, peatonal, rambla y secundarias)
  var SEC=[],AVE=[],RAM=[],PEA=[];
  for(var i=0;i<5;i++){var j=(i+1)%5;
    PEA.push([A[i],A[j]]);
    AVE.push([Cm[i],Cp[i]],[Cp[i],B[i]],[B[i],Cm[j]]);
    RAM.push([Dm[i],E[i]],[E[i],Dp[i]],[Dp[i],F[i]],[F[i],Dm[j]]);
    SEC.push([A[i],B[i]],[Cm[i],Dm[i]],[Cp[i],Dp[i]]);
  }
  function linea(sg,off){var a=sg[0],b=sg[1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.sqrt(dx*dx+dy*dy),nx=-dy/l*(off||0),ny=dx/l*(off||0);
    return 'M'+n1(a[0]+nx)+' '+n1(a[1]+ny)+'L'+n1(b[0]+nx)+' '+n1(b[1]+ny);}
  function enCalle(sg,t,off){var a=sg[0],b=sg[1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.sqrt(dx*dx+dy*dy);
    return [a[0]+dx*t-dy/l*(off||0),a[1]+dy*t+dx/l*(off||0),Math.atan2(dy,dx)*180/Math.PI];}
  function calles(rd){
    // v11: senderos blancos con los detalles en grises, iguales en todo el tablero: cordón, línea punteada al medio, tapas de alcantarilla y rejillas
    var all=[].concat(SEC,AVE,RAM,PEA), d=all.map(function(sg){return linea(sg);}).join(''), dl=all.map(function(sg){return linea(sg,2.7)+linea(sg,-2.7);}).join(''), h='';
    h+='<path d="'+d+'" stroke="#000" stroke-width="10.4" stroke-linecap="round" fill="none" opacity=".18" transform="translate(.8 1.2)"/><path d="'+d+'" stroke="'+INK+'" stroke-width="9.6" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#9b9b9b" stroke-width="8.2" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="#fbfbf9" stroke-width="6.6" stroke-linecap="round" fill="none"/>';
    h+='<path d="'+dl+'" stroke="#d6d6d6" stroke-width=".35" fill="none"/><path d="'+d+'" stroke="#bdbdbd" stroke-width=".5" stroke-dasharray="2.4 2.2" fill="none"/>';
    all.forEach(function(sg,ix){var p=enCalle(sg,.3+rd()*.4,(ix%2?1.6:-1.6));
      h+=ix%3?'<circle cx="'+n1(p[0])+'" cy="'+n1(p[1])+'" r="1.1" fill="#ececec" stroke="#a5a5a5" stroke-width=".3"/><path d="M'+n1(p[0]-.7)+' '+n1(p[1])+'h1.4" stroke="#b5b5b5" stroke-width=".25"/>':'<g transform="translate('+n1(p[0])+' '+n1(p[1])+') rotate('+n1(p[2])+')"><rect x="-1.2" y="-.7" width="2.4" height="1.4" fill="#e3e3e3" stroke="#9f9f9f" stroke-width=".25"/><path d="M-.6-.7v1.4M0-.7v1.4M.6-.7v1.4" stroke="#9f9f9f" stroke-width=".2"/></g>';});
    return h;
  }

  function estrella(x,y,r){var d='';for(var q=0;q<10;q++){var a=(-90+q*36)*Math.PI/180,rr=q%2?r*.45:r;d+=(q?'L':'M')+n1(x+rr*Math.cos(a))+' '+n1(y+rr*Math.sin(a));}return d+'Z';}
  // Números del tablero, todos con el mismo dibujo. Hexágonos: el disco en el color de su Recurso. Zonas de mala fama: disco negro con el número blanco.
  // v12: más grandes y con más contraste: aro blanco y borde negro alrededor del disco, y el número en el mismo blanco en todo el tablero
  var NB='#fbf8f1';
  function numDisco(x,y,fill,n){
    return '<circle cx="'+n1(x+1)+'" cy="'+n1(y+1.5)+'" r="17.6" fill="#000" opacity=".3"/><circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="17.6" fill="'+NB+'" stroke="'+INK+'" stroke-width="1.4"/><circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="14.6" fill="'+fill+'" stroke="'+INK+'" stroke-width="1.4"/>'+
      '<text x="'+n1(x)+'" y="'+n1(y+8.3)+'" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="23.5" fill="'+NB+'" stroke="'+INK+'" stroke-width="2.4" paint-order="stroke" stroke-linejoin="round">'+n+'</text>';
  }
  function numHex(k,x,y){return numDisco(x,y,C[k].c1,NUMERO[k]);}
  function numZona(n,x,y){return numDisco(x,y,'#111',n);}
  // Texto que se lee mirando desde el centro del tablero: la parte de arriba de las letras apunta hacia afuera
  function rotCentro(x,y,an){var a=an*Math.PI/180; if(Math.sin(a)*x-Math.cos(a)*y<0) an+=180; return an;}
  // Boletería de cada club (v9): va afuera del predio, sobre el río, en la punta que da a la Rambla. Acá, los colores y el frente de cada club.
  // (techo, pared y frente se usan en boleteriaDib)
  var BOLE={
    gol:{techo:'#3f6aa6',pared:CREMA,frente:function(){return '<rect x="-20" y="-1.2" width="40" height="3" fill="#3f6aa6"/>';},punta:function(){return pelota(0,-16.6,2.2);}},
    suerte:{techo:'#4d7a3a',pared:'#efe2b8',frente:function(){return '<rect x="-20" y="6.4" width="40" height="2.6" fill="#4d7a3a"/>'+trebol(-16.5,3.4,.07,'#4d7a3a')+trebol(16.5,3.4,.07,'#4d7a3a');},punta:function(){return '<path d="M-2.4-14.2V-17a2.4 2.4 0 0 1 4.8 0v2.8" fill="none" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/><path d="M-2.4-14.2V-17a2.4 2.4 0 0 1 4.8 0v2.8" fill="none" stroke="#e2bd57" stroke-width=".9" stroke-linecap="round"/>';}},
    picardia:{techo:INK,pared:'#d9a61c',frente:function(){var s='';for(var x=-17;x<20;x+=7)s+='<rect x="'+x+'" y="-4" width="3.5" height="13" fill="'+INK+'"/>';return s;},punta:function(){return '<path d="M-3.4-18.4L-2-15.6L0-14.4L2-15.6L3.4-18.4L1.4-17H-1.4Z" fill="#d97a2b" stroke="'+INK+'" stroke-width=".4" stroke-linejoin="round"/>';}},
    fans:{techo:'#d4692a',pared:CREMA,frente:function(){var s='<path d="M-20-3.4Q0 .4 20-3.4" fill="none" stroke="'+INK+'" stroke-width=".35"/>';for(var q=0;q<7;q++){var x=-18+q*6;s+='<path d="M'+(x-1.6)+' '+n1(-3.2+Math.sin((q+.5)/7*Math.PI)*1.9)+'h3.2l-1.6 3z" fill="'+(q%2?'#d4692a':CREMA)+'" stroke="'+INK+'" stroke-width=".3"/>';}return s;},punta:function(){return '<rect x="-2.6" y="-18.4" width="5.2" height="3.8" fill="#d4692a" stroke="'+INK+'" stroke-width=".4"/><path d="M-2.6-18.4l1.3 3.8 1.3-3.8 1.3 3.8 1.3-3.8" fill="none" stroke="'+CREMA+'" stroke-width=".35"/>';}},
    sponsors:{techo:'#b23f3c',pared:'#d9b25a',frente:function(){var s='';for(var x=-18;x<=18;x+=4)s+='<circle cx="'+x+'" cy="-2.6" r=".7" fill="#ffe27a" stroke="'+INK+'" stroke-width=".2"/>';return s;},punta:function(){return '<g transform="translate(0 -14.6) scale(.2)"><path d="M-11 0L0-17L11 0Z" fill="#b07a48"/><rect x="-3.4" y="-9.5" width="6.8" height="4.4" fill="#f2d27a"/><path d="M-19 0L0-29L19 0Q17-2 15 0T11 0L0-17L-11 0Q-13-2-15 0T-19 0Z" fill="#23402e" stroke="'+INK+'" stroke-width="1.6" stroke-linejoin="round"/></g>';}}
  };

  // Piezas de afuera (v9): cada zona de mala fama viene con su Mercado de Pases y cada predio con su Boletería,
  // las dos con su pedazo de río hasta el borde redondo. Se cortan por la esquina de la Rambla, derecho hacia el agua,
  // y encastran con una pestaña de rompecabezas: las zonas llevan la pestaña y los predios el hueco.
  var RO=299, RS=271, RB=266, RK=262;
  var OUTL=[]; for(var i=0;i<5;i++) OUTL.push(Dm[i],E[i],Dp[i],F[i]);
  function uv(u,v,a){var r=a*Math.PI/180;return [u*Math.cos(r)-v*Math.sin(r),u*Math.sin(r)+v*Math.cos(r)];}
  // la pestaña sobre el corte del ángulo a, de adentro hacia afuera; sg = hacia qué lado sale
  function pestana(a,sg){var l=[[RK-2.3,0],[RK-2.3,2.5]];for(var f=245.3;f>=-65.3;f-=12)l.push([RK+5.5*Math.cos(f*Math.PI/180),7.5+5.5*Math.sin(f*Math.PI/180)]);
    l.push([RK+2.3,2.5],[RK+2.3,0]);return l.map(function(p){return uv(p[0],p[1]*sg,a);});}
  function corte(p,a,sg){return [p].concat(pestana(a,sg),[P(RO,a)]);}
  function arco(a0,a1){var l=[],st=a1>a0?3:-3;for(var a=a0+st;st>0?a<a1-.5:a>a1+.5;a+=st)l.push(P(RO,a));return l;}
  function piezaZona(i){var pg=pent[i],a1=TH[i]+15.3,a0=TH[i]-15.3;return [pg[0],pg[1]].concat(corte(pg[2],a1,1),arco(a1,a0),corte(pg[4],a0,-1).reverse());}
  function piezaPredio(i){var ho=hexOut[i],a1=TH[i]+15.3,a2=TH[i]+56.7;return corte(ho[2],a1,1).concat(arco(a1,a2),corte(ho[4],a2,-1).reverse(),[ho[5],ho[0],ho[1]]);}
  // Boletería (v10): del otro lado de la Rambla, sobre el río, frente a la punta de su predio. Un mostrador largo con tres ventanillas,
  // una enfrente de cada vértice de la punta y con su pasarela hasta la esquina: así se ve que la Boletería abarca las tres. Atrás, la casilla con el mazo de su Recurso.
  var RH=266;
  function sector(r0,r1,a0,a1){return 'M'+pts([P(r1,a0)])+'A'+r1+' '+r1+' 0 0 1 '+pts([P(r1,a1)])+'L'+pts([P(r0,a1)])+'A'+r0+' '+r0+' 0 0 0 '+pts([P(r0,a0)])+'Z';}
  function boleteria(i,k){
    var b=BOLE[k], cl=C[k], a1=TH[i]+15.3, aF=TH[i]+36, a2=TH[i]+56.7, s='';
    var vent=[[a1+4.2,Dp[i]],[aF,F[i]],[a2-4.2,Dm[(i+1)%5]]];
    // las pasarelas, de cada ventanilla a su esquina
    vent.forEach(function(v){var w=P(234,v[0]),d='M'+pts([w])+'L'+pts([v[1]]);s+='<path d="'+d+'" stroke="'+INK+'" stroke-width="8.4" stroke-linecap="round"/><path d="'+d+'" stroke="#c9a77a" stroke-width="6.6" stroke-linecap="round"/><path d="'+d+'" stroke="#a9875c" stroke-width="6.6" stroke-dasharray=".5 2.2"/>';});
    // la casilla del mazo
    var c=P(RH,aF); s+=G(c[0],c[1],aF+90)+boleteriaDib(k)+'</g>';
    // el mostrador, en arco, con las tres ventanillas mirando a la isla
    s+='<path d="'+sector(229,243,a1+1.6,a2-1.6)+'" fill="#000" opacity=".22" transform="translate(1 1.5)"/><path d="'+sector(229,243,a1+1.6,a2-1.6)+'" fill="'+b.pared+'" stroke="'+INK+'" stroke-width="1" stroke-linejoin="round"/><path d="'+sector(239.5,243,a1+1.6,a2-1.6)+'" fill="'+cl.c1+'" stroke="'+INK+'" stroke-width=".6"/>';
    vent.forEach(function(v){var w=P(234.6,v[0]);s+=G(w[0],w[1],v[0]+90)+'<path d="M-5 5.4V-.6a5 4.6 0 0 1 10 0V5.4Z" fill="#9fd0e6" stroke="'+INK+'" stroke-width=".7"/><path d="M0-5.2V5.4" stroke="'+INK+'" stroke-width=".4"/><rect x="-6" y="4.4" width="12" height="2" fill="#a37c52" stroke="'+INK+'" stroke-width=".4"/></g>';});
    return s;
  }
  // v12: el canje, escrito sobre el mostrador para que se lea aunque el mazo tape la casilla. Va arriba del filtro, en crema y negro.
  function canjeMostrador(i,k){
    var a1=TH[i]+15.3, a2=TH[i]+56.7, id=U('cj'), r=243.6, p0=P(r,a1+2.2), p1=P(r,a2-2.2);
    var s='<path d="'+sector(240,247.2,a1+1.6,a2-1.6)+'" fill="#fbf8f1" stroke="'+INK+'" stroke-width=".8"/><path d="'+sector(240,240.9,a1+1.6,a2-1.6)+'" fill="'+C[k].c1+'"/><path d="'+sector(246.3,247.2,a1+1.6,a2-1.6)+'" fill="'+C[k].c1+'"/>';
    s+='<path id="'+id+'" d="M'+pts([p0])+'A'+r+' '+r+' 0 0 1 '+pts([p1])+'" fill="none"/>';
    return s+'<text font-family="Courier Prime, monospace" font-weight="700" font-size="4.1" fill="'+INK+'" dy="1.4"><textPath href="#'+id+'" startOffset="50%" text-anchor="middle">das 2 de <tspan font-family="Bowlby One SC, sans-serif" font-weight="400" font-size="3.9">'+C[k].rec.toUpperCase()+'</tspan> y te llevás 1 a elección</textPath></text>';
  }
  // la casilla del mazo, dibujada con el centro en (0, 0): el techo hacia el río y el mostrador hacia la isla
  function boleteriaDib(k){
    var b=BOLE[k], cl=C[k], s='';
    s+='<path d="M-37.5-22H37.5V24H-37.5Z" fill="#000" opacity=".22" transform="translate(1.2 1.8)"/><rect x="-37.5" y="-23" width="75" height="46" rx="2" fill="'+cl.c1+'" stroke="'+INK+'" stroke-width="1"/>';
    s+='<rect x="-33" y="-21.5" width="66" height="43" rx="1.6" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".7"/><rect x="-31.5" y="-20.5" width="63" height="41" rx="2" fill="none" stroke="'+cl.c1+'" stroke-width=".9" stroke-dasharray="2.4 1.6"/>';
    s+=bdg(k,0,-9,.13)+'<text y="8.4" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.6" fill="'+INK+'">MAZO DE '+cl.rec.toUpperCase()+'</text>';
    s+='<path d="M-41-21.5L-34.5-31H34.5L41-21.5Z" fill="'+b.techo+'" stroke="'+INK+'" stroke-width=".9" stroke-linejoin="round"/><path d="M-41-21.5L-34.5-31H34.5L41-21.5Z" fill="#000" opacity=".3"/>';
    s+='<rect x="-24" y="-29.6" width="48" height="6.6" rx="1" fill="'+INK+'"/><text y="-24.8" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.2" letter-spacing=".4" fill="#f2c94c">BOLETERÍA</text>';
    return s;
  }
  // Mercado de Pases (v12): una cartelera de cine, a todo color y sin el filtro de su zona. Marco rojo con lamparitas de colores,
  // la pantalla donde van los 4 Jugadores boca abajo y, del lado de la Rambla, la marquesina con el nombre.
  var FOCOS=['#ffe27a','#ff8a5a','#8fd3ff','#b4f08a','#ff9fd2'];
  function foco(x,y,q,r){return '<circle cx="'+n1(x)+'" cy="'+n1(y)+'" r="'+(r||1)+'" fill="'+FOCOS[q%5]+'" stroke="'+INK+'" stroke-width=".25"/><circle cx="'+n1(x-.3)+'" cy="'+n1(y-.3)+'" r=".35" fill="#fff" opacity=".8"/>';}
  function casilla(ang){
    var c=P(RS,ang), s=G(c[0],c[1],ang+90), q=0;
    s+='<rect x="-6" y="30" width="12" height="12" fill="#c9a77a" stroke="'+INK+'" stroke-width=".6"/><path d="M-6 33h12M-6 36h12M-6 39h12" stroke="#a9875c" stroke-width=".5"/>';
    s+='<rect x="-37.5" y="-26" width="75" height="52" rx="3" fill="#000" opacity=".25" transform="translate(1.2 1.8)"/><rect x="-37.5" y="-26" width="75" height="52" rx="3" fill="#b8323a" stroke="'+INK+'" stroke-width="1"/><rect x="-36" y="-24.5" width="72" height="49" rx="2.2" fill="none" stroke="#f2c94c" stroke-width=".8"/>';
    for(var x=-34;x<=34.1;x+=4.25) s+=foco(x,-24.6,q++);
    for(var y=-20;y<=20.1;y+=4) s+=foco(-35.6,y,q++)+foco(35.6,y,q+2);
    // arriba, el cartelito de la función
    s+='<rect x="-17" y="-26.6" width="34" height="5" rx="1" fill="'+INK+'" stroke="#f2c94c" stroke-width=".5"/><text y="-22.9" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="3" letter-spacing=".5" fill="#f2c94c">★ HOY EN CARTEL ★</text>';
    // la pantalla: acá van los 4 Jugadores boca abajo
    s+='<rect x="-32" y="-20" width="64" height="40" rx="1.6" fill="#fdf3d2" stroke="'+INK+'" stroke-width=".7"/><rect x="-30.5" y="-18.5" width="61" height="37" rx="1.2" fill="none" stroke="#b8323a" stroke-width=".8" stroke-dasharray="2.4 1.6"/>';
    [-1,1].forEach(function(sg){var x=sg*27.6;s+='<rect x="'+n1(x-2.4)+'" y="-17" width="4.8" height="34" fill="'+INK+'"/>';for(var y=-15.5;y<16;y+=4)s+='<rect x="'+n1(x-1.2)+'" y="'+n1(y)+'" width="2.4" height="1.8" rx=".4" fill="#fdf3d2"/>';});
    s+='<path d="M-22 -16L-6 12H-22Z" fill="#ffe27a" opacity=".35"/><path d="M22 -16L6 12H22Z" fill="#8fd3ff" opacity=".35"/>';
    s+='<text y="-4" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="7" fill="#b8323a" stroke="#fdf3d2" stroke-width=".6" paint-order="stroke">JUGADORES</text><text y="6" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="4.2" fill="'+PILUSO+'">4 boca abajo</text>';
    s+=['#e05a4f','#3f6aa6','#4d7a3a','#d9a61c'].map(function(cl,i){return '<rect x="'+(-11+i*5.6)+'" y="10" width="4.2" height="6" rx=".6" fill="'+cl+'" stroke="'+INK+'" stroke-width=".3"/>';}).join('');
    // la marquesina, del lado de la Rambla
    s+='<path d="M-36 20.4H36L33 32.4H-33Z" fill="#000" opacity=".25" transform="translate(.8 1.2)"/><path d="M-36 20.4H36L33 32.4H-33Z" fill="#f2c94c" stroke="'+INK+'" stroke-width=".9" stroke-linejoin="round"/>';
    for(var x=-33;x<=33.1;x+=3.3) s+=foco(x,21.9,q++,.75);
    s+='<rect x="-29" y="23.6" width="58" height="7.4" rx="1" fill="'+INK+'"/><text y="29.1" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.7" letter-spacing=".3" fill="#ffe27a">MERCADO DE PASES</text>';
    return s+'</g>';
  }

  // ---- Predios (hexágonos de afuera). Coordenadas locales: arriba (y negativa) mira al río ----
  function laSerena(){
    var s='';
    s+='<rect x="-40" y="12" width="80" height="9" fill="#ddd5c4" stroke="#c9bfa9" stroke-width=".6"/>';
    s+='<rect x="-26" y="-2" width="62" height="12" fill="#c9a77a" stroke="'+INK+'" stroke-width=".6"/>';
    for(var x=-24;x<36;x+=3) s+='<path d="M'+x+' -2v12" stroke="#a9875c" stroke-width=".5"/>';
    // la cabaña: techo alpino con las puntas onduladas y la ventanita
    s+='<g transform="translate(-4 -1) scale(1.05)"><path d="M-19 0L0-29L19 0Z" fill="#000" opacity=".18" transform="translate(2 1.5)"/>'+
      '<path d="M-11 0L0-17L11 0Z" fill="#b07a48"/><path d="M-6-8v8M0-17V0M6-8v8" stroke="#8a5a32" stroke-width=".6"/>'+
      '<rect x="-3.4" y="-9.5" width="6.8" height="4.4" fill="#f2d27a" stroke="'+INK+'" stroke-width=".7"/>'+
      '<path d="M-19 0L0-29L19 0Q17-2 15 0T11 0L0-17L-11 0Q-13-2-15 0T-19 0Z" fill="#23402e" stroke="'+INK+'" stroke-width="1" stroke-linejoin="round"/></g>';
    // la pérgola dorada con luces
    s+='<path d="M18 4V-14M36 4V-14M16-14H38" stroke="'+DORADO+'" stroke-width="2" stroke-linecap="round"/><path d="M18-13Q27-6 36-13" fill="none" stroke="'+INK+'" stroke-width=".4"/>';
    [[21,-10.6],[24,-9.2],[27,-8.7],[30,-9.2],[33,-10.6]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.3" fill="#ffe27a" stroke="'+INK+'" stroke-width=".3"/>';});
    s+='<circle cx="23" cy="5" r="2.4" fill="#fff" stroke="'+INK+'" stroke-width=".5"/><circle cx="31" cy="5" r="2.4" fill="#fff" stroke="'+INK+'" stroke-width=".5"/>';
    // el horno de barro
    s+='<path d="M-38 1A9 9 0 0 1-20 1Z" fill="#b5653a" stroke="'+INK+'" stroke-width=".8"/><path d="M-32 1v-3a3 3 0 0 1 6 0v3Z" fill="#3a2418"/><rect x="-24.5" y="-12" width="2.6" height="5" fill="#8a5a32" stroke="'+INK+'" stroke-width=".5"/>';
    // la tetera verde gigante, en la vereda
    s+='<g transform="translate(8 16)"><path d="M-6 0Q-12-1-13-6" fill="none" stroke="'+INK+'" stroke-width="3"/><path d="M-6 0Q-12-1-13-6" fill="none" stroke="#2f7a4a" stroke-width="1.8"/><path d="M6-4q5 0 4 4t-4 3" fill="none" stroke="'+INK+'" stroke-width="2.4"/><path d="M6-4q5 0 4 4t-4 3" fill="none" stroke="#2f7a4a" stroke-width="1.2"/>'+
      '<ellipse cx="0" cy="-1" rx="7" ry="6" fill="#2f7a4a" stroke="'+INK+'" stroke-width=".9"/><ellipse cx="0" cy="-6.6" rx="3.6" ry="1.4" fill="#25603a" stroke="'+INK+'" stroke-width=".6"/><circle cx="0" cy="-8.6" r="1.2" fill="'+DORADO+'" stroke="'+INK+'" stroke-width=".4"/><path d="M-4-3q2-2 4-2" stroke="#fff" stroke-width=".9" fill="none" opacity=".5"/></g>';
    s+=arbol(-34,-24,5,0)+arbol(34,-28,4.5,1)+arbol(-38,14,4,2)+arbol(26,-36,3.6,0);
    // v12: el patio con las mesas y sombrillas, la huerta, la leña, las bicis, la guirnalda y la gente
    var rd=azar(81);
    s+='<path d="M28 10Q44 14 50 30Q48 46 30 50Q24 30 28 10Z" fill="#e3d6b8" stroke="#c9bfa9" stroke-width=".5"/>';
    [[35,18],[44,30],[34,40]].forEach(function(p,q){s+=mesita(p[0],p[1])+sombrilla(p[0]+.5,p[1]-.5,4.6,q%2?'#4d7a3a':'#f2c94c','#fbf8f1');});
    s+='<rect x="-54" y="24" width="22" height="20" rx="1" fill="#8a5a32" stroke="'+INK+'" stroke-width=".5"/>';
    for(var y=27;y<43;y+=4)for(var x=-51;x<-33;x+=3.4)s+='<circle cx="'+n1(x)+'" cy="'+y+'" r="1.1" fill="'+(y%8?'#5b9a42':'#e05a4f')+'"/>';
    s+='<g stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round">'+[0,1,2,3].map(function(q){return '<path d="M'+(-52+q*.4)+' '+(10+q*1.6)+'h8"/>';}).join('')+'</g>';
    s+=bici(-24,30,'#3f6aa6')+bici(-16,32,'#e05a4f')+bici(-20,38,'#4d7a3a');
    s+=banderines(-14,-14,16,-13,8)+banderines(-46,-4,-20,-12,6);
    s+=cartelito(-44,-12,18,'LA SERENA','#23402e','#f2c94c');
    s+=gente(rd,7,-20,2,48,8)+gente(rd,4,30,12,16,30)+gente(rd,3,-4,24,20,16);
    s+=arbol(52,6,3.4,2)+arbol(-52,52,3.4,1)+arbol(52,52,3,0);
    return s;
  }
  function laMilla(){
    var s='';
    [[-24,-36,'#d4692a',-6],[-6,-40,'#e9dcc0',4],[12,-37,'#8fb3d9',-4],[28,-30,'#e05a4f',8],[-34,-16,'#f2c94c',-8],[34,-12,'#d4692a',6],[-30,6,'#a5c88f',4],[30,8,'#e9dcc0',-6]].forEach(function(c){s+=techo(c[0],c[1],13,10,c[3],c[2]);});
    s+='<rect x="-14" y="-14" width="28" height="7" rx="1" fill="#a37c52" stroke="'+INK+'" stroke-width=".6"/>';
    for(var x=-11;x<=11;x+=5.5){s+='<circle cx="'+x+'" cy="-16.5" r="1.3" fill="'+C.fans.c1+'"/><circle cx="'+x+'" cy="-4.5" r="1.3" fill="'+C.fans.c1+'"/>';}
    s+='<rect x="-7" y="1" width="16" height="8" rx="1" fill="#3a3530" stroke="'+INK+'" stroke-width=".6"/><g fill="#e05a4f">'+[[-4,3],[0,6],[4,3],[6,7],[-3,7]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r=".9"/>';}).join('')+'</g>'+
      '<rect x="-5" y="3.6" width="7" height="2" rx="1" fill="#a3442c"/><rect x="2" y="5.4" width="6" height="2" rx="1" fill="#a3442c"/>';
    s+='<g fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"><path d="M14 4q-3-3 0-6t0-6"/><path d="M18 2q-3-3 0-6t0-5"/></g>';
    [[-20,-26],[-1,-27],[18,-21],[22,-2],[-22,-4],[13,13],[-13,16],[3,-47],[-38,-30],[38,-24],[24,22],[-3,20],[30,-44],[-14,-46],[6,-34],[-28,-40]].forEach(function(p){s+=pelota(p[0],p[1],2.4);});
    // v12: el potrero, el paredón con el mural, la ropa tendida, los banderines de la hinchada y la gente con la camiseta
    var rd=azar(82);
    s+='<rect x="-56" y="18" width="28" height="22" rx="2" fill="#c9a56e" stroke="#a5824e" stroke-width=".6"/><g fill="none" stroke="#fff" stroke-width=".5" opacity=".8"><rect x="-54" y="20" width="24" height="18"/><path d="M-42 20v18"/><circle cx="-42" cy="29" r="3"/></g><path d="M-55 26v6M-29 26v6" stroke="#fff" stroke-width="1.2"/>'+pelota(-38,25,1.8);
    s+='<rect x="30" y="34" width="24" height="6" fill="#e9dcc0" stroke="'+INK+'" stroke-width=".5"/>'+['#d4692a','#fbf8f1','#d4692a','#3a3530'].map(function(c,q){return '<rect x="'+(31+q*5.8)+'" y="35" width="5" height="4" fill="'+c+'"/>';}).join('')+'<text x="42" y="38.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="3.1" fill="'+INK+'">LA MILLA</text>';
    s+='<path d="M30 18H54" stroke="'+INK+'" stroke-width=".3"/>'+[['#d4692a',32],['#fff',37],['#3f6aa6',42],['#d4692a',47],['#f2c94c',51]].map(function(r){return '<rect x="'+r[1]+'" y="18" width="3.4" height="4.4" fill="'+r[0]+'" stroke="'+INK+'" stroke-width=".2"/>';}).join('');
    s+=banderines(-40,-2,-24,-10,6)+banderines(24,-6,44,0,6)+banderines(-12,24,14,26,8);
    s+=gente(rd,10,-24,22,50,18)+gente(rd,4,30,24,22,8);
    s+=arbol(50,10,3.6,0)+arbol(-52,8,3.4,1)+arbol(-50,50,3.2,2)+arbol(50,50,3.2,0);
    return s;
  }
  function laCanterita(){
    var s='<rect x="-31" y="-46" width="62" height="44" fill="#7fae63" stroke="#5d6670" stroke-width=".9" stroke-dasharray="1.6 1"/>';
    [[-15,-35],[15,-35],[-15,-13],[15,-13]].forEach(function(p){s+=canchita(p[0],p[1],0,26,16);});
    [[-30,-45],[0,-45],[30,-45],[-30,-3],[0,-3],[30,-3]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.7" fill="#fff8c8" stroke="'+INK+'" stroke-width=".5"/>';});
    s+=techo(-4,9,28,10,0,C.sponsors.c1)+techo(20,10,10,8,0,'#d9b25a');
    s+=arbol(-34,8,4,1)+arbol(34,-8,3.6,2);
    // v12: los carteles de los sponsors en el alambrado, la tribunita, el estacionamiento y la gente
    var rd=azar(83);
    ['#e05a4f','#f2c94c','#3f6aa6','#fbf8f1','#4d7a3a','#b23f3c','#f2c94c'].forEach(function(c,q){s+='<rect x="'+(-30+q*8.6)+'" y="-49.6" width="7.4" height="3" rx=".4" fill="'+c+'" stroke="'+INK+'" stroke-width=".3"/>';});
    s+='<g>'+[0,1,2,3].map(function(q){return '<rect x="'+(-54+q*1.8)+'" y="'+(18+q*3)+'" width="'+(24-q*3.6)+'" height="3" fill="'+(q%2?'#d9b25a':'#b23f3c')+'" stroke="'+INK+'" stroke-width=".3"/>';}).join('')+'</g>'+gente(rd,6,-52,18,18,10);
    s+='<rect x="28" y="18" width="26" height="26" fill="#a9a59d" stroke="#8b8378" stroke-width=".6"/>';
    for(var y=24;y<44;y+=9) s+='<path d="M28 '+y+'h26" stroke="#fff" stroke-width=".5" stroke-dasharray="3 3"/>';
    s+=auto(34,22,0,'#f2f2f2')+auto(46,22,0,'#b23f3c')+auto(34,31,0,'#3f6aa6')+auto(46,40,0,'#f2c94c');
    s+=cartelito(-44,-6,22,'LA CANTERITA','#b23f3c','#fbf8f1');
    s+=gente(rd,8,-28,-44,56,40)+gente(rd,4,-20,20,30,8);
    s+=arbol(-52,50,3.2,1)+arbol(52,52,3,2)+arbol(-50,-8,3.4,0);
    return s;
  }
  function bajoNono(){
    var s=canchita(-10,-33,0,32,19)+canchita(-10,-10,0,32,19);
    s+=techo(22,-32,16,12,0,C.suerte.c1)+techo(22,-32,6,12,0,'#efe2b8');
    s+='<rect x="16" y="-20" width="13" height="9" rx="1.5" fill="#6cc3e6" stroke="#fff" stroke-width="1.2"/>';
    s+='<path d="M26 4V-6" stroke="'+INK+'" stroke-width=".8"/><rect x="26" y="-6" width="9" height="6" fill="'+C.suerte.c1+'" stroke="'+INK+'" stroke-width=".4"/>'+trebol(30.5,-3,.09,DORADO);
    s+=arbol(-34,4,4,0)+arbol(32,-44,3.6,1)+arbol(8,4,3.6,2)+arbol(-36,-44,3.4,1);
    // v12: las reposeras y sombrillas de la pileta, la parrilla con humo, los arcos de práctica y la gente
    var rd=azar(84);
    s+='<rect x="38" y="-22" width="4" height="8" rx="1" fill="#fbf8f1" stroke="'+INK+'" stroke-width=".3"/><rect x="38" y="-12" width="4" height="8" rx="1" fill="#fbf8f1" stroke="'+INK+'" stroke-width=".3"/>'+sombrilla(44,-16,4.4,'#3f6aa6','#fbf8f1');
    s+='<rect x="34" y="16" width="16" height="7" rx="1" fill="#55504a" stroke="'+INK+'" stroke-width=".5"/><path d="M36 19.5h12" stroke="#e05a4f" stroke-width="1.2" opacity=".8"/><g fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".8"><path d="M38 15q-3-3 0-6t0-6"/><path d="M45 15q-3-3 0-5t0-5"/></g>';
    s+=mesita(34,32)+mesita(46,32)+mesita(40,42);
    s+='<g fill="none" stroke="#fff" stroke-width=".9"><path d="M-52 22h10v-5M-52 22v-5"/><path d="M-52 40h10v-5M-52 40v-5"/></g><path d="M-52 17h10M-52 35h10" stroke="#fff" stroke-width=".9"/>'+pelota(-44,26,1.6)+pelota(-40,31,1.6)+pelota(-48,30,1.6);
    s+=cartelito(-44,6,20,'BAJO NONO','#3f6aa6','#fbf8f1');
    s+=gente(rd,6,-26,-46,32,46)+gente(rd,5,30,26,20,18)+gente(rd,3,-50,24,10,12);
    s+=arbol(52,6,3.4,1)+arbol(-52,52,3.2,0)+arbol(52,52,3,2);
    return s;
  }
  // El Sapo, el organizador de los torneos de La Escuelita: gorra, silbato y el sobre de la inscripción (dibujado en 200 × 180)
  function sapo(){var V='#6fae4a', V2='#4f8a34';
    return '<ellipse cx="96" cy="172" rx="52" ry="6" fill="#000" opacity=".14"/>'+
      '<path d="M50 168C40 120 56 84 96 82C136 84 152 120 142 168Z" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/><ellipse cx="96" cy="140" rx="30" ry="26" fill="#cfe3a0"/>'+
      '<path d="M66 102Q96 92 126 102L120 112Q96 104 72 112Z" fill="#fff" stroke="'+INK+'" stroke-width="2"/><path d="M96 104v18" stroke="'+INK+'" stroke-width="1.6"/><g transform="translate(96 126)"><rect x="-9" y="-4" width="18" height="9" rx="4" fill="#c7ccd1" stroke="'+INK+'" stroke-width="2"/><circle cx="-3" cy=".5" r="2" fill="'+INK+'"/></g>'+
      '<ellipse cx="96" cy="70" rx="46" ry="30" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/>'+
      [-1,1].map(function(sg){var x=96+sg*26;return '<circle cx="'+x+'" cy="46" r="16" fill="'+V+'" stroke="'+INK+'" stroke-width="3"/><circle cx="'+x+'" cy="46" r="10" fill="#fff" stroke="'+INK+'" stroke-width="2"/><rect x="'+(x-7+sg*2)+'" y="43.5" width="14" height="5" rx="2.5" fill="'+INK+'"/><path d="M'+(x-13)+' 38q13-8 26 0" fill="none" stroke="'+V2+'" stroke-width="3" stroke-linecap="round"/>';}).join('')+
      '<path d="M64 80Q96 100 128 80" fill="none" stroke="'+INK+'" stroke-width="3.4" stroke-linecap="round"/><path d="M118 84q8 0 10-6" fill="none" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="68" cy="72" rx="7" ry="4" fill="#e8574a" opacity=".3"/><ellipse cx="124" cy="72" rx="7" ry="4" fill="#e8574a" opacity=".3"/>'+
      '<path d="M60 28Q96 6 132 28L136 36H56Z" fill="'+INK+'"/><path d="M128 32h28q4 0 2 4H130Z" fill="'+INK+'"/><text x="96" y="31" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="7" fill="#f2c94c">ORGANIZACIÓN</text>'+
      '<g transform="translate(160 118) rotate(-14)"><rect x="-22" y="-14" width="44" height="28" rx="3" fill="#e9dcc0" stroke="'+INK+'" stroke-width="2.6"/><path d="M-22-14L0 3 22-14" fill="none" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/><rect x="-14" y="-26" width="30" height="15" rx="2" fill="#94c48c" stroke="'+INK+'" stroke-width="1.8"/><text x="1" y="-14.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="11" fill="#2f5a26">$</text></g>'+
      '<circle cx="142" cy="128" r="9" fill="'+V+'" stroke="'+INK+'" stroke-width="2.4"/><path d="M132 132q-8 6-6 16" fill="none" stroke="'+INK+'" stroke-width="10" stroke-linecap="round"/><path d="M132 132q-8 6-6 16" fill="none" stroke="'+V+'" stroke-width="6.4" stroke-linecap="round"/>';
  }
  // el Sapo en el tablero: centrado en (x, y), s = mm por unidad del dibujo
  function sapito(x,y,s){return '<g transform="translate('+n1(x)+' '+n1(y)+') scale('+s+') translate(-100 -95)">'+sapo()+'</g>';}
  // canchita de fútbol 5, de sintético y con el alambrado
  function canchita5(x,y,w,h){
    var s='<g transform="translate('+n1(x)+' '+n1(y)+')"><rect x="'+(-w/2-1.4)+'" y="'+(-h/2-1.4)+'" width="'+(w+2.8)+'" height="'+(h+2.8)+'" rx="1" fill="#2f6e3c" stroke="#9aa3ab" stroke-width="1" stroke-dasharray="1.2 .8"/>';
    s+='<rect x="'+(-w/2)+'" y="'+(-h/2)+'" width="'+w+'" height="'+h+'" fill="#3f9a52"/><g fill="none" stroke="#fff" stroke-width=".6"><rect x="'+(-w/2+1)+'" y="'+(-h/2+1)+'" width="'+(w-2)+'" height="'+(h-2)+'"/><path d="M0 '+(-h/2+1)+'V'+(h/2-1)+'"/><circle r="'+n1(h/6)+'"/>';
    s+='<path d="M'+(-w/2+1)+' '+n1(-h/5)+'a'+n1(h/5)+' '+n1(h/5)+' 0 0 1 0 '+n1(2*h/5)+'M'+(w/2-1)+' '+n1(-h/5)+'a'+n1(h/5)+' '+n1(h/5)+' 0 0 0 0 '+n1(2*h/5)+'"/></g>';
    return s+'<rect x="'+(-w/2-1.2)+'" y="-2" width="1.2" height="4" fill="#fff"/><rect x="'+(w/2)+'" y="-2" width="1.2" height="4" fill="#fff"/></g>';
  }
  // Banadi: el predio de las canchitas donde La Escuelita jugaba los torneos del Sapo
  function banadi(rd){
    var s='';
    s+=canchita5(-12.5,-32,22,14)+canchita5(12.5,-32,22,14)+canchita5(-22,-12,22,14)+canchita5(3,-12,22,14);
    [[-25,-41],[0,-41],[25,-41],[-35,-21],[15,-21]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.5" fill="#fff8c8" stroke="'+INK+'" stroke-width=".4"/>';});
    s+=pelota(-6,-29,1.9)+pelota(8,-10,1.9);
    // el Sapo, con su sobre, al costado de la cancha
    s+=sapito(27,-8,.17);
    s+=arbol(-36,4,3.8,1)+arbol(36,-38,3.2,0);
    // v12: el kiosco, las bicis, los bancos de suplentes, el cartel y la gente
    var rd2=azar(85);
    s+='<rect x="30" y="18" width="20" height="14" fill="#d9a61c" stroke="'+INK+'" stroke-width=".5"/>';
    for(var q=0;q<5;q++) s+='<path d="M'+(30+q*4)+' 32h4v2a2 2 0 0 1-4 0z" fill="'+(q%2?'#fbf8f1':INK)+'" stroke="'+INK+'" stroke-width=".3"/>';
    s+='<rect x="33" y="21" width="14" height="5" fill="'+INK+'"/><text x="40" y="24.9" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="3.2" fill="#f2c94c">KIOSCO</text>';
    s+=bici(-48,24,'#d9a61c')+bici(-48,30,'#e05a4f')+bici(-48,36,'#3f6aa6')+bici(-40,40,INK);
    s+='<rect x="-34" y="-3" width="12" height="2.4" fill="#a37c52" stroke="'+INK+'" stroke-width=".3"/><rect x="-9" y="-3" width="12" height="2.4" fill="#a37c52" stroke="'+INK+'" stroke-width=".3"/>';
    s+=cartelito(-44,-30,16,'BANADI',INK,'#f2c94c');
    s+=gente(rd2,9,-34,-46,58,6)+gente(rd2,5,26,36,22,12)+gente(rd2,4,-32,-4,24,3);
    s+=arbol(52,6,3.4,2)+arbol(-52,52,3.2,0)+arbol(52,52,3,1)+arbol(-52,10,3.2,2);
    return s;
  }

  // ---- Zonas de mala fama (pentágonos de afuera) ----
  var ZONAS=[
    function(){ // Estacionamiento La Canterita
      var s='<path d="M-24-14Q-30-28-16-36Q0-44 14-36Q28-28 22-16Q8-8-6-12Q-16-8-24-14Z" fill="#6f7f4c" stroke="#55663a" stroke-width="1"/><ellipse cx="-8" cy="-24" rx="8" ry="4" fill="#55663a" opacity=".7"/>';
      s+='<g stroke="#6b5330" stroke-width=".8" stroke-linecap="round">'+[[-20,-30],[-17,-32],[18,-26],[15,-30],[-22,-18]].map(function(p){return '<path d="M'+p[0]+' '+p[1]+'v-5"/>';}).join('')+'</g>';
      s+='<g transform="translate(6 -25) rotate(28) scale(1.4)">'+auto(0,0,0,'#f2f2f2')+'</g><ellipse cx="2" cy="-22" rx="7" ry="3.4" fill="#6f7f4c"/><g fill="none" stroke="#cfe0a8" stroke-width=".6"><circle cx="11" cy="-30" r="1.2"/><circle cx="13" cy="-27" r=".8"/></g>';
      s+='<rect x="-26" y="-6" width="44" height="22" fill="#a9a59d" stroke="#8b8378" stroke-width=".8"/>';
      for(var x=-24;x<=16;x+=6) s+='<path d="M'+x+' -6v6M'+x+' 10v6" stroke="#fff" stroke-width=".6"/>';
      s+=auto(-21,-2,90,'#e05a4f')+auto(-9,-2,90,'#3f6aa6')+auto(-3,12,90,'#f2c94c')+auto(9,-2,90,'#4d7a3a')+auto(-15,12,90,'#222');
      s+='<rect x="22" y="-4" width="7" height="7" fill="#e3dccd" stroke="'+INK+'" stroke-width=".6"/><path d="M22 6h-6" stroke="#e05a4f" stroke-width="1.4"/><rect x="20" y="-13" width="16" height="7" rx="1" fill="#fff" stroke="#e05a4f" stroke-width=".8"/><text x="28" y="-8" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.6" fill="#e05a4f">$$$$</text>';
      return s;
    },
    function(){ // Rotisería El Chulengo
      var s=techo(0,-18,44,18,0,'#c9b28f')+'<rect x="-19" y="-25" width="38" height="11" rx="1" fill="#fff" stroke="#c0392b" stroke-width=".8"/><text y="-20.4" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="3.2" letter-spacing=".4" fill="#c0392b">ROTISERÍA</text><text y="-16" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.4" fill="#c0392b">EL CHULENGO</text>';
      for(var q=0;q<9;q++) s+='<rect x="'+(-22+q*4.9)+'" y="-9" width="4.9" height="4.6" fill="'+(q%2?'#f2c94c':'#e05a4f')+'"/>';
      // el chulengo: medio tambor acostado, con la tapa abierta y patas de hierro
      s+='<path d="M-10 11l-3 7M10 11l3 7M-13 18h4M9 18h4" stroke="#9aa3ab" stroke-width="1.3" stroke-linecap="round"/>';
      s+='<path d="M-14 4A14 7 0 0 1 14 4Z" fill="#55504a" stroke="'+INK+'" stroke-width=".7" transform="rotate(-18 -14 4) translate(0 -1)"/>';
      s+='<path d="M-14 4h28v2a8 8 0 0 1-8 7h-12a8 8 0 0 1-8-7z" fill="#3a3530" stroke="'+INK+'" stroke-width=".7"/><path d="M-11 9.5h22" stroke="#e05a4f" stroke-width="1.2" opacity=".7"/><path d="M-14 4h28" stroke="#9aa3ab" stroke-width=".8"/>';
      [-8,0,8].forEach(function(x){s+='<ellipse cx="'+x+'" cy="3.4" rx="3.2" ry="2.3" fill="#c0702e" stroke="'+INK+'" stroke-width=".5"/><path d="M'+(x-1.5)+' 2.4q1.5-1 3 0" stroke="#e8a060" stroke-width=".6" fill="none"/>';});
      s+='<g fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"><path d="M4 0q-3-3 0-6t0-6"/><path d="M-6 0q-3-3 0-5t0-5"/></g>';
      [[-24,12],[24,12]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.4" fill="#f2c94c" stroke="'+INK+'" stroke-width=".6"/><path d="M'+p[0]+' '+(p[1]-4.4)+'V'+(p[1]+4.4)+'M'+(p[0]-4.4)+' '+p[1]+'H'+(p[0]+4.4)+'" stroke="#e05a4f" stroke-width="1.2"/>';});
      return s;
    },
    function(){ // Cementerio de Rodillas
      var s='<rect x="-25" y="-30" width="50" height="40" fill="#b8c6a0" stroke="#8b8378" stroke-width="1.6"/><path d="M0-22V10" stroke="#e5ddcc" stroke-width="3"/>';
      for(var gx=-22;gx<=18;gx+=6.5){ if(Math.abs(gx+1.5)<4) continue; for(var gy=-25;gy<=2;gy+=7) s+='<path d="M'+gx+' '+(gy+5)+'v-3a1.8 1.8 0 0 1 3.6 0v3z" fill="#e9e5dc" stroke="#7a7368" stroke-width=".5"/>';}
      s+='<path d="M-7-17v-7a7 7 0 0 1 14 0v7z" fill="#e9e5dc" stroke="#5e5446" stroke-width=".8"/><text y="-20.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="3.4" fill="#5e5446">RIP</text><text y="-17.6" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="3" fill="#5e5446">LCA</text>';
      s+='<g stroke="#8a6a45" stroke-width="1.4" stroke-linecap="round"><path d="M-6 18L6 4M6 18L-6 4"/></g><g stroke="#5e5446" stroke-width="2.2" stroke-linecap="round"><path d="M-7 4.5h3M4 4.5h3"/></g>';
      [[-29,-30],[29,-30],[-29,10],[29,10]].forEach(function(p){s+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="2.4" ry="4.4" fill="#2f5a26"/>';});
      return s;
    },
    function(){ // Diario La Pipeta
      var s=techo(0,-14,46,28,0,'#b5aa98')+'<rect x="-19" y="-19" width="38" height="11" fill="#1f3f8a" stroke="'+INK+'" stroke-width=".7"/><text y="-11.6" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="6.2" fill="#f2c94c">LA PIPETA</text>';
      s+='<path d="M16-30l-4 12M16-30l4 12M16-30V-18M13-24h6" stroke="#5d6670" stroke-width=".9"/><circle cx="16" cy="-31" r="1.6" fill="#e05a4f"/><g fill="none" stroke="#5d6670" stroke-width=".7"><path d="M20-34q3 3 0 6"/><path d="M22.5-36q5 5 0 10"/></g>';
      s+=auto(-14,10,0,'#f2f2f2')+auto(-2,10,0,'#f2f2f2')+'<rect x="10" y="6" width="10" height="7" fill="#e9e4da" stroke="'+INK+'" stroke-width=".5"/><path d="M11 8h8M11 10h6" stroke="#9a958c" stroke-width=".6"/>';
      return s;
    },
    function(){ // Oficina del Sapo
      var s=techo(-12,-18,24,18,0,'#5f9a45')+'<rect x="-22" y="-12" width="20" height="6" rx="1" fill="'+CREMA+'" stroke="'+INK+'" stroke-width=".6"/><text x="-12" y="-7.6" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.1" fill="#3d6b2a">EL SAPO</text>';
      // el Sapo en persona, en la puerta, con el sobre de la inscripción
      s+='<ellipse cx="16" cy="-4" rx="14" ry="10" fill="#7fb9c9" stroke="#5f8fa0" stroke-width=".8"/>'+sapito(14,-11,.18);
      s+='<rect x="-20" y="2" width="28" height="7" rx="1" fill="#fff" stroke="'+INK+'" stroke-width=".5"/><text x="-6" y="6.8" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="3.3" fill="'+INK+'">INSCRIPCIÓN $$$</text>';
      s+=arbol(24,8,3.6,1)+arbol(-26,-30,3.4,2);
      return s;
    }
  ];

  // v11: cada pieza en la escala de su color. El dibujo se arma completo (pexa-arte) y cada pieza lo muestra pasado por el filtro de su color:
  // los oscuros van al tono más oscuro, el color del Recurso queda igual y los claros van a un tinte casi blanco. Zonas de mala fama: grises.
  function hexRGB(h){return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}
  function tono(id,col){
    var c=hexRGB(col), lc=(.3*c[0]+.59*c[1]+.11*c[2])/255, dk=c.map(function(v){return v*.2;}), lt=c.map(function(v){return v+(255-v)*.9;}), tab=[[],[],[]];
    for(var q=0;q<=16;q++){var t=q/16;for(var ch=0;ch<3;ch++){var v=t<lc?dk[ch]+(c[ch]-dk[ch])*t/lc:c[ch]+(lt[ch]-c[ch])*(t-lc)/(1-lc);tab[ch].push((v/255).toFixed(3));}}
    return '<filter id="'+id+'" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="'+tab[0].join(' ')+'"/><feFuncG type="table" tableValues="'+tab[1].join(' ')+'"/><feFuncB type="table" tableValues="'+tab[2].join(' ')+'"/></feComponentTransfer></filter>';
  }
  var GRIS='#3d3b38';
  function dibujarTablero(){
    var h='', a='', fo='', rd=azar(7);
    var ola=U('ola');
    // v12: el río y la costa de la Rambla van con su color de siempre, por debajo de las piezas filtradas
    fo+='<pattern id="'+ola+'" width="26" height="14" patternUnits="userSpaceOnUse"><path d="M2 9q4-5 8 0t8 0" fill="none" stroke="#fff" stroke-width="1" opacity=".35"/></pattern>';
    fo+='<circle r="'+RO+'" fill="'+AGUA+'"/><circle r="'+RO+'" fill="url(#'+ola+')"/>';
    fo+='<polygon points="'+pts(shrink(OUTL,1.085,[0,0]))+'" fill="#e8dcbc" stroke="#d2c29a" stroke-width="2" stroke-linejoin="round"/>';
    a+='<polygon points="'+pts(shrink(OUTL,1.03,[0,0]))+'" fill="'+PASTO+'"/>';
    // sobre el agua, las Boleterías (de los predios). Los Mercados de Pases van arriba del filtro, a todo color
    for(var i=0;i<5;i++) a+=boleteria(i,OUTER[i]);
    // zonas de mala fama: oscuras como las fichas de Multa
    for(var i=0;i<5;i++){
      var pg=pent[i], c=cen(pg);
      a+='<polygon points="'+pts(pg)+'" fill="'+INK+'"/><polygon points="'+pts(shrink(pg,.9))+'" fill="#3d3731" stroke="#9a948c" stroke-width="2.2" stroke-dasharray="6 3.5" stroke-linejoin="round"/>';
      a+=G(c[0],c[1],TH[i]+90)+'<g transform="translate(0 -13) scale(.72)">'+ZONAS[i]()+'</g></g>';
    }
    // estadios
    for(var i=0;i<5;i++) a+=estadio(i);
    // predios: todo el fondo en el color de su Recurso, igual que la tribuna de su estadio
    var PRE={gol:bajoNono,fans:laMilla,sponsors:laCanterita,suerte:laSerena,picardia:banadi}, ILP='translate(0 -17) scale(.74)';
    for(var i=0;i<5;i++){
      var ho=hexOut[i], co=cen(ho), ko=OUTER[i], R=TH[i]+126, cl=C[ko].c1;
      a+='<polygon points="'+pts(ho)+'" fill="'+cl+'"/><polygon points="'+pts(ho)+'" fill="#000" opacity=".22"/><polygon points="'+pts(shrink(ho,.9))+'" fill="'+cl+'" stroke="'+INK+'" stroke-width="1.6" stroke-linejoin="round"/><polygon points="'+pts(shrink(ho,.9))+'" fill="none" stroke="'+CREMA+'" stroke-width="1" stroke-linejoin="round" stroke-dasharray="3 2" opacity=".8"/>';
      a+=G(co[0],co[1],R)+'<g transform="'+ILP+'">'+PRE[ko](rd)+'</g></g>';
      if(ko==='fans') a+=G(co[0],co[1],R)+'<g transform="'+ILP+'"><g fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="2.4 2" stroke-linecap="round" opacity=".95"><path d="M-62-14Q-46-46-20-26"/><path d="M-64 2Q-42-24-22-4"/><path d="M-60-30Q-30-64-1-27"/></g></g></g>';
    }
    // El Palco
    a+='<polygon points="'+pts(A)+'" fill="#e3dccd"/>'+palco();
    var arteId=U('arte');
    h+='<defs><g id="'+arteId+'">'+a+'</g>';
    for(var i=0;i<5;i++) h+=tono('te'+i,C[INNER[i]].c1)+tono('tp'+i,C[OUTER[i]].c1);
    h+=tono('tz',GRIS);
    var piezas=[];
    for(var i=0;i<5;i++) piezas.push([hexIn[i],'te'+i],[piezaPredio(i),'tp'+i],[piezaZona(i),'tz']);
    piezas.push([A,null]);
    piezas.forEach(function(p,q){h+='<clipPath id="cpz'+q+'"><polygon points="'+pts(p[0])+'"/></clipPath>';});
    h+='</defs><rect x="-320" y="-320" width="640" height="640" fill="#d8c8a2"/>'+fo;
    piezas.forEach(function(p,q){h+='<g clip-path="url(#cpz'+q+')"'+(p[1]?' filter="url(#'+p[1]+')"':'')+'><use href="#'+arteId+'"/></g>';});
    for(var i=0;i<5;i++) h+=casilla(TH[i])+canjeMostrador(i,OUTER[i]);
    // los cortes de todas las piezas: crema por debajo y negro arriba. Sobre la isla, el corte va por el medio del sendero
    var cortes=piezas.map(function(p){return pts(p[0]);});
    h+='<g fill="none" stroke-linejoin="round">'+cortes.map(function(p){return '<polygon points="'+p+'" stroke="#fbf8f1" stroke-width="3.6"/>';}).join('')+cortes.map(function(p){return '<polygon points="'+p+'" stroke="'+INK+'" stroke-width="1.6"/>';}).join('')+'</g>';
    h+=calles(rd);
    // el 1 del Palco, una vez en cada tribuna, mirando a su cancha
    for(var i=0;i<5;i++){var m=P(29.6,TH[i]);
      h+=G(m[0],m[1],TH[i]+90)+'<circle r="7.6" fill="#000" opacity=".25" transform="translate(.7 1)"/><circle r="7.6" fill="'+NB+'" stroke="'+INK+'" stroke-width="1"/><circle r="6.2" fill="'+C[INNER[i]].c1+'" stroke="'+INK+'" stroke-width=".8"/><text y="4.4" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="12.5" fill="'+NB+'" stroke="'+INK+'" stroke-width="1.4" paint-order="stroke" stroke-linejoin="round">1</text>'+
        // v14: desde el Palco se ve todo: unos largavistas en cada tribuna
        '<g transform="translate(14 .3) rotate(14)"><circle r="6.3" fill="#fbf8f1" stroke="'+INK+'" stroke-width=".8"/><path d="M-.8-1.6H.8V1H-.8Z" fill="#8a6a25"/><rect x="-4.5" y="-2.8" width="3.9" height="6.4" rx="1.3" fill="'+INK+'"/><rect x=".6" y="-2.8" width="3.9" height="6.4" rx="1.3" fill="'+INK+'"/><ellipse cx="-2.55" cy="-2.8" rx="1.95" ry=".95" fill="#9fd0e6" stroke="'+INK+'" stroke-width=".5"/><ellipse cx="2.55" cy="-2.8" rx="1.95" ry=".95" fill="#9fd0e6" stroke="'+INK+'" stroke-width=".5"/></g></g>';}
    // los números de los estadios, en el círculo central de cada cancha
    for(var i=0;i<5;i++){var ce=cen(hexIn[i]); h+=G(ce[0],ce[1],TH[i]+90)+numHex(INNER[i],0,20)+'</g>';}
    // esquinas: del tamaño de la base del cono (18 mm, con 1 mm de juego), blancas con detalles grises. Las cinco de arranque, con aro dorado
    [].concat(A,B,Cm,Cp,Dm,Dp,E,F).forEach(function(p,ix){var arr=ix>=5&&ix<10;
      // v19: las tres esquinas de cada Boletería van del color de su Recurso (Dp y F del mismo predio, Dm del predio anterior)
      var bole=ix>=35?OUTER[ix-35]:(ix>=25&&ix<30?OUTER[ix-25]:(ix>=20&&ix<25?OUTER[(ix-20+4)%5]:null));
      h+='<circle cx="'+n1(p[0]+.9)+'" cy="'+n1(p[1]+1.3)+'" r="9.5" fill="#000" opacity=".2"/><circle cx="'+n1(p[0])+'" cy="'+n1(p[1])+'" r="9.5" fill="'+(bole?C[bole].c1:'#fdfdfb')+'" stroke="'+(arr?'#b8862b':INK)+'" stroke-width="'+(arr?2.6:1.3)+'"/>'+
        '<circle cx="'+n1(p[0])+'" cy="'+n1(p[1])+'" r="7.4" fill="none" stroke="'+(bole?'#fbf8f1':'#c4c4c4')+'" stroke-width=".5" stroke-dasharray="1.2 1.2"/><circle cx="'+n1(p[0])+'" cy="'+n1(p[1])+'" r="5.2" fill="'+(bole?'#fbf8f1':'none')+'" stroke="'+(bole?INK:'#b5b5b5')+'" stroke-width=".8"/>'+(arr?'<path d="'+estrella(p[0],p[1],3.4)+'" fill="#e2bd57" stroke="#8a6a25" stroke-width=".5"/>':'');});
    // números, en el eje de cada pieza; nombres en un cartel del tinte de su pieza
    for(var i=0;i<5;i++){
      var co=cen(hexOut[i]), ko=OUTER[i];
      var pl=PREDIO_L[ko], cart=pl.length>1?'<text y="27.2" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="2.9" letter-spacing=".3" fill="'+INK+'">'+pl[0].toUpperCase()+'</text><text y="32.1" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4" fill="'+INK+'">'+pl[1].toUpperCase()+'</text>':'<text y="30.9" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4.8" fill="'+INK+'">'+pl[0].toUpperCase()+'</text>';
      h+=G(co[0],co[1],TH[i]+126)+'<rect x="-24" y="23" width="48" height="11" rx="2" fill="'+C[ko].fondo+'" stroke="'+INK+'" stroke-width="1"/>'+cart+numHex(ko,0,4)+'</g>';
      var cz=cen(pent[i]), zl=ZONA[i];
      h+=G(cz[0],cz[1],TH[i]+90)+'<rect x="-24" y="22.6" width="48" height="11" rx="2" fill="#111" stroke="#9a948c" stroke-width="1"/>'+
        '<text y="26.8" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="2.9" letter-spacing=".3" fill="#fbf8f1">'+zl[0].toUpperCase()+'</text><text y="31.7" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="4" fill="#fbf8f1">'+zl[1].toUpperCase()+'</text>'+numZona(ZNUM[i],0,3.5)+'</g>';
    }
    // rosa de los vientos y cartel, en la mesa
    h+='<g transform="translate(-288 288)"><circle r="17" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1"/><path d="M0-14l4 14-4 14-4-14z" fill="'+INK+'"/><path d="M0-14l4 14h-8z" fill="#e05a4f"/><text y="-19" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="8" fill="'+INK+'">N</text></g>';
    h+='<g transform="translate(250 300)"><rect x="-62" y="-13" width="124" height="26" rx="4" fill="#fbf8f1" stroke="'+INK+'" stroke-width="1.4"/><text y="5.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="14" letter-spacing="1" fill="'+INK+'">ISLA PEXA</text></g>';
    return '<g id="isla-pexa">'+h+'</g>';
  }

  function cartaRecurso(k){
    var c=C[k], tc=k==='picardia'?INK:CREMA, zz=U('zz');
    var s='<svg viewBox="0 0 410 630" role="img" aria-label="Carta de Recurso '+c.rec+'">';
    s+='<defs><pattern id="'+zz+'" width="44" height="22" patternUnits="userSpaceOnUse"><path d="M-2 18L10 6L22 18L34 6L46 18" fill="none" stroke="'+tc+'" stroke-width="5" opacity=".14"/></pattern></defs>';
    s+='<rect x="3" y="3" width="404" height="624" rx="24" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="5"/><rect x="3" y="3" width="404" height="624" rx="24" fill="url(#'+zz+')"/>';
    s+='<rect x="30" y="30" width="350" height="570" rx="16" fill="none" stroke="'+tc+'" stroke-width="3" opacity=".6"/>';
    s+='<g transform="translate(70 120) scale(2.7)">'+badge(k)+'</g>';
    s+='<text x="205" y="470" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="64" fill="'+tc+'">'+c.rec.toUpperCase()+'</text>';
    s+='<text x="205" y="512" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="18" letter-spacing="2" fill="'+tc+'">'+c.nombre.toUpperCase()+'</text>';
    s+='<g transform="translate(46 46) scale(.42)">'+badge(k)+'</g><g transform="translate(322 542) scale(.42)">'+badge(k)+'</g>';
    return s+'</svg>';
  }
  var memo={};
  function guardo(k,fn){return memo[k]||(memo[k]=fn());}
  var ORD=['gol','suerte','picardia','fans','sponsors'];
  var porNombre={};BENEF.forEach(function(b,i){porNombre[b[1]]=i;});
  var DTIDS=['abuelo','mister','dona','loco','profe'];
  // El gesto de cada personaje (la versiÃ³n digital lo anima con CSS)
  var G_J={gol:['cejas','pisoton','si','salto'],suerte:['no','salto','lengua','no'],picardia:['si','saludo','pisoton','salto'],fans:['saludo','si','cejas','lengua'],sponsors:['si','cejas','saludo','lengua']};
  var G_DT=['no','cejas','pisoton','salto','si'];
  var G_E={capitano:'si',teo:'cejas',fer:'no',piolo:'salto',pancho:'saludo',juambo:'saludo',gaspi:'pisoton',m:'cejas',muchi:'salto',mark:'salto',sora:'lengua',tai:'cejas',golzalez:'cejas',cocho:'pisoton'};
  function conGesto(svg,g){return svg.replace('class="fig"','class="fig g-'+g+'"');}
  // CreÃ¡ tu DT: cada rasgo es una lista de opciones que se traducen a los parÃ¡metros del dibujo
  var CUS={
    pelo:{m:[{pelo:'castano',corte:'corto',vol:0},{pelo:'gris',corte:'entradas',vol:4},{pelo:'canas',corte:'pelado',vol:0},{pelo:'negro',corte:'revuelto',vol:4},{pelo:'rubio',corte:'medio',vol:4}],f:[{pelo:'negro',corte:'largo',vol:5},{pelo:'rubio',corte:'largo',vol:5},{pelo:'castano',corte:'ondas',vol:6},{pelo:'colorado',corte:'medio',vol:4},{pelo:'canas',corte:'corto',vol:2,rodete:true}]},
    ojos:[{ojo:7},{ojos:'felices',ojo:7},{ojo:8,iris:'#4f9a56'},{ojo:8,iris:'#3f7fc4'},{ojo:6,anteojos:'redondos'}],
    cara:[{w:46,jaw:36,h:52},{w:52,jaw:50,h:46},{w:38,jaw:28,h:58},{w:48,jaw:46,h:50},{w:46,jaw:26,h:52}],
    piel:['palida','clara','media','trigueÃ±a','oscura'],
    ropa:[{c1:'#26272b',corbata:'#b23f3c',sh:INK},{c1:'#2f6fcf',silbato:true,sh:'#1c3f7a'},{c1:'#b23f3c',sh:'#6e2321'},{c1:'#3f7d46',sh:'#23492a'},{c1:'#8a6a45',delantal:true,sh:INK}],
    pose:['cruzados','arriba','seÃ±ala','hombros','biceps']
  };
  CUS.ropa.forEach(function(x,i){C['dt_c'+i]={nombre:'DT',c1:x.c1,c2:CREMA,fondo:'#efe7d4'};SHORT['dt_c'+i]=x.sh;BANDA['dt_c'+i]=CREMA;});
  function figuraCus(r,entero,extra){var g=r.g==='f'?'f':'m',ro=CUS.ropa[r.ropa]||CUS.ropa[0];
    var o=Object.assign(g==='f'?{cuerpo:'flaco',bot:116,cintura:152,ceja:3,nariz:1.05,boca:10}:{ceja:4.5,nariz:1.25,boca:12},CUS.pelo[g][r.pelo]||CUS.pelo[g][0],CUS.ojos[r.ojos]||CUS.ojos[0],CUS.cara[r.cara]||CUS.cara[0],{piel:CUS.piel[r.piel]||'clara',gesto:'sonrisa',pose:CUS.pose[r.pose]||'cruzados'});
    if(ro.corbata)o.corbata=ro.corbata;if(ro.silbato)o.silbato=true;if(ro.delantal)o.delantal=true;if(extra)Object.assign(o,extra);
    return figura('dt_c'+(CUS.ropa.indexOf(ro)),o);}
  // Para el Certificado: sin carta y sin los chistes de cada uno, festejando con los brazos arriba
  var LIBRE={pose:'festeja',gag:null,globo:null,palitos:false,mancuernas:false,sinFondo:true};
  window.PEXA_CARTAS={
    festejo:function(club,pos){return guardo('fe'+club+pos,function(){return '<svg viewBox="0 0 200 220" aria-hidden="true">'+figura(club,Object.assign({},PLANTEL[club][pos].o,LIBRE))+'</svg>';});},
    dtCopa:function(dt){return guardo('co'+dt,function(){var id=DTIDS[dt];return '<svg viewBox="0 -140 200 360" aria-hidden="true">'+figura('dt_'+id,Object.assign({},DT_FIG[id].o,LIBRE,{pose:'copa'}))+'</svg>';});},
    dtCopaCus:function(r){return guardo('coc'+JSON.stringify(r),function(){return '<svg viewBox="0 -140 200 360" aria-hidden="true">'+figuraCus(r,1,Object.assign({},LIBRE,{pose:'copa'}))+'</svg>';});},
    jugador:function(club,pos){return guardo('j'+club+pos,function(){return conGesto(carta(club,pos,ORD.indexOf(club)*4+pos+1),G_J[club][pos]);});},
    beneficio:function(nombre){return guardo('b'+nombre,function(){var i=porNombre[nombre],b=BENEF[i],sv=cartaBen(b,i);return b[4]?conGesto(sv,G_E[b[4]]||'si'):sv;});},
    recurso:function(k){return guardo('r'+k,function(){return cartaRecurso(k);});},
    dorso:function(t){return guardo('d'+t,function(){return dorso(t);});},
    retrato:function(dt){return guardo('t'+dt,function(){var id=DTIDS[dt];return conGesto('<svg viewBox="45 18 110 120" aria-hidden="true">'+figura('dt_'+id,Object.assign({},DT_FIG[id].o,{gag:null,globo:null,palitos:false}))+'</svg>',G_DT[dt]);});},
    dtEntero:function(dt){return guardo('e'+dt,function(){var id=DTIDS[dt];return conGesto('<svg viewBox="0 0 200 220" aria-hidden="true">'+figura('dt_'+id,DT_FIG[id].o)+'</svg>',G_DT[dt]);});},
    dtCustom:function(r,entero){return guardo('cus'+(entero?1:0)+JSON.stringify(r),function(){return conGesto(entero?'<svg viewBox="0 0 200 220" aria-hidden="true">'+figuraCus(r,1)+'</svg>':'<svg viewBox="45 18 110 120" aria-hidden="true">'+figuraCus(r,0)+'</svg>','si');});},
    badge:function(k){return guardo('g'+k,function(){return badge(k);});},
    // Para jugar: lo que sobra afuera de la isla va del mismo celeste que la mesa, y cada BoleterÃ­a tiene su mazo de cartas encima
    tableroArte:function(outer,znum){OUTER=outer;ZNUM=znum;var mazos='';for(var i=0;i<5;i++){var aF=TH[i]+36,c=P(RH,aF),cr=cartaRecurso(outer[i]);mazos+=G(c[0],c[1],aF+90)+[2,1,0].map(function(q){return cr.replace('<svg ','<svg x="'+(q-14)+'" y="'+(-21.5-q)+'" width="28" height="43" ');}).join('')+'</g>';}return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-320 -320 640 640" width="2000" height="2000">'+dibujarTablero().replace('fill="#d8c8a2"','fill="#8fc3df"')+mazos+'</svg>';},
    geo:{get RS(){return RS;},get RH(){return RH;}},
    escuelita:function(k){return guardo('x'+k,function(){return conGesto('<svg viewBox="0 0 200 220" aria-hidden="true">'+figura('escuelita',Object.assign({},ESC[k][1],{globo:null,gag:null}))+'</svg>',G_E[k]||'salto');});},

    escudo:function(k){return guardo('c'+k,function(){return escudoClub(k);});},
    logo:function(m){return guardo('l'+m,function(){return m==='solo'?'<svg viewBox="'+VB_SOLO+'" aria-hidden="true">'+logoSolo()+'</svg>':'<svg viewBox="-142 -142 284 284" aria-hidden="true">'+logoPexa(m)+'</svg>';});},
    tokenV:function(){return '<svg viewBox="0 0 100 100" aria-hidden="true">'+tokV(50,50,50)+'</svg>';},
    tokenE:function(){return '<svg viewBox="0 0 100 100" aria-hidden="true">'+tokE(50,50,50)+'</svg>';},
    nombres:Object.keys(porNombre)
  };
})();