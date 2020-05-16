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
            for(var i in errorJson){
                if(errorJson[i].type=="VOTEDEMO"){
                    VOTEDEMOnum++;
                    var VotedemoErrobutton = document.createElement("button");
                    VotedemoErrobutton.setAttribute("class","btn btn-link");
                    VotedemoErrobutton.textContent=errorJson[i].info;
                    VoteDemoErrorTable.appendChild(VotedemoErrobutton);
                    VoteDemoErrorTable.appendChild(document.createElement("br"));
                }
                if(errorJson[i].type=="NOVOTE"){
                    NOVOTEnum++;
                    var NovoteErrobutton = document.createElement("button");
                    NovoteErrobutton.setAttribute("class","btn btn-link");
                    NovoteErrobutton.textContent=errorJson[i].info;
                    noVotingTable.appendChild(NovoteErrobutton);
                    noVotingTable.appendChild(document.createElement("br"));
                }
                if(errorJson[i].type=="NODEMO"){
                    NODEMOnum++;
                    var NoDemoErrobutton = document.createElement("button");
                    NoDemoErrobutton.setAttribute("class","btn btn-link");
                    NoDemoErrobutton.textContent=errorJson[i].info;
                    noDemoTable.appendChild(NoDemoErrobutton);
                    noDemoTable.appendChild(document.createElement("br"));
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
                    var Gapbutton = document.createElement("button");
                    Gapbutton.setAttribute("class","btn btn-link");
                    Gapbutton.textContent=errorJson[i].info;
                    gapTable.appendChild(Gapbutton);
                    gapTable.appendChild(document.createElement("br"));
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
                    var Multibutton = document.createElement("button");
                    Multibutton.setAttribute("class","btn btn-link");
                    Multibutton.textContent=errorJson[i].info;
                    mutipolyTable.appendChild(Multibutton);
                    mutipolyTable.appendChild(document.createElement("br"));
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
