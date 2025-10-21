'use strict';
const datePicker = document.getElementById("datePicker");

datePicker.addEventListener("change", function () {
    const selectedDate = this.value;
    
    if (selectedDate) {
        const date = new Date(selectedDate + "T00:00:00Z");

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; 
        const day = date.getUTCDate();

        document.getElementById("year").value = year;
        document.getElementById("month").value = month;
        document.getElementById("day").value = day;
    } else {
        document.getElementById("year").value = "";
        document.getElementById("month").value = "";
        document.getElementById("day").value = "";
    }
});