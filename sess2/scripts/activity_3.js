const btnCalculate = document.querySelector('.button');
btnCalculate.addEventListener('click', function () {
    const inputDistance = document.getElementById('input__distance').value;
    if (inputDistance > 0){
        document.querySelector('.result__yards').innerHTML = Math.round(inputDistance * 1760);
        document.querySelector('.result__feet').innerHTML = Math.round(inputDistance * 5280);
        document.querySelector('.result__inches').innerHTML = Math.round(inputDistance * 63360);
        document.querySelector('.result__kilometers').innerHTML = Math.round(inputDistance * 1.6);
        document.querySelector('.result__meters').innerHTML = Math.round(inputDistance * 1609);
        document.querySelector('.result__centimeters').innerHTML = Math.round(inputDistance * 1609 * 100);
    }
})