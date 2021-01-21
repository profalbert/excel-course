import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitState} from '@/redux/initialState'
import {Page} from '@core/page/Page';
import { StateProcessor } from '@core/page/StateProcessor'
import { LocalStorageClient } from '@/shared/LocalStorageClient'


export class ExcelPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
    )
  }

  async getRoot() {
    // делаем await, ибо этот state может приходить асинхронно (с сервера к примеру)
    const loadedState = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitState(loadedState))

    this.storeSub = store.subscribe(this.processor.listen) // todo: как это работает?

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
    this.storeSub.unsubscribe()
  }
}
