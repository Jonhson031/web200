function startGame() {
    let low = 0;
    let high = 100;
    let guesses = 0;
    let guess;
    let response;

    do {
      guess = Math.floor((low + high) / 2);
      guesses++;

      response = prompt("Is your number (h)igher, (l)ower, or (e)qual to " + guess + "?");

      if (response === "h") {
        low = guess + 1; // search higher half
      } else if (response === "l") {
        high = guess - 1; // search lower half
      }
    } while (response !== "e");

    alert("I guessed your number " + guess + " in " + guesses + " tries!");
  }