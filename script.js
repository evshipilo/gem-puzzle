
const body = document.querySelector('body');
const arrOfItemValues = [];
// let arrOfItemValuesStraight = [];
const numOfItems = 9;
let arrOfItems = [];
let clickItemLeft;
let clickItemTop;
let emptyItemLeft;
let emptyItemTop;

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
  // [clickItemLeft] = evt.target.style.left.split('%');
  // [clickItemTop] = evt.target.style.top.split('%');
  // [emptyItemLeft] = emptyItem.style.left.split('%');
  // [emptyItemTop] = emptyItem.style.top.split('%');

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
    const event = evt;
    event.target.style.left = `${emptyItemLeft}%`;
    event.target.style.top = `${emptyItemTop}%`;
    emptyItem.style.left = `${clickItemLeft}%`;
    emptyItem.style.top = `${clickItemTop}%`;
  }
});

let drugItem;
let topPointOfItemClick;
let leftPointOfItemClick;

puzzleDiv.addEventListener('mousedown', (evt) => {
  const emptyItem = document.querySelector(`.item${numOfItems}`);
  [clickItemLeft] = evt.target.style.left.split('%');
  [clickItemTop] = evt.target.style.top.split('%');
  [emptyItemLeft] = emptyItem.style.left.split('%');
  [emptyItemTop] = emptyItem.style.top.split('%');

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
    drugItem = evt.target;
    drugItem.style.zIndex = '11';
    drugItem.style.transition = 'none';
    topPointOfItemClick = evt.offsetY;
    leftPointOfItemClick = evt.offsetX;
    const event = evt;
    event.target.ondragstart = function () {
      return false;
    };
  }
});

document.addEventListener('mousemove', (event) => {
  if (drugItem) {
    drugItem.style.left = `${((event.pageX - puzzleDiv.offsetLeft) / (puzzleWidth * 0.01))
    - (leftPointOfItemClick / ((puzzleWidth * 0.01)))}%`;
    drugItem.style.top = `${((event.pageY - puzzleDiv.offsetTop) / (puzzleWidth * 0.01))
    - (topPointOfItemClick / ((puzzleWidth * 0.01)))}%`;
  }
});

puzzleDiv.addEventListener('mouseup', () => {
  if (drugItem) {
    drugItem.style.zIndex = '10';
    drugItem.style.transition = 'all 0.3s';
    drugItem = null;
  }
});
