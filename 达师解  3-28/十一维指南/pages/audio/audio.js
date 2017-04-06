// pages/audio/audio.js
var app= getApp();

Page({
  data:{
    scrieenHeight:0,
    listToggle:false,
    status:'stop',
    scenic_spot:{},
    view_spots:[],
    currentTime:'00:00',
    duration:'02:33',
    name: '',
    src:'',
    token:'',
    scenic_id:0,
    actindex:0
  },
  onLoad:function(options){
    var that = this;
    console.log("options")
    console.log(options)
    this.setData({
      token:options.token,
      scenic_id:options.scenic_id
    })

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    this.audioCtx = wx.createAudioContext('myAudio');
    // this.viewspot(this.data.scenic_id)
   
      this.viewspot(this.data.scenic_id)

  },
   onShow:function(){
    // 生命周期函数--监听页面显示
     
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    this.setData({
      status:"stop"
    })
  },
    onUnload:function(){
    // 生命周期函数--监听页面卸载
    console.log("页面卸载")
    this.setData({
      status:"stop"
    })
    this.audioPause();
  },
  // onShareAppMessage: function() {
  //   // 用户点击右上角分享
  //   return {
  //     title: '体验世界的美：大师讲解小程序', // 分享标题
  //     desc: ' 我在景区使用大师讲解给我全程讲解，酣畅淋漓，乐趣多多.....', // 分享描述
  //     path: '/pages/videp.video' // 分享路径
  //   }
  // },
  //获取景区信息
  viewspot:function(scenic_id){
    app.request.requestViewspot(
      {scenic_id:scenic_id},
      (res)=>{
        console.log(res)
        var first = res.data.body.view_spots[0];
         this.setData({
          'scenic_spot':res.data.body.scenic_spot,
          'view_spots':res.data.body.view_spots,
          name:first.name
        })
        this.audioCtx.setSrc('https://api.jjdashi.com/voice/get?id='+first.id+'&token='+this.data.token);
      },
      ()=>{
          console.log("shibai")
      },()=>{
        console.log("zongshi")
      }
    )
  },
  //景点栏开关
  chooseList:function(){
    this.setData({
      listToggle:!this.data.listToggle
    })
  },
  //暂停/开始
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
  //播放
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
  //重新播放
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  //选择地址
  changePlace:function(e){
    console.log("选择地址")
    app.showToast("正在加载...","loading")
    var id = e.target.id;
    var token = this.data.token;
   console.log('https://api.jjdashi.com/voice/get?id='+id+'&token='+token)
    this.setData({
      name:e.target.dataset.name,
      actindex:e.target.dataset.actindex
    })
    this.audioCtx.setSrc('https://api.jjdashi.com/voice/get?id='+id+'&token='+token);
     this.audioPlay();
 
  },
  timeupdate:function(e){
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
  helpAudio:function(){
     app.showToast("正在加载...","loading")
    this.setData({
      name:"景区帮助语音"
    })
    this.audioCtx.setSrc('https://api.jjdashi.com/voice/scenic/help?id='+this.data.scenic_id+'&token='+this.data.token);
     this.audioPlay();
  },
  error:function(e){
   console.debug(e.detail.errMsg)
   this.setData({
     status:"stop"
   })
    app.showToast("未找到音频文件","loading")
  }
})
