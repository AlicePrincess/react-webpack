import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	constructor(props) {
			super(props)
	}
	render(){
		return(
			<button onClick={this.props.handleClick}>{this.props.icon?<i className={"iconfont icon-"+this.props.icon}></i>:null}{this.props.text?this.props.text:null}</button>
		)
	}
}
