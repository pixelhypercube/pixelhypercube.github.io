$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('index');

    const blogObj = blogList[value-1];
    $("#title").text(blogObj["title"]);
    $("#publishDate").text(blogObj["publishDate"]);
    $("#duration").text(blogObj["duration"]);
    $("#blogBody").append(blogObj["htmlContent"]);
})