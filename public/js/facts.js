var Engine = Matter.Engine,
World = Matter.World,
Mouse = Matter.Mouse,
Bodies = Matter.Bodies,
Body = Matter.Body,
Render = Matter.Render,
Runner = Matter.Runner;

let engine;
let world;
let canvas;
let render;
let circles = [];
let boundaries = [];
let rects = [];
let polygons = [];
let collector;
let mConstraint;
let mouse;
let pusher;
let showPutCirclesHelp = true;
let gainedCircle = true;

let circleImg;
let silverCircleImg;
let diamondCircleImg;
let circleShowerCircleImg;

// Fact window visibility

let factWindowVisible = false;


var settings = {
    canvasWidth:600,
    canvasHeight:600
}
var {canvasWidth,canvasHeight} = settings;

function setup() {
    canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent("#canvas");
    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = 0.5;
    let mouse = Matter.Mouse.create(canvas.elt);
    mouse.pixelRatio = pixelDensity();
    let options = {
        mouse,
        constraint:{
            stiffness:0.2,
            render: {
                visible:false
            }
        }
    }
    // mConstraint = Matter.MouseConstraint.create(engine,options);
    // World.add(world,mConstraint);
    // mConstraint.collisionFilter.mask = null;

    boundaries.push(new Boundary(-50, height / 2, 100, height));
    boundaries.push(new Boundary(width+50, height / 2, 100, height));
    boundaries.push(new Boundary(width/2, -50, width, 100));
    boundaries.push(new Boundary(width/2, height+50, width, 100));

    // rects.push(new Rect(0, height / 2, 250, height,false,"black"));
    // rects.push(new Rect(width, height / 2, 250,height,false,"black"));

    // polygons.push(new Triangle(150,50,30,0.2,"color"));

    pusher = new Rect(width/2,-80,300,150,true,"rgb(200,50,30)");
    // render = Render.create({
    //     element:document.body,
    //     engine:engine,
    //     options:{
    //         width:800,
    //         height:600
    //     }
    // });
    // Render.run(render);
    var runner = Runner.create();
    Runner.run(runner,engine);
    genCircles();
    // collector = new Rect(width/2,700,350,100,false,"rgb(30,175,70)");

    // circleImg = loadImage("./circle.png");
    // silverCircleImg = loadImage("./silverCircle.png");
    // diamondCircleImg = loadImage("./diamondCircle.png");
    // circleShowerCircleImg = loadImage("./circleShowerCircle.png")
    $("canvas").removeAttr("style");
}

async function genCircles() {
    let count = 1;
    for (let i = 0;i<7;i++) {
        for (let j = 0;j<5;j++,count++) {
            // circles.push(new Circle(j*56+200,i*56+50,28,true,count));
            circles.push(new Circle(j*56+200,50,28,true,count));
            await delay(50);
        }
    }
}

function delay(amount) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },amount);
    })
}


function draw() {
    clear();
    noStroke();
    background("rgba(0,0,0,0)");
    Engine.update(engine);
    pusher.show();
    // pusher.oscillate();
    

    Body.setPosition(pusher.body,{x:pusher.x,y:pusher.y});
    for (let rect of rects) {
        // rect.show();
        for (let circle of circles) {
            if (circle.intersect(rect)) {
                World.remove(world,circle.body);
                circles.splice(circles.indexOf(circle),1);
            }
        }
    }
    // collector.show();
    push();
    fill("black");
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER);
    text("Drop circles here!",width/2,900);
    pop();
    for (let circle of circles) {
        circle.show();
        // if (circle.intersect(collector)) {
        //     // console.log(circle);
        //     World.remove(world,circle.body);
        //     if (circle.type==3) {
        //         playerValues.circles+=circle.circleValue;
        //         circleMethods.circleShower();
        //     } else {
        //         playerValues.circles+=circle.circleValue;
        //     }
        //     circles.splice(circles.indexOf(circle),1);
        //     gainedCircle = true;
        // }
        if (pusher.y<-80 && circle.collidable == false) {
            circle.setCollidable(true);
        }
    }
    for (let polygon of polygons) {
        polygon.show();
    }
    for (let boundary of boundaries) {
        boundary.show();
    }

    // if (showPutCirclesHelp) {
    //     renderInfo();
    // }
    // showNoCircles();
}

function mousePressed() {
    if (!factWindowVisible) {
        for (let circle of circles) {
            if (circle.mouseIntersect()) {
                console.log(circle,mouseX,mouseY);
                $("#fact_overlay").css({"display":"flex"});
                $("#fact_name").text(circle.factList[circle.circleValue-1]["title"]);
                $("#fact_desc").text(circle.factList[circle.circleValue-1]["description"]);
                $("#fact_overlay").animate({"opacity":1},250);
                factWindowVisible=true;
            }
        }
    }
}

// if (window.DeviceOrientationEvent) {
//     DeviceMotionEvent.requestPermission()
//     .then((res)=>{
//         if (res=='granted') {
//             window.addEventListener("deviceorientation", function () {
//                 // tilt([event.beta, event.gamma]);
//                 engine.world.gravity.x = event.gamma/100;
//                 engine.world.gravity.y = event.beta/100;
//             }, true);
//         }
//     });
// } else if (window.DeviceMotionEvent) {
//     DeviceMotionEvent.requestPermission()
//     .then((res)=>{
//         window.addEventListener('devicemotion', function () {
//             for (let circle of circles) {
//                 Body.setVelocity(circle.body,{x:event.acceleration.x,y:event.acceleration.y});
//             }
//             // tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
//         }, true);
//     })
// }

function mouseMoved() {
    if (!factWindowVisible) {
        for (let circle of circles) {
            if (circle.mouseIntersect()) {
                circle.setHighlighted(true);
                Body.setVelocity(circle.body,{x:(winMouseX-pwinMouseX)/5,y:(winMouseY-pwinMouseY)/5});
            } else {
                circle.setHighlighted(false);
            }
        }
    }
}

function getAcceleration() {
    DeviceMotionEvent.requestPermission()
    .then((res)=>{
        if (res=='granted') {
            window.addEventListener("deviceorientation", function () {
                // tilt([event.beta, event.gamma]);
                engine.world.gravity.x = event.gamma/100;
                engine.world.gravity.y = event.beta/100;
            }, true);
        }
    });
}

$(document).ready(function(){
    $("#fact_overlay,#fact_back_btn").click(function(){
        $("#fact_overlay").animate({"opacity":0},250,function(){
            $("#fact_overlay").css({"display":"none"});
            factWindowVisible=false;
        });
    });
    getAcceleration();
})