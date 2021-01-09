
export const CODES = {
  A: 65,
  Z: 90
}

const toCell = (indexRow) => {
  return (col, indexCol) => {
    // const selectedCell = (col.charCodeAt() === CODES.A) && (indexRow === 1)
    return `
      <div 
        class="cell" 
        contenteditable="true" 
        data-col="${indexCol + 1}"
        data-id="${indexRow + 1}:${indexCol + 1}"
        data-type="cell"
      >
        ${col}${indexRow + 1}
      </div>
    `
  }
}

const toColumn = (col, indexCol) => {
  return `
    <div class="column" data-col="${indexCol + 1}" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

const createRow = (content, indexRow) => {
  const resize = '<div class="row-resize" data-resize="row"></div>'
  return `
    <div class="row" ${indexRow > 0 ? 'data-type="resizable"' : ''}>
      <div class="row_info">
        ${indexRow > 0 ? indexRow : ''}
        ${indexRow > 0 ? resize : ''}
      </div>
      <div class="row_data">${content}</div>
    </div>
  `
}

const toChar = (_, index) => {
  return String.fromCharCode(CODES.A + index)
}

export const createTable = (rowsCount = 15,) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount) // Декларативный код
    .fill('') 
    .map(toChar)
    .map(toColumn) 
    // .map((el) => {
    //   return toColumn(el)
    // }) - эта запись идентична записи .map(toColumn) 
    .join('') 
    
  rows.push(createRow(cols, 0)) // выносим это из цикла, тк это строка отличается от остальных

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('') 
      .map(toChar)
      .map(toCell(row))
      .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}