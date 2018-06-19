import React, {Component} from  'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPost} from '../actions/posts'
import {getComments} from '../actions/comments'
import Moment from 'react-moment'
import {deletePost} from '../actions/posts'
import CommentForm from './comments/CommentForm'
import CommentList from './posts/CommentList'


class ViewPost extends Component {

  componentWillMount() {
    const {fetchPost, loadComments} = this.props
    const postId = (this.props.match.params.postId)
    fetchPost(postId)
    loadComments(postId)
  }

  state = {redirect: false}

  redirect(postId) {
    this.props.removePost(postId)
    this.setState({redirect: true})
  }


  render() {
    const {post, comments} = this.props
    const numberOfComments = comments.length

    return(
      <section className="main">
        {
        (post.id === undefined) ? <div className="post"><h1> This post doesn't exist! </h1></div>
        : <div>
            <div className="post">

              <h1>{post.title}</h1>

              <div className="post-body">
                <p>{post.body}</p>
              </div>

              <div className="metadata">
                <Link to={`/post/${post.id}/edit`}>
                  <button>Edit</button>
                </Link>

                <button
                className="delete"
                onClick={() => {this.redirect(post.id)}}
                >Remove</button>

                <span className="date-author">
                 Submitted <Moment className="text-warning label"element="span" fromNow>{post.timestamp}</Moment> by <strong>{post.author}</strong>
                </span>

              </div>
            </div>

            {this.state.redirect && <Redirect to={'/'} />}
            <section className="comments">
              <h1>Comments ({numberOfComments})</h1>

              <CommentForm postID={post.id} />
              <CommentList postId={post.id} comments={comments} />
            </section>
          </div>

        }
      </section>
    )
  }
}


const mapDispatchToProps =  (dispatch) => {
  return {
    fetchPost(postId) {
      dispatch(getPost(postId))
    },
    loadComments(postId) {
      dispatch(getComments(postId))
    },
    removePost(data) {
      dispatch(deletePost(data))
    }
  }
}


const mapStateToProps = ({post, comments}) => {
  return {post, comments}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)


