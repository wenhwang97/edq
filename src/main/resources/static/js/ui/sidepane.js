$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    console.log("tab shown...");
});

// read hash from page load and change tab
var hash = document.location.hash;
var prefix = "tab_";
if (hash) {
    $('.nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show');
}
