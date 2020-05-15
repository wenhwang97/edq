// You decide delete or not - below

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    console.log("tab shown...");
});

// read hash from page load and change tab
var hash = document.location.hash;
var prefix = "tab_";
if (hash) {
    $('.nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show');
}

// You decide delete or not - above
var isNotToggled = true;


$(document).ready(function () {
    var trigger = $('.hamburger'),
        isClosed = false;

    $('[data-toggle="offcanvas"]').unbind('click').on("click",function () {
        $('#wrapper').toggleClass('toggled');
        isNotToggled = !isNotToggled;
    });
});
