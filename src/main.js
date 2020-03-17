"use strict"

class App{
    
    constructor(posId){
        this.default = 15;
        this.checkBut = document.querySelector("#checkBut");
        this.checkBut.addEventListener("click", () => {
            this.checkSorted();
        })
    }
    
    keyPress() {
        const space = document.querySelector("space");
        const gameSec = document.querySelector(".game-container");
        const pos = 4;
        let temp = 0;
        const stylesheet = document.styleSheets[0];
        
        document.onkeydown = (event) => {
            if(gameSec.children[this.default + 1] != null && gameSec.children[this.default].hasAttribute("title") === false && event.keyCode === 37){
                
                    gameSec.children[this.default].removeAttribute("id");
                    this.default++;
    
                    temp = gameSec.children[this.default].textContent;
                    gameSec.children[this.default - 1].textContent = temp;
    
                    gameSec.children[this.default].textContent = '';
                    gameSec.children[this.default].setAttribute("id", "space");
            }
            else if(gameSec.children[this.default + 4] != null && event.keyCode === 38){
                gameSec.children[this.default].removeAttribute("id");
                this.default+=4;
    
                temp = gameSec.children[this.default].textContent;
                gameSec.children[this.default - 4].textContent = temp;
    
                gameSec.children[this.default].textContent = '';
                gameSec.children[this.default].setAttribute("id", "space");
            }
            else if(gameSec.children[this.default - 1] != null && gameSec.children[this.default - 1].hasAttribute("title") === false && event.keyCode === 39){
                gameSec.children[this.default].removeAttribute("id");
                this.default-=1;
                
                temp = gameSec.children[this.default].textContent;
                gameSec.children[this.default + 1].textContent = temp;
    
                gameSec.children[this.default].textContent = '';
                gameSec.children[this.default].setAttribute("id", "space");
            }
            else if(gameSec.children[this.default - 4] != null && event.keyCode === 40){
                gameSec.children[this.default].removeAttribute("id");
                this.default-=4;
                
                temp = gameSec.children[this.default].textContent;
                gameSec.children[this.default + 4].textContent = temp;
    
                gameSec.children[this.default].textContent = '';
                gameSec.children[this.default].setAttribute("id", "space");
            }
            else{
                console.log("dead end");
            }
        }
    }

    iterateProp(){
        const gameSecChildren = document.querySelector(".game-container").children;

        for(let i = 3; i < gameSecChildren.length; i+=4){
            gameSecChildren[i].setAttribute("title", "");
        }
    }

    checkSorted(){
        const gameSec = document.querySelector(".game-container");
        const youWin = document.querySelector("#you-win"); 

        for(let i = 0; i < gameSec.children.length - 1; i++){
            if(Number(gameSec.children[i].textContent) !== i + 1){
                youWin.textContent = "Incorrect puzzle";
                youWin.style.display = "inline-block";
                break;
            }
            else if(Number(gameSec.children[i].textContent) === gameSec.children.length - 1){
                youWin.style.display = "inline-block";
                youWin.textContent = "You win!";
            }
        }
    }
}

const start = new App();
start.iterateProp();
start.keyPress();