<template>
    <header>
        <div class="container">
            <ul class="sideLeft">
                <li class="logo">
                    <router-link to="/index">
                        <img src="../assets/images/logo.png" width="116" height="37" alt="">
                    </router-link>
                </li>
                <li v-for="(item,index) in menu" :key="index">
                    <router-link :to="item.path" :class="[type && type == item.type ? 'router-link-active' : '']">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
            <ul class="sideRight">
                <li>
                    <router-link to="/package">
                        <span class="iconfont icon-cart"></span>
                    </router-link> 
                    <router-link to="/news">
                        <span class="iconfont icon-bell"><b></b></span>
                    </router-link>
                    <a href="javascript:;" @click="exitStatus = true">
                        <span class="iconfont icon-exit"></span>
                    </a>
                </li>
            </ul>
            <a v-show="sendState" href="javascript:;" id="sendSign" class="startSign"><i class="iconfont icon-edit"></i>发起签约</a>
            <input type="file" id="file" hidden>
        </div>
        <alertModel :type="2" v-show="exitStatus" :context="'确认退出当前用户?'" :alelrtClassWidth="'398px'" @cancelHandle="exitStatus=false" @sureHandle="exitHandle"></alertModel>
    </header>
</template>
<script>
let menu = [
    [
        {
            title:'首页',
            path:'/index',
            type:101
        },
        {
            title:'文档管理',
            path:'/manafile',
            type:201
        },
        {
            title:'企业账户',
            path:'/user/account',
            type:301
        }
    ],
    [
        {
            title:'首页',
            path:'/index',
            type:101
        },
        {
            title:'文档管理',
            path:'/manafile',
            type:201
        },
        {
            title:'个人中心',
            path:'/user/account',
            type:301
        }
    ]
]
    export default {
        name:'header',
        data(){
            return{
                /*发起签约 */
                signTitle: '',   //文档名称
                signFile: {},    //文档流
                pdfFileName:'请上传需要签署的PDF文件',
                sendState:true,  //发起签约按钮显示隐藏
                type:null,
                exitStatus:false,
                menu:[]
            }
        },
        computed:{
            userState(){
                return this.$store.state.userState
            }
        },
        methods:{
            exitHandle(){  //退出
                this.httpGet('logoutWithoutPage',{},(response)=>{});
                setTimeout(function(){
                    window.location.href="/login"
                },300)
            },
            clickFileFn() {  //点击发起签约
                $('#sendSign').on('click',()=> {
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
                this.$store.dispatch('savePdfFileName',this.pdfFileName);
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
            this.menu = menu[this.userState];
        },
        watch:{
            '$route':function(to,from){
                this.type = to.meta.type;
                if(to.name == 'ToFill'){
                    this.sendState = false;
                }else{
                    this.sendState = true;
                }
            }
        }
    }
</script>