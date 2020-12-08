
const APP_ELEMENT = document.querySelector('.app');

function getColumnHtml(column) {
  return `<div class="column">
    <div class="column__title">${column.title}</div>     
    <div class="column__cards" data-id="${column.id}" ondrop="drop(event, this)" ondragover="allowDrow(event )"></div>     
  </div>`;
}

function getCardHtml(card, columns) {
  debugger
  return `<div class="card" draggable="true" ondragstart="drag(event)">
    <div class="card__top">
      <div class="card__title">${card.title}</div>
      <div class="card__id">${card.id}</div>
    </div>
    <div class="card__description">${card.description}</div>
    <div class="card__bottom">
      <div class="card__left">
        <div class="card__column-list">${getColumnDropDown(columns, card.columnId)}</div>
      <div class="card__right">
        <div class="card__reports">
          <div class="card__reporter">${card.reportId}</div>
          <div class="card__reporter-img">${card.reportId}</div>
        </div>
        <div class="card__assigns">
          <div class="card__assign">${card.assignId}</div>
          <div class="card__assign-img">${card.assignId}</div>
        </div>
      </div>
    </div>
  </div>`;
}

function getColumnDropDown(columns, currentColumnId) {
  let optionHtml = columns.map((column) => {
      let isSelect = currentColumnId === column.id;
      let selectAttr = isSelect ? 'selected' : '';
    return `<option value="${column.id}" ${selectAttr}>${column.title}</option>`;
  });
  return `<select class="card__select">${optionHtml}</select>`
}

function getAllColumns() {
  return COLUMNS.map(column => getColumnHtml(column)).join('');
}

function getCardsHtml(cards, columns) {
  return cards.map(card => getCardHtml(card, columns)).join('');
}

function getCardsByColumnId(columnId, columns) {
  let cards = CARDS.filter(card => card.columnId === columnId);
  return getCardsHtml(cards, columns);
}

function setCardsToColumns() {
  COLUMNS.forEach(column => {
    let cardsHtml = getCardsByColumnId(column.id, COLUMNS);
    let cardListElement = document.querySelector(`.column__cards[data-id="${column.id}"]`);
    cardListElement.innerHTML = cardsHtml;
  });
}

function main() {
  APP_ELEMENT.innerHTML = getAllColumns();
  setCardsToColumns();
}

main();

let arr =[];
function allowDrow(e) {
  e.preventDefault();
}
function drag(e) {
  e.dataTransfer.setData('text',e.target.id);
  e.dataTransfer.setData('content',e.target.textContent);

}
function drop(e, block) {
  debugger
  e.preventDefault();

  let data = e.dataTransfer.getData('text');
  let content = e.dataTransfer.getData('content');

  if(block.id === '1') {
    if(arr.indexOf('content') == -1) {
      arr.push(content)
    }
  }
  if(block.id === '2') {
    if(arr.indexOf('content') != -1) {
      arr.splice(arr.indexOf(content), 1)
    }
  }
  block.appendChild(document.getElementById(data));

  console.log(drop);
}
