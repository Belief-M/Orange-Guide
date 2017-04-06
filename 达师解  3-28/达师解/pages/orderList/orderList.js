// pages/orderList/orderList.js
var lang = { cn: '中文', en : 'English', fr : 'Français', ja : '日本語', ko : '한국어'};
var app = getApp();
var util = require("../../util/util.js");
Page({
  data:{
    orders:[],
    nothing:false,
    info:{},
    array:[],
    index:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   if(app.session_id){
       this.requestOrder(app.session_id);
   }else{
    console.log("app.session_id不存在")
    var that = this;
     app.login(function(id){
       that.requestOrder(id)
     })
   }
     
    
  },
  requestOrder:function(id){

      app.request.requestOrderList(
        {
          app_session_id:id
        },(res)=>{
          
          var  orderList = res.data.body.orders ;
            if(orderList.length){
                for(var i=0;i<orderList.length;i++){
                orderList[i].create_time = util.formatTime(new Date(orderList[i].create_time))
              }
              this.setData({
                nothing:false,
                orders:res.data.body.orders
              })
            }else{
                this.requestFind(21)
                this.setData({
                  nothing:true
                })
                
            }    
        }
      )
  },
  navigater:function(e){
    var scenic_id = e.currentTarget.dataset.scenic_id ;
    var token = e.currentTarget.dataset.token;
    wx.navigateTo({
      url: '../audio/audio?scenic_id='+scenic_id+'&token='+token
    })
  },

  requestFind:function(id){
    app.request.requestFind(
      {scenic_id:id},
      (res)=>{
        console.log(res)
          var array = res.data.body.scenic_spot.price_list;
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
      array[i].lang = lang[lan];
      array[i].name = array[i].name + "-" + array[i].lang ;
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
  requestToken(scenic_id,app_session_id){
     app.request.requestCheck(
      {
        scenic_id:scenic_id,
        app_session_id:app_session_id
      },(res)=>{
          var token = res.data.body.token;
          wx.redirectTo({
                  url: '../accredit/accredit?scenic_id='+scenic_id+'&token='+token
                })
      },()=>{

      },()=>{

      }
     )
  },
  requestPerPay:function(scenic_id,expositor_id,app_session_id){
    console.log("scenic_id,expositor_id,app_session_id")
    console.log(scenic_id,expositor_id,app_session_id)
    app.request.requestPerPay(
        {
          scenic_id:scenic_id,
          expositor_id:expositor_id,
          app_session_id:app_session_id
      },
      (res)=>{
        var that = this;
        // console.log("预支付返回的信息")
        console.log(res)
        //  console.log("预支付返回的信息")
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
                  
                // console.log("token")
                // console.log(res)
                // wx.redirectTo({
                //   url: '../video/video?scenic_id='+scenic_id+'&token='+res.token
                // })
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
  }
})