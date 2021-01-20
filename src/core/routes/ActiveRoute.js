export class ActiveRoute {
  static get path() { // todo: для чего нужно поле static?
    return window.location.hash.slice(1)
  }

  static get mainPageRoute() {
    return this.path.split('/')[0]
  }

  static get param() {
    return this.path.split('/')[1]
  }

  static navigate(path) {
    window.location.hash = path // изменяем url на то,
    // что после хэша (.../# + path)
  }
}
