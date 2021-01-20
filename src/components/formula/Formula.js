import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';


export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'], // добавляем это свойтсво,
      // где будут подписки на определенные поля в state,
      // а не на весь state сразу целиком
      ...options
    })
  }

  toHTML() {
    // contenteditable - атрибут, который сообщает, что элемент доступен для редактирования пользователем — можно удалять текст и вводить новый
    // spellcheck - атрибут, который указывает браузеру проверять или нет правописание и грамматику в тексте.
    return `
      <div class="info">fx</div>
      <div data-type="input" class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  init() { // todo: зачем нужен этот метод?
    super.init() // ???
    this.$formula = this.$root.find('[data-type="input"]')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })

    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })

    // this.$subscribe(state => {
    //   console.log('Formula update', state.currentText)
    //   this.$formula.text(state.currentText)
    // })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
