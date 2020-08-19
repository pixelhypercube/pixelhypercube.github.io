var url = `http://localhost:3000`;
const DEBUG = false;
if (!DEBUG) {
    url = `https://phcwebsite.herokuapp.com`;
}

var params = new URLSearchParams(window.location.search);
function getDevelopment(dev) {
    if (dev==0) {
        return "";
    } else if (dev==1) {
        return "(In development)";
    } else if (dev==2) {
        return "(Alpha Phase)";
    } else if (dev==3) {
        return "(Beta Phase)";
    }
}

function retrieveProj() {
    $.get(`${url}/codingproject/${params.get("proj_id")}`)
    .done((res)=>{
        $("#title").text(res.title);
        $("#in_development").text(getDevelopment(res.in_development));
        $("#brief_description").text(res.brief_description);
        $("#detailed_description").text(res.detailed_description);
        $("#link").attr("href",res.link);
        $("#image_location").attr("src",res.image_location); 
    })
    .fail((err)=>{
        console.error(err);
    });
}
$(document).ready(function(){
    retrieveProj();
});