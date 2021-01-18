export const parse = (value = '') => { // делаем логику вычислений в таблице
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1)).toString()
    } catch(e) {
      console.warn('Skipping parse error', e.message)
    }
  }
  return value
}