(function(){
  var PAGES = [
    { file: 'index.html',            label: '01 Portada' },
    { file: 'introduccion.html',     label: '02 Introducci\u00f3n' },
    { file: 'ventajas.html',         label: '03 Ventajas' },
    { file: 'guia-instalacion.html', label: '04 Instalaci\u00f3n' },
    { file: 'requisitos.html',       label: '05 Requisitos' },
    { file: 'manual.html',           label: '06 Manual' },
    { file: 'videos.html',           label: '07 Videos' },
    { file: 'quiz.html',             label: '08 Quiz' }
  ];

  var STORAGE_KEY = 'tema1-visited-pages';

  function currentFile(){
    var path = window.location.pathname.split('/').pop();
    if (!path || path === '') return 'index.html';
    return path;
  }

  function getVisited(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch(e){ return []; }
  }

  function markVisited(file){
    try{
      var visited = getVisited();
      if (visited.indexOf(file) === -1){
        visited.push(file);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
      }
    }catch(e){ /* localStorage no disponible */ }
  }

  var current = currentFile();
  markVisited(current);
  var visited = getVisited();

  var nav = document.createElement('nav');
  nav.id = 'site-nav';

  var linksHtml = PAGES.map(function(p){
    var classes = ['sn-link'];
    if (p.file === current) classes.push('current');
    else if (visited.indexOf(p.file) !== -1) classes.push('visited');
    return '<a class="' + classes.join(' ') + '" href="' + p.file + '">' + p.label + '</a>';
  }).join('');

  var pct = Math.round((visited.length / PAGES.length) * 100);

  nav.innerHTML =
    '<div class="sn-inner">' +
      '<a class="sn-home" href="index.html"><span class="sn-dot"></span>Tema #1</a>' +
      '<div class="sn-links">' + linksHtml + '</div>' +
      '<div class="sn-progress">' +
        '<span class="sn-progress-text">' + visited.length + '/' + PAGES.length + '</span>' +
        '<span class="sn-bar"><span class="sn-bar-fill" style="width:' + pct + '%"></span></span>' +
      '</div>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  // keep the current link scrolled into view on small screens
  var currentLink = nav.querySelector('.sn-link.current');
  if (currentLink && currentLink.scrollIntoView){
    setTimeout(function(){
      currentLink.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
    }, 0);
  }
})();

