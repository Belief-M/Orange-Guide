const DASHI_API = "https://api.jjdashi.com";
const SCENICS_API = DASHI_API + "/scenics";
const FIND_API = DASHI_API + "/scenic_spot/find" ;
const VIEWSPOT_API = DASHI_API + "/viewspot/list/query" ;
const VOICEQUERY_API = DASHI_API + "/voice/query" ;
const VOICEGET_API = DASHI_API + "/voice/get" ;
const HELP_API = DASHI_API + "/voice/scenic/help" ;
const LOGIN_api =  DASHI_API+"/weixin/app/login" ;
const CHECK_API　=  DASHI_API + "/weixin/order/check" ;
const PREPAY_API = DASHI_API + "/weixin/order/prepay" ;
const ORDERLIST = DASHI_API + "/weixin/order/list" ;


module.exports={
    SCENICS_API:SCENICS_API,
    FIND_API : FIND_API,
    VIEWSPOT_API : VIEWSPOT_API,
    VOICEQUERY_API : VOICEQUERY_API,
    VOICEGET_API : VOICEGET_API,
    HELP_API : HELP_API,
    LOGIN_api : LOGIN_api,
    CHECK_API　 : CHECK_API　,
    PREPAY_API : PREPAY_API,
    ORDERLIST : ORDERLIST,
}