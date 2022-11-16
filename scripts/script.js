let button = document.getElementById("click");
button.addEventListener("click", speichern);


function speichern() {
    let kommentare = document.getElementById("kommentare").value;
    let inhalt = document.getElementById('inhalt');
    window.localStorage.setItem('kommentare','inhalt');
    console.log(kommentare);
    let ausgabe = "";
    for (let i =0; i < localStorage.length; i++) {
        ausgabe += localStorage.key(i) + " = " + localStorage.getItem(localStorage.key(i)) + "<br>";
    }
    document.getElementById("comments").innerHTML = ausgabe;
    document.getElementById("kom").innerHTML = Date();
    document.getElementById("comments").innerHTML = kommentare;
}

const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'jNQXAC9IVRw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}








