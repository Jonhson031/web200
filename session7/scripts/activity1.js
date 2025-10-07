const button = document.querySelector('.button');
let result;
let output = '';
button.addEventListener('click', function () {
    let inputNumber = document.querySelector('.input-number').value;
    let inputExpression = document.querySelector('.input-expressions').value;
    for (let i = 1; i <= inputExpression; i++){
        result = inputNumber * i;
        output += (`${inputNumber} * ${i} = ${result} <br>`);
        console.log(inputExpression);
        console.log(i)
    }
    document.querySelector('.text').innerHTML = output;
})  


