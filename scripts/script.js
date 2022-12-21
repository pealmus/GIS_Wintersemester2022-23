let button = document.getElementById("click");
button.addEventListener("click", speichern);
button.addEventListener("keypress", speichern)

function speichern() {
    let kommentare = document.getElementById("kommentare").value;
    let inhalt = document.getElementById('inhalt');
    window.localStorage.setItem('kommentare','inhalt');
    console.log(kommentare);
    let ausgabe = "";
    for (let i =0; i < localStorage.length; i++) {
        ausgabe += localStorage.key(i) + " = " + localStorage.getItem(localStorage.key(i)) + "<br>";
    }
    document.getElementById("kom").textContent = Date();
    const newComment = document.createElement("p");  
    const newContent = document.getElementById("comments").textContent = kommentare;
    newComment.appendChild(newContent);
    const currentComment = document.getElementById("kom");
    document.body.insertBefore(newComment, currentComment);
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


const p = document.createElement('p');
p.className = 'kommentareSpeichern';








