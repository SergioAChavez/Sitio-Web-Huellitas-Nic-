/* Huellitas Nic - apartado "IA": accesos a las secciones del ensayo y demostración del algoritmo de compatibilidad */
(function(){
var HN=window.HN,R=HN.R,$=HN.$;

/* Criterios de la demostración: C(a,m) = Σ wᵢ · sᵢ(a,m) */
var CR=[
 {n:"Tiempo disponible / nivel de actividad",w:.30,a:["Poco","Medio","Mucho"],m:["Bajo","Medio","Alto"]},
 {n:"Experiencia / manejo que exige",w:.20,a:["Ninguna","Alguna","Mucha"],m:["Bajo","Medio","Alto"]},
 {n:"Espacio de la vivienda / tamaño",w:.20,a:["Pequeño","Mediano","Grande"],m:["Pequeño","Mediano","Grande"]},
 {n:"Presupuesto / necesidades médicas",w:.15,a:["Limitado","Suficiente","Amplio"],m:["Ninguna","Controladas","Altas"]},
 {n:"Niños en casa / convivencia con niños",w:.15,a:["No hay niños","Hay niños"],m:["Convive bien","No se sabe","No convive bien"],kids:true}
];
function sc(c,ai,mi){
 if(c.kids)return ai===0?1:[1,.5,0][mi];
 return ai>=mi?1:1-(mi-ai)/2;
}
function opts(a){return a.map(function(x,i){return'<option value="'+i+'">'+x+'</option>'}).join("")}

HN.initIA=function(){
 /* tarjetas e índice: llevan a la sección del ensayo */
 R.addEventListener("click",function(e){var b=e.target.closest("[data-iago]");if(!b)return;
  var d=document.getElementById(b.dataset.iago);if(!d)return;d.open=true;d.scrollIntoView({behavior:"smooth",block:"start"})});

 var box=$("#ia-calc");if(!box)return;
 box.innerHTML='<h3>Demostración: puntuación de compatibilidad</h3>'+
  '<p class="sm">Ejemplo educativo del algoritmo de puntuación ponderada descrito arriba. No sustituye la evaluación humana.</p>'+
  '<div class="crow chead"><span></span><b>Adoptante</b><b>Mascota</b></div>'+
  CR.map(function(c,i){return'<div class="crow"><span>'+c.n+' <i class="sm">(peso '+Math.round(c.w*100)+'%)</i></span><select data-i="'+i+'" data-r="a">'+opts(c.a)+'</select><select data-i="'+i+'" data-r="m">'+opts(c.m)+'</select></div>'}).join("")+
  '<div class="req"><b>Requisitos indispensables (se evalúan aparte)</b>'+
  '<label><input type="checkbox" id="rq1" checked> Ofrece un hogar seguro y alimentación adecuada</label>'+
  '<label><input type="checkbox" id="rq2" checked> Se compromete a vacunar y esterilizar</label></div>'+
  '<div class="cres" id="cres"></div>';
 function calc(){
  var tot=0,det="";
  CR.forEach(function(c,i){
   var a=+box.querySelector('[data-i="'+i+'"][data-r="a"]').value,m=+box.querySelector('[data-i="'+i+'"][data-r="m"]').value,s=sc(c,a,m);
   tot+=c.w*s;det+='<li>'+c.n+': '+Math.round(s*100)+'% × '+Math.round(c.w*100)+'%</li>'});
  var p=Math.round(tot*100),ok=$("#rq1").checked&&$("#rq2").checked,
   txt=!ok?"No recomendable hasta cumplir los requisitos indispensables":p>=80?"Compatibilidad alta":p>=55?"Compatibilidad media: conviene conversar y ajustar":"Compatibilidad baja";
  $("#cres").innerHTML='<div class="cbar"><div style="width:'+p+'%"></div></div><p><b>'+p+'%</b> · '+txt+'</p>'+
   (ok?'':'<p class="cwarn">Los requisitos esenciales para el bienestar animal no se compensan con puntuaciones altas en otros criterios.</p>')+
   '<details><summary>Ver desglose</summary><ul>'+det+'</ul></details>'};
 box.addEventListener("change",calc);calc();
};
})();
