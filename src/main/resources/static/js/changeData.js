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
    var dmVoting=document.getElementById("dmChanges").textContent;
    var rpVoting=document.getElementById("rpChanges").textContent;
    var lbVoting=document.getElementById("lbChanges").textContent;
    var grVoting=document.getElementById("grChanges").textContent;

    var origionrp = document.getElementById("RepublicanVoting").textContent;
    var origiongr = document.getElementById("GreenVoting").textContent;
    var origionlb = document.getElementById("LibertarianVoting").textContent;
    var origiondm = document.getElementById("DemocraticVoting").textContent;
    let RData;
    let DData;
    let LData;
    let GData;
    if(dmVoting==""){
        console.log("it is null");
        DData= parseInt(origiondm);
    }else{
        DData=parseInt(dmVoting);
    }
    if(rpVoting==""){
        RData=parseInt(origionrp);
    }else{
        RData=parseInt(rpVoting);
    }
    if(lbVoting==""){
        LData= parseInt(origionlb);
    }else{
        LData= parseInt(lbVoting);
    }
    if(grVoting==""){
        GData = parseInt(origiongr);
    }else{
        GData = grVoting;
    }
    // var votingType=

})
