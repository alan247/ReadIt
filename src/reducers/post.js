import Do from '../actions/types'

export const post = (state = {}, action) => {
  switch (action.type) {
    case Do.POST:
     let {
       id,
       timestamp,
       title,
       author,
       body,
       category
     } = action
     return {...state,
       id,
       timestamp,
       title,
       author,
       body,
       category
     }
     case Do.NEW_POST:
       return {
         id: action.postId,
         timestamp,
         title,
         author,
         body,
         category
       }

     case Do.PREPARE_POST:
       let {type, ...values} = action
       return {
         ...state,
         ...values
       }

     case Do.UPDATE_POST:
       return {...state,
         id: action.id,
         timestamp: action.timestamp,
         title: action.title,
         author: action.author,
         body: action.body,
         category: action.category
       }
    default:
      return state
  }
}