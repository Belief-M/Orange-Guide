// pages/searchScenics/searchScenics.js
var app = getApp();
Page({
  data:{
    searchList:[],
    haveFocus:false,
    scenicsList:[],
    searchKey:'',
    inputValue:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   this.requestScenics(108);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindconfirm:function(e){
    app.showToast("正在加载...","loading")
    // console.log(e.detail.value);
    var searchKey = e.detail.value;
    if(searchKey){
      this.searchScenics(searchKey)
    }
  },
  toSearch:function(){
      var searchKey=  this.data.searchKey;
      this.searchScenics(searchKey)
  },
  bindfocus:function(){
    this.setData({
      haveFocus:true
    })
  },
  bindblur:function(e){
      this.setData({
          searchKey:e.detail.value
      })
  },
  cancel:function(){
    this.setData({
      haveFocus:false,
      inputValue:''
    })
  },
  choosePlace:function(e){
      var id= e.currentTarget.id;
      this.orderCheck(id,app.session_id)
  },
  requestScenics:function(partner_id){
    app.request.requestScenics(
      {partner_id:partner_id},
      (res)=>{
        console.log(res.data)
        this.setData({
           scenicsList:res.data.reverse()
        })
      }
    )
  },
  orderCheck:function(scenic_id,app_session_id ){
    app.request.requestCheck(
      {
        scenic_id:scenic_id,
        app_session_id:app_session_id
      },
      (res)=>{
        console.log("订单核对情况")
        console.log(res)
        if(res.data.code == "301"){
          var token = res.data.body.token;
          wx.navigateTo({
            url: '../audio/audio?scenic_id='+scenic_id+'&token='+token,
            success: function(res){
              // success
            }
          })
        }else if(res.data.code == "403"){
          app.login();
          this.orderCheck(scenic_id,app_session_id)
        }else{
          // this.requestFind(scenic_id)
          var audition = this.data.audition;
          console.log(res.data.message)
          console.log('../prepay/prepay?id='+scenic_id+'&audition='+audition)
          wx.navigateTo({
            url: '../prepay/prepay?id='+scenic_id+'&audition='+audition,
            success: function(res){
              // success
            }
          })
        }
      },
      ()=>{
        console.log("失败333333回调")
      },()=>{
        this.setData({
          audition:0
        })
      }
  )
},
searchScenics:function(searchKey){
  app.request.requestScenics(
    {query:searchKey},
    (res)=>{
      console.log(res.data);
      if(res.data.length){
        app.hideToast();
          this.setData({
          searchList:res.data
        })
      }else{
        console.log("未找到你要的景区信息")
        app.showToast("未找到相关景区信息,换个关键字试试")
      }
      
    }

  )
}
})