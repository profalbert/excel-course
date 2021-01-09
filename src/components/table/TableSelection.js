export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) { // $el instanseof DOM === true
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach(($el) => $el.addClass(TableSelection.className))
  }
}