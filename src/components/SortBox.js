import React, { Component } from 'react'
import {sort} from '../actions/sorter'
import {connect} from 'react-redux'


class SortBox extends Component {

	handleChange = (e) => {
		this.setState({selectedValue: e.target.value})
		e.target.value === "popular" ?
			this.props.sortPosts("MOST_POPULAR_POSTS"):
			this.props.sortPosts("MOST_RECENT_POSTS")
	}


	render() {
		return(
			<div className="sort-options">
				<div className="select-container">
					<span>Sort: </span>
					<select
						defaultValue="popular"
						onChange={this.handleChange}>
						<option value="popular">Most popular first</option>
						<option value="recent">Most recent first</option>

					</select>
				</div>
			</div>
		)
	}
}


const sortPosts = (data) => (dispatch) => {
  return dispatch(sort(data))
}


export default connect(null, {sortPosts})(SortBox);
