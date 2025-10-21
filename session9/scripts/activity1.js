'use strict';
function updateTime() {
    const date = new Date()
    document.querySelector('.display').innerHTML =
        date.getFullYear() + ' year' + '<br>'
        + `${date.getMonth() + 1} month` + '<br>'
        + date.getDate() + ' day' + '<br>'
        + date.getHours() + ' hour' + '<br>'
        + date.getMinutes() + ' minutes' + '<br>'
        + date.getSeconds() + ' seconds';

}
setInterval(updateTime, 1000);