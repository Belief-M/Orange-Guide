// pages/prepay/prepay.js
var lang = { cn: '中文', en : 'English', fr : 'Français', ja : '日本語', ko : '한국어'};
var app= getApp();
Page({
  data:{
    info:{},
    array:[],
    index:0,
    audition:0,
    scenic_id:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    console.log(typeof options.audition)
    if(options.audition == "undefined"){
      options.audition = 0
    }
    this.setData({
      scenic_id:options.id,
      audition:options.audition
    })
    this.requestFind(options.id)
  },
   onShareAppMessage: function() {
    // 用户点击右上角分享
    var index = this.data.index;
    var name = this.data.info.name;
    var id = this.data.info.id;
    var people = this.data.array[index].name;
    return {
      title: ' 体验世界的美：大师讲解小程序', // 分享标题
      desc: ' 我在'+name+'景区请'+people+'给我全程讲解，酣畅淋漓，乐趣多多.....', // 分享描述
      path: '/pages/prepay/prepay?id='+id // 分享路径
    }
  },
  requestFind:function(id){
    app.request.requestFind(
      {scenic_id:id,
      lang:"en"
      },
      (res)=>{
        console.log('res')
        console.log(res)
       
          var array = res.data.body.scenic_spot.price_list;
           if(!array.length){
             console.log("不存在该景点的信息");
             app.showModal("提示：","该景点暂时还未收录语音，请换个景点试试",function(){
               wx.navigateBack({
                 delta: 1, // 回退前 delta(默认为1) 页面
               })
             })
           }
          this.language(array);
          this.setData({
            info:res.data.body.scenic_spot,
            array:array
          })
      },()=>{

      },()=>{

      }
    )
  },
  language:function(array){
    
    for(var i=0;i<array['length'];i++){
      var lan = array[i].lang;
      // array[i].lang = lang[lan];
      array[i].name = array[i].name + "-" + lang[lan] ;
    }
    
  },
   bindPickerChange: function(e) {
    var index = e.detail.value;
    var list = this.data.array;
    this.setData({
       index:index
    })
    
  },
  navigateTo:function(){
    var info = this.data.info;
    var array = this.data.array;
    var index = this.data.index;
    this.requestPerPay(info.id,array[index].expositor_id,app.session_id)

  },
  navigateToPlay:function(){
    var audition = this.data.audition;
    var scenic_id = this.data.scenic_id;
    var array = this.data.array;
    var index = this.data.index;
    console.log(audition)
    console.log("讲解人信息")
    console.log(array[index])
    wx.redirectTo({
      // url: '../audio/audio?scenic_id='+scenic_id+'&audition='+audition
      url:'../auditionList/auditionList?scenic_id='+scenic_id+'&expositor_id='+array[index].expositor_id+'&lang='+array[index].lang
    })
  },
  requestToken(scenic_id,app_session_id){
     app.request.requestCheck(
      {
        scenic_id:scenic_id,
        app_session_id:app_session_id
      },(res)=>{
          var token = res.data.body.token;
          wx.redirectTo({
                  url: '../audio/audio?scenic_id='+scenic_id+'&token='+token
                })
      },()=>{

      },()=>{

      }
     )
  },
  requestPerPay:function(scenic_id,expositor_id,app_session_id){
    console.log("scenic_id,expositor_id,app_session_id")
    console.log(scenic_id,expositor_id,app_session_id)
    if(app_session_id){
         app.request.requestPerPay(
            {
              scenic_id:scenic_id,
              expositor_id:expositor_id,
              app_session_id:app_session_id
          },
          (res)=>{
            var that = this;
            var payInfo = res.data.body;
              console.log(payInfo)
              wx.requestPayment({
                'timeStamp': payInfo.timeStamp,
                  'nonceStr':payInfo.nonceStr,
                  'package': payInfo.package,
                  'signType': payInfo.signType,
                  'paySign': payInfo.paySign,
                  'success':function(res){
                      that.requestToken(scenic_id,app_session_id);
                  },
                  'fail':function(res){
                    console.log("失败的回调")
                    console.log(res)
                  }
              })
          },()=>{

          },()=>{

          }
        )
    }else{
      app.login(function(id){
          app.request.requestPerPay(
            {
              scenic_id:scenic_id,
              expositor_id:expositor_id,
              app_session_id:id
          },
          (res)=>{
            var that = this;
            var payInfo = res.data.body;
              console.log(payInfo)
              wx.requestPayment({
                'timeStamp': payInfo.timeStamp,
                  'nonceStr':payInfo.nonceStr,
                  'package': payInfo.package,
                  'signType': payInfo.signType,
                  'paySign': payInfo.paySign,
                  'success':function(res){
                      that.requestToken(scenic_id,app_session_id);
                  },
                  'fail':function(res){
                    console.log("失败的回调")
                    console.log(res)
                  }
              })
          },()=>{
            
          },()=>{

          }
        )
      })
    }
  }
})