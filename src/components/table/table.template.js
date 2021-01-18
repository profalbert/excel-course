import { toInlineStyles } from "@core/utils"
import { defaultStyles } from "@/constants"


export const CODES = {
  A: 65,
  Z: 90
}


const toCell = (indexRow, state) => { // todo: убрать state из функции этой
  return (col, indexCol) => {
    // const selectedCell = (col.charCodeAt() === CODES.A) && (indexRow === 1)
    const id = `${indexRow + 1}:${indexCol + 1}`
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })

    return `
      <div 
        class="cell"
        contenteditable="true"
        data-col="${indexCol + 1}"
        data-id="${id}"
        data-type="cell"
        style="${styles}"
      >
        ${col}${indexRow + 1}
      </div>
    `
  }
}


const toColumn = (col, indexCol) => {
  return `
    <div class="column" data-col="${indexCol}" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}


const createRow = (content, indexRow) => {
  const resize = '<div class="row-resize" data-resize="row"></div>'
  return indexRow > 0 
    ? `
        <div class="row" data-row="${indexRow}" data-type="resizable">
          <div class="row_info">
            ${indexRow}
            ${resize}
          </div>
          <div class="row_data">${content}</div>
        </div>
      `
    : `
        <div class="row">
          <div class="row_info">
          </div>
          <div class="row_data">${content}</div>
        </div>
      `
}


const toChar = (_, index) => {
  return String.fromCharCode(CODES.A + index)
}


export const createTable = (rowsCount = 15, state) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount) // Декларативный код
    .fill('')
    .map(toChar)
    .map((col, index) => {
      return toColumn(col, index + 1)
    })
    .join('')
    
  rows.push(createRow(cols, 0)) // выносим это из цикла, тк это строка отличается от остальных

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('') 
      .map(toChar)
      // .map((el, index) => {
      //   return toChar(el, index)
      // }) - эта запись идентична записи .map(toChar) 
      .map(toCell(row, state))
      .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}