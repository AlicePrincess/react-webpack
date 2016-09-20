// 图说标题

	// 可写
		// 	正在输入／有文字
		// 	没有文字
	// 只读

import React, {PropTypes} from 'react'
import classNames from 'classnames'
export default class MyComponent extends React.Component{
	render(){
		if(this.props.step.split("-")[0]=='create'){
			if(this.props.type=='cover'){
				return(<input type="text" value={this.props.title}
																	onChange={this.props.handleTitleChange}
																	onBlur={this.props.handleWrite}
																	onFocus={this.props.handleTitleFocus}
																	maxLength={this.props.titleMaxLength}
																	/>)
			}else{
				return(<input type="text" value={this.props.title} maxLength={this.props.titleMaxLength}
																													 onChange={this.props.handleTitleChange}/>)
			}
		}else{
			return(<strong onClick={this.props.handleFilp}>{this.props.title}</strong>)
		}

	}
}
