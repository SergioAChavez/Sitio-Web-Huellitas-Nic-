/* Huellitas Nic - datos y utilidades compartidas
   Todo cuelga del objeto global HN para que los archivos se comuniquen entre sí. */
var HN=window.HN=window.HN||{};
HN.R=document.getElementById("hn-root");
HN.$=function(s){return HN.R.querySelector(s)};
HN.$$=function(s){return HN.R.querySelectorAll(s)};

/* Mascotas de ejemplo (las reportadas por usuarios se agregan al inicio) */
HN.P=[
{id:1,n:"Luna",t:"Gato",b:"Mestizo",s:"Hembra",pl:"Managua",d:"20/12/2026",c:"Perdido",i:"1518791841217-8f162f1e1131",x:"Gris con blanco, muy cariñosa. Vista cerca del parque."},
{id:2,n:"Toby",t:"Perro",b:"Mestizo",s:"Macho",pl:"Masaya",d:"20/12/2026",c:"Encontrado",i:"1587300003388-59208cc962cb",x:"Pequeño, café claro, con collar azul."},
{id:3,n:"Beethoven",t:"Perro",b:"Labrador",s:"Macho",pl:"Managua",d:"18/12/2026",c:"Adopción",i:"1552053831-71594a27632d",x:"Juguetón y muy sociable, ideal para familia."},
{id:4,n:"Milo",t:"Gato",b:"Siamés",s:"Macho",pl:"Granada",d:"15/12/2026",c:"Adopción",i:"1495360010541-f48722b34f7d",x:"Independiente, dulce y tranquilo."},
{id:5,n:"Nube",t:"Perro",b:"Chihuahua",s:"Hembra",pl:"León",d:"12/12/2026",c:"Perdido",i:"1543466835-00a7907e9de1",x:"Muy pequeña, color gris, collar rosado."},
{id:6,n:"Canela",t:"Perro",b:"Mestizo",s:"Hembra",pl:"Managua",d:"10/12/2026",c:"Adopción",i:"1587300003388-59208cc962cb",x:"Rescatada, vacunada y esterilizada."},
{id:7,n:"Simba",t:"Gato",b:"Mestizo",s:"Macho",pl:"Estelí",d:"09/12/2026",c:"Encontrado",i:"1514888286974-6c03e2ca1dba",x:"Naranja, encontrado cerca del mercado."},
{id:8,n:"Rocky",t:"Perro",b:"Labrador",s:"Macho",pl:"Managua",d:"08/12/2026",c:"Adopción",i:"1517849845537-4d257902454a",x:"Cachorro dorado, muy tierno."}
];
HN.BR={Perro:["Mestizo","Labrador","Chihuahua","Pastor"],Gato:["Mestizo","Siamés","Persa"],Otro:["Otro"]};
HN.CITY={Managua:[12.115,-86.236],Masaya:[11.974,-86.094],Granada:[11.930,-85.956],"León":[12.437,-86.879],"Estelí":[13.091,-86.354]};
HN.CO=[[12.1450,-86.2550],[12.1350,-86.2200],[12.1050,-86.2500],[12.1250,-86.2700],[12.0900,-86.2300],[12.0750,-86.2600],[12.1600,-86.2400],[12.1000,-86.2050]];

/* Utilidades */
HN.ld=function(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
HN.sv=function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){HN.toast("No se pudo guardar en este navegador.")}};
HN.esc=function(t){return String(t).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
HN.today=function(){return new Date().toLocaleDateString("es-NI")};
HN.toast=function(m){var t=document.createElement("div");t.className="toast";t.textContent=m;HN.R.appendChild(t);setTimeout(function(){t.remove()},3200)};
HN.hs=function(t){return window.crypto&&crypto.subtle?crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")}):Promise.resolve(btoa(unescape(encodeURIComponent(t))))};
HN.rez=function(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,700/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.72))};im.onerror=function(){cb(null)};im.src=r.result};r.readAsDataURL(file)};
HN.savePets=function(){HN.sv("hn_pets",HN.P.filter(function(p){return p.owner}))};
