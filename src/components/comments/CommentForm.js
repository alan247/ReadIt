import React from 'react'
import {connect} from 'react-redux'

import Do from '../../actions/types'
import {
  createComment,
  editComment,
  clearComment
} from '../../actions/comments'

import store from '../../store'

const CommentForm = ({postID, editComment, newComment, clearCommentForm, comment}) => {
  let body, author

  const submitComment = (event) => {
    event.preventDefault()

      if (!!(comment.id)) {
        editComment(store.getState().comment)
      } else {
        let change = {
          id: Math.random().toString(36).substr(-10),
          timestamp: Date.now(),
          body: body.value,
          author: author.value,
          parentId: postID,
          voteScore: 0
        }
        newComment(change)
      }
    body.value = ''
    author.value = ''
  }

  const handleBodyChange = (event) => {
    store.dispatch({
      type: Do.CHANGE_COMMENT,
      body: event.target.value
    })
  }

  const handleAuthorChange = (event) => {
    store.dispatch({
      type: Do.CHANGE_COMMENT,
      author: event.target.value
    })
  }

  const clear = () => {
    body.value = ''
    author.value = ''
    clearCommentForm()
  }

  return(
    <div className="comment-form">
      <form onSubmit={submitComment} >
          <input
            className="username"
            placeholder="Your name"
            ref={input => {author = input}}
            value={comment.author}
            onChange={handleAuthorChange}
            name="post_comment_author"/>

          <textarea
            ref={input => {body = input}}
            value={comment.body}
            onChange={handleBodyChange}
            name="details"
            cols="80"
            rows="3"
            placeholder="Got something to say?"></textarea>


          <button className="form submit">Add comment!</button>
          <button onClick={clear} className="form cancel">Clear</button>

      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {comment: state.comment}
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCommentForm: () => dispatch(clearComment()),
    editComment: (data) => dispatch(editComment(data)),
    newComment: (data) => dispatch(createComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);