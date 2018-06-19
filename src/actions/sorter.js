import store from '../store'

export const mostRecent = (first, second) => {
  const timeA = first.timestamp
  const timeB = second.timestamp
  return compare(timeA, timeB);
}

export const mostPopular = (first, second) => {
  return compare(first.voteScore, second.voteScore);
}

const compare = (itema, itemb) => {
  let comparison = 0;
  if (itemb > itema) {
    comparison = 1;
  } else if (itemb < itema) {
    comparison = -1;
  }
  return comparison;
}

export const sort = (sortType) => {
  return {
    type: sortType,
    posts: store.getState().allPosts.filter((post) => !(post.deleted))
  }
}