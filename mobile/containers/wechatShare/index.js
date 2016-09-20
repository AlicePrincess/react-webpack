import React, { PropTypes } from 'react'
import {push} from 'redux-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import _ from 'underscore'


import Card from '../../components/wechatShare/Card'
import Other from '../../components/wechatShare/Other'
import Instruct from '../../components/wechatShare/Instruct'
import View from '../../components/wechatShare/View'
import BlurImg from '../../components/common/BlurImg'
import Qrcode from '../../components/wechatShare/Qrcode'

// style import
import styles from './index.scss'

import './../../assets/fonts/iconfont.css'
// action import
import {requestTusoInfo} from '../../actions/friendShare'
import {requestTuso} from '../../actions/tuso'
import {requestWeChat} from '../../actions/weChat'



class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        const {urlState} = props
        this.state={
          step: urlState.step||'friend',//图说步骤，friend朋友分享的／create-1上传前／create-2上传后／build生成后
          show: urlState.show||true,//正反面，true正面，false反面
          view:false,//图片全屏，true显示，false不显示
          qrcodeShow:false,//二维码，true显示，false不显示
          instruct:false,//分享指示，true显示，flae不显示
          step:'friend',
          show:true,
          rotate:0,
          titleMaxLength:18,
          maxLength:110,
          wordLeft:110

        }
        this.pushUrlState=this.pushUrlState.bind(this)
        this.handleFilp=this.handleFilp.bind(this)
        this.handleViewToggle=this.handleViewToggle.bind(this)
        this.handleMakeMine=this.handleMakeMine.bind(this)
        this.handlePhotoChange=this.handlePhotoChange.bind(this)
        this.handleTitleFocus=this.handleTitleFocus.bind(this)
        this.handleTitleChange=this.handleTitleChange.bind(this)
        this.handleWrite=this.handleWrite.bind(this)
        this.handleContentChange=this.handleContentChange.bind(this)
        this.handleMode=this.handleMode.bind(this)
        this.handleBuild=this.handleBuild.bind(this)
        this.handleShareToggle=this.handleShareToggle.bind(this)
        this.handleQrcodeToggle=this.handleQrcodeToggle.bind(this)

    }

    pushUrlState(state, that){
      const newState = _.extend({step:that.state.step}, state)
      that.props.push({
        query: newState,
      })
    }

    handleFilp(e){
      // 翻转
      e.stopPropagation()

      this.setState({
        rotate:++this.state.rotate,
        show:!this.state.show
      })
      // this.pushUrlState({show:!this.state.show}, this)
    }
    handleViewToggle(e){
      // 图片全屏预览
      this.setState({
        view:!this.state.view
      })
    }
    handleMakeMine(e){
      // 创建自己的图说

      this.pushUrlState({step:'create-1'}, this)
      this.state.show?null:this.handleFilp(e)
      sessionStorage.photo=''
      sessionStorage.title=''
      sessionStorage.content=''
      sessionStorage.wordLeft=this.state.maxLength
      sessionStorage.mode='left'
    }
    handlePhotoChange(e){
      // 上传图片
      this.setState({
        step:'create-2'
      })
      // this.pushUrlState({step:'create-2'}, this)
      this.setState({
        photo:URL.createObjectURL(e.target.files[0])
      })
      sessionStorage.photo=URL.createObjectURL(e.target.files[0])
    }
    handleTitleFocus(e){
      e.target.parentNode.classList.add('write');
    }
    handleTitleChange(e){
      // 修改标题
      this.setState({
        title:e.target.value
      })
      sessionStorage.title=e.target.value
    }
    handleWrite(e){
      // 标题失去焦点，进入写图说内容
      // this.pushUrlState({show:false}, this)
      this.handleFilp(e)
    }
    handleContentChange(e){
      // 修改内容
      this.setState({
        content:e.target.value,
        wordLeft:e.target.maxLength-e.target.value.length>1?e.target.maxLength-e.target.value.length:0
      })
      sessionStorage.content=e.target.value
      sessionStorage.wordLeft=e.target.maxLength-e.target.value.length>1?e.target.maxLength-e.target.value.length:0
    }
    handleMode(e){
      // 设置对齐方式
      this.setState({
        mode:e.target.getAttribute("data")
      })
      sessionStorage.mode=e.target.getAttribute("data")
    }
    handleBuild(e){
      // 生成图说

      this.pushUrlState({step:'build'}, this)
      this.handleFilp(e)
      const myDate=new Date()
  		sessionStorage.date=(myDate.getMonth()+1<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1))+"月"+(myDate.getDate()<10?("0"+myDate.getDate()):myDate.getDate())+"日"
      this.setState({
        date:sessionStorage.date
      })
    }
    handleShareToggle(){
      this.setState({
        instruct:!this.state.instruct
      })
    }
    handleQrcodeToggle(){
      this.setState({
        qrcodeShow:!this.state.qrcodeShow
      })
    }



    componentDidMount() {
        this.props.requestTusoInfo()
        this.props.requestTuso()
        this.props.requestWeChat()



        // $("body").css("background","red")

    }
    componentWillReceiveProps(nextProps) {
      if (this.props.photo){
        this.setState({
          step: nextProps.urlState.step||'friend'
        })
      }else{
        this.setState({
          step: nextProps.urlState.step||'friend'
        })
      }
    }
    render() {

      wx.config({
        debug: false,
        appId: 'wx20c8ac8d666eae20', // 必填，公众号的唯一标识
        timestamp: this.props.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.props.nonceStr, // 必填，生成签名的随机串
        signature: this.props.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      })

      wx.ready(function() {
        var shareData = {
          title: '多读一些书，让自己多有一点自信，加上你因了解人情世故而产生的一种对人对物的爱与宽恕的涵养。那时，你自然就会有一种从容不迫、雍容高雅的风度。',
          desc: '个人的魅力通常不在他的外貌，而在他的气质。外貌不太好的人，如果气质卓越，那么在别人心目中，气质就会为他加分，外貌的作用反而不那么明显。外貌美丽的人，如果气质还特别突出，那么他就是众人眼中的焦点。气质的形成不是一朝一夕的，没有一蹴而就的，只有一点一点积累，显示出来的气质才能有质的变化。',
          imgUrl: this.state.photo?this.state.photo:'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0',
          success: function(res) {
            // alert('已分享');
          },
          cancel: function(res) {
            // alert('已取消');
          }
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);

      });

      wx.error(function(res) {
        // alert("erroe>>>>>" + res.errMsg);
      });


      const friendProps = {
          photo:this.props.friendShare.get('photo'),
          title:this.props.friendShare.get('title'),
          date:this.props.friendShare.get('date'),
          content:this.props.friendShare.get('content'),
          mode:this.props.friendShare.get('mode')
      }
      return (
            <DocumentTitle title="TUSO">
              <div className={this.state.step}>
                <div className="flip-container" ref="myCard">
                  {this.state.step=="friend"?(
                    <div className="flipper" style={{transform: "rotateY("+this.state.rotate*180+"deg)"}}>
                     <Card type="cover" {...this.state} {...friendProps}
                                        handleFilp={this.handleFilp}
                                        handleViewToggle={this.handleViewToggle}
                                        ></Card>
                     <Card type="inside" {...this.state} {...friendProps}
                                        handleFilp={this.handleFilp}
                                        handleTitleChange={this.handleTitleChange}
                                        handleWrite={this.handleWrite}
                                        ></Card>
                   </div>
                 ):this.state.step=="build"?(
                   <div className="flipper" style={{transform: "rotateY("+this.state.rotate*180+"deg)"}}>
                    <Card type="cover" {...this.state} {...sessionStorage}
                                       handleFilp={this.handleFilp}
                                       handleViewToggle={this.handleViewToggle}
                                       ></Card>
                    <Card type="inside" {...this.state} {...sessionStorage}
                                       handleFilp={this.handleFilp}
                                       handleTitleChange={this.handleTitleChange}
                                       handleWrite={this.handleWrite}
                                       ></Card>
                  </div>
                 ):(
                   <div className="flipper" style={{transform: "rotateY("+this.state.rotate*180+"deg)"}}>
                    <Card type="cover" {...this.state} {...sessionStorage}
                                        handleFilp={this.handleFilp}
                                        handleViewToggle={this.handleViewToggle}
                                        handlePhotoChange={this.handlePhotoChange}
                                        handleTitleFocus={this.handleTitleFocus}
                                        handleTitleChange={this.handleTitleChange}
                                        handleWrite={this.handleWrite}
                                        ></Card>
                    <Card type="inside" {...this.state} {...sessionStorage}
                                        handleFilp={this.handleFilp}
                                        handleTitleChange={this.handleTitleChange}
                                        handleContentChange={this.handleContentChange}
                                        ></Card>
                  </div>
                 )}
               </div>
               <div className="other">
                 <Other {...this.state} {...this.props}
                                        handleMakeMine={this.handleMakeMine}
                                        handleMode={this.handleMode}
                                        handleBuild={this.handleBuild}
                                        handlePhotoChange={this.handlePhotoChange}
                                        handleShareToggle={this.handleShareToggle}
                                        handleQrcodeToggle={this.handleQrcodeToggle}
                                        ></Other>
               </div>
               <div className="blur" style={{opacity:!this.state.show?1:0 }}>
                 {this.state.step=="friend"?(
                  <BlurImg src={friendProps.photo} blurPx='100'></BlurImg>
                ):(
                  <BlurImg src={sessionStorage.photo} blurPx='100'></BlurImg>
                )}

               </div>
               <div className="view" style={{zIndex:this.state.view?1002:-1,opacity:this.state.view?1:0 }}>

                 {this.state.step=="friend"?(
                   <View {...this.state} {...friendProps} handleViewToggle={this.handleViewToggle}></View>
                ):this.state.step=="build"?(
                  <View {...this.state} {...sessionStorage} handleViewToggle={this.handleViewToggle}></View>
                ):(
                  <View {...this.state} handleViewToggle={this.handleViewToggle}></View>
                )}



                 </div>
               {this.state.instruct?(
                 <div className="instruct" onClick={this.handleShareToggle}>
                   <Instruct handleShareToggle={this.handleShareToggle}></Instruct>
                 </div>
               ):null}
               {this.state.qrcodeShow?(
                 <div className="qrcode" onClick={this.handleQrcodeToggle}>
                   <Qrcode {...this.props} handleQrcodeToggle={this.handleQrcodeToggle}></Qrcode>
                 </div>
               ):null}


              </div>
            </DocumentTitle>


        )
    }
}


function mapStateToProps(state) {
    return {
          friendShare: state.getIn(['friendShare','friendShare']),
          slogan: state.getIn(['tuso','slogan']),
          follow: state.getIn(['tuso','follow']),
          activity: state.getIn(['tuso','activity']),
          qrcode: state.getIn(['tuso','qrcode']),
          urlState: state.get('route').location.query,
          timestamp:state.getIn(['weChat','timestamp']),
          nonceStr:state.getIn(['weChat','nonceStr']),
          signature:state.getIn(['weChat','signature'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestTusoInfo: bindActionCreators(requestTusoInfo, dispatch),
        requestTuso: bindActionCreators(requestTuso, dispatch),
        requestWeChat:bindActionCreators(requestWeChat, dispatch),
        push: bindActionCreators(push, dispatch)

    }
}

export const WechatShare = connect(mapStateToProps, mapDispatchToProps)(MyComponent)
