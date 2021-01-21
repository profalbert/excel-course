import {storage} from '@core/utils'


const toRecords = (key) => {
  const model = storage(key)
  const id = key.split(':')[1]
  const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}
  const locales = {nu: 'arab', ca: 'roc'}
  const date = new Date(Number(model.openedDate)).toLocaleString(locales, options).split(', ').join(', ')
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.tableTitle}</a>
      <strong>${date}</strong>
    </li>
  `
}


export const getAllKeys = () => {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}


export const createRecordsTable = () => {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Opening date</span>
    </div>

    <ul class="db__list">
      ${keys.map(toRecords).join('')}
    </ul>
  `
}


