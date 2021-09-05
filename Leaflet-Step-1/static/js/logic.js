// Create variable for url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

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
    layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}<hr> Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
  }

  // Create variable for GeoJSON layer to add to map
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send GeoJSOn layer to createmap function
  createMap(earthquakes)
};

function createMap(earthquakes) {
  // Base layer map - optional requirement for satellite map if I can figure it out
// var satellite = L.tileLayer(''
// });

// Base layer map - grayscale found on github, https://github.com/leaflet-extras/leaflet-providers/issues/316, http://leaflet-extras.github.io/leaflet-providers/preview/#filter=CartoDB.Positron
var grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

// Base layer map - optional requirement for outdoors map if I can figure it out
// var outdoors = L.tileLayer(''
// });

// Base layer variable in case I add more than just 'street'
var baseMaps = {
  Grayscale: grayscale,  
};

// Create overlay to hold popup overlay
var overlayMaps = {
  Earthquakes: earthquakes
};

// Define a map object.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [grayscale, earthquakes]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();


// // Perform an API call to get the earthquake data. Call createMarkers when it completes.
// d3.json(earthquakedata).then(createMarkers);

};

