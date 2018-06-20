import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import SortBox from './SortBox'

import {deletePost} from '../actions/posts'
import VoteHandler from './VoteHandler'
import Do from '../actions/types'
import {getPosts} from '../actions/posts'


class PostListItem extends Component {


  state = {redirect: false}



  render(){

    const {post, commentCount} = this.props

     const redirect = (postId) => {
      this.props.deletePost(postId)
      window.location.reload()
    }

    const payload = {
      type: Do.POST_VOTE,
      postId: post.id
    }


    return(
    <li className="post-item">


        <h2><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h2>

        <div className="metadata">
          <Link to={`/post/${post.id}/edit`}>
            <button>Edit</button>
          </Link>

          <button
          className="delete"
          onClick={() => {redirect(post.id)}}
          >Remove</button>
          <span className="comment-count"> {commentCount} {(commentCount === 1) ? "comment" : "comments"}</span>
          <span className="date-author">
            Submitted by {post.author} <Moment className="text-warning label" element="span" fromNow>{post.timestamp}</Moment> to <strong>{post.category}</strong>
          </span>
        </div>
    <VoteHandler payload={payload} voteCount={post.voteScore} />
  </li>
  )
  }
}



// const PostListItem = ({post, commentCount}) => {


//   return(
//     )
// }

class CategoryView extends Component {

  commentCount = (postId, comments) => {
    return comments.filter(comment => comment.parentId === postId).length
  }

  componentWillMount() {
    const {loadPosts} = this.props
    loadPosts()
  }

  render() {
      const {allComments, match, removePost} = this.props
      const category = match.params.category
      const posts = !category ?
      this.props.posts :
      this.props.posts.filter((post) => post.category === category)


      return(
        <section className="main">

          <SortBox />
          <ul className="post-list">
              {posts.map((post) => <PostListItem
                key={post.id}
                post={post}
                commentCount={this.commentCount(post.id, allComments)}
                deletePost={removePost}
                />)
              }
          </ul>

        </section>


      )
  }
}

const mapStateToProps = ({posts, allComments}) => {
  return {posts, allComments}
}


const mapDispatchToProps =  (dispatch) => {
  return {
    loadPosts() {
      dispatch(getPosts())
    },
    removePost(data) {
      dispatch(deletePost(data))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryView, PostListItem);

