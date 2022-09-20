const functions = require('./functions');
const isNumber = (number) => /^\d+$/.test(number);
const placeShip = functions.placeShip;
const createGrid = functions.createGrid;
const printGrid = functions.printGrid;
const attack = functions.attack;
const placeEnemyShips = functions.placeEnemyships;

let gridSize = 5;
let enemyShips = gridSize;
let myShips = gridSize;
let minValue = 0;
let maxValue = gridSize - 1;
let enemyGrid = createGrid(gridSize);
let attemptGrid = createGrid(gridSize);
let myGrid = createGrid(gridSize);

//GAME ENGINE

for (i = 0; i < enemyShips; i++) {

  let x = Math.floor(Math.random() * enemyShips);
  let y = Math.floor(Math.random() * enemyShips);
  if (enemyGrid[x][y] !== '🚢') {
    placeShip(enemyGrid, x, y, '🚢');
  }
  else {
    i--;
  }
}

for (let i = 1; i <= myShips; i++) {

  console.log(`- BATTLESHIP -\n`);
  console.log(`------`)
  printGrid(myGrid)
  console.log(`\nYou have ${myShips} ships, enter their coordinates: \n`)
  let x = prompt(`Ship ${i} - enter value X(row): `);
  let y = prompt(`Ship ${i} - enter value Y(column): `);

  if (isNumber(x) && isNumber(y)) {
    if (x >= minValue && x <= maxValue && y >= minValue && y <= maxValue) {
      placeShip(myGrid, x, y, '🚢');
      console.clear();
    }
    else {
      i--;
      console.clear();
      console.log(`Value has to be a number between ${minValue} and ${maxValue}!`);
    }
  }
  else {
    i--;
    console.clear();
    console.log(`Value has to be a number!`);
  }
}

while (enemyShips > 0 && myShips > 0) {

  console.log(`- BATTLESHIP -\n`);
  console.log(`Your ships and hits: \n`)
  printGrid(myGrid);
  console.log(`\nAI game field: \n`)
  printGrid(attemptGrid);
  console.log(`- - - - - - - - - - -\n`);
  let x = prompt('ATTACK: (X)');
  let y = prompt('ATTACK: (Y)');

  let aiX = Math.floor(Math.random() * gridSize);
  let aiY = Math.floor(Math.random() * gridSize);

  if (isNumber(x) && isNumber(y)) {

    if (x >= minValue && x <= maxValue && y >= minValue && y <= maxValue) {

      if (attack(enemyGrid, x, y)) {
        placeShip(attemptGrid, x, y, '💥')
        enemyShips--;
        console.clear();
        console.log(`💥 It's a HIT 💥 `);

        if (enemyShips < 1 && myShips > 0) {
          console.log(`-BATTLESHIP-\n`);
          printGrid(myGrid);
          printGrid(attemptGrid);
          console.log(`🎆 YOU won! 🏆 🎆 `);
        }
      }
      else {
        placeShip(attemptGrid, x, y, '😭')
        console.clear();
      }

      if (enemyShips > 0 && myShips < 1) {
        console.log(`-BATTLESHIP-\n`);
        printGrid(myGrid);
        printGrid(enemyGrid);
        console.log(`🤖 AI won! 😭 `);
      }

      if (attack(myGrid, aiX, aiY)) {
        myShips--;
        console.clear();
      }
    }
    else {
      console.clear();
      console.log(`Value has to be a number between ${minValue} and ${maxValue}!`);
    }
  }
  else {
    console.clear();
    console.log(`Value has to be a number!`);
  }
}