// 图说内容
import React, {PropTypes} from 'react'

// Common Component import
import Upload from '../common/Upload'
import ImageLoad from '../common/ImageLoad'
// Component import
import Title from './Title'
import Content from './Content'

export default class MyComponent extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    switch(this.props.type){
      case 'cover':
        switch(this.props.step){
          case 'create-1':
          // 上传图片前
          return(
            <div className="front">
              <Upload icon="camera" {...this.props}></Upload>
            </div>
          )
          default:
          // 上传图片后
          return(
            <div className="front">
							<figure>
								<div className="imgBox">
                  <ImageLoad {...this.props}></ImageLoad>
								</div>
	              <figcaption className={(this.props.focus?'write':'')}>
									<Title {...this.props}></Title>
	              </figcaption>
							</figure>
            </div>
          )
        }
        break
      case 'inside':
      if(this.props.step.split("-")[0]==='create'){
        return(
					<div className="back">
						<figure>
							<figcaption><Title {...this.props}></Title></figcaption>
							<Content {...this.props}></Content>
						</figure>
					</div>
				)
      }else{
        return(
					<div className="back" onClick={this.props.handleFilp}>
						<figure>
							<figcaption><Title {...this.props}></Title></figcaption>
							<Content {...this.props}></Content>
              <time>{this.props.date}</time>
						</figure>
					</div>
				)
      }
      default:
        return false
    }

  }
}
