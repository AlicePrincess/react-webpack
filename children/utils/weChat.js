export function wxChat(data) {
    wx.config({
        debug: false,
        appId: data.getIn(['appId']), // 必填，公众号的唯一标识
        timestamp: data.getIn(['timestamp']), // 必填，生成签名的时间戳
        nonceStr: data.getIn(['nonceStr']), // 必填，生成签名的随机串
        signature: data.getIn(['signature']), // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'showAllNonBaseMenuItem'
        ]
    });
}

export function wxChatShare(title, desc, imgUrl,linkUrl,_this,successInfo) {
  let appMessage = {
      title: title,
      desc: desc,
      imgUrl: imgUrl,
      link: "https://api.childhood.tusoapp.com/index/gateway"+linkUrl,
      success: function(res) {

        _this.setState({
          share:false
        })
      }
  };
    if(successInfo){
       appMessage = {
          title: title,
          desc: desc,
          imgUrl: imgUrl,
          link: "http://childhood.tusoapp.com/index.html"+linkUrl,
          success: function(res) {

            _this.setState({
              share:false
            })
          }
      };
    }else{

       appMessage = {
          title: title,
          desc: desc,
          imgUrl: imgUrl,
          link: "https://api.childhood.tusoapp.com/index/gateway",
          success: function(res) {

            _this.setState({
              share:false
            })
          }
      };
    }

    wx.showAllNonBaseMenuItem();
    wx.onMenuShareAppMessage(appMessage); //朋友
    wx.onMenuShareTimeline(appMessage); //朋友圈
    wx.onMenuShareQQ(appMessage); //分享到QQ
    wx.onMenuShareWeibo(appMessage); //分享到腾讯微博
    wx.onMenuShareQZone(appMessage);

}
