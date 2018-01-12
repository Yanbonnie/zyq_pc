<template>
    <section class="account" v-if="curAccount">
        <!-- <nav>
            <i class="iconfont icon-back"></i>返回
        </nav> -->
        <div class="info box">
            <div class="sideLeft">
                <img src="../../../assets/images/user.jpg" alt="">
                <h3>{{curAccount.memName}}<span :class="[curAccount.accExtType ? 'real':'']"><i class="iconfont icon-solid_check"></i>{{curAccount.accExtType ? '已认证':'未认证'}}</span></h3>  <!--real-->
                <p>{{curAccount.mobileNo}}</p>
            </div>
            <div class="sideCenter" :class="[card.idCardNo ? 'border' : '']" >
                <p v-if="card.idCardNo">身份证号：{{card.idCardNo.substring(0,4)+'*********'+card.idCardNo.substring(14)}}</p>
                <p v-if="card.idCardNo">身份证有效期：{{card.idCardExpireTime}}  </p>
            </div>
            <div class="sideRight" >                
                <a href="javascript:;" @click="showRegister(1)">修改账户密码</a>
            </div>
        </div>
        <div class="list">
            <ul>
                <li>
                    <span><i class="iconfont icon-phone"></i>{{curAccount.mobileNo}}</span>
                    <span><i class="iconfont" :class="[curAccount.mobileStatus ? 'icon-hook' : 'icon-warn']"></i>{{curAccount.mobileStatus ? '已绑定' : '未绑定'}}</span>
                    <span><a href="javascript:;" @click="showRegister(0)">更换手机</a></span>
                </li>
                <li>
                    <span><i class="iconfont icon-mail"></i>{{curAccount.accNo}}</span>
                    <span><i class="iconfont icon-hook"></i>已绑定</span>
                    <span><a href="javascript:;" @click="showRegister(3)">更换邮箱</a></span>
                </li>
            </ul>
        </div>
        <alertModel :type="2" v-show="register.state" :title="register.title[register.index]" :alelrtClassWidth="'500px'" @cancelHandle="register.state = false">
            <div slot="alert-content" class="registerBox">
                <!--修改手机-->
                <div v-if="register.index == 0">
                    <div v-if="phoneStep == 1">
                        <p>
                            请输入{{curAccount.mobileNo.substring(0,3)+'*****'+curAccount.mobileNo.substring(7) }}收到的验证码
                        </p>
                        <p class="yzm">
                            <input type="text" placeholder="验证码" v-model="phoneCode.step1">
                            <a href="javascript:;" class="sendCode" @click="getCode(0)" >获取验证码</a>
                        </p>
                    </div>
                    <div v-if="phoneStep == 2">
                        <p class="normal"><input type="text" placeholder="新手机号码" v-model="register.newPhone"></p>
                        <p class="inputYzm clf">
                            <input type="text" placeholder="验证码" v-model="phoneCode.step2">
                            <a href="javascript:;" class="sendCode" @click="getCode(1)">获取验证码</a>
                        </p>
                    </div>
                </div>
                <!--修改密码-->
                <div v-if="register.index == 1">
                    <p class="normal">
                        <input type="password" placeholder="旧密码" v-model="psw.old" v-show="!psw.oldEye">
                        <input type="text" placeholder="旧密码" v-model="psw.old" v-show="psw.oldEye">
                        <i class="iconfont  eye" :class="[psw.oldEye ? 'icon-eye' :'icon-close_eye']" @click="psw.oldEye = psw.oldEye ? false:true"></i>
                    </p>
                    <p class="normal">
                        <input type="password" placeholder="新密码" v-model="psw.new" v-show="!psw.newEye">
                        <input type="text" placeholder="新密码" v-model="psw.new" v-show="psw.newEye">
                        <i class="iconfont  eye" :class="[psw.newEye ? 'icon-eye' :'icon-close_eye']" @click="psw.newEye = psw.newEye ? false:true"></i>
                    </p>
                    <p class="inputYzm clf">
                        <input type="text" placeholder="验证码" v-model="psw.code">
                        <a href="javascript:;" class="sendCode" @click="getCode(2)">获取验证码</a>
                    </p>
                    <p class="tip" :class="[psw.tip?'':'opacity']" >验证码已下发至手机号{{curAccount.mobileNo.substring(0,3)+'*****'+curAccount.mobileNo.substring(7) }}</p>
                </div>
                <!-- 绑定邮箱 -->
                <div v-if="register.index == 2">
                    <p class="normal"><input type="text" placeholder="邮箱"></p>
                    <p class="inputYzm clf">
                        <input type="text" placeholder="验证码">
                        <a href="javascript:;">获取激活码</a>
                    </p>
                    <p class="tip">激活码已下发至邮箱，请去邮箱查看</p>
                </div>
                <!-- 更换邮箱 -->
                <div v-if="register.index == 3">
                    <div v-if="mailStep == 1">
                        <p>
                            请输入邮箱 4243815@qq.com 收到的激活码
                        </p>
                        <p class="yzm">
                            <input type="text" placeholder="激活码">
                            <a href="javascript:;">获取激活码</a>
                        </p>
                    </div>
                    <div v-if="mailStep == 2">
                        <p class="normal"><input type="text" placeholder="新邮箱"></p>
                        <p class="inputYzm clf">
                            <input type="text" placeholder="激活码">
                            <a href="javascript:;">获取激活码</a>
                        </p>
                    </div>
                </div>
            </div>
            <div slot="alert-footer">
                <div>
                    <a href="javascript:;" class="cancel-btn" @click="registerCancle">取消</a>
					<a href="javascript:;" class="sure-btn" @click="sureRegister">{{register.sureBtnTxt}}</a>
                </div>
            </div>
        </alertModel>
    </section>
</template>
<script>
    export default{
        name:'account',
        data(){
            return {
                curAccount:null,        //用户数据
                register:{
                    state:false,
                    title:["修改手机号码","修改登录密码","绑定邮箱","更换邮箱"],
                    index:0,           //0-修改手机号码，1-修改登录密码，2-绑定邮箱,3-更换邮箱
                    sureBtnTxt:'确定',
                    newPhone:'',
                },
                phoneStep:1,           //1-修改手机号码第一步，2-修改手机号码第二步
                phoneCode:{            //修改手机号验证码
                    step1:'',          //第一步
                    step2:''           //第二部
                },
                psw:{                  //修改密码
                    old:'',
                    new:'',
                    code:'',
                    oldEye:false,   //是否显示密码
                    newEye:false,   //是否显示密码
                    tip:false
                },
                mailStep:1,            //更换邮箱步骤 
                sendCodeState:true,    //可不可以发送验证码（true 可发送）
                ResetCodeTime:0,       //倒计时
                card:{
                    idCardNo:'',           //身份信息
                    idCardExpireTime:'',       //身份证有效期
                }
            }
        }, 
        methods:{
            showRegister(Index){   //显示修改弹窗index(初始化数据)
                [this.register.state,this.register.index,this.register.newPhone,this.phoneStep,this.phoneCode.step1,this.phoneCode.step2,this.psw.tip,this.psw.old,this.psw.new,this.psw.code,this.psw.oldEye,this.psw.newEye] = 
                [true,Index,'',1,'','',false,'','','',false,false];
            },
            sureRegister(){        //修改弹窗确定按钮             
                if(this.register.index == 0 && this.phoneStep == 1){   //修改手机号码第一步
                    this.bindPhoneHandle(this.curAccount.mobileNo,this.phoneCode.step1,()=>{                        
                        //初始化验证码数据
                        this.ResetCodeTime = 0;
                        this.sendCodeState = true;
                        $(".sendCode").text("获取验证码");
                        $(".sendCode").css({'cursor':'pointer','background':"#000"});                        
                        this.phoneStep = 2 ;   //到修改手机号码第二步
                    });
                }
                if(this.register.index == 0 && this.phoneStep == 2){  //修改手机号码第二步
                    this.modifyPhone();
                } 
                if(this.register.index == 1){ //修改密码
                    if(this.validateQb.isEmpty(this.psw.old)){
                        this.modelCommonTip('必须输入原密码');
                        return;
                    }
                    if(this.validateQb.isEmpty(this.psw.new)){
                        this.modelCommonTip('必须输入新密码');
                        return;
                    }
                    if(this.psw.new.length < 6 ){
                        this.modelCommonTip('新密码不少于6位');
                        return;
                    }
                    if(this.psw.new.length > 16){
                        this.modelCommonTip('新密码不大于16位');
                        return;
                    }
                    if(this.validateQb.isChina(this.psw.new)){
                        this.modelCommonTip('密码不得包含中文');
                        return;
                    }
                    if(this.psw.old == this.psw.new){
                        this.modelCommonTip('新旧密码不能相同');
                        return;
                    } 
                    if(this.validateQb.isEmpty(this.psw.code)){
                        this.modelCommonTip("验证码不能为空");
                        return;
                    }
                    this.bindPhoneHandle(this.curAccount.mobileNo,this.psw.code,()=>{ 
                        this.modifyPassword();
                    });
                }
            },
            modifyPassword(){      //修改密码                                               
                this.httpPost(this.URL['modifyPassword'],{
                    pwdOld:this.psw.old,
                    pwdNew:this.psw.new
                },(json)=>{
                    if(json.meta.success){
                        this.modelCommonTip("修改成功");
                        this.register.state = false;
                    }else{
                        //初始化验证码数据
                        this.ResetCodeTime = 0;
                        this.sendCodeState = true;
                        $(".sendCode").text("获取验证码");
                        $(".sendCode").css({'cursor':'pointer','background':"#000"}); 

                        let msg = json.meta.message;
                        if(msg == 'bad.password'){
                            this.modelCommonTip("原密码错误，请重试。");
                        }else{
                            this.modelCommonTip(msg)
                        }
                    }
                })
            },
            bindPhoneHandle(phone,code,success){   //绑定手机
                this.httpPost(this.URL['bindPhone'],{
                    phone:phone,
                    code:code
                },(json)=>{
                    if(json.meta.success){
                        success();
                    }else{
                        let msg = json.meta.message;
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
            modifyPhone(){                         //修改手机号码
                if(this.validateQb.isEmpty(this.register.newPhone)){
                    this.modelCommonTip('请输入新手机号码');
                    return false;
                }
                if(!this.validateQb.isPhone(this.register.newPhone)){
                    this.modelCommonTip("手机号码不合法");
                    return false;
                }
                if(!this.phoneCode.step2){
                    this.modelCommonTip('请输入验证码');                    
                    return false;
                }
                this.httpPost(this.URL['modifyPhone'],{
                    phoneOld:this.curAccount.mobileNo,
                    phoneNew:this.register.newPhone,
                    code:this.phoneCode.step2
                },(json)=>{
                    if(json.meta.success){
                        //验证码初始化
                        this.ResetCodeTime = 0;
                        this.sendCodeState = true;
                        $(".sendCode").text("获取验证码");
                        $(".sendCode").css({'cursor':'pointer','background':"#000"});
                        this.modelCommonTip("手机号修改成功");
                        this.register.state = false;
                        this.getLoginData(this.$store);
                    }else{
                        let msg = json.meta.message;
                        if(msg == 'bad.phone'){
                            this.modelCommonTip("手机号格式错误");
                        }else if(msg == 'authed'){
                            this.modelCommonTip("已实名认证无法修改手机号");
                        }else if(msg == 'overtime'){
                            this.modelCommonTip("验证码已超时");
                        }else if(msg == 'bad.code'){
                            this.modelCommonTip("验证码错误");
                        }else{
                            this.modelCommonTip(msg);
                        }
                    }
                })
            },            
            registerCancle(){                      //取消修改弹窗，还原数据
                [this.register.state,this.sendCodeState,this.ResetCodeTime]=[false,true,0];
            },
            getCode(num){                          //获取验证码   0-修改手机号第一步  1-修改手机号第二部  2-修改密码 
                let phone = null;
                if(num === 0){
                    phone = this.curAccount.mobileNo
                }else if(num == 1){
                    phone = this.register.newPhone;
                }else if(num == 2){
                    phone = this.curAccount.mobileNo;
                }else{

                }
                if(this.validateQb.isEmpty(phone)){
                    this.modelCommonTip("手机号码不能为空");
                    return;
                }
                if(!this.validateQb.isPhone(phone)){
                    this.modelCommonTip("手机号码格式不正确");
                    return;
                }
                if(num == 2){
                    this.psw.tip = true;
                }

                if(!this.sendCodeState) return false;  
                this.httpGet(this.URL.verificationCode,{
                    mobileNo:phone
                },(json)=>{
                    if(json == "success"){
                        this.sendCodeState = false;
                        this.ResetCodeTime = 60;
                        this.resetCode();          
                    }
                })
            },
            resetCode(){                           //验证码倒计时
                this.ResetCodeTime -- ;
                if(this.ResetCodeTime <= 0){
                    this.ResetCodeTime = 60;
                    this.sendCodeState = true;
                    $(".sendCode").text("获取验证码");
                    $(".sendCode").css({'cursor':'pointer','background':"#000"});
                }else{
                    $(".sendCode").text("重新发送("+this.ResetCodeTime+'s)');
                    $(".sendCode").css({'cursor':'not-allowed','background':'#B7B7B7'});
                    setTimeout(()=>{
                        this.resetCode();
                    },1000)
                }                
            },
            getIdCardExpire(){
                this.httpGet(this.URL['getIdCardExpire'],{},(json)=>{
                    if(json.meta.success){
                        this.card.idCardNo = json.data.idCardNo;
                        this.card.idCardExpireTime = json.data.idCardExpireTime;
                    }
                })
            }
        },
        mounted(){
            let Timer = setInterval(()=>{
                this.curAccount = this.$store.state.curAccount;
                if(this.curAccount){
                    clearInterval(Timer);
                    // this.curAccount.accExtType = 1;
                    if(this.curAccount.accExtType){
                        this.getIdCardExpire();
                    }
                }
            },30)
        }
    }
</script>