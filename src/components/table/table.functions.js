import { range } from "@core/utils"
import { parse } from "@core/parse"


export const shouldResize = (event) => {
  return event.target.dataset.resize
}


export const isCell = (event) => {
  return event.target.dataset.type === 'cell'
}


export const matrix = ($target, $current) => {
  const current = $current.id(true)
  const target = $target.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  
  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])

  return ids
}


export const nextSelector = (KEYS, keyCode, {row, col}, rowsCount, colsCount) => {
  const ROWS_MIN_VALUE = 1
  const COLS_MIN_VALUE = 1
  const ROWS_MAX_VALUE = rowsCount
  const COLS_MAX_VALUE = colsCount

  switch (keyCode) {
    case KEYS.ArrowLeft: 
      col = col - 1 < COLS_MIN_VALUE ? COLS_MIN_VALUE : col - 1 
      break;
    case KEYS.ArrowUp:
      row = row - 1 < ROWS_MIN_VALUE ? ROWS_MIN_VALUE : row - 1
      break;
    case KEYS.ArrowRight:
      col = col + 1 > COLS_MAX_VALUE ? COLS_MAX_VALUE : col + 1
      break;
    case KEYS.ArrowDown: 
      row = row + 1 > ROWS_MAX_VALUE ? ROWS_MAX_VALUE : row + 1
      break;  
    default:
      break;
  }

  return `[data-id="${row}:${col}"]`
}


export const initRowsAndColsSize = (state, $root) => {
  let rows = state.rowState,
      cols = state.colState,
      type,
      $parent,
      value,
      cells;

  Object.keys(rows).forEach(key => {
    type = 'row'
    $parent = $root.find(`[data-row="${key}"]`)
    value = rows[key]
    onRowOrColResize(type, $parent, value, cells)
  })
  Object.keys(cols).forEach(key => {
    type = 'col'
    $parent = $root.find(`[data-col="${key}"]`)
    value = cols[key]
    cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    onRowOrColResize(type, $parent, value, cells)
  })
}


export const onRowOrColResize = (type, $parent, value, cells) => {
  if (type === 'col') {
    $parent.css({width: value + 'px'})
    cells.forEach((el) => el.css({width: value + 'px'}))
  } else if (type === 'row') {
    $parent.css({height: value + 'px'})
  }
}


export const initCellsData = (state, $root) => {
  let dataState = state.dataState,
      $cell;

  Object.entries(dataState).forEach(([key, value]) => {
    $cell = $root.find(`[data-id="${key}"]`)
    $cell
      .attr('data-value', value)
      .text(parse(value))
  })
}

