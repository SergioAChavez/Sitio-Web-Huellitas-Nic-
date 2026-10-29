/* Huellitas Nic - formulario para publicar reportes */
(function(){
var HN=window.HN,P=HN.P,$=HN.$,$$=HN.$$,esc=HN.esc;
var FOTO="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=700&q=80";

HN.initReportes=function(){
 $("#rk").onclick=function(e){if(!e.target.dataset.k)return;$$("#rk button").forEach(function(b){b.classList.toggle("on",b===e.target)})};
 $("#rin").onchange=function(){if(this.files[0])$("#rimg").src=URL.createObjectURL(this.files[0])};
 $("#esp").onchange=function(){$("#raz").innerHTML='<option value="">Seleccione una raza</option>'+(HN.BR[this.value]||[]).map(function(b){return"<option>"+b+"</option>"}).join("")};
 $("#rf").onsubmit=function(e){e.preventDefault();
  if(!HN.sess){HN.need("login","Inicia sesión para publicar un reporte.");return}
  var f=this,ins=f.querySelectorAll("input"),sel=f.querySelectorAll("select"),k=f.querySelector("#rk .on").dataset.k,file=$("#rin").files[0];
  function fin(u){var city=sel[2].value,b=HN.CITY[city]||HN.CITY.Managua,t=sel[0].value,
   p={id:Date.now(),n:esc(ins[0].value.trim()),t:t,b:esc(sel[1].value),s:sel[3].value,pl:city,d:HN.today(),c:k,
      i:t==="Gato"?"1514888286974-6c03e2ca1dba":"1587300003388-59208cc962cb",
      x:esc(f.querySelector("textarea").value.trim())||"Sin descripción.",tel:esc(ins[1].value.trim()),owner:HN.sess,
      ll:[b[0]+(Math.random()-.5)*.05,b[1]+(Math.random()-.5)*.05]};
   if(u)p.u=u;
   P.unshift(p);HN.savePets();HN.refresh();
   f.reset();$("#raz").innerHTML='<option value="">Seleccione una raza</option>';$("#rin").value="";$("#rimg").src=FOTO;
   HN.toast("Reporte publicado correctamente.");HN.show(k==="Adopción"?"adoptar":"buscar")}
  file?HN.rez(file,fin):fin(null)};
};
})();
