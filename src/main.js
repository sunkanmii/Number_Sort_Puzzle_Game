"use strict"

class App {

    constructor(posId) {
        this.checkBut = document.querySelector("#checkBut");
        this.checkBut.addEventListener("click", () => {
            this.checkSorted();
        });
        this.selectedRows = 0;
        this.numberMax = this.selectedRows ** 2;
        this.gameStartSec = document.querySelector(".game-container");
        this.clickButtonSound = document.querySelector("main audio");
        this.allButtons = document.querySelectorAll("main button");
        this.timeLeftMin = 0;
    }

    generateSpans() {
        let span = document.createElement("span");
        const amountSec = document.querySelector("#amount");
        const mainGame = document.querySelector("#mainGame");
        this.okay = amountSec.querySelector("#okay");
        this.rowSec = amountSec.querySelector("#row-by-column");
        this.selectedRows = Number(this.rowSec.options[this.rowSec.selectedIndex].value);
        this.numberMax = (this.selectedRows ** 2) - 1;

        let mySet = this.randomMize(this.selectedRows);
        let tempVal = "";
        mySet = Array.from(mySet);
        amountSec.style.display = "none";

        mySet.forEach((ele) => {
            span = document.createElement("span");
            tempVal = document.createTextNode(ele);
            span.appendChild(tempVal);
            this.gameStartSec.appendChild(span);
        })

        span = document.createElement("span");
        tempVal = "";
        span.setAttribute("id", "space");
        this.gameStartSec.appendChild(span);
        this.gameStartSec.style.display = "grid";
        mainGame.style.display = "grid";

        switch (this.selectedRows) {
            case 4:
                this.gameStartSec.style.gridTemplateColumns = "4rem 4rem 4rem 4rem";
                this.timeLeftMin = 5;
                break;
            case 5:
                this.gameStartSec.style.gridTemplateColumns = "4rem 4rem 4rem 4rem 4rem";
                this.timeLeftMin = 7;
                break;
            case 6:
                this.gameStartSec.style.gridTemplateColumns = "4rem 4rem 4rem 4rem 4rem 4rem";
                this.timeLeftMin = 9;
                break;
            case 7:
                this.gameStartSec.style.gridTemplateColumns = "4rem 4rem 4rem 4rem 4rem 4rem 4rem";
                this.timeLeftMin = 11;
                break;
        }
        start.endAndStartTimer();
        start.iterateProp();
    }

    keyPress() {
        const space = document.querySelector("space");
        const gameSec = document.querySelector(".game-container");
        const pos = 4;
        let temp = 0;
        const stylesheet = document.styleSheets[0];
        let evenNoEncounteredL = false;
        let evenNoEncounteredR = false;

        document.onkeydown = (event) => {
            if (gameSec.children[this.numberMax + 1] != null && gameSec.children[this.numberMax + 1].classList.contains("stopTag") === false && event.keyCode === 37) {

                gameSec.children[this.numberMax].removeAttribute("id");
                this.numberMax++;

                temp = gameSec.children[this.numberMax].textContent;
                gameSec.children[this.numberMax - 1].textContent = temp;

                gameSec.children[this.numberMax].textContent = '';
                gameSec.children[this.numberMax].setAttribute("id", "space");
            } else if (gameSec.children[this.numberMax + this.selectedRows] != null && event.keyCode === 38) {
                gameSec.children[this.numberMax].removeAttribute("id");
                this.numberMax += this.selectedRows;

                temp = gameSec.children[this.numberMax].textContent;
                gameSec.children[this.numberMax - this.selectedRows].textContent = temp;

                gameSec.children[this.numberMax].textContent = '';
                gameSec.children[this.numberMax].setAttribute("id", "space");
            } else if (gameSec.children[this.numberMax - 1] != null && gameSec.children[this.numberMax].classList.contains("stopTag") === false && event.keyCode === 39) {

                gameSec.children[this.numberMax].removeAttribute("id");
                this.numberMax -= 1;

                temp = gameSec.children[this.numberMax].textContent;
                gameSec.children[this.numberMax + 1].textContent = temp;

                gameSec.children[this.numberMax].textContent = '';
                gameSec.children[this.numberMax].setAttribute("id", "space");
            } else if (gameSec.children[this.numberMax - this.selectedRows] != null && event.keyCode === 40) {
                gameSec.children[this.numberMax].removeAttribute("id");
                this.numberMax -= this.selectedRows;

                temp = gameSec.children[this.numberMax].textContent;
                gameSec.children[this.numberMax + this.selectedRows].textContent = temp;

                gameSec.children[this.numberMax].textContent = '';
                gameSec.children[this.numberMax].setAttribute("id", "space");
            } else {
                console.log("dead end");
            }
        }
    }

    iterateProp() {
        const gameSecChildren = document.querySelector(".game-container").children;

        for (let i = (this.selectedRows - 1); i < gameSecChildren.length; i += this.selectedRows) {
            gameSecChildren[i].setAttribute("title", "");
        }

        for (let i = 0; i < gameSecChildren.length; i += this.selectedRows) {
            gameSecChildren[i].classList.add("stopTag");
        }
    }

    checkSorted() {
        const gameSec = document.querySelector(".game-container");
        const youWin = document.querySelector("#you-win");
        const youWinImg = document.querySelector("main img");

        for (let i = 0; i < gameSec.children.length - 1; i++) {
            if (Number(gameSec.children[i].textContent) !== i + 1) {
                youWin.textContent = "Incorrect puzzle :(";
                youWin.style.display = "inline-block";
                youWin.style.color = "red";
                break;
            } else if (Number(gameSec.children[i].textContent) === gameSec.children.length - 1) {
                youWin.style.display = "inline-block";
                youWin.style.color = "goldenrod";
                youWin.textContent = "You win!";
                youWinImg.style.display = "inline-block";
            }
        }
    }
    randomMize(val) {
        let newSet = new Set();
        val = Math.pow(val, 2);

        let i = 1;
        while (i != 0) {
            let newVal = Math.floor(Math.random() * ((val) - 1)) + 1;
            if (newSet.has(newVal)) {
                newVal = Math.floor(Math.random() * ((val) - 1)) + 1;
            } else {
                newSet.add(newVal);
            }

            if (newSet.size === val - 1) {
                i = 0;
                break;
            }
        }

        return newSet;
    }

    playClickSound() {
        for(let i = 0; i < this.allButtons.length; i++){
            this.allButtons[i].addEventListener("click", () => {
                this.clickButtonSound.play();
            })
        }
    }

    endAndStartTimer() {
        let sec = 60;
        let timerMin = this.timeLeftMin;

        //var millisecBeforeRedirect = 10000; 
        const timer = document.querySelector("#time-left #time-min");
        const timerSec = document.querySelector("#time-left #time-sec");
        const youLose = document.querySelector("#you-lose");

        timer.textContent = timerMin;
        --timerMin;
        let timerInterval = window.setInterval(
            function () {
                timer.textContent = timerMin;
                if (sec == 0) {
                    if (timerMin == 0) {
                        youLose.style.backgroundColor = "d3d3d373";
                        youLose.style.display = "grid";
                        window.clearInterval(timerInterval);
                        console.log("You lose");
                    } else {
                        timerMin--;
                        timer.textContent = timerMin;
                        sec = 60;
                    }
                } else {
                    sec--;
                    timerSec.textContent = sec;
                }
            }, 1000);
    }
}

const start = new App();
start.keyPress();
start.playClickSound();
const body = document.querySelector("body");

// window.addEventListener("load", () => {
//     let mySet = start.randomMize(4);

//     mySet = Array.from(mySet);
//     const gameSec = document.querySelector(".game-container");
//     mySet.forEach((ele, index) => {
//         gameSec.children[index].textContent = ele; 
//     });
// })