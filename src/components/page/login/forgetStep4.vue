<template>
    <section class="forgetStep">
        <div class="forgetBody">
            <form>
                <p>
                    <i class="iconfont icon-success"></i>
                </p>
                <p>新密码设置成功</p>
            </form>
        </div>
        <div class="forgetFooter">
            <router-link to="/login">确定</router-link>
        </div>
    </section>
</template>
<script>
    export default{
        name:'step1',
        data(){
            return{
                psw:null,         //新密码
                pswShow:false,    //密码显示隐藏  false-隐藏  true-显示  
                tip:'密码必须是由数字和字母组合，并且不少于6位',
                tipState:false
            }
        },
        methods:{
            pswShowHandle(){
                this.pswShow = this.pswShow ? false : true;
                if(this.pswShow){
                    $("#text").focus();
                }else{
                    $("#password").focus();
                }
            }
        },
        mounted(){

        }
    }
</script>
