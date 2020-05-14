var clickedState;
errs.onclick = async function (event) {
    console.log("click on error fetch");
    let response = await fetch("http://localhost:8080/state/" + clickedState + "/data/errors");
    let errorJson = await response.json();
    console.log(errorJson);
}
