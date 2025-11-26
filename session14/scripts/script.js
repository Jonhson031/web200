'use strict';


const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const zip = document.querySelector('#zip');
const state = document.querySelector('#state');
const inputs = [firstName, lastName, address, city, zip, state];
const btn = document.querySelector('.button');
const btnOpen = document.querySelector('.button-open');
let object = {};
inputs.forEach(input => {
  const err = document.createElement('span');
  err.classList.add('error');
  err.style.color = 'red';
  err.style.display = 'none';
  err.style.fontSize = '0.9rem';
  err.style.marginTop = '4px';
  input.insertAdjacentElement('afterend', err);
});

function validateForm() {

  function showError(input, message) {
    const err = input.nextElementSibling;
    err.textContent = message;
    err.style.display = 'block';
  }

  function hideError(input) {
    const err = input.nextElementSibling;
    err.style.display = 'none';
  }

  if (firstName.value.trim().length < 2) showError(firstName, 'First name must be at least 2 characters.');
  else hideError(firstName);

  if (lastName.value.trim().length < 2) showError(lastName, 'Last name must be at least 2 characters.');
  else hideError(lastName);

  if (address.value.trim().length < 5) showError(address, 'Address must be at least 5 characters.');
  else hideError(address);

  if (city.value.trim().length < 2) showError(city, 'City must be at least 2 characters.');
  else hideError(city);

  if (state.value.trim().length !== 2) showError(state, 'State must be 2 letters (ex: IL).');
  else hideError(state);

  if (zip.value.trim().length !== 5) showError(zip, 'ZIP code must be 5 digits.');
  else hideError(zip);
}

inputs.forEach(input => {
  input.addEventListener('input', validateForm);
});
btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!document.querySelector('form').checkValidity()) {
    validateForm();
    return;
  }
  object = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    state: state.value,
    zip: zip.value,
  }
  document.querySelectorAll('input').forEach(input => input.value = '');
  const myJSON = JSON.stringify(object);
  localStorage.setItem('object', myJSON);
  btnOpen.style.display = 'block';
});
btnOpen.addEventListener('click', function(e){
  window.open('indexenv.html');
})