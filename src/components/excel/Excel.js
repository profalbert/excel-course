import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'
import * as actions from '@/redux/actions'
import {preventDefault} from '@core/utils'


export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
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

  init() {
    // insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет
    // полученные узлы (nodes) в DOM дерево в указанную позицию.
    // Данная функция не переписывает имеющиеся элементы,
    // что предотвращает дополнительную сериализацию и
    // поэтому работает быстрее, чем манипуляции с innerHTML.

    // position: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
    // this.$el.insertAdjacentHTML()


    if (process.env.NODE_ENV === 'production') { // делаем разное поведение приложения исходя из режима разработки
      document.addEventListener('contextmenu', preventDefault) // в данном случае блокируем правую кнопку мыши при инициализации таблицы
    }

    this.store.dispatch(actions.updateOpenedDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())


    // setTimeout(()=> {
    //   this.components.forEach(component => component.destroy())
    // }, 1000 * 3)
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}
