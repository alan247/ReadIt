import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {

	render() {
		return(
			<header>
				<div className="logo">
					ReadIt!
				</div>
				<nav>
					<ul>
		  			  	<li><NavLink exact to="/">Home</NavLink></li>
		  			    <li><NavLink exact to="/udacity">Udacity</NavLink></li>
		  			    <li><NavLink exact to="/redux">Redux</NavLink></li>
		  			    <li><NavLink exact to="/react">React</NavLink></li>
					</ul>
				</nav>
			</header>
		)
	}
}

export default Header