let positionLeft = 0;
let positionTop = 0;
let timer;
let scoreMouse = 0;
let scoreKeyb = 0;
const speedCube = 20;
const gameWidth = 640;
const gameHeight = 480;
const targetz = document.querySelector(".game-div__duck");
const button = document.querySelector(".button");
const gameDiv = document.querySelector(".game-div");
const mouseScore = document.querySelector("#mouse");
const keybScore = document.querySelector("#keyboard");

const playerMouse = prompt("Who's the person playing with the mouse ?");
const playerKeyb = prompt("Who's the person playing with the keyboard ?");

mouseScore.innerHTML = playerMouse + " " + scoreMouse;
keybScore.innerHTML = playerKeyb + " " + scoreKeyb;

gameDiv.style.width = gameWidth + "px";
gameDiv.style.height = gameHeight + "px";

targetz.style.left = 0 + "px";
targetz.style.top = 0 + "px";
targetz.addEventListener("click", mouseClick);
window.addEventListener("keydown", keyboardMove);
button.addEventListener("click", startGame);

function startGame() {
  timer = setTimeout(winTime, 30000);
  targetz.style.display = "initial";
  gameDiv.style.display = "block";
}

function winTime() {
  targetz.style.backgroundColor = "green";
  scoreKeyb++;
  if (scoreKeyb === 5) {
    window.removeEventListener("keydown", keyboardMove);
    targetz.removeEventListener("click", mouseClick);
    clearTimeout(timer);
    alert("Game Over ... " + playerKeyb + " wins :-)");
  } else {
    keybScore.innerHTML = playerKeyb + " " + scoreKeyb;
    alert(playerKeyb  + " got one more point.");
    targetz.style.backgroundColor = "blue";
  }
}

function mouseClick(params) {
  params.target.style.backgroundColor = "red";
  scoreMouse++;
  if (scoreMouse === 5) {
    clearTimeout(timer);
    window.removeEventListener("keydown", keyboardMove);
    targetz.removeEventListener("click", mouseClick);
    alert("Game Over ... " + playerMouse + " wins :-)");
  } else {
    mouseScore.innerHTML = playerMouse + " " + scoreMouse;
    alert(playerMouse + " got one more point.");
    params.target.style.backgroundColor = "blue";
  }
}

function keyboardMove(params) {
  switch (params.key) {
    case "ArrowLeft":
      positionLeft < 3
        ? (positionLeft = gameWidth - 104)
        : (positionLeft -= speedCube);
      break;
    case "ArrowRight":
      positionLeft > gameWidth - 104
        ? (positionLeft = 0)
        : (positionLeft += speedCube);
      break;
    case "ArrowUp":
      positionTop < 3
        ? (positionTop = gameHeight - 104)
        : (positionTop -= speedCube);
      break;
    case "ArrowDown":
      positionTop > gameHeight - 104
        ? (positionTop = 0)
        : (positionTop += speedCube);
      break;

    default:
      break;
  }
  targetz.style.left = positionLeft + "px";
  targetz.style.top = positionTop + "px";
}
