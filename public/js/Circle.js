class Circle {
    constructor(x,y,r,collidable,circleValue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.collidable = collidable;
        // this.type = type;
        this.circleValue = circleValue;
        this.highlighted = false;
        this.factList = [
            {
                "title": "I think I'm more of a cat person 🐱 because I like the sound of cats meowing! However, I'm allergic to cat fur 😥",
                "description":"",
                "icon":"🐱"
            },
            {
                "title": "My eyes turn brown under sunlight, but are completely dark otherwise",
                "description":"",
                "icon":"👁"
            },
            {
                "title": "I'm a cishet (cisgender & straight) guy",
                "description":"",
                "icon":""
            },
            {
                "title": "My Chinese name is 张凯杰",
                "description":"",
                "icon":"中"
            },
            {
                "title": "I'm 176cm (5' 9.3\") tall",
                "description":"",
                "icon":""
            },
            {
                "title": "I'm a very clumsy person",
                "description":"",
                "icon":""
            },
            {
                "title": "Maths is one of my favorite subjects in school",
                "description":"",
                "icon":"🔢"
            },
            {
                "title": "I'm addicted to Nintendo music (I listen to their soundtracks everyday!)",
                "description":"",
                "icon":""
            },
            {
                "title": "Minecraft was my all time favorite game since 2012! Coming to 9 years since I started playing!",
                "description":"",
                "icon":""
            },
            {
                "title": "I'm geeky in a way that I read Wikia articles about Nintendo games",
                "description":"",
                "icon":"🤓"
            },
            {
                "title": "I've ran overseas in the UK, Vietnam and New Zealand!",
                "description":"",
                "icon":"🏃‍♂️"
            },
            {
                "title": "The constant π (pi) is one of my favorite constants!",
                "description":"",
                "icon":"π"
            },
            {
                "title": "I dislike the sound of styrofoam",
                "description":"",
                "icon":""
            },
            {
                "title": "I have phobias related to dealing with rubber materials, for instance I'm afraid of unwrapping rubber bands and tieing balloons",
                "description":"",
                "icon":"🎈"
            },
            {
                "title": "I want to add 'Kendric' to my name in the future!",
                "description":"",
                "icon":""
            },
            {
                "title": "Blue is my favorite color and green is my second favorite",
                "description":"",
                "icon":"🔵"
            },
            {
                "title": "I don't drink coffee - because I can't sleep at night!",
                "description":"",
                "icon":"☕"
            },
            {
                "title": "I go to bed at around 10-11pm and wake up at around 7-8 am (7-8 hrs of sleep)",
                "description":"",
                "icon":"🛌"
            },
            {
                "title": "I used to dislike reading stuff because I couldn't picture",
                "description":"",
                "icon":"📖"
            },
            {
                "title": "I used to be a picky eater when I was young",
                "description":"",
                "icon":"🍴"
            },
            {
                "title": "I'm a 'carnivore' - I eat quite a lot of meat!",
                "description":"",
                "icon":"🥩"
            },
            {
                "title": "I like cooking fried rice during my free time!",
                "description":"",
                "icon":"🍚"
            },
            {
                "title": "I'm generally not a sporty person",
                "description":"",
                "icon":"🤾‍♂️"
            },
            {
                "title": "I don't drink gassy drinks like Coke often",
                "description":"",
                "icon":"🥤"
            },
            {
                "title": "Apart from learning Japanese, I also attempted learning and experimenting other languages like Korean and other European languages",
                "description":"",
                "icon":"🌐"
            },
            {
                "title": "New Zealand is one of my favorite countries to travel to!",
                "description":"",
                "icon":"🇳🇿"
            },
            {
                "title": "I don't consume alcohol at the moment",
                "description":"",
                "icon":"🍺"
            },
            {
                "title": "Making videos is also one of my hobbies!",
                "description":"",
                "icon":"📽"
            },
            {
                "title": "I also like to play the electric bass sometimes!",
                "description":"",
                "icon":"🎸"
            },
            {
                "title": "My ideal outdoor weather is temperate!",
                "description":"",
                "icon":"🌡️"
            },
            {
                "title": "I used to be addicted to speedcubing!",
                "description":"",
                "icon":""
            },
            {
                "title": "Japanese and Western cuisines are my two favorites!",
                "description":"",
                "icon":"🍔"
            },
            {
                "title": "I don't believe in ghosts",
                "description":"",
                "icon":"👻"
            },
            {
                "title": "Dishonesty is one of my biggest pet peeves",
                "description":"",
                "icon":"🤥"
            },
            {
                "title": "I've never smoked a single cigarette in my life!",
                "description":"",
                "icon":"🚭"
            }
        ];
        let options = {
            friction:0.05,
            frictionAir:0.01,
            restitution:0.3
        }
        if (this.collidable) {
            this.body = Bodies.circle(x,y,r,options);
            World.add(world,this.body);
        }
    }
    show() {
        if (this.collidable) {
            let pos = this.body.position;
            let angle = this.body.angle;
            push();
            translate(pos.x,pos.y);
            rotate(angle);
            // rectMode(CENTER);
            imageMode(CENTER);
            // fill(255,200,0);
            if (this.highlighted) {
                strokeWeight(4);
                stroke("#994422")
            }
            ellipse(0,0,this.r*2);
            
            // if (this.type==0) {
            //     image(circleImg,0,0,this.r*2,this.r*2);
            // } else if (this.type==1) {
            //     image(silverCircleImg,0,0,this.r*2,this.r*2);
            //     this.circleValue = 2;
            // } else if (this.type==2) {
            //     image(diamondCircleImg,0,0,this.r*2,this.r*2);
            //     this.circleValue = 10;
            // } else if (this.type==3) {
            //     image(circleShowerCircleImg,0,0,this.r*2,this.r*2);
            // }
            pop();
            push();
            translate(pos.x,pos.y);
            rotate(angle);
            textSize(32);
            textAlign(CENTER,CENTER);
            text(this.factList[this.circleValue-1]["icon"],0,0);
            pop();
        } else {
            push();
            translate(this.x,this.y);
            // rotate(angle);
            // rectMode(CENTER);
            imageMode(CENTER);
            fill(255,200,0);
            // if (this.type==0) {
            //     image(circleImg,0,0,this.r*2,this.r*2);
            // } else if (this.type==1) {
            //     image(silverCircleImg,0,0,this.r*2,this.r*2);
            //     this.circleValue = 2;
            // } else if (this.type==2) {
            //     image(diamondCircleImg,0,0,this.r*2,this.r*2);
            //     this.circleValue = 10;
            // } else if (this.type==3) {
            //     image(circleShowerCircleImg,0,0,this.r*2,this.r*2);
            //     this.circleValue = 1;
            // }
            // ellipse(0,0,this.r*2);
            pop();
        }
    }
    intersect(other) {
        let pos;
        if (this.collidable) {
            pos = this.body.position;
        } else {
            pos = this;
        }
        if (pos.x>other.x-other.w/2 && 
            pos.x<other.x+other.w/2 && 
            pos.y>other.y-other.h/2 && 
            pos.y<other.y+other.h/2) {
            return true;
        } else {
            return false;
        }
    }
    mouseIntersect() {
        // let pos = this.body.position;
        let pos;
        // if (this.collidable) {
        //     pos = this.body.position;
        // } else {
        //     pos = this;
        // }
        var d = dist(mouseX,mouseY,this.body.position.x,this.body.position.y);
        if (d<this.r) {
            return true;
        } else {
            return false;
        }
    }
    setCollidable(collidable) {
        if (this.collidable==false) {
            this.body = Bodies.circle(this.x,this.y,this.r,this.options);
            World.add(world,this.body);
        }
        this.collidable = collidable;
    }
    setHighlighted(highlighted) {
        this.highlighted = highlighted;
    }
}