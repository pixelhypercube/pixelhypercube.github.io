var mainWidth = document.querySelector("main").clientWidth;
var mainHeight = document.querySelector("main").clientHeight;
console.log(mainWidth,mainHeight);
var ballColors = ["#67597A","#544E61","#6E8894","#85BAA1","#CEEDDB"];
var balls = [];
var pointerCircles = [];
function fillBalls(count) {
    for (let i = 0;i<count;i++) {
        balls.push(new Ball(random(0,mainWidth),random(0,mainHeight),random(-1,1),random(-1,1),random(10,30),ballColors[floor(random(0,ballColors.length))]));
    }
}

function fillPointerCircles(count) {
    for (let i = 0;i<count;i++) {
        pointerCircles.push(new Ball(100,100,0,0,10/i,"black"));
    }
}

var canvas2 = function(sketch) {
    sketch.setup = function() {
        var mainCanvas = sketch.createCanvas(mainWidth,mainHeight);
        mainCanvas.parent("mainCanvas");
        background("rgb(206, 181, 100)");
        fillBalls(10);
    }
    
    sketch.draw = function() {
        clear();
        //background("rgb(206, 181, 100)");
        for (let i in balls) {
            balls[i].show();
            balls[i].update();
            if (mouseIsPressed) {
                balls[i].repel(mouseX,mouseY);
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
    }
}
new p5(canvas2);