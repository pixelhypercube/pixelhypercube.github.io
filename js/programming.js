var url = `http://localhost:3000`;
const DEBUG = false;
if (!DEBUG) {
    url = `https://phcwebsite.herokuapp.com`;
}

function getDevelopment(dev) {
    if (dev==0) {
        return "";
    } else if (dev==1) {
        return "(In development)";
    } else if (dev==2) {
        return "(Alpha)";
    } else if (dev==3) {
        return "(Beta)";
    }
}


function genCodingProjects() {
    $.get(`${url}/codingprojects`)
    .done((res)=>{
        $("#loadingOverlay").remove();
        for (let i in res) {
            var insertHTML = `
                <div class="card m-3">
                            <div class="card-header">
                                <h3>${res[i].title}</h3>
                            </div>
                            <div class="card-body">
                                <img style="width:250px;" class="coding-logo" src="${res[i].image_location}" alt="proj${res[i].image_location}" >
                                <hr>
                                <div class="container">
                                    <p>${getDevelopment(res[i].in_development)}</p>
                                    <p>${res[i].brief_description}</p>
                                    <a class="btn m-1" style="background-color: #185050;color:white;border-radius:0" class="sectionBtn" href="./codingProject.html?proj_id=${res[i].proj_id}">View Project</a>
                                    <a class="btn m-1" style="background-color: #183250;color:white;border-radius:0" class="sectionBtn" href="${res[i].link}">Go to project!</a>
                                </div>
                            </div>
                        </div>
            `;
            $("#coding_projects").append(insertHTML);
            $("div.card-body").each(function(i){
                $(this).css({"background":`rgb(130, ${185+Math.floor(Math.random()*5)}, ${240+Math.floor(Math.random()*20)})`})
            });
        }
    })
    .fail((err)=>{

    });
}
$(document).ready(function(){
    genCodingProjects();
});