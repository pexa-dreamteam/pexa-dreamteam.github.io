// Dibujos de los Recursos y las Multas, sacados de arte-pexa.html
(function(root){
var INK='#2b2620', CREMA='#f6efe0';
  var HEART='M0 0C-4-6-14-8-14-16C-14-22-8-25-4-23C-2-22-1-20 0-18C1-20 2-22 4-23C8-25 14-22 14-16C14-8 4-6 0 0Z';
  function trebol(cx,cy,s,fill){return [45,135,225,315].map(function(a){return '<path d="'+HEART+'" fill="'+fill+'" transform="translate('+cx+' '+cy+') rotate('+a+') scale('+s+')"/>';}).join('');}
  function pelota(x,y,r){return '<g transform="translate('+n1(x)+' '+n1(y)+') scale('+(r/10)+')"><circle r="10" fill="#fff" stroke="'+INK+'" stroke-width="2"/><path d="M0-4l3.8 2.8-1.5 4.5h-4.6l-1.5-4.5z" fill="'+INK+'"/><path d="M0-4V-10M3.8-1.2l5.6-1.8M2.3 3.3l3.4 4.8M-2.3 3.3l-3.4 4.8M-3.8-1.2l-5.6-1.8" stroke="'+INK+'" stroke-width="1.3"/></g>';}
var C={gol:{c1:'#3f6aa6'},suerte:{c1:'#4d7a3a'},picardia:{c1:'#d9a61c'},fans:{c1:'#d4692a'},sponsors:{c1:'#b23f3c'}};
  var ICON={
    gol:function(c){return '<path d="M24 70V32h52v38" fill="none" stroke="'+c+'" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><g stroke="'+c+'" stroke-width="1.6" opacity=".6"><path d="M37 32v38M50 32v38M63 32v38M24 45h52M24 58h52"/></g><circle cx="60" cy="60" r="12" fill="'+c+'"/><path d="M60 54.5l5.2 3.8-2 6.1h-6.4l-2-6.1z" fill="currentColor"/>';},
    suerte:function(c){return '<path d="M50 50Q53 66 63 79" fill="none" stroke="'+c+'" stroke-width="4.5" stroke-linecap="round"/>'+trebol(50,47,1.05,c);},
    picardia:function(c){return '<path d="M38 26h14v8h-14z" fill="'+c+'"/><rect x="31" y="33" width="38" height="47" rx="9" fill="'+c+'"/><circle cx="42" cy="52" r="3.6" fill="currentColor"/><path d="M53 52q5-5 10 0" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M41 64q10 8 20-3" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>';},
    fans:function(c){return '<g fill="none" stroke="'+c+'" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="48" cy="38" rx="24" ry="8"/><path d="M24 38v28M72 38v28M24 66a24 8 0 0 0 48 0"/><path d="M24 44l12 20 12-20 12 20 12-20" stroke-width="3"/><path d="M66 26l14-12"/></g><circle cx="82" cy="12" r="5" fill="'+c+'"/>';},
    sponsors:function(c){return '<path d="M36 22l8-4q6 6 12 0l8 4 14 12-7 9-7-5v42H36V38l-7 5-7-9z" fill="'+c+'"/><rect x="40" y="47" width="20" height="13" rx="1.5" fill="currentColor"/><text x="50" y="57.5" text-anchor="middle" font-family="Bowlby One SC, sans-serif" font-size="11" fill="'+c+'">$</text>';}
  };
  function badge(k){var c=C[k], fg=k==='picardia'?INK:CREMA;return '<g color="'+c.c1+'"><circle cx="50" cy="50" r="47" fill="'+c.c1+'" stroke="'+INK+'" stroke-width="3"/><circle cx="50" cy="50" r="41" fill="none" stroke="'+fg+'" stroke-width="1.2" opacity=".5"/>'+ICON[k](fg)+'</g>';}
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
root.PEXA_ICONOS={C:C,INK:INK,CREMA:CREMA,badge:badge,multa:function(k){return '<rect x="2" y="2" width="96" height="96" rx="10" fill="'+INK+'"/><rect x="6" y="6" width="88" height="88" rx="7" fill="none" stroke="'+C[k].c1+'" stroke-width="2.6" stroke-dasharray="5 3"/>'+MULTA[k][1](C[k].c1);}};
})(window);
