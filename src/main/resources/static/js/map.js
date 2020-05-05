const THREE_STATES = ["Virginia", "Texas", "Rhode Island"];
var map;
var dataLayers = {}; // all dataLayer (geojson)
var r = document.getElementById("countyCheckBox");
var precinctCheckBox=document.getElementById("PrecinctCheckBox");
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
  // click event, redirect to state level map
  google.maps.event.addListener(usBorderLayer, "click", async function(event) {
    if (THREE_STATES.includes(event.feature.j.name)) {
      let response;
      switch (event.feature.j.name) {

        case THREE_STATES[0]:// fujiniya
          r.disabled=false;
          response = await fetch("http://localhost:8080/state/va");
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
          break;

        case THREE_STATES[2]:// Rhode Island
          r.disabled=false;
          response = await fetch("http://localhost:8080/state/ri");
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
function styleCounty(dataLayer) {
  dataLayer.setStyle((feature) => {
    // #101778 = light blue
    return {
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
  switch (pageTitle) {
    case "Virginia State Level":
      stateName='va';
      break;
    case "Rhode Island State Level":
      stateName='ri';
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
    // document.body.style.cursor="not-allowed";
    $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
    let response = await fetch(url);
    let myJson = await response.json();
    document.body.style.cursor = "default";
    $.unblockUI();
    console.log(myJson);
    var tottalCounties = [];
    console.log(myJson);
    for (i = 0; i < myJson.length; i++) {  //how many counties
      var countyCoords = [];
      var county = new County(myJson[i].id);
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
    console.log(state.getAllCounties());
    counties = state.getAllCounties();
    let countyID;
    console.log("counties:  ");
    console.log(counties);
    let currentCounty;
    for (let ID in counties) {
      console.log(counties[ID]);
      countyLayer = counties[ID].getLayer();
      let havePrecinct = 0;

      google.maps.event.addListener(countyLayer, 'click', function (event) {  //when click on a county
        countyID = event.feature.o; //get the current county ID
        var selectedCounty = state.getCountyByID(countyID); //get current county object in the state
        console.log(selectedCounty.hasPrecincts());
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
// console.log(allStates);
// console.log(allStates["ri"]);
var b = [];
async function precinctFetch(stateName, county) {
  var countyID =county.id;

  var precintUrlpart1 = "http://localhost:8080/state/"+stateName+"/county/";
  var precintUrlpart2 = "/show-precincts";
  var precintUrl = precintUrlpart1 + countyID + precintUrlpart2;
  $.blockUI({ message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>' });
  let response = await fetch(precintUrl);
  let precinctJson = await response.json();
  $.unblockUI();
  console.log(precinctJson);
  console.log("the length of precinctJson");
  console.log(precinctJson.length);
  var totalPrecinct = [];
  for (let i in precinctJson) {  //how many precincts
    var precinct = new Precinct(precinctJson[i].id);
    var precinctCoords = [];
    for (let j in precinctJson[i].obj) {  //for current precinct
      var precinctPolygon = [];
      for (let k in precinctJson[i].obj[j].vertices) { //for current precinct's polygon coord
        precinctPolygon.push({lat: precinctJson[i].obj[j].vertices[k].y_pos, lng: precinctJson[i].obj[j].vertices[k].x_pos});
      }
      precinctCoords.push(precinctPolygon);
    }
    totalPrecinct.push(precinctCoords);
    precinctData = new google.maps.Data();
    Precinctgeometry = new google.maps.Data.Polygon(precinctCoords);
    precinctData.add({geometry: Precinctgeometry, id: precinctJson[i].id});
    precinct.setPrecinctLayer(precinctData);
    county.addPrecinct(precinctJson[i].id, precinct);
  }
  precinctLayers = county.getPrecincts();
  for (let ID in precinctLayers) {
    precinctLayers[ID].getPrecinctLayer().setMap(null);
  }
  addPrecinctsToMap(precinctLayers);
  precinctEvents(stateName,county);
}
function precinctEvents(stateName,county){  //here shouldn't be county should be state
  console.log("???test");
  precincts = county.getPrecincts();
  var countyID=county.id;
  console.log(countyID);
  let lastPrecinct;
  for (let ID in precincts) {
    // console.log("how many precincts");
    precinctLayer=precincts[ID].getPrecinctLayer();
    precinctLayer.addListener("mouseover", (event) => {
      // precinctLayer.revertStyle(); // revertStyle  remove all style overrides
      console.log("qwe");
      precincts[ID].getPrecinctLayer().overrideStyle(event.feature, { strokeWeight: 9 });
      // console.log(event.feature);
    });
    //鼠标移出，取消高亮
    google.maps.event.addListener(precinctLayer, "mouseout", (event) => {
      precincts[ID].getPrecinctLayer().revertStyle();
    });
    google.maps.event.addListener(precinctLayer, 'click', function (event) {  //when click on a precinct
      // console.log("qwe!!");
      // console.log(event);
      console.log(lastPrecinct);
      if(lastPrecinct!=null){
        console.log(precincts[lastPrecinct]);
        // precincts[lastPrecinct].getPrecinctLayer().revertStyle();
        styleCounties(precincts[lastPrecinct].getPrecinctLayer());
      }
      inforChange(event.feature.o);  //change the title for
      let precinctID=event.feature.o;
      if(precincts[ID].hasData==true){//if have the voting data
        document.getElementById("RepublicanData").textContent = precincts[ID].getPresidentialVote("republicanVote");
        document.getElementById("GreenData").textContent = precincts[ID].getPresidentialVote("greenVote");
        document.getElementById("LibertarianData").textContent = precincts[ID].getPresidentialVote("libertarianVote");
        document.getElementById("DemocraticData").textContent = precincts[ID].getPresidentialVote("democraticVote");
      }else { //no voting data
        // var url1 ="/state/{stateId}/county/{countyId}/precinct/{precinctId}/data/vote/presidential/{year}";
        var urlpart1 = "http://localhost:8080/state/"+stateName+"/county/" + countyID;
        var url = "/precinct/" + precinctID;
        var urlpart3 = "/data/vote/presidential/2016";
        precinctFetchData(urlpart1 + url + urlpart3, precincts[ID]);
      }
      // precincts[ID].getPrecinctLayer().overrideStyle(event.feature, { fillColor: "#a8329e",strokeWeight: 9 });

      precincts[ID].getPrecinctLayer().setStyle((feature) => {
        return {
          fillColor: "#a8329e",
          strokeColor: "#a8329e",
          strokeWeight: 2,
          zIndex: 1,
        };
      });
      /*show the neighbour(fake for now)*/

      var urlpart1 = "http://localhost:8080/state/"+stateName+"/county/" + countyID;
      var url = "/precinct/" + precinctID;
      var neighbourUrl = "/data/neighbors";
      getNeighbour(urlpart1 + url + neighbourUrl, county, precinctID);


      lastPrecinct=precinctID;
    });

  }
}

async function precinctFetchData(url,precinct) {
  let response = await fetch(url);
  let myJson = await response.json();
  // console.log(myJson);
  precinct.setPresidentialVote("democraticVote",myJson.democraticVote);
  precinct.setPresidentialVote("greenVote",myJson.greenVote);
  precinct.setPresidentialVote("libertarianVote",myJson.libertarianVote);
  precinct.setPresidentialVote("republicanVote",myJson.republicanVote);
  document.getElementById("RepublicanData").textContent = myJson.republicanVote;
  document.getElementById("GreenData").textContent = myJson.greenVote;
  document.getElementById("LibertarianData").textContent = myJson.libertarianVote;
  document.getElementById("DemocraticData").textContent = myJson.democraticVote;
}
async function getNeighbour(url, county, precinctID) {
  console.log(url);
  precincts = county.getPrecincts();
  console.log(precincts);
  let response = await fetch(url);
  let neighbourList = await response.json();
  console.log("neighbour");
  console.log(neighbourList);
  for(var key in precincts){
    if(key!=precinctID) {
      styleCounties(precincts[key].getPrecinctLayer());
    }
  }
  // for(let i=0; i<neighbourList.length; i++){
  for(let i in neighbourList){
    console.log(neighbourList[i]);
    console.log(neighbourList[i].substring(0,neighbourList[i].length-5));
    console.log(county.id);
    // console.log(list(precincts.values()));
    if(neighbourList[i].substring(0,neighbourList[i].length-5)!=county.id){
      // console.log(neighbourList[i].substring(0,neighbourList[i].length-4));
      console.log("different??");
      continue;
    }
    precincts[neighbourList[i]].getPrecinctLayer().setStyle((feature) => {
      return {
        fillColor: "rgba(168,50,158,0.25)",
        strokeColor: "rgba(168,50,158,0.28)",
        strokeWeight: 2,
        zIndex: 2,
      };
    });
  }
  // lastNeighbour= neighbourList;
}
