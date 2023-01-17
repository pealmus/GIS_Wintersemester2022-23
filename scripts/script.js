function saveText() {

    let inputText = document.getElementById("kommentare").value;
    

    let savedTextEl = document.createElement("p");
    savedTextEl.setAttribute("id", "kommentar");
    savedTextEl.innerHTML = inputText;
  

    document.body.appendChild(savedTextEl);

  
    localStorage.setItem("kommentar", inputText);
}
  

const saveButton = document.getElementById("saveButton");
  

saveButton.addEventListener("click", saveText);

if (localStorage.getItem("kommentar")) {

    var savedText = localStorage.getItem("kommentar");
    

    var savedTextEl = document.createElement("p");
    savedTextEl.setAttribute("id", "kommentar");
    savedTextEl.innerHTML = savedText;

    document.body.appendChild(savedTextEl);
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
fetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(comment => {
    localStorage.setItem('comment', comment);
    const p = document.getElementById('kommentar');
    p.innerHTML = comment;
});











