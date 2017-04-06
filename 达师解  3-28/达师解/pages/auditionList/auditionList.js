// pages/auditionList/auditionList.js
var app = getApp();
Page({
  data:{
    view_spots:[],
    status:'stop',
    expositor_id:0,
    actindex:0,
    currentTime:'00:00',
    duration:'00:00',
    scenic_id:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options)
    var scenic_id = options.scenic_id;
    
    this.setData({
      expositor_id:options.expositor_id,
      scenic_id:options.scenic_id,
      lang : options.lang
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.audioCtx = wx.createAudioContext('myAudio');
    this.viewspot(this.data.scenic_id);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    this.setData({
        status:"stop"
    })
  },
  onUnload:function(){
    // 页面关闭
  },
  viewspot:function(scenic_id){
    app.request.requestViewspot(
      {scenic_id:scenic_id},
      (res)=>{
        // console.log(res.data.body.view_spots);
        var view_spots = res.data.body.view_spots;
        var freeView_spots = [];
        for(var i=0;i<view_spots.length;i++){
          if(view_spots[i].free){
            freeView_spots.push(view_spots[i])
          } 
        }
        this.setData({
          view_spots:freeView_spots
        })
        // console.log(freeView_spots)
        // console.log(this.data.view_spots)
        // console.log('this.data.lang')
        // console.log(this.data.lang)
        var first = this.data.view_spots[0];
        var lang = this.data.lang;
        this.audioCtx.setSrc('https://api.jjdashi.com/voice/get?id='+first.id+'&expositor_id='+this.data.expositor_id+'&lang='+lang);
      },
      ()=>{
          console.log("shibai")
      },()=>{
        console.log("zongshi")
      }
    )
  },
  changePlace:function(e){
    this.setData({
        status:"stop"
      })
    console.log(e.target.id)
    var expositor_id = this.data.expositor_id;
    // console.log("讲师ID")
    // console.log(expositor_id)
    var id= e.target.id;
    var lang = this.data.lang;
    this.audioCtx.setSrc('https://api.jjdashi.com/voice/get?id='+id+'&expositor_id='+expositor_id+'&lang='+lang);
    this.audioPlay();
    this.setData({
      actindex:e.target.dataset.actindex
    })
  },
  timeupdate:function(e){
    var that = this;
    var t = e.detail.currentTime;
    var d= e.detail.duration;
    this.setData({
      currentTime:this.formatTime(t),
      duration:this.formatTime(d)
    })
    if(t == d){
     this.setData({
       status:"stop"
     })
     app.showModal("提示","体验世界的美，选择完整版大师讲解",function(){wx.redirectTo({url: '../prepay/prepay?id='+that.data.scenic_id })  })

    //  wx.showModal({
    //    title:"提示",
    //    content:"选择完整版",
    //    success:function(res){
    //      if (res.confirm) {
    //         wx.redirectTo({
    //           url: '../prepay/prepay?id='+that.data.scenic_id
    //         })
    //       }
    //    }
    //  })
    }
  },
  formatTime: function(time) {
		time = Math.floor(time);
		var m = Math.floor(time / 60).toString();
		m = m.length < 2 ? '0' + m : m;

		var s = (time - parseInt(m) * 60).toString();
		s = s.length < 2 ? '0' + s : s;

		return `${m}:${s}`;
	},
  actionEvent:function(){
      var method = this.data.status == 'stop' ? 'start' : 'stop';
      this.setData({
        status: method
      });
      if(method == 'start'){
        this.audioPlay()
      }else{
        this.audioPause()
      }
    },
    // 播放
    audioPlay: function () {
      console.log("点击了开始")
      this.audioCtx.play();
      this.setData({
        status:"start"
      })
    },
    audioPause: function () {
      this.audioCtx.pause();
      
    },
    // binderror:function(){
    //   app.showModal("提示","目前只支持汉语讲解，其他语种敬请期待！")
    // }

})