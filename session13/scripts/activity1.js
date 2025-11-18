'use strict';

const inputs = [...document.querySelectorAll('input')];
const [firstName, lastName, address, city, zip, state, email, phone, dateBirth] = inputs;

const btn = document.querySelector('.button');

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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) showError(email, 'Enter a valid email address.');
  else hideError(email);

  const phonePattern = /^\d{3}\d{3}\d{4}$/;
  if (!phonePattern.test(phone.value.trim())) showError(phone, 'Phone must be 1234567890.');
  else hideError(phone);

  if (!dateBirth.value) showError(dateBirth, 'Please select your date of birth.');
  else hideError(dateBirth);
}

inputs.forEach(input => {
  input.addEventListener('input', validateForm);
});

btn.addEventListener('click', function (e) {
  if (!document.querySelector('form').checkValidity()) {
    e.preventDefault();
    validateForm();
  }
});
