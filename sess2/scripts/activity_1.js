const btnCalculate = document.querySelector('.button');
btnCalculate.addEventListener('click', function () {
    const inputHours = document.getElementById('input__hours').value;
    const inputRate = document.getElementById('input__rate').value;
    const weeklySalary = Math.round(inputHours * inputRate);
    document.querySelector('.result__weekly').innerHTML = weeklySalary + '$';
    document.querySelector('.result__montly').innerHTML = weeklySalary * 4 + '$';
    document.querySelector('.result__yearly').innerHTML = weeklySalary * 52 + '$';
})