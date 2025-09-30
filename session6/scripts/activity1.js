const button = document.querySelector('.button');
let result;
let output = '';
button.addEventListener('click', function () {
    let inputNumber = document.querySelector('.input-number').value;
    let inputExpression = document.querySelector('.input-expressions').value;
    let i = 1;
    while (i <= inputExpression) {
        result = inputNumber * i;
        output += (`${inputNumber} * ${i} = ${result} <br>`);
        i++;
    }
    document.querySelector('.text').innerHTML = output;
})  