<template>
    <section class="toFill contain">
        <nav>发起签约</nav>
        <div class="signFile">
            <input type="file" id="file" class="filestyle" />
            <div class="dashed" id="drop_area">
                <!-- <img v-if="!isImg" src="../../assets/image/shangchuan.png"  class="upfile"/> -->
                <p class="iconP" v-if="!uploadFileState && signFile"><i class="iconfont icon-success"></i></p>
                <p class="iconP" v-if="!signFile && againState == 2"><i class="iconfont icon-warn"></i></p> <!--上传文件被中断-->
                <p class="iconP" v-if="!signFile && againState == 2">上传文件被中断,请重新上传</p>            <!--上传文件被中断-->
                <p class="iconP" v-if="uploadFileState && signFile"><img src="../../../assets/images/loading.gif" width="" height="50" alt=""></p>
                <p class="title"><span>{{pdfFileName = (!signFile && againState == 2) ? '' : pdfFileName}}</span><a href="javascript:;" id="againUpLoad">{{signFile ? '重新上传' : '上传文件'}}</a></p>
                <p class="tip"><i class="iconfont icon-circle"></i>在签署文件首页添加<a>《仲裁条款》</a>若双方另行约定了管辖方式，请勿勾选</p>
            </div>
        </div>
        <div class="setting">
            <div class="box item">
                <label for="" class="">主题</label>
                <div class="sideRight">
                    <input type="text" placeholder="请输入文档主题" class="title">
                </div>
            </div>
            <div class="box item">
                <label for="" class="">签约截止日期</label>
                <div class="sideRight">
                    <span class="calendarBox col-lg-3 col-md-4 col-sm-6">
                        <div class="input-append date form_datetime"  id="date_start" >
                            <input size="16" type="text" value=""  v-model.trim="durationTime" readonly placeholder="选择有效日期">
                            <b class="add-on"><i class="iconfont icon-calendar"></i></b>
                        </div>
                    </span>
                    <span class="time"><i class="iconfont icon-circle"></i><b>永久有效</b></span> <!--icon-solid_check-->
                </div>
            </div>
            <div class="box item">
                <label for="">签署方式</label>
                <div class="sideRight">
                    <ul>
                        <li>
                            <a href="javascript:;" @click="signOrder = '001'">
                                <i class="iconfont" :class="[signOrder == '001' ? 'icon-radioOn':'icon-circle']"></i>
                                <span>任意签<b>（签署人先到先签，无固定顺序）</b></span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" @click="signOrder = '002'">
                                <i class="iconfont " :class="[signOrder == '002' ? 'icon-radioOn':'icon-circle']"></i> 
                                <span>顺序签<b>（A->B->C->D ，可拖动签署人调整排序）</b></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box item">
                <label for="">添加签署人</label>
                <div class="selectList">
                    <ul v-show="signOrder == '001'">  <!--任意签-->
                        <li class="box">
                            <span><b class="iconfont icon-menu_icon"></b></span>
                            <span :class="[signOrder == '002'?'':'opacity']">01</span>
                            <span class="iconfont icon-com_sign"></span>
                            <span class="shengl">张三</span>
                            <span class="shengl">数安时代科技股份有限公司</span>
                            <i class="iconfont icon-del-solid"></i>
                        </li>
                        <li class="box">
                            <span><b class="iconfont icon-menu_icon"></b></span>
                            <span :class="[signOrder == '002'?'':'opacity']">01</span>
                            <span class="iconfont icon-com_sign"></span>
                            <span class="shengl">张三</span>
                            <span class="shengl">数安时代科技股份有限公司</span>
                            <i class="iconfont icon-del-solid"></i>
                        </li>
                    </ul>
                    <ul v-show="signOrder == '002'" >
                        <draggable v-model="selectList">
                            <transition-group>
                                <li class="box" v-for="(item,index) in selectList" :key="index">
                                    <span><b class="iconfont icon-menu_icon"></b></span>
                                    <span :class="[signOrder == '002'?'':'opacity']">{{index+1}}</span>
                                    <span class="iconfont icon-com_sign"></span>
                                    <span class="shengl">张三</span>
                                    <span class="shengl">{{item.company}}</span>
                                    <i class="iconfont icon-del-solid"></i>
                                </li>
                            </transition-group>
                        </draggable>
                    </ul>
                </div>                
            </div>
            <div class="box item">
                <label for=""></label>
                <div class="btnBox">
                    <a href="javascript:;"><i class="iconfont icon-add"></i>从通讯录添加</a>
                    <a href="javascript:;"><i class="iconfont icon-add"></i>新建联系人</a>
                </div>
            </div>
            <div class="box item">
                <label for="">添加抄送人</label>
                <p class="cstxt" @click="ccState = !ccState">只接受副本不签署<i class="iconfont icon-down"></i></p>
            </div>
            <div class="box item" v-show="ccState">
                <label for=""></label>
                <div class="btnBox">
                    <a href="javascript:;"><i class="iconfont icon-add"></i>从通讯录添加</a>
                    <a href="javascript:;"><i class="iconfont icon-add"></i>新建联系人</a>
                </div>
            </div>
        </div>
        <div class="bottomBox">
            <div class="clf">
                <a href="javascript:;">存草稿</a>
                <a href="javascript:;">发送</a>
            </div>
        </div>
        <!--添加签署人弹框-->
        <section class="mailListBox" v-show="addMailState">
            <div class="mailContent">
                <h3 class="mailHeader">
                    请选择要添加的联系人<i class="iconfont icon-close"></i>
                </h3>
                <div class="mailBody clf">
                    <div class="sideLeft">
                        <ul>
                            <li class="title">分组</li>
                            <li class="active item">
                                <a href="javascript:;">我</a>
                            </li>
                            <li class="item">
                                <a href="javascript:;">联系人</a>
                            </li>
                            <li class="item">
                                <a href="javascript:;">同事</a>
                            </li>
                            <li class="item">
                                <a href="javascript:;">合作伙伴</a>
                            </li>
                        </ul>
                    </div>
                    <div class="sideRight">
                        <ul>
                            <li class="title">
                                <span class="iconfont icon-square"></span>
                                <span>姓名</span>
                                <span>账号</span>
                            </li>
                            <li class="item">
                                <span class="iconfont icon-square"></span>
                                <span class="shengl">小妮子</span>
                                <span>18823659854</span>
                            </li>
                            <li class="item">
                                <span class="iconfont icon-checkbox_solid"></span>
                                <span class="shengl">小妮子</span>
                                <span>18823659854</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mailFooter">
                    <a href="javascript:;">确定</a>
                </div>
            </div>
        </section>
        <!--新建签署人弹框-->
        <alertModel :title="'请填写签署方信息'" v-show="createMailState" :type="2" :alelrtClassWidth="'500px'" @cancelHandle="createMailState=false" @sureHandle="createSigner">
            <div slot="alert-content" class="createSign">
                <p><input type="text" placeholder="签署方姓名或公司"></p>
                <p><input type="text" placeholder="手机号或邮箱"></p>
            </div>
        </alertModel>
    </section>
</template>
<script>
    import draggable from 'vuedraggable';
    let selectList = [
        {
            company:'数安时代科技股份有限公司1'
        },
        {
            company:'数安时代科技股份有限公司2'
        },
        {
            company:'数安时代科技股份有限公司3'
        }
    ]
    export default{
        name:'toFill',
        data(){
            return {
                pdfFileName:'',        //文件名称
                signTitle:'',          //文档主题
                signFile:null,         //文档流
                uploadFileState:false, //上传文件状态
                againState:1,          //从发起签约进来   2 为从首页入口进来

                //setting
                durationTime:'',           //签约截止日期
                signOrder:'001',           //001任意签  002顺序签
                //添加签署人
                addMailState:false,        //添加签署人弹框状态
                createMailState:false,      //新建签署人弹框状态
                selectList:selectList,     //选中签署人，
                ccState:false,             //是否添加抄送
            }
        },
        components: {
            draggable
        },
        methods:{
            createSigner(){  //创建签署人
                console.log('创建签署人')
            },
            clickFileFn() {
                $('#againUpLoad').on('click',()=> {
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
            dragFileFn() {
                let that = this;
                $(document).on({ 
                    dragleave:function(e){    //拖离 
                        e.preventDefault(); 
                    }, 
                    drop:function(e){  //拖后放 
                        e.preventDefault(); 
                    }, 
                    dragenter:function(e){    //拖进 
                        e.preventDefault(); 
                    }, 
                    dragover:function(e){    //拖来拖去 
                        e.preventDefault(); 
                    } 
                });                   
                let box = document.getElementById('drop_area'); //拖拽区域 
                box.addEventListener("drop",(e)=>{
                    e.preventDefault(); //取消默认浏览器拖拽效果 
                    let fileList = e.dataTransfer.files; //获取文件对象 
                      //检测是否是拖拽文件到页面的操作 
                    if(fileList.length == 0){ 
                        return false; 
                    } 
                    this.fileCom(fileList[0]);
                },false); 
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
                    this.uploadFile();
            },
            uploadFile(){
                this.uploadFileState = true;
                let formData = new FormData();        
                formData.append('uploadFile',this.signFile);
                $.ajax({
                    url: this.apiPath+this.URL['uploadProgress'],
                    dataType: 'json',
                    type: 'POST',
                    // headers: {'token': sessionStorage.getItem("token")},
                    processData: false,
                    contentType: false,
                    cache: false,
                    data: formData,
                }).done((result) => {
                    this.uploadFileState = false;
                }).fail((err) => {
                    console.log(err)    
                });
            }
        },
        computed:{

        },
        mounted(){
            this.clickFileFn();
            this.dragFileFn();
            this.againState = this.$route.query.againState ? this.$route.query.againState : 1 ;
            this.signTitle = this.$store.state.signFile ? this.$store.state.signFile : '';            
            this.pdfFileName = this.$store.state.pdfFileName ? this.$store.state.pdfFileName : '请上传需要的pdf文件';            
            this.signFile = this.$store.state.upFile ? this.$store.state.upFile : null;
            if(this.signFile){
                this.uploadFile();
            }
        }
    }
</script>