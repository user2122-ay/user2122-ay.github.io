// Cyberpunk FX — partículas flotantes compartidas
(function () {
  var host = document.querySelector('.bg-fx');
  if (!host) return;

  var count = window.innerWidth < 640 ? 14 : 24;

  for (var i = 0; i < count; i++) {
    var p = document.createElement('span');
    p.className = 'particle' + (Math.random() > 0.6 ? ' magenta' : '');
    var left = Math.random() * 100;
    var duration = 10 + Math.random() * 14;
    var delay = Math.random() * -20;
    var drift = (Math.random() * 60 - 30) + 'px';
    p.style.left = left + 'vw';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    p.style.setProperty('--drift', drift);
    host.appendChild(p);
  }
})();

