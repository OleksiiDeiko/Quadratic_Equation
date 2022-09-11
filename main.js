const fs = require("fs");
const readline = require("readline");

const solve = (data) => {
  let a = data[0],
    b = data[1],
    c = parseFloat(data[2]);
  console.log(`Equation is (${a})x^2 + (${b})x + (${c}) = 0`);
  let d = Math.pow(b, 2) - 4 * a * c;
  let roots = [];
  if (d > 0) {
    let x1 = (-1 * b + Math.sqrt(d)) / (2 * a);
    let x2 = (-1 * b - Math.sqrt(d)) / (2 * a);
    roots.push(x1);
    roots.push(x2);
  } else if (d == 0) {
    let x = (-1 * b) / (2 * a);
    roots.push(x);
  }
  console.log(`There are ${roots.length} roots`);
  for(let root of roots){
    console.log(root);
  }
};

const checkData = (data) => {
  let reg = new RegExp(/-?\d\s-?\d\s-?\d\r\n/);
  let res = reg.exec(data);
  if (res) return true;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const interactiveMode = (number, data) => {
  rl.question(`${number} = `, (res) => {
    if (isNaN(res) === false && res !== " ") {
      data.push(res);
      if (data.length == 1) interactiveMode("b", data);
      else if (data.length == 2) interactiveMode("c", data);
      else {
        rl.close();
        solve(data);
      }
    } else {
      console.log("Valid number expected");
      interactiveMode(number, data);
    }
  });
  return data;
};

const noninteractiveMode = (filename) => {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) throw err;
    if (checkData(data)) solve(data.split(' '));
    else console.log("invalid data");
    process.exit(0);
  });
};

let numbers = [];

if (process.argv.length < 3) {
  console.log("interactive mode");
  numbers = interactiveMode("a", []);
} else {
  let filename = process.argv[2];
  console.log("noninteractive mode");
  noninteractiveMode(filename);
}
