import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@core/utils'
import {normalizeInitState} from '@/redux/initialState'
import {debounce} from '@core/utils'
import {Page} from '@core/Page';
import {storageName} from '@core/utils'


export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString()
    const localStorageState = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitState(localStorageState))
    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  useAfterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
