var changeVoting = document.getElementById("SaveVoteChanges");
// editDemo
var editVoting = document.getElementById("voteEdit");
var editDemo = document.getElementById("editDemo");
var changeDemo = document.getElementById("SaveDemoChanges");
var datatype = document.getElementById("Datatype");
// votingComment
var votingComment = document.getElementById("votingComment");
// changeVoting.onclick(function(){
//     console.log("change voting");
//     var dmVoting=document.getElementById("dmChanges").valueOf();
//     console.log(dmVoting);
//
// })
editVoting.addEventListener('click',function(){
    var origionrp = document.getElementById("RepublicanVoting").textContent;    //原本的
    var origiongr = document.getElementById("GreenVoting").textContent;
    var origionlb = document.getElementById("LibertarianVoting").textContent;
    var origiondm = document.getElementById("DemocraticVoting").textContent;
    document.getElementById("dmChanges").value = origiondm;    //输入框里面的
    document.getElementById("rpChanges").value = origionrp;
    document.getElementById("lbChanges").value =origionlb;
    document.getElementById("grChanges").value = origiongr;
})
changeVoting.addEventListener('click', function(){
    console.log("change voting");

    if(clickedState=="va"){
        dataSource.textContent="Secretary State Of Virginia"
    }
    if(clickedState=="tx"){
        dataSource.textContent="State Of Texas"
    }
    if(clickedState=="ri"){
        dataSource.textContent="Secretary State Of Rhode Island"
    }

    var dmVoting=document.getElementById("dmChanges").value;    //输入框里面的
    var rpVoting=document.getElementById("rpChanges").value;
    var lbVoting=document.getElementById("lbChanges").value;
    var grVoting=document.getElementById("grChanges").value;

    var origionrp = document.getElementById("RepublicanVoting").textContent;    //原本的
    var origiongr = document.getElementById("GreenVoting").textContent;
    var origionlb = document.getElementById("LibertarianVoting").textContent;
    var origiondm = document.getElementById("DemocraticVoting").textContent;
    document.getElementById("dmChanges").value = origiondm;    //输入框里面的
    document.getElementById("rpChanges").value = origionrp;
    document.getElementById("lbChanges").value =origionlb;
    document.getElementById("grChanges").value = origiongr;
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
    var StateName =countyandState.textContent.substring(indexofComma+2);  //不变的
    var StateId;
    if(StateName=="Rhode Island"){
        StateId="ri";
    }
    if(StateName=="Virginia"){
        StateId="va";
    }
    if(StateName=="Texas"){
        StateId="tx";
    }
    var countyID = StateId+"-"+countyandState.textContent.substring(0, indexofComma);
    countyID = countyID.toLowerCase();
    var indexofspace = precinctName.textContent.indexOf(' ');
    var precinctID = precinctName.textContent.substring(indexofspace+1);
    var PrecinctId = countyID+"-"+precinctID;
    console.log(StateId);
    console.log(countyID);
    console.log(PrecinctId);
    var comment = votingComment.value;
    var type;
    var year;
    // if(value == 4){ //Presidential General
        var url = 'http://localhost:8080/state/';
        var url2=StateId+'/county/';
        var url3=countyID+'/precinct/';
    if(value == 4) { //Presidential General
        type = "PRESIDENTIAL";
        year = 2016;
        var url4 = PrecinctId + '/data/vote/presidential/2016';
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("democraticVote", DData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("greenVote", GData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("libertarianVote", LData);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote("republicanVote", RData);
    }
    if(value == 2) { //18 congressional
        var disNumber = (allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).Congressional18Vote["distNum"]);
        var url4 = PrecinctId + '/data/vote/congressional/'+disNumber+'/2018';
        type = "CONGRESSIONAL";
        year = 2018;
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional18Vote("democraticVote", DData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional18Vote("greenVote", GData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional18Vote("libertarianVote", LData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional18Vote("republicanVote", RData, disNumber);
        // /state/{stateId}/county/{countyId}/precinct/{precinctId}/data/vote/congressional/{dist}/{year}
    }
    if(value == 3) { //16 congressional

        var disNumber = (allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).Congressional16Vote["distNum"]);
        var url4 = PrecinctId + '/data/vote/congressional/'+disNumber+'/2016';
        type = "CONGRESSIONAL";
        year = 2016;
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional16Vote("democraticVote", DData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional16Vote("greenVote", GData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional16Vote("libertarianVote", LData,disNumber);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setCongressional16Vote("republicanVote", RData, disNumber);
        // /state/{stateId}/county/{countyId}/precinct/{precinctId}/data/vote/congressional/{dist}/{year}
    }
        console.log(url+url2+url3+url4);

        document.getElementById("RepublicanVoting").textContent = RData;
        document.getElementById("GreenVoting").textContent = GData;
        document.getElementById("LibertarianVoting").textContent = LData;
        document.getElementById("DemocraticVoting").textContent = DData;
        var votingdata = {
            // "id" : PrecinctId,
            "type" : type,
            "year" : year,
            "republicanVote" : RData,
            "democraticVote" : DData,
            "libertarianVote" : LData,
            "greenVote" : GData

        };
        var data ={
            "data":votingdata,
            "comment":comment
        }
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

    // var votingType=

})
editDemo.addEventListener('click',function(){
    var origionTT = document.getElementById("TotalData").textContent;    //原本的
    var origionWD = document.getElementById("WhiteData").textContent;
    var origionBD = document.getElementById("BlackData").textContent;
    var origionAD = document.getElementById("AsianData").textContent;
    var origionND = document.getElementById("NativeData").textContent;
    var origionOD = document.getElementById("OtherData").textContent;
    document.getElementById("TotalPop").value = origionTT;    //输入框里面的
    document.getElementById("WhiteNum").value = origionWD;
    document.getElementById("BlackNum").value =origionBD;
    document.getElementById("AsianNum").value= origionAD;
    document.getElementById("NativeNum").value = origionND;
    document.getElementById("OtherNum").value = origionOD;
})
changeDemo.addEventListener('click',function(){
    var TotalPop=document.getElementById("TotalPop").value;    //输入框里面的
    var WhiteNum=document.getElementById("WhiteNum").value;
    var BlackNum=document.getElementById("BlackNum").value;
    var AsianNum=document.getElementById("AsianNum").value;
    var NativeNum=document.getElementById("NativeNum").value;
    var OtherNum=document.getElementById("OtherNum").value;

    var origionTT = document.getElementById("TotalData").textContent;    //原本的
    var origionWD = document.getElementById("WhiteData").textContent;
    var origionBD = document.getElementById("BlackData").textContent;
    var origionAD = document.getElementById("AsianData").textContent;
    var origionND = document.getElementById("NativeData").textContent;
    var origionOD = document.getElementById("OtherData").textContent;
    let TData;
    let WData;
    let BData;
    let AData;
    let NData;
    let OData;

    if(TotalPop==""||isNaN(TotalPop)){
        console.log("it is null");
        TData= parseInt(origionTT);
    }else{
        TData=parseInt(TotalPop);
    }
    if(WhiteNum==""||isNaN(WhiteNum)){
        WData=parseInt(origionWD);
    }else{
        WData=parseInt(WhiteNum);
    }
    if(BlackNum==""||isNaN(BlackNum)){
        BData= parseInt(origionBD);
    }else{
        BData= parseInt(BlackNum);
    }
    if(AsianNum==""||isNaN(AsianNum)){
        AData = parseInt(origionAD);
    }else{
        AData = parseInt(AsianNum);
    }
    if(NativeNum==""||isNaN(NativeNum)){
        NData = parseInt(origionND);
    }else{
        NData = parseInt(NativeNum);
    }
    if(OtherNum==""||isNaN(OtherNum)){
        OData = parseInt(origionOD);
    }else{
        OData = parseInt(OtherNum);
    }
    var indexofComma = countyandState.textContent.indexOf(',');
    var StateName =countyandState.textContent.substring(indexofComma+2);  //不变的
    var StateId;
    if(StateName=="Rhode Island"){
        StateId="ri";
    }
    if(StateName=="Virginia"){
        StateId="va";
    }
    if(StateName=="Texas"){
        StateId="tx";
    }
    var countyID = StateId+"-"+countyandState.textContent.substring(0, indexofComma);
    countyID = countyID.toLowerCase();
    var indexofspace = precinctName.textContent.indexOf(' ');
    var precinctID = precinctName.textContent.substring(indexofspace+1);
    var PrecinctId = countyID+"-"+precinctID;
    console.log(StateId);
    console.log(countyID);
    console.log(PrecinctId);
    var comment = votingComment.value;
    // /state/{stateId}/county/{countyId}/precinct/{precinctId}/data/demo
    var url = 'http://localhost:8080/state/';
    var url2=StateId+'/county/';
    var url3=countyID+'/precinct/'+PrecinctId+'/data/demo';
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("asianPop", AData);
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("blackPop", BData);
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("nativePop", NData);
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("otherPop", OData);
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("totalPop", TData);
    allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic("whitePop", WData);

    document.getElementById("TotalData").textContent = TData;
    document.getElementById("WhiteData").textContent = WData;
    document.getElementById("AsianData").textContent = AData;
    document.getElementById("NativeData").textContent = NData;
    document.getElementById("BlackData").textContent = BData;
    document.getElementById("OtherData").textContent = OData;

    var data = {
        "totalPop" : TData,
        "whitePop" : WData,
        "blackPop" : BData,
        "nativePop": NData,
        "asianPop" : AData,
        "otherPop" : OData
    };
    var data ={
        "demoData":data,
        "comment":comment
    }
    fetch(url+url2+url3, {
        method: 'PUT', // or 'PUT'
        body:JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

})
