var url = `http://localhost:3000`;
const DEBUG = false;
if (!DEBUG) {
    url = `https://phcwebsite.herokuapp.com`;
}

var lang = new URLSearchParams(document.location.search).get("lang");

function getDevelopment(dev) {
    if (!lang) {
        if (dev == 0) return ""; 
        else if (dev == 1) return "(In development)"; 
        else if (dev == 2) return "(Alpha)";
        else if (dev == 3) return "(Beta)";
    } else if (lang=="jp") {
        if (dev == 0) return ""; 
        else if (dev == 1) return "(開発中)"; 
        else if (dev == 2) return "(アルファ)";
        else if (dev == 3) return "(ベータ)";
    } else if (lang=="zh") {
        if (dev == 0) return ""; 
        else if (dev == 1) return "(正在开发中)"; 
        else if (dev == 2) return "(阿尔法)";
        else if (dev == 3) return "(贝塔)";
    }
}

function isMiniProj(state) {
    console.log(state)
    if (!lang) {
        if (state == 1) return "(Mini Project)";
        else return "";
    } else if (lang=="jp") {
        if (state == 1) return "(ミニプロジェクト)";
        else return "";
    } else if (lang=="zh") {
        if (state == 1) return "(小型项目)";
        else return "";
    }
}

window.addEventListener("scroll",function(){
    updateScroll();
});

window.addEventListener("load",function(){
    updateScroll();
});

async function elementAppear(elem,delayAmount) {
    $(elem).each(function(i,e){
        $(this).css({"opacity":0});
    });
    $(elem).each(function(i,e){
        $(this).animate({"opacity":1},delayAmount);
    });
}

function updateScroll() {
    var elemStrings = $("#coding_projects .card");
    for (let i = 0;i<elemStrings.length;i++) {
        var position = $(elemStrings[i]).position();
        if (window.scrollY>=position.top-$(elemStrings[i]).height()) {
            if ($(elemStrings[i]).css("opacity")==0) {
                elementAppear(elemStrings[i],1000);
            }
        }
    }
}


function genCodingProjects() {
    $("#loadingOverlay").remove();
    for (let i in projInfo) {
        var insertHTML;

        if (!lang) {
            insertHTML = `
                <div class="card m-3">
                            <div class="card-header">
                                <h6>${isMiniProj(projInfo[i].is_mini_project)}</h6>
                                <h3>${projInfo[i].title} <span style="font-size:22px;">${getDevelopment(projInfo[i].in_development)}</span></h3>
                            </div>
                            <div class="card-body">
                                <img style="width:100%;" class="coding-logo" src="${projInfo[i].image_location}" alt="proj${projInfo[i].image_location}" >
                                <hr>
                                <div class="container">
                                    <p>${projInfo[i].brief_description}</p>
                                    <a class="side-proj-btn btn m-1" style="color:white;border-radius:0" class="sectionBtn" href="${projInfo[i].link}">Go to project!</a>
                                </div>
                            </div>
                        </div>
            `;
        } else if (lang=="jp") {
            insertHTML = `
                <div class="card m-3">
                            <div class="card-header">
                                <h6>${isMiniProj(projInfo[i].is_mini_project)}</h6>
                                <h3>${projInfo[i].title_jp} <span style="font-size:22px;">${getDevelopment(projInfo[i].in_development)}</span></h3>
                            </div>
                            <div class="card-body">
                                <img style="width:100%;" class="coding-logo" src="${projInfo[i].image_location}" alt="proj${projInfo[i].image_location}" >
                                <hr>
                                <div class="container">
                                    <p>${projInfo[i].brief_description_jp}</p>
                                    <a class="side-proj-btn btn m-1" style="color:white;border-radius:0" class="sectionBtn" href="${projInfo[i].link}">プロジェクトを見る！</a>
                                </div>
                            </div>
                        </div>
            `;
        } else if (lang=="zh") {
            insertHTML = `
                <div class="card m-3">
                            <div class="card-header">
                                <h6>${isMiniProj(projInfo[i].is_mini_project)}</h6>
                                <h3>${projInfo[i].title_zh} <span style="font-size:22px;">${getDevelopment(projInfo[i].in_development)}</span></h3>
                            </div>
                            <div class="card-body">
                                <img style="width:100%;" class="coding-logo" src="${projInfo[i].image_location}" alt="proj${projInfo[i].image_location}" >
                                <hr>
                                <div class="container">
                                    <p>${projInfo[i].brief_description_zh}</p>
                                    <a class="side-proj-btn btn m-1" style="color:white;border-radius:0" class="sectionBtn" href="${projInfo[i].link}">查看项目!</a>
                                </div>
                            </div>
                        </div>
            `;
        }

        $("#coding_projects").append(insertHTML);
        $("div.card-body").each(function (i) {
            $(this).css({
                "background": `#555555`
            })
        });
    }
    updateScroll();
}
$(document).ready(function () {
    genCodingProjects();
});