const codingImgsFolder = "./assets/img/coding_proj/";
const codingVideosFolder = "./assets/video/coding_proj/";

var projInfo = [
    {
        "proj_id":1,
        "title":"pySquidGame",
        "title_jp":"pyイカゲーム",
        "title_zh":"py鱿鱼游戏",
        "updated":new Date("7/22/2025"),
        "description":"A playable pygame application based on Netflix's 'Squid Game'! Contains all 6 game stages available in 'Squid Game' - Red Light Green Light, Honeycomb, Tug of War, Marbles, Glass Stepping Stones, Squid Game (Final Game)",
        "brief_description": "A playable pygame application based on Netflix's 'Squid Game'!",
        "brief_description_jp": "Netflixの「イカゲーム」に基づいたプレイ可能なpygameアプリ！",
        "brief_description_zh": "基于 Netflix《鱿鱼游戏》的可玩 pygame 应用！",
        "image_location": codingImgsFolder + "coding_proj13.png",
        "video_location": codingVideosFolder + "coding_proj13.mp4",
        "link": "https://github.com/pixelhypercube/pySquidGame",
        "gh_link": "https://github.com/pixelhypercube/pySquidGame",
        "tech_stack":[
            "Python","Pygame"
        ]
    },
    {
        "proj_id": 2,
        "title": "CellCollab",
        "updated":new Date("6/12/2025"),
        "description":"A multiplayer sandbox implementation of Conway's Game of Life with real-time interactions. Made using React.js and Socket.IO.",
        "brief_description": "A multiplayer sandbox implementation of Conway's Game of Life with real-time interactions. Made using React.js and Socket.IO.",
        "title_jp": "セルコラボ",
        "title_zh": "细胞协作",
        "brief_description_jp": "React.jsとSocket.IOを使用して作られた、コンウェイのライフゲームをマルチプレイヤーで楽しめるリアルタイムのサンドボックスです。",
        "brief_description_zh": "使用React.js和Socket.IO构建的一个支持多人实时互动的康威生命游戏沙盒。",
        "image_location": codingImgsFolder + "coding_proj16.png",
        "video_location": codingVideosFolder + "coding_proj16.gif",
        "link": "https://pixelhypercube.github.io/CellCollab/",
        "gh_link":"https://github.com/pixelhypercube/CellCollab",
        "web_link": "https://pixelhypercube.github.io/CellCollab/",
        "tech_stack":[
            "React.js","HTML","CSS","Javascript","Node.js"
        ]
    },
    {
        "proj_id": 10,
        "title": "PHC Minigolf",
        "title_jp": "PHCミニゴルフ",
        "title_zh": "PHC 迷你高尔夫",
        "updated":new Date("4/27/2022"),
        "description":"A minigolf game made using Python (pygame)! Contains 10 unique stages, with each stage having its own distinct and fun characteristics!",
        "brief_description_jp": "Python（pygame）で作ったミニゴルフゲーム！",
        "brief_description_zh": "用 Python（pygame）制作的迷你高尔夫游戏！",
        "brief_description": "A minigolf game made using Python (pygame)!",
        "image_location": codingImgsFolder + "coding_proj8.png",
        "video_location":codingVideosFolder + "coding_proj8.gif",
        "link": "https://github.com/pixelhypercube/Side-Projects/tree/main/PHC-Minigolf",
        "gh_link":"https://github.com/pixelhypercube/Side-Projects/tree/main/PHC-Minigolf",
        "tech_stack":[
            "Python","Pygame"
        ]
    },
    {
        "proj_id": 13,
        "title": "2D Spleef!",
        "title_jp": "2Dスプリーフ！",
        "title_zh": "2D淘汰游戏！",
        "updated": new Date("9/14/2020"),
        "description":"2D version of Spleef made using Java! Inspired by popular Minecraft Spleef minigames found on numerous Minecraft servers.",
        "brief_description": "2D version of Spleef made using Java!",
        "brief_description_jp": "走ると足元のブロックが消える、Java製の2Dスプリーフゲーム！",
        "brief_description_zh": "用Java制作的2D淘汰游戏，玩家踩过的方块会消失！",
        "image_location": codingImgsFolder + "coding_proj4.png",
        "video_location":codingVideosFolder + "coding_proj4.gif",
        "link": "https://github.com/pixelhypercube/Side-Projects/tree/main/2d-Spleef",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/2d-Spleef",
        "tech_stack":[
            "Java"
        ]
    },
    {
        "proj_id": 3,
        "title": "Pi Visualizer",
        "updated": new Date("5/19/2025"),
        "description":"An interactive visualizer that transforms the digits of π (pi) into beautiful geometric patterns, such as angles per digit and connecting lines. Currently in development, where I'll add in more fun and exciting ways to visualize the digits of π (pi)!",
        "brief_description": "An interactive visualizer that transforms the digits of π (pi) into beautiful geometric patterns.",
        "title_jp": "パイ・ビジュアライザー",
        "title_zh": "圆周率可视化",
        "brief_description_jp": "円周率の数字を美しい幾何学模様として視覚化するインタラクティブなビジュアライザーです。",
        "brief_description_zh": "一个将圆周率的数字转化为几何图案的互动可视化工具。",
        "image_location": codingImgsFolder + "coding_proj17.png",
        "video_location": codingVideosFolder + "coding_proj17.gif",
        "link": "https://pixelhypercube.github.io/pi-visualizations/",
        "gh_link":"https://github.com/pixelhypercube/pi-visualizations",
        "web_link":"https://pixelhypercube.github.io/pi-visualizations/",
        "tech_stack":[
            "React.js","HTML","CSS","Javascript"
        ]
    },
    {
        "proj_id": 4,
        "title": "CPP Physics",
        "updated": new Date("5/1/2025"),
        "description": "A mini C++ console program that simulates physics between objects, which includes collision and gravitational effects of physical objects.",
        "brief_description": "A mini C++ console program that simulates physics between objects!",
        "title_jp": "CPP物理シミュレーション",
        "title_zh": "CPP 物理模拟器",
        "brief_description_jp": "物体間の物理をシミュレーションする小さなC++プログラム！",
        "brief_description_zh": "一个模拟物体间物理互动的小型 C++ 程序！",
        "image_location": codingImgsFolder + "coding_proj15.png",
        "video_location": codingVideosFolder + "coding_proj15.gif",
        "link": "https://github.com/pixelhypercube/Side-Projects/tree/main/CPP-Physics",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/CPP-Physics",
        "tech_stack":[
            "C++"
        ]
    },
    {
        "proj_id": 5,
        "title": "RActive",
        "title_jp": "RActive：RA支援アプリ",
        "title_zh": "RActive：类风湿性关节炎管理应用",
        "updated": new Date("1/12/2024"),
        "description":"A Figma prototype to assist individuals with rheumatoid arthritis (RA) in managing daily activities. Implements the use of an AI coach to guide people with RA with the most effective ways to cope with their needs. Contains features like stretching exercises, dietary tracker and forums to seek help from other users! Created for CC0005 – Healthy Living and Wellbeing at NTU.",
        "brief_description": "A Figma prototype to assist individuals with rheumatoid arthritis (RA) in managing daily activities. Created for CC0005 – Healthy Living and Wellbeing at NTU.",
        "brief_description_jp": "関節リウマチ（RA）患者の日常管理を支援するFigmaプロトタイプ。NTUの「CC0005：健康的な生活とウェルビーイング」科目のために作成。",
        "brief_description_zh": "一个帮助类风湿性关节炎（RA）患者管理日常生活的 Figma 原型。为 NTU 的 CC0005 健康生活与福祉课程设计。",
        "image_location": codingImgsFolder + "coding_proj14.png",
        "video_location": codingVideosFolder + "coding_proj14.gif",
        "link": "https://www.figma.com/design/hiWbnOFAR7KPcpiU9cQMwe/CC0005-App?node-id=210-240&t=F7NivajSw7bWbxKb-0",
        "web_link": "https://www.figma.com/design/hiWbnOFAR7KPcpiU9cQMwe/CC0005-App?node-id=210-240&t=F7NivajSw7bWbxKb-0",
        "tech_stack":[
            "Figma"
        ]
    },
    {
        "proj_id": 6,
        "title": "Loves Me... ?",
        "title_jp": "ラブ・ミー...?",
        "title_zh": "爱我...？",
        "updated": new Date("1/12/2024"),
        "description":"A replica of the 'Loves Me...' minigame from Super Mario 64 DS, made using p5.js!",
        "brief_description_jp": "スーパーマリオ64DSのミニゲームを再現！",
        "brief_description_zh": "重制自《超级马里奥64 DS》的小游戏！",
        "brief_description": "A replica of 'Loves Me...' minigame from Super Mario 64 DS!",
        "image_location": codingImgsFolder + "coding_proj12.png",
        "video_location": codingVideosFolder + "coding_proj12.gif",
        "link": "https://pixelhypercube.github.io/Loves-Me-Replica",
        "gh_link": "https://github.com/pixelhypercube/Loves-Me-Replica",
        "web_link": "https://pixelhypercube.github.io/Loves-Me-Replica",
        "tech_stack":[
            "HTML","CSS","Javascript"
        ]
    },
    {
        "proj_id": 7,
        "title": "Telegram Tic Tac Toe Bot",
        "title_jp": "テレグラム三目並べボット",
        "title_zh": "Telegram 井字棋机器人",
        "updated": new Date("4/28/2024"),
        "description":"A simple telegram bot that let's you play tic tac toe! Implemented the server using Node.js.",
        "brief_description_jp": "テレグラムで三目並べが遊べるボット！",
        "brief_description_zh": "一个可以在 Telegram 上玩的井字棋机器人！",
        "brief_description": "A simple telegram bot that let's you play tic tac toe!",
        "image_location": codingImgsFolder + "coding_proj11.png",
        // "video_location": codingVideosFolder + "coding_proj11.gif",
        "link": "https://github.com/pixelhypercube/Telegram-Tic-Tac-Toe",
        "gh_link": "https://github.com/pixelhypercube/Telegram-Tic-Tac-Toe",
        "tech_stack":[
            "Node.js"
        ]
    },
    {
        "proj_id": 8,
        "title": "Coin Dozer Replica!",
        "title_jp": "コインプッシャーレプリカ！",
        "title_zh": "推币机仿制品！",
        "updated": new Date("1/19/2021"),
        "description":"A mini 2D online Coin Dozer to relive one of my favorite childhood games using p5.js & matter.js!",
        "brief_description_jp": "matter.jsとp5.jsで作った2Dコインプッシャー！",
        "brief_description_zh": "用 matter.js 和 p5.js 制作的 2D 推币机！",
        "brief_description": "A mini 2D online Coin Dozer made using matter.js and p5.js!",
        "image_location": codingImgsFolder + "coding_proj10.png",
        "video_location": codingVideosFolder + "coding_proj10.gif",
        "link": "https://pixelhypercube.github.io/Side-Projects/Coin-Dozer-Replica/index.html",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/Coin-Dozer-Replica",
        "web_link": "https://pixelhypercube.github.io/Side-Projects/Coin-Dozer-Replica/index.html",
        "tech_stack":[
            "HTML","CSS","Javascript"
        ]
    },
    {
        "proj_id": 9,
        "title": "Pi Approximation",
        "title_jp": "円周率近似",
        "title_zh": "π 值近似模拟器",
        "updated": new Date("11/26/2020"),
        "description":"Simulates one of the methods of estimating the mathematical constant π (pi). Uses the ratio between the circles that are inside the big circle (red circles) and those that are outside the circle (blue circle) that will eventually be estimated to the value of π (pi). Inspired by the Coding Train's simulation of this fun way of calculating pi (π)!",
        "brief_description_jp": "円周率（π）を推定する方法をシミュレーション！",
        "brief_description_zh": "模拟估算数学常数 π 的方法之一。",
        "brief_description": "Simulates one of the methods of estimating the mathematical constant π (pi).",
        "image_location": codingImgsFolder + "coding_proj9.png",
        "video_location": codingVideosFolder + "coding_proj9.gif",
        "link": "https://pixelhypercube.github.io/Side-Projects/Pi-Approximation/index.html",
        "gh_link": "https://github.com/pixelhypercube/Pi-Approximation",
        "web_link": "https://pixelhypercube.github.io/Side-Projects/Pi-Approximation/index.html",
        "tech_stack":[
            "HTML","CSS","Javascript"
        ]
    },
    {
        "proj_id": 11,
        "title": "Console Spaceship Battle!",
        "title_jp": "コンソール宇宙船バトル！",
        "title_zh": "控制台太空船大战！",
        "updated": new Date("9/22/2020"),
        "description":"A spaceship battle game made exclusively using a Python console! Includes shooting mechanics with laser bullets to battle enemy spaceships, with additional graphics like moving stars in the background.",
        "brief_description_jp": "Pythonで作成された宇宙船バトルゲーム！",
        "brief_description_zh": "使用 Python 制作的太空船对战游戏！",
        "brief_description": "A spaceship battle game made exclusively using a Python console!",
        "image_location": codingImgsFolder + "coding_proj7.png",
        "video_location": codingVideosFolder + "coding_proj7.gif",
        "link": "https://github.com/pixelhypercube/Side-Projects/tree/main/Console-Spaceship-Battle",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/Console-Spaceship-Battle",
        "tech_stack":[
            "Python"
        ]
    },
    {
        "proj_id": 12,
        "title": "Visual Matrix Operators!",
        "title_jp": "ビジュアル行列演算！",
        "title_zh": "可视化矩阵运算器！",
        "updated": new Date("9/19/2020"),
        "description":"A visualization tool that simulates the effects of matrix operations, which are addition, subtraction and multiplication! Contains a heatmap of the resultant array's values to easily visualize the effects of those matrix operations!",
        "brief_description_jp": "加算・減算・乗算などの行列演算を視覚化！",
        "brief_description_zh": "帮助可视化加法、减法和乘法等矩阵运算！",
        "brief_description": "Helps to visualize matrix operations like addition, subtraction and multiplication!",
        "image_location": codingImgsFolder + "coding_proj6.png",
        "link": "https://pixelhypercube.github.io/Side-Projects/Visual-Matrix-Operators/",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/Visual-Matrix-Operators",
        "web_link": "https://pixelhypercube.github.io/Side-Projects/Visual-Matrix-Operators/",
        "tech_stack":[
            "HTML","CSS","Javascript"
        ]
    },
    {
        "proj_id": 14,
        "title": "Video To Text!",
        "title_jp": "ビデオからテキスト！",
        "title_zh": "视频转文字！",
        "updated": new Date("8/30/2020"),
        "description":"A simple video to unicode text generator! Play a video and see the magic from the text below!",
        "brief_description_jp": "ビデオを再生して、下のテキストの魔法を見よう！",
        "brief_description_zh": "播放视频并查看下面的文字魔法！",
        "brief_description": "A simple video to unicode text generator!",
        "image_location": codingImgsFolder + "coding_proj3.png",
        "video_location": codingVideosFolder + "coding_proj3.gif",
        "link": "https://pixelhypercube.github.io/Side-Projects/Video-To-Text/public/",
        "gh_link": "https://github.com/pixelhypercube/Side-Projects/tree/main/Video-To-Text",
        "web_link": "https://pixelhypercube.github.io/Side-Projects/Video-To-Text/public/",
        "tech_stack":[
            "HTML","CSS","Javascript"
        ]
    }
];

export default projInfo;