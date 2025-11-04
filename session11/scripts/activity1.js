'use strict';

let container = document.querySelector('.display');


[...document.getElementsByTagName("*")].forEach(element => {
  console.log(element.tagName);
  container.innerHTML += `${element.tagName}<br><br>`
});
