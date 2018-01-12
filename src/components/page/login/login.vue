<template>
    <section class="login">
        <div class="loginBox">
            <div class="icon_right">
                <i class="iconfont icon-pc" v-show="step == 1 || step == 2" @click="accountLogin"></i>
                <i class="iconfont icon-ewm_real" v-show="step == 4" @click="scanLogin"></i>
            </div>
            <!--扫码登录-->
            <div class="loginLoad" v-show="step != 4">
                <div class="step1" v-show="step==1">
                    <img src="../../../assets/images/ewm_load.png" alt="">
                    <p class="loadTxt">二维码加载中...</p>
                </div>
                <div class="step2"  v-show="step==2">
                    <img :src="'data:image/png;base64,'+ewmImg" alt="">
                    <div class="failBox" v-show="fail.state">
                        <p>{{fail.txt}}</p>
                        <a href="javascript:;" @click="cloudSignLogin">点击刷新</a>
                    </div>
                </div>

                <div class="step3" v-show="step == 3">
                    <div class="top">
                        <h3>{{scan.name}}</h3>
                        <p>{{scan.phone}}</p>
                    </div>
                    <div class="center">
                        <h3>扫码成功</h3>
                        <p>请在手机上点击确认以登录</p>
                    </div>
                    <a href="javascript:;" class="changeAccount" @click="cloudSignLogin">切换账号</a>
                </div>
            </div>            
            <p class="tipTxt" v-show="step == 1 || step == 2">使用手机真宜签扫码登录</p>
            <!--账号登录-->
            <div class="loginAccount" v-show="step == 4">
                <div class="formBox">
                    <p>
                        <input type="text" placeholder="账号" v-model="account.name">
                    </p>
                    <p class="tipP" v-show="account.tipStatus">
                        {{account.tip}}
                    </p>
                    <p>
                        <input type="password" placeholder="密码" v-model="account.psw" @keyup.enter="loginHandle">
                    </p>
                    <p class="yzm box" v-show="showValidCode == 1" >
                        <input type="password" placeholder="验证码" v-model="account.code" @keyup.enter="loginHandle">
                        <span><img id="v_code" @click="getCode" :src="this.apiPath+'login/getValidityImage?random='+random" alt="验证码"></span>
                    </p>                    
                    <p>
                        <a href="javascript:;" class="loginBtn" @click="loginHandle">登录</a>
                    </p>
                    <p class="forget clf"><span >忘记密码?</span></p>
                    <p class="tip">
                        还没有账号？<a href="javascript:;">立即注册</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default{
        name:'login',
        data(){
            return{
                step:1,               //登陆进行到第几步  1-等待二维码  2-等待扫码 3-扫码成功 4-账号登录
                reqNum:0,             //请求二维码的次数
                ewmImg:null,          //请求二维码的连接
                claimUuid:null,       //登录状态需要传的参数
                loginTimer:null,      //请求登录状态定时器
                scan:{
                    name:null,
                    phone:null,
                },
                fail:{               //扫码失败的情况
                    state:false,
                    txt:''
                },
                random:null,
                showValidCode:null,   //是否显示二维码  为1的时候显示二维码
                account:{             //账号登录
                    name:null,
                    psw:null,
                    code:null,
                    tipStatus:false,
                    tip:''
                }
            }
        },
        methods:{ 
            loginHandle(){  //账号登录确定                
                this.ajaxPost(this.URL['login'],{
                    username:this.account.name,
                    password:this.account.psw,
                    validateCode:this.account.code ? this.account.code : '',
                    random:this.random,
                    showValidateCode:this.showValidCode
                },(json)=>{
                    if(json['success']){
                        this.$router.push({
                            name:'Index'
                        })
                    }else if(json['usernameError'] == '用户未激活'){
                        [this.account.tipStatus,this.account.tip] = [true,'用户未激活'];
                        this.getLoginErrorCount();
                    }else if(json['usernameError']){
                        [this.account.tipStatus,this.account.tip] = [true,json['usernameError']];    
                        this.getLoginErrorCount();                    
                    }else if(json['validateCodeError']){
                        [this.account.tipStatus,this.account.tip] = [true,json['validateCodeError']];
                        this.getLoginErrorCount();     
                    }else{

                    }

                })
            },
            accountLogin(){  //账号登录
                this.step = 4 ;
                clearInterval(this.loginTimer);
            },
            scanLogin(){     //扫码登录
                this.step = 1;
                this.cloudSignLogin();
            },
            getCode(){  //获取验证码
                this.random = this.randomWord(true,32,1000);
            },
            /*
                ** randomWord 产生任意长度随机字母数字组合
                ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
                this.random = this.randomWord(true,32,1000);
            */
            randomWord(randomFlag, min, max){
                let str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                let pos = null;
                // 随机产生
                if(randomFlag){
                    range = Math.round(Math.random() * (max-min)) + min;
                }
                for(let i=0; i<range; i++){
                    pos = Math.round(Math.random() * (arr.length-1));
                    str += arr[pos];
                }
                return str;
            },
            cloudSignLogin(){  //请求二维码
                this.fail.state = false;
                this.step = 1;
                this.httpPost(this.URL['cloudSignLogin'],{},(json)=>{
                    if(json.meta.success){
                        this.ewmImg = json.data.qRCodeBase64;                        
                        this.claimUuid = json.data.claimUuid;
                        this.step = 2;
                        clearInterval(this.loginTimer);
                        this.loginTimer = setInterval(()=>{
                            this.cloudSignCheckLogin();
                        },1000)
                    }else{                        
                        if(this.reqNum < 3){
                            this.reqNum ++;
                            this.cloudSignLogin();                            
                        }else{
                            this.modelCommonTip('二维码获取失败,请稍后重试');
                        }
                    }
                })
            },
            cloudSignCheckLogin(){  //获取登录状态
                this.ajaxPost(this.URL['cloudSignCheckLogin'],{
                    claimUuid:this.claimUuid
                },(json)=>{
                    let msg = json.meta.message;
                    json.meta.success = false;
                    
                    if(json.meta.success){ //成功登录跳转到首页
                        clearInterval(this.loginTimer);
                        this.$router.push({
                            name:'Index'
                        })
                    }else{
                        if(msg == 'WAITING'){
                            //等待状态，不处理
                        }else if(msg == 'LOADING'){  //等待输入PIN码
                            this.step = 3;
                            [this.scan.name,this.scan.phone] = [json.data.name,json.data.phone]
                        }else if(msg == 'CANCEL'){   //取消登录
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'已取消登录',2]
                        }else if(msg == 'TIME_OUT'){
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'二维码已过期',2]
                        }else if(msg == 'DUNPLICATE'){
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'此二维码已被使用',2]
                        }else if(msg == 'ERROR'){
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'系统异常，请重试',2]
                        }else if(msg == 'NO_USER'){
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'用户不存在',2]
                        }else if(msg == 'FORBIDDEN_USER'){
                            clearInterval(this.loginTimer);
                            [this.fail.state,this.fail.txt,this.step] = [true,'当前用户已被禁用',2]
                        }else{

                        }
                    }
                    
                })
            },
            getLoginErrorCount(){   //获取登录失败次数
                this.httpGet(this.URL['getLoginErrorCount'],{},(json)=>{
                    if(json.meta.success){
                        this.showValidCode = json.data.showValidCode
                    }
                })
            }
        },        
        mounted(){
            $('.login').css({
                height:$(window).height()+'px',
            })
            this.random = this.randomWord(true,32,1000);
            this.cloudSignLogin();
            this.getLoginErrorCount();
        }
    }
</script>
<style lang="scss" scoped>
    #app{
        height: 100%;
    }
</style>
