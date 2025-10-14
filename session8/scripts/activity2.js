let start = parseInt(prompt("Enter the starting value:"));
let end = parseInt(prompt("Enter the ending value:"));

const results = []; // array to hold values

for (let row = start; row <= end; row++) {
  for (let col = start; col <= end; col++) {
    results.push(row * col);
  }
}

// display the table using data from the array
let index = 0;
let header = "   ";
for (let col = start; col <= end; col++) {
  header += `${col} `;
}
console.log(header);

for (let row = start; row <= end; row++) {
  let line = `${row} `;
  for (let col = start; col <= end; col++) {
    line += `${results[index]} `;
    index++;
  }
  console.log(line);
}
