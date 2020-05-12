var DataSelector = document.getElementById("DataSelect");
var index=DataSelector.selectedIndex;
var gv=DataSelector[index].text;
console.log(gv);

$(function(){
    nav();
});

var count = true;
function nav(){
    $(".header-nav>ul>li").each(function(index){
        $(this).click(function(){
            $(".header-nav ul li").removeClass("header-active");
            $(this).addClass("header-active");
            if(index<=3){
                $(".system-fc").hide()
            }
        })
    });
    $(".search").hover(function(){
        $(this).find("div").stop().slideDown()
    },function(){
        $(this).find("div").stop().slideUp()
    });
    $(".admin").hover(function(){
        $(this).find("div").stop().slideDown()
    },function(){
        $(this).find("div").stop().slideUp()
    })
}

function leftBtn(){
    if(count){
        $(".content-right").css("flex","0");
        count = false;
    }else{
        $(".content-right").css("flex","0 0 25%");
        count = true;
    }
}

function Right(){
    $(".content-right").css("flex","0 0 25%");
    count = true;
}
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    console.log("tab shown...");
});

// read hash from page load and change tab
var hash = document.location.hash;
var prefix = "tab_";
if (hash) {
    $('.nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show');
}
