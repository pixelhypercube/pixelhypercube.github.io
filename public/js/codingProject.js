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
}];

var params = new URLSearchParams(window.location.search);

function getDevelopment(dev) {
    if (dev == 0) {
        return "";
    } else if (dev == 1) {
        return "(In development)";
    } else if (dev == 2) {
        return "(Alpha Phase)";
    } else if (dev == 3) {
        return "(Beta Phase)";
    }
}

function retrieveProj() {
    var projId = parseInt(params.get("proj_id")) - 1;
    console.log(projId)
    $("#loadingOverlay").remove();
    $("#project").css({
        "display": "block"
    });
    $("#title").text(projInfo[projId].title);
    $("#in_development").text(getDevelopment(projInfo[projId].in_development));
    $("#brief_description").text(projInfo[projId].brief_description);
    $("#detailed_description").text(projInfo[projId].detailed_description);
    $("#link").attr("href", projInfo[projId].link);
    $("#image_location").attr("src", projInfo[projId].image_location);
}
$(document).ready(function () {
    retrieveProj();
});