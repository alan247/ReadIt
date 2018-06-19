import Do from '../actions/types'
import {mostRecent, mostPopular}  from  '../actions/sorter'
/*
  * When you create a post What are some of the things that need to happen.
*/
export const posts = (state = [], action) => {
  switch (action.type) {

    case Do.POST:
      return state.filter((post) => (post.id === action.postID))

    case Do.POSTS:
      return [...state, ...action.posts]
        .sort(mostPopular)
        .filter((post) => !(post.deleted))

    case Do.ADD_POST:
      return [...state, post({}, {...action, type: Do.POST})]

    case Do.REMOVE_POST:
      return state.filter(post => (post.id !== action.postId))

    case Do.FILTER_POSTS:
      return action.posts.filter(post => (post.category === action.category))
        .filter((post) => !(post.deleted))

    case Do.MOST_RECENT_POSTS:
      return action.posts.sort(mostRecent)
          .filter((post) => !(post.deleted))

    case Do.MOST_POPULAR_POSTS:
      return action.posts.sort(mostPopular)
        .filter((post) => !(post.deleted))

    case Do.POST_VOTE:
      return state.map((post) => {
        if (action.payload.postId === post.id) {
          return postVote(post, action.payload.option)
        } else {
          return post
        }
      })
    default:
      return state;
  }
}

const postVote = (post, option) => {
  if (option === "upVote") {
    return Object.assign(post,
    {voteScore: post.voteScore + 1 })
  } else if (option === "downVote") {
    return Object.assign(post,
      {voteScore: post.voteScore - 1 })
  }
}

export const allPosts = (state = [], action) => {
  switch (action.type) {
    case "CLEAR":
      return []
    case Do.POSTS:
      return [...state, ...action.posts]
    default:
      return state
  }
}

export const post = (state = {}, action) => {
   switch (action.type) {
     case Do.POST:
      let {
        id,
        timestamp,
        title,
        author,
        body,
        category
      } = action
      return {...state,
        id,
        timestamp,
        title,
        author,
        body,
        category
      }
      case Do.NEW_POST:
        return {
          id: action.postId,
          timestamp,
          title,
          author,
          body,
          category
        }

      case Do.PREPARE_POST:
        let {type, ...values} = action
        return {
          ...state,
          ...values
        }

      case Do.UPDATE_POST:
        return {...state,
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          author: action.author,
          body: action.body,
          category: action.category
        }
     default:
       return state
   }
}