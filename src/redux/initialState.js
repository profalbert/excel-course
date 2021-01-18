import {storage} from '@core/utils'
import { defaultStyles, defaultTabletitle } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  currentText: '',
  tableTitle: defaultTabletitle,
}

export const initialState = {...defaultState, ...storage('excel-state')}