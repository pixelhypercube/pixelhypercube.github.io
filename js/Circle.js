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
                "title": "I think I'm more of a cat person 🐱!",
                "description":"I like the sound of cats meowing! However, I'm allergic to cat fur 😥",
                "icon":"🐱",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "My eyes turn brown under sunlight",
                "description":"However, they are completely dark otherwise",
                "icon":"👁",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm a cishet (cisgender & straight) guy",
                "description":"",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "My Chinese name is 张凯杰",
                "description":"Hanyu Pinyin: zhāng kǎi jié",
                "icon":"中",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm 176cm (5' 9.3\") tall",
                "description":"",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm a very clumsy person",
                "description":"I tend to trip over things sometimes and I even got some bruises before!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Maths is one of my favorite subjects in school",
                "description":"",
                "icon":"🔢",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm addicted to Nintendo music (I listen to their soundtracks everyday!)",
                "description":"I was listening to some Nintendo lofi music when I was searching on Youtube and I'm listening to many of their original soundtracks, such as those from Mario and Zelda!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Minecraft was my all time favorite game since 2012! Coming to 9 years since I started playing!",
                "description":"It is one of the games that influenced me to learn more about computing!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm geeky in a way that I read Wikia articles about Nintendo games",
                "description":"I surf on on Wikia articles sometimes about Nintendo games!",
                "icon":"🤓",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I've ran overseas in the UK, Vietnam and New Zealand!",
                "description":"I wanted to discover new places when I'm travelling overseas, but because of COVID, I'm still constrained to running to different places in SG!",
                "icon":"🏃‍♂️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "The constant π (pi) is one of my favorite constants!",
                "description":"I even stop at π miles (literally 3.14 miles) during my runs!",
                "icon":"π",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I dislike the sound of styrofoam",
                "description":"",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm afraid to deal with rubber bands and balloons!",
                "description":"For instance I'm afraid of unwrapping rubber bands and tieing balloons",
                "icon":"🎈",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I want to add 'Kendric' to my name in the future!",
                "description":"So that people can remember me better! Planning to change it after I graduate from Polytechnic!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Blue is my favorite color and green is my second favorite",
                "description":"",
                "icon":"🔵",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't drink coffee - because I can't sleep at night!",
                "description":"I had trouble sleeping after I drank coffee late in the afternoon!",
                "icon":"☕",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I go to bed at around 10-11pm and wake up at around 7-8 am (7-8 hrs of sleep)",
                "description":"It may change during different circusmstances, but this is my default bedtime routine!",
                "icon":"🛌",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I used to dislike reading stuff because I couldn't picture",
                "description":"",
                "icon":"📖",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I used to be a picky eater when I was young",
                "description":"I was restricted to only liking French fries and Chicken Mcnuggets as a kid, but I've improved a big deal now!",
                "icon":"🍴",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm a 'carnivore' - I eat quite a lot of meat!",
                "description":"I just like the flavor and texture of meat, but I also strive to eat as many veggies as I can!",
                "icon":"🥩",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I like cooking fried rice during my free time!",
                "description":"With a hint of MSG! Fuiyoh!",
                "icon":"🍚",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm generally not a sporty person",
                "description":"",
                "icon":"🤾‍♂️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't drink gassy drinks like Coke often",
                "description":"I'm sensitive to the texture of carbonate!",
                "icon":"🥤",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Apart from learning Japanese, I attempted learning and experimenting other languages!",
                "description":"I've experimented with Korean and a variety of European languages including Frendh and Spanish, but I decided to narrow it down to Japanese because it suits me better!",
                "icon":"🌐",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "New Zealand is one of my favorite countries to travel to!",
                "description":"I just love the scenery there! It's just breathtaking!",
                "icon":"🇳🇿",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't consume alcohol at the moment",
                "description":"I'm not that interested in consuming it at the moment, but maybe one day I may change!",
                "icon":"🍺",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Making videos is also one of my hobbies!",
                "description":"",
                "icon":"📽",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I also like to play the electric bass sometimes!",
                "description":"I decided to give an electric bass a go due to my inspiration of Davie504's videos!",
                "icon":"🎸",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "My ideal outdoor weather is temperate!",
                "description":"Singapore's weather is just too hot for my liking!!!",
                "icon":"🌡️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I used to be addicted to speedcubing!",
                "description":"I used to practice speedcubing almost everyday during my teenage years! However, the interest died down after that.",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Japanese and Western cuisines are my two favorites!",
                "description":"When I was young, my parents brought me to eat at a variety of Western and Japanese food outlets!",
                "icon":"🍔",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm not religious at the moment",
                "description":"",
                "icon":"👻",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm horrible at dancing!",
                "description":"",
                "icon":"🤥",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I've never smoked a single cigarette in my life!",
                "description":"I don't promote smoking - it's bad for your health! I'm just not interested in it at all!",
                "icon":"🚭",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
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
            image(this.factList[this.circleValue-1]["image"],-this.r,-this.r,this.r*1.8,this.r*1.8);
            // textSize(32);
            // textAlign(CENTER,CENTER);
            // text(this.factList[this.circleValue-1]["icon"],0,0);
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