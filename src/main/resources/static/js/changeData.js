var changeVoting = document.getElementById("SaveVoteChanges");
var datatype = document.getElementById("Datatype");
// changeVoting.onclick(function(){
//     console.log("change voting");
//     var dmVoting=document.getElementById("dmChanges").valueOf();
//     console.log(dmVoting);
//
// })
changeVoting.addEventListener('click', function(){
    console.log("change voting");
    var dmVoting=document.getElementById("dmChanges").value;    //输入框里面的
    var rpVoting=document.getElementById("rpChanges").value;
    var lbVoting=document.getElementById("lbChanges").value;
    var grVoting=document.getElementById("grChanges").value;

    var origionrp = document.getElementById("RepublicanVoting").textContent;    //原本的
    var origiongr = document.getElementById("GreenVoting").textContent;
    var origionlb = document.getElementById("LibertarianVoting").textContent;
    var origiondm = document.getElementById("DemocraticVoting").textContent;
    let RData;
    let DData;
    let LData;
    let GData;
    if(dmVoting==""||isNaN(dmVoting)){
        console.log("it is null");
        DData= parseInt(origiondm);
    }else{
        DData=parseInt(dmVoting);
    }
    if(rpVoting==""||isNaN(rpVoting)){
        RData=parseInt(origionrp);
    }else{
        RData=parseInt(rpVoting);
    }
    if(lbVoting==""||isNaN(lbVoting)){
        LData= parseInt(origionlb);
    }else{
        LData= parseInt(lbVoting);
    }
    if(grVoting==""||isNaN(grVoting)){
        GData = parseInt(origiongr);
    }else{
        GData = grVoting;
    }
    var value = datatype.value;
    console.log(value);
    var indexofComma = countyandState.textContent.indexOf(',');
    var StateId =countyandState.textContent.substring(indexofComma+2);
    var countyID = countyandState.textContent.substring(0, indexofComma);
    var PrecinctId = precinctName.textContent;
    if(value == 4){ //Presidential General
        var url = 'http://localhost:8080/state/';
        var url2=StateId+'/county/';
        var url3=countyID+'/precinct/';
        var url4 = PrecinctId+'/data/vote/presidential/2016';
        console.log(url+url2+url3+url4);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("democraticVote", DData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("greenVote", GData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("libertarianVote", LData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("republicanVote", RData);
        document.getElementById("RepublicanVoting").textContent = RData;
        document.getElementById("GreenVoting").textContent = GData;
        document.getElementById("LibertarianVoting").textContent = LData;
        document.getElementById("DemocraticVoting").textContent = DData;


        var data = {
            // "id" : PrecinctId,
            "type" : "PRESIDENTIAL",
            "year" : 2016,
            "republicanVote" : RData,
            "democraticVote" : DData,
            "libertarianVote" : LData,
            "greenVote" : GData
        };
        console.log(JSON.stringify(data));
        fetch(url+url2+url3+url4, {
            method: 'PUT', // or 'PUT'
            body:JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }
    // var votingType=

})
