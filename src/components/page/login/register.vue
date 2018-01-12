<template>
    <section class="register">
        <div class="registerBox">
            <div v-if="step != 3">
                <ul class="clf">
                    <li :class="[regStyle == 1 ? 'active':'']" @click="regStyle = 1;step = 1">个人注册</li>
                    <li :class="[regStyle == 2 ? 'active':'']" @click="regStyle = 2;step = 4;psw = '' ">企业注册</li>
                </ul>
                <div class="formBox" v-show="regStyle == 1">
                    <p>
                        <input type="text" :placeholder="step == 1 ? '手机号':'邮箱'">
                    </p>
                    <p class="psdItem">
                        <input type="password" placeholder="密码由不少于6位的数字、字母组合" v-model="psw" v-show="!pswShow" >
                        <input type="text" placeholder="密码由不少于6位的数字、字母组合" v-model="psw" v-show="pswShow">
                        <i class="iconfont" @click="pswShow = pswShow ? false : true" :class="[pswShow ? 'icon-eye' : 'icon-close_eye']"></i>
                    </p>
                    <p class="yzm">
                        <input type="text" :placeholder="step == 1 ? '请输入短信验证码':'请输入邮箱验证码'">
                        <a href="javascript:;">获取验证码</a>
                    </p>
                    <p class="btn">
                        <a href="javascript:;">下一步</a>
                    </p>
                    <p class="accept">
                        <i class="iconfont icon-checkbox"></i>已阅读并同意<span>《使用协议》</span>及<span>《隐私条款》</span> <a href="javascript:;" @click="step = step == 1 ? 2 : 1">{{step== 1?'切换邮箱注册':'切换手机注册'}}</a>
                    </p>
                </div>
                <div class="formBox" v-show="regStyle == 2">
                    <div v-show="step == 4">
                        <p>
                            <input type="text" placeholder="邮箱">
                        </p>
                        <p class="psdItem">
                            <input type="password" placeholder="密码由不少于6位的数字、字母组合" v-model="psw" v-show="!pswShow" >
                            <input type="text" placeholder="密码由不少于6位的数字、字母组合" v-model="psw" v-show="pswShow">
                            <i class="iconfont" @click="pswShow = pswShow ? false : true" :class="[pswShow ? 'icon-eye' : 'icon-close_eye']"></i>
                        </p>
                        <p class="yzm">
                            <input type="text" placeholder="请输入邮箱验证码">
                            <a href="javascript:;">获取验证码</a>
                        </p>
                        <p class="btn">
                            <a href="javascript:;" @click="step =5">下一步</a>
                        </p>
                    </div>
                    <div v-show="step == 5">
                        <p>
                            <input type="text" placeholder="名称">
                        </p>
                        <p>
                            <input type="text" placeholder="联系人">
                        </p>
                        <p>
                            <input type="text" placeholder="联系手机号">
                        </p>
                        <p class="yzm">
                            <input type="text" placeholder="请输入手机验证码">
                            <a href="javascript:;">获取验证码</a>
                        </p>
                        <p>
                            <input type="text" placeholder="所属行业">
                        </p>
                        <p class="btn">
                            <a href="javascript:;">下一步</a>
                        </p>
                    </div>
                    <p class="accept">
                        <i class="iconfont icon-checkbox"></i>已阅读并同意<span>《使用协议》</span>及<span>《隐私条款》</span>
                    </p>
                </div>
            </div>
            <div v-show ="step == 3" class="success">
                <i class="iconfont icon-success"></i>
                <h3>你的账户已创建</h3>
                <p>实名认证后，在真宜签签署的合同一旦发生纠纷，<br/>可申请司法鉴定，提供仲裁等法律保障服务</p>
                <a href="javascript:;" class="goReal">实名认证</a>
                <a href="javascript:;" class="goIndex">进入主页</a>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    export default{
        name:'register',
        data(){
            return{
                regStyle:1,       //1-个人注册 2-企业注册 
                step:5,           //1-手机注册 2-邮箱注册 3-成功注册 4-企业注册第一步 5-企业注册第二步
                pswShow:false,    //密码显示隐藏  false-隐藏  true-显示
                psw:null,        //密码
            }
        },
        methods:{
            
        },
        mounted(){
            $('.register').css({
                height:$(window).height()+'px',
            })
        }
    }
</script>
