var url = `http://localhost:3000`;
const DEBUG = false;
if (!DEBUG) {
    url = `https://phcwebsite.herokuapp.com`;
}

function getDevelopment(dev) {
    if (dev == 0) {
        return "";
    } else if (dev == 1) {
        return "(In development)";
    } else if (dev == 2) {
        return "(Alpha)";
    } else if (dev == 3) {
        return "(Beta)";
    }
}

function isMiniProj(state) {
    console.log(state)
    if (state == 1) {
        return "(Mini Project)";
    } else {
        return "";
    }
}

$(document).ready(function(event) {
    updateScroll();
})

$(window).scroll(function(event) {
    updateScroll(); 
});
// window.addEventListener("scroll",function(){
//     updateScroll();
// })

async function elementAppear(elem,delayAmount) {
    $(elem).each(function(i,e){
        $(this).css({"opacity":0});
    });
    $(elem).each(function(i,e){
        // await delay(delayAmount);
        $(this).animate({"opacity":1},delayAmount);
    });
}

function updateScroll() {
    // var elemStrings = ["div#hobbies","div#ageBubble"];
    var elemStrings = $("#coding_projects .card");
    for (let i = 0;i<elemStrings.length;i++) {
        var position = $(elemStrings[i]).position();
        // console.log($(elemStrings[i]).height());
        // console.log(window.scrollY,position.top-$(elemStrings[i]).height());
        if (window.scrollY>=position.top-$(elemStrings[i]).height()) {
            // console.log(elemStrings[i]);
            if ($(elemStrings[i]).css("opacity")==0) {
                elementAppear(elemStrings[i],1000);
                // if (elemStrings[i]=="div#ageBubble") {
                //     $("#year").text(calcAge(2002,9,30));
                //     $("#date").text(getDate());
                //     increasingNumber("span#year");
                // }
            }
        }
    }
}


function genCodingProjects() {
    $("#loadingOverlay").remove();
    for (let i in projInfo) {
        var insertHTML = `
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