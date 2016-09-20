// 图说图片查看
import React, {PropTypes} from 'react'

import ImageLoad from '../common/ImageLoad'

export default class MyComponent extends React.Component{
	render(){
		return(
			<figure onClick={this.props.handleViewToggle}>
				<ImageLoad {...this.props}></ImageLoad>
			</figure>
		)
	}
}
