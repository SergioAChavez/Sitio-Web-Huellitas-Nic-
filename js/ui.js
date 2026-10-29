/* Huellitas Nic - interfaz general: navegación, tarjetas, ventana modal, blog, tema e imágenes de respaldo */
(function(){
var HN=window.HN,R=HN.R,$=HN.$,$$=HN.$$,P=HN.P;

function img(p){return p.u||"https://images.unsplash.com/photo-"+p.i+"?auto=format&fit=crop&w=600&q=80"}
function card(p,sc){return'<article class="card rel">'+(sc?'<span class="score">'+sc+'% similitud</span>':'')+'<img src="'+img(p)+'" alt="'+p.n+'"><div class="cb"><span class="tag '+p.c+'">'+p.c+'</span><h3>'+p.n+'</h3><p class="sm">'+p.t+' · '+p.s+' · '+p.b+'</p><p class="sm"><i class="ic ic-pin"></i> '+p.pl+'</p><p class="sm"><i class="ic ic-cal"></i> '+p.d+'</p><button class="pri" data-d="'+p.id+'">Ver detalles</button></div></article>'}
function show(id){
 $$(".pg").forEach(function(x){x.classList.toggle("on",x.id===id)});
 $$(".nv").forEach(function(x){x.classList.toggle("on",x.dataset.p===id)});
 window.scrollTo({top:0,behavior:"smooth"});
 if(id==="mapa"&&HN.mapa)setTimeout(function(){HN.mapa.invalidateSize()},200);
}
function modal(h){$("#mb").innerHTML='<button class="x" data-x>×</button>'+h;$("#mo").classList.add("on")}
HN.img=img;HN.card=card;HN.show=show;HN.modal=modal;

/* Blog: preguntas frecuentes */
var F=[["Cuidados para tu mascota",[["Alimentación para tu mascota","Ofrece agua fresca y alimento adecuado a su edad y tamaño. Evita chocolate, uvas y cebolla."],["Higiene y baño","Báñala cada 3–4 semanas con shampoo especial y cepíllala con regularidad."],["Vacunas y visitas al veterinario","Mantén al día vacunas y desparasitación, y haz revisiones anuales."],["Ejercicio y actividad física","Paseos diarios y juegos mantienen su salud física y emocional."]]],
["Mascotas Perdidas",[["¿Qué hacer cuando se pierde tu mascota?","Busca de inmediato cerca de casa, avisa a vecinos y publica un reporte."],["Cómo crear un buen reporte","Usa una foto clara y actual, describe rasgos únicos y la última ubicación."],["Cómo publicar un reporte","Ve a la sección Reporte, completa los datos y presiona Subir Reporte."],["Consejos para encontrarla más rápido","Comparte en redes, visita veterinarias y refugios cercanos."]]],
["Mascotas Encontradas",[["¿Qué hacer si encuentras a una mascota?","Resguárdala, revisa si tiene collar o chip y publica un reporte."],["Cómo identificar al propietario","Usa el buscador por foto con IA y revisa los reportes de mascotas perdidas."],["Recomendaciones de seguridad","Cita a los supuestos dueños en lugares públicos y pide pruebas de propiedad."]]],
["Adopción Responsable",[["Antes de adoptar","Asegúrate de tener tiempo, espacio y presupuesto para toda su vida."],["Cómo describir correctamente a una mascota","Incluye edad, tamaño, color, carácter y estado de salud."],["Qué características ayudan a identificarla","Marcas, cicatrices, collar, color de ojos y comportamiento."]]]];;
HN.initUI=function(){
 $("#faq").innerHTML=F.map(function(c){return'<div class="cat">'+c[0]+"</div>"+c[1].map(function(q){return'<div class="acc"><button><i class="ic ic-paw"></i> '+q[0]+' ＋</button><div>'+q[1]+"</div></div>"}).join("")}).join("");
 /* contadores de la portada */
 $$("[data-n]").forEach(function(el){var t=+el.dataset.n,c=0,st=setInterval(function(){c+=Math.ceil(t/40);if(c>=t){c=t;clearInterval(st)}el.textContent=c+"+"},30)});
 /* modo noche (se recuerda) */
 function icono(n){return n?'<i class="ic ic-sun"></i>':'<i class="ic ic-moon"></i>'}
 if(HN.ld("hn_night")){R.classList.add("night");$("#hn-tg").innerHTML=icono(true)}
 $("#hn-tg").onclick=function(){R.classList.toggle("night");var n=R.classList.contains("night");HN.sv("hn_night",n);this.innerHTML=icono(n)};
 /* clics de toda la página */
 R.addEventListener("click",function(e){var t=e.target,a;
  if((a=t.closest("[data-p]")))HN.show(a.dataset.p);
  else if((a=t.closest("[data-go]"))){e.preventDefault();HN.show(a.dataset.go)}
  else if((a=t.closest("[data-d]")))HN.details(a.dataset.d);
  else if((a=t.closest("[data-ad]")))HN.adoptForm(a.dataset.ad);
  else if((a=t.closest("[data-info]"))){HN.toast("Gracias. Tu información ayudará a localizar a "+a.dataset.info+".");$("#mo").classList.remove("on")}
  else if(t.closest("[data-x]")||t.id==="mo")$("#mo").classList.remove("on");
  else if(t.closest(".acc>button"))t.closest(".acc").classList.toggle("open")});
 /* si una foto no carga: otra foto real y, si tampoco, una ilustración */
 R.addEventListener("error",function(e){var im=e.target;if(!im||im.tagName!=="IMG"||im.dataset.fb)return;
  var p=P.filter(function(x){return x.n===im.alt})[0],g;
  if(!im.dataset.try){im.dataset.try=1;im.src="https://loremflickr.com/600/450/"+(p?(p.t==="Gato"?"cat":"dog"):"dog,cat/all")+"?lock="+(p?p.id+50:77);return}
  im.dataset.fb=1;
  if(p)g="<g transform='translate(100,40) scale(1.1)'>"+AN[p.t==="Gato"?"c":(p.id%2?"d":"D")]+"</g>";
  else g="<g transform='translate(10,50) scale(.95)'>"+AN.d+"</g><g transform='translate(200,50) scale(.95)'>"+AN.c+"</g>";
  im.src="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#e6f2df'/>"+g+"</svg>")},true);
};

/* Ilustraciones de respaldo (perro y gato) */
function dog(a,b){return "<ellipse cx='40' cy='88' rx='26' ry='50' fill='"+b+"' transform='rotate(14 40 88)'/><ellipse cx='160' cy='88' rx='26' ry='50' fill='"+b+"' transform='rotate(-14 160 88)'/><ellipse cx='100' cy='100' rx='62' ry='64' fill='"+a+"'/><ellipse cx='100' cy='130' rx='34' ry='26' fill='#f6e6c8'/><circle cx='78' cy='92' r='7' fill='#2a1a14'/><circle cx='122' cy='92' r='7' fill='#2a1a14'/><circle cx='80' cy='89' r='2' fill='#fff'/><circle cx='124' cy='89' r='2' fill='#fff'/><ellipse cx='100' cy='116' rx='12' ry='8' fill='#2a1a14'/><path d='M100 124v8M88 134q12 9 24 0' stroke='#2a1a14' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M94 137q6 16 12 0z' fill='#e86b7a'/><ellipse cx='62' cy='192' rx='22' ry='12' fill='"+a+"'/><ellipse cx='138' cy='192' rx='22' ry='12' fill='"+a+"'/>"}
function cat(a,b){return "<path d='M38 78L48 12L92 52z' fill='"+a+"'/><path d='M162 78L152 12L108 52z' fill='"+a+"'/><path d='M50 62L55 32L76 52z' fill='#f2a7b5'/><path d='M150 62L145 32L124 52z' fill='#f2a7b5'/><ellipse cx='100' cy='106' rx='66' ry='56' fill='"+a+"'/><path d='M100 52v22M82 56l4 18M118 56l-4 18' stroke='"+b+"' stroke-width='5' stroke-linecap='round'/><ellipse cx='100' cy='130' rx='28' ry='20' fill='#f7f3ee'/><ellipse cx='76' cy='98' rx='10' ry='12' fill='#9bd36a'/><ellipse cx='124' cy='98' rx='10' ry='12' fill='#9bd36a'/><ellipse cx='76' cy='98' rx='3.5' ry='9' fill='#1c1c1c'/><ellipse cx='124' cy='98' rx='3.5' ry='9' fill='#1c1c1c'/><path d='M94 118h12l-6 7z' fill='#e87b8d'/><path d='M100 125q-8 9-16 4M100 125q8 9 16 4' stroke='#444' stroke-width='2.5' fill='none' stroke-linecap='round'/><path d='M60 120l-36-6M60 128l-36 6M140 120l36-6M140 128l36 6' stroke='#fff' stroke-width='2' opacity='.8'/><ellipse cx='62' cy='192' rx='22' ry='12' fill='"+a+"'/><ellipse cx='138' cy='192' rx='22' ry='12' fill='"+a+"'/>"}
var AN={d:dog("#e0a458","#8a5a2b"),D:dog("#3b3b3f","#1f1f22"),c:cat("#9a9aa3","#6d6d76"),C:cat("#e8914a","#b8641f")};
})();
