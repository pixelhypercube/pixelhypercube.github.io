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

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// check if platform is iOS
function isIOS() {
    return /iPhone|iPad|iPod|MacIntel/.test(navigator.userAgent) && !window.MSStream;
}

function handleOrientation(event) {
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;
    engine.world.gravity.x = gamma/90;
    engine.world.gravity.y = beta/90;
    console.log(engine.world.gravity);
}

function handleMotion(event) {
    let ax = event.acceleration.x || 0;
    let ay = event.acceleration.y || 0;
    for (let circle of circles) {
        Body.applyForce(circle.body,circle.body.position,{
            x: ax * 0.01,
            y: -ay * 0.01
        });
    }
}

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

    boundaries.push(new Boundary(-40, height / 2, 100, height));
    boundaries.push(new Boundary(width+40, height / 2, 100, height));
    boundaries.push(new Boundary(width/2, -40, width, 100));
    boundaries.push(new Boundary(width/2, height+40, width, 100));

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

    const requestMotionPermissionsBtn = document.getElementById("enable-motion");
    if (isMobileDevice()) {
        if (isIOS()) {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                DeviceMotionEvent.requestPermission()
                .then((res)=>{
                    if (res==='granted') {
                        window.addEventListener('devicemotion',handleMotion);
                        window.addEventListener('deviceorientation',handleOrientation);
                        requestMotionPermissionsBtn.style.display = "none";
                    }
                })
                .catch(console.error);
            } else {
                // non-iOS or older versions
                window.addEventListener("devicemotion",handleMotion);
                window.addEventListener("deviceorientation",handleOrientation);
                requestMotionPermissionsBtn.style.display = "none";
            }
            // requestMotionPermissionsBtn.style.display = "block";
            // requestMotionPermissionsBtn.addEventListener("click",function() {
                
            // });
        } else {
            window.addEventListener("devicemotion",handleMotion);
            window.addEventListener("deviceorientation",handleOrientation);
            requestMotionPermissionsBtn.style.display = "none";
        }
    } else {
        requestMotionPermissionsBtn.style.display = "none";
    }
}

async function genCircles() {
    let count = 1;
    for (let i = 0;i<5;i++) {
        for (let j = 0;j<5;j++,count++) {
            // circles.push(new Circle(j*56+200,i*56+50,28,true,count));
            circles.push(new Circle(j*80+100,50,40,true,'hsl('+count*10+',100%,80%)',count));
            await delay(100);
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
    
    frameRate(60);

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

    // TEXT DEBUG

    // push();
    // fill("white");
    // textSize(35);
    // textStyle(BOLD);
    // textAlign(CENTER);
    // text(`(${engine.world.gravity.x},${engine.world.gravity.y})`,width/2,100);
    // pop();

    // TEXT DEBUG
}

function mousePressed() {
    if (!factWindowVisible) {
        for (let circle of circles) {
            if (circle.mouseIntersect()) {
                console.log(circle,mouseX,mouseY);
                $("#fact_overlay").css({"display":"flex"});

                if (lang=="jp") {
                    $("#fact_name").text(circle.factList[circle.circleValue-1]["translations_title"]["jp"]);
                    $("#fact_desc").text(circle.factList[circle.circleValue-1]["translations_desc"]["jp"]);
                }
                else if (lang=="zh") {
                    $("#fact_name").text(circle.factList[circle.circleValue-1]["translations_title"]["zh"]);
                    $("#fact_desc").text(circle.factList[circle.circleValue-1]["translations_desc"]["zh"]);
                }
                else {
                    $("#fact_name").text(circle.factList[circle.circleValue-1]["title"]);
                    $("#fact_desc").text(circle.factList[circle.circleValue-1]["description"]);
                }

                $("#fact_overlay").animate({"opacity":1},250);
                factWindowVisible=true;
            }
        }
    }
}

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


$(document).ready(function(){
    $("#fact_overlay,#fact_back_btn").click(function(){
        $("#fact_overlay").animate({"opacity":0},250,function(){
            $("#fact_overlay").css({"display":"none"});
            factWindowVisible=false;
        });
    });
})