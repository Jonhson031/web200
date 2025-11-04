'use strict';

const windowHeight = document.querySelector(".window-height");
const windowWidth = document.querySelector(".window-width");
const screenHeight = document.querySelector(".screen-height");
const screenWidth = document.querySelector(".screen-width");
const locationInfo = window.location.href;
document.querySelector('.location').textContent = locationInfo

function updateDisplay() {

    windowHeight.textContent = window.innerHeight;
    windowWidth.textContent = window.innerWidth;

    screenHeight.textContent = screen.height;
    screenWidth.textContent = screen.width;
}


updateDisplay();

window.addEventListener("resize", updateDisplay);

