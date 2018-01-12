const URL = {
    /*登录*/
    cloudSignLogin:'cloudSignLogin',                                         //获取登录二维码
    cloudSignCheckLogin:'cloudSignCheckLogin',                               //登录状态 （需要改成json方式提交）
    login:'login',                                                           //账号登录
    getLoginErrorCount:'getLoginErrorCount',                                 //获取登录失败次数    
    getCurAccount:'cus/account/getCurAccount',                               //获取用户信息接口
    logoutWithoutPage:'logoutWithoutPage',                                   //退出清除session

    //index
    signDocCount:'doc/documentList/signDocCount',                             //获取(待其他人签，待我签,已完成)数量,
    indexDraft:'doc/documentList/indexDraft',                                 //获取草稿箱数量,    

    //扫码认证
    authQrCodeBind:'sys/auth/authQrCodeBind',                                //扫码认证
    authQrCodeBindCheck:'sys/auth/authQrCodeBindCheck',                      //实名认证扫码状态
    userAuthrity:'sys/auth/userAuthrityLight',                               //实名认证    
    userAuthrityStep:'sys/auth/userAuthrityStepLight',                       //实名认证接口    

    //发起签约
    uploadProgress:'doc/document/uploadProgressLight',    

    //签约页面
    getPdfPageNum:'doc/document/getPdfPageNum',                              //获取文档列表数据
    getPdfImgByPage:'doc/document/getPdfImgByPage',                          //图片链接 ?pageNum=0&docId=9ea2c9b955cb460db7b814326856b241

    //文档列表
    searchDocumentLight:'doc/documentList/searchDocumentLight',              //获取文档列表
    searchDraftLight:'doc/documentList/searchDraftLight',                    //草稿箱

    //个人中心
    verificationCode:'cus/account/verificationCode',                         //获取手机验证码  （params:mobileNo）
    bindPhone:'cus/account/bindPhoneLight',                                  //绑定手机(验证是否为自己的手机号)    
    modifyPhone:'cus/account/modifyPhoneLight',                              //修改手机号码 phoneOld:13533596699 phoneNew:18825039689  code:543989
    modifyPassword:'cus/account/modifyPasswordLight',                        //修改密码（pwdOld：xxx  pwdNew:xxx）
    getIdCardExpire:'sys/auth/getIdCardExpire',                              //获取身份证信息

    //文档详情
    getDocumentInfoVo:'doc/documentInfo/getDocumentInfoVo',                  //获取文档详情信息  
    signtorList:'doc/documentInfo/signtorListLight',                         //获取签署人信息
    signtorListUnion:'doc/documentInfo/signtorListUnion',                    //获取草送人信息


}
export default URL