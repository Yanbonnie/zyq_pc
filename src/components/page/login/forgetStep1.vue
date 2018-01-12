<template>
    <section class="forgetStep">
        <div class="forgetBody">
            <form>
                <p class="box">
                    <label for="">账号</label>
                    <input type="text" placeholder="手机号或邮箱">
                </p>
                <p class="box">
                    <label for="">验证码</label>
                    <input type="text" placeholder="请输入验证码">
                    <span><img id="v_code" src="http://justsign.com.cn/login/getValidityImage?random=11054464333c951202-fe55-4e24-a367-721399306825" alt="验证码"></span>
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

            }
        },
        mounted(){

        }
    }
</script>
