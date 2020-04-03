
const body = document.querySelector('body');
const arrOfItemValues = [];
const numOfItems = 64;
let arrOfItems = [];
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
  //widthOfItems = puzzleWidth / Math.sqrt(numOfItems);
};
function makeStraightArrOfItemValues() {
  for (let i = 1; i <= numOfItems; i += 1) {
    arrOfItemValues.push(i);
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

function generatePuzzleRandome() {
  makeStraightArrOfItemValues();
  arrOfItemValues.sort(makeRandomArr);
  for (let i = 0; i < numOfItems; i += 1) {
    puzzleDiv.insertAdjacentHTML('afterbegin', `
<div class="item${arrOfItemValues[i]}">${arrOfItemValues[i]}</div>`);
  }
  document.querySelector(`.item${numOfItems}`).classList.add('hidden');
  arrOfItems = document.querySelectorAll('.puzzle div');
  console.log(arrOfItems);
  setPositionOfItem();
}
generatePuzzleRandome();
