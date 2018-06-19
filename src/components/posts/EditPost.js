import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getCategories} from  '../../actions'
import {getPost, updatePost} from '../../actions/posts'
import store from '../../store'

import Form from './FormPartial'

class EditPostForm extends Component {
    componentWillMount() {
      const {match, loadPost, loadCategories} = this.props
      loadPost(match.params.postId)
      loadCategories()
    }
    render() {
      return(
        <section className="main">
          <Form
            categories={store.getState().categories}
            formFunc={this.props.editPost}
            />
        </section>
      )
    }
  }

  const mapStateToProps = (state) => {
    return state
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      loadCategories: (data) => dispatch(getCategories(data)),
      loadPost: (data) => dispatch(getPost(data)),
      editPost: (data) => dispatch(updatePost(data))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);