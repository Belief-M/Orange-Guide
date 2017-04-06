var util = require("../util/util.js");
var api = require("api.js");
function request(url,data,successCb,failCb,completeCb){
    wx.request({
      url: url,
      data:data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        util.isFunction(successCb) && successCb(res)
      },
      fail: function(res) {
        // fail
        util.isFunction(failCb) && failCb(res)
      },
      complete: function(res) {
        // complete
        util.isFunction(completeCb) && completeCb(res)
      }
    })
}

function requestScenics(data,successCb,failCb,completeCb){
    request(api.SCENICS_API,data,successCb,failCb,completeCb)
}
function requestFind(data,successCb,failCb,completeCb){
    request(api.FIND_API,data,successCb,failCb,completeCb)
}
function requestViewspot(data,successCb,failCb,completeCb){
    request(api.VIEWSPOT_API,data,successCb,failCb,completeCb)
}
function requestVoiceQuery(data,successCb,failCb,completeCb){
    request(api.VOICEQUERY_API,data,successCb,failCb,completeCb)
}
function requestVoiceGet(data,successCb,failCb,completeCb){
    request(api.VOICEGET_API,data,successCb,failCb,completeCb)
}
function requestHelp(data,successCb,failCb,completeCb){
    request(api.HELP_API,data,successCb,failCb,completeCb)
}
function requestLogin(data,successCb,failCb,completeCb){
    request(api.LOGIN_api,data,successCb,failCb,completeCb)
}
function requestCheck(data,successCb,failCb,completeCb){
    request(api.CHECK_API　,data,successCb,failCb,completeCb)
}
function requestPerPay(data,successCb,failCb,completeCb){
    request(api.PREPAY_API,data,successCb,failCb,completeCb)
}
function requestOrderList(data,successCb,failCb,completeCb){
    request(api.ORDERLIST,data,successCb,failCb,completeCb)
}

module.exports={
    requestScenics:requestScenics,
    requestFind : requestFind ,
    requestViewspot : requestViewspot ,
    requestVoiceQuery : requestVoiceQuery ,
    requestVoiceGet : requestVoiceGet ,
    requestLogin : requestLogin ,
    requestHelp : requestHelp ,
    requestCheck : requestCheck ,
    requestPerPay : requestPerPay ,
    requestOrderList : requestOrderList ,
}