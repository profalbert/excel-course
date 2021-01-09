import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <!-- contenteditable - атрибут, который сообщает, что элемент доступен для редактирования пользователем — можно удалять текст и вводить новый -->
      <!-- spellcheck - атрибут, который указывает браузеру проверять или нет правописание и грамматику в тексте. -->
      <div data-type="input" class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  init() {
    super.init() // ???

    this.$formula = this.$root.find('[data-type="input"]')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['']
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:done')
    } 
  }
}