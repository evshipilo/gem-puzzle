
const body = document.querySelector('body');
const arrOfItemValues = [];
const numOfItems = 16;
const arrOfItems = [];
function createPuzzleDiv() {
  body.insertAdjacentHTML('afterbegin', '<div class="puzzle"></div>');
}
createPuzzleDiv();
const puzzleDiv = document.querySelector('.puzzle');
// response puzzle
let puzzleWidth = getComputedStyle(puzzleDiv).width.split('px')[0];
let widthOfItems = puzzleWidth / numOfItems;
puzzleDiv.style.height = `${+puzzleWidth}px`;
window.onresize = function () {
  puzzleWidth = getComputedStyle(puzzleDiv).width.split('px')[0];
  puzzleDiv.style.height = `${+puzzleWidth}px`;
  widthOfItems = puzzleWidth / numOfItems;
};


function makeStraightArrOfItemValues() {
  for (let i = 1; i <= numOfItems; i += 1) {
    arrOfItemValues.push(i);
  }
}
function makeRandomArr() {
  return Math.random() - 0.5;
}
function hideLastItem() {
  const hideItemNumber = arrOfItemValues.length;
  document.querySelector(`.item${hideItemNumber}`).classList.add('hidden');
}
function setPositionOfItem() {
  for
    const itemDiv = item;
    itemDiv.style.width = `${widthOfItems}px`;
    itemDiv.style.height = `${widthOfItems}px`;
  });
}

function generatePuzzleRandome() {
  makeStraightArrOfItemValues();
  arrOfItemValues.sort(makeRandomArr);
  for (let i = 0; i < numOfItems; i += 1) {
    puzzleDiv.insertAdjacentHTML('afterbegin', `
<div class="item${arrOfItemValues[i]}">${arrOfItemValues[i]}</div>`);
  }
  hideLastItem();
  arrOfItems = document.querySelectorAll('.puzzle div');
}
// generatePuzzleRandome(9);
