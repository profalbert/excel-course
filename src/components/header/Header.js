import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {storageName} from '@core/utils'
import {removeStorage} from '@core/utils';


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <div data-button="delete" class="button">
          <i data-button="delete" class="material-icons">delete</i>
        </div>

        <div data-button="exit" class="button">
          <i data-button="exit" class="material-icons">exit_to_app</i>
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

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        removeStorage(storageName(ActiveRoute.param))
        ActiveRoute.navigate('dashboard')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('dashboard')
    }
  }
}
