import React, {PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import logoSvg from '../../public/images/logo.svg'
import textSvg from '../../public/images/TUSO.svg'
import InlineSVG from 'svg-inline-react'
import styles from './style/ShareFooter.scss'
import detector from '../../core/detector-util'

const ShareFooter = React.createClass({
	mixins: [PureRenderMixin],

	tryToOpenApp: ()=>{
		// wait for app url
		// window.location = 'your-uri-scheme://'; // will result in error message if app not installed

		setTimeout(function() {
		   // Link to the App Store should go here -- only fires if deep link fails
		   window.location = "https://itunes.apple.com/hk/app/tu-shuo-tuso/id1019431091?mt=8&ign-mpt=uo%3D4";
		}, 500);
	},

	render: function() {
		const deviceRelatedContent = detector.mobile.isiOS() ? {
			downloadButton: <button onClick={this.tryToOpenApp }>获取</button>,
			prompt: "下载图说，获取更多精彩内容吧"
		} : {
			downloadButton: null,
			prompt: "不经意之间记录下的瞬间，也许会是一生中最美好的回忆"
		}

		return (
			<footer className={styles.root}>
				<figure>
					<InlineSVG src={logoSvg} className="logo-img"></InlineSVG>
					<InlineSVG src={textSvg} className="logo-text"></InlineSVG>
					<b>图说</b>
					<p>{deviceRelatedContent.prompt}</p>
				</figure>
				{deviceRelatedContent.downloadButton}
			</footer>
		)
	}
})

export default ShareFooter
