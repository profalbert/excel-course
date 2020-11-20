
const CODES = {
  A: 65,
  Z: 90
}

const toCell = (col, row) => {
  const selectedCell = (col.charCodeAt() === CODES.A) && (row === 1)
  return `
    <div class="cell ${selectedCell ? 'selected' : ''}" contenteditable="true">${col}${row}</div>
  `
}

const toColumn = (col) => {
  return `
    <div class="column">${col}</div>
  `
}

const createRow = (content, index) => {
  return `
    <div class="row">
      <div class="row_info">${index > 0 ? index : ''}</div>
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('') 
      .map(toChar)
      .map((el) => toCell(el, i + 1))
      .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}