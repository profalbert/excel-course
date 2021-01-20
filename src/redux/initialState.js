import {defaultStyles, defaultTabletitle} from '@/constants'


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  currentText: '',
  tableTitle: defaultTabletitle,
  openedDate: Date.now().toString(),
}

export const normalizeInitState = (state) => {
  return {...defaultState, ...state, openedDate: Date.now().toString()}
}
