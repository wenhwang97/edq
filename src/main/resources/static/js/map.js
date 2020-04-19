const THREE_STATES = ["California", "Texas", "Rhode Island"];
var map;
var dataLayers = {}; // all dataLayer (geojson)
var r=document.getElementById("countyCheckBox");
var PrecinctCheckBox=document.getElementById("PrecinctCheckBox");
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: US_CENTER,
    zoom: 4.2,
    minZoom: 4.2,
    restriction: {
      latLngBounds: US_STRICT_BOUND,
    },
    styles: SILVIR_STYLE,
    disableDefaultUI: true, // disable all controls
  });
  var usBorderLayer = new google.maps.Data(); // create a layer for us border
  usBorderLayer.loadGeoJson(US_BORDER_PATH); // load all state borders
  usBorderLayer.setMap(map); // add this data layer to map
  dataLayers.usBorderLayer = usBorderLayer; // add
  usBorderLayer.setStyle((feature) => {
    // apply style, dark red for three states, gray for others
    // ternary : if feature is one of the 3 states we pick, the color is dark red (#630b0b) else gray
    var color = THREE_STATES.includes(feature.j.name) ? "#630b0b" : "gray";

    // apply z_index, we dont want gray to override dark red
    var z_index = color == "gray" ? 0 : 1;

    return {
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2,
      zIndex: z_index,
    };
  });
  google.maps.event.addListener(usBorderLayer, "mouseover", (event) => {
    usBorderLayer.revertStyle(); // revertStyle  remove all style overrides

    // only highlight three states
    if (THREE_STATES.includes(event.feature.j.name)) {
      usBorderLayer.overrideStyle(event.feature, { strokeWeight: 4 });
    }
  });
  //鼠标移出，取消高亮
  google.maps.event.addListener(usBorderLayer, "mouseout", (event) => {
    usBorderLayer.revertStyle();
  });

  r.disabled=true;
  PrecinctCheckBox.disabled=true;
  // click event, redirect to state level map
  google.maps.event.addListener(usBorderLayer, "click", (event) => {
    if (THREE_STATES.includes(event.feature.j.name)) {
      switch (event.feature.j.name) {
        // California
        case THREE_STATES[0]:
          r.disabled=false;
          PrecinctCheckBox.disabled=false;
          handleRedirect(
            "California State Level",
            6,
            CAL_CENTER,
            CAL_STRICT_BOUND,
            CAL_COUNTY_PATH,
            CAL_PRECINCT_PATH
          );
          break;
        // Texas
        case THREE_STATES[1]:
          r.disabled=false;
          PrecinctCheckBox.disabled=false;
          r.checked=true;
          PrecinctCheckBox.checked=false;
          handleRedirect(
            "Texas State Level",
            6,
            TEXAS_CENTER,
            TEXAS_STRICT_BOUND,
            TEXAS_COUNTY_PATH,
            TEXAS_PRECINCT_PATH
          );
          break;
        // Rhode Island
        case THREE_STATES[2]:
          r.disabled=false;
          PrecinctCheckBox.disabled=false;
          handleRedirect(
            "Rhode Island State Level",
            9,
            RI_CENTER,
            RI_STRICT_BOUND,
            RI_COUNTY_PATH,
            RI_PRECINCT_PATH
          );
          break;
      }
    }
  });
}
// remove all dataLayer from map
function removeAllGeojson() {
  for (var layer in dataLayers) {
    dataLayers[layer].setMap(null); // setMap(null) = removing it from map
  }
}
// function removeCountyGeojson(CountyLayer) {
//   for (var layer in CountyLayer) {
//     CountyLayer.setMap(null); // setMap(null) = removing it from map
//   }
// }
function styleCounties(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      strokeColor: "#4582e6",
      strokeWeight: 2,
      zIndex: 0,
    };
  });
}
function stylePrecincts(dataLayer) {
  dataLayer.setStyle((feature) => {
    return {
      fillColor: "#a8329e",
      strokeColor: "#a8329e",
      strokeWeight: 2,
      zIndex: 1, // we want to show precinct line above counties
    };
  });
}

/**
 * this function handles redirection via clicking on US map
 * @param {*} pageTitle : (string) title of new page
 * @param {*} zoomLevel : (int) zoom level for new map
 * @param {*} mapCenter : (coordinate obj) new center for the map
 * @param {*} borderRestriction : (coordinate obj) new border restriction
 * @param {*} countyDataPath : (string) path for the state county geographic data
 * @param {*} precinctDataPath: (string) path for the precinct geographic data
 */
var precinctNumber;
function handleRedirect(
  pageTitle,
  zoomLevel,
  mapCenter,
  borderRestriction,
  countyDataPath,
  precinctDataPath
) {
  // change page title
  // refreshButton.page_title = pageTitle;

  // change map setting
  map.setZoom(zoomLevel);
  map.setCenter(mapCenter);
  map.setRestriction({ latLngBounds: borderRestriction });


  // load texas geographic data
  removeAllGeojson(); // clear map
  switch (pageTitle) {
    case "Texas State Level":
      texasBoderLayer = new google.maps.Data();
      texasBoderLayer.loadGeoJson(TEXAS_BODER);
      texasBoderLayer.setMap(map);

      texasCountyLayer = new google.maps.Data();
      texasCountyLayer.loadGeoJson(countyDataPath);
      texasCountyLayer.setMap(map);
      dataLayers.texasCountyLayer = texasCountyLayer;
      styleCounties(texasCountyLayer); // apply style to county data
//=============precinct===============================
      // texasPrecinctLayer = new google.maps.Data();
      // texasPrecinctLayer.loadGeoJson(precinctDataPath);
      // texasPrecinctLayer.setMap(map);
      // dataLayers.texasPrecinctLayer = texasPrecinctLayer;
      // stylePrecincts(texasPrecinctLayer); // apply style to precinct data

      r.addEventListener( 'change', function() {
        if(this.checked) {
          texasCountyLayer = new google.maps.Data();
          texasCountyLayer.loadGeoJson(countyDataPath);
          texasCountyLayer.setMap(map);
          dataLayers.texasCountyLayer = texasCountyLayer;
          styleCounties(texasCountyLayer); // apply style to county data
        } else {
          texasCountyLayer.setMap(null);
        }
    });
    PrecinctCheckBox.addEventListener( 'change', function() {
      if(this.checked) {
        texasPrecinctLayer = new google.maps.Data();
        texasPrecinctLayer.loadGeoJson(precinctDataPath);
        texasPrecinctLayer.setMap(map);
        dataLayers.texasPrecinctLayer = texasPrecinctLayer;
        stylePrecincts(texasPrecinctLayer); // apply style to precinct data
        google.maps.event.addListener(
          texasPrecinctLayer,
          "mouseover",
          (event) => {
            texasPrecinctLayer.revertStyle(); // revertStyle  remove all style overrides
            texasPrecinctLayer.overrideStyle(event.feature, { strokeWeight: 4 });
          }
        );
        //鼠标移出，取消高亮
        google.maps.event.addListener(texasPrecinctLayer, "mouseout", (event) => {
          texasPrecinctLayer.revertStyle();
        });
        google.maps.event.addListener(texasPrecinctLayer, "click", (event) => {
          precinctNumber = event.feature.j.PREC;
          console.log(event.feature.j.PREC); //get the name/number of precinct
          openNav();
        });
      }
  });
      // google.maps.event.addListener(
      //   texasPrecinctLayer,
      //   "mouseover",
      //   (event) => {
      //     texasPrecinctLayer.revertStyle(); // revertStyle  remove all style overrides
      //     texasPrecinctLayer.overrideStyle(event.feature, { strokeWeight: 4 });
      //   }
      // );
      // //鼠标移出，取消高亮
      // google.maps.event.addListener(texasPrecinctLayer, "mouseout", (event) => {
      //   texasPrecinctLayer.revertStyle();
      // });
      // google.maps.event.addListener(texasPrecinctLayer, "click", (event) => {
      //   precinctNumber = event.feature.j.PREC;
      //   console.log(event.feature.j.PREC); //get the name/number of precinct
      //   openNav();
      // });
  }
}

