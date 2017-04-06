var request = require("request/request.js");
var api = require("request/api.js");
var util = require("util/util.js");
App({
  onLaunch: function () {
    this.login()
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onError: function (msg) {
    
  },
  //获取系统信息
  getSystemInfo:function(cb){
    var that = this;
    wx.getSystemInfo({
       success:function(res){
         console.log(res.windowHeight)
         cb(res.windowHeight)
       }
    })
  },
  //登陆
  login:function(cb){
    var that = this;
    console.log("确认11111登陆")
    wx.login({
      success: function(res){
        console.log(res)
        request.requestLogin(
          {
            appid:"wx58e0d6253d5073b2",
            code:res.code
          },
          (res)=>{
            util.isFunction(cb)&&cb(res.data.body.session_id)
            console.log(res)
            console.log(res.data.body.session_id)
           that.session_id = res.data.body.session_id    
          }
        )
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

  },
  showToast:function(title,icon){
    wx.showToast({
      title:title,
      icon:icon,
      duration:1500
    })

    // setTimeout(function(){
    //   wx.hideToast()
    // },2000)
  },
  hideToast:function(){
    wx.hideToast()
  },
  showModal:function(title,content,cb){
     wx.showModal({
       title:title,
       content:content,
       success:function(res){
         if (res.confirm) {
            cb()
          }
       }
     })    
  },
  session_id:"",
  request:request,
  api:api
})