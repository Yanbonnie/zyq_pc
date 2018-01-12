<template>
    <section class="forgetStep">
        <div class="forgetBody">
            <form>
                <p class="box psdItem">
                    <label for="">新密码</label>
                    <input type="password" placeholder="不少于6位的数字字母组合" v-model="psw" v-show="!pswShow" id="password"> 
                    <input type="text" placeholder="不少于6位的数字字母组合" v-model="psw" v-show="pswShow" id="text">                    
                    <i class="iconfont" @click="pswShowHandle" :class="[pswShow ? 'icon-eye':'icon-close_eye']"></i>
                </p>
                <p class="box tip" v-show="tipState">
                    <label for=""></label>
                    <input type="text" :value="tip">
                </p>
            </form>
        </div>
        <div class="forgetFooter">
            <a href="javascript:;">下一步</a>
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
