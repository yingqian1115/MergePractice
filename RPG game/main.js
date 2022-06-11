let mapArray,ctx,currentImagMain; //變數用意課本有寫
let imgMountain,imgMain,imgEnemy;

const gridLength = 200; //canvas總寬高是600，畫成九宮格會變成200*3

//畫面進來要做的事情 initial,start,beginning
$(function(){
    mapArray = [//0-可走,1-障礙,2-終點,3-敵人
        [0,1,1],
        [0,0,0],
        [3,1,2],
    ];
    ctx = $("#myCanvas")[0].getContext("2d"); //使用的方式是2D id=myCanvas必須要取[0]，雖然通常id不用取第幾個，但極少數需要
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImagMain = {
        "x":0,
        "y":0
    };
    //主角繪製到畫面上-怕圖片物件還沒載入完成
    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImagMain.x,currentImagMain.y,gridLength,gridLength);
    };

});


//處理使用者按下按鍵 user interaction,event trigger
$(document).on("keydown",function(event){

});