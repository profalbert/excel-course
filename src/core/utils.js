export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}


export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}


export const removeStorage = (key) => {
  localStorage.removeItem(key)
}


export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b) // работает только
    // в том случае, если мы используем простые объекты (без new Date, Map, Set и тп)
  }
  return a === b
}


export const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}


export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}


// todo: разобрать полностью функцию debounce (как она работает)
export const debounce = (fn, wait) => { // избавляемся от спама в нашем state (его вызов происходит с задержкой)
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}


export const storageName = (param) => {
  return `excel:${param}`
}


export const preventDefault = (event) => {
  event.preventDefault()
}
