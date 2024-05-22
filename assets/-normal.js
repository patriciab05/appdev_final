let currentMoleTile;
let currentMoleTile2;
let currentOtherTile;
let currentOtherTile2;
let score = 0;
let finalScore = 0;
let targetScore = 15; 
let currentTime = 20;
let timerId = null;
let round = 1;
let tilesPerRow = 9;
let bgSound = new Audio("bg-music.mp3");
bgSound.loop = true;

window.onload = function() {
    setGame();
}

function setGame() {
    window.addEventListener("mousedown", function() {
    document.body.classList.add('click');
    });
    window.addEventListener("mouseup", function() {
    document.body.classList.remove('click');
    });

    for (let i=0; i < tilesPerRow; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    document.getElementById("targetScore").innerHTML = targetScore;
    document.getElementById("round").innerHTML = round;
    setInterval(setMole, 3000); 
    setInterval(setOther, 4000);
    setInterval(setMole2, 3000);
    setInterval(setOther2, 4000);
    countDownTimerId = setInterval(countDown, 1000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * tilesPerRow);
    return num.toString();
}

function setMole() {
    if(currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }
    let mole =document.createElement("img");
    mole.src = "./icon-mole.png"; // dito yung gawa mo na may mask

    let num = getRandomTile();
    if (currentOtherTile && currentOtherTile.id == num) {
        return;
    }
    else if (currentMoleTile2 && currentMoleTile2.id == num) {
        return;
    }
    else if (currentOtherTile2 && currentOtherTile2.id == num) {
        return;
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
    currentMoleTile.firstChild.classList.add('appear');

    setTimeout(function() {
    currentMoleTile.firstChild.classList.add('disappear'); //add the animation
    currentMoleTile.firstChild.addEventListener("animationend", function() {
        currentMoleTile.firstChild.remove(); //remove the img after animation
    });
    }, 800);
}
function setMole2() {

    if(currentMoleTile2) {
        currentMoleTile2.innerHTML = "";
    }
    let mole =document.createElement("img");
    mole.src = "./icon-mole.png"; //dito not sure kung ano pwede ilagay, baka pwede mo ibahin ng kulay?

    let num = getRandomTile();
    if (currentOtherTile && currentOtherTile.id == num) {
        return;
    }
    else if (currentMoleTile && currentMoleTile.id == num) {
        return;
    }
    else if (currentOtherTile2 && currentOtherTile2.id == num) {
        return;
    }
    currentMoleTile2 = document.getElementById(num);
    currentMoleTile2.appendChild(mole);
    currentMoleTile2.firstChild.classList.add('appear');

        setTimeout(function() {
        currentMoleTile2.firstChild.classList.add('disappear'); //add the animation
        currentMoleTile2.firstChild.addEventListener("animationend", function() {
            currentMoleTile2.firstChild.remove(); //remove the img after animation
        });
    }, 800);
}

function setOther() {

    if (currentOtherTile) {
        currentOtherTile.innerHTML = "";
    }

    let other = document.createElement("img");
    other.src= "./icon-falc.png"; // dito pa rin yung icon-falc

    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) {
        return;
    }
    else if (currentMoleTile2 && currentMoleTile2.id == num) {
        return;
    }
    else if (currentOtherTile2 && currentOtherTile2.id == num) {
        return;
    }
    currentOtherTile = document.getElementById(num);
    currentOtherTile.appendChild(other);
    currentOtherTile.firstChild.classList.add('appear');

        setTimeout(function() {
    currentOtherTile.firstChild.classList.add('disappear');
    currentOtherTile.firstChild.addEventListener("animationend", function() {
        currentOtherTile.firstChild.remove();
    });
    }, 900);
}
function setOther2() {

    if (currentOtherTile2) {
        currentOtherTile2.innerHTML = "";
    }

    let other = document.createElement("img");
    other.src= "./icon-falc.png"; //dito not sure kung ano pwede ilagay, baka pwede mo ibahin ng kulay?

    let num = getRandomTile();
    if (currentMoleTile2 && currentMoleTile2.id == num) {
        return;
    }
    else if (currentMoleTile && currentMoleTile.id == num) {
        return;
    }
    else if (currentOtherTile && currentOtherTile.id == num) {
        return;
    }
    currentOtherTile2 = document.getElementById(num);
    currentOtherTile2.appendChild(other);
    currentOtherTile2.firstChild.classList.add('appear');

    setTimeout(function() {
    currentOtherTile2.firstChild.classList.add('disappear');
    currentOtherTile2.firstChild.addEventListener("animationend", function() {
        currentOtherTile2.firstChild.remove();
    });
    }, 800);
}


function selectTile() {
    for (var i = 0; i < 2; i++) {
    if (this == currentMoleTile) {
        let roar = new Audio('sfx-hitmole.mp4')
        roar.play();
        score += 3;
        document.getElementById("score").innerText = score.toString();
        currentMoleTile.firstChild.classList.add('hit');
        currentMoleTile.firstChild.addEventListener('animationend', () => {
        currentMoleTile.firstChild.remove();
        })
    }
    else if (this == currentOtherTile) {
        let scream = new Audio('sfx-hitfalc.mp4')
        scream.play(); 
        score -= 5;
        document.getElementById("score").innerText = score.toString();
        currentOtherTile.firstChild.classList.add('hit');
        currentOtherTile.firstChild.addEventListener('animationend', () => {
        currentOtherTile.firstChild.remove();
        })
    }
    else if (this == currentMoleTile2) {
        let roar = new Audio('sfx-hitmole.mp4')
        roar.play();
        score += 1;
        document.getElementById("score").innerText = score.toString();
        currentMoleTile2.firstChild.classList.add('hit');
        currentMoleTile2.firstChild.addEventListener('animationend', () => {
        currentMoleTile2.firstChild.remove();
        })
    }
    else if (this == currentOtherTile2) {
        let scream = new Audio('sfx-hitfalc.mp4')
        scream.play();
        score -= 1;
        document.getElementById("score").innerText = score.toString();
        currentOtherTile2.firstChild.classList.add('hit');
        currentOtherTile2.firstChild.addEventListener('animationend', () => {
        currentOtherTile2.firstChild.remove();
        })
    }
}
}

function countDown() {
    bgSound.play();
    currentTime--;
    document.getElementById('time-left').innerHTML = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
	    finalScore += score;

        if (score >= targetScore) {
            let continueGame = confirm('Round Over! Score: '+ score +' Do you want to continue?');
            if (continueGame) {
                round++;
                
                if (round % 3 == 0) {
                    tilesPerRow += 3;
                    let GFG = document.getElementById("board");
                    let boardWidth = GFG.clientWidth;
                    GFG.style.width = (boardWidth + 180) + "px";
                }
                resetGame();
                }
            else {
            alert("Your Final score is: " + finalScore);
                window.location.href = 'homepage.html';
            }
        }
        else {
            alert("You Failed! Your Final score is: "  
            + finalScore + "\nReturn to menu.");
            window.location.href = 'homepage.html';
        }
    }
}

function resetGame() {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    let mult = round/2; 
    currentTime = 20 * mult.toFixed(0);
    score = 0;
    targetScore = 15 * mult.toFixed(0);
    round += 0;
    document.getElementById("score").innerText = "0";
    document.getElementById('time-left').innerHTML = currentTime;
    document.getElementById("targetScore").innerHTML = targetScore;
    document.getElementById("round").innerHTML = round;
    document.getElementById("board").innerHTML = "";
    setGame();
}