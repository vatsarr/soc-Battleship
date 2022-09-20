
function randomNum(x) {
  return Math.floor(Math.random() * Math.floor(x));
}

function createGrid(size) {
  let grid = [];
  for (x = 0; x < size; x++) {
    grid[x] = [];
    for (y = 0; y < size; y++) {
      grid[x][y] = '🌊';
    }
  }
  return grid;
}

function placeShip(grid, x, y, c) {
  grid[x][y] = c;
}

function printGrid(grid) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let row = i + ' ';
    for (let cell of grid[i]) {
      if (cell == 'O') {
        row += '-';
      } else {
        row += cell + '';
      }
    }
    console.log(row);
  }
}

function createHeaders(size) {
  let result = '  ';
  for (let i = 0; i < size; i++) {
    result += i + ' ';
  }

  return result;
}

function attack(grid, x, y) {
  if (grid[x][y] === '🚢') {
    grid[x][y] = '💥';
    return true;
  }
  else if (grid[x][y] === '🌊') {
    grid[x][y] = '😭';
    return false;
  }
  else if (grid[x][y] === '💥') {
    grid[x][y] = '💥';
    return false;
  }
  else if (grid[x][y] === '😭') {
    grid[x][y] = '😭';
    return false;
  }
  else {
    return false;
  }
}

function placeEnemyships() {
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
}


module.exports = { randomNum, createGrid, placeShip, placeEnemyships, printGrid, createHeaders, attack, };