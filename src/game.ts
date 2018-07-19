import * as R from 'ramda';

let gameDiv = document.getElementById("game");
console.log(gameDiv);

let a = Array(10);
let b = R.map(R.always(" "), a);
console.log(a);
console.log(b);