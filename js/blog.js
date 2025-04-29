$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('index');

    const blogObj = blogList[value-1];
    $("#title").text(blogObj["title"]);
    $("#publishDate").text(blogObj["publishDate"]);
    $("#duration").text(blogObj["duration"] + " min read");
    $("#blogBody").append(blogObj["htmlContent"]);

    $("img#avatar_hi").on("mouseover",function(){
        $(this).attr("src","./img/avatar_home.png");
        $(this).attr("style","width:112px;transform:translate(-24px,0px);");
    });
    $("img#avatar_hi").on("mouseout",function(){
        $(this).attr("src","./img/avatar_default.png");
        $(this).attr("style","width:64px");
    });
})