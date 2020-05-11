var changeBoundaryConfirm = document.getElementById("changeBounayConfirm");
changeBoundaryConfirm.disabled = true;
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
            precinct.addPrecincePolygon(precinctJson[i].obj[j].id, precinctPolygon);
        }
        totalPrecinct.push(precinctCoords);
        precinctData = new google.maps.Data();
        Precinctgeometry = new google.maps.Data.Polygon(precinctCoords);
        precinctData.add({geometry: Precinctgeometry, id: precinctJson[i].id});
        precinct.setBoundary(precinctCoords);
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
function isEmptyObject(obj){
    for (var n in obj) {
        return false
    }
    return true;
}
var rectangle={};
function precinctEvents(stateName,county){  //here shouldn't be county should be state
    console.log("???test");
    precincts = county.getPrecincts();
    var countyID=county.id;
    console.log(countyID);
    let lastPrecinct;
    var clickedPrecinct;
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
        // var rectangle={};

        google.maps.event.addListener(precinctLayer, 'click', function (event) {  //when click on a precinct
            console.log("qwe!!");
            console.log(event);
            if(addNeigbourClicked==false){
                console.log("add neighbour is not clicked!");
                clickedPrecinct=ID;
                addNeighbourButton.disabled = false;
                if(!isEmptyObject(rectangle)){  // change border
                    console.log("it is not null");
                    console.log(rectangle);
                    for(var i in rectangle){
                        console.log("test1");
                        rectangle[i].setMap(null);
                        console.log("test2");
                        // rectangle[i].setPath(null);
                        console.log("test3");
                    }
                    console.log("test4");
                    // rectangle.setMap(null);
                    // rectangle.setPaths(null);
                }
                addNeighbourButton.disabled = false;
                addNeighbourButton.addEventListener('click',function(){
                    addNeighbourConfirm.disabled=false;
                    console.log("test add neighbour");
                    addNeighbourButton.disabled=true;
                    addNeigbourClicked=true;
                });
                changeBoundaryButton.disabled=true;
                changeBoundaryButton.disabled=false;
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

                var urlpart1 = "http://localhost:8080/state/"+stateName+"/county/" + countyID;
                var url = "/precinct/" + precinctID;
                var neighbourUrl = "/data/neighbors";
                getNeighbour(urlpart1 + url + neighbourUrl, county, precinctID);

                lastPrecinct=precinctID;
            }else{
                addneighbourlist.push(ID);
                console.log(addneighbourlist);
                // addNeighbourConfirm.addEventListener('click',function(){
                //   addNeigbourClicked=false;
                //   console.log("confime button1");
                //   addNeighbourButton.disabled=false;
                //   addNeighbourConfirm.disabled=true;
                //
                // });
            }

        });
    }
    addNeighbourConfirm.addEventListener('click',function(){
        addNeigbourClicked=false;
        console.log("confime button0");
        addNeighbourButton.disabled=false;
        addNeighbourConfirm.disabled=true;
        console.log(clickedPrecinct);
        if(addneighbourlist.lenghth!=0) {
            sendNeighbour(precincts[clickedPrecinct], addneighbourlist, stateName, countyID);  //send the list of neighbour to server
        }
    });
    // changeBoundaryButtonClicked(precincts, clickedPrecinct,rectangle);
    changeBoundaryButton.addEventListener("click", function(){  //click the change Boundary Button
        changeBoundaryConfirm.disabled = false;
        console.log("start to change boundary");
        console.log(precincts[clickedPrecinct].getBoundary());
        console.log(precincts[clickedPrecinct].getPrecinctPolygons());
        var polygons = precincts[clickedPrecinct].getPrecinctPolygons();
        for(let i in polygons){
            console.log(i);
            rectangle[i]=new google.maps.Polygon({
                paths: polygons[i],
                zIndex: 3,
                editable: true
            });
            console.log(rectangle[i]);
            rectangle[i].setMap(map);
        }
    });
    // var modifiedPolygon = [];
    changeBoundaryConfirm.addEventListener('click', function(){
        var modifiedPolygon = [];
        // console.log("start to put boundary");
        console.log(clickedPrecinct);
        var polygons = precincts[clickedPrecinct].getPrecinctPolygons();
        // modifiedPolygon.length = 0;
        console.log(modifiedPolygon);
        console.log(polygons);
        // console.log()
        for(var i in polygons){    //对于每一个polygon
            // modifiedPolygon.length = 0;
            // console.log(i);
            // console.log(polygons[i]);
            var newPolygon=false;
            for(var j in rectangle[i].getPath().i){
                modifiedPolygon.push({lat:rectangle[i].getPath().i[j].lat(), lng: rectangle[i].getPath().i[j].lng()});
            }
            console.log(modifiedPolygon);
            console.log(polygons[i]);
            console.log(modifiedPolygon[0]);

            if(modifiedPolygon.toString()!=polygons[i].toString()){
                console.log("they are different");
                newPolygon = true;
            }
            if(newPolygon==true){   //这里，新的polygon 发送给服务器
                ///state/{stateId}/county/{countyId}/precinct/{precinctId}/data/boundaries/{polygonId}
                console.log("there is new polygon");
                console.log(i);
                console.log(modifiedPolygon);
                var url = "http://localhost:8080/state/"+stateName+"/county/"+countyID+"/precinct/"+clickedPrecinct+"/data/boundaries/"+i;
                newPolygon=false;
                precinctChangeBoundary(url, modifiedPolygon);

            }
            else{
                console.log("There is no polygon need to moify")
                console.log(i);
            }
            // modifiedPolygon.length = 0;
        }

    });
}
async function precinctChangeBoundary(url, data) {
    console.log(data);
    var vertices =[];
    // precinctPolygon.push({lat: precinctJson[i].obj[j].vertices[k].y_pos, lng: precinctJson[i].obj[j].vertices[k].x_pos});
    for(var i in data){
        vertices.push({x_pos: data[i].lng, y_pos: data[i].lat});
    }
    console.log(vertices);
    console.log(JSON.stringify({vertices}));
    $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});

    console.log(JSON.stringify(data));
    console.log(JSON.stringify({data}));
    await fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify({vertices}), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    $.unblockUI();
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
        precincts[precinctID].addNeighbor(neighbourList[i]);
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
var addNeigbourClicked = false;
var addneighbourlist=[];
async function sendNeighbour(precinct, List, stateName, countyID) {
    console.log(precinct);
    precinctID = precinct.id;
    var neighbourlist = precinct.getNeighbours();
    var newList = [];
    var deletList = [];
    // console.log(neighbourlist);
    for (i = 0; i < List.length; i++) {
        if (neighbourlist.indexOf(List[i]) < 0) {
            newList.push(List[i]);
        }
        if (neighbourlist.indexOf(List[i]) >= 0) {
            deletList.push(List[i]);
        }
    }
    // neighbourlist.length=0;
    for (i = 0; i < newList.lenght; i++) {
        precinct.addNeighbor(newList[i]);
    }
    for (i = 0; i < deletList.lenght; i++) {
        precinct.removeNeighbor(deletList[i]);
    }

    // console.log(newList);
    // var url = "http://localhost:8080/state/{stateId}/county/{countyId}/precinct/{precinctId}/data/neighbors";
    var urlpart1 = "http://localhost:8080/state/" + stateName + "/county/" + countyID + "/precinct/" + precinctID + "/data/neighbors";
    if (newList.length != 0) {
        console.log("add neighbor");
        // console.log(newList);
        // newList.length = 0;
        console.log(newList);
        console.log(JSON.stringify(newList));
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        console.log("add neighbor?");
        await fetch(urlpart1, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(newList), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        $.unblockUI();
    }
    newList.length = 0;
    if (deletList.length != 0) {    //目前不管用
        console.log("delet");
        console.log(deletList);
        // deletList.length = 0;
        console.log(deletList);
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        console.log(deletList);
        console.log("delet neighbor?");
        await fetch(urlpart1, {
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify(deletList), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        $.unblockUI();
    }
    deletList.length = 0;
    List.length=0;

}
