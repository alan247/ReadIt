import Do from './types'

export function postVote(postId) {
  return {
    type: Do.POST_VOTE,
    postId
  }
}

export function commentVote(commentId) {
  return {
    type: Do.COMMENT_VOTE,
    commentId
  }
}