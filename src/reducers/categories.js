import Do from '../actions/types'

export const categories = (state = [], action) => {
  switch (action.type) {
    case Do.CATEGORIES:
      return [...action.categories]
    case Do.CATEGORY:
      let category = {name: action.name, path: action.path}
      return state.concat(category)
    default:
      return state
  }
}

export const category = (state = {}, action) => {
  if (action.type === Do.CATEGORY) {
    let {name} = action
    return {name, category}
  } else {
    return state
  }
}