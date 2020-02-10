let positionLeft = 0;
let positionTop = 0;
let timer;
let scoreMouse = 0;
let scoreKeyb = 0;
const speedCube = 27;
const gameWidth = 640;
const gameHeight = 480;
const targetz = document.querySelector(".game-div__duck");
const button = document.querySelector(".button");
const buttonReset = document.querySelector(".button-reset");
const buttonReload = document.querySelector(".button-reload");
const gameDiv = document.querySelector(".game-div");
const mouseScore = document.querySelector("#mouse");
const keybScore = document.querySelector("#keyboard");
const section = document.querySelector("section");
const pyro = document.querySelector(".pyro");
pyro.remove();

targetz.style.display = "initial";
gameDiv.style.display = "block";

const playerMouse = prompt("Who's the person playing with the mouse ?");
const playerKeyb = prompt("Who's the person playing with the keyboard ?");

mouseScore.innerHTML = playerMouse + " " + scoreMouse;
keybScore.innerHTML = playerKeyb + " " + scoreKeyb;

gameDiv.style.width = gameWidth + "px";
gameDiv.style.height = gameHeight + "px";

targetz.style.left = 0 + "px";
targetz.style.top = 0 + "px";
button.addEventListener("click", startGame);
buttonReset.addEventListener("click", reset);
buttonReload.addEventListener("click", reloadPlayer);

function reloadPlayer() {
    location.reload()
}

function reset() {
    scoreKeyb = 0
    scoreMouse = 0
    pyro.remove();
    keybScore.innerHTML = playerKeyb + " " + scoreKeyb;
    mouseScore.innerHTML = playerMouse + " " + scoreMouse;
    targetz.style.backgroundColor = "blue";
}

function startGame() {
    timer = setTimeout(winTime, 5000);
    targetz.style.display = "initial";
    gameDiv.style.display = "block";
    window.addEventListener("keydown", keyboardMove);
    targetz.addEventListener("click", mouseClick);
}

function winTime() {
    targetz.style.backgroundColor = "green";
    scoreKeyb++;
    if (scoreKeyb === 5) {
        clearTimeout(timer);
        window.removeEventListener("keydown", keyboardMove);
        targetz.removeEventListener("click", mouseClick);
        keybScore.innerHTML = playerKeyb + " " + scoreKeyb;
        section.append(pyro);
        alert("Game Over ... " + playerKeyb + " wins :-)");
    } else {
        clearTimeout(timer);
        keybScore.innerHTML = playerKeyb + " " + scoreKeyb;
        alert(playerKeyb + " got one more point.");
        targetz.style.backgroundColor = "blue";
        startGame();
    }
}

function mouseClick(params) {
    params.target.style.backgroundColor = "red";
    scoreMouse++;
    if (scoreMouse === 5) {
        clearTimeout(timer);
        mouseScore.innerHTML = playerMouse + " " + scoreMouse;
        window.removeEventListener("keydown", keyboardMove);
        targetz.removeEventListener("click", mouseClick);
        section.append(pyro);
        alert("Game Over ... " + playerMouse + " wins :-)");
    } else {
        clearTimeout(timer);
        mouseScore.innerHTML = playerMouse + " " + scoreMouse;
        alert(playerMouse + " got one more point.");
        params.target.style.backgroundColor = "blue";
        startGame();
    }
}

function keyboardMove(params) {
    switch (params.key) {
        case "ArrowLeft":
            positionLeft < 3 ?
                (positionLeft = gameWidth - 104) :
                (positionLeft -= speedCube);
            break;
        case "ArrowRight":
            positionLeft > gameWidth - 104 ?
                (positionLeft = 0) :
                (positionLeft += speedCube);
            break;
        case "ArrowUp":
            positionTop < 3 ?
                (positionTop = gameHeight - 104) :
                (positionTop -= speedCube);
            break;
        case "ArrowDown":
            positionTop > gameHeight - 104 ?
                (positionTop = 0) :
                (positionTop += speedCube);
            break;

        default:
            break;
    }
    targetz.style.left = positionLeft + "px";
    targetz.style.top = positionTop + "px";
}