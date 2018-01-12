<template>
    <section class="sign contain">
        <nav><i class="iconfont icon-back"></i>签署</nav>
        <div class="signBox box">
            <!-- <div class="sideLeft">a</div>
            <div class="sideCenter">
                <div class="title">我是title</div>
                <div class="itemList sign_page_scroll">
                    <div class="item" v-for="(item,index) in doc.list" :key="index" >
                        <img :src="apiPath+URL['getPdfImgByPage']+'?pageNum='+item+'&docId='+doc.id" alt="">
                    </div>
                </div>
            </div>
            <div class="sideRight">
                <div class="title">共{{doc.list.length}}</div>
                <ul class="thumbBox sign_page_scroll">
                    <li v-for="(item,index) in doc.thumb" :key="index" :class="[index == 0 ? 'active':'' ]">
                        <span>{{index+1}}</span>
                        <img :src="'data:image/gif;base64,'+item" alt="" height="140">
                    </li>
                </ul>
            </div> -->
        </div>
    </section>
</template>
<script>
    // import '@/assets/js/plugin/pdf.js'
    // import '@/assets/js/plugin/viewer.js'
    export default{
        name:'sign',
        data(){
            return {
                windowH:null,          //窗口高度
                signBoxH:null,         //签署高度
                itemBoxH:null, 
                doc:{
                    id:null,           //docId
                    total:null,        //文档页数
                    W:null,            //文档宽
                    H:null,            //文档高
                    list:[],
                    thumb:[]
                },
                itemH:null,           //一个文档的高度
                thumbH:null,          //一个缩略图的高度
                
            }
        },
        methods:{
            getPdfPageNum(){
                $.ajax({
                    type:"GET",
                    scriptCharset:"utf-8",
                    url:this.apiPath +this.URL['getPdfPageNum'],
                    timeout : 10 * 60000,
                    data:{'docId':this.doc.id},
                    cache: false,
                    success:result=>{
                        let docData = result.split(',');
                        [this.doc.total,this.doc.H,this.doc.W] = [docData[0],docData[1],docData[2]];
                        this.doc.list = (new Array(Number(this.doc.total))).fill(0).map(function(v, i) {
                            return i;
                        })
                        this.doc.thumb = docData.slice(3);
                        setTimeout(()=>{
                            this.itemH = $('.itemList .item').height();
                            console.log(this.itemH)
                        },1000)
                    },
                    error:err=>{

                    }
                })
            },
            
        },
        mounted(){
            this.doc.id = this.$route.params.docId
            // this.getPdfPageNum();
            // this.windowH = $(window).height();
            // this.signBoxH = this.windowH-80-50-84;
            // this.itemBoxH = this.signBoxH - 45;
            // $('.signBox').css({
            //     height:`${this.signBoxH}px`
            // })
            // $('.itemList,.thumbBox').css({
            //     height:`${this.itemBoxH}px`
            // })
        }
    }
</script>
<style scoped lang="scss">
// @import '../../assets/css/viewer.css';
@import '../../../assets/css/sign.scss';
</style>

