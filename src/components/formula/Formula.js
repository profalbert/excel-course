import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <!-- contenteditable - атрибут, который сообщает, что элемент доступен для редактирования пользователем — можно удалять текст и вводить новый -->
      <!-- spellcheck - атрибут, который указывает браузеру проверять или нет правописание и грамматику в тексте. -->
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim(), this.$root)
  }

  onClick(event) {
    console.log('Formula: onClick', event)
  }
}