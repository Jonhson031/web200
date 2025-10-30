'use strict';
const books = [];

document.getElementById("book-btn").addEventListener("click", function () {
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("book-year").value.trim();
    const publisher = document.getElementById("book-publisher").value.trim();
    const city = document.getElementById("book-city").value.trim();
    const state = document.getElementById("book-state").value.trim();
    const format = document.getElementById("format").value;
    if (!title || !author || !year || !publisher || !city || !state) {
        alert("Please fill in all fields!");
        return;
    }
   
    const book = { title, author, year, publisher, city, state, format };
    books.push(book);
    books.sort((a, b) => a.author.localeCompare(b.author));
    displaySorted();

    document.querySelectorAll("input").forEach(input => input.value = "");
});
function displaySorted() {
    const list = document.querySelector(".book-list");
    list.innerHTML = "";

    books.forEach(book => {
        let formatted = "";

        if (book.format === "APA") {
            formatted = `${book.author} (${book.year}). <i>${book.title}</i>. ${book.city}, ${book.state}: ${book.publisher}.`;
        } else {
            formatted = `${book.author}. <i>${book.title}</i>. ${book.city}, ${book.state}: ${book.publisher}, ${book.year}.`;
        }

        const li = document.createElement("li");
        li.innerHTML = `${formatted} <br><small>(${book.format} format)</small>`;
        list.appendChild(li);
    });
}