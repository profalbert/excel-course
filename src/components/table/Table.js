import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHandler } from "./table.resize"
import { shouldResize } from "./table.functions"

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

  onMousedown(event) {
    if (shouldResize(resize)) {
      resizeHandler(this.$root, event)
    }
  }
  
  // зачем нужны тогда события 'click', 'mousemove'???
  // onClick() {
  //   // console.log('click')
  // }

  // onMousemove(event) {
  //   // console.log(event)
  // }
}