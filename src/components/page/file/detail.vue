<template>
    <section class="detail contain">
        <nav @click="back"><i class="iconfont icon-back"></i>详情页</nav>
        <div class="detailBox">
            <div class="info clf">
                <div class="sideLeft">
                    <h3>
                        <p :title="detailInfo.docName">{{detailInfo.docName}}</p>
                        <span :class="fileState(detailInfo.signStatus,0)">{{fileState(detailInfo.signStatus,1)}}</span>
                    </h3>
                    <p>抄送：{{ccSigner ? ccSigner : '暂无抄送人'}}</p>
                    <p  v-if="detailInfo.duration < 4133865600000">有效期：{{detailInfo.duration|filterdata(0)}}</p>
                    <p  v-if="detailInfo.duration >= 4133865600000">有效期：永久有效</p>
                    <p class="state">
                        <span class="signing" v-if="detailInfo.signStatus == '200' || detailInfo.signStatus == '201' || detailInfo.signStatus == '202'">签署中</span>
                        <span class="order">{{detailInfo.signOrderType == '002' ? '顺序签' : '任意签'}}</span>
                    </p>
                </div>
                <div class="sideRight">
                    <ul>
                        <li>
                            <a href="javascript:;">
                                <p class="iconfont icon-download"></p>
                                <p>下载</p>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <p class="iconfont icon-print"></p>
                                <p>打印</p>
                            </a>
                        </li>                        
                        <li>
                            <a href="javascript:;">
                                <p class="iconfont icon-preview" style="font-size:20px;"></p>
                                <p>预览</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detailList">
                <div class="sender box">
                    <span><i class="iconfont icon-headimg"></i></span>
                    <span>{{sender.name}}</span>
                    <span>{{sender.accNo}}</span>
                    <span class="iconfont icon-official_seal opacity"></span> 
                    <span>{{sender.sendTime}}</span>                   
                    <span><i class="iconfont icon-sender"></i>发起人</span>                    
                </div>
                <div class="list">
                    <ul>
                        <li class="box line">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </li>
                        <li class="box"  v-for="(item,index) in signerList"  :key="index">  <!--active-->
                            <span><b>{{index+1}}</b></span>
                            <span><i class="iconfont icon-circle-icon"></i></span>
                            <span class="iconfont icon-headimg"></span>
                            <span>{{item.name}}</span>
                            <span><b class="shengl">{{item.stampType === '1' ? '手机号' : item.accNo}}</b> <i class="iconfont" :class="[item.stampType === '1' ? 'icon-sign_name':'icon-official_seal']"></i></span>
                            <span></span>
                            <span>{{item.signTime}}</span>
                            <span :class="[item.signed ? 'finish' : 'unfinish']"> <i class="iconfont " :class="[item.signed ? 'icon-check_gou':'icon-clock']"></i>{{item.signed ? '已签署' : '待签署'}}</span>
                        </li>
                        <!-- <li class="box turn">
                            <span><b>01</b></span>
                            <span><i class="iconfont icon-circle-icon"></i></span>
                            <span class="iconfont icon-headimg"></span>
                            <span>张三</span>
                            <span><b class="shengl">123818812345678@139.com.cn</b> <i class="iconfont icon-official_seal"></i></span>
                            <span></span>
                            <span>7.07.03 11:33</span>
                            <span class="finish"> <i class="iconfont icon-check_gou"></i>已签署</span>
                        </li>
                        <li class="box">
                            <span><b>01</b></span>
                            <span><i class="iconfont icon-circle-icon"></i></span>
                            <span class="iconfont icon-headimg"></span>
                            <span>张三</span>
                            <span><b class="shengl">123818812345678@139.com.cn</b> <i class="iconfont icon-official_seal"></i></span>
                            <span></span>
                            <span>7.07.03 11:33</span>
                            <span class="unfinish"> <i class="iconfont icon-clock"></i>待签署</span>
                        </li> -->
                        <li class="box bottom">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="operationBox clf">
                <div>
                    <a href="javascript:;" class="refuse">拒签</a>
                    <router-link :to="{name:'Sign',params:{'docId':detailInfo.docId}}" class="sign">签署</router-link>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default{
        name:'detail',
        data(){
            return{
                paramsPre:{   //传过来的参数
                    tabIndex:'',
                    tabStatus:'',
                    pageIndex:'',
                    enter:''
                },
                docId:'',  //文档id
                detailInfo:{},    //文档详细信息
                ccSigner:'',      //抄送人
                sender:{},        //发送人
                signerList:[],    //签署人列表
            }
        },
        methods:{
            //过滤状态
            fileState(value,index){ //0 -筛选class  1-筛选显示内容
                var statusTxt = [];
                switch(value){
                    case '200':
                        statusTxt = ['wait_me',"待签署"];
                        break;
                    case '201':
                        statusTxt = ['wait_me',"待我签"];
                        break;
                    case '202':
                        statusTxt = ['wait_other',"待他人签"];
                        break;
                    case '300':
                        statusTxt = ['finish',"已完成"];
                        break;
                    case 'D400':
                        statusTxt = ['refuse',"已撤销"];
                        break;
                    default:
                        break;
                        
                }
                if(this.detailInfo.isOverTime){
                    statusTxt = ['refuse','已拒绝']
                }
                return statusTxt[index];
                
                
            },
            //获取抄送人信息，发送人信息，签署人信息
            signtorListUnion(){ 
                this.httpGet(this.URL['signtorListUnion'],{
                    docId:this.docId
                },(json)=>{
                    if(json.meta.success){
                        if(json.data.carbonList.length > 0){
                            this.ccSigner = json.data.carbonList[0].name ? json.data.carbonList[0].name : '';
                        }                        
                        this.sender = json.data.sender;
                        this.signerList = json.data.list;
                    }
                })
            },
            //获取文档详情页
            getDocumentInfoVo(){  
                this.httpGet(this.URL['getDocumentInfoVo'],{
                    docId:this.docId
                },(json)=>{
                    if(json.meta.success){
                        this.detailInfo = json.data;
                    }else{
                        this.modelCommonTip(json.meta.message);
                    }
                })
            },
            back(){
                if(this.enter == 'index'){
                    this.$router.push({
                        name:'Index'
                    })
                }else{
                    this.$router.push({
                        name:'ManaFile',
                        query:{
                            tabIndex:this.tabIndex,
                            tabStatus:this.tabStatus,
                            pageIndex:this.pageIndex
                        }
                    })
                }
                
            }
        },
        mounted(){
            this.docId = this.$route.params.docId;
            let Timer = setInterval(()=>{
                this.docId = this.$route.params.docId;
                if(this.docId){
                    this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : '';
                    this.tabStatus = this.$route.query.tabStatus ? this.$route.query.tabStatus : '';
                    this.pageIndex = this.$route.query.pageIndex ? this.$route.query.pageIndex : '';
                    this.enter = this.$route.query.enter ? this.$route.query.enter : '';
                    clearInterval(Timer);
                    this.getDocumentInfoVo();
                    this.signtorListUnion();
                }
            },30)
        }
    }
</script>
