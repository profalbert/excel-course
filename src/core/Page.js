export class Page {
  constructor(params, kek) {
    this.params = params
    this.kek = kek
  }

  getRoot() {
    throw new Error('Method getRoot should be implemented')
  }

  useAfterRender() {

  }

  destroy() {

  }
}
