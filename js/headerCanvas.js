var screenWidth = document.querySelector("header").clientWidth;
var screenHeight = document.querySelector("header").clientHeight;
console.log(screenWidth,screenHeight);
var ballColors = ["#67597A","#544E61","#6E8894","#85BAA1","#CEEDDB"];
var balls = [];
var pointerCircles = [];
function fillBalls(count) {
    for (let i = 0;i<count;i++) {
        balls.push(new Ball(random(0,screenWidth),random(0,screenHeight),random(-0.1,0.1),random(-0.1,0.1),random(10,30),ballColors[floor(random(0,ballColors.length))]));
    }
}
function fillPointerCircles(count) {
    for (let i = 0;i<count;i++) {
        pointerCircles.push(new Ball(100,100,0,0,20/i,"black"));
    }
}
let canvas;
$(document).ready(function(){
    $(window).resize(function(){
        console.log("Resize");
        screenWidth = document.querySelector("header").clientWidth;
        screenHeight = document.querySelector("header").clientHeight;
        canvas = resizeCanvas(screenWidth,screenHeight);
    });
});


function setup() {
    canvas = createCanvas(screenWidth,screenHeight);
    canvas.parent("canvas");
    background("rgb(206, 181, 100)");
    fillBalls(10);
    fillPointerCircles(5);
}

function draw() {
    clear();
    //background("rgb(206, 181, 100)");
    for (let i in balls) {
        balls[i].show();
        balls[i].update();
        if (mouseIsPressed) {
            balls[i].attract(mouseX,mouseY);
        }
        // var swooshVar = detectMouseVel();
        var vMouseX = (winMouseX-pwinMouseX)/50;
        var vMouseY = (winMouseY-pwinMouseY)/50;
        balls[i].swoosh(mouseX,mouseY,vMouseX,vMouseY);
        for (let j in balls) {
            if (i!=j && balls[i].intersect(balls[j])) {
                balls[i].collide(balls[j]);
            } 
        }
    }
    for (let i in pointerCircles) {
        var d = 0.01*dist(pointerCircles[i].x,pointerCircles[i].y,mouseX,mouseY);
        var angle = atan2(pointerCircles[i].y-mouseY,pointerCircles[i].x-mouseX);
        pointerCircles[i].show();
        pointerCircles[i].update();
        pointerCircles[i].x -= d*pointerCircles[i].r*cos(angle);
        pointerCircles[i].y -= d*pointerCircles[i].r*sin(angle);
    }
    // push();
    // fill("black");
    // circle(mouseX,mouseY,10);
    // pop();
}
function detectMouseVel() {
    var initX = mouseX;
    var initY = mouseY;
    // await delay(2);
    // console.log(initX,mouseX,initY,mouseY)
    // console.log(dist(initX,initY,mouseX,mouseY));
    // console.log([dist(initX,0,mouseX,0),dist(initY,0,mouseY,0)]);
    return [dist(initX,0,mouseX,0),dist(initY,0,mouseY,0)];
}
// setInterval(function(){
//     detectMouseVel();
// },10);
// function update() {

// }