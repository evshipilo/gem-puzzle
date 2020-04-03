
const body = document.querySelector('body');
const arrOfItemValues = [];
// let arrOfItemValuesStraight = [];
const numOfItems = 9;
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

puzzleDiv.addEventListener('click', (evt) => {
  const emptyItem = document.querySelector(`.item${numOfItems}`);
  const [clickItemLeft] = evt.target.style.left.split('%');
  const [clickItemTop] = evt.target.style.top.split('%');
  const [emptyItemLeft] = emptyItem.style.left.split('%');
  const [emptyItemTop] = emptyItem.style.top.split('%');

  const numOfClickedItem = Math.round((clickItemLeft * Math.sqrt(numOfItems)
      + clickItemTop * numOfItems) / 100) + 1;
  const numOfEmptyItem = Math.round((emptyItemLeft * Math.sqrt(numOfItems)
      + emptyItemTop * numOfItems) / 100) + 1;

  if (numOfClickedItem + Math.sqrt(numOfItems) === numOfEmptyItem
      || numOfClickedItem - Math.sqrt(numOfItems) === numOfEmptyItem
      || ((numOfClickedItem + 1) === numOfEmptyItem
          && (numOfEmptyItem - 1) % (Math.sqrt(numOfItems)) !== 0)
      || ((numOfClickedItem - 1) === numOfEmptyItem
          && (numOfEmptyItem) % (Math.sqrt(numOfItems)) !== 0)
  ) {
    evt.target.style.left = `${emptyItemLeft}%`;
    evt.target.style.top = `${emptyItemTop}%`;
    emptyItem.style.left = `${clickItemLeft}%`;
    emptyItem.style.top = `${clickItemTop}%`;
  }
});
