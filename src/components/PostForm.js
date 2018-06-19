import React, {Component} from 'react'
import Do from '../actions/types'
import store from '../store'

class Form extends Component {
  state = {
    redirected: false
  }

  handleTitleChange(event) {
    store.dispatch({
      type: Do.PREPARE_POST,
      title: event.target.value
    })
  }
  handleAuthorChange(event) {
    store.dispatch({
      type: Do.PREPARE_POST,
      author: event.target.value
    })
  }

  handleBodyChange(event) {
    store.dispatch({
      type: Do.PREPARE_POST,
      body: event.target.value
    })
  }

  handleCategoryChange(event) {
    store.dispatch({
      type: Do.PREPARE_POST,
      category: event.target.value
    })
  }

  onSubmitForm(event) {
    const {_title, _body, _author} = this.refs
    event.preventDefault()
    const category = store.getState().post.category
    store.dispatch({
      type: Do.PREPARE_POST,
      timestamp: Date.now(),
      category: ( category === undefined) ? 'react' : category
    })

    this.props.formFunc(store.getState().post)
    store.dispatch({type: Do.NEW_POST})

    _title.value = ''
    _body.value = ''
    _author.value = ''
    this.setState({redirected: true})
  }

  render() {
    const {categories} = this.props
    return(
    <div>
    { (this.state.redirected === false) ?
      <div className="editor">

        <h1> Create new post </h1>
        <form onSubmit={this.onSubmitForm.bind(this)}>
          <select
            className="form-control"
            onChange={this.handleCategoryChange.bind(this)}>
            {categories.map((cat) => (<option key={cat.name} value={cat.name}>{cat.name}</option>))}
          </select>
          <input
            ref="_title"
            type="text"
            name="title"
            placeholder="Title..."
            value={store.getState().post.title}
            onChange={this.handleTitleChange.bind(this)}
            />
          <input
            type="text"
            ref="_author"
            name="author"
            placeholder="Your name..."
            value={store.getState().post.author}
            onChange={this.handleAuthorChange.bind(this)}
            className="form-control" />
          <textarea
            name="body"
            ref="_body"
            cols="30"
            rows="10"
            placeholder="Tell us all about it!"
            value={store.getState().post.body}
            onChange={this.handleBodyChange.bind(this)}
            className="form-control">
          </textarea>

          <button type="submit" className="form submit">Create post</button>
          <a href="/"><button className="form cancel">Cancel</button></a>
        </form>
      </div>
      : <div className="editor"><h1> Your post has been created! </h1></div>
      }
    </div>)
    }
}

export default Form