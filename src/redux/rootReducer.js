import * as reducersTypes from '@/redux/reducersTypes';


export const rootReducer = (state, action) => {
  switch (action.type) {
    case reducersTypes.TABLE_RESIZE:
      const type = action.data.type + 'State'
      return {
        ...state,
        rowState: {...state.rowState},
        colState: {...state.colState},
        [type]: {...state[type], ...getValue(action)}
      }
    case reducersTypes.CHANGE_TEXT:
      return {
        ...state,
        dataState: {...state.dataState, ...getValue(action)},
        currentText: action.data.value,
      }
    case reducersTypes.CURRENT_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }
    case reducersTypes.APPLY_STYLE:
      const value = {...state.stylesState}
      action.data.ids.forEach(id => {
        value[id] = {...value[id], ...action.data.value}
      })
      return {
        ...state,
        stylesState: {...state.stylesState, ...value},
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case reducersTypes.CHANGE_TABLE_TITLE:
      return {
        ...state,
        tableTitle: action.data.value
      }
    case reducersTypes.UPDATE_OPENED_DATE:
      return {
        ...state,
        openedDate: Date.now().toString(),
      }
    default:
      return state;
  }
}


const getValue = (action) => ({[action.data.id]: action.data.value})
