import Do from '../actions/types'
import {mostRecent, mostPopular}  from  '../actions/sorter'

export const comments = (state = [], action) => {
  switch (action.type) {

    case Do.COMMENTS:
      return [...state, ...action.comments].sort(mostPopular)

    case Do.ADD_COMMENT:
      return [...state, comment({}, {...action, type: Do.COMMENT})]

    case Do.REMOVE_COMMENT:
      return state.filter((comment) => (comment.id !== action.commentId))

    case Do.UPDATE_COMMENTS:
      return state.filter((comment) => (comment.id !== action.payload.id)).concat(action.payload)

    case Do.MOST_POPULAR_COMMENTS:
      return state.sort(mostPopular)

    case Do.MOST_RECENT_COMMENTS:
      return state.sort(mostRecent)

    case Do.REMOVE_POST:
      return state.forEach((comment) => {
        if (comment.parentId === action.postId) {
          return Object.assign(comment, {parentId: null})
        }
      })

    case Do.COMMENT_VOTE:
      return state.map((comment) => {
        if (action.payload.commentId === comment.id) {
          return commentVote(comment, action.payload.option)
        } else {
          return comment
        }
      })
    default:
      return state
  }
}

export const allComments = (state = [], action) => {
  switch (action.type) {
    case "CLEAR":
      return []
    case "LOAD_COMMENTS":
      return [...state, ...action.comments]
    default:
      return state
  }
}

const commentVote = (post, option) => {
  if (option === "upVote") {
    return Object.assign(post,
    {voteScore: post.voteScore + 1 })
  } else if (option === "downVote") {
    return Object.assign(post,
      {voteScore: post.voteScore - 1 })
  }
}

export const comment = (state = {}, action) => {
  switch (action.type) {
    case Do.CHANGE_COMMENT:
      let {type, ...values} = action
      return {
        ...state,
        ...values
      }
    case Do.PREPARE_COMMENT:
      return action.comment

      case Do.COMMENT:
      let {
        id,
        timestamp,
        parentId,
        author,
        body,
        voteScore
      } = action
      return {...state, id, timestamp, author, body, parentId, voteScore}
    case Do.CLEAR_COMMENT:
      return {}
    default:
      return state
  }
}
