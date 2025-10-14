
const button = document.querySelector('.button');

button.addEventListener('click', function () {
    const inputNumber = document.querySelector('.input-number').value;
    const inputExpression = document.querySelector('.input-expressions').value;
    const results = []; // array to hold results
    let output = '';

    for (let i = 1; i <= inputExpression; i++) {
        const result = inputNumber * i;
        results.push(result); // store values only
    }

    // display results from the array
    for (let i = 0; i < results.length; i++) {
        output += `${inputNumber} * ${i + 1} = ${results[i]} <br>`;
    }

    document.querySelector('.text').innerHTML = output;
});
