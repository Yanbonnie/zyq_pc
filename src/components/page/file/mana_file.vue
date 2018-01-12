<template>
    <section class="manaFile contain">
        <div class="timeSelect clf">
            <div class="sideRight">
                <ul>
                    <li @click="getNowDate(90)">
                        <span class="item" :class="[timeIndex == 4 ? 'active' : '']">三月内</span>
                    </li>
                    <li  @click="getNowDate(30)">
                        <span class="item" :class="[timeIndex == 3 ? 'active' : '']">一月内</span>
                    </li>
                    <li @click="getNowDate(7)">
                        <span class="item" :class="[timeIndex == 2 ? 'active' : '']">一周内</span>
                    </li>
                    <li>
                        <input type="text" v-model="timeDuration" class="timeDuration" placeholder="开始时间-结束时间">
                        <i class="iconfont icon-calendar"></i>
                        <DatePicker :options="options" @on-change="dataChange"  type="daterange" placement="bottom-end" placeholder="开始时间-结束时间" style="width: 210px"></DatePicker>
                    </li>                    
                </ul>
            </div>
            
            <div class="sideLeft">
                <input type="text" v-model="searchTitle" placeholder="文档主题" @keyup="searchHandle($event)" >
                <i class="iconfont icon-search"></i>
            </div>
        </div>
        <div class="styleSelect">
            <ul>
                <li><label>类别</label></li>
                <li><a href="javascript:;" :class="[tabIndex == 1 ? 'active':'']" @click="changeStatus(1,'')">全部</a></li>
                <li><a href="javascript:;" :class="[tabIndex == 2 ? 'active':'']" @click="changeStatus(2,'201')">待我签</a></li>
                <li><a href="javascript:;" :class="[tabIndex == 3 ? 'active':'']" @click="changeStatus(3,'202')">待他人签</a></li>
                <li><a href="javascript:;" :class="[tabIndex == 4 ? 'active':'']" @click="changeStatus(4,'300')">已完成</a></li>
                <!-- <li><a href="javascript:;">已过期</a></li> -->
                <li><a href="javascript:;" :class="[tabIndex == 5 ? 'active':'']" @click="changeStatus(5,'D400')">已撤销</a></li>
                <!-- <li><a href="javascript:;">已拒绝</a></li> -->
                <li><a href="javascript:;" :class="[tabIndex == 6 ? 'active':'']" @click="changeStatus(6,'draf')">草稿箱</a></li>
            </ul>
        </div>
        <Table 
            :tableTitle="'最近文档'" 
            style="margin-bottom:100px;"  
            :tableLoading="file.loading" 
            :tableClass="tabIndex == 6 ? 'table-four':'table-file'" 
            :total="page.total" 
            :currentpage="page.currentpage" 
            :display="page.display" 
            :tableTitleState="false"
            @pagechange="pageChangeHandel"
            >
                <ul slot="panel-content" class="detailList" v-if="tabIndex != 6">
                    <li class="clf" v-for="(item,index) in file.list" :key="index" :class="[!item.news ? 'icon' : '']" @click="goDetail(item)">
                        <span><img src="../../../assets/images/user.jpg" alt=""></span>
                        <span>{{item.senderName}}</span>
                        <span>{{item.docName}}</span>
                        <span>{{fileState(item.signStatus)}}</span>
                        <span>{{item.duration}}</span>
                        <span><router-link :to="'/detail/'+item.docId">查看</router-link></span>
                    </li>                    
                </ul>
                <ul slot="panel-content" class="drafList" v-if="tabIndex == 6">
                    <li class="clf" v-for="(item,index) in file.list" :key="index"  @click="goFill(item)">
                        <span>{{item.docName}}</span>
                        <span>{{item.createTime}}</span>
                        <span>{{item.signators}}</span>
                        <span><router-link to="/tofill">查看</router-link></span>
                    </li>                    
                </ul>
            </Table>
            <!-- <div class="page-box">
                <pagination :total="file.page.total" :currentpage="file.page.currentpageIndex" :display="file.page.display"  @pagechange="pageChangeHandel"></pagination>
                <div class="page-num">
                    {{file.page.currentpageIndex}}/{{Math.ceil(file.page.total / file.page.display)}}，共{{file.page.total}}条
                </div>
            </div> -->
    </section>
</template>
<script>
    let fileList = [
        {
            userName:'张三',
            fileName:'这是一个发起文档的文档名称文档的文档名称',
            state:'待我签',
            duration:'2017.04.23 - 2017.04.25',
            news:0
        },
        {
            userName:'张三',
            fileName:'这是一个发起文档的文档名称文档的文档名称',
            state:'待我签',
            duration:'2017.04.23 - 永久有效',
            news:1
        },
        {
            userName:'张三',
            fileName:'这是一个发起文档的文档名称文档的文档名称',
            state:'待我签',
            duration:'2017.04.23 - 2017.04.25',
            news:0
        },
        {
            userName:'张三',
            fileName:'这是一个发起文档的文档名称文档的文档名称',
            state:'待我签',
            duration:'2017.04.23 - 永久有效',
            news:1
        }
    ]
    export default{
        name:'mana_file',
        data(){
            return{
                searchTitle:'',
                tabIndex:1,        //tabIndex  1-全部 2-待我签 3-待其他人签 4-已完成   5-已撤销   6-草稿箱 (已过期 已拒绝)
                tabStatus:'',      //tab状态
                timeIndex:null,       //日期选择  1日期控件，1-周内，2-一月内，3-三月内
                file:{
                    list:[],
                    loading:false,
                    beginTime:'',
                    endTime:''                    
                },
                timeDuration:'',  //
                page:{
                    total:null,
                    currentpageIndex:1,
                    display:8
                },
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();  //-86400000 包括今天 
                    }
                },
            }
        },
        methods:{
            //搜索
            searchHandle(event){
                if(event.keyCode == 13){  //enter
                    this.searchDocumentLight();
                }
            },
            dataChange(daterange){  //日期改变
                this.file.beginTime = daterange[0];
                this.file.endTime = daterange[1];
                this.timeIndex = 1;
                this.timeDuration = daterange[0]+'-'+daterange[1];
                this.searchDocumentLight();
            },
            getNowDate(n){
                this.timeDuration = '';
                if(n == 7){
                    this.timeIndex = 2;
                }else if(n == 30){
                    this.timeIndex = 3;
                }else if(n == 90){
                    this.timeIndex = 4;
                }else{
                    this.timeIndex = 1;
                }
                this.file.beginTime= this.getDataFn(n).formatwdate;
                this.file.endTime = this.getDataFn(n).currentdate;
                this.searchDocumentLight();
            },
            //改变tab状态
            changeStatus(num,status){  //tabIndex   status
                this.tabIndex = num;
                this.tabStatus = status;
                if(this.page.currentpageIndex != 1){
                    this.page.currentpageIndex = 1;
                    this.CUSTOMEVENT.$emit('tip2',1);
                }
                this.searchDocumentLight();                
            },
            //文档列表
            searchDocumentLight(){
                this.file.loading = true;
                let [data,reqUrl] = [null,null]  //声明变量
                if(this.tabIndex == 6){  //草稿箱
                    data = {
                        page:this.page.currentpageIndex,
                        pageSize:this.page.display,
                    }
                    reqUrl = this.URL['searchDraftLight']
                }else{
                    data = {
                        page:this.page.currentpageIndex,
                        pageSize:this.page.display,
                        signStatus:this.tabStatus,
                        condition:this.searchTitle,
                        beginTime:this.file.beginTime,
                        endTime:this.file.endTime,
                    }
                    reqUrl = this.URL['searchDocumentLight']
                }                
                this.httpGet(reqUrl,data,(json)=>{
                    if(json.meta.success){
                        this.file.list = json.data.list;
                        this.page.total = json.data.totalCount;
                        this.file.loading = false;
                    }
                })
            },
            //过滤状态
            fileState(value){
                var statusTxt = '';
                switch(value){
                    case '200':
                        statusTxt = "待签署";
                        break;
                    case '201':
                        statusTxt = "待我签";
                        break;
                    case '202':
                        statusTxt = "待他人签";
                        break;
                    case '300':
                        statusTxt = "已完成";
                        break;
                    case 'D400':
                        statusTxt = "已撤销";
                        break;
                    default:
                        break;
                        
                }
                return statusTxt;
            },
            goDetail(item){
                this.$router.push({
                    name:"Detail",
                    params:{
                        docId:item.docId
                    },
                    query:{
                        tabIndex:this.tabIndex,
                        tabStatus:this.tabStatus,
                        pageIndex:this.page.currentpageIndex
                    }
                });
            },
            goFill(item){   //到发起签约页面
                this.$router.push({
                    name:"ToFill",
                    query:{
                        docId:item.docId
                    }
                });
            },
            pageChangeHandel(val){
                this.page.currentpageIndex = val;
                this.searchDocumentLight();
            }
        },
        mounted(){
            this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
            this.page.currentpageIndex = this.$route.query.pageIndex ? this.$route.query.pageIndex : 1;
            this.tabStatus = this.$route.query.tabStatus ? this.$route.query.tabStatus : '';
            this.CUSTOMEVENT.$emit('tip2',this.page.currentpageIndex);
            this.searchDocumentLight();

            
        }
    }
</script>
