
const body = document.querySelector('body');
const arrOfItemValues = [];
// let arrOfItemValuesStraight = [];
const numOfItems = 64;
let arrOfItems = [];
let clickedItem;

function createPuzzleDiv() {
  body.insertAdjacentHTML('afterbegin', '<div class="puzzle"></div>');
}

createPuzzleDiv();

const puzzleDiv = document.querySelector('.puzzle');

// response puzzle
let [puzzleWidth] = getComputedStyle(puzzleDiv).width.split('px');// деструктурир присвивание
const widthOfItems = 100 / Math.sqrt(numOfItems);
puzzleDiv.style.height = `${+puzzleWidth}px`;

window.onresize = function () {
  [puzzleWidth] = getComputedStyle(puzzleDiv).width.split('px');
  puzzleDiv.style.height = `${+puzzleWidth}px`;
  // widthOfItems = puzzleWidth / Math.sqrt(numOfItems);
};

function makeStraightArrOfItemValues() {
  for (let i = 1; i <= numOfItems; i += 1) {
    arrOfItemValues.push(i);
    // arrOfItemValuesStraight = arrOfItemValues.slice(0);
  }
}

function makeRandomArr() {
  return Math.random() - 0.5;
}

function setPositionOfItem() {
  let j = 0;
  let k = 0;
  for (let i = 0; i < arrOfItems.length; i += 1) {
    arrOfItems[i].style.width = `${widthOfItems}%`;
    arrOfItems[i].style.height = `${widthOfItems}%`;
    arrOfItems[i].style.top = `${k * widthOfItems}%`;
    arrOfItems[i].style.left = `${j * widthOfItems}%`;
    j += 1;
    if (j === Math.sqrt(numOfItems)) { j = 0; k += 1; }
  }
}

function generatePuzzleRandom() {
  makeStraightArrOfItemValues();
  arrOfItemValues.sort(makeRandomArr);
  for (let i = 0; i < numOfItems; i += 1) {
    puzzleDiv.insertAdjacentHTML('afterbegin', `
<div class="item${arrOfItemValues[i]}">${arrOfItemValues[i]}</div>`);
  }
  document.querySelector(`.item${numOfItems}`).style.opacity = 0;
  arrOfItems = document.querySelectorAll('.puzzle div');
  setPositionOfItem();
}

generatePuzzleRandom();

function getNumberOfClickedItem() {
  for (let i = 0; i < numOfItems; i += 1) {
    if (arrOfItems[i].getAttribute('class').split('item')[1] === clickedItem) return i + 1;
  }
  return false;
}

function getNumberOfEmptyItem() {
  for (let i = 0; i < numOfItems; i += 1) {
    if (+arrOfItems[i].getAttribute('class').split('item')[1] === numOfItems) return i + 1;
  }
  return false;
}

puzzleDiv.addEventListener('click', (evt) => {
  [, clickedItem] = evt.target.getAttribute('class').split('item');// деструктуризация
  arrOfItems = document.querySelectorAll('.puzzle div');
  const numberOfClickedItem = getNumberOfClickedItem();
  const numberOfEmptyItem = getNumberOfEmptyItem();

});
