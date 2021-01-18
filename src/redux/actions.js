import * as reducersTypes from "@/redux/reducersTypes";

export const tableResize = (data) => {
  return {
    type: reducersTypes.TABLE_RESIZE,
    data
  }
}

export const changeText = (data) => {
  return {
    type: reducersTypes.CHANGE_TEXT,
    data
  }
}

export const changeStyles = (data) => {
  return {
    type: reducersTypes.CURRENT_STYLES,
    data
  }
}

export const applyStyle = (data) => {
  return {
    type: reducersTypes.APPLY_STYLE,
    data
  }
}

export const changeTableTitle = (data) => {
  return {
    type: reducersTypes.CHANGE_TABLE_TITLE,
    data
  }
}