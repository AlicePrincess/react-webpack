import React, {PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import styles from './style/ShareContent.scss'
import classNames from 'classnames'

import Blur from './Blur'

const FLIP_DEFAULT = 'FLIP_DEFAULT'
const FLIP_IMAGE = 'FLIP_IMAGE'
const FLIP_DESCRIB = 'FLIP_DESCRIB'

const ShareContent = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState() {
	    return {
	    	blurImageFrameStyle: 'unloaded-image',
	    	flipState: FLIP_DEFAULT
	    }
	},

	// related to flip images on the center of csreen
	tryShowDetail: function(){
		// 显示被分享照片的描述
		this.setState({
			flipState: FLIP_DESCRIB
		})
	},
	tryShowPhoto: function(){
		// 显示被分享的照片
		this.setState({
			flipState: FLIP_IMAGE,
		})
	},
	sourceImageLoaded: function(evt){
		/* show blur background image when the image was loaded, for scretching image reasonablly.*/
		this.setState({
			blurImageFrameStyle: ((evt.target.width / evt.target.height) ? 'wide-image' : 'tall-image')
		})
	},
	getFlipClassNamesObject: function(){
		switch(this.state.flipState){
			case FLIP_DEFAULT:
				return {
					description:{
						hide: true
					}
				}
			case FLIP_IMAGE:
				return {
					image: {
						flipInYa: true
					},
					description: {
						hide: true
					}
				}
			case FLIP_DESCRIB:
				return {
					image: {
						hide: true
					},
					description: {
						flipInYa: true
					}
				}
			default:
				return ""
		}
	},

	render: function() {
		const flipState = this.getFlipClassNamesObject()

		const BLUR_PX=20

		return (
			<div className={styles.root}>
				<Blur img={this.props.img} blurPx={BLUR_PX}></Blur>
			    <div className={classNames('inner', flipState.image)}>
				    <figure onClick={this.tryShowDetail}>
			            <img id="shareImage" src={this.props.img} onLoad={this.sourceImageLoaded}/>
			            <figcaption>{this.props.title}</figcaption>
			        </figure>
			    </div>
			    <div className={classNames('inner', flipState.description)}>
			        <section onClick={this.tryShowPhoto}>
			            <h3>{this.props.title}</h3>
			            <hr/>
			            <time dateTime="2016-03-23 15:13:27">3月23日</time>
			            <p>{this.props.description}</p>
			        </section>
			    </div>
			</div>
			)
		}
	})



ShareContent.propTypes = {
	datetime: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string
}

export default ShareContent
