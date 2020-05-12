function inforChange(precinctNumber) {
    document.getElementById("precinct title info").textContent = "Data: "+precinctNumber ;
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
    console.log(NewInputId.substring(0,NewInputId.length-9));
    var input = NewInputId.substring(0,NewInputId.length-9)+'Input';
    var change = NewInputId.substring(0,NewInputId.length-9)+'Change';
    var New = NewInputId.substring(0,NewInputId.length-9);
    var NewInput = document.getElementById(NewInputId);
    var conbut = document.getElementById(conbutId);
    var canbut = document.getElementById(concleId);
    var cont = document.getElementById(origional);
    var but = document.createElement("input");
    but.setAttribute("id",changeButtion);
    but.setAttribute("class","Change");
    but.setAttribute("type","image");
    but.setAttribute("src","../images/submit.png");
    console.log(input);
    console.log(change);
    console.log(New);
    if(NewInputId=="RepublicanTextinput"){
        but.setAttribute("onclick","addBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="DemocraticTextinput"){
        but.setAttribute("onclick","addBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="LibertatianTextinput"){
        but.setAttribute("onclick","addBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="GreenTextinput"){
        but.setAttribute("onclick","addBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="AsianTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="BlackTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="WhiteTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="NativeTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="OtherTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
    }
    if(NewInputId=="TotalTextinput"){
        but.setAttribute("onclick","changeDemoBotton('"+input+"', '"+change+"', '"+New+"')");
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
    // console.log("?test");
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
        console.log(str);
        console.log(str.indexOf('-'));
        var indexofgang = str.indexOf('-');
        var PrecinctId=str.substring(str.length-12);
        var StateId = str.substring(indexofgang-2,indexofgang);
        var countyID= str.substring(indexofgang-2,str.length-5);
        console.log(StateId);   //stateID
        console.log(countyID);
        console.log(str.substring(13,str.length-5));   //county ID
        console.log(allStates[StateId]);
        console.log(allStates[StateId].getCountyByID(countyID));
        // console.log();
        console.log(allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId));
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

// function addRepubBotton(){
//     var cont = document.getElementById("RepublicanInput");//这是div
//     var but = document.getElementById("RepublicanChange");
//     if(but!=null){
//         but.remove(but);
//     }
//     var NewInput = document.createElement("input");
//     var conbut = document.createElement("input");
//     var canbut = document.createElement("input");
//     NewInput.setAttribute("size",20);
//     NewInput.setAttribute("id","RepublicanTextinput");
//     NewInput.setAttribute("type","text");
//     NewInput.setAttribute("name","new");
//     NewInput.style.border = '1px solid #000';
//     NewInput.style.width = '30%';
//     NewInput.style.height='20px';
//     conbut.setAttribute("type","image");
//     conbut.setAttribute("id","RepublicanConfirm");
//     conbut.setAttribute("src","../images/confirm.png")
//     // conbut.setAttribute("onclick","resore('RepublicanTextinput','RepublicanConfirm','RepublicanCancle','RepublicanInput','RepublicanChange')");
//     conbut.setAttribute("onclick","ChangeData(document.getElementById('RepublicanTextinput'),'RepublicanData','republicanVote')");
//     conbut.style.marginLeft="3%";
//     conbut.style.height="20px";
//     conbut.style.width="20px";
//     canbut.setAttribute("type","image");
//     canbut.setAttribute("id","RepublicanCancle");
//     canbut.setAttribute("src","../images/cancle.png")
//     console.log(canbut)
//     var testVar="RepublicanTextinput"
//     canbut.setAttribute("onclick","resore('"+testVar+"','RepublicanConfirm','RepublicanCancle','RepublicanInput','RepublicanChange')");
//     canbut.style.marginLeft="1%";
//     canbut.style.height="20px";
//     canbut.style.width="20px";
//     cont.appendChild(NewInput);
//     cont.appendChild(conbut);
//     cont.appendChild(canbut);
// }
// function addDemoBotton(){
//     var cont = document.getElementById("DemocraticInput");//这是div
//     var but = document.getElementById("DemocraticChange");
//     if(but!=null){
//         but.remove(but);
//     }
//     var NewInput = document.createElement("input");
//     var conbut = document.createElement("input");
//     var canbut = document.createElement("input");
//     NewInput.setAttribute("size",20);
//     NewInput.setAttribute("id","DemocraticTextinput");
//     NewInput.setAttribute("type","text");
//     NewInput.setAttribute("name","new");
//     NewInput.style.border = '1px solid #000';
//     NewInput.style.width = '30%';
//     NewInput.style.height='20px';
//     conbut.setAttribute("type","image");
//     conbut.setAttribute("id","DemocraticConfirm");
//     conbut.setAttribute("src","../images/confirm.png")
//     conbut.style.marginLeft="3%";
//     conbut.style.height="20px";
//     conbut.style.width="20px";
//     canbut.setAttribute("type","image");
//     canbut.setAttribute("id","DemocraticCancle");
//     canbut.setAttribute("src","../images/cancle.png")
//     canbut.setAttribute("onclick","resore('DemocraticTextinput','DemocraticConfirm','DemocraticCancle','DemocraticInput','DemocraticChange' )");
//     canbut.style.marginLeft="1%";
//     canbut.style.height="20px";
//     canbut.style.width="20px";
//     cont.appendChild(NewInput);
//     cont.appendChild(conbut);
//     cont.appendChild(canbut);
// }

// function addLibBotton(){
//     var cont = document.getElementById("LibertatianInput");//这是div
//     var but = document.getElementById("LibertatianChange");
//     // var cont = document.getElementById(classid);//这是div
//     // var but = document.getElementById(inputid);
//     if(but!=null){
//         but.remove(but);
//     }
//     var NewInput = document.createElement("input");
//     var conbut = document.createElement("input");
//     var canbut = document.createElement("input");
//     NewInput.setAttribute("size",20);
//     // var nameInput = fildname+"Textinput";
//     // NewInput.setAttribute("id","LibertatianTextinput");
//     NewInput.setAttribute("id","LibertatianTextinput");
//     NewInput.setAttribute("type","text");
//     NewInput.setAttribute("name","new");
//     NewInput.style.border = '1px solid #000';
//     NewInput.style.width = '30%';
//     NewInput.style.height='20px';
//     conbut.setAttribute("type","image");
//     // var confirmName = fildname+"Confirm";
//     conbut.setAttribute("id","LibertatianConfirm");
//     // conbut.setAttribute("id",confirmName);
//     conbut.setAttribute("src","../images/confirm.png")
//     conbut.style.marginLeft="3%";
//     conbut.style.height="20px";
//     conbut.style.width="20px";
//     canbut.setAttribute("type","image");
//     // var cancelName = fildname+"Cancle";
//     canbut.setAttribute("id","LibertatianCancle");
//     // canbut.setAttribute("id",cancelName);
//     canbut.setAttribute("src","../images/cancle.png")
//     canbut.setAttribute("onclick","resore('LibertatianTextinput','LibertatianConfirm','LibertatianCancle','LibertatianInput','LibertatianChange')");
//     // console.log(nameInput)
//     canbut.style.marginLeft="1%";
//     canbut.style.height="20px";
//     canbut.style.width="20px";
//     cont.appendChild(NewInput);
//     cont.appendChild(conbut);
//     cont.appendChild(canbut);
// }
// function addGreenBotton(){
//     var cont = document.getElementById("GreenInput");//这是div
//     var but = document.getElementById("GreenChange");//这是输入框
//     if(but!=null){
//         but.remove(but);
//     }
//     var NewInput = document.createElement("input");
//     var conbut = document.createElement("input");
//     var canbut = document.createElement("input");
//     NewInput.setAttribute("size",20);
//     NewInput.setAttribute("id","GreenTextinput");
//     NewInput.setAttribute("type","text");
//     NewInput.setAttribute("name","new");
//     NewInput.style.border = '1px solid #000';
//     NewInput.style.width = '30%';
//     NewInput.style.height='20px';
//     conbut.setAttribute("type","image");
//     conbut.setAttribute("id","GreenConfirm");
//     conbut.setAttribute("src","../images/confirm.png")
//     conbut.style.marginLeft="3%";
//     conbut.style.height="20px";
//     conbut.style.width="20px";
//     canbut.setAttribute("type","image");
//     canbut.setAttribute("id","GreenCancle");
//     canbut.setAttribute("src","../images/cancle.png")
//     canbut.setAttribute("onclick","resore('GreenTextinput','GreenConfirm','GreenCancle','GreenInput','GreenChange' )");
//     canbut.style.marginLeft="1%";
//     canbut.style.height="20px";
//     canbut.style.width="20px";
//     cont.appendChild(NewInput);
//     cont.appendChild(conbut);
//     cont.appendChild(canbut);
// }
function ChangeDemoData(InputField, DataText,voteType){
    let Data = InputField.value;
    // console.log("?test");
    if(document.getElementById(DataText).textContent!=''&&Data!=''){
        let AData;
        let BData;
        let WData;
        let NData;  //native
        let OData;
        let TData;
        if(DataText=='AsianData'){
            BData = parseInt(document.getElementById("BlackData").textContent);
            WData = parseInt(document.getElementById("WhiteData").textContent);
            NData = parseInt(document.getElementById("NativeData").textContent);
            OData = parseInt(document.getElementById("OtherData").textContent);
            TData = parseInt(document.getElementById("TotalData").textContent);
            AData =parseInt(Data);
        }
        if(DataText=='BlackData'){
            AData = parseInt(document.getElementById("AsianData").textContent);
            WData = parseInt(document.getElementById("WhiteData").textContent);
            NData = parseInt(document.getElementById("NativeData").textContent);
            OData = parseInt(document.getElementById("OtherData").textContent);
            TData = parseInt(document.getElementById("TotalData").textContent);
            BData =parseInt(Data);
        }
        if(DataText=='WhiteData'){
            AData = parseInt(document.getElementById("AsianData").textContent);
            BData = parseInt(document.getElementById("BlackData").textContent);
            NData = parseInt(document.getElementById("NativeData").textContent);
            OData = parseInt(document.getElementById("OtherData").textContent);
            TData = parseInt(document.getElementById("TotalData").textContent);
            WData =parseInt(Data);
        }
        if(DataText=='NativeData'){
            AData = parseInt(document.getElementById("AsianData").textContent);
            BData = parseInt(document.getElementById("BlackData").textContent);
            WData = parseInt(document.getElementById("WhiteData").textContent);
            OData = parseInt(document.getElementById("OtherData").textContent);
            TData = parseInt(document.getElementById("TotalData").textContent);
            NData =parseInt(Data);
        }
        if(DataText=='OtherData'){
            AData = parseInt(document.getElementById("AsianData").textContent);
            BData = parseInt(document.getElementById("BlackData").textContent);
            WData = parseInt(document.getElementById("WhiteData").textContent);
            NData = parseInt(document.getElementById("NativeData").textContent);
            TData = parseInt(document.getElementById("TotalData").textContent);
            OData =parseInt(Data);
        }
        if(DataText=='TotalData'){
            AData = parseInt(document.getElementById("AsianData").textContent);
            BData = parseInt(document.getElementById("BlackData").textContent);
            WData = parseInt(document.getElementById("WhiteData").textContent);
            NData = parseInt(document.getElementById("NativeData").textContent);
            OData = parseInt(document.getElementById("OtherData").textContent);
            TData =parseInt(Data);
        }
        document.getElementById(DataText).textContent=Data;
        var str = document.getElementById("precinct title info").textContent;
        console.log(str);
        console.log(str.indexOf('-'));
        var indexofgang = str.indexOf('-');
        var PrecinctId=str.substring(str.length-12);
        var StateId = str.substring(indexofgang-2,indexofgang);
        var countyID= str.substring(indexofgang-2,str.length-5);
        console.log(StateId);   //stateID
        console.log(countyID);
        console.log(str.substring(13,str.length-5));   //county ID
        console.log(allStates[StateId]);
        console.log(allStates[StateId].getCountyByID(countyID));
        // console.log();
        console.log(allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId));
        // let Preicinct = allStates[StateId].getCountyByID(countyID).getPrecinctByID(parseInt(PrecinctId));
        console.log(PrecinctId);
        console.log(voteType);
        console.log(Data);
        allStates[StateId].getCountyByID(countyID).getPrecinctByID(PrecinctId).setDemographic(voteType,Data);
        //然后post
        ///state/{stateId}/county/{countyId}/precinct/{precinctId}/data/demo
        var url = 'http://localhost:8080/state/';
        var url2=StateId+'/county/';
        var url3=countyID+'/precinct/';
        var url4 = PrecinctId+'/data/demo';
        console.log(url+url2+url3+url4);
        // console.log()
        // var PrecinctIdInt = parseInt(PrecinctId);
        var data = {
            // "id" : PrecinctId,
            // "type" : "PRESIDENTIAL",
            "totalPop" : TData,
            "whitePop" : WData,
            "blackPop" : BData,
            "nativePop": NData,
            "asianPop" : AData,
            "otherPop" : OData
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
    // console.log(Data);
}
function addBotton(inputID,ChangeID,DataName){
    var cont = document.getElementById(inputID);//这是div
    var but = document.getElementById(ChangeID);
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
    NewInput.setAttribute("id",DataName+"Textinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    // var confirmName = fildname+"Confirm";
    conbut.setAttribute("id",DataName+"Confirm");
    // conbut.setAttribute("id",confirmName);
    conbut.setAttribute("src","../images/confirm.png")
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    var Textinput = DataName+'Textinput';
    var DATA = DataName+'Data';
    var Type = DataName.toLowerCase()+'Vote';
    console.log(Textinput);
    console.log(DATA);
    conbut.setAttribute("onclick","ChangeData(document.getElementById('"+Textinput+"'),'"+DATA+"','"+Type+"')");
    canbut.setAttribute("type","image");
    // var cancelName = fildname+"Cancle";
    canbut.setAttribute("id",DataName+"Cancle");
    // canbut.setAttribute("id",cancelName);
    canbut.setAttribute("src","../images/cancle.png")
    var Textinput = DataName+'Textinput';
    var Confirm = DataName+'Confirm';
    var Cancle = DataName+'Cancle';
    var Input = DataName+'Input';
    var Change = DataName+'Change';
    console.log("test1");

    canbut.setAttribute("onclick","resore('"+Textinput+"','"+Confirm+"','"+Cancle+"','"+Input+"','"+Change+"')");
    // console.log(nameInput)
    // canbut.onclick(e=>{
    //     console.log("testqwe");
    // })
    canbut.style.marginLeft="1%";
    canbut.style.height="20px";
    canbut.style.width="20px";
    cont.appendChild(NewInput);
    cont.appendChild(conbut);
    cont.appendChild(canbut);
}
function changeDemoBotton(inputID,ChangeID,DataName){
    var cont = document.getElementById(inputID);//这是div
    var but = document.getElementById(ChangeID);
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
    NewInput.setAttribute("id",DataName+"Textinput");
    NewInput.setAttribute("type","text");
    NewInput.setAttribute("name","new");
    NewInput.style.border = '1px solid #000';
    NewInput.style.width = '30%';
    NewInput.style.height='20px';
    conbut.setAttribute("type","image");
    // var confirmName = fildname+"Confirm";
    conbut.setAttribute("id",DataName+"Confirm");
    // conbut.setAttribute("id",confirmName);
    conbut.setAttribute("src","../images/confirm.png")
    conbut.style.marginLeft="3%";
    conbut.style.height="20px";
    conbut.style.width="20px";
    var Textinput = DataName+'Textinput';
    var DATA = DataName+'Data';
    var Type = DataName.toLowerCase()+'Pop';
    console.log(Textinput);
    console.log(DATA);
    conbut.setAttribute("onclick","ChangeDemoData(document.getElementById('"+Textinput+"'),'"+DATA+"','"+Type+"')");
    canbut.setAttribute("type","image");
    canbut.setAttribute("id",DataName+"Cancle");
    canbut.setAttribute("src","../images/cancle.png")
    var Textinput = DataName+'Textinput';
    var Confirm = DataName+'Confirm';
    var Cancle = DataName+'Cancle';
    var Input = DataName+'Input';
    var Change = DataName+'Change';
    console.log("test1");

    canbut.setAttribute("onclick","resore('"+Textinput+"','"+Confirm+"','"+Cancle+"','"+Input+"','"+Change+"')");
    // console.log(nameInput)
    // canbut.onclick(e=>{
    //     console.log("testqwe");
    // })
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


