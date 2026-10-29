/* Huellitas Nic - mapa (API de Leaflet + OpenStreetMap) */
(function(){
var HN=window.HN,P=HN.P,$=HN.$,$$=HN.$$,img=HN.img,
 CL={"Perdido":"marcador-rojo","Encontrado":"marcador-verde","Adopción":"marcador-morado"},MK={},curK="all";

function addMk(p){if(!HN.mapa||MK[p.id])return;
 var m=L.marker(p.ll,{icon:L.divIcon({className:"",html:'<div class="marcador '+CL[p.c]+'"><span><i class="ic ic-paw"></i></span></div>',iconSize:[32,32],iconAnchor:[16,32]})});
 m.bindTooltip(p.n);
 m.bindPopup('<div class="popup-mascota"><img src="'+img(p)+'" alt="'+p.n+'"><h3>'+p.n+'</h3><span class="tag '+p.c+'">'+p.c+'</span><p><i class="ic ic-pin"></i> '+p.pl+'</p><p><i class="ic ic-cal"></i> '+p.d+'</p><p>'+p.x+'</p><button class="pri" data-d="'+p.id+'" style="width:100%">Ver publicación</button></div>',{maxWidth:270});
 MK[p.id]=m}

/* Muestra u oculta marcadores según el filtro y actualiza el contador */
HN.pins=function(k){if(k)curK=k;if(!HN.mapa)return;var n=0;
 P.forEach(function(p){addMk(p);var m=MK[p.id],on=!p.done&&(curK==="all"||p.c===curK);if(on){HN.mapa.addLayer(m);n++}else HN.mapa.removeLayer(m)});
 Object.keys(MK).forEach(function(id){if(!P.some(function(p){return p.id==id})){HN.mapa.removeLayer(MK[id]);delete MK[id]}});
 $("#mc").innerHTML='<i class="ic ic-paw"></i> '+n+" mascotas en el mapa"};

HN.initMapa=function(){
 P.forEach(function(p,i){if(!p.ll)p.ll=HN.CO[i%HN.CO.length]});
 if(!window.L)return;
 var mapa=HN.mapa=L.map("mapa-leaflet").setView([12.1150,-86.2362],12);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(mapa);
 mapa.on("popupopen",function(e){var b=e.popup.getElement().querySelector("[data-d]");if(b)b.onclick=function(){HN.details(b.dataset.d)}});
 $("#mk").onclick=function(e){var k=e.target.dataset.k;if(!k)return;$$("#mk button").forEach(function(b){b.classList.toggle("on",b===e.target)});HN.pins(k)};
 HN.pins("all");
};
})();
