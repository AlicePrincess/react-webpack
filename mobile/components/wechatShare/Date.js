// 图说时间

	// 时间
	// 日期

import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	render(){
		const myDate=new Date()

		return(
      <div>
				<dl>
					<dt><i className="iconfont icon-date"></i></dt>
					<dd>{myDate.getFullYear()}.{myDate.getMonth()+1<10?"0"+(myDate.getMonth()+1):myDate.getMonth()+1}.{myDate.getDate()<10?"0"+myDate.getDate():myDate.getDate()}</dd>
				</dl>
				<dl>
					<dt><i className="iconfont icon-time"></i></dt>
					<dd><time>{myDate.getHours()>12?(myDate.getHours()-12<10?"0"+myDate.getHours()-12:myDate.getHours()-12):(myDate.getHours()<10?"0"+myDate.getHours():myDate.getHours())}:{myDate.getMinutes()<10?"0"+myDate.getMinutes():myDate.getMinutes()}</time>{myDate.getHours()>12?"PM":"AM"}</dd>
				</dl>
      </div>
		)
	}
}
