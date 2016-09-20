// 图说内容

	// 可写
	// 只读

import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	render(){

		if(this.props.step.split("-")[0]=='create'){
			return(
				<div>
					<textarea value={this.props.content} onChange={this.props.handleContentChange} maxLength={this.props.maxLength} style={{textAlign:this.props.mode}}></textarea>
					<span>剩余{this.props.wordLeft}字</span>
				</div>
			)
		}else{
			return(
			<div>
				<p style={{textAlign:this.props.mode}}>{this.props.content}</p>
			</div>
		)
		}
	}
}
