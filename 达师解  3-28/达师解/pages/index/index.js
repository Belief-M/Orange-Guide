// pages/index/index.js
var app = getApp();
Page({
  data:{
    placeList:[],
    auditionPlaceList:[
      {'id':4,'cover_img':'https://img.jjdashi.com/scenic/4/bg.jpg','name':'北京动物园（试听）',audition:1},
      {'id':16,'cover_img':'https://img.jjdashi.com/scenic/16/bg.jpg','name':'长城（试听）',audition:1},
      {'id':27,'cover_img':'https://img.jjdashi.com/scenic/27/bg.jpg','name':'庙会（试听）',audition:1},
       {'id':10,'cover_img':'https://img.jjdashi.com/scenic/10/bg.jpg','name':'胡同游南锣鼓巷（试听）',audition:1},
      {'id':13,'cover_img':'https://img.jjdashi.com/scenic/13/bg.jpg','name':'西湖（试听）',audition:1},
      {'id':28,'cover_img':'https://img.jjdashi.com/scenic/28/bg.jpg','name':'卢浮宫创想（试听）',audition:1},
     
      
      
    ],
    audition:false
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
     this.requestScenics(105)
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '体验世界的美：大师讲解小程序', // 分享标题
      desc: '', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  //选择景区
  choosePlace:function(e){
    console.log("选择景区")
    console.log(e.currentTarget.dataset.audition)
    var id= e.currentTarget.id;
    var audition = e.currentTarget.dataset.audition;
    if(audition){
      console.log("audition")
    }else{
      audition = 0 ;
      // console.log(audition)
    }
      this.setData({
        audition:audition
      })
    
      this.orderCheck(id,app.session_id) 
    
    // this.orderCheck(id,app.session_id) 
  },
  //请求景区列表
  requestScenics:function(partner_id){
    app.request.requestScenics(
      {partner_id:partner_id},
      (res)=>{
        // console.log(res.data)
        this.setData({
           placeList:res.data.reverse()
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
        // console.log("订单核对情况")

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
          // console.log(res.data.message)
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

 
  goToSearch:function(e){
    wx.navigateTo({
      url: '../searchScenics/searchScenics'
    })
  }
})