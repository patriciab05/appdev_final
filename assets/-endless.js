let currentMoleTile;
let currentMoleTile2;
let currentOtherTile;
let currentOtherTile2;
let targetScore = 15;
let score = 0;
let finalScore = 0;
let currentTime = 30;
let timerId = null;
let round = 1;
let tilesPerRow = 9;
let bgSound = new Audio("bg-music.mp3");
bgSound.loop = true;

window.onload = function() {
    setGame();
}

function setGame()
    {
    window.addEventListener("mousedown", function() {
    document.body.classList.add('click');
    });
    window.addEventListener("mouseup", function() {
    document.body.classList.remove('click');
    });

    for (let i = 0; i < tilesPerRow; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);    
    }
    document.getElementById("target-score").innerText = targetScore.toString(); 
    setInterval(setMole, 1500); //1 second toh
    setInterval(setOther, 2000);
    setInterval(setMole2, 1500);
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
    mole.src = "./icon-mole.png";

    let num = getRandomTile();
    if (currentOtherTile && currentOtherTile.id == num){return;}
    else if(
    currentMoleTile2 && currentMoleTile2.id == num) {
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
    mole.src = "./icon-mole.png"; //same nlng

    let num = getRandomTile();
    if (currentOtherTile && currentOtherTile.id == num){
        return;
    } else if (currentMoleTile && currentMoleTile.id == num){
return;
    }
    currentMoleTile2 = document.getElementById(num);
    currentMoleTile2.appendChild(mole);

    setTimeout(function() {
        currentMoleTile2.firstChild.classList.add('disappear'); //add the animation
        currentMoleTile2.firstChild.addEventListener("animationend", function() {
            currentMoleTile2.firstChild.remove(); //remove the img after animation
        });
    }, 100);
}

function setOther() {

    if (currentOtherTile) {
        currentOtherTile.innerHTML = "";
    }

    let other = document.createElement("img");
    other.src= "./icon-falc.png";

    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) {
        return;
    } else if (currentMoleTile2 && currentMoleTile2.id == num) {
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
    }, 800);
}

function selectTile() { 
    if (this == currentMoleTile) {
        
        let roar = new Audio('sfx-hitmole.mp4')
        roar.play();
        score += 1;
        document.getElementById("score").innerText = score.toString();

        //add animation
        currentMoleTile.firstChild.classList.add('hit');
        // tangalin mole after ng animation
        currentMoleTile.firstChild.addEventListener('animationend', () => {
        currentMoleTile.firstChild.remove();
        });
        
    }
    else if (this == currentOtherTile) {
        
        let scream = new Audio('sfx-hitfalc.mp4')
        scream.play();
        score -= 1;
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
}

function countDown() {
    bgSound.play();
    currentTime--;
    document.getElementById('time-left').innerHTML = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
	    finalScore += score;

        if (score < 0){
        alert("You REALLY Failed! Your Final score is: "  
        + finalScore + "\nWHACK THE FACK!");
        window.location.href = 'homepage.html';
       }
       else {
        alert("You Failed! Your Final score is: "  
        + finalScore + "\nReturn to menu.");
        window.location.href = 'homepage.html';
       }
    }

    else {
        if (score >= targetScore) {
            currentTime += 15;
            targetScore += 15;
            tilesPerRow += 3;
            round++;
            
            expandBoard();
            document.getElementById("target-score").innerHTML = targetScore;

        }
    }
}

function expandBoard(){
    let GFG = document.getElementById("board");
    let boardWidth = GFG.clientWidth;
    GFG.style.width = (boardWidth + 180) + "px";

    for (let i = board.children.length; i < tilesPerRow; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }  
}