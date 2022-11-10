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


