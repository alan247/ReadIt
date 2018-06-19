import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comment from '../comments/Comment'
import store from '../../store'
import {sortCommentbyVote, sortCommentsMostRecent} from '../../actions/comments'

class CommentList extends Component {
  state = {
    comments: []
  }

  handleChange = (e) => {
    const {commentsMostRecent, commentsByMostVotes} = this.props
    e.target.value === "popular" ?
      this.commentFilter(commentsByMostVotes):
      this.commentFilter(commentsMostRecent)
  }


  commentFilter(func) {
    func()
    this.setState({comments: store.getState().comments})
  }


  componentWillMount() {
    this.setState({comments: this.props.comments})
  }


  render() {
    const {comments} = this.props

    return(
      <div>
        <div className="sort-options">
          <div className="select-container">
            <span>Sort: </span>
            <select
              onChange={this.handleChange}
              defaultValue="popular">
              <option value="popular">Most popular first</option>
              <option value="recent">Most recent first</option>

            </select>
          </div>
        </div>

        <ul className="comment-list">
          {comments.map((c) => <Comment key={c.id} comm={c} />)}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentsByMostVotes: () => dispatch(sortCommentbyVote()),
    commentsMostRecent: () => dispatch(sortCommentsMostRecent())
  }
}

export default connect(null, mapDispatchToProps)(CommentList);