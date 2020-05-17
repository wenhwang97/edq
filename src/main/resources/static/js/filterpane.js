let sidepane = document.getElementById("wrapper")

let sidepaneData = document.getElementById("sidepane-data")
let sidepaneErrLog = document.getElementById("sidepane-errlog")
let errTab = document.getElementById("err-tab")
let errContent = document.getElementById("tab3")
let logTab = document.getElementById("log-tab")
let logContent = document.getElementById("tab4")

let filter = document.getElementById("map-filter-button")
let errs = document.getElementById("errors-list-button")
let logs = document.getElementById("logs-button")
var clickedState;
let filterpane = document.getElementById("filter-page")
let filterclosebtn = document.getElementById("close-filter-button")

// Display of filter window
filterclosebtn.onclick = function() {
    filterpane.style.display = "none"
    filter.style.opacity = "1"
}

filter.onclick = function () {
    filterpane.style.display = "block"
    filter.style.opacity = ".5"
}

// Display of sidepane sidebar
errs.onmousedown = function () {
    errs.style.opacity = ".5";
}
var VotedemoErroCoord={};
var NovoteErroCoord={};
var NodemoErroCoord={}
var multiPolyCoord={};
var gapCoord={};
errs.onmouseup = async function () {
    if (isNotToggled) {
        sidepane.classList.toggle("toggled")
        isNotToggled = false
        console.log("open error");
        if(clickedState!=null) {
            let response = await fetch("http://localhost:8080/state/" + clickedState + "/data/errors");
            let errorJson = await response.json();
            console.log(errorJson);
            var VOTEDEMOnum = 0;
            var NOVOTEnum=0;
            var NODEMOnum=0;
            var Overlapnum=0;
            var Gapnum=0;
            var slefnum=0;
            var enclosenum=0;
            var multinum=0;
            var VotedemoErrobutton=[];
            var NovoteErrobutton=[];
            var NoDemoErrobutton=[];
            var Multibutton=[];
            var Gapbutton=[]
            for(var i in errorJson){
                if(errorJson[i].type=="VOTEDEMO"){
                    VOTEDEMOnum++;
                    VotedemoErrobutton[i]= document.createElement("button");
                    VotedemoErrobutton[i].setAttribute("class","btn btn-link");
                    let errorinfo = errorJson[i].info;
                    let firstsem = errorinfo.indexOf(';');
                    let secondsem = errorinfo.indexOf(';',firstsem+1);  //precinctID 前的分号
                    let thirdsem = errorinfo.indexOf(';',secondsem+1);  //precintID 后面的分号
                    let precinctidinfo = errorinfo.substring(secondsem+1, thirdsem);
                    VotedemoErrobutton[i].textContent=precinctidinfo;
                    // VotedemoErroCoord[precinctidinfo]=
                    let lng = errorinfo.substring(0,firstsem);
                    let lat = errorinfo.substring(firstsem+1, secondsem);
                    var errorCoord = {
                        "lat" : lat,
                        "lng" : lng
                    };
                    VotedemoErroCoord[precinctidinfo]=errorCoord;
                    VoteDemoErrorTable.appendChild(VotedemoErrobutton[i]);
                    VoteDemoErrorTable.appendChild(document.createElement("br"));
                    VotedemoErrobutton[i].setAttribute("onclick","printText('"+precinctidinfo+"','VOTEDEMO')");
                }
                if(errorJson[i].type=="NOVOTE"){
                    NOVOTEnum++;
                    NovoteErrobutton[i] = document.createElement("button");
                    NovoteErrobutton[i].setAttribute("class","btn btn-link");
                    let errorinfo = errorJson[i].info;
                    let firstsem = errorinfo.indexOf(';');
                    let secondsem = errorinfo.indexOf(';',firstsem+1);  //precinctID 前的分号
                    let thirdsem = errorinfo.indexOf(';',secondsem+1);  //precintID 后面的分号
                    let precinctidinfo = errorinfo.substring(secondsem+1, thirdsem);
                    NovoteErrobutton[i].textContent=precinctidinfo;
                    let lng = errorinfo.substring(0,firstsem);
                    let lat = errorinfo.substring(firstsem+1, secondsem);
                    var errorCoord = {
                        "lat" : lat,
                        "lng" : lng
                    };
                    NovoteErroCoord[precinctidinfo]=errorCoord;
                    noVotingTable.appendChild(NovoteErrobutton[i]);
                    noVotingTable.appendChild(document.createElement("br"));
                    NovoteErrobutton[i].setAttribute("onclick","printText('"+precinctidinfo+"','NOVOTE')");
                }
                if(errorJson[i].type=="NODEMO"){
                    NODEMOnum++;
                    NoDemoErrobutton[i] = document.createElement("button");
                    NoDemoErrobutton[i].setAttribute("class","btn btn-link");
                    let errorinfo = errorJson[i].info;
                    let firstsem = errorinfo.indexOf(';');
                    let secondsem = errorinfo.indexOf(';',firstsem+1);  //precinctID 前的分号
                    // let thirdsem = errorinfo.indexOf(';',secondsem+1);  //precintID 后面的分号
                    let precinctidinfo = errorinfo.substring(secondsem+1);
                    NoDemoErrobutton[i].textContent=precinctidinfo;
                    let lng = errorinfo.substring(0,firstsem);
                    let lat = errorinfo.substring(firstsem+1, secondsem);
                    var errorCoord = {
                        "lat" : lat,
                        "lng" : lng
                    };
                    NodemoErroCoord[precinctidinfo]=errorCoord;
                    noDemoTable.appendChild(NoDemoErrobutton[i]);
                    noDemoTable.appendChild(document.createElement("br"));
                    NoDemoErrobutton[i].setAttribute("onclick","printText('"+precinctidinfo+"','NODEMO')");
                }
                if(errorJson[i].type=="OVERLAP"){
                    Overlapnum++;
                    var Overlapbutton = document.createElement("button");
                    Overlapbutton.setAttribute("class","btn btn-link");
                    Overlapbutton.textContent=errorJson[i].info;
                    overlapTable.appendChild(Overlapbutton);
                    overlapTable.appendChild(document.createElement("br"));
                }
                if(errorJson[i].type=="GAP"){
                    Gapnum++;
                    Gapbutton[i] = document.createElement("button");
                    Gapbutton[i].setAttribute("class","btn btn-link");
                    let errorinfo = errorJson[i].info;
                    let firstsem = errorinfo.indexOf(';');
                    // let secondsem = errorinfo.indexOf(';',firstsem+1);  //precinctID 前的分号
                    // let thirdsem = errorinfo.indexOf(';',secondsem+1);  //precintID 后面的分号
                    // let precinctidinfo = errorinfo.substring(secondsem+1);
                    let precinctidinfo = errorJson[i].id;
                    let lng = errorinfo.substring(0,firstsem);
                    let lat = errorinfo.substring(firstsem+1);
                    Gapbutton[i].textContent="Gap";
                    var errorCoord = {
                        "lat" : lat,
                        "lng" : lng
                    };
                    gapCoord[precinctidinfo]=errorCoord;
                    gapTable.appendChild(Gapbutton[i]);
                    gapTable.appendChild(document.createElement("br"));
                    Gapbutton[i].setAttribute("onclick","printText('"+precinctidinfo+"','GAP')");
                }
                if(errorJson[i].type=="SELFINTER"){
                    slefnum++;
                    var Slefbutton = document.createElement("button");
                    Slefbutton.setAttribute("class","btn btn-link");
                    Slefbutton.textContent=errorJson[i].info;
                    selfTable.appendChild(Slefbutton);
                    selfTable.appendChild(document.createElement("br"));
                }
                if(errorJson[i].type=="ENCLOSED"){
                    enclosenum++;
                    var Enclosebutton = document.createElement("button");
                    Enclosebutton.setAttribute("class","btn btn-link");
                    Enclosebutton.textContent=errorJson[i].info;
                    encloseTable.appendChild(Enclosebutton);
                    encloseTable.appendChild(document.createElement("br"));
                }
                if(errorJson[i].type=="MULTIPOLY"){
                    multinum++;
                    Multibutton[i] = document.createElement("button");
                    Multibutton[i].setAttribute("class","btn btn-link");
                    let errorinfo = errorJson[i].info;
                    let firstsem = errorinfo.indexOf(';');
                    let secondsem = errorinfo.indexOf(';',firstsem+1);  //precinctID 前的分号
                    // let thirdsem = errorinfo.indexOf(';',secondsem+1);  //precintID 后面的分号
                    let precinctidinfo = errorinfo.substring(secondsem+1);
                    Multibutton[i].textContent=precinctidinfo;
                    let lng = errorinfo.substring(0,firstsem);
                    let lat = errorinfo.substring(firstsem+1, secondsem);
                    var errorCoord = {
                        "lat" : lat,
                        "lng" : lng
                    };
                    multiPolyCoord[precinctidinfo]=errorCoord;
                    mutipolyTable.appendChild(Multibutton[i]);
                    mutipolyTable.appendChild(document.createElement("br"));
                    Multibutton[i].setAttribute("onclick","printText('"+precinctidinfo+"','MULTIPOLY')");
                }
            }
            VoteDemoErrorNumber.textContent=VOTEDEMOnum;
            noVoteNumber.textContent=NOVOTEnum;
            noDemoNumber.textContent = NODEMOnum;
            overlapNumber.textContent=Overlapnum;
            gapNumber.textContent=Gapnum;
            selfNumber.textContent=slefnum;
            encloseNumber.textContent=enclosenum;
            mutipolyNumber.textContent=multinum;
            // for(var i in VotedemoErrobutton){
            //     console.log(VotedemoErrobutton[i]);
            //     VotedemoErrobutton[i].addEventListener('click',function(){
            //         console.log(VotedemoErrobutton[i].textContent);
            //     })
            // }
        }

    }
    // console.log("open error");
    errs.style.opacity = "1";
    sidepaneData.style.display = "none"
    sidepaneErrLog.style.display = "block"
    logTab.classList.remove("active")
    logContent.classList.remove("active")
    errTab.classList.add("active")
    errContent.classList.add("active")
}
var marker;
async function printText(message,type) {
    if(marker!=null){
        marker.setMap(null);
    }
    // console.log(VotedemoErroCoord);
    // console.log(VotedemoErroCoord[message]);
    var coord;
    if(type=="VOTEDEMO") {
        coord = VotedemoErroCoord[message];
    }
    if(type=="NOVOTE") {
        coord = NovoteErroCoord[message];
    }
    if(type=="NODEMO") {
        coord = NodemoErroCoord[message];
    }if(type=="MULTIPOLY") {
        coord = multiPolyCoord[message];
    }
    if(type=="GAP") {
        coord = gapCoord[message];
        // coord = VotedemoErroCoord[message];
    }if(type=="VOTEDEMO") {
        // coord = VotedemoErroCoord[message];
    }
    if(type=="VOTEDEMO") {
        // coord = VotedemoErroCoord[message];
    }


    // parseFloat(s)
    var latCoord = parseFloat(coord.lat);
    var lngCoord = parseFloat(coord.lng);
    var myLatLng = {
        lat:latCoord,
        lng:lngCoord
    }
    console.log(myLatLng);
    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Demo data and Voting data are not compatible'
    });


}

logs.onmousedown = function () {
    logs.style.opacity = ".5"
}

logs.onmouseup = function () {
    if (isNotToggled) {
        sidepane.classList.toggle("toggled")
        isNotToggled = false
    }

    logs.style.opacity = "1"
    sidepaneData.style.display = "none"
    sidepaneErrLog.style.display = "block"
    errTab.classList.remove("active")
    errContent.classList.remove("active")
    logTab.classList.add("active")
    logContent.classList.add("active")
}
