import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener{
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    // this.storeSub = null

    this.prepare()
  }

  // настраиваем наш компонент до init 
  prepare() {
    
  }

  // возвращает шаблон компонента
  toHTML() {
    return ''
  }
  
  // уведомляем слушателей про событие event 
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на event 
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // диспатчим какие либо события прямо в store
  $dispatch(action) {
    this.store.dispatch(action)
  }

  // сюда приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // подписываемся на обновление store
  // $subscribe(fn) {
  //   // this.storeSub = this.store.subscribe(fn) // todo: доделать или удалить
  //   this.store.subscribe(fn)
  // }

  // достаем state из store
  $getState() {
    return this.store.getState()
  }

  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // удаляем компонент
  // удаляем слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    // this.storeSub.unsubscribe()
  }
}
