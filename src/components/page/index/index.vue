<template>
    <section class="index" v-if="curAccount">
        <div class="userInfo clf">
            <ul>
                <li>
                    <a href="javascript:;">
                        <img src="../../../assets/images/user.jpg" alt="">
                        <h3>{{curAccount.memName ? curAccount.memName : curAccount.displayName}}<span :class="[curAccount.accExtType ? 'real':'']"><i class="iconfont icon-solid_check"></i>{{curAccount.accExtType ? '已认证':'未认证'}}</span></h3>  <!--real-->
                        <p>{{curAccount.mobileNo ? curAccount.mobileNo : curAccount.accNo}}</p>
                    </a>
                </li>
                <li>
                    <router-link to="user/cert">
                        <p class="iconfont icon-cert "></p>
                        <p>我的证书</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="user/seal">
                        <p class="iconfont icon-com_sign"></p>
                        <p>我的签章</p>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:;">
                        <p>13</p>
                        <p>可签次数</p>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <p>0</p>
                        <p>可用模板</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="realNo">
            <p>真宜签的账号还未进行实名认证，认证后将获得以下真宜签专业电子合同服务</p>
            <ul class="clf">
                <li>专属CA证书</li>
                <li>专属CA证书</li>
                <li>电子合同法律有效险</li>
                <li>司法鉴定报告</li>
            </ul>
            <a href="javascript:;" @click="realClick">去认证</a>
        </div>
        <div class="signFile">
            <input type="file" id="file" class="filestyle" />
            <div class="dashed" id="drop_area">
                <!-- <img v-if="!isImg" src="../../assets/image/shangchuan.png"  class="upfile"/> -->
                <img v-if="isImg"  src="../../../assets/images/file_pdf.png"  class="upfile"/>
                <p v-if="isImg" class="up-word" id="upword">{{pdfFileName}}</p>
                <p class="mark" v-if="!isImg">*点击选择上传文件或拖动文件到此处</p>
                <p class="tip">支持 .doc/.docx/.pdf 文件格式  文档大小 < 10MB</p>
                <a href="javascript:;"><i class="iconfont icon-edit"></i>发起签约</a>
            </div>
        </div>
        <div class="menuTab clf">
            <ul class="clf">
                <li>
                    <router-link :to="{ name: 'ManaFile', query: { tabIndex: 3 ,tabStatus:202,pageIndex:1}}">
                        <i class="iconfont icon-waitother"></i>
                        <h3>{{showNum.one}}</h3>
                        <p>待其他人签</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'ManaFile', query: { tabIndex: 2 ,tabStatus:201,pageIndex:1}}">
                        <i class="iconfont icon-waitme"></i>
                        <h3>{{showNum.two}}</h3>
                        <p>待我签</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'ManaFile', query: { tabIndex: 6 ,tabStatus:'draf',pageIndex:1}}">
                        <i class="iconfont icon-darft"></i>
                        <h3>{{showNum.three}}</h3>
                        <p>草稿箱</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'ManaFile', query: { tabIndex: 4 ,tabStatus:300,pageIndex:1}}">
                        <i class="iconfont icon-finish"></i>
                        <h3>{{showNum.four}}</h3>
                        <p>已完成</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="nearFile">
            <Table :tableTitle="'最近文档'" :pageNumberState="false" :tableLoading="file.loading" :tableClass="'table-file'" :total="file.total">
                <div slot="panel-header">
                    <h3 class="title">最近文档<router-link to="/manafile" class="more">更多>></router-link></h3>
                </div>
                <ul slot="panel-content">
                    <li class="clf" v-for="(item,index) in file.list" :key="index" :class="[!item.news ? 'icon' : '']">
                        <span><img src="../../../assets/images/user.jpg" alt=""></span>
                        <span>{{item.senderName}}</span>
                        <span>{{item.docName}}</span>
                        <span>{{fileState(item.signStatus)}}</span>
                        <span>{{item.duration}}</span>
                        <span><router-link :to="{name:'Detail',params:{docId:item.docId},query:{enter:'index'}}">查看</router-link></span>
                    </li>
                </ul>
            </Table>
        </div>
        <alertModel :title="'实名认证'" :sureBtnTxt="real.sureBtnTxt" class="bigUserModel"  :alelrtClassWidth="'700px'" :showState="real.state" :type="2" v-show="real.state"  @sureHandle="sureRealHandle">
            <div slot="alert-header" class="saoma clf">        
                <p v-show="real.num != 2">{{real.num == 0 ? '上传身份证认证':'手机扫码，真宜签认证'}}</p>
                <p style="cursor:pointer;" v-show="real.num == 2" @click="backScanStep"><i class="iconfont icon-back"></i>手机实名认证步骤</p>
                <i v-show="real.num != 2" class="iconfont" :class="[real.num == 0 ? 'icon-ewm_real':'icon-pc']" @click="changeRealState"></i>
                <i v-show="real.num != 2" class="iconfont" :class="[real.num == 0 ? 'icon-sm':'icon_real']"></i>
            </div>
            <div slot="alert-content" class="clf security_real">
                <div class="real" v-show="real.num == 0">
                    <form id="realBox" method="post" enctype="multipart/form-data">
                        <div class="certimg">
                            <a href="javascript:;" class="font" @click="uploadImgChange('frontImg','frontFile')">
                                <div class="imgBg">
                                    <img src="../../../assets/images/sfz_front.png" alt="">
                                </div>                            
                                <p>点击上传身份证人像面</p>
                                <div class="frontImg" >
                                    <img src="../../../assets/images/transparent.png" id="frontImg"/>
                                </div>
                                <input type="file" id="frontFile" name="idcard_file_f">
                            </a>    
                        </div>
                        <div class="certimg">
                            <a href="javascript:;" class="back" @click="uploadImgChange('backImg','backFile')">
                                <div class="imgBg">
                                    <img src="../../../assets/images/sfz_back.png" alt="">
                                </div>
                                <p>点击上传身份证国徽面</p>
                                <div class="backImg">
                                    <img src="../../../assets/images/transparent.png" id="backImg"/>
                                </div>
                                <input type="file" id="backFile" name="idcard_file_b">
                            </a>     
                        </div>
                    </form>
                    <div class="clf tipBox">
                        <p class="frontTip"></p>
                        <p class="backTip"></p>
                        <p class="allTip" style="width:100%;"></p>
                    </div>
                    <p class="clf" v-if="mobileStatus != 1">
                        <label for=""><b>*</b>手机号码</label>
                        <input type="text" v-model.trim="real.mobile">
                    </p>
                    <p class="clf code" v-if="mobileStatus != 1">
                        <label for=""><b>*</b>验证码</label>
                        <input type="text" v-model.trim="real.code">
                        <a href="javascript:;" class="sendCode" @click="getCode(0)">获取验证码</a>
                    </p>
                    <p class="clf">
                        <label for=""><b>*</b>真实姓名</label>
                        <input type="text" v-model.trim="real.idCardName">
                    </p>
                    <p class="clf">
                        <label for=""><b>*</b>身份证号</label>
                        <input type="text" v-model.trim="real.idCardNo">
                    </p>
                </div>
                <div class="realEwm" v-show="real.num == 1">
                    <div class="ewm-box clf">
                        <span>
                            <b>
                                <img v-show="!scanImg" src="" alt="二维码生成中">
                                <img v-show="scanImg" :src="'data:image/png;base64,'+scanImg" alt="二维码生成中">                                
                                <b class="refushEwm" v-show="overState">
                                    <a href="javascript:;" @click="getScanImg">刷新二维码</a>
                                </b>
                            </b>
                            <p>{{scanTxt}}</p>
                        </span>
                        <span>
                            <img src="../../../assets/images/shoujitu.png" alt="">
                        </span>
                    </div>
                    <div class="ewm-tip">
                        <p>
                            使用你的手机版 <a href="http://m.gdca.com.cn/" target="_blank">真宜签</a> 完成实名认证 | <a href="javascript:;" @click="goStep">手机实名认证步骤</a><br>扫一扫完成网页端实名认证
                        </p>
                    </div>
                </div>
                <div class="realStep clf" v-show="real.num == 2">
                    <ul class="clf">
                        <li>
                            <img src="../../../assets/images/pic01.png" alt="">
                            <p>点击"个人中心"</p>
                        </li>
                        <li>
                            <img src="../../../assets/images/pic02.png" alt="">
                            <p class="step2">点击"开始实名认证"</p>
                        </li>
                        <li>
                            <img src="../../../assets/images/pic03.png" alt="">
                            <p class="step3">认证完成</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="alert-footer" class="bottom">
                <div v-show="real.num == 0" :class="mobileStatus != 1 ? 'marginTop20':''">
                    <a class="center-btn" @click="sureRealHandle">{{real.sureBtnTxt}}</a>
                </div>
                <i class="iconfont icon-close" @click="closeRealModel"></i>
            </div>
        </alertModel>
        <Loading :text="'身份证识别中,请稍等'" v-show="realState"></Loading>
        <!-- 确认扫码实名认证 -->
        <alertModel :title="'当前用户与真宜签用户信息不匹配'"  :type="2" :alelrtClassWidth="'600px'"  v-show="scanState"  @cancelHandle="cancelScanHandle" @sureHandle="sureScanHandle">
            <div slot="alert-content" class="scan-model">
                <p v-show="!matching.name">当前用户的姓名<span>{{scanData.curName}}</span>将更改为<span>{{scanData.authName}}</span></p>
                <p v-show="!matching.phone">当前用户的手机<span>{{scanData.curPhone}}</span>将更改为<span>{{scanData.authPhone}}</span></p>
            </div>
        </alertModel>
    </section>
    
</template>
<script>
    import translateImg from '@/assets/images/transparent.png';
    export default{
        name:'index',
        data(){
            return{
                curAccount:{},
                mobileStatus:0,            //绑定手机状态  1为已绑定
                realState:false,           //实名状态
                real:{                     //实名认证
                    state:false,           //状态
                    num:0,                 //0-实名认证  1-扫码认证
                    frontImg:null,         //身份证正面
                    backImg:null,          //身份证反面
                    idCardName:null,       //真实姓名
                    idCardNo:null,         //身份证号
                    idCardToken:null,      //身份证token
                    sureBtnTxt:'确定',     
                    mobile:'',
                    code:''
                },
                //扫码认证
                scanState:false,    
                scanTxt:'',           //扫描状态
                overState:false,      //扫描是否超时
                scanNum:0,            //扫码失败次数
                matching:{            //信息匹配
                    name:true,        //匹配
                    phone:true,       //匹配
                },
                scanTimer:null,       //扫码计时器
                scanImg:null,         //实名认证二维码
                claimUuid:null,       //获取二维码返回的id
                confirm:false,   
                scanData:{
                    curName:null,
                    curPhone:null,
                    authName:null,
                    authPhone:null,
                },
                sendCodeState:true,    //可不可以发送验证码（true 可发送）
                ResetCodeTime:0,       //倒计时
                /*发起签约 */
                signTitle: '',   //文档名称
                signFile: {},    //文档流
                pdfFileName:'请上传需要签署的PDF文件',
                isImg: false,    //是否上传了pdf
                /*最近文档 */
                file:{
                    list:[],
                    loading:false,
                    total:null
                },
                //获取数量
                showNum:{
                    one:'',
                    two:'',
                    three:'',
                    four:''
                },
                totalNum:null,
            }
        },
        methods:{
            fileState(value){
                var statusTxt = '';
                switch(value){
                    case '200':
                        statusTxt = "待签署";
                        break;
                    case '201':
                        statusTxt = "待我签";
                        break;
                    case '202':
                        statusTxt = "待他人签";
                        break;
                    case '300':
                        statusTxt = "已完成";
                        break;
                    case 'D400':
                        statusTxt = "已撤销";
                        break;
                    default:
                        break;
                        
                }
                return statusTxt;
            },
            //获取最近文档
            searchDocumentLight(){
                this.file.loading = true;
                this.httpGet(this.URL['searchDocumentLight'],{
                    page:1,
                    pageSize:5,
                    signStatus:'',
                    condition:'',
                    beginTime:'',
                    endTime:'',
                },(json)=>{
                    if(json.meta.success){
                        this.file.list = json.data.list;
                        this.file.total = json.data.totalCount;
                        this.file.loading = false;
                    }
                })
            },
            //小b，大buser
            signDocCount(status,num){    //获取数量             
                this.httpGet(this.URL.signDocCount,{
                    signStatus:status
                },(json)=>{
                    // let result = json;
                    if(num == 1){
                        this.showNum.one = json;                        
                    }
                    if(num == 2){
                        this.showNum.two = json;
                    }
                    if(num == 4){
                        this.showNum.four = json;
                    }
                    // this.totalNum = this.totalNum + json;
                })
            },
            indexDraft(){  //获取草稿箱数据
                this.httpGet(this.URL.indexDraft,{},(json)=>{
                    this.showNum.three = json;
                    // this.totalNum = this.totalNum + response.data;
                })
            },
            realClick(){   //点击实名认证(有待修正)
                //if(this.userState == 2){   //大Buser实名认证
                    this.real.state = true;
                    this.real.num = 0;
                    //初始化实名认证数据            
                    this.real.frontImg = false;
                    this.real.backImg = false;
                    this.real.idCardNo = this.real.idCardName = this.real.idCardToken = null;
                    this.real.mobile = '';
                    $(".frontTip,.backTip,.allTip").text('');
                    $("#frontImg,#backImg").attr('src',translateImg);
                    $(".imgBg").show().siblings('p').show(); 
                //}
                /*if(this.userState == 3){
                    this.$router.push({
                        name:"companyReal"
                    });
                }  */                           
            },
            closeRealModel(){  //关闭实名认证弹框
                this.real.state = false;
                this.ResetCodeTime = 0;
                clearInterval(this.scanTimer);
            },
            cancelScanHandle(){  //取消覆盖信息
                this.scanState = false;
                this.getScanImg();
            },
            sureScanHandle(){  //扫码信息不匹配，确定实名认证并覆盖信息
                this.confirm = true;
                this.authQrCodeBindCheck();
            },
            authQrCodeBindCheck(){
                this.httpGet(this.URL.authQrCodeBindCheck,{
                    claimUuid:this.claimUuid,
                    confirm:this.confirm
                },(result)=>{
                    if(result.meta.success){
                        this.modelCommonTip('实名认证成功!');
                        this.getData();
                        this.real.state=false;
                        this.scanState = false;     
                        clearInterval(this.scanTimer);                
                    }else{
                        let msg = result.meta.message;
                        if(msg == 'confirm'){  //真宜签账号和当前账号不匹配
                            this.scanData.curName = result.data.curName;
                            this.scanData.curPhone = result.data.curPhone,
                            this.scanData.authName = result.data.authName;
                            this.scanData.authPhone = result.data.authPhone;
                            if(this.scanData.curName === this.scanData.authName){
                                this.matching.name = true;
                            }else{
                                this.matching.name = false;
                            }
                            if(this.scanData.curPhone === this.scanData.authPhone){
                                this.matching.phone = true;
                            }else{
                                this.matching.name = false;
                            }
                            this.scanState = true;
                            clearInterval(this.scanTimer);
                            this.scanTxt = '';
                        }else if(msg == 'LOADING'){
                            this.scanTxt="扫码成功，等待输入pin码";
                             this.overState = true;
                        }else if(msg == 'CANCEL'){
                            this.scanTxt = '用户取消授权';
                            this.overState = true;
                            clearInterval(this.scanTimer);
                        }else if(msg == 'TIME_OUT'){
                            this.scanTxt = '二维码失效';
                            this.overState = true;
                            clearInterval(this.scanTimer)
                        }else if(msg == 'no.login'){   //下面是签吧的失败判断
                            this.modelCommonTip('请重新登录');

                        }else if(msg == 'not.allow' || msg == 'acc_type'){
                            this.modelCommonTip('您无权限');
                        }else if(msg == 'binded'){
                            this.modelCommonTip('您已实名认证');
                        }else if(msg == 'ERROR'){
                            this.modelCommonTip("服务器忙，请稍后重试");
                        }else if(msg == 'PHONE_BINDED'){
                            this.modelCommonTip('该手机号已绑定');
                            this.scanTxt = '该手机号已绑定';
                            this.scanState = false;
                            this.overState = true;
                            clearInterval(this.scanTimer)
                        }else{
                            
                        }
                    }
                })
            },
            changeRealState(){    //切换实名认证方式
                this.real.num = this.real.num == 0 ? 1 : 0;
                if(this.real.num == 1){
                    this.ResetCodeTime = 0;
                    this.sendCodeState = true;
                    this.getScanImg();
                }else{
                    clearInterval(this.scanTimer);                    
                }

            },
            getScanImg(){        //扫码认证获取二维码
                this.scanTxt = '';
                this.overState = false;
                clearInterval(this.scanTimer);
                this.httpGet(this.URL.authQrCodeBind,{},(result)=>{
                    // let result = response.data;
                    if(result.meta.success){
                        this.scanImg = result.data.qRCodeBase64;
                        this.claimUuid = result.data.claimUuid;
                        this.scanTimer = setInterval(()=>{
                            this.authQrCodeBindCheck();
                        },1000);
                    }else{
                        ++this.scanNum;
                        let msg = result.meta.message;                        
                        if(msg == 'no.login'){
                            this.modelCommonTip('请重新登录');
                            setTimeout(()=>{
                                window.location.href = this.linkHref + 'logout'
                            },2000)
                        }else if(msg == 'acc_type'){
                            this.modelCommonTip('您没有权限');
                        }else if(msg == 'binded'){
                            this.modelCommonTip("您已实名认证");
                        }else if(msg == 'busy'){
                            if(this.scanNum < 3){
                                this.getScanImg();
                            }else{
                                this.modelCommonTip('服务器忙，请稍后再试');
                                this.overState = true;
                            }                            
                        }else{
                            if(this.scanNum < 3){
                                this.getScanImg();
                            }else{
                                this.modelCommonTip('服务器忙，请稍后再试');
                                this.overState = true;
                            }
                        }
                    }
                })
            },
            goStep(){  //手机认证步骤
                this.real.num = 2;
                clearInterval(this.scanTimer);
            },
            backScanStep(){  //回到实名认证
                this.real.num = 1;
                this.getScanImg();
            },
            beforeReal(){    //实名认证前的验证
                if(!this.real.frontImg){
                    this.modelCommonTip('请上传身份证正面图片');
                    return false;
                }
                if(!this.real.backImg){
                    this.modelCommonTip('请上传身份证反面图片');
                    return false;
                }
                if(!this.real.idCardName){
                    this.modelCommonTip('真实姓名不能为空');
                    return false;
                }
                if(this.real.idCardName == ''){
                    this.modelCommonTip('真是姓名不能为空');
                    return false;
                }
                if(!this.real.idCardNo){
                    this.modelCommonTip('身份证号不能为空');
                    return false;
                }
                if(this.real.idCardNo == ''){
                    this.modelCommonTip('身份证号不能为空');
                    return false;
                }
                if(!this.validateQb.isCardNo(this.real.idCardNo)){
                    this.modelCommonTip('身份证号码不合法，请核对');
                    return false;
                }
                return true;
            },
            sureRealHandle(){ //点击实名认证确定按钮
                if(this.real.sureBtnTxt != '确定') return
                if(!this.beforeReal()) return;                 
                this.real.sureBtnTxt = "提交中...";
                if(this.mobileStatus != 1){  //未绑定手机（先绑定手机）
                    this.bindPhoneHandle(this.real.mobile,this.real.code,()=>{
                        this.userAuthrityHandle();  //调用实名认证接口
                    })
                }else{
                    this.userAuthrityHandle();
                }              
            },
            bindPhoneHandle(phone,code,success){   //绑定手机
                this.httpPost(this.URL.bindPhone,{
                    phone:phone,
                    code:code
                },(result)=>{
                    if(result.meta.success){
                        success();
                    }else{
                        this.real.sureBtnTxt = "确定";
                        let msg = result.meta.message;
                        if(msg == 'overtime'){
                            this.modelCommonTip('超时！请重新获取验证码！');
                        }else if(msg == 'wrong'){
                            this.modelCommonTip("验证码错误");
                        }else if(msg == 'wrongPhone'){
                            this.modelCommonTip('手机格式错误');
                        }else{
                            this.modelCommonTip(msg);
                        }
                    }
                    
                })
            },
            userAuthrityHandle(){  //调用实名认证接口
                this.real.sureBtnTxt = "提交中...";
                this.httpPost(this.URL.userAuthrity,{
                    "idCardName": this.real.idCardName,
                    "idCardNo":this.real.idCardNo,
                    "idCardToken":this.real.idCardToken
                },(result)=>{
                    this.real.sureBtnTxt = "确定";
                    if(result.meta.success){
                        this.real.state = false;
                        this.getData();
                        this.modelCommonTip("实名认证成功");

                        //初始化验证码数据
                        this.ResetCodeTime = 0;
                        this.sendCodeState = true;
                        $(".sendCode").text("获取验证码");
                        $(".sendCode").css({'cursor':'pointer','background':"#fff"});
                        
                    }else{
                        let msg = result.meta.message;
                        if(msg == 'NO_LOGIN'){
                            this.modelCommonTip("登录已过期");
                            setTimeout(()=>{
                                window.location.href=this.linkHref+"login";
                            },2000)
                        }else if(msg == 'dunplicate.phone'){
                            this.modelCommonTip("该手机号已经实名认证过了，不能重复认证");
                        }else if(msg == 'identify.false'){
                            this.modelCommonTip("该姓名与身份证号码不对应，请确认");
                        }else if(msg == 'identify.error'){
                            this.modelCommonTip("身份证信息验证失败，请重试")
                        }else if(msg == 'ERROR'){
                            this.modelCommonTip("系统异常，请稍候重试");
                        }else if(msg == 'WRONG_ACCOUNT_TYPE'){
                            this.modelCommonTip("实名认证的账户类型不正确");
                        }else if(msg == 'NO_PARAM'){
                            this.modelCommonTip("参数为空");
                        }else if(msg == 'NO_RESPONSE'){
                            this.modelCommonTip("系统异常，请稍后重试");
                        }else if(msg == 'DUNPLICATE'){
                            this.modelCommonTip("此手机号或身份证已被认证，不能重复申请");
                        }else if(msg == 'NOT_RELATE'){
                            this.modelCommonTip("上传的身份证照与填写的姓名不匹配");
                        }else if(msg == 'BAD_DATA'){
                            this.modelCommonTip("实名认证数据错误，认证失败");
                        }else{
                            this.modelCommonTip(msg);
                        }
                    }
                })
            },
            realHandle(){   //调用OCR
                let This = this;
                if(!this.real.frontImg){
                    $(".frontTip").text("请上传身份证正面图片")
                    return;
                }
                if(!this.real.backImg){
                    $(".backTip").text("请上传身份证背面图片")
                    return;
                }
                this.realState = true;
                let formData = new FormData();             
                formData.append('idcard_file_f', $('#frontFile')[0].files[0]);
                formData.append('idcard_file_b', $('#backFile')[0].files[0]);
                $.ajax({
                    url: This.apiPath+This.URL['userAuthrityStep'],
                    dataType: 'json',
                    type: 'POST',
                    // headers: {'token': sessionStorage.getItem("token")},
                    processData: false,
                    contentType: false,
                    cache: false,
                    data: formData,
                }).done((result) => {
                    This.realState = false;
                    This.real.idCardToken = result.data.idCardToken;
                    if(result.meta.success){
                        This.real.idCardName = result.data.idCardName;
                        This.real.idCardNo = result.data.idCardNo;
                        $(".allTip").text("身份证上传完成");
                        $(".frontTip,.backTip").text("");
                        This.realState = false;
                    }else{
                        if(result.meta.message == 'invalid.data.idcard_f'){
                            $(".frontTip").text("请重新上传身份证正面图片")
                        }else if(result.meta.message == 'invalid.data.idcard_b'){
                            $(".backTip").text("请重新上传身份证背面图片")
                        }else if(result.meta.message == 'error'){
                            This.modelCommonTip("服务器异常，请稍后重试");
                        }else{
                            This.modelCommonTip(result.meta.message)
                        }
                    }

                }).fail((err) => {
                    console.log(err)    
                });
            },
            //实名认证上传图片
            uploadImgChange(objImg,obj){   //点击上传图片
                $("#"+obj).val("");
                $(".allTip").text("");
                $("#"+obj).unbind().on('change',()=>{
                    let name = $("#"+obj).val().split('.')[1];
                    if(name != 'png' &&  name != "gif" && name != "jpg" && name != "jpeg"){
                        this.modelCommonTip("不支持该类型，请上传png、gif或jpg类型图片");
                        return false;
                    }
                    var oMyFile = $("#"+obj);
                    if(oMyFile.files){  //判断ie是否支持此属性
                        let filesSize = $("#"+obj)[0].files[0].size/1024/1024;
                        if(filesSize > 2){
                            this.modelCommonTip("请上传小于2M的图片");
                            return false;
                        }
                    }                    
                    this.change(objImg, obj);

                    if(objImg == 'backImg'){   
                        $('.backTip').text("");
                        $('.backImg').siblings('.imgBg').hide();
                        $('.backImg').siblings('p').hide();
                    }else{
                        $('.frontTip').text("");
                        $('.frontImg').siblings('.imgBg').hide();    
                        $('.frontImg').siblings('p').hide();                    
                    }
                    
                //    $('#stampFile').val('');  //解决第二次选同一张图片，不能触发onchange事件
                })
            },
            change(pre_id,file_id) {
                let This = this;
                var pic = document.getElementById(pre_id), file = document.getElementById(file_id);
                if (file == undefined || file == '') {
                    return;
                }
                var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
                if(ext == ''){
                    return;
                }
                if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif'){
                    this.modelCommonTip("图片的格式必须为png、jpg、gif格式！");
                    return;
                }
            
                if(file.files){
                    this.html5Reader(file,pre_id);
                }else{
                    file.select();
                    file.blur();
                    var reallocalpath = document.selection.createRange().text;
                    pic.width=116;
                    pic.height=86;
                    pic.style.opacity = 1;
                    pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")";
                    pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                    if(pre_id == 'backImg'){
                        This.real.backImg = true;
                    }else{
                        This.real.frontImg = true;
                    }
                    setTimeout(()=>{
                        if(This.real.frontImg && This.real.backImg){
                            This.realHandle();
                        }
                    }) 
                }
            },
            html5Reader(file,pre_id){
                let This = this;
                var file = file.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    var pic = document.getElementById(pre_id);
                    $(pic).css('opacity',1);
                    pic.src=this.result;
                    if(pre_id == 'backImg'){
                        This.real.backImg = true;
                    }else{
                        This.real.frontImg = true;                        
                    }
                    setTimeout(()=>{
                        if(This.real.frontImg && This.real.backImg){
                            This.realHandle();
                        }
                    }) 
                }
            },
            getCode(num){  //获取验证码 (0-实名认证获取验证码   1-绑定手机或者修改手机获取验证码)        
                if(this.validateQb.isEmpty(this.real.mobile)){
                    this.modelCommonTip('手机号码不能为空');
                    return false;
                }
                if(!this.validateQb.isPhone(this.real.mobile)){
                    this.modelCommonTip('手机号码格式不正确');
                    return false;
                }    
                if(!this.sendCodeState) return false;  
                this.httpGet(this.URL.verificationCode,{
                    mobileNo:this.real.mobile
                },(result)=>{
                    if(result == "success"){
                        this.sendCodeState = false;
                        this.ResetCodeTime = 60;
                        this.resetCode();          
                    }
                })
            },
            resetCode(){ //验证码倒计时
                this.ResetCodeTime -- ;
                if(this.ResetCodeTime <= 0){
                    this.ResetCodeTime = 60;
                    this.sendCodeState = true;
                    $(".sendCode").text("获取验证码");
                    $(".sendCode").css({'cursor':'pointer','background':"#fff"});
                }else{
                    $(".sendCode").text("重新发送("+this.ResetCodeTime+'s)');
                    $(".sendCode").css({'cursor':'not-allowed','background':'#e6e7ed'});
                    setTimeout(()=>{
                        this.resetCode();
                    },1000)
                }                
            },
            //发起签约
            clickFileFn() {
                $('#drop_area').on('click',()=> {
                    $("#file").val('');
                    $('#file').click();
                });
                // 文件更改                
                $('#file').on('change',(e)=>{
                    e = e || window.event;  
                    e.stopPropagation(); // 阻止冒泡  
                    e.preventDefault();  //阻止默认行为                            
                    let fileObj = $("#file")[0].files[0];
                    //检测是否有文件 
                    if(!fileObj){ 
                          return false; 
                    } 
                    this.fileCom(fileObj)
                });
                   
            },
            dragFileFn() {
                let that = this;
                $(document).on({ 
                    dragleave:function(e){    //拖离 
                        e.preventDefault(); 
                    }, 
                    drop:function(e){  //拖后放 
                        e.preventDefault(); 
                    }, 
                    dragenter:function(e){    //拖进 
                        e.preventDefault(); 
                    }, 
                    dragover:function(e){    //拖来拖去 
                        e.preventDefault(); 
                    } 
                });                   
                let box = document.getElementById('drop_area'); //拖拽区域 
                box.addEventListener("drop",(e)=>{
                    e.preventDefault(); //取消默认浏览器拖拽效果 
                    let fileList = e.dataTransfer.files; //获取文件对象 
                      //检测是否是拖拽文件到页面的操作 
                    if(fileList.length == 0){ 
                        return false; 
                    } 
                    this.fileCom(fileList[0]);
                },false); 
            },
            fileCom(fileObj){
                if(fileObj.type.indexOf('application/pdf') === -1) {
                        this.modelCommonTip('您选择的不是pdf文件');
                        return;
                    }
                    let filename = fileObj.name; //文件名称 
                    let filesize = Math.floor((fileObj.size)/1024/1024);  
                    let index1 = filename.lastIndexOf('.pdf');
                    let fsize = fileObj.size/1024/1024;
                    if(filesize>300){ 
                        this.modelCommonTip('上传大小不能超过300M');
                        return false; 
                    }
                    this.pdfFileName = filename;
                    this.isImg = true;                    
                    this.signTitle = filename.substring(0,index1);                      
                    this.signFile = fileObj;
                    this.upFn();
            },
            upFn(event) {
                if(!this.signFile.size) {
                    this.modelCommonTip('请上传需要签署的PDF文件')
                    return false;
                }
                this.$store.dispatch('saveUpFile',this.signFile);
                this.$store.dispatch('saveSignTitle',this.signTitle);
                this.$store.dispatch('savePdfFileName',this.pdfFileName)
                //此处跳转到第二页            
                this.$router.push({
                    name:'ToFill',
                    query:{
                        againState:2
                    }
                })
            },
            
        },
        mounted(){
            this.clickFileFn();
            this.dragFileFn();
            let Timer = setInterval(()=>{
                this.curAccount = this.$store.state.curAccount;
                if(this.curAccount){
                    clearInterval(Timer);
                    this.signDocCount('202',1);
                    this.signDocCount('201',2);
                    this.signDocCount('300',4);
                    this.indexDraft();
                    this.searchDocumentLight();
                }
            },30)
        }
    }
</script>
