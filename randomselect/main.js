let foodImages = [
    "https://storage.googleapis.com/www-cw-com-tw/article/202101/article-5ff76e12dff12.jpg",
    "https://sweetamy.tw/wp-content/uploads/2021/08/IMG20210721122959-1-scaled.jpg",
    "https://cdn1.cybassets.com/media/W1siZiIsIjE2MzE3L3Byb2R1Y3RzLzMyMzU4MDY0LzE2MDYzNzI1NzRfZmJmYmUzYmNhZTgzMjNmOGQzNTguanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=f0b7888eaa5e55cc"
];



$(function(){
    $("input").on("click",function(){
        // alert("Hi");
        // $("h1").text($("li").eq(0).text());
        // $("h1").text($("li").eq(Math.floor(Math.random()*3)).text());
        // $("h1").text($("li").eq(Math.floor(Math.random()*$("li").length)).text());
        let numberOfListItem = $("li").length;
        let randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",foodImages[randomChildNumber]);
    });
});

