/* Huellitas Nic - arranque: se carga al final, cuando todos los demás archivos ya están listos */
(function(){
var HN=window.HN;
/* mascotas publicadas por usuarios (guardadas en este navegador) */
(HN.ld("hn_pets")||[]).forEach(function(p){HN.P.unshift(p)});
HN.initUI();
HN.initMascotas();
HN.initMapa();
HN.initCuentas();
HN.initReportes();
HN.initIA();
HN.refresh();
})();
