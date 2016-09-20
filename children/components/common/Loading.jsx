import React, {PropTypes} from 'react'
import styles from './Loading.scss'

const Loading = React.createClass({
    render: function(){
    	return (
			<div className={styles.loading}>
			<figure>
			  <img src={this.props.loadImg} alt=""/>
			  <figcaption>{this.props.loadText}</figcaption>
			</figure>
			</div>
		)
    },
})



export default Loading
