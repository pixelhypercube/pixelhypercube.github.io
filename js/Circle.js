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
                "title": "I couldn't read and write Chinese characters until secondary school",
                "translations_title": {
                    "jp": "私は中学校に入るまで中国語の文字を読むことも書くこともできませんでした",
                    "zh": "我直到中学才会读写汉字"
                },
                "description": "I was exempt from Chinese in primary school due to my learning needs but eventually caught up after taking basic Chinese lessons when I transferred Secondary schools. My fluency is still a work in progress, but I continue to improve when I have the time!",
                "icon": "🀄",
                "image": loadImage("../img/fact_imgs/fact1.png"),
                "translations_desc": {
                    "jp": "小学校では学習のニーズから中国語を免除されていましたが、後に転校した際に基本的な中国語の授業を受け、徐々に追いつきました。流暢さはまだ進行中ですが、時間があるときに改善を続けています。",
                    "zh": "由于在小学时有学习需求，我被免除了中文课，但在转校后，我通过参加基础中文课程赶上了进度。我的流利程度仍在进步中，但我会在有时间时继续提高。"
                }
            },
            {
                "title": "I am a free thinker who was once a Buddhist when I was younger",
                "translations_title": {
                    "jp": "私は自由な思考者で、子供の頃は仏教徒でした",
                    "zh": "我是一个自由思想者，年轻时曾是佛教徒"
                },
                "description": "When I was a kid, I tended to follow my father’s religion, but now as I grew older, I don’t really practice religion very much. I also don’t label myself as an atheist or agnostic - just a free-thinker.",
                "icon": "🧠",
                "image": loadImage("../img/fact_imgs/fact2.png"),
                "translations_desc": {
                    "jp": "子供の頃は父の宗教に従っていましたが、年齢を重ねるうちに宗教をあまり実践しなくなりました。また、私は自分を無神論者や不可知論者とはラベル付けしていません - 単なる自由な思考者です。",
                    "zh": "小时候，我倾向于遵循父亲的宗教，但随着年龄的增长，我不再很积极地实践宗教。我也不认为自己是无神论者或不可知论者 - 只是一个自由思想者。"
                }
            },
            {
                "title": "I used to dislike reading as a child",
                "translations_title": {
                    "jp": "子供の頃、私は読書が嫌いでした",
                    "zh": "我小时候不喜欢阅读"
                },
                "description": "I had numerous difficulties visualizing what I read, which made it bland and uninteresting. Now, as I can picture things better, reading has become much more enjoyable for me!",
                "icon": "📚",
                "image": loadImage("../img/fact_imgs/fact3.png"),
                "translations_desc": {
                    "jp": "読むことを視覚化するのが非常に苦手で、退屈で面白くありませんでした。今では物事をより良くイメージできるようになり、読書がとても楽しくなりました！",
                    "zh": "我在阅读时有很多困难，尤其是在视觉化内容上，这让阅读变得枯燥无味。现在，我能更好地想象内容，阅读变得更加有趣！"
                }
            },
            {
                "title": "My most listened workout song",
                "description": "'KICK BACK' by Kenshi Yonezu (米津 玄師)",
                "translations_title": {
                    "jp": "私の最も聴いたワークアウトソング",
                    "zh": "我最常听的锻炼歌曲"
                },
                "icon": "🎶",
                "image": loadImage("../img/fact_imgs/fact4.png"),
                "translations_desc": {
                    "jp": "米津玄師の「KICK BACK」です。",
                    "zh": "米津玄师的《KICK BACK》"
                }
            },
            {
                "title": "Minecraft is one of my biggest inspirations for studying Computer Science!",
                "translations_title": {
                    "jp": "Minecraftは私がコンピュータサイエンスを学ぶ最大のインスピレーションの一つです！",
                    "zh": "《Minecraft》是我学习计算机科学的最大灵感之一！"
                },
                "description": "I’ve been addicted to the game since 2012 due to its endless possibilities and creativity and I have been immensely fascinated about the fun and interesting aspects this game can offer!",
                "icon": "🎮",
                "image": loadImage("../img/fact_imgs/fact5.png"),
                "translations_desc": {
                    "jp": "2012年からその無限の可能性と創造性に夢中になっており、このゲームが提供する楽しく興味深い側面に非常に魅了されています！",
                    "zh": "自2012年起，我就沉迷于这款游戏，它提供了无尽的可能性和创造力，我深深着迷于这款游戏所能提供的有趣和令人着迷的方面！"
                }
            },
            {
                "title": "I was a cat person as a child but have since shifted towards dogs!",
                "translations_title": {
                    "jp": "子供の頃は猫派でしたが、今では犬派に変わりました！",
                    "zh": "我小时候是猫派，但现在已经转向了狗派！"
                },
                "description": "",
                "icon": "🐶",
                "image": loadImage("../img/fact_imgs/fact6.png"),
                "translations_desc": {
                    "jp": "",
                    "zh": ""
                }
            },
            {
                "title": "My Personal Bests for running",
                "translations_title": {
                    "jp": "私のランニングのパーソナルベスト",
                    "zh": "我的跑步个人最佳"
                },
                "description": "2.4 km: 9:06, 5 km: 21:21, 10 km: 45:53, Half Marathon (~21.1 km): 1:52:22, Marathon (42.195 km): 4:49:51",
                "icon": "🏃‍♂️",
                "image": loadImage("../img/fact_imgs/fact7.png"),
                "translations_desc": {
                    "jp": "2.4 km：9:06、5 km：21:21、10 km：45:53、ハーフマラソン（約21.1 km）：1:52:22、フルマラソン（42.195 km）：4:49:51",
                    "zh": "2.4公里：9:06，5公里：21:21，10公里：45:53，半马拉松（约21.1公里）：1:52:22，全程马拉松（42.195公里）：4:49:51"
                }
            },
            {
                "title": "My left thumb could bend while my right thumb can’t!",
                "translations_title": {
                    "jp": "左手の親指は曲がるけど、右手の親指は曲がりません！",
                    "zh": "我的左手拇指能弯曲，但右手拇指不能！"
                },
                "description": "I wonder how many people share this trait!",
                "icon": "👍",
                "image": loadImage("../img/fact_imgs/fact8.png"),
                "translations_desc": {
                    "jp": "この特性を持っている人がどれだけいるのか気になります！",
                    "zh": "我想知道有多少人和我一样！"
                }
            },
            {
                "title": "I'm a huge lover of Japanese food",
                "translations_title": {
                    "jp": "私は日本食が大好きです！",
                    "zh": "我非常喜欢日本料理！"
                },
                "description": "I have a wide variety of favourites, ranging from sashimi to tonkatsu!",
                "icon": "🍣",
                "image": loadImage("../img/fact_imgs/fact9.png"),
                "translations_desc": {
                    "jp": "寿司から豚カツまで、幅広いお気に入りがあります！",
                    "zh": "从生鱼片到炸猪排，我都有很多喜欢的！"
                }
            },
            {
                "title": "I'm predominantly introverted",
                "translations_title": {
                    "jp": "私は主に内向的です",
                    "zh": "我是一个主要内向的人"
                },
                "description": "People are typically surprised to find out because I tend to be quite loud at times when I'm with people I'm very familiar with!",
                "icon": "😌",
                "image": loadImage("../img/fact_imgs/fact10.png"),
                "translations_desc": {
                    "jp": "人々は、私が非常に親しい人たちと一緒にいる時、時々とても大きな声を出すことに驚くことがよくあります！",
                    "zh": "人们通常会感到惊讶，因为当我和非常熟悉的人在一起时，我有时会变得很吵！"
                }
            },
            {
                "title": "My MBTI type is INTJ",
                "translations_title": {
                    "jp": "私のMBTIタイプはINTJです",
                    "zh": "我的MBTI类型是INTJ"
                },
                "description": "I was originally an INFJ in the beginning of my polytechnic days, but after making so many computers go brr.., my feeling (F) trait shifted to thinking (T).",
                "icon": "💻",
                "image": loadImage("../img/fact_imgs/fact11.png"),
                "translations_desc": {
                    "jp": "最初のポリテクニック時代ではINFJでしたが、多くのコンピュータを動かすうちに、感情（F）から思考（T）に変わりました。",
                    "zh": "最开始在理工学院时，我是INFJ，但在让许多计算机运作后，我的情感（F）特质转变为思维（T）。"
                }
            },
            {
                "title": "I feel down over long hair on the sides of my head",
                "translations_title": {
                    "jp": "私は頭の横の長い髪に悩まされています",
                    "zh": "我对头部两侧的长发感到不舒服"
                },
                "description": "As Singapore generally has a warm climate my hair at the sides could get pretty warm, and my sides will feel pretty itchy.",
                "icon": "💇‍♂️",
                "image": loadImage("../img/fact_imgs/fact12.png"),
                "translations_desc": {
                    "jp": "シンガポールは一般的に温暖な気候なので、横の髪がかなり温かくなり、横がかなりかゆく感じます。",
                    "zh": "由于新加坡气候温暖，头部两侧的头发会变得相当温热，侧面也会感到痒。"
                }
            },
            {
                "title": "I have a phobia of balloons and stretched rubber bands",
                "translations_title": {
                    "jp": "私は風船と伸ばされた輪ゴムに恐怖症があります",
                    "zh": "我害怕气球和拉伸的橡皮筋"
                },
                "description": "The sensation is especially intense when blowing up balloons or stretching rubber bands!",
                "icon": "🎈",
                "image": loadImage("../img/fact_imgs/fact13.png"),
                "translations_desc": {
                    "jp": "特に風船を膨らませたりゴムバンドを伸ばすと、その感覚が非常に強烈です！",
                    "zh": "在吹气球或拉伸橡皮筋时，这种感觉尤为强烈！"
                }
            },
            {
                "title": "I am a speedcuber!",
                "translations_title": {
                    "jp": "私はスピードキューバーです！",
                    "zh": "我是一个速拧魔方者！"
                },
                "description": "I have participated in speedcubing competitions during my secondary school days and I also have a collection of 60+ Rubik’s Cubes!",
                "icon": "🔲",
                "image": loadImage("../img/fact_imgs/fact14.png"),
                "translations_desc": {
                    "jp": "中学校の時にスピードキュービング大会に参加したことがあり、60個以上のルービックキューブを集めています！",
                    "zh": "在中学时，我参加过速拧魔方比赛，而且我还有60多个魔方的收藏！"
                }
            },
            {
                "title": "Maths was my favourite subject in secondary school",
                "translations_title": {
                    "jp": "数学は中学校で一番好きな科目でした",
                    "zh": "数学是我在中学时最喜欢的科目"
                },
                "description": "Unfortunately, computing subjects weren’t offered during my secondary school days, so maths has been my closest subject where I excelled!",
                "icon": "➗",
                "image": loadImage("../img/fact_imgs/fact15.png"),
                "translations_desc": {
                    "jp": "残念ながら、私の中学校時代にはコンピュータに関する科目は提供されていなかったので、数学が私の得意な科目となりました！",
                    "zh": "不幸的是，中学时没有提供计算机类科目，因此数学成了我最擅长的学科！"
                }
            },
            {
                "title": "I'm somewhat of a Kanji geek",
                "translations_title": {
                    "jp": "私はちょっとした漢字オタクです",
                    "zh": "我有点是汉字迷"
                },
                "description": "Kanji is one of the most difficult aspects of Japanese, and I find it fascinating to learn about what each Kanji is like!",
                "icon": "🈶",
                "image": loadImage("../img/fact_imgs/fact16.png"),
                "translations_desc": {
                    "jp": "漢字は日本語で最も難しい部分の一つで、各漢字がどんなものかを学ぶのが非常に魅力的です！",
                    "zh": "日语的汉字是日语中最难的部分之一，我发现了解每个汉字的特征非常有趣！"
                }
            },
            {
                "title": "I played the double bass for my school's orchestra!",
                "translations_title": {
                    "jp": "学校のオーケストラでダブルベースを演奏していました！",
                    "zh": "我在学校的乐团中演奏低音提琴！"
                },
                "description": "Despite having no prior musical background, I was able to pick it up over time, despite not being very good at it!",
                "icon": "🎻",
                "image": loadImage("../img/fact_imgs/fact17.png"),
                "translations_desc": {
                    "jp": "音楽のバックグラウンドが全くなかったにもかかわらず、時間が経つにつれて習得することができましたが、あまり上手ではありませんでした！",
                    "zh": "尽管我没有任何音乐背景，但随着时间的推移，我还是学会了它，尽管我并不擅长！"
                }
            },
            {
                "title": "I dislike the stinging texture of carbonated drinks at times",
                "translations_title": {
                    "jp": "炭酸飲料のしびれる感触が嫌いな時があります",
                    "zh": "我有时不喜欢碳酸饮料那种刺痛的口感"
                },
                "description": "Sometimes, I tend to just shake bottles containing carbonated drinks until I let out the gas, so it’s smoother.",
                "icon": "🥤",
                "image": loadImage("../img/fact_imgs/fact18.png"),
                "translations_desc": {
                    "jp": "時々、炭酸飲料のしびれるような感覚が嫌いです。時には炭酸飲料が入ったボトルを振って、ガスを抜くことで、より滑らかにしています。",
                    "zh": "有时我不喜欢碳酸饮料那种刺痛的口感。有时我会摇晃碳酸饮料瓶，直到释放出气体，使其更加顺滑。"
                }
            },
            {
                "title": "I used to be a picky eater when I was young",
                "translations_title": {
                    "jp": "子供の頃は偏食家でした",
                    "zh": "我小时候曾是个挑食的人"
                },
                "description": "I was sometimes way too picky, as I would only either eat McDonald's fries and nuggets, or homemade porridge. But now this is not a major issue anymore!",
                "icon": "🍟",
                "image": loadImage("../img/fact_imgs/fact19.png"),
                "translations_desc": {
                    "jp": "私は子供の頃、食べ物にとてもわがままで、マクドナルドのフライドポテトやナゲット、または手作りのおかゆしか食べませんでした。でも今では、これはもう大きな問題ではありません！",
                    "zh": "我小时候曾是个挑食的人，有时候非常挑剔，只吃麦当劳的薯条和鸡块，或者吃自制的粥。但现在这个问题已经不再是大问题了！"
                }
            },
            {
                "title": "My favourite travel destinations",
                "translations_title": {
                    "jp": "私のお気に入りの旅行先",
                    "zh": "我最喜欢的旅行目的地"
                },
                "description": "Japan, New Zealand and Taiwan",
                "icon": "✈️",
                "image": loadImage("../img/fact_imgs/fact20.png"),
                "translations_desc": {
                    "jp": "日本、ニュージーランド、台湾です。",
                    "zh": "日本、新西兰和台湾。"
                }
            },
            {
                "title": "I could wiggle my ears",
                "translations_title": {
                    "jp": "私は耳を動かせます",
                    "zh": "我能动耳朵"
                },
                "description": "Fun fact: about 10-20% of humans can do this!",
                "icon": "👂",
                "image": loadImage("../img/fact_imgs/fact21.png"),
                "translations_desc": {
                    "jp": "私は耳を動かすことができます。面白い事実：人間の約10〜20％がこれをできる！",
                    "zh": "我会摇晃我的耳朵！有趣的事实：大约10-20%的人类能做到这一点！"
                }
            },
            {
                "title": "I prefer cooler weather to warmer weather",
                "translations_title": {
                    "jp": "私は暖かいより涼しい天気が好きです",
                    "zh": "我更喜欢凉爽的天气而不是温暖的天气"
                },
                "description": "The ideal temperature for me is around 15°C - anything hotter or colder feels uncomfortable.",
                "icon": "🌡️",
                "image": loadImage("../img/fact_imgs/fact22.png"),
                "translations_desc": {
                    "jp": "理想的な温度は約15°Cです。それ以上またはそれ以下の温度は不快に感じます。",
                    "zh": "理想的温度大约是15°C，任何更热或更冷的天气都会让我感到不舒服。"
                }
            },
            {
                "title": "I’ve run in five countries",
                "translations_title": {
                    "jp": "私は5か国でランニングしたことがあります",
                    "zh": "我已经在五个国家跑过步"
                },
                "description": "I like to run in other countries, particularly in colder temperatures as I can't really stand the heat in Singapore. I’ve even completed half marathons in both Japan and New Zealand!",
                "icon": "🌏",
                "image": loadImage("../img/fact_imgs/fact23.png"),
                "translations_desc": {
                    "jp": "他の国で走るのが好きで、特に寒い気温の中で走るのが好きです。シンガポールの暑さには耐えられません。日本とニュージーランドでハーフマラソンも完走しました！",
                    "zh": "我喜欢在其他国家跑步，特别是在较冷的气温下，因为我真的无法忍受新加坡的炎热。我甚至在日本和新西兰完成了半程马拉松！"
                }
            },
            {
                "title": "The biggest risk I've ever taken",
                "translations_title": {
                    "jp": "今までで一番の冒険",
                    "zh": "我曾经采取的最大风险"
                },
                "description": "Running 20 miles (~32 km) to celebrate my 20th birthday in advance, with my phone running on less than 5% battery nearing the end.",
                "icon": "⚡",
                "image": loadImage("../img/fact_imgs/fact24.png"),
                "translations_desc": {
                    "jp": "私が今まで取った最大のリスクは、20歳の誕生日を前倒しで祝うために、電話のバッテリーが5％未満になりかけていた時に20マイル（約32km）走ったことです。",
                    "zh": "我曾经采取的最大风险是为了提前庆祝我的20岁生日，跑了20英里（大约32公里），当时我的手机电量快低于5%。"
                }
            },
            {
                "title": "I only drink socially",
                "translations_title": {
                    "jp": "私は社交の場でしか飲みません",
                    "zh": "我只在社交场合饮酒"
                },
                "description": "The only fun part of drinking is during social gatherings, which makes drinking moments much more exciting! However, I don't really drink when I'm by myself because I generally don't feel the joy of drinking alone.",
                "icon": "🍻",
                "image": loadImage("../img/fact_imgs/fact25.png"),
                "translations_desc": {
                    "jp": "飲むことの唯一楽しい部分は、社交の場であり、その瞬間がさらに興奮します！しかし、ひとりでいるときはあまり飲まないのは、ひとりで飲むことの楽しさをあまり感じないからです。",
                    "zh": "饮酒的唯一有趣部分是在社交聚会上，这让喝酒时的时刻更加兴奋！然而，我一个人时并不常喝酒，因为我通常不享受独自饮酒的乐趣。"
                }
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
            if (this.factList[this.circleValue-1]["image"]) {
                imageMode(CENTER,CENTER);
                image(this.factList[this.circleValue-1]["image"],0,0,this.r*1.7,this.r*1.7);
            } else {
                textSize(30);
                textAlign(CENTER,CENTER);
                text(this.factList[this.circleValue-1]["icon"],0,0);   
            }
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