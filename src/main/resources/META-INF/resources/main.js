let resURL = "/items";
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
var data = [];

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new ol.Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

var map = new ol.Map({
  target: 'map',
  layers: [new ol.layer.Tile({source: new ol.source.OSM()})], 
  overlays: [overlay],
  view: new ol.View({
    center: ol.proj.fromLonLat([22.26608939141668, 60.45634560966845]),
    zoom: 12
  })
});

const normalStyle = new ol.style.Style({image: new ol.style.Icon({crossOrigin: 'anonymous',scale: "0.008",src: "placeholder.png",}),});
const biggerStyle = new ol.style.Style({image: new ol.style.Icon({crossOrigin: 'anonymous',scale: "0.012",src: "placeholder.png",}),});

let highlightedFeatures = [];
map.on('pointermove', function(e) {
  highlightedFeatures.forEach(f => f.setStyle(normalStyle));
  highlightedFeatures = [];

  map.forEachFeatureAtPixel(e.pixel, f => {
    f.setStyle(biggerStyle)
    highlightedFeatures.push(f);
  });
});

map.on('click', function(event) {
  map.forEachFeatureAtPixel(event.pixel, function(feature) {
    if ( feature.getId() > 0) {
      if(data.length > 0){
              data.map((item) => {
                if(item.id === feature.getId()){
                  content.innerHTML = '<p><b>' + item.name + '</b></br>' + item.description + '</p>';
                  overlay.setPosition(event.coordinate);
                  const response = new XMLHttpRequest();
                  response.open("POST", '/item', true);
                  response.send(JSON.stringify(item));
              }});
            }        
            
    }
  });
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const vectorLayer = new ol.layer.Vector({source: new ol.source.Vector(),}); 
const vectorSource = vectorLayer.getSource();

xhr.open("GET", resURL, true);
xhr.send();


xhr.onload = () => {
  data = xhr.response;
  data.map((item) => {
    if(item !== null){
      var feature = new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat([item.longitude, item.latitude])),})
      feature.setStyle(normalStyle)
      feature.setId(item.id)
      vectorSource.addFeature(feature)
  }});
  
  vectorLayer.setSource(vectorSource)

};

xhr.onerror = () => {
    console.log("Request failed!");
};
map.addLayer(vectorLayer)
map.render()
