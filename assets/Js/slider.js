//This function that has four parameter and five variable 
function slider(action, id, mousedown=function(){}, mouseup=function(){}){
    var parent = document.getElementById(id);
    var fill = parent.getElementsByClassName("fill")[0];
    var fill_btn = parent.getElementsByClassName("fill-btn")[0];
    var can_drag = false, value = 0;
    // In this function our fill and fill-btn should move on the click place
    function update(){
        // Position of mouse in page
        var pos_x = window.event.clientX;
        // Show when we scroll to left
        var left = document.getElementById("left-width-" + id).getBoundingClientRect().left;
        // Show when we scroll to right
        var right = document.getElementById("right-width-" + id).getBoundingClientRect().right;
        var width = right - left;

        value = (pos_x - left) / width;

        if (value < 0) value = 0;
        else if (value > 1) value = 1;

        fill.style.width = (value * 100) + "%";
        fill_btn.style.left = (value * 100) + "%";

        if (action == "time-line"){
            audio.currentTime = audio.duration * value;
        }
        else if (action == "volume"){
            audio.volume = value;
            document.getElementById("volume-value").innerText = parseInt(value * 100);
        }
    }

    parent.addEventListener("mousedown", function(e){
        if (e.button == 0){
            can_drag = true;
            mousedown();
        }
    });

    document.body.addEventListener("mousemove", function(e){
        if (e.button == 0 && can_drag)
            update();
    });

    document.body.addEventListener("mouseup", function(e){
        if (e.button == 0 && can_drag){
            can_drag = false;
            mouseup();
        }
    });
    // Here we have 1 and 0 right click and left click and we saw when click to button it means left click
    parent.addEventListener("click", function(e){
        if (e.button == 0){
            update();
        }
    });

}