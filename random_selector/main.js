let foodImages = [
    "https://storage.googleapis.com/www-cw-com-tw/article/202101/article-5ff76e12dff12.jpg",
    "https://imageproxy.icook.network/resize?background=255%2C255%2C255&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F391516%2F4a15cb3a501a0c4e.jpg&width=427",
    "https://imageproxy.icook.network/resize?background=255%2C255%2C255&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F355834%2Fb8ce15624e2ddb11.jpg&width=427"
];

$(function(){
    //console.log("yo");
    $("input").on("click",function(){
        //alert("Hi");
        let numberOfListItem = $("#choices li").length;
        let randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("h1").text($("#choices li").eq(randomChildNumber).text());
        $( "img" ).attr("src" , foodImages[randomChildNumber] ); //下面img沒有設定src,圖片的順序要跟清單中的順序一樣這樣他們就可以共用同一個亂數，產生的圖片跟文字就可以對應
        
    });

});


// $(function(){
//     $("input").on("click",function(){
//         //alert("Hi");
//         $("h1").text($("li:last").text());
//     });

// });


// $(function(){
//     $("input").on("click",function(){
//         //alert("Hi");
//         $("h1").text($("li").eq(1).text());
//     });

// });