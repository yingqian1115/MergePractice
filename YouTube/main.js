let player;
let currentPlay=0;

//YouTube載入framework後自動會呼叫

function onYouTubeIframeAPIReady()
{
    player =new YT.Player("player",{height:"390",width:"640",videoId:playList[currentPlay],playerVars:{autoplay:0,controls:0,start:playTime[currentPlay][0],end:playTime[currentPlay][1],iv_load_policy:3,rel:0},events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}});
}
function onPlayerReady(event)
{
    $("#playButton").on("click",function()
    {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    }
    )
}
function onPlayerStateChange(event)
{
    //console.log(evemt);
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1])
    {
        if(currentPlay<playList.length-1)
        {
            //Go Next
            currentPlay++;
            player.loadVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else
        {
            currentPlay=0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
            //Stop & Load the first song
        }
    }
    if(event.data==1)
    {
    $("h2").text(player.getVideoData().title);
    }
}
