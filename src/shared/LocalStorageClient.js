import {storage, storageName} from '@core/utils'


export class LocalStorageClient {
  constructor(name) { // todo: почему сразу не прокинуть и state, а только name?
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    // return Promise.resolve(storage(this.name)) // todo: как это работает? (что в итоге вернется из метода?)
    return new Promise(resolve => { // делаем искусственную задержку, как при работе с сервером
      const state = storage(this.name)
      const delay = 1500

      setTimeout(() => {
        resolve(state)
      }, delay);
    })
  }
}