/* Huellitas Nic - mascotas: detalles, búsqueda, filtros, adopción e IA */
(function(){
var HN=window.HN,P=HN.P,$=HN.$,$$=HN.$$,img=HN.img,card=HN.card,modal=HN.modal;

/* Ventana de detalles, con botones de contacto si el reporte tiene teléfono */
HN.details=function(id){var p=P.filter(function(x){return x.id==id})[0];if(!p)return;
 var dg=(p.tel||"").replace(/\D/g,""),wa=dg.length===8?"505"+dg:dg,
 act=p.c==="Adopción"?'<button class="pri" data-ad="'+p.id+'">Solicitar adopción</button>':(p.tel?'':'<button class="pri" data-info="'+p.n+'">Tengo información</button>');
 if(dg)act+=' <a class="pri" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">WhatsApp</a> <a class="sec" href="tel:'+dg+'">Llamar</a>';
 modal('<img src="'+img(p)+'" alt=""><span class="tag '+p.c+'">'+p.c+'</span><h2>'+p.n+'</h2><div class="info"><div><b>Especie</b><br>'+p.t+'</div><div><b>Sexo</b><br>'+p.s+'</div><div><b>Raza</b><br>'+p.b+'</div><div><b>Ubicación</b><br>'+p.pl+'</div><div><b>Fecha</b><br>'+p.d+'</div></div><p>'+p.x+'</p>'+act)};

/* Filtros (tipo, raza, ubicación y sexo) */
function filters(box,fn){var h="";
 [["Tipo de mascota","t"],["Raza","b"],["Ubicación","pl"],["Sexo","s"]].forEach(function(f){var o={};P.forEach(function(p){o[p[f[1]]]=1});
  h+='<select data-k="'+f[1]+'"><option value="">'+f[0]+'</option>'+Object.keys(o).map(function(v){return"<option>"+v+"</option>"}).join("")+"</select>"});
 box.innerHTML=h;box.onchange=fn}
function applyF(box,pred,out){var v={};box.querySelectorAll("select").forEach(function(s){v[s.dataset.k]=s.value});
 var q=($("#q")&&box.dataset.f==="b")?$("#q").value.toLowerCase():"";
 var r=P.filter(function(p){if(p.done||!pred(p))return false;for(var k in v)if(v[k]&&p[k]!==v[k])return false;return !q||(p.n+p.t+p.b+p.pl).toLowerCase().indexOf(q)>-1});
 out.innerHTML=r.length?r.map(function(p){return card(p)}).join(""):'<p class="sm">No hay resultados.</p>'}
function rb(){applyF($('[data-f="b"]'),function(){return true},$("#blist"))}
function ra(){applyF($('[data-f="a"]'),function(p){return p.c==="Adopción"},$("#alist"))}
function rrec(){$("#recent").innerHTML=P.filter(function(p){return !p.done}).slice(0,4).map(function(p){return card(p)}).join("")}

/* Vuelve a dibujar todo lo que depende de la lista de mascotas */
HN.refresh=function(){rb();ra();rrec();if(HN.pins)HN.pins();if($("#cuenta").classList.contains("on")&&HN.renderCuenta)HN.renderCuenta()};

HN.initMascotas=function(){
 filters($('[data-f="b"]'),rb);filters($('[data-f="a"]'),ra);
 $("#q").oninput=rb;$("#qb").onclick=rb;$("#q").onkeydown=function(e){if(e.key==="Enter")rb()};
 /* Buscador por foto con IA (demostración) */
 $("#aiopen").onclick=function(){var b=$("#aibox");b.style.display=b.style.display==="none"?"block":"none"};
 $("#ph").onchange=function(){var f=this.files[0];if(!f)return;var i=$("#pv");i.src=URL.createObjectURL(f);i.style.display="block"};
 $("#an").onclick=function(){if(!$("#ph").files[0]){$("#ares").innerHTML='<p class="sm">Primero sube una imagen.</p>';return}
  var sc=[96,91,87];$("#ares").innerHTML='<h4>Resultados ordenados por coincidencia visual</h4><div class="g3">'+P.slice(0,3).map(function(p,i){return card(p,sc[i])}).join("")+"</div>"};
};
})();
