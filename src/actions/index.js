import Do from './types'
import {fetchCategories} from '../api'
import {voteOnComment, voteOnPost} from '../api'

export const categories = (categories) => {
  return {
    categories,
    type: Do.CATEGORIES
  }
}

export const getCategories = () => (dispatch) => {
  fetchCategories()
    .then((resp) => {
      dispatch(categories(resp.categories))
  })
}

export function newComment({id, timestamp, body, parentId, author}) {
  return {
    type: Do.CREATE_COMMENT,
    id,
    timestamp,
    author,
    body,
    parentId
  }
}

export const vote = (payload) => (dispatch) => {
  switch (payload.type) {
    case Do.POST_VOTE:
      voteOnPost(payload)
      .then((resp) => {
        dispatch({type: Do.POST_VOTE, payload})
      })
      return {type: "FAILED_VOTE"}
    case Do.COMMENT_VOTE:
      voteOnComment(payload)
      .then((resp) => {
        dispatch({type: Do.COMMENT_VOTE, payload})
      })
      return {type: "FAILED_VOTE"}
    default:
      return {type: "FAILED_VOTE"}
  }
}
