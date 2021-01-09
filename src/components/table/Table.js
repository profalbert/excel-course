import { ExcelComponent } from "@core/ExcelComponent"
import { createTable, CODES } from "./table.template"
import { resizeHandler } from "./table.resize"
import { shouldResize, isCell, matrix, nextSelector } from "./table.functions"
import { TableSelection } from "./TableSelection"
import { $ } from "@core/dom"


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
    return createTable(Table.rowsCount)
  }

  init() {
    super.init() // todo: зачем эта строчка?
    this.selection = new TableSelection()
    const firstRow = 1
    const firstCol = 1
    const $cell = this.$root.find(`[data-id="${firstRow}:${firstCol}"]`)
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) { // выносим общую логику
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
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
    this.$emit('table:input', $(event.target))
  }
  // зачем нужны тогда события 'click', 'mousemove'???  
}
