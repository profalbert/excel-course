import { $ } from "@core/dom"
import { Emitter } from "@core/Emitter"

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className) // используем статическую переменную в классе
      const component = new Component($el, componentOptions)
      // // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component
      // }

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    // insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет 
    // полученные узлы (nodes) в DOM дерево в указанную позицию. 
    // Данная функция не переписывает имеющиеся элементы, 
    // что предотвращает дополнительную сериализацию и 
    // поэтому работает быстрее, чем манипуляции с innerHTML.

    // position: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
    // this.$el.insertAdjacentHTML()


    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())

    // setTimeout(()=> {
    //   this.components.forEach(component => component.destroy())
    // }, 1000 * 3)
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}