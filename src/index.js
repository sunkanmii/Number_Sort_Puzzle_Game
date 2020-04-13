"use strict";

class Button
{
    constructor(){
        this.buttonClick = document.querySelector("#buttonClickSound");
    }

    loader(){

    }
    
    playButtonClick(){
        this.buttonClick.play();
    }
}

const click = new Button();
click.loader();