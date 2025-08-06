// constants
const cube = document.getElementById("cube");
const face = document.getElementById("face");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const hyperlinks = document.getElementById("hyperlinks");
const spaceship = document.getElementById("spaceship");
const spaceshipEffect = document.getElementById("spaceship-effect");
const favicon = document.querySelector("link[rel='icon']");

const pop = new Audio("/assets/pop.mp3");

// utility functions
function importCSSfromURL(url) {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = url;

    document.head.appendChild(link);
}

function redirectToURL(url) {
    return () => {
        window.location.href = url;
    };
}

// functions for cheat codes
const cheatCodes = {
    "3d": () => {
        pop.play();

        cube.style.display = "block";
        face.style.display = "none";

        subtitle.textContent = "the bem cube";
    },
    "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba": () => {
        const sound = new Audio("/assets/spaceship_engine_sound.mp3"); // synthetic low-rev engine.wav by Timbre -- https://freesound.org/s/115271/ -- License: Attribution NonCommercial 4.0

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 4;

        let acceleration = 0.0;
        let direction = 0;
        let rotation = 0;

        let accelerationSpeed = 0.1;
        let moveSpeed = 5;
        let turnSpeed = 5;

        if (window.location.hash) {
            const values = window.location.hash.slice(1).split(",");

            if (values.length == 3) {
                accelerationSpeed = parseFloat(values[0]);
                moveSpeed = parseFloat(values[1]);
                turnSpeed = parseFloat(values[2]);
            }
        }

        pop.play();

        spaceship.style.display = "block";
        subtitle.textContent = "fly around the page!";

        sound.loop = true;

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    direction |= 1 << 0; break;
                case "ArrowDown":
                    direction |= 1 << 1; break;
                case "ArrowLeft":
                    direction |= 1 << 2; break;
                case "ArrowRight":
                    direction |= 1 << 3; break;
            }
        });
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    direction &= ~(1 << 0); break;
                case "ArrowDown":
                    direction &= ~(1 << 1); break;
                case "ArrowLeft":
                    direction &= ~(1 << 2); break;
                case "ArrowRight":
                    direction &= ~(1 << 3); break;
            }
        });

        setInterval(() => {
            if (direction & 1 << 0) {
                acceleration = Math.max(-1.0, acceleration - accelerationSpeed);
            } else if (direction & 1 << 1) {
                acceleration = Math.min(1.0, acceleration + accelerationSpeed);
            }

            x -= moveSpeed * Math.sin(rotation * Math.PI / 180) * acceleration;
            y += moveSpeed * Math.cos(rotation * Math.PI / 180) * acceleration;

            if (x + spaceship.offsetWidth / 2 < 0) {
                x = window.innerWidth + spaceship.offsetWidth / 2;
            } else if (x - spaceship.offsetWidth / 2 > window.innerWidth) {
                x = -spaceship.offsetWidth / 2;
            }

            if (y + spaceship.offsetHeight / 2 < 0) {
                y = window.innerHeight + spaceship.offsetHeight / 2;
            } else if (y - spaceship.offsetHeight / 2 > window.innerHeight) {
                y = -spaceship.offsetHeight / 2;
            }

            if (direction & 1 << 2) {
                rotation -= turnSpeed;
            } else if (direction & 1 << 3) {
                rotation += turnSpeed;
            }

            if (acceleration > 0) {
                acceleration = Math.max(0, acceleration - (accelerationSpeed / 2));
            } else if (acceleration < 0) {
                acceleration = Math.min(0, acceleration + (accelerationSpeed / 2));
            }

            spaceship.style.left = `${x}px`;
            spaceship.style.top = `${y}px`;
            spaceship.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

            if (direction & 3) {
                spaceshipEffect.style.backgroundPosition = `-48px -48px`;
                sound.play();
            } else {
                spaceshipEffect.style.backgroundPosition = `0 0`;
                sound.pause();
            }
        }, 1000 / 60);
    },
    "dvd": redirectToURL("https://dvd.bemxio.xyz/"),
    "gej": () => {
        pop.play();

        title.textContent = "NISZOgen";
        subtitle.textContent = "200ms to nie są 2 sekundy?";
        hyperlinks.innerHTML = `
            <a class="hyperlink" href="https://niszogen.com">
                <span class="hyperlink-logo">?</span>
                <span class="hyperlink-text">co</span>
            </a>
        `;

        face.src = "https://niszogen.com/logo.png";

        document.title = "NISZOgen";
        favicon.href = "https://niszogen.com/logo.png";

        importCSSfromURL("/styles/niszogen.css");
    },
    "girlboss": () => {
        pop.play();

        title.textContent = "✨ bemxio ✨";
        subtitle.textContent = "hi stalker 🙄💅";
        face.src = "/assets/girlboss_pfp.jpg";

        document.title = "✨ bemxio ✨";
        favicon.href = "/assets/girlboss_pfp.jpg";

        importCSSfromURL("/styles/girlboss.css");
    }
};

// aliases
cheatCodes.co = cheatCodes.gej;
cheatCodes.slay = cheatCodes.girlboss;

// cheat code listeners
let buffer = "";

document.addEventListener("keydown", (event) => {
    buffer += event.key.toLowerCase();

    if (buffer in cheatCodes) {
        cheatCodes[buffer]();
    }
});

const button = document.getElementById("footer-button");

button.addEventListener("click", () => {
    let input = prompt("Enter the code:");

    if (input in cheatCodes) {
        cheatCodes[input]();
    }
});