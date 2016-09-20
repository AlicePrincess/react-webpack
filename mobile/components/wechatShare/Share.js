// 图说分享

	// 按钮
		// 	分享给好友
	// 下载
	// 关注


import React, {PropTypes} from 'react'
import InlineSVG from 'svg-inline-react'

import Button from '../common/Button'
import logoSvg from '../../assets/images/logo.svg'

export default class MyComponent extends React.Component{
	render(){
		return(
      <div>
				<Button icon="share" text="分享给好友" handleClick={this.props.handleShareToggle}></Button>
				<section>
					<figure className="download">
						<InlineSVG src={logoSvg} className="logo-img"></InlineSVG>
						<b>TUSO图说</b>
						<p>{this.props.slogan}</p>
						<Button text="下载" handleClick={this.props.handleQrcodeToggle}></Button>
					</figure>
					<hr/>
					<figure className="follow">
						<p onClick={this.props.handleQrcodeToggle}>{this.props.follow}</p>
						<span>{this.props.activity}</span>
					</figure>
				</section>
      </div>
		)
	}
}
