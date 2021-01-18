import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import * as actions from "@/redux/actions"
import { debounce } from "@core/utils";


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableTitle'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
    // при вызове Header.onInput() значение this внутри onInput равно Header,
    // а тк onInput = debounce, то и внутри debounce значение this равно Header (по аналогии)
  }

  toHTML() {
    const tableTitle = this.$getState().tableTitle
    return `
      <input type="text" class="input" value="${tableTitle}">

      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTableTitle({
      value: $target.text()
    }))
  }
}