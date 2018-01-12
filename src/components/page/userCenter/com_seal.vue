<template>
    <section class="seal">
        <div class="sealBox">
            <h3>企业签章样式（3个）<span @click="goCreateSeal"><i class="iconfont icon-add_empty"></i>添加</span></h3>
            <ul class="clf">
                <li>
                    <a href="javascript:;">
                        <span class="default"><img src="../../../assets/images/default.png" alt=""></span>
                        <b><img src="../../../assets/images/seal.png" alt=""></b>
                        <div class="operation" >
                            <span><i class="iconfont icon-default"></i>设为默认</span>
                            <span><i class="iconfont icon-del"></i>删除</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <b><img src="../../../assets/images/seal.png" alt=""></b>
                        <div class="operation">
                            <span><i class="iconfont icon-default"></i>设为默认</span>
                            <span><i class="iconfont icon-del"></i>删除</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <b><img src="../../../assets/images/seal.png" alt=""></b>
                        <div class="operation">
                            <span><i class="iconfont icon-default"></i>设为默认</span>
                            <span><i class="iconfont icon-del"></i>删除</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sealBox">
            <h3>授权签章样式（1个）</h3>
            <ul class="clf">
                <li>
                    <a href="javascript:;">
                        <span class="default"><img src="../../../assets/images/default.png" alt=""></span>
                        <b><img src="../../../assets/images/seal.png" alt=""></b>
                        <div class="operation" >
                            <span><i class="iconfont icon-default"></i>设为默认</span>
                            <span><i class="iconfont icon-del"></i>删除</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    export default{
        name:"seal",
        data(){
            return{

            }
        },
        methods:{
            goCreateSeal(){
                this.$router.push({
                    name:'AddSeal'
                })
            }
        },
        mounted(){

        }
        
    }
</script>