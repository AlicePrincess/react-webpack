import React, {PropTypes} from 'react'
import styles from './Share.scss'
import InlineSVG from 'svg-inline-react'
import share from '../../public/images/share/share.svg'
import share1 from '../../public/images/share/share1.svg'
const Share = React.createClass({
    render: function(){
    	return (
			<div className={styles.share} onTouchStart={this.props.handleTouch} onClick={this.props.handleTouch}>

        <InlineSVG src={share1} className="share1"></InlineSVG>
        	<InlineSVG src={share} className="share"></InlineSVG>
				<p>
					听说分享之后中奖翻倍哦~
				</p>
			</div>
		)
    },
})



export default Share
