// Create variable for url
var earthquakedata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// Base layer map - grayscale found on github, https://github.com/leaflet-extras/leaflet-providers/issues/316, http://leaflet-extras.github.io/leaflet-providers/preview/#filter=CartoDB.Positron
var street = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

// Base layer variable in case I add more than just 'street'
var baseMaps = {
  Street: street,  
};

// Define a map object.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [street]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();


// // Perform an API call to get the earthquake data. Call createMarkers when it completes.
// d3.json(earthquakedata).then(createMarkers);