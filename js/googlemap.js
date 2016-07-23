function loadGoogleMapScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=false&callback=initialize&key=AIzaSyBYlM25zhB3oeKDtlXUElqvxj25ob5sv7w';
  document.body.appendChild(script);
}

window.initialize = function(){
    window.google_map_has_initial = true;
}
window.onload = loadGoogleMapScript;