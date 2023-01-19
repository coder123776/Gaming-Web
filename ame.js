document.getElementById("win").style.visibility='hidden';
let pirate = document.getElementById("pirate");
let bruh = document.getElementById("bruh");
let nice = document.getElementById("nice");
let winning = document.getElementById("winning");
let GunShot = document.getElementById("shoot");
let counter = 20;

function count() {
    counter -= 1;
    document.getElementById("count").innerHTML = counter;
}

function iShoot(enemy) {
    GunShot.play();
    enemy.classList.add("dead");
    updateHealthPoints(healthPoints + 2);
    count();

    setTimeout( ()=> {
        enemy.classList.remove("showing");
    }, 150);

    if(!livingEnemies().length) {
        document.getElementById("win").style.visibility='visible';
        pirate.pause();
        winning.play();
        alert("YOUR SO GOOD! Victory!").window.location.reload();
    }
}

function enemyAttacksMe(enemy) {
    enemy.classList.add("showing");
    setTimeout(()=> { 
        enemyShootsMe(enemy);
    }, 500);

    setTimeout( ()=> {
        enemy.classList.remove("showing");
    }, 1000);
}

let healthPoints = 100;

function updateHealthPoints(points) {
    healthPoints = points;
    let healthBar = document.querySelector("#healthBar");

    healthBar.style.width = points + "%";

    if(healthPoints < 1) {
        pirate.pause();
        bruh.play();
        window.location.reload();
        alert("Your Sucks and bad asf so try again! (click on ok)");
        alert = function(){};
        alert("test");
    }
}

function enemyShootsMe(enemy) {
    enemy.classList.add("shooting");
    updateHealthPoints(healthPoints - 0.5);

    if(!enemy.classList.contains("dead")) {
        enemy.classList.remove("shooting");
    
    setTimeout(()=> {
        enemy.classList. remove("shooting");
    }, 200);
    }
}

function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}
function randomEnemyAttacks() {
    let randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo);
    let enemy = livingEnemies() [randomEnemyNo];

    let randomDelay = Math.random() * 200 + 100;

    setTimeout( ()=> {
        enemyAttacksMe(enemy);
        randomEnemyAttacks();
    }, randomDelay);
}

function newGame() {
    pirate.play();
    pirate.volume = 0.5;
    randomEnemyAttacks();
    document.querySelector("button").style.display = "none";
}


