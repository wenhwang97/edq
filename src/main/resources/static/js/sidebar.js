function inforChange(precinctNumber) {
    document.getElementById("precinct title info").textContent = "Data infor: #"+precinctNumber ;
}
function test(){
    console.log("???");
}

function showCounty(){
    var r=document.getElementsByName("countyCheckBox");
}

// var cont = document.getElementById("DemocracyInput");//这是div
function ShowImage(page, tag){
    var i = 1;
    var el;
    while (el = document.getElementById(tag + i)) {
        if (i == page)
        el.style.display = 'block';
        else
        el.style.display = 'none';
        i++;
    }
}

function resore(NewInputId,conbutId,concleId,origional,changeButtion){

    console.log(NewInputId);
    var NewInput = document.getElementById(NewInputId);
    var conbut = document.getElementById(conbutId);
    var canbut = document.getElementById(concleId);
    var cont = document.getElementById(origional);
    var but = document.createElement("input");
    but.setAttribute("id",changeButtion);
    but.setAttribute("class","Change");
    but.setAttribute("type","image");
    but.setAttribute("src","../images/submit.png");
    if(NewInputId=="RepublicanTextinput"){
        but.setAttribute("onclick","addRepubBotton()");
    }
    if(NewInputId=="DemocracyTextinput"){
        but.setAttribute("onclick","addDemoBotton()");
    }
    if(NewInputId=="LibertatianTextinput"){
        but.setAttribute("onclick","addLibBotton()");
    }
    if(NewInputId=="GreenTextinput"){
        but.setAttribute("onclick","addGreenBotton()");
    }
    but.style.marginLeft="5%";
    but.style.height="15px";
    but.style.width="15px";
    NewInput.remove(NewInput);
    conbut.remove(conbut);
    canbut.remove(canbut);
    cont.appendChild(but);
    console.log("remove??");
}
function ChangeData(InputField, DataText,voteType){
    let Data = InputField.value;
    if(document.getElementById(DataText).textContent!=''&&Data!=''){
        let RData;
        let DData;
        let LData;
        let GData;
        if(DataText=='RepublicanData'){
            DData = parseInt(document.getElementById("DemocraticData").textContent);
            LData = parseInt(document.getElementById("LibertarianData").textContent);
            GData = parseInt(document.getElementById("GreenData").textContent);
            RData =parseInt(Data);
        }
        if(DataText=='DemocraticData'){
            RData = parseInt(document.getElementById("RepublicanData").textContent);
            LData = parseInt(document.getElementById("LibertarianData").textContent);
            GData = parseInt(document.getElementById("GreenData").textContent);
            DData = parseInt(Data);
        }
        if(DataText=='LibertarianData'){
            DData = parseInt(document.getElementById("DemocraticData").textContent);
            RData = parseInt(document.getElementById("RepublicanData").textContent);
            GData = parseInt(document.getElementById("GreenData").textContent);
            LData = parseInt(Data);
        }
        if(DataText=='GreenData'){
            DData = parseInt(document.getElementById("DemocraticData").textContent);
            LData = parseInt(document.getElementById("LibertarianData").textContent);
            RData = parseInt(document.getElementById("RepublicanData").textContent);
            GData = parseInt(Data);
        }
        document.getElementById(DataText).textContent=Data;
        var str = document.getElementById("precinct title info").textContent;
        var PrecinctId=str.substring(13);
        var StateId = str.substring(13,15);
        var countyID= str.substring(13,str.length-5);
        console.log(StateId);   //stateID
        console.log(str.substring(13,str.length-5));   //county ID
        // console.log(parseInt(PrecinctId));    //precinct ID
        // for(i=0; i<PrecinctId.length;i++){
        //
        // }
        // console.log(allStates["ri"].getAllCounties());
        // allStates[StateId].
        console.log(allStates[StateId]);
        console.log(allStates[StateId].getCountyByID(countyID));
        console.log();
        // console.log(allStates[StateId].getCountyByID(countyID).getPrecinctByID(parseInt(PrecinctId)));
        // let Preicinct = allStates[StateId].getCountyByID(countyID).getPrecinctByID(parseInt(PrecinctId));
        console.log(PrecinctId);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setPresidentialVote(voteType,Data);
        //然后post
        var url = 'http://localhost:8080/state/';
        var url2=StateId+'/county/';
        var url3=countyID+'/precinct/';
        var url4 = PrecinctId+'/data/vote/presidential/2016';
        console.log(url+url2+url3+url4);
        // console.log()
        // var PrecinctIdInt = parseInt(PrecinctId);
        var data = {
            // "id" : PrecinctId,
            "type" : "PRESIDENTIAL",
            "year" : 2016,
            "republicanVote" : RData,
            "democraticVote" : DData,
            "libertarianVote" : LData,
            "greenVote" : GData
        };
        // var data={"id":902,"type":"PRESIDENTIAL","year":2016,"republicanVote":700,"democraticVote":900,"libertarianVote":60,"greenVote":10}

        // console.log(JSON.parse(JSON.stringify(data)));
        // try{
        //     fetch(url+url2+url3+url4, {
        //         method: 'POST', // or 'PUT'
        //         body:JSON.stringify(data), // data can be `string` or {object}!
        //         headers: new Headers({
        //             'Content-Type': 'application/json'
        //         })
        //     })
        // }catch{
        //
        // }
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
    // console.log(Data);
}

function addRepubBotton(){
    var cont = document.getElementById("RepublicanInput");//这是div
    var but = document.getElementById("RepublicanChange");
    if(but!=null){
        but.remove(but);
    }
    var NewInput = document.createElement("input");
    var conbut = document.createElement("input");
    var canbut = document.createElement("input");
    NewInput.setAttribute("size",20);
    NewInput.setAttribute("id","RepublicanTextinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    conbut.setAttribute("id","RepublicanConfirm");
    conbut.setAttribute("src","../images/confirm.png")
    // conbut.setAttribute("onclick","resore('RepublicanTextinput','RepublicanConfirm','RepublicanCancle','RepublicanInput','RepublicanChange')");
    conbut.setAttribute("onclick","ChangeData(document.getElementById('RepublicanTextinput'),'RepublicanData','republicanVote')");
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    canbut.setAttribute("type","image");
    canbut.setAttribute("id","RepublicanCancle");
    canbut.setAttribute("src","../images/cancle.png")
    canbut.setAttribute("onclick","resore('RepublicanTextinput','RepublicanConfirm','RepublicanCancle','RepublicanInput','RepublicanChange')");
    canbut.style.marginLeft="1%";
    canbut.style.height="20px";
    canbut.style.width="20px";
    cont.appendChild(NewInput);
    cont.appendChild(conbut);
    cont.appendChild(canbut);
}
function addDemoBotton(){
    var cont = document.getElementById("DemocracyInput");//这是div
    var but = document.getElementById("DemocracyChange");
    if(but!=null){
        but.remove(but);
    }
    var NewInput = document.createElement("input");
    var conbut = document.createElement("input");
    var canbut = document.createElement("input");
    NewInput.setAttribute("size",20);
    NewInput.setAttribute("id","DemocracyTextinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    conbut.setAttribute("id","DemocracyConfirm");
    conbut.setAttribute("src","../images/confirm.png")
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    canbut.setAttribute("type","image");
    canbut.setAttribute("id","DemocracyCancle");
    canbut.setAttribute("src","../images/cancle.png")
    canbut.setAttribute("onclick","resore('DemocracyTextinput','DemocracyConfirm','DemocracyCancle','DemocracyInput','DemocracyChange' )");
    canbut.style.marginLeft="1%";
    canbut.style.height="20px";
    canbut.style.width="20px";
    cont.appendChild(NewInput);
    cont.appendChild(conbut);
    cont.appendChild(canbut);
}

function addLibBotton(){
    var cont = document.getElementById("LibertatianInput");//这是div
    var but = document.getElementById("LibertatianChange");
    // var cont = document.getElementById(classid);//这是div
    // var but = document.getElementById(inputid);
    if(but!=null){
        but.remove(but);
    }
    var NewInput = document.createElement("input");
    var conbut = document.createElement("input");
    var canbut = document.createElement("input");
    NewInput.setAttribute("size",20);
    // var nameInput = fildname+"Textinput";
    // NewInput.setAttribute("id","LibertatianTextinput");
    NewInput.setAttribute("id","LibertatianTextinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    // var confirmName = fildname+"Confirm";
    conbut.setAttribute("id","LibertatianConfirm");
    // conbut.setAttribute("id",confirmName);
    conbut.setAttribute("src","../images/confirm.png")
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    canbut.setAttribute("type","image");
    // var cancelName = fildname+"Cancle";
    canbut.setAttribute("id","LibertatianCancle");
    // canbut.setAttribute("id",cancelName);
    canbut.setAttribute("src","../images/cancle.png")
    canbut.setAttribute("onclick","resore('LibertatianTextinput','LibertatianConfirm','LibertatianCancle','LibertatianInput','LibertatianChange')");
    // console.log(nameInput)
    canbut.style.marginLeft="1%";
    canbut.style.height="20px";
    canbut.style.width="20px";
    cont.appendChild(NewInput);
    cont.appendChild(conbut);
    cont.appendChild(canbut);
}
function addGreenBotton(){
    var cont = document.getElementById("GreenInput");//这是div
    var but = document.getElementById("GreenChange");
    if(but!=null){
        but.remove(but);
    }
    var NewInput = document.createElement("input");
    var conbut = document.createElement("input");
    var canbut = document.createElement("input");
    NewInput.setAttribute("size",20);
    NewInput.setAttribute("id","GreenTextinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    conbut.setAttribute("id","GreenConfirm");
    conbut.setAttribute("src","../images/confirm.png")
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    canbut.setAttribute("type","image");
    canbut.setAttribute("id","GreenCancle");
    canbut.setAttribute("src","../images/cancle.png")
    canbut.setAttribute("onclick","resore('GreenTextinput','GreenConfirm','GreenCancle','GreenInput','GreenChange' )");
    canbut.style.marginLeft="1%";
    canbut.style.height="20px";
    canbut.style.width="20px";
    cont.appendChild(NewInput);
    cont.appendChild(conbut);
    cont.appendChild(canbut);
}
function changeData(DataTail,VoteType){
    console.log("change data la!!");
    document.getElementById("DataTitle").textContent = DataTail+" Data";
    if(VoteType=="Voting"){

    }
}
