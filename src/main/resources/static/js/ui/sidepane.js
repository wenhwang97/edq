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

// Floating window for editing data
$('#vote-data-dialog').on('show', function() {
    var id = $(this).data('id'),
        removeBtn = $(this).find('.danger');
});

$('.confirm-delete').on('click', function(e) {
    e.preventDefault();

    var id = $(this).data('id');
    $('#vote-data-dialog').data('id', id).modal('show');
});

$('#btnYes').click(function() {
    // handle deletion here
    var id = $('#vote-data-dialog').data('id');
    $('[data-id='+id+']').remove();
    $('#vote-data-dialog').modal('hide');
});

// Toggle for sidepane
var isNotToggled = true;

$(document).ready(function () {
    var trigger = $('.btn-sidepane-toggle'),
        isClosed = false;

    $('[data-toggle="offcanvas"]').unbind('click').on("click",function () {
        $('#wrapper').toggleClass('toggled');
        isNotToggled = !isNotToggled;
    });
});

