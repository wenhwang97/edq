var changeBoundaryConfirm = document.getElementById("changeBounayConfirm");
var changeBoundaryCommentConfirm = document.getElementById("BoundaryCommentChanges");
var ghostPct = document.getElementById("ghostPct");
var boundaryComment = document.getElementById("boundaryComment");
var MergePrecinct = document.getElementById("mergePrecinct");
var MergeConfirm = document.getElementById("mergePrecinctConfirm");
var GhostPrecinct = document.getElementById("GhostPrecinct");
var GhostCommentChanges = document.getElementById("GhostCommentChanges");
var GhostComment = document.getElementById("GhostComment");
var precinctName = document.getElementById("sidepanePrecinctName");
var dataType = document.getElementById("Datatype");
var mergeCommentConfirm = document.getElementById("SaveCommentChanges");
var NeighbourCommentChanges = document.getElementById("NeighbourCommentChanges");
var NeighbourComment = document.getElementById("neighbourComment");
// mergeComment
var mergeComment = document.getElementById("neighbourComment");
changeBoundaryConfirm.disabled = true;
MergePrecinct.disabled = true;
MergeConfirm.disabled = true;
GhostPrecinct.disabled = true;
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
        // console.log(precinctJson[i].id);
        var precinct = new Precinct(precinctJson[i].id);
        precinct.name =precinctJson[i].name;
        var precinctCoords = [];
        if(precinctJson[i].objs[0]!=null) {
            precinct.Ghost=false;
            precinct.setDemographic("asianPop", precinctJson[i].objs[0].asianPop);
            precinct.setDemographic("blackPop", precinctJson[i].objs[0].blackPop);
            precinct.setDemographic("nativePop", precinctJson[i].objs[0].nativePop);
            precinct.setDemographic("otherPop", precinctJson[i].objs[0].otherPop);
            precinct.setDemographic("totalPop", precinctJson[i].objs[0].totalPop);
            precinct.setDemographic("whitePop", precinctJson[i].objs[0].whitePop);
        }else{
            precinct.Ghost=true;
        }
        if(precinctJson[i].objs[1][0]!=null) {
            precinct.setPresidentialVote("democraticVote", precinctJson[i].objs[1][0].democraticVote);
            precinct.setPresidentialVote("greenVote", precinctJson[i].objs[1][0].greenVote);
            precinct.setPresidentialVote("libertarianVote", precinctJson[i].objs[1][0].libertarianVote);
            precinct.setPresidentialVote("republicanVote", precinctJson[i].objs[1][0].republicanVote);

            // console.log(precinctJson[i].objs[1][0].democraticVote);
        }
        if(precinctJson[i].objs[1][1]!=null) {  //2016
            precinct.setCongressional16Vote("democraticVote", precinctJson[i].objs[1][1].democraticVote,precinctJson[i].objs[1][1].distNum);
            precinct.setCongressional16Vote("greenVote", precinctJson[i].objs[1][1].greenVote,precinctJson[i].objs[1][1].distNum);
            precinct.setCongressional16Vote("libertarianVote", precinctJson[i].objs[1][1].libertarianVote, precinctJson[i].objs[1][1].distNum);
            precinct.setCongressional16Vote("republicanVote", precinctJson[i].objs[1][1].republicanVote, precinctJson[i].objs[1][1].distNum);

            // console.log(precinctJson[i].objs[1][0].democraticVote);
        }
        if(precinctJson[i].objs[1][2]!=null) {  //2018
            precinct.setCongressional18Vote("democraticVote", precinctJson[i].objs[1][2].democraticVote, precinctJson[i].objs[1][2].distNum);
            precinct.setCongressional18Vote("greenVote", precinctJson[i].objs[1][2].greenVote,precinctJson[i].objs[1][2].distNum);
            precinct.setCongressional18Vote("libertarianVote", precinctJson[i].objs[1][2].libertarianVote, precinctJson[i].objs[1][2].distNum);
            precinct.setCongressional18Vote("republicanVote", precinctJson[i].objs[1][2].republicanVote, precinctJson[i].objs[1][2].distNum);

            // console.log(precinctJson[i].objs[1][0].democraticVote);
        }
        for (let j in precinctJson[i].objs[2]) {  //for current precinct
            if(precinctJson[i].id=="ri-kent-0617"){
                console.log(precinctJson[i].objs[2]);
            }
            var precinctPolygon = [];
            // var pureCoord=[];

            for (let k in precinctJson[i].objs[2][j].vertices) { //for current precinct's polygon coord
                precinctPolygon.push({lat: precinctJson[i].objs[2][j].vertices[k].y_pos, lng: precinctJson[i].objs[2][j].vertices[k].x_pos});
                // pureCoord.push()
            }
            precinctCoords.push(precinctPolygon);
            precinct.addPrecincePolygon(precinctJson[i].objs[2][j].id, precinctPolygon);
        }
        totalPrecinct.push(precinctCoords);
        precinctData = new google.maps.Data();
        // console.log(precinctCoords);
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
        // console.log(ID);
        // console.log("how many precincts");
        precinctLayer=precincts[ID].getPrecinctLayer();
        // console.log(precinctLayer);
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
        var polyinprecinct;
        var value = datatype.value;
        google.maps.event.addListener(precinctLayer, 'click', function (event) {  //when click on a precinct
            value = datatype.value
            console.log("qwe!!");
            if (isNotToggled) {
                sidepane.classList.toggle("toggled")
                isNotToggled = false
            }
            sidepaneData.style.display = "block"
            sidepaneErrLog.style.display="none"
            // sidepaneData.classList.remove("active")
            sidepaneData.style.opacity = "1"
            // errs.style.display = "none"
            console.log(event);
            // console.log(precinctLayer.geometry);
            console.log(event.latLng.lat());
            polyinprecinct = precincts[event.feature.o].getPrecinctPolygon({lat:event.latLng.lat(),lng:event.latLng.lng()});
            // placeMarker(event.latLng);
            if(addNeigbourClicked==false&&mergeClicked==false){  //没点添加neighbor的时候,也没点击merge的时候
                console.log("add neighbour is not clicked!");
                var second = ID.indexOf('-',3);
                var precinctName = ID.substring(second+1);
                sidepanePrecinctName.textContent = precincts[event.feature.o].name;
                clickedPrecinct=ID;
                addNeighbourButton.disabled = false;
                MergePrecinct.disabled = false;
                GhostPrecinct.disabled = false;
                if(polyinprecinct.Ghost==false){
                    ghostPct.textContent="";
                }
                if(polyinprecinct.Ghost==true){
                    ghostPct.textContent="Ghost Pct.";
                }
                if(!isEmptyObject(rectangle)){  // change border
                    console.log("it is not null");
                    console.log(rectangle);
                    for(var i in rectangle){
                        rectangle[i].setMap(null);

                        // rectangle[i].setPath(null);

                    }

                    // rectangle.setMap(null);
                    // rectangle.setPaths(null);
                }
                // GhostCommentChanges.addEventListener('click',function(){
                //     precincts[ID].Ghost=true;
                //     ghostPct.textContent="Ghost Pct.";
                //     var comment = GhostComment.value;
                //     sendGhost(stateName,countyID, ID, precincts[ID],comment);
                // });
                addNeighbourButton.disabled = false;
                addNeighbourButton.addEventListener('click',function(){
                    addNeighbourConfirm.disabled=false;
                    console.log("test add neighbour");
                    addNeighbourButton.disabled=true;
                    addNeigbourClicked=true;
                });
                MergePrecinct.addEventListener('click',function(){
                    MergeConfirm.disabled = false;
                    MergePrecinct.disabled = true;
                    mergeClicked = true;
                    mergePrecinctList.push(precincts[ID]);
                    console.log("第一个merge的precinct");
                    console.log(ID);
                });
                changeBoundaryButton.disabled=true;
                changeBoundaryButton.disabled=false;
                console.log(lastPrecinct);
                if(lastPrecinct!=null){
                    console.log(precincts[lastPrecinct]);
                    // precincts[lastPrecinct].getPrecinctLayer().revertStyle();
                    styleCounties(precincts[lastPrecinct].getPrecinctLayer());
                }
                // inforChange(event.feature.o);  //change the title for
                let precinctID=event.feature.o;
                // if(precincts[ID].hasData==true){//if have the voting data
                console.log("qwe????");
                console.log(precincts[ID].getPresidentialVote("republicanVote"));
                console.log(value);
                // datatype.addEventListener('onchange',function(){
                //     console.log(datatype.value);
                // })

                if(value == 4) { //Presidential General
                    document.getElementById("RepublicanVoting").textContent = precincts[ID].getPresidentialVote("republicanVote");
                    document.getElementById("GreenVoting").textContent = precincts[ID].getPresidentialVote("greenVote");
                    document.getElementById("LibertarianVoting").textContent = precincts[ID].getPresidentialVote("libertarianVote");
                    document.getElementById("DemocraticVoting").textContent = precincts[ID].getPresidentialVote("democraticVote");
                }
                if(value == 2){ //18 congressional
                    console.log("18 de congressional");
                    document.getElementById("RepublicanVoting").textContent = precincts[ID].getCongressional18Vote("republicanVote");
                    document.getElementById("GreenVoting").textContent = precincts[ID].getCongressional18Vote("greenVote");
                    document.getElementById("LibertarianVoting").textContent = precincts[ID].getCongressional18Vote("libertarianVote");
                    document.getElementById("DemocraticVoting").textContent = precincts[ID].getCongressional18Vote("democraticVote");
                }
                if(value == 3){ //16 congressional
                    console.log("16 de congressional");
                    document.getElementById("RepublicanVoting").textContent = precincts[ID].getCongressional16Vote("republicanVote");
                    document.getElementById("GreenVoting").textContent = precincts[ID].getCongressional16Vote("greenVote");
                    document.getElementById("LibertarianVoting").textContent = precincts[ID].getCongressional16Vote("libertarianVote");
                    document.getElementById("DemocraticVoting").textContent = precincts[ID].getCongressional16Vote("democraticVote");
                }
                document.getElementById("AsianData").textContent = precincts[ID].getDemographic("asianPop");
                document.getElementById("BlackData").textContent = precincts[ID].getDemographic("blackPop");
                document.getElementById("WhiteData").textContent = precincts[ID].getDemographic("whitePop");
                document.getElementById("NativeData").textContent = precincts[ID].getDemographic("nativePop");
                document.getElementById("OtherData").textContent = precincts[ID].getDemographic("otherPop");
                document.getElementById("TotalData").textContent = precincts[ID].getDemographic("totalPop");

                // dataType.onchange = function(){
                //     // console.log("12333333333!!!");
                //     console.log(dataType.value);
                //     if(dataType.value == 4) { //Presidential General
                //         document.getElementById("RepublicanVoting").textContent = precincts[ID].getPresidentialVote("republicanVote");
                //         document.getElementById("GreenVoting").textContent = precincts[ID].getPresidentialVote("greenVote");
                //         document.getElementById("LibertarianVoting").textContent = precincts[ID].getPresidentialVote("libertarianVote");
                //         document.getElementById("DemocraticVoting").textContent = precincts[ID].getPresidentialVote("democraticVote");
                //     }
                //     if(dataType.value == 2){ //18 congressional
                //         console.log("18 de congressional");
                //         document.getElementById("RepublicanVoting").textContent = precincts[ID].getCongressional18Vote("republicanVote");
                //         document.getElementById("GreenVoting").textContent = precincts[ID].getCongressional18Vote("greenVote");
                //         document.getElementById("LibertarianVoting").textContent = precincts[ID].getCongressional18Vote("libertarianVote");
                //         document.getElementById("DemocraticVoting").textContent = precincts[ID].getCongressional18Vote("democraticVote");
                //     }
                //     if(dataType.value == 3){ //16 congressional
                //         console.log("18 de congressional");
                //         document.getElementById("RepublicanVoting").textContent = precincts[ID].getCongressional16Vote("republicanVote");
                //         document.getElementById("GreenVoting").textContent = precincts[ID].getCongressional16Vote("greenVote");
                //         document.getElementById("LibertarianVoting").textContent = precincts[ID].getCongressional16Vote("libertarianVote");
                //         document.getElementById("DemocraticVoting").textContent = precincts[ID].getCongressional16Vote("democraticVote");
                //     }
                // }

                // AsianData
                // }else { //no voting data
                //     // var url1 ="/state/{stateId}/county/{countyId}/precinct/{precinctId}/data/vote/presidential/{year}";
                //     var urlpart1 = "http://localhost:8080/state/"+stateName+"/county/" + countyID;
                //     var url = "/precinct/" + precinctID;
                //     var urlpart3 = "/data/vote/presidential/2016";
                //     var demourl = urlpart1+url+"/data/demo";
                //
                //     // precinctFetchData(urlpart1 + url + urlpart3, demourl,precincts[ID]);
                // }
                // precincts[ID].getPrecinctLayer().overrideStyle(event.feature, { fillColor: "#a8329e",strokeWeight: 9 });

                precincts[ID].getPrecinctLayer().setStyle((feature) => {
                    return {
                        fillColor: "#a8329e",
                        strokeColor: "#a8329e",
                        strokeWeight: 2,
                        zIndex: 1,
                    };
                });
                if(precincts[ID].Ghost==false){
                    ghostPct.textContent="";
                }else{
                    ghostPct.textContent="Ghost Pct.";
                }

                var urlpart1 = "http://localhost:8080/state/"+stateName+"/county/" + countyID;
                var url = "/precinct/" + precinctID;
                var neighbourUrl = "/data/neighbors";
                getNeighbour(urlpart1 + url + neighbourUrl, county, precinctID);

                lastPrecinct=precinctID;
            }
            if(addNeigbourClicked==true){
                addneighbourlist.push(ID);
                console.log(addneighbourlist);

            }
            if(mergeClicked == true){   //merge precinct
                if(mergePrecinctList.length=2){
                    mergePrecinctList.pop();
                    mergePrecinctList.push(precincts[ID]);
                    console.log("第二个merge的precinct");
                    console.log(ID);
                }else {
                    mergePrecinctList.push(precincts[ID]);
                    console.log("第二个merge的precinct");
                    console.log(ID);
                }
            }

        });
    }
    dataType.onchange = function(){
        // console.log("12333333333!!!");
        console.log(dataType.value);
        if(dataType.value == 4) { //Presidential General
            document.getElementById("RepublicanVoting").textContent = precincts[clickedPrecinct].getPresidentialVote("republicanVote");
            document.getElementById("GreenVoting").textContent = precincts[clickedPrecinct].getPresidentialVote("greenVote");
            document.getElementById("LibertarianVoting").textContent = precincts[clickedPrecinct].getPresidentialVote("libertarianVote");
            document.getElementById("DemocraticVoting").textContent = precincts[clickedPrecinct].getPresidentialVote("democraticVote");
        }
        if(dataType.value == 2){ //18 congressional
            console.log("18 de congressional");
            document.getElementById("RepublicanVoting").textContent = precincts[clickedPrecinct].getCongressional18Vote("republicanVote");
            document.getElementById("GreenVoting").textContent = precincts[clickedPrecinct].getCongressional18Vote("greenVote");
            document.getElementById("LibertarianVoting").textContent = precincts[clickedPrecinct].getCongressional18Vote("libertarianVote");
            document.getElementById("DemocraticVoting").textContent = precincts[clickedPrecinct].getCongressional18Vote("democraticVote");
        }
        if(dataType.value == 3){ //16 congressional
            console.log("18 de congressional");
            document.getElementById("RepublicanVoting").textContent = precincts[clickedPrecinct].getCongressional16Vote("republicanVote");
            document.getElementById("GreenVoting").textContent = precincts[clickedPrecinct].getCongressional16Vote("greenVote");
            document.getElementById("LibertarianVoting").textContent = precincts[clickedPrecinct].getCongressional16Vote("libertarianVote");
            document.getElementById("DemocraticVoting").textContent = precincts[clickedPrecinct].getCongressional16Vote("democraticVote");
        }
    }
    GhostCommentChanges.addEventListener('click',function(){
        precincts[clickedPrecinct].Ghost=true;
        ghostPct.textContent="Ghost Pct.";
        var comment = GhostComment.value;
        sendGhost(stateName,countyID, clickedPrecinct, precincts[clickedPrecinct],comment);
    });
    mergeCommentConfirm.addEventListener('click',function(){
        console.log(mergePrecinctList);
        mergeClicked=false;
        MergePrecinct.disabled = false;
        MergeConfirm.disabled = true;
        var comment = mergeComment.value;
        if(mergePrecinctList.length ==2){
            sendMergePrecinct(mergePrecinctList,stateName, countyID, polyinprecinct, comment);
        }
    });
    NeighbourCommentChanges.addEventListener('click',function(){
        addNeigbourClicked=false;
        console.log("confime button0");
        addNeighbourButton.disabled=false;
        addNeighbourConfirm.disabled=true;
        console.log(clickedPrecinct);
        var comment =NeighbourComment.value;

        if(addneighbourlist.lenghth!=0) {
            sendNeighbour(precincts[clickedPrecinct], addneighbourlist, stateName, countyID, comment);  //send the list of neighbour to server
        }
    });
    // changeBoundaryButtonClicked(precincts, clickedPrecinct,rectangle);
    changeBoundaryButton.addEventListener("click", function(){  //click the change Boundary Button
        changeBoundaryConfirm.disabled = false;
        changeBoundaryButton.disabled = true;
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
    changeBoundaryCommentConfirm.addEventListener('click', function(){
        changeBoundaryButton.disabled = false;
        var modifiedPolygon = [];
        var totalPolygon = [];
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
            totalPolygon.push(modifiedPolygon);
            console.log(modifiedPolygon);
            console.log(polygons[i]);
            console.log(modifiedPolygon[0]);

            if(modifiedPolygon.toString()!=polygons[i].toString()){
                console.log("they are different");
                newPolygon = true;
            }
            for(var b in modifiedPolygon){
                // console.log(modifiedPolygon[b].lat);
                // console.log(polygons[i][b].lat);
                // console.log()
                if(modifiedPolygon[b].lat!=polygons[i][b].lat||modifiedPolygon[b].lng!=polygons[i][b].lng){
                    console.log("different");
                    newPolygon = true;
                    break;
                }
                // if(modifiedPolygon[b].toString())
            }
            if(newPolygon==true){   //这里，新的polygon 发送给服务器
                ///state/{stateId}/county/{countyId}/precinct/{precinctId}/data/boundaries/{polygonId}
                console.log("there is new polygon");
                console.log(i);
                console.log(modifiedPolygon);
                var comment = boundaryComment.value;
                console.log(comment);
                var url = "http://localhost:8080/state/"+stateName+"/county/"+countyID+"/precinct/"+clickedPrecinct+"/data/boundaries/"+i;
                newPolygon=false;
                precinctChangeBoundary(url, modifiedPolygon,comment);
                // polygons[i].setMap(null);
                console.log("after fetch");
                for(let i in rectangle){
                    rectangle[i].setMap(null);
                }
                console.log("test1");
                precincts[clickedPrecinct].getPrecinctLayer().setMap(null);
                // precincts[clickedPrecinct].getPrecinctLayer().setMap(map);
                console.log(totalPolygon);
                console.log("test2");
                newPrecinctData = new google.maps.Data();
                console.log("test3");
                geometry = new google.maps.Data.Polygon(totalPolygon);
                newPrecinctData.add({geometry: geometry, id: precincts[clickedPrecinct].id});
                console.log("test4");
                console.log(clickedPrecinct);
                precincts[clickedPrecinct].setPrecinctLayer(newPrecinctData);
                // precincts[clickedPrecinct]

                // console.log(precincts[clickedPrecinct].getPrecinctLayer());
                // newPrecinct.setMap(map);
                // console.log(precincts[clickedPrecinct].getPrecinctLayer());
                precincts[clickedPrecinct].getPrecinctLayer().setStyle((feature) => {
                    return {
                        fillColor: "#a8329e",
                        strokeColor: "#a8329e",
                        strokeWeight: 2,
                        zIndex: 1,
                    };
                });
                for(var a in polygons){
                    precincts[clickedPrecinct].addPrecincePolygon(a, modifiedPolygon);
                }
                // for(let i in rectangle){
                //     rectangle[i].setMap(null);
                // }
                // precincts[clickedPrecinct].addPrecincePolygon(i, )
                // polygons[i]=newPolygon;
                // newPolygo

            }
            else{
                console.log("There is no polygon need to moify")
                console.log(i);
            }

            for(let i in rectangle){
                rectangle[i].setMap(null);
            }
            changeBoundaryConfirm.disabled = true;
            // modifiedPolygon.length = 0;
        }

    });
}
// stateName,countyID, ID, comment
async function sendGhost(stateName, countyID, ID, precincts,comment) {
    console.log(stateName);
    console.log(countyID);
    console.log(ID);
    console.log(comment);
    // /state/{stateId}/county/{countyId}/precinct/{precinctId}/data/define-ghost
    var data = {"comment": comment}
    var url
    if(precincts.Ghost=false) {
        url = "http://localhost:8080/state/" + stateName + "/county/" + countyID + "/precinct/" + ID + "/data/define-ghost";
    }
    if(precincts.Ghost=true){
        url = "http://localhost:8080/state/" + stateName + "/county/" + countyID + "/precinct/" + ID + "/data/undefine-ghost";
    }
    let response = await fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify({data}), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}
// con18Opt.onchange = function(){
//     console.log("12333333333!!!");
//     console.log(con18Opt.value);
// }
// con18Opt.addEventListener('onclick',function(){
//     console.log("23333333!!!!!");
// })
async function sendMergePrecinct(List, stateName, countyID, polygonID, comment) {
    var precinctID = [];
    for (var i in List) {
        precinctID[i] = List[i].id;
    }
    var url = "http://localhost:8080/state/" + stateName + "/county/" + countyID + "/precinct/" + precinctID[0] + "/data/merge-donut/" + countyID + "/" + precinctID[1] + "/" + polygonID;
    console.log(url);
    var data = {"comment":comment}
    let response = await fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify({data}), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    let mergeJson = await response.json()
    console.log(mergeJson);

}
async function precinctChangeBoundary(url, data,comment) {
    console.log(data);
    var vertices =[];
    // precinctPolygon.push({lat: precinctJson[i].obj[j].vertices[k].y_pos, lng: precinctJson[i].obj[j].vertices[k].x_pos});
    for(var i in data){
        vertices.push({x_pos: data[i].lng, y_pos: data[i].lat});
    }
    console.log(vertices);
    // console.log(JSON.stringify({vertices}));
    $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
    // console.log()
    console.log(JSON.stringify({vertices}))
    console.log(JSON.stringify(comment))
    var ver = JSON.stringify({vertices});
    // var com = JSON.stringify({comment});
    // var data = {ver,comment};
    // console.log(JSON.stringify(data));
    console.log(data);
    var data = {"polygon":{vertices},
        "comment":comment
    }
    await fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    $.unblockUI();

}
async function precinctFetchData(url,demourl, precinct) {
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
    let demoresponse = await fetch(demourl);
    let demoJson = await demoresponse.json();
    console.log(demoJson);
}
async function getNeighbour(url, county, precinctID) {
    console.log(url);
    precincts = county.getPrecincts();
    console.log(precincts);
    let response = await fetch(url);
    let neighbourList = await response.json();
    // console.log("neighbour");
    console.log(neighbourList)
    for(var key in precincts){
        if(key!=precinctID) {
            styleCounties(precincts[key].getPrecinctLayer());
        }
    }
    console.log("test neighbour");
    // for(let i=0; i<neighbourList.length; i++){
    for(let i in neighbourList){
        // console.log(neighbourList[i]);
        // console.log(neighbourList[i].substring(0,neighbourList[i].length-5));
        // console.log(county.id);
        // console.log(list(precincts.values()));
        var hifen = neighbourList[i].indexOf('-',3);
        console.log(neighbourList[i].substring(hifen+1));
        if(neighbourList[i].substring(0,hifen)!=county.id){
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
var mergeClicked = false;
var addneighbourlist=[];
var mergePrecinctList=[];
async function sendNeighbour(precinct, List, stateName, countyID,comment) {
    console.log(precinct);
    precinctID = precinct.id;
    console.log(comment);
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
        var list =JSON.stringify(newList);
        var com = JSON.stringify(comment);
        var data = {"neighbors":newList,
                    "comment":comment
        }
        console.log(JSON.stringify(data));
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        console.log("add neighbor?");
        creatLog("Add neighbour",comment);
        await fetch(urlpart1, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            // body: data, // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        $.unblockUI();
        for(var i in newList) {
            console.log(precincts[newList]);
            styleNeighbour(precincts[newList].getPrecinctLayer());
        }
    }
    newList.length = 0;
    if (deletList.length != 0) {    //目前可以用了
        console.log("delet");
        console.log(deletList);
        // deletList.length = 0;
        console.log(deletList);
        $.blockUI({message: '<h1><img src="../images/YCZH.gif" /> Loding Counties</h1>'});
        console.log(deletList);
        console.log("delet neighbor?");
        var data = {"neighbors":deletList,
            "comment":comment
        }
        creatLog("Delete neighbour",comment);
        await fetch(urlpart1, {
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        $.unblockUI();
        for(var i in deletList) {
            console.log(precincts[deletList]);
            styleCounties(precincts[deletList].getPrecinctLayer());
        }
    }
    deletList.length = 0;
    List.length=0;
}


