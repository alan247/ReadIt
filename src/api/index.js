const API_ENDPOINT = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': token
}
/*
 * Categories
*/

 export const fetchCategories = () => {
  return fetch(`${API_ENDPOINT}/categories`, {headers})
    .then((res) => res.json())
}
/*
 * Posts
*/
 export const createPostApi = (post) => {
  return fetch(`${API_ENDPOINT}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
  }).then((resp) => resp.json())
}

export const updatePostApi = (post) => {
    return fetch(`${API_ENDPOINT}/posts/${post.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(post)
    }).then((resp) => resp.json())
  }

export const removePostApi = (postId) => {
  return fetch(`${API_ENDPOINT}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers,
    deleted: true
  }).then((resp) => resp.json())
}

export const fetchPosts = () => {
  return fetch(`${API_ENDPOINT}/posts`, {headers})
    .then((res) => res.json())
}

export const fetchPostsByCategory = (category) => {
  console.log("Category", category)
  return fetch(`${API_ENDPOINT}/${category}/posts`, {headers})
    .then((res) => res.json())
}

export const fetchPost = (postID) => {
  return fetch(`${API_ENDPOINT}/posts/${postID}`, {headers})
    .then((res) => res.json())
}

/*
 * Comments
*/

export const updateCommentApi = (comment) => {
  return fetch(`${API_ENDPOINT}/comments/${comment.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(comment)
  }).then((resp) => resp.json())
}

export const fetchComments = (postID) => {
  return fetch(`${API_ENDPOINT}/posts/${postID}/comments`, {headers})
    .then((res) => res.json())
}

export const createCommentApi = (comment) => {
  return fetch(`${API_ENDPOINT}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  }).then((resp) => resp.json())
}

export const removeCommentApi = (commentId) => {
  return fetch(`${API_ENDPOINT}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
    //,
    // deleted: true
  }).then((resp) => resp.json())
}

/*
* Voting
*/

export const voteOnPost = ({option, postId}) => {
  return fetch(`${API_ENDPOINT}/posts/${postId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: option})
    }).then((res) => res.json())
}

export const voteOnComment = ({option, commentId}) => {
  return fetch(`${API_ENDPOINT}/comments/${commentId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: option})
  })
  .then((res) => res.json())
}