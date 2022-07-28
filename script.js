let face = document.getElementById("face");

face.addEventListener("click", () => {
    face.classList.add("rotation");
});

face.addEventListener("animationend", () => {
    face.classList.remove("rotation");
});