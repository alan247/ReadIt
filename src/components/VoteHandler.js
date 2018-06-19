import React, {Component} from 'react'
import {connect} from 'react-redux'
import Icon from './Icon'
import {ICONS} from './IconPaths'
import {vote} from '../actions'


class VoteHandler extends Component {

  handleClick = (voteType) => {
      const {payload, voteControl} = this.props
      voteControl({...payload, option: voteType})
  }


  render() {

    const {voteCount} = this.props

    return(
      <div className="vote">
        <button className="up" onClick={() => this.handleClick("upVote")}>
          <Icon icon={ICONS.ARROW_UP} />
        </button>

        <div className="score">{voteCount}</div>

         <button className="down" onClick={() => this.handleClick("downVote")}>
           <Icon icon={ICONS.ARROW_DOWN} />
         </button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteControl: (data) => dispatch(vote(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteHandler);