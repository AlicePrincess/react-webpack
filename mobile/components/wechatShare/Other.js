// 图说内容
import React, {PropTypes} from 'react'

// Common Component import
import Button from '../common/Button'
import Upload from '../common/Upload'
// Component import
import Mode from './Mode'
import Date from './Date'
import Share from './Share'

export default class MyComponent extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    if(this.props.show){

      switch(this.props.step){
        case 'friend':
        // 朋友分享的图说
        return(
          <div className="front">
            <p className="tip">点击反转，惊喜就在身后</p>
            <Button text="生成自己的图说" handleClick={this.props.handleMakeMine}></Button>
          </div>
        )
        case 'create-1':
        // 上传图片前
        return(
          <div className="front">
            <p className="tip">点击上传图片</p>
          </div>
        )
        case 'create-2':
        // 上传图片后
        return(
          <div className="front">
            <p>随时随地，记下每一份感悟</p>
            <Date></Date>
            <Upload text="重新上传" {...this.props}></Upload>
          </div>
        )
        case 'build':
        // 我的图说
        return(
          <div className="front">
            <p className="tip">点击反转，惊喜就在身后</p>
            <Share {...this.props}></Share>
          </div>
        )
      }

    }else{
      switch(this.props.step.split("-")[0]){
        case 'friend':
        // 朋友分享的图说
        return(
          <div className="back">
            <Button text="生成自己的图说" handleClick={this.props.handleMakeMine}></Button>
          </div>
        )
        case 'create':
        // 创建图说
        return(
          <div className="back">
            <Mode {...this.props}></Mode>
            <Button text="生成图说" handleClick={this.props.handleBuild}></Button>
          </div>
        )
        case 'build':
        // 我的图说
        return(
          <div className="back">
            <Share {...this.props}></Share>
          </div>
        )
      }
    }
  }
}
