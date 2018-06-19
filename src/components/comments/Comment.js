import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import VoteHandler from '../VoteHandler'
import {deleteComment, prepareComment} from '../../actions/comments'
import {commentVote} from '../../actions/votes'


const Comment = ({comm, removeComment, prepare}) => {

  return(
    <li>
      <div className="entry">
        {comm.body}

        <div className="metadata">
          <span className="date-author">
            Submitted <Moment className="text-warning label" element="span" fromNow>{comm.timestamp}</Moment> by {comm.author}
          </span>

          <span className="edit-delete">
              <button className="label btn-success" onClick={() => {prepare(comm)} }>Edit</button>
              <button className="delete" onClick={() => {removeComment(comm.id) }}>Remove</button>
          </span>

        </div>

        <VoteHandler payload={commentVote(comm.id)} voteCount={comm.voteScore}/>


      </div>

    </li>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    prepare: (data) => dispatch(prepareComment(data)),
    removeComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(state => ({...state}), mapDispatchToProps)(Comment)


