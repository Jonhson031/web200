'use strict';
const cartBtnOpen = document.querySelector('.header__cart');
const orderList = document.querySelector('.order__list');
const cartWindow = document.querySelector('.cart');
const overlay = document.querySelector('.overlay')
const cartBtnClose = document.querySelector('.cart__button-close');
const cartCounter = document.querySelector('.cart__counter');
const cartList = document.querySelector('.cart__list');
const customize = document.querySelector('.customize');
const customizeBtnClose = document.querySelector('.customize__button-close');
const customizeBtnAdd = document.querySelector('.customize__button');
const buttonCheckoutCart = document.querySelector('.cart__button-checkout')

const removeActive = function () {
    cartWindow.classList.remove('active');
    overlay.classList.remove('active');
    customize.classList.remove('active');
}

// Open cart
cartBtnOpen?.addEventListener('click', function (e) {
    e.preventDefault();
    cartWindow.classList.add('active');
    overlay.classList.add('active');
    renderCart();
})
cartBtnClose?.addEventListener('click', function (e) {
    e.preventDefault();
    removeActive();
})
overlay?.addEventListener('click', function () {
    removeActive();
})

// Hide modal by esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        removeActive();
    }
});

// (modal state will be used to collect selections)
let currentProduct = null;
let modalState = null;



// Cart + customize
function updateCart(productInfo) {
    cartCounter.innerText++;
    localStorage.setItem("cartCounter", cartCounter.innerText);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if same product already exists in cart
    let existingItem = cart.find(item =>
        item.title === productInfo.title &&
        item.size === productInfo.size &&
        item.ingridients === productInfo.ingridients
    );
    if (existingItem) {
        existingItem.counter = Number(productInfo.counter) + Number(existingItem.counter);
    } else {
        cart.push(productInfo);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartSummary();
}

window.addEventListener('click', function (e) {
    const buttonAdd = e.target.closest('.order__button');
    const customizeButton = e.target.closest('.order__customize');

    if (buttonAdd) {
        e.preventDefault();
        const product = buttonAdd.closest('.order__item');
        const productInfo = {
            title: product.querySelector('h2').innerText,
            size: product.querySelector('.order__size').innerText,
            ingridients: `${product.querySelector('.order__ingridients').innerText}, Classic Hand tossed`,
            price: parseFloat(product.querySelector('.order__price').innerText.slice(1)),
            counter: 1,
        }
        updateCart(productInfo);
    }

    if (customizeButton) {
        e.preventDefault();
        const totalPriceElement = document.querySelector(".customize__total span");
        const product = customizeButton.closest('.order__item');
        customize.classList.add('active');
        overlay.classList.add('active');

        // set current product and reset form
        currentProduct = {
            title: product.querySelector('.order__title').textContent,
            basePrice: 0,
            ingridientsText: product.querySelector('.order__ingridients') ? product.querySelector('.order__ingridients').innerText : ''
        };
        customize.querySelector('.customize__title').innerText = currentProduct.title;
        document.querySelectorAll('input[name="customize__size"], input[name="customize__crust"], input[name="customize__adds"]').forEach(i => i.checked = false);

        // pre-select defaults: Medium size and Classic crust
        const defaultSize = document.getElementById('customize__size-medium');
        const defaultCrust = document.getElementById('customize__crust-classic');
        if (defaultSize) defaultSize.checked = true;
        if (defaultCrust) defaultCrust.checked = true;

        // initialize modal state and compute initial total using label texts/prices
        modalState = { size: '', sizePrice: 0, crust: '', crustPrice: 0, toppings: [], toppingsPrice: 0, total: currentProduct.basePrice };

        // size
        if (defaultSize) {
            const sizePriceEl = defaultSize.closest('label').querySelector('.customize__section--price');
            modalState.size = defaultSize.value;
            modalState.sizePrice = sizePriceEl ? parseFloat(sizePriceEl.textContent.replace('$', '').trim()) : 0;
        }
        // crust
        if (defaultCrust) {
            const crustLabel = defaultCrust.closest('label').querySelector('.customize__section--size');
            const crustPriceEl = defaultCrust.closest('label').querySelector('.customize__section--price');
            modalState.crust = crustLabel ? crustLabel.textContent : '';
            modalState.crustPrice = crustPriceEl ? parseFloat(crustPriceEl.textContent.replace('$', '').replace('+', '').trim()) : 0;
        }

        modalState.total = (currentProduct.basePrice || 0) + (modalState.sizePrice || 0) + (modalState.crustPrice || 0);
        totalPriceElement.textContent = `$${modalState.total.toFixed(2)}`;
    }
})

// close customize modal
customizeBtnClose?.addEventListener('click', function (e) {
    e.preventDefault();
    removeActive();
    currentProduct = null;
    modalState = null;
});

// update modal state and total on change
customize?.addEventListener('change', function () {
    if (!currentProduct) return;
    const totalPriceElement = document.querySelector(".customize__total span");

    // size
    const sizeInput = document.querySelector('input[name="customize__size"]:checked');
    if (sizeInput) {
        // modalState.size = sizeInput.closest('label').querySelector('.customize__section--size').textContent;
        modalState.size = sizeInput.value;
        const priceEl = sizeInput.parentElement.querySelector('.customize__section--price');
        modalState.sizePrice = priceEl ? parseFloat(priceEl.textContent.replace('$', '').trim()) : 0;
    } else {
        modalState.size = '';
        modalState.sizePrice = 0;
    }

    // crust
    const crustInput = document.querySelector('input[name="customize__crust"]:checked');
    if (crustInput) {
        modalState.crust = crustInput.closest('label').querySelector('.customize__section--size').textContent;
        const priceEl = crustInput.parentElement.querySelector('.customize__section--price');
        modalState.crustPrice = priceEl ? parseFloat(priceEl.textContent.replace('$', '').replace('+', '').trim()) : 0;
    } else {
        modalState.crust = '';
        modalState.crustPrice = 0;
    }

    // toppings
    const toppingInputs = document.querySelectorAll('input[name="customize__adds"]:checked');
    modalState.toppings = [...toppingInputs].map(t => t.parentElement.querySelector('.customize__section--size').textContent.replace('Add', '').trim());
    modalState.toppingsPrice = 0;
    toppingInputs.forEach(t => {
        const priceEl = t.parentElement.querySelector('.customize__section--price');
        if (priceEl) modalState.toppingsPrice += parseFloat(priceEl.textContent.replace('$', '').replace('+', '').trim());
    });

    modalState.total = (currentProduct.basePrice || 0) + (modalState.sizePrice || 0) + (modalState.crustPrice || 0) + (modalState.toppingsPrice || 0);
    totalPriceElement.textContent = `$${modalState.total.toFixed(2)}`;
});

// add customized item to cart
customizeBtnAdd?.addEventListener('click', function (e) {
    e.preventDefault();
    if (!currentProduct || !modalState) return;
    if (!modalState.size || !modalState.crust) return; // require selections

    const customizationInfo = {
        title: currentProduct.title,
        size: modalState.size,
        ingridients: `${currentProduct.ingridientsText}${modalState.toppings.length ? ', ' + modalState.toppings.join(', ') : ''}${modalState.crust ? ', ' + modalState.crust : ''}`,
        price: modalState.total,
        counter: 1,
    }

    updateCart(customizationInfo);
    removeActive();
    currentProduct = null;
    modalState = null;
});

// Render Cart
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart__list");
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        cartContainer.innerHTML += `
                    <li class="cart__item">
                        <h2 class="cart__item-title order__title">${item.title}</h2>
                        <p class="cart__description order__description">
                            <span class="order__size">${item.size}</span> |<span class="order__ingridients">
                                ${item.ingridients}
                            </span>
                        </p>
                        <div class="cart__bottom order__bottom">
                            <div class="cart__price order__price">$${item.price}</div>
                            <button onclick="removeCartItem('${item.title}', '${item.size}', '${item.ingridients}')" class="cart__remove">Remove</button>
                            <div class="cart__item-quantity">
                                <div onclick="decreaseQuantity('${item.title}', '${item.size}', '${item.ingridients}')" class="cart__item-substract"></div>
                                <div class="cart__item-total">${item.counter}</div>
                                <div onclick="increaseQuantity('${item.title}', '${item.size}', '${item.ingridients}')" class="cart__item-add"></div>
                            </div>
                        </div>
                    </li>`;
    })
    const totalItems = cart.reduce((sum, item) => Number(sum) + Number(item.counter), 0);
    cartCounter.innerText = totalItems;
    localStorage.setItem("cartCounter", totalItems);
}
if (cartList) {
    renderCart();
    cartSummary();
}

// Remove items from cart
function removeCartItem(title, size, ingridients) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !(item.title === title && item.size === size && item.ingridients === ingridients));
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    cartSummary();
}

// Decrease quantity by 1
function decreaseQuantity(title, size, ingridients) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.title === title && i.size === size && i.ingridients === ingridients);
    if (item) {
        if (item.counter > 1) {
            item.counter -= 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    cartSummary();
}

// Increase quantity by 1
function increaseQuantity(title, size, ingridients) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.title === title && i.size === size && i.ingridients === ingridients);
    if (item) {
        item.counter++;
        console.log(item.counter)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    cartSummary()
}

// Cart summary
function cartSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    let subTotal = 0;
    let tax = 0;
    cart.forEach(item => {
        subTotal += Number(item.price * item.counter);
        tax += subTotal * 10 / 100;
        totalPrice = subTotal + tax;
    });

    document.querySelector('.cart__summary-subtotal--price').innerText = '$' + subTotal.toFixed(2);
    document.querySelector('.cart__summary-tax--price').innerText = '$' + tax.toFixed(2);
    document.querySelector('.cart__summary-total--price').innerText = '$' + totalPrice.toFixed(2);
}

buttonCheckoutCart?.addEventListener('click', function (e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length < 1) e.preventDefault();
    cartSummary();
})
document.querySelector('.checkout')?.addEventListener('load', cartSummary());


// Save user's info
const checkoutButton = document.querySelector('.checkout__button');
const userName = document.getElementById('checkout__name');
const userAddress = document.getElementById('checkout__address');
const userCity = document.getElementById('checkout__city');
const userState = document.getElementById('checkout__state');
const userZip = document.getElementById('checkout__zip');
const userPhone = document.getElementById('checkout__phone');
let userInfo = {};

checkoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    userInfo = {
        userName: userName.value,
        userAddress: userAddress.value,
        userCity: userCity.value,
        userState: userState.value,
        userZip: userZip.value,
        userPhone: userPhone.value,
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
})