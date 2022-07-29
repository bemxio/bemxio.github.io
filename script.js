function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

let face = document.getElementById("face");
let makoto = document.getElementsByClassName("makoto")[0];

let secrets = {
    mako: () => {
        if (makoto.classList.contains("makoto-fade")) { // it already got activated
            return;
        }

        let ambience = new Audio("/assets/ambience.mp3");
        
        makoto.classList.remove("invincible");
        makoto.classList.add("makoto-fade");

        ambience.play();
    }
};

let buffer = "";

// event listeners for the face rotation
face.addEventListener("click", () => {
    face.classList.add("face-rotate");
});

face.addEventListener("animationend", () => {
    face.classList.remove("face-rotate");
});

// event listener for the makoto
makoto.addEventListener("click", () => {
    makoto.classList.add("makoto-shake");

    sleep(1).then(() => {
        window.location.href = "https://makotomiyamoto.com/";
    });
});

// keyboard listener for secrets
window.addEventListener("keydown", (event) => {
    if (event.key.length != 1 && event.key != "Backspace") { // the key string must be 1 if it's a single normal character
        return;
    }

    if (event.key == "Backspace") {
        buffer = buffer.slice(0, -1);
    } else {
        buffer += event.key;
    }

    secret = secrets[buffer]; // the secret function 
    //console.log(buffer);

    if (!secret) { // seccret is null
        return;
    }

    secret();
});