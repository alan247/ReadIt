import React, {Component} from 'react'
import {connect} from 'react-redux'
import {newPost, createPost} from '../../actions/posts'
import {getCategories} from  '../../actions'

import Form from './FormPartial'

class PostForm extends Component {

  componentWillMount() {
    this.props.prepareNewPost()
    this.props.loadCategories()
  }
  render() {
    return(<Form
      categories={this.props.categories}
      formFunc={this.props.newPost}
      router={this.props.router}
      />)
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: (data) => dispatch(getCategories(data)),
    newPost: (data) => dispatch(createPost(data)),
    prepareNewPost: () => dispatch(newPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);