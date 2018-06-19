import Do from './types'
import {removeCommentApi, updateCommentApi, createCommentApi, fetchComments} from '../api'

export const comments = (comments, postId) => {
  return {
    type: Do.COMMENTS,
    comments: comments,
    postId
  }
}

const update_comments = (comment) => {
  return {
    type: Do.UPDATE_COMMENTS,
    payload: comment
  }
}

export const addComment = (comment) => {
  return {
    type: Do.ADD_COMMENT,
    ...comment
  }
}

export const removeComment = (commentId) => {
  return {
    type: Do.REMOVE_COMMENT,
    commentId
  }
}

export const clearComment = () => {
  return {
    type: Do.CLEAR_COMMENT
  }
}

export const getComments = (postId) => (dispatch) => {
  fetchComments(postId)
    .then((resp) => {
      dispatch(comments(resp, postId))
    })
}

export const deleteComment = (commentId) => (dispatch) => {
  removeCommentApi(commentId)
    .then((resp) => {
      dispatch(removeComment(commentId))
    })
}

export const createComment = (comment) => (dispatch) => {
  createCommentApi(comment)
    .then((resp) => {
      dispatch(addComment(resp))
    })
}
export const editComment = (comment) => (dispatch) => {
  updateCommentApi(comment)
    .then((resp) => {
      dispatch(update_comments(comment))
    })
}

export const sortCommentbyVote = () => (dispatch) => {
  dispatch({type: Do.MOST_POPULAR_COMMENTS})
}

export const sortCommentsMostRecent = () => (dispatch) => {
  dispatch({type: Do.MOST_RECENT_COMMENTS})
}

export const prepareComment = (data) => (dispatch) => {
  dispatch({type: Do.PREPARE_COMMENT, comment: data})
}