var url = `http://localhost:3000`;
const DEBUG = false;
if (!DEBUG) {
    url = `https://phcwebsite.herokuapp.com`;
}
var projInfo = [{
    "proj_id": 1,
    "title": "Minecraft Fill Generator!",
    "brief_description": "Generate a 3d model of what you have drawn!",
    "image_location": "./img/coding/coding_proj1.png",
    "link": "/Minecraft-Fill-Generator",
    "in_development": 3,
    "detailed_description": null,
    "is_mini_project": 1
}, {
    "proj_id": 2,
    "title": "Minecraft Like Replica!",
    "brief_description": "Voxel simulation with player movement!",
    "image_location": "./img/coding/coding_proj2.png",
    "link": "/Minecraft-Like-Replica",
    "in_development": 2,
    "detailed_description": "My first time attempting player controls and rendering Minecraft-like blocks in Three.js!",
    "is_mini_project": 1
}, {
    "proj_id": 3,
    "title": "Video To Text!",
    "brief_description": "Play a video and see the magic from the text below!",
    "image_location": "./img/coding/coding_proj3.png",
    "link": "/Video-To-Text",
    "in_development": 0,
    "detailed_description": "",
    "is_mini_project": 1
}, {
    "proj_id": 4,
    "title": "2D Spleef!",
    "brief_description": "2D version of Spleef!",
    "image_location": "./img/coding/coding_proj4.png",
    "link": "https://github.com/pixelhypercube/2d-Spleef",
    "in_development": 0,
    "detailed_description": "A two-dimensional spleef game made using Java!",
    "is_mini_project": 1
}, {
    "proj_id": 5,
    "title": "Escape The Bombfield!",
    "brief_description": "Run to the finish cell by escaping the bombfield!",
    "image_location": "./img/coding/coding_proj5.png",
    "link": "/Escape-The-Bombfield",
    "in_development": 2,
    "detailed_description": "Use the WASD or arrow keys to let the person escape from the minefield!",
    "is_mini_project": 1
}, {
    "proj_id": 6,
    "title": "Visual Matrix Operators!",
    "brief_description": "Helps to visualize matrix operations like addition, subtraction and multiplication!",
    "image_location": "./img/coding/coding_proj6.png",
    "link": "/Visual-Matrix-Operations",
    "in_development": 2,
    "detailed_description": null,
    "is_mini_project": 1
}, {
    "proj_id": 7,
    "title": "Console Spaceship Battle!",
    "brief_description": "A spaceship battle game in a console! Made using Python",
    "image_location": "./img/coding/coding_proj7.png",
    "link": "https://github.com/pixelhypercube/Console-Spaceship-Battle",
    "in_development": 2,
    "detailed_description": "Use the WASD keys to move and the spacebar to shoot! Attack and destroy as many spaceships as you can!",
    "is_mini_project": 1
}, {
    "proj_id": 8,
    "title": "PHC Minigolf",
    "brief_description": "A minigolf game made using python (pygame!)",
    "image_location": "./img/coding/coding_proj8.png",
    "link": "https://github.com/pixelhypercube/PHC-Minigolf",
    "in_development": 3,
    "detailed_description": "",
    "is_mini_project": 0
}, {
    "proj_id": 9,
    "title": "Pi Approximation",
    "brief_description": "Simulates one of the methods of estimating the mathematical constant pi (π).",
    "image_location": "./img/coding/coding_proj9.png",
    "link": "/Pi-Approximation",
    "in_development": 0,
    "detailed_description": null,
    "is_mini_project": 0
}, {
    "proj_id": 10,
    "title": "Coin Dozer Replica!",
    "brief_description": "A mini 2D online Coin Dozer made using matter.js and p5.js!",
    "image_location": "./img/coding/coding_proj10.png",
    "link": "/Coin-Dozer-Replica",
    "in_development": 3,
    "detailed_description": null,
    "is_mini_project": 1
}];

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


function genCodingProjects() {
    $("#loadingOverlay").remove();
    for (let i in projInfo) {
        var insertHTML = `
                <div class="card m-3">
                            <div class="card-header">
                                <h6>${isMiniProj(projInfo[i].is_mini_project)}</h6>
                                <h3>${projInfo[i].title}</h3>
                            </div>
                            <div class="card-body">
                                <img style="width:100%;" class="coding-logo" src="${projInfo[i].image_location}" alt="proj${projInfo[i].image_location}" >
                                <hr>
                                <div class="container">
                                    <p>${getDevelopment(projInfo[i].in_development)}</p>
                                    <p>${projInfo[i].brief_description}</p>
                                    <a class="btn m-1" style="background-color: #183250;color:white;border-radius:0" class="sectionBtn" href="${projInfo[i].link}">Go to project!</a>
                                </div>
                            </div>
                        </div>
            `;
        $("#coding_projects").append(insertHTML);
        $("div.card-body").each(function (i) {
            $(this).css({
                "background": `rgb(130, ${185+Math.floor(Math.random()*5)}, ${240+Math.floor(Math.random()*20)})`
            })
        });
    }
}
$(document).ready(function () {
    genCodingProjects();
});