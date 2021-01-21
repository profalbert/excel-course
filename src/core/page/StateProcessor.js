import { debounce } from "../utils"


export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay) // todo: зачем здесь биндим метод? 
    // и как происходит прокидывание state - разобрать всю цепочку последовательности 
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}