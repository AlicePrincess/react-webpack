// 图说二维码
import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	render(){
		return(
				<figure>
					<img src={this.props.qrcode} alt=""/>
					<figcaption>长按二维码关注TUSO官方账号</figcaption>
				</figure>
		)
	}
}
