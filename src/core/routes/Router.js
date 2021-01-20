import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'


export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear()

    const Page = ActiveRoute.mainPageRoute === 'excel'
      ? this.routes['excel']
      : this.routes['dashboard']
    this.page = new Page(ActiveRoute.param, 56)

    this.$placeholder.append(this.page.getRoot())
    // this.$placeholder.html(this.page.getRoot().html()) // todo: почему этот вариант не работает?

    this.page.useAfterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}