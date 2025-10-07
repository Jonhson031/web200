let start = parseInt(prompt("Enter the starting value:"));
let end = parseInt(prompt("Enter the ending value:"));

let header = "  "; 
for (let col = start; col <= end; col++) {
  header += `${col} `;
}
console.log(header);
for (let row = start; row <= end; row++) {
  let line = `${row} `;
  for (let col = start; col <= end; col++) {
    line += `${row * col} `; 
  }
  console.log(line + ' ');
}
