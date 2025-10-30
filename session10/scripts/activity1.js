'use strict';
document.getElementById("book-btn").addEventListener("click", function () {
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("book-year").value.trim();
    const publisher = document.getElementById("book-publisher").value.trim();
    const city = document.getElementById("book-city").value.trim();
    const state = document.getElementById("book-state").value.trim();

    if (!title || !author || !year || !publisher || !city || !state) {
        alert("Please fill in all fields!");
        return;
    }

    const book = {
        title: title,
        author: author,
        year: year,
        publisher: publisher,
        city: city,
        state: state
    };

    const apaFormat = `${book.author} (${book.year}). <i>${book.title}</i>. ${book.city}, ${book.state}: ${book.publisher}.`;

    const list = document.querySelector(".book-list");
    const li = document.createElement("li");
    li.innerHTML = apaFormat;
    list.appendChild(li);

    document.querySelectorAll("input").forEach(input => input.value = "");
});