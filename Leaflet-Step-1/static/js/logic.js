// Create variable for url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform GET request to query URL
d3.json(queryUrl).then(function (data) {
  // Make sure data came through
  console.log(data.features);
  // Send data.features object to createFeatures function
  createFeatures(data.features);
});


function createFeatures(earthquakeData) {
// Give each feature a popop to display size and place and date of earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}<hr> Magnitude: ${feature.properties.mag}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
  }

  // Define markerSize() function based on magnitude of earthquake
  function markerSize(mag) {
    return mag * 25000;
  }
  // Create variable for GeoJSON layer to add to map
  var earthquakes = L.geoJSON(earthquakeData, {    
    onEachFeature: onEachFeature
  });

  // Send GeoJSOn layer to createmap function
  createMap(earthquakes)
};

function createMap(earthquakes) {

// Base layer map - grayscale found on github, https://github.com/leaflet-extras/leaflet-providers/issues/316, http://leaflet-extras.github.io/leaflet-providers/preview/#filter=CartoDB.Positron
var grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

// Base layer map - optional requirement for outdoors map if I can figure it out
var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11.html?title=true&access_token={api}', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  api: API_KEY
});

  // Base layer map - optional requirement for satellite map if I can figure it out
var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11.html?title=true&access_token={api}', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  api: API_KEY
});

// Base layer variable in case I add more than just 'street'
var baseMaps = {
  Grayscale: grayscale, 
  Outdoors: outdoors, 
  Satellite: satellite
};

// Create overlay to hold popup overlay
var overlayMaps = {
  Earthquakes: earthquakes
};

// Define a map object.
var myMap = L.map("map", {
  center: [40.7608, -111.8910],
  zoom: 5,
  layers: [grayscale, earthquakes]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


};

