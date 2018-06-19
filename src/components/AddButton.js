import React, { Component } from 'react'

class AddButton extends Component {

	render() {
		return(
			<a href="/create" className="add-post"><span>+</span></a>
		)
	}
}

export default AddButton