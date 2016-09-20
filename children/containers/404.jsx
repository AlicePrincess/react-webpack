import React, {PropTypes} from 'react'
import styles from './404.scss'
import img404 from '../public/images/404.png'

const Page404 = React.createClass({
    render: function(){
    	return (
			<div className={styles.page404}>
				<figure>
				  <span>404</span>
				  <figcaption>额，小抄被发现了...刷新试试</figcaption>
				</figure>
				<div className="bg">
					<img src={img404} alt=""/>
				</div>
			</div>
		)
    },
})

export default Page404
