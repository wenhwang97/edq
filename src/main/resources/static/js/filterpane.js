let sidepaneData = document.getElementById("sidepane-data")
let sidepaneErrLog = document.getElementById("sidepane-errlog")
let errTab = document.getElementById("err-tab")
let errContent = document.getElementById("tab3")
let logTab = document.getElementById("log-tab")
let logContent = document.getElementById("tab4")

let filter = document.getElementById("map-filter-button")
let errs = document.getElementById("errors-list-button")
let logs = document.getElementById("logs-button")

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

errs.onmouseup = function () {
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
    logs.style.opacity = "1"
    sidepaneData.style.display = "none"
    sidepaneErrLog.style.display = "block"
    errTab.classList.remove("active")
    errContent.classList.remove("active")
    logTab.classList.add("active")
    logContent.classList.add("active")
}
