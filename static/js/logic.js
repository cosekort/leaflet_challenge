var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let myMap = L.map("map", {
    center: [
      40.7, -94.5
    ],
    zoom: 3
  });
  
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(myMap);
  
  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><p>Magnitude: ${feature.properties.mag}</p>
                         <p>Depth: ${feature.geometry.coordinates[2]} km</p>
                         <p>${new Date(feature.properties.time)}</p>`);
      }
  
      function markerColor(depth) {
        return depth > 90 ? '#ea2c2c' :
               depth > 70 ? '#ea822c' :
               depth > 50 ? '#ee9c00' :
               depth > 30 ? '#eecc00' :
               depth > 10 ? '#d4ee00' :
                            '#98ee00';
      }
  
      function markerSize(magnitude) {
        return magnitude * 20000;
      }
  
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circle(latlng, {
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Magnitude: "
            + feature.properties.mag
            + "<br>Depth: "
            + feature.geometry.coordinates[2]
            + "<br>Location: "
            + feature.properties.place
          );
        }
  
     
      }).addTo(myMap);
  
      // Legend
    let legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'legend'),
            depths = [-10, 10, 30, 50, 70, 90],
            labels = [];
            colors =["#ea2c2c","#ea822c","#ee9c00" ,"#eecc00" ,"#d4ee00","#98ee00"]


        return div;
      };
  
      legend.addTo(myMap);
    })
    .catch(error => console.error('Error fetching earthquake data:', error));
  // //////////////////////////////////////////
  let basemap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
    {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    });
  