// 图说内容显示方式

	// 居中对齐
	// 左对齐

import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	render(){
		return(
			<ul>
				<li>
					<i className="iconfont icon-left" onClick={this.props.handleMode} data="left"></i>
				</li>
				<li>
					<i className="iconfont icon-center" onClick={this.props.handleMode} data="center"></i>
				</li>
			</ul>
		)
	}
}
