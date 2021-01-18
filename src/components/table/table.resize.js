import { $ } from "@core/dom"
import { onRowOrColResize } from "./table.functions"

export const resizeHandler = ($root, event) => {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    // const $parent = $resizer.$el.parrentNode // bad
    // const $parent = $resizer.$el.closest('.column') // better but still bad
    const $parent = $resizer.closest('[data-type="resizable"]') // Метод 
    // Element.closest() возвращает ближайший родительский элемент 
    // (или сам элемент), который соответствует заданному CSS-селектору 
    // или возвращает null, если таковых элементов вообще нет.
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value
  
    $resizer.css({
      opacity: 1,
    })
  
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`) // выносим 
    // поиск элементов за событие onmousemove, тем самым не ищем их каждый раз заново, 
    // что положительно сказывается на производительности

    document.onmousemove = e => { // todo: почему document а не onMousemove?
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else if (type === 'row') {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }        
    }
  
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      onRowOrColResize(type, $parent, value, cells)

      resolve({
        id: +$parent.data[type],
        value,
        type,
      }) 
      
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })           
    }
  })  
}