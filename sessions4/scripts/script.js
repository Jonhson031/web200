// Modal Window

const openModal = document.querySelectorAll('.modal-btn');
const closeModal = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const overlayModal = document.querySelector('.overlay-modal');

if (modal) {
    for (let i = 0; i < openModal.length; i++) {
        openModal[i].addEventListener('click', function () {
            document.body.classList.add('lock');
            modal.classList.remove('hidden');
            overlayModal.classList.remove('hidden');
        });
    }

    const addHidden = function () {
        modal.classList.add('hidden');
        overlayModal.classList.add('hidden');
        document.body.classList.remove('lock');
    }

    closeModal.addEventListener('click', addHidden);
    overlayModal.addEventListener('click', addHidden);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            addHidden();
        }
    });
}


// Change 
const select1 = document.getElementById('select1');
const changeInfo = document.getElementById('changeInfo');

select1.addEventListener('change', function (event) {
    changeInfo.textContent = 'You selected: ' + select1.value;
    changeInfo.style = `color: ${select1.value}`;
});

// focus & blur
const input1 = document.getElementById('input1');
const focusInfo = document.getElementById('focusInfo');
const blurInfo = document.getElementById('blurInfo');

input1.addEventListener('focus', function (event) {
    focusInfo.classList.remove('hidden-info');
});

input1.addEventListener('blur', function (event) {
    focusInfo.classList.add('hidden-info');
});

// Copy
const text = document.getElementById('textToCopy');
const message = document.getElementById('copyMessage');
const copyBlock = document.getElementById('copyBlock');

text.addEventListener('copy', function (event) {
    copyBlock.classList.remove('hidden');
    message.textContent = 'You copied some text.';
});
