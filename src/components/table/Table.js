import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "./table.template"

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove'],
    })
  }

  toHTML() {
    return createTable(10)
  }

  onClick() {
    console.log('click')
  }

  onMousedown() {
    console.log('mousedown')
  }

  onMousemove() {
    console.log('mousemove')
  }
}