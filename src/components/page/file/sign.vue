<template>
    <section class="sign contain">
        <nav><i class="iconfont icon-back"></i>签署</nav>
        <div class="signBox box">
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
                doc:{
                    id:null,           //docId
                },
                
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
            this.doc.id = this.$route.params.docId;
        }
    }
</script>
<style scoped lang="scss">
// @import '../../assets/css/viewer.css';
@import '../../../assets/css/sign.scss';
</style>

