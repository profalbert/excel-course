import { capitalize } from "@core/utils"

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} in not implemented in ${name} Component`)
      }
      this[method] = this[method].bind(this) // переопределяем метод, 
      // и тем самым он всегда будет забиндит на собственный контекст 
      this.$root.on(listener, this[method]) // on() - тоже самое, что и 
      // addEventListener (самописное добавление прослушки событий)
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method]) // .bind() 
      // создает новую функцию, и поэтому он удаляет 
      // по сути другую функцию, а старая остается 
      // и из-за этого очистка прослушивателей событий не работает. 
      // 1 Способ: Решается с помошью сохранения функции в переменной, 
      // но при таком решении мы сможем добавлять только одно событии на элемент. 
      // 2 Способ (более правильный и красивый): переопределить метод 
      // контекста - забиндить метод навсегда 
      // на собственный контекст: this[method] = this[method].bind(this)
    })
  }
}

const getMethodName = (eventName) => {
  return 'on' + capitalize(eventName)
}

