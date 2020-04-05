
const body = document.querySelector('body');
const arrOfItemValues = [];
const numOfItems = 16;
let arrOfItems = [];
let clickItemLeft;
let clickItemTop;
let emptyItemLeft;
let emptyItemTop;
let numOfTurns = 0;
let isStart = false;
let isTimer = false;
function createPuzzleDiv() {
  body.insertAdjacentHTML('afterbegin',
    `<button class="restart">Начать</button>
<div class="info-time">
\t<span>Время игры:</span>
\t<span class="time"></span>
</div>
<div class="info-turns">
\t<span>Количество ходов:</span>
\t<span class="turns">${numOfTurns}</span>
</div>
<div class="puzzle">
</div>`);
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
    puzzleDiv.insertAdjacentHTML('afterbegin',
      `<div class="item${arrOfItemValues[i]}">${arrOfItemValues[i]}</div>`);
  }
  document.querySelector(`.item${numOfItems}`).style.opacity = '0';
  arrOfItems = document.querySelectorAll('.puzzle div');
  setPositionOfItem();
}

generatePuzzleRandom();

function isWin() {
  for (let i = 1; i <= numOfItems; i += 1) {
    const someItem = document.querySelector(`.item${i}`);
    const [someItemLeft] = someItem.style.left.split('%');
    const [someItemTop] = someItem.style.top.split('%');
    const numOfSomeItem = Math.round((someItemLeft * Math.sqrt(numOfItems)
        + someItemTop * numOfItems) / 100) + 1;
    if (i !== numOfSomeItem) return false;
  }
  return true;
}

let second = 0;
let minute = 0;
function timer() {
  const i = setInterval(() => {
    if (!isTimer) { clearInterval(i); }
    second += 1;
    if (second === 60) {
      second = 0;
      minute += 1;
    }
    document.querySelector('.time').innerHTML = `${minute}:${second}`;
  }, 1000);
}

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
  // while (puzzleDiv.firstChild) {
  //   puzzleDiv.removeChild(puzzleDiv.firstChild);
  // }
  // generatePuzzleRandom();
  isTimer = !isTimer;
  if (isTimer) timer();
  isStart = !isStart;
  if (restartButton.innerHTML.toString() === 'Начать') restartButton.innerHTML = 'Пауза';
  else restartButton.innerHTML = 'Начать';
});

puzzleDiv.addEventListener('click', (evt) => {
  if (isStart) {
    numOfTurns += 1;
    document.querySelector('.turns').innerHTML = `${numOfTurns}`;// count of turns
    const emptyItem = document.querySelector(`.item${numOfItems}`);
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
    if (isWin())window.setTimeout(() => alert('Win'), 400);
    else console.log('not win');
  }
});

let drugItem;
let topPointOfItemClick;
let leftPointOfItemClick;

puzzleDiv.addEventListener('mousedown', (evt) => {
  if (isStart) {
    arrOfItems.forEach((item_) => {
      const item = item_;
      item.style.zIndex = '10';
    });
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
  }
});

document.addEventListener('mousemove', (event) => {
  if (isStart) {
    if (drugItem) {
      drugItem.style.left = `${((event.pageX - puzzleDiv.offsetLeft) / (puzzleWidth * 0.01))
      - (leftPointOfItemClick / ((puzzleWidth * 0.01)))}%`;
      drugItem.style.top = `${((event.pageY - puzzleDiv.offsetTop) / (puzzleWidth * 0.01))
      - (topPointOfItemClick / ((puzzleWidth * 0.01)))}%`;
    }
  }
});

puzzleDiv.addEventListener('mouseup', () => {
  if (isStart) {
    if (drugItem) {
      drugItem.style.transition = 'all 0.3s';
      drugItem = null;
    }
  }
});
