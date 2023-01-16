/*function saveText() {

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
}*/



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


document.getElementById("speichern").addEventListener("click", function(){
    var eingabe = document.getElementById("eingabe").value;
    localStorage.setItem("eingabe", eingabe);
    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({eingabe: eingabe}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(response => console.log('Erfolg:', JSON.stringify(response)))
    .catch(error => console.error('Fehler:', error));
});

fetch('/kommentare')
.then(response => response.json())
.then(kommentare => {
    kommentare.forEach(function(kommentar) {
        var p = document.createElement("p");
        p.id = "kommentar";
        var node = document.createTextNode(kommentar.eingabe);
        p.appendChild(node);
        var element = document.getElementById("eingabe-abschnitt");
        element.appendChild(p);
    });
});

const speichernButton = document.getElementById('speichern');
speichernButton.addEventListener('click', (e) => {
  e.preventDefault();
  const kommentar = document.getElementById('kommentare').value;
  fetch('/kommentare', {
    method: 'POST',
    body: JSON.stringify({ kommentar }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

const kommentarListe = document.getElementById('kommentar-liste');
fetch('/kommentare')
  .then(res => res.json())
  .then(data => {
    data.forEach(kommentar => {
      const p = document.createElement('p');
      p.innerText = kommentar;
      kommentarListe.appendChild(p);
    });
  })
  .catch(err => console.log(err));











