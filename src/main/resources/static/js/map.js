const THREE_STATES = ["Virginia", "Texas", "Rhode Island"];
var map;
var dataLayers = {}; // all dataLayer (geojson)
var r = document.getElementById("show-county");
var parkcheck = document.getElementById("national-parks");
var precinctCheckBox=document.getElementById("show-precinct");
var changeBoundaryButton = document.getElementById("changeBoundary");
var addNeighbourButton = document.getElementById("addNeighbour");
var addNeighbourConfirm = document.getElementById("addNeighbourConfirm");
var countyandState = document.getElementById("sidepaneTitle");
var currentCounty;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: US_CENTER,
    zoom: 4.2,
    minZoom: 4.2,
    // maxZoom: 4.2,
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
  precinctCheckBox.disabled=true;
  changeBoundaryButton.disabled=true;
  addNeighbourButton.disabled = true;
  addNeighbourConfirm.disabled = true;
  // click event, redirect to state level map
  google.maps.event.addListener(usBorderLayer, "click", async function(event) {
    console.log(event.feature.j.name);
    if (THREE_STATES.includes(event.feature.j.name)) {

      let response;
      switch (event.feature.j.name) {

        case THREE_STATES[0]:// fujiniya
          clickedState="va";
          r.disabled=false;
          $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
          response = await fetch("http://localhost:8080/state/va");
          $.unblockUI();
          if(response.status==500){
            break;
          }
          // console.log(response);
          vgBoderLayer = new google.maps.Data();
          vgBoderLayer.loadGeoJson(VA_STATE);
          vgBoderLayer.setMap(map);
          styleState(vgBoderLayer);
          var virginia = new State("va", "Virginia");
          allStates["va"] = virginia;
          await handleRedirect("Virginia State Level", 6, VA_CENTER, VA_STRICT_BOUND,virginia);
          break;

        case THREE_STATES[1]:// Texas
          clickedState="tx";
          r.disabled=false;
          $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
          response = await fetch("http://localhost:8080/state/tx");
          $.unblockUI();
          if(response.status==500){
            break;
          }
          // console.log(response);
          txBoderLayer = new google.maps.Data();
          txBoderLayer.loadGeoJson(TEXAS_BODER);
          txBoderLayer.setMap(map);
          styleState(txBoderLayer);
          var Texas = new State("tx", "Texas");
          allStates["tx"] = Texas;
          await handleRedirect("Texas State Level", 6, TEXAS_CENTER, TEXAS_STRICT_BOUND,Texas);
          break;

        case THREE_STATES[2]:// Rhode Island
          clickedState="ri";
            console.log("RI");
          r.disabled=false;
          $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
          response = await fetch("http://localhost:8080/state/ri");
          $.unblockUI();
          if(response.status==500){
            break;
          }
          // console.log(response);
          riBoderLayer = new google.maps.Data();
          riBoderLayer.loadGeoJson(RI_STATE);
          riBoderLayer.setMap(map);
          styleState(riBoderLayer);
          var rhode = new State("ri", "Rhode Island");
          allStates["ri"] = rhode;
          await handleRedirect("Rhode Island State Level", 9, RI_CENTER, RI_STRICT_BOUND,rhode);
          // console.log(allStates["ri"].getAllCounties());
          break;
      }
    }
  });
}
var stateChoose = document.getElementById("chooseStateBox");
async function loadstates(stateName) {
  if (THREE_STATES.includes(stateName)) {
    let response;
    switch (stateName) {

      case THREE_STATES[0]:// fujiniya
        stateChoose.textContent = "Virginia";
        clickedState = "va";
        r.disabled = false;
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        response = await fetch("http://localhost:8080/state/va");
        $.unblockUI();
        if (response.status == 500) {
          break;
        }
        // console.log(response);
        vgBoderLayer = new google.maps.Data();
        vgBoderLayer.loadGeoJson(VA_STATE);
        vgBoderLayer.setMap(map);
        styleState(vgBoderLayer);
        var virginia = new State("va", "Virginia");
        allStates["va"] = virginia;
        await handleRedirect("Virginia State Level", 6, VA_CENTER, VA_STRICT_BOUND, virginia);
        break;

      case THREE_STATES[1]:// Texas
        stateChoose.textContent = "Texas";
        clickedState = "tx";
        r.disabled = false;
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        response = await fetch("http://localhost:8080/state/tx");
        $.unblockUI();
        if (response.status == 500) {
          break;
        }
        // console.log(response);
        txBoderLayer = new google.maps.Data();
        txBoderLayer.loadGeoJson(TEXAS_BODER);
        txBoderLayer.setMap(map);
        styleState(txBoderLayer);
        var Texas = new State("tx", "Texas");
        allStates["tx"] = Texas;
        await handleRedirect("Texas State Level", 6, TEXAS_CENTER, TEXAS_STRICT_BOUND, Texas);
        break;

      case THREE_STATES[2]:// Rhode Island
        // stateChoose.textContent = "Rhode Island";
        clickedState = "ri";
        console.log("RI");
        r.disabled = false;
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        response = await fetch("http://localhost:8080/state/ri");
        $.unblockUI();
        if (response.status == 500) {
          break;
        }
        // console.log(response);
        riBoderLayer = new google.maps.Data();
        riBoderLayer.loadGeoJson(RI_STATE);
        riBoderLayer.setMap(map);
        styleState(riBoderLayer);
        var rhode = new State("ri", "Rhode Island");
        allStates["ri"] = rhode;
        await handleRedirect("Rhode Island State Level", 9, RI_CENTER, RI_STRICT_BOUND, rhode);
        // console.log(allStates["ri"].getAllCounties());
        break;
    }
  }
}


// function clickOnNarv(State){
//   switch (State) {
//     case
//   }
// }
// remove all dataLayer from map
function removeAllGeojson() {
  for (var layer in dataLayers) {
    dataLayers[layer].setMap(null); // setMap(null) = removing it from map
  }
}
function styleState(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      // strokeColor: "#4582e6",
      fillOpacity:0,
      strokeWeight: 2,
      zIndex: 0,
    };
  });
}
function hideCounty(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      // strokeColor: "#4582e6",
      fillOpacity:0,
      strokeWeight: 2,
      zIndex: 0,
    };
  });
}
function styleCounties(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      strokeColor: "#4582e6",
      strokeWeight: 1,
      zIndex: 2,
    };
  });
}
function styleNeighbour(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      fillColor: "rgba(168,50,158,0.25)",
      strokeColor: "rgba(168,50,158,0.28)",
      strokeWeight: 2,
      zIndex: 2,
    };
  });
}
function styleCounty(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      strokeWeight: 1,
      zIndex: 1,
    };
  });
}
function stylePark(dataLayer) {
  console.log("parks layer");
  console.log(dataLayer);
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
      strokeColor: "rgba(81,168,50,0.73)",
      strokeWeight: 1,
      zIndex: 1,
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
let allStates = {};
function getState(ID){
  if (ID in allStates){
    return allStates[ID];
  }else{
    // if we dont have the state yet, make it
    allStates[ID] = new State(ID);
    return allStates[ID];
  }
}
function addParksToMap(parks){
  for (var id in parks){
    console.log("parksaaaaaaa");
    parkLayer = parks[id].getParkLayer();
    parkLayer.setMap(map);
    stylePark(parkLayer);
  }
}
function addCountiesToMap(counties){
  for (var id in counties){
    countyLayer = counties[id].getLayer();
    countyLayer.setMap(map);
    styleCounty(countyLayer);
  }
}
function addPrecinctsToMap(precincts){
  // console.log(precinctLayers);
  // var number =0;
  for (let ID in precincts){
    // number++;
    precincts[ID].getPrecinctLayer().setMap(map);
    styleCounties(precincts[ID].getPrecinctLayer());
  }
  // console.log(number);
}
function removePrecinctToMap(County){
  console.log(County);
  precincts = County.getPrecincts();
  for (let ID in precincts){
    // number++;
    precincts[ID].getPrecinctLayer().setMap(null);
    // styleCounties(precincts[ID].getPrecinctLayer());
  }
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
async function handleRedirect(
    pageTitle,
    zoomLevel,
    mapCenter,
    borderRestriction,
    state
) {
  // change page title
  // refreshButton.page_title = pageTitle;
  // change map setting
  map.setZoom(zoomLevel);
  map.setCenter(mapCenter);
  map.setRestriction({latLngBounds: borderRestriction});
  // load texas geographic data
  removeAllGeojson(); // clear map



  var stateName;
  var OfficalStateName;
  switch (pageTitle) {
    case "Virginia State Level":
      stateName='va';
      OfficalStateName="Virginia";
      break;
    case "Rhode Island State Level":
      stateName='ri';
      OfficalStateName="Rhode Island";
      break;
    case "Texas State Level":
      stateName='tx';
      OfficalStateName="Texas";
      break;

  }
  rhode = state;
  // let response = await fetch("http://localhost:8080/state/ri");
  // console.log(response);
  // let RIJson = await response.json();
  // console.log(RIJson);
  if (state.hasCounties()) {  //
    console.log("has!!!!!");
    counties = state.getAllCounties();
    addCountiesToMap(counties);
  } else {  //fetch the data
    var url = 'http://localhost:8080/state/'+stateName+'/show-counties';
    // /state/{stateId}/show-parks
    var parkurl = 'http://localhost:8080/state/'+stateName+'/show-parks';
    console.log(url);
    // document.body.style.cursor="not-allowed";
    $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
    let response = await fetch(url);
    let myJson = await response.json();
    let parkresponse = await fetch(parkurl);
    let parkJson = await parkresponse.json();
    // document.body.style.cursor = "default";
    $.unblockUI();
    console.log(parkJson);
    console.log(myJson);
    var tottalCounties = [];
    console.log(myJson);
    for (i = 0; i < myJson.length; i++) {  //how many counties
      var countyCoords = [];
      var county = new County(myJson[i].id);
      county.name = myJson[i].name;
      for (j = 0; j < myJson[i].obj.length; j++) {  //for current counties
        var countyPolygon = [];
        for (k = 0; k < myJson[i].obj[j].vertices.length; k++) { //for current counties'polygon
          countyPolygon.push({lat: myJson[i].obj[j].vertices[k].y_pos, lng: myJson[i].obj[j].vertices[k].x_pos});
        }
        countyCoords.push(countyPolygon);
      }
      tottalCounties.push(countyCoords);
      Countydata = new google.maps.Data();
      geometry = new google.maps.Data.Polygon(countyCoords);
      Countydata.add({geometry: geometry, id: myJson[i].id});
      county.setCountyLayer(Countydata);
      state.addCounty(county.id, county);
      console.log(county.id);
      // localStorage.setItem(rhode);
    }
    for (i = 0; i < parkJson.length; i++) {  //how many parks
      var parkCoords = [];
      var park = new Park(parkJson[i].id);
      for (j = 0; j < parkJson[i].boundary.length; j++) {  //for current parks
        var parkPolygon = [];
        for (k = 0; k < parkJson[i].boundary[j].vertices.length; k++) { //for current park's polygon
          parkPolygon.push({lat: parkJson[i].boundary[j].vertices[k].y_pos, lng: parkJson[i].boundary[j].vertices[k].x_pos});
        }
        parkCoords.push(parkPolygon);
      }
      // tottalCounties.push(parkCoords);
      Parkdata = new google.maps.Data();
      console.log(parkCoords);
      geometry = new google.maps.Data.Polygon(parkCoords);
      park.coord=parkCoords;
      Parkdata.add({geometry: geometry, id: parkJson[i].id});
      park.setParkLayer(Parkdata);
      state.addPark(park.id, park);
      console.log(park.id);
      // localStorage.setItem(rhode);
    }


    r.addEventListener('change', function () {  //county's check boxes
      if (this.checked) {
        addCountiesToMap(state.getAllCounties());
      } else {
        counties = state.getAllCounties();
        for (let ID in counties) {
          countyLayer = counties[ID].getLayer();
          countyLayer.setMap(null);
        }
      }
    });
    var marker
    parkcheck.addEventListener('change', function () {  //county's check boxes
      if (this.checked) {
        console.log(state.getAllParks());
        addParksToMap(state.getAllParks());
        console.log(park.coord[0][0]);
        // marker = new google.maps.Marker({
        //   position: park.coord[0][0],
        //   map: map,
        //   title: 'Hello World!'
        // });
      } else {
        parks = state.getAllParks();
        console.log(parks);
        for (let ID in parks) {
          parkLayer = parks[ID].getParkLayer();
          console.log(parkLayer);
          parkLayer.setMap(null);
          // marker.setMap(null);
        }
      }
    });
    console.log(state.getAllCounties());
    counties = state.getAllCounties();
    let countyID;
    console.log("counties:  ");
    console.log(counties);
    // let currentCounty;
    for (let ID in counties) {
      // console.log(counties[ID]);
      countyLayer = counties[ID].getLayer();
      let havePrecinct = 0;

      google.maps.event.addListener(countyLayer, 'click', function (event) {  //when click on a county
        // counties[ID].getLayer().setStyle((feature) => {
        //   return {
        //     fillColor: "rgba(255,255,255,0)",
        //     strokeColor: "rgb(144,143,143)",
        //     strokeWeight: 1,
        //     zIndex: 1,
        //   };
        // });
        // markDrop(event);
        countyID = event.feature.o; //get the current county ID
        var countyName = countyID.substring(3);
        // var name = selectedCounty.name;

        sidepanePrecinctName.textContent=null;
        var selectedCounty = state.getCountyByID(countyID); //get current county object in the state
        var name = selectedCounty.name;
        countyandState.textContent=name+", "+OfficalStateName;
        console.log(selectedCounty.hasPrecincts());
        if(!isEmptyObject(rectangle)){  // change border
          console.log("it is not null");
          console.log(rectangle);
          for(var i in rectangle){
            rectangle[i].setMap(null);
            // rectangle[i].setPath(null);
          }
        }
        if (selectedCounty.hasPrecincts()) {  //when there is precinct exist
          precincts = selectedCounty.getPrecincts();  //load the precinct
          // console.log(precinctLayers);
          var i = 0;
          for (let ID in precincts) {  //check the map is loaded or not
            if (precincts[ID].getPrecinctLayer().getMap() == null) {
              i++;
            }
          }
          // console.log(i);
          if (i != 0) {//not loaded
            console.log("no precincts");
            addPrecinctsToMap(precincts);
            precinctCheckBox.checked = true;
          }
          if(currentCounty==null||currentCounty==selectedCounty){//di yi ci dian
            currentCounty= selectedCounty;
          }else{
            console.log("have precincts");
            removePrecinctToMap(currentCounty);
            currentCounty= selectedCounty;
          }
          precinctEvents(stateName,selectedCounty);
          // currentCounty= selectedCounty;
        } else {//find precinct in server
          precincts = selectedCounty.getPrecincts();
          precinctCheckBox.disabled = false;
          precinctCheckBox.checked = true;
          precinctFetch(stateName,selectedCounty);
          havePrecinct=1;
          console.log("after fetch");
          if(currentCounty==null){ //no county has been clicked yet
            currentCounty= selectedCounty;
          }else{  //remove last clicked county
            // console.log(currentCounty);
            removePrecinctToMap(currentCounty);
            currentCounty= selectedCounty;
          }
        }
      });
    }
    precinctCheckBox.addEventListener('change', function () {//show precinct on the county or not
      if (this.checked) {
        addPrecinctsToMap(precincts);
      } else {
        for (let ID in precincts) {  //not show
          precincts[ID].getPrecinctLayer().setMap(null);
          precinctCheckBox.checked = false;
        }
      }
    });
  }
}
async function countyClick (countyID,stateName) {  //when click on a county
  // countyID = event.feature.o; //get the current county ID
  countyandState.textContent=countyID+", "+stateName;
  // sidepanePrecinctName.textContent=null;
  console.log("teste!!!!");
  var selectedCounty = allStates[stateName].getCountyByID(countyID); //get current county object in the state
  console.log(selectedCounty.hasPrecincts());
  if(!isEmptyObject(rectangle)){  // change border
    console.log("it is not null");
    console.log(rectangle);
    for(var i in rectangle){
      rectangle[i].setMap(null);
      // rectangle[i].setPath(null);
    }
  }
  if (selectedCounty.hasPrecincts()) {  //when there is precinct exist
    precincts = selectedCounty.getPrecincts();  //load the precinct
    // console.log(precinctLayers);
    var i = 0;
    for (let ID in precincts) {  //check the map is loaded or not
      if (precincts[ID].getPrecinctLayer().getMap() == null) {
        i++;
      }
    }
    // console.log(i);
    if (i != 0) {//not loaded
      console.log("no precincts");
      addPrecinctsToMap(precincts);
      precinctCheckBox.checked = true;
    }
    if(currentCounty==null||currentCounty==selectedCounty){//di yi ci dian
      currentCounty= selectedCounty;
    }else{
      console.log("have precincts");
      removePrecinctToMap(currentCounty);
      currentCounty= selectedCounty;
    }
    precinctEvents(stateName,selectedCounty);
    // currentCounty= selectedCounty;
  } else {//find precinct in server
    precincts = selectedCounty.getPrecincts();
    precinctCheckBox.disabled = false;
    precinctCheckBox.checked = true;
    await precinctFetch(stateName,selectedCounty);
    havePrecinct=1;
    console.log("after fetch");
    if(currentCounty==null){ //no county has been clicked yet
      currentCounty= selectedCounty;
    }else{  //remove last clicked county
      // console.log(currentCounty);
      removePrecinctToMap(currentCounty);
      currentCounty= selectedCounty;
    }
  }
}

