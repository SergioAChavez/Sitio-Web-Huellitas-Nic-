/* Huellitas Nic - cuentas, sesión, "Mi cuenta" y solicitudes de adopción */
(function(){
var HN=window.HN,P=HN.P,R=HN.R,$=HN.$,esc=HN.esc,toast=HN.toast,img=HN.img;
HN.USERS=HN.ld("hn_users")||{};
HN.sess=HN.ld("hn_sess");if(!HN.USERS[HN.sess])HN.sess=null;
var au;

function authNav(){au.innerHTML=HN.sess?'<button class="nv" data-p="cuenta">'+HN.USERS[HN.sess].name.split(" ")[0]+' (mi cuenta)</button>':'<button class="nv" data-p="login">Iniciar sesión</button>'}
function login(em){HN.sess=em;HN.sv("hn_sess",em);authNav();HN.show("cuenta")}
/* Pide iniciar sesión antes de continuar */
HN.need=function(pg,msg){toast(msg);$("#mo").classList.remove("on");HN.show(pg)};

function row(p){return '<div class="card stp rw"><img src="'+img(p)+'" alt="" class="rw-i"><div class="rw-m"><div class="rw-t"><b>'+p.n+'</b><span class="tag '+p.c+'">'+p.c+'</span>'+(p.done?'<span class="tag done">Resuelto</span>':'')+'</div><p class="sm">'+p.t+' · '+p.pl+' · '+p.d+'</p></div><div class="rw-b"><button class="sec" data-d="'+p.id+'">Ver</button>'+(p.done?'':'<button class="sec" data-res="'+p.id+'">Marcar resuelto</button>')+'<button class="sec del" data-del="'+p.id+'">Eliminar</button></div></div>'}
HN.renderCuenta=function(){var u=HN.USERS[HN.sess];if(!u)return;
 var mine=P.filter(function(p){return p.owner===HN.sess}),rq=(HN.ld("hn_req")||[]).filter(function(r){return r.user===HN.sess});
 $("#cuenta-body").innerHTML='<div class="pn"><h2>Hola, '+u.name+'</h2><p class="sm">'+esc(HN.sess)+'</p><button class="pri" data-go="reporte">Nuevo reporte</button><button class="sec" data-out>Cerrar sesión</button></div><h2 class="h2">Mis reportes ('+mine.length+')</h2>'+(mine.length?mine.map(row).join(""):'<p class="sm">Aún no has publicado reportes.</p>')+'<h2 class="h2">Mis solicitudes de adopción ('+rq.length+')</h2>'+(rq.length?rq.map(function(r){return '<div class="pn" style="margin-bottom:12px;padding:16px"><div class="rw-t"><b>'+r.pet+'</b><span class="tag Adopción">Solicitud enviada</span></div><p class="sm">'+r.d+' · Vivienda: '+r.v+' · Tel: '+r.t+'</p><p class="sm">'+r.m+'</p></div>'}).join(""):'<p class="sm">Aún no has enviado solicitudes.</p>')};

/* Formulario de solicitud de adopción */
HN.adoptForm=function(id){var p=P.filter(function(x){return x.id==id})[0];if(!HN.sess){HN.need("login","Inicia sesión para solicitar una adopción.");return}
 HN.modal('<h2>Solicitud de adopción: '+p.n+'</h2><form id="af"><label>Nombre completo</label><input name="n" required value="'+HN.USERS[HN.sess].name+'"><label>Teléfono</label><input name="t" required><label>Correo</label><input name="e" type="email" required value="'+esc(HN.sess)+'"><label>Tipo de vivienda</label><select name="v"><option>Casa</option><option>Apartamento</option></select><label>¿Por qué deseas adoptar?</label><textarea name="m" required></textarea><p class="sm"><b>Requisitos:</b> hogar seguro, alimentación, vacunas, veterinario, esterilización y compromiso de no maltratar ni vender al animal.</p><label><input type="checkbox" required style="width:auto;display:inline"> Cumplo los requisitos</label><br><button class="pri">Enviar solicitud</button></form>');
 $("#af").onsubmit=function(e){e.preventDefault();var f=this.elements,rq=HN.ld("hn_req")||[];
  rq.push({user:HN.sess,pid:p.id,pet:p.n,n:esc(f.n.value),t:esc(f.t.value),e:esc(f.e.value),v:f.v.value,m:esc(f.m.value),d:HN.today()});
  HN.sv("hn_req",rq);$("#mo").classList.remove("on");toast("Solicitud enviada para "+p.n+". El publicador te contactará.")}};

HN.initCuentas=function(){
 au=document.createElement("span");au.style.display="contents";$("nav").appendChild(au);authNav();
 /* "Mi cuenta" solo con sesión iniciada */
 var base=HN.show;HN.show=function(id){if(id==="cuenta"){if(!HN.sess){toast("Inicia sesión para ver tu cuenta.");id="login"}else HN.renderCuenta()}base(id)};
 $("#cf").onsubmit=function(e){e.preventDefault();var i=this.querySelectorAll("input"),n=i[0].value.trim(),em=i[1].value.trim().toLowerCase();
  if(i[2].value!==i[3].value){toast("Las contraseñas no coinciden.");return}if(HN.USERS[em]){toast("Ese correo ya está registrado.");return}
  HN.hs(i[2].value).then(function(h){HN.USERS[em]={name:esc(n),h:h};HN.sv("hn_users",HN.USERS);login(em);toast("Cuenta creada. ¡Bienvenido!")})};
 $("#lf").onsubmit=function(e){e.preventDefault();var i=this.querySelectorAll("input"),em=i[0].value.trim().toLowerCase();
  HN.hs(i[1].value).then(function(h){var u=HN.USERS[em];if(!u||u.h!==h){toast("Correo o contraseña incorrectos.");return}login(em);toast("Sesión iniciada.")})};
 /* acciones de Mi cuenta */
 R.addEventListener("click",function(e){var t=e.target,a;
  if((a=t.closest("[data-res]"))){var p=P.filter(function(x){return x.id==a.dataset.res})[0];if(p){p.done=true;HN.savePets();HN.refresh();toast("Marcado como resuelto.")}}
  else if((a=t.closest("[data-del]"))){if(confirm("¿Eliminar este reporte?")){var i=P.findIndex(function(x){return x.id==a.dataset.del});if(i>-1){P.splice(i,1);HN.savePets();HN.refresh();toast("Reporte eliminado.")}}}
  else if(t.closest("[data-out]")){HN.sess=null;try{localStorage.removeItem("hn_sess")}catch(x){}authNav();HN.show("inicio");toast("Sesión cerrada.")}});
};
})();
