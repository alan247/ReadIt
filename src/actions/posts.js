import Do from './types'
import store from '../store'

import {
  fetchComments,
  fetchPosts,
  fetchPost,
  createPostApi,
  updatePostApi,
  removePostApi
} from '../api'

export const posts = (posts) => ({
  type: Do.POSTS,
  posts
})

export const filterPosts = (category, posts) => ({
  type: Do.FILTER_POSTS,
  category: category,
  posts: posts
})

export const postsVoteDesc = (posts) => ({
  type: Do.MOST_RECENT_POSTS,
  posts: posts
})

export const addPost = (post) => {
  return {
    type: Do.ADD_POST,
    ...post
  }
}

export const singlePost = (post) => {
  return {
    ...post,
    type: Do.POST
  }
}

export const delete_post = (postId) => {
  return {
    type: Do.REMOVE_POST,
    postId: postId
  }
}

export const newPost = () => {
  return {
    type: Do.NEW_POST,
    postId: Math.random().toString(36).substr(-10)
  }
}

export const createPost = (post) => dispatch => {
  createPostApi(post)
  .then((resp) => {
    dispatch(addPost(resp))
  })
  .catch(err => console.error(err))
}

export const updatePost = (post) => dispatch => {
  updatePostApi(post)
  .then((resp) => {
    dispatch(singlePost(resp))
  })
  .catch(err => console.error(err))
}

export const deletePost = (postId) => dispatch => {
  removePostApi(postId)
  .then((resp) => {
    dispatch(delete_post(resp))
  })
  .catch(err => console.error(err))
}

export const getPosts = () => (dispatch) => {
  fetchPosts()
    .then((data) => {
      dispatch({type: "CLEAR"})
      loadComments(data, dispatch)
      dispatch(posts(data))
    })
  .catch(err => console.error(err))
}

const loadComments = (data, dispatch) => {
  data.forEach((post) => {
    fetchComments(post.id)
      .then(comment_data => dispatch({type: "LOAD_COMMENTS", comments: comment_data}))
  })
}

export const getPost = (postId) => (dispatch) => {
  fetchPost(postId)
    .then((data) => {
      dispatch(singlePost(data))
    })
  .catch(err => console.error(err))
}

export const getPostsByCategory = (category) => (dispatch) => {
  dispatch(filterPosts(category, store.getState().allPosts))
}

export const filterByVoteDesc = () => (dispatch) => {
  dispatch(postsVoteDesc(store.getState().allPosts))
}
