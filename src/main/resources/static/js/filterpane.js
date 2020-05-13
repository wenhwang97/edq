let filter = document.getElementById("map-filter-button")
let errs = document.getElementById("errors-list-button")
let logs = document.getElementById("logs-button")

let filterpane = document.getElementById("filter-page")
let filterclosebtn = document.getElementById("close-filter-button")

filterclosebtn.onclick = function(event) {
    filterpane.style.display = "none"
}

filter.onclick = function (event) {
    filterpane.style.display = "block"
}
