async function horiSwivel(elem) {
    var amp = 20;
    for (let i = 0;i<300;i++) {
            await delay(10);
            // console.log(amp*Math.sin(i));
            $(elem).css({"letter-spacing":(amp/(i*0.5))*Math.sin(i/10)+"px"});
        }
        $(elem).css({"letter-spacing":"inherit"});
}
async function textAppear(elem) {
    var text = $(elem).text();
    var outputText = "";
    for (let i in text) {
        await delay(100);
        outputText+=text[i];
        $(elem).text(outputText);
    }
}
async function elementAppear(elem,delayAmount) {
    $(elem).each(function(i,e){
        $(this).css({"opacity":0});
    });
    $(elem).each(function(i,e){
        // await delay(delayAmount);
        $(this).animate({"opacity":1},1000);
    });
}
textAppear("h2#headerName");
horiSwivel("h2#headerName");
elementAppear("div#hobbies");
function calcAge(bYear,bMonth,bDay) {
    var birthTime = new Date("2002-09-30");
    var currentTime = new Date();
    var duration = currentTime-birthTime;
    var age = Math.floor(duration/(365*24*60*60*1000));
    return age;
} 
async function increasingNumber(elem,num) {
    if (parseInt($(elem).text())!=NaN) {
        var integer = parseInt($(elem).text());
        console.log($(elem).text());
        for (let i = 0;i<=integer;i++) {
            await delay(i**2+50);
            $(elem).css({"display":"block"});
            $(elem).text(i);
        }
    }
}
$(document).ready(function(){
    $("#year").text(calcAge(2002,9,30));
    $("#date").text(getDate());
    // randomizeWordToSolve("My Codes","#codes");
    increasingNumber("span#year");
    getMcBlocks();
});
function getDate() {
    var date = new Date();
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
}
function delay(amount) {
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve();
        },amount);
    });
}
async function randomizeWordToSolve(str,elem) {
    // var stringVal = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var stringArr = [],boolMapper = [];
    for (let i in str) {
        stringArr.push(chars[Math.floor(Math.random()*chars.length)]);
        boolMapper.push(0);
    }
    // for (let i in stringVal) {
    //     // stringVal+=chars[Math.floor(Math.random()*chars.length)];
    //     boolMapper.push(0);
    //     stringArr.push(chars[Math.floor(Math.random()*chars.length)]);
    //     //console.log(stringArr);
    // }
    console.log(boolMapper);
    //$(elem).text(stringVal);
    let count = 0;
    while (count<=(boolMapper.length)*1.9) {
        for (let i = 0;i<boolMapper.length;i++) {
            // console.log("For looping!");
            //await delay(10);
            if (boolMapper[i]==0) {
                stringArr[i] = chars[Math.floor(Math.random()*chars.length)];
            } else if (boolMapper[i]==1) {
                // console.log("Yes");
                stringArr[i] = str[i];
            }
            // console.log(printArr(stringArr));
            // console.log(elem,str);
            // console.log(Math.floor(count/boolMapper.length));
            boolMapper[Math.floor(count/boolMapper.length*4)] = 1;
            $(elem).text(printArr(stringArr));
        }
        await delay(100);
        count+=1;
    }
    for (let i = str.length;i>=0;i--) {
        await delay(100);
        $(elem).text(printArr(stringArr));
        boolMapper[i] = 1;
        //console.log(boolMapper);
    }
}
function printArr(arr) {
    var outputText = "";
    for (let i in arr) {
        outputText+=arr[i];
    }
    return outputText;
}

function getMcBlocks() {
    $("div.mcDiv").each(function(i){
        var mcBlocks = [
            "stone",
            "grass_side",
            "dirt",
            "command_block",
            "cobblestone",
            "diamond_block",
            "emerald_block",
            "log_oak",
            "planks_oak",
            "sand",
            "sandstone",
            "wool"
            
        ];
        $(this).css({
            "background":`linear-gradient(
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.9)
            ), url(./img/minecraft/${mcBlocks[i]}.png) 
            center`,"background-size":"cover"
        });
    });
}