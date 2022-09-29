var audio = document.getElementById("audio");
var time_past = document.getElementById("time-past");
var time_left = document.getElementById("time-left");
var fill = document.getElementById("fill");
var fill_btn = document.getElementById("fill-btn");
var played = false;

// By this function when we play song it will change icon of paly to pause
function play_and_pause(){
    if (played){
        audio.pause();
        document.getElementById("play-pause-btn").src = "assets/Image/play icon.png";
        played = false;
    }
    else{
        audio.play();
        document.getElementById("play-pause-btn").src = "assets/Image/pause icon.png";
        played = true;
    }
}
//It gaves a time by second, and in this function change second to minute, and if second greater than 9 return minute 

function change_format(time){
    var minute = parseInt(time / 60);
    var seconds = parseInt(time - (minute * 60));

    if (seconds > 9) return minute.toString() + ":" + seconds.toString();
    else return minute.toString() + ":0" + seconds.toString();
}
//
function next_5(){
    if (audio.currentTime + 5 > audio.duration) audio.currentTime = audio.duration;
    else audio.currentTime += 5;
}

function back_5(){
    if (audio.currentTime - 5 < 0) audio.currentTime = 0;
    else audio.currentTime -= 5;
}

slider("volume", "volume");
slider("time-line", "time-line", function(){audio.pause()}, function(){if (played) audio.play();});
// Read function with addEventListener
audio.addEventListener("timeupdate", function(){
     fill.style.width = (audio.currentTime * 100 / audio.duration) + "%";
    fill_btn.style.left = (audio.currentTime * 100 / audio.duration) + "%";
     // Show how much pass from audio
    time_past.innerText = change_format(audio.currentTime);
     // Show how much remain from audio
    time_left.innerText = "-" + change_format(audio.duration - audio.currentTime);
});