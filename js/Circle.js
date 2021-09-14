class Circle {
    constructor(x,y,r,collidable,fillColor,circleValue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.fillColor = fillColor;
        this.collidable = collidable;
        // this.type = type;
        this.circleValue = circleValue;
        this.highlighted = false;
        this.factList = [
            {
                "title": "I think I'm more of a cat person! 🐱",
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
                "description":"Another special thing was that I was considered to be very tall in Primary 6 (11-12 years old) where I was around 170cm (~ 5' 7\")! It's probably because my puberty started early. Although I feel a bit sad that I didn't grow more, I'm learning to embrace it!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm a very clumsy person",
                "description":"I tend to trip over things once in a while, and I even got some bruises before!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Maths is one of my favorite subjects in school",
                "description":"Don't mean to boast here, but it started when I topped my class in maths several times!",
                "icon":"🔢",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I refuse to admit that I'm addicted to Nintendo game music!",
                "description":"I was listening to some Nintendo lofi music on Youtube and I'm listening to many of their original soundtracks, including those from Mario and The Legend of Zelda!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Minecraft got me interested in computing!",
                "description":"Even since I started playing 2012 (coming to 9 years), it is my most influential game that got be interested to learn more about computing!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I can become geeky sometimes!",
                "description":"For instance, I read Wikia articles that are related to what I feel like reading, such as Nintendo games!",
                "icon":"🤓",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'd ran overseas in the UK, Vietnam and New Zealand!",
                "description":"I wanted to discover new places when I'm travelling overseas, but because of COVID, I'm still constrained to running to different places in SG. I'm doing fine right now as I'm used to the limitations of not travelling!",
                "icon":"🏃‍♂️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "The constant π (pi) is one of my favorite constants!",
                "description":"I even stop at π miles (literally 3.14 miles) during my runs when I plan to run a 5K!",
                "icon":"π",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I dislike the sound of styrofoam rubbing each other!",
                "description":"For instance, when I'm opening a packet of chicken rice, I will have to open it quickly so that I don't hear the noise for longer periods of time!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm get scared when I use rubber bands and tieing balloons!",
                "description":"Because I'm afraid that the rubber band may snap at me, as well as hearing the balloon pop unexpectedly!",
                "icon":"🎈",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I want to add 'Kendric' to my name in the future!",
                "description":"Because I feel that my given name can be mispronounced easily by some people (not blaming you!). Planning to add it after I graduate from Polytechnic!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "My top 3 priorities in life include self-improvement, mental health and physical health!",
                "description":"Not only do I want to improve myself in my passions, but I also feel that mental health and physical health are also very important! Without them, I wouldn't be living a comfortable life!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't drink coffee",
                "description":"It could get me very hyperactive where I will have problems concentrating. And worse, I have trouble sleeping at night!",
                "icon":"☕",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I go to bed at around 10-11pm and wake up at around 7-8 am",
                "description":"This is my default bedtime routine! However, it may change during different circumstances, where I may sleep late due to a lot of commitments I had to do, etc.",
                "icon":"🛌",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Running stabilized my overall mental health!",
                "description":"It got me out of my depressive state after I started to run! Give it a try to see the effects!",
                "icon":"🏃‍♂️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I used to be a picky eater when I was young",
                "description":"I was restricted to only liking French fries and Chicken Mcnuggets as a kid, but I've improved a big deal now because my parents have been wanting me to try new food!",
                "icon":"🍴",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm a more carnivorous than herbivorous",
                "description":"I just like the flavor and texture of meat, but I also strive to eat as many veggies as I can!",
                "icon":"🥩",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I like cooking fried rice sometimes!",
                "description":"With a hint of MSG! Fuiyoh!",
                "icon":"🍚",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't come from a sporty background",
                "description":"However, I've participated in a few sports day competitions, such as table tennis and track and field!",
                "icon":"🤾‍♂️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't drink gassy drinks like Coke often",
                "description":"I'm sensitive to the texture of carbonate! Because of that, I tend to shake the drinks pretty often and I have to be careful when it 'explodes'!",
                "icon":"🥤",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Apart from learning Japanese, I attempted learning and experimenting with other languages!",
                "description":"I've experimented with Korean and a variety of European languages, including French and Spanish, but I decided to narrow it down to Japanese because it suits me better!",
                "icon":"🌐",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "New Zealand is one of my favorite countries to travel to!",
                "description":"I just love the scenery there, especially Queenstown! It's simply breathtaking!",
                "icon":"🇳🇿",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I don't consume alcohol at the moment",
                "description":"I'm not that interested in consuming it at the moment, but maybe one day I may change if I'm told to!",
                "icon":"🍺",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "Making videos is also one of my hobbies!",
                "description": "I enjoy the process of making videos! However, it can be very time-consuming and it can easily interfere with my important tasks that I have to do. 😢",
                "icon":"📽",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I also like to play the electric bass sometimes!",
                "description":"I decided to give an electric bass a go due to my inspiration of Davie504's videos! However, I'm not confident if I have to perform it when other people are listening to it yet!",
                "icon":"🎸",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "My ideal outdoor weather is temperate!",
                "description":"Singapore's weather is just too hot for my liking! Especially because I'm literally pouring with sweat after my runs!",
                "icon":"🌡️",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I used to be hooked on to speedcubing!",
                "description":"I used to practice speedcubing almost everyday during my teenage years! However, the interest died down after a while 😢. But it's normal that interests can change at some point in time!",
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
                "title": "I'm registered as a Buddhist, but I'm not religious",
                "description":"I don't feel that I have any attachment to religion at the moment, but I do agree that religion teaches us how to be a good person and live healthily!",
                "icon":"",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I'm horrible at dancing!",
                "description":"Replaying myself dancing just wants to make me puke 🤮, just saying!!!",
                "icon":"🤥",
                "image":loadImage("./img/fact_imgs/fact_"+this.circleValue+".png")
            },
            {
                "title": "I've never smoked a single cigarette in my life (if I could recall)!",
                "description":"I'm totally not interested in it as I believe that it's not good for your health! Unfortunately, my late grandfather passed away due to complications of smoking in his youth and adult years (he quit smoking at some point).",
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
            // fill(255,200,0);
            if (this.highlighted) {
                strokeWeight(4);
                stroke("#994422")
            }
            fill(this.fillColor);
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
            imageMode(CENTER,CENTER);
            image(this.factList[this.circleValue-1]["image"],0,0,this.r*1.7,this.r*1.7);
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