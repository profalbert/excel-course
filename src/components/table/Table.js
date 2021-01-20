import {ExcelComponent} from '@core/ExcelComponent'
import {createTable, CODES} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize,
  isCell,
  matrix,
  nextSelector,
  initRowsAndColsSize,
  initCellsData,
} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'


export class Table extends ExcelComponent {
  static className = 'excel__table'
  static rowsCount = 10
  static colsCount = CODES.Z - CODES.A + 1

  constructor($root, options) { // todo: откуда приходит этот $root
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(Table.rowsCount, this.$getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init() // todo: зачем эта строчка?
    initRowsAndColsSize(this.$getState(), this.$root)
    initCellsData(this.$getState(), this.$root)
    const firstRow = 1
    const firstCol = 1
    const $cell = this.$root.find(`[data-id="${firstRow}:${firstCol}"]`)
    this.selectCell($cell)

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })

    // this.$subscribe((state) => console.log('FormulaState', state))
  }

  selectCell($cell) { // выносим общую логику
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.updateTextInStore($cell.data.value)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn('Resize error', error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const {keyCode} = event
    const KEYS = {
      ArrowLeft: 37,
      ArrowUp: 38,
      ArrowRight: 39,
      ArrowDown: 40,
    }
    if (Object.values(KEYS).includes(keyCode)) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(KEYS, keyCode, id, Table.rowsCount, Table.colsCount))
      this.selectCell($next)
    }
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
  // todo: зачем нужны тогда события 'click', 'mousemove'???
}
