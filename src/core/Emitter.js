export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей, если они есть
  // table.emit('table:select', {a: 1}) - пример работы emit
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // подписываем на уведомление
  // добавляем нового слушателя
  // formula.subscribe('table:select', () => {}) - пример работы subscribe
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = 
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// const emitter = new Emitter()
// emitter.subscribe('albert', data => console.log('Sub:', data))
// emitter.emit('albert', 42)

// setTimeout(() => {
//   emitter.emit('albert', 'After 2 seconds')
// }, 2000);