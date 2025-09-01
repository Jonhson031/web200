const btnCalculate = document.querySelector('.button');
btnCalculate.addEventListener('click', function () {
    const inputAge = document.getElementById('input__age').value;
    document.querySelector('.result__monthly').innerHTML = inputAge * 12;
    document.querySelector('.result__weekly').innerHTML = inputAge * 52;
    document.querySelector('.result__days').innerHTML = inputAge * 365;
    document.querySelector('.result__hours').innerHTML = inputAge * 8760;
    document.querySelector('.result__minutes').innerHTML = inputAge * 8760 * 60;
    document.querySelector('.result__seconds').innerHTML = inputAge * 8760 * 3600;
})