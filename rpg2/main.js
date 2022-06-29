let mapArray, ctx, currentImagMain;
let imgMountain, imgMain, imgEnemy;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, imgMain, imgEnemy -障礙物
const gridLength = 200;//隔線，每一格長度都是200
var sources = {
    Mountain:"rpg2/images/material.png",
    Enemy:"rpg2/images/Enemy.png"
};
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
}
//網頁載入完成後初始化動作，initial/start/beginning
$(function(){
    mapArray=[
        //0-可走,1-障礙,2-終點,3-敵人
        [0,1,1],
        [0,0,0],
        [3,1,2]

    ];
    ctx = $("#myCanvas")[0].getContext("2d");//選擇2d的方法作畫，canvas還是要取第0個，他是例外，不然一般id就會找第一個
    //ctx =document.getElementById("myCanvas").getContext("2d");//也可以用這個方法
    imgMain = new Image();
    imgMain.src ="rpg2/images/spriteSheet.png";
    currentImagMain ={
        "x":0,
        "y":0
    };
    //主角繪製到畫面上 - 會怕圖片物件還沒完成載入
    imgMain.onload = function(){
        //可以用小畫家知道我們要取的寬高
        ctx.drawImage(imgMain,0,0,80,130,currentImagMain.x,currentImagMain.y,gridLength,gridLength);//剪下：(起始點是0,0)(人物寬：80,高：130)貼上：到currentImageMain，並縮放到gridLength=200這個長寬大小
    };
    // imgMountain= new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src="images/Enemy.png";
    loadImages(sources,function(images){
        for(var x in mapArray){
        for(var y in mapArray[x]){
            if(mapArray[x][y]==1){
                //Draw Mountain
                ctx.drawImage(images.Mountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
            }else if(mapArray[x][y]==3){
                //Draw Enemy
                ctx.drawImage(images.Enemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
            }
        }
    }
});
    //兩層的onlaod保護

    // imgMountain.onload = function(){
    //     imgEnemy.onload =function(){
    //         for (let x in mapArray){
    //             for(let y in mapArray[x]){
    //                 if(mapArray[x][y]==1){
    //                     //draw Mountain
    //                     ctx.drawImage(imgMountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
    //                 }else if(mapArray[x][y]==3){
    //                     //draw Enemy
    //                     ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
    //                 }
    //             }
                
    //         }

    //     };
    // };


});

//處理使用者按下按鍵，user interaction / event trigger
$(document).on("keydown",function(event){
    debugger;
    let targetImg, targetBlock, cutImagePositionX;
    //1.先判斷使用者按了什麼
    //2.判斷目標位置那一格是什麼
    //3.決定要做的事情（只是轉頭/可以過去/..）
    targetImg ={//Canvas(x,y)
        "x":-1,
        "y":-1
    };
    targetBlock={//Data 2D array
        "x":-1,
        "y":-1
    };
    //讓瀏覽器不要做原本要做的事情，像是我們按下可能是讓頁面向下滑，但其實我們是想控制人物，所以我們先讓瀏覽器放棄我們所輸入的動作，讓我們可以去移動人物
    event.preventDefault();
    //避免鍵盤預設行為發生，如果捲動/放大/換頁
    //判斷使用者按下了什麼並推算目標座標
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImagMain.x-gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImagMain.x+gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y+gridLength;
            cutImagePositionX = 0;//臉朝下
        break;
    default://其他鍵不要理
        return;


    }
    //確認目標位置不會超過地圖
    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0){
        targetBlock.x =targetImg.y/gridLength;
        targetBlock.y =targetImg.x/gridLength;
    }else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    //清空主角原本所在的位置，重新繪製主角
    ctx.clearRect(currentImagMain.x,currentImagMain.y,gridLength,gridLength);
    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0://一班道路（可移動）
                $("#talkBox").text("");
                currentImagMain.x =targetImg.x;
                currentImagMain.y=targetImg.y;
                break;
            case 1://有障礙物（不可移動）
                $("#talkBox").text("有山");
                break;
            case 2://終點（可移動）
                $("#talkBox").text("抵達終點");
                currentImagMain.x =targetImg.x;
                currentImagMain.y=targetImg.y;
                break;
            case 3://敵人（不可移動）
                $("#talkBox").text("Hello");
                break;
        }

    }else{
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImagMain.x,currentImagMain.y,gridLength,gridLength);

});
