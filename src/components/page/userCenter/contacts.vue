<template>
    <section class="contacts">
        <div class="setpOne" v-show="step == 1">
            <nav>
                <router-link to="/user/nearcontacts">最近联系人</router-link>
                <a href="javascript:;" class="active">通讯录</a>
                <div class="search">
                    <input type="text" v-model="searchTitle" placeholder="姓名/账号" @keyup="searchHandle($event)" >
                    <i class="iconfont icon-search"></i>
                </div>
            </nav>
            <section class="addressBook box">
                <!-- 标签tab -->
                <div class="sideLeft">
                    <h3>标签</h3>
                    <div class="clf bookList sign_page_scroll">
                        <div class="item"  v-for="(item,index) in menu" :key="index"> 
                            <p 
                                :class="[labelIndex == index ? 'hover' : '']"
                                draggable="true" 
                                @dragend="dragEnd" 
                                @dragstart='drag($event,item,index)' 
                                @drop="drop($event,item,index)" 
                                @dragover="allowDrop($event)">
                                <span v-show="oper.rnIndex != index">{{item.title}} <b>{{'('+item.count+')'}}</b></span>
                                <!-- <i class="iconfont icon-contact"></i> -->
                                <!-- <b>1</b> -->   
                                <input type="text" v-model="editLable" v-show="oper.rnIndex == index" @blur="oper.rnIndex = null" @click.stop="oper.rnIndex == index">
                                <strong>
                                    <i class="iconfont icon-rename" :class="[oper.rnIndex == index ? 'active':'']"  @click.stop="renameClick(item,index)"></i>
                                    <i class="iconfont icon-copy-circle"></i>
                                    <i class="iconfont icon-del-cicrcle"></i>      
                                </strong>
                            </p>
                            <Tree v-if="item.structure" :data="item.structure" @selectTreeItem="dragTreeItem" :dragState="false"></Tree>
                            
                        </div>
                    </div>
                    <div class="addLabel">
                        <a href="javascript:;">
                            <i class="iconfont icon-add"></i>新建标签
                        </a>
                    </div>
                </div>
                <div class="sideRight">
                    <Table :tableTitleState="true" :total="page2.total" :currentpage="page2.currentpageIndex" :display="page2.display" @pagechange="pageChangeHandel2">
                        <h3 slot="panel-header">
                            <a href="javascript:;" @click="step = 3"><i class="iconfont icon-add"></i>添加联系人</a>
                        </h3>
                        <ul slot="panel-content" class="addressBookList">
                            <li class="clf" v-for="(item,index) in nearConList"  @click="step = 2" :key="index" @dragstart='drag($event,item)' @dragend="dragEnd" draggable="true">
                                <div class="item box">
                                    <span class="headImg"><img src="../../../assets/images/user.jpg" alt=""></span>
                                    <span>{{item.userName}}</span>
                                    <span class="shengl">{{item.account}}</span>
                                    <!-- <span><a href="javascript:;" @click="step = 2">编辑</a></span> -->
                                    <span @click.stop="clickIndex = index"><i class="iconfont icon-menu"></i></span>
                                </div>
                                <div class="selectBox" v-if="index == clickIndex">
                                    <p>发给他签</p>
                                    <p>查看签署记录</p>
                                    <p class="line">联系人信息</p>
                                    <p>删除联系人</p>
                                </div>
                            </li>
                        </ul>
                        
                    </Table>                    
                </div>
            </section>
        </div>
        <!-- 编辑或查看联系人 -->
        <div class="setpTwo" v-show="step == 2">
            <nav @click="step = 1"><i class="iconfont icon-back" ></i>返回</nav>
            <div class="contactInfo">
                <h3>联系人</h3>
                <div class="contactBody box">
                    <div class="sideLeft">
                        <img src="../../../assets/images/user.jpg" alt="">
                    </div>
                    <div class="sideCenter">
                        <p>姓名</p>
                        <p>手机</p>
                        <p>邮箱</p>
                        <p>账号</p>
                        <p>分组</p>
                        <p>备注名</p>
                    </div>
                    <div class="sideRight">
                        <p>
                            <span v-show="editCon.nameState == 1">{{edit.name}}</span>
                            <i class="iconfont icon-edit" @click="editHandle(1)" v-show="editCon.nameState == 1"></i>
                            <input type="text" v-model="edit.name" id="name" :class="[editCon.nameState==2 ? '':'opacity']" @keyup.enter="editCon.nameState=1" @blur="editCon.nameState=1">
                        </p>
                        <p>
                            <span v-show="editCon.phoneState == 1">{{edit.phone}}</span>
                            <i class="iconfont icon-edit" @click="editHandle(2)" v-show="editCon.phoneState == 1"></i>
                            <input id="phone" v-model="edit.phone" :class="[editCon.phoneState==2 ? '':'opacity']" type="text"  @keyup.enter="editCon.phoneState=1" @blur="editCon.phoneState=1">
                        </p>
                        <p>
                            <span :class="[edit.email == '' ? 'none':'']" v-show="editCon.emailState == 1">{{edit.email == '' ? '请填写联系人邮箱' : edit.email}}</span>
                            <i class="iconfont icon-edit" @click="editHandle(3)" v-show="editCon.emailState == 1"></i>
                            <input type="text" :class="[editCon.emailState==2 ? '':'opacity']" v-model="edit.email" id="email"  @keyup.enter="editCon.emailState=1" @blur="editCon.emailState=1">                            
                        </p>
                        <p>
                            <span>未知</span>
                        </p>
                        <p class="clf">
                            <a href="javascript:;">通讯录</a>
                            <i class="iconfont icon-down_one"></i>
                        </p>
                        <p>
                            <span :class="[edit.memo == '' ? 'none' : '']" v-show="editCon.memoState == 1">{{edit.memo == '' ? '添加备注名' : edit.memo}}</span>
                            <i class="iconfont icon-edit" @click="editHandle(4)" v-show="editCon.memoState == 1"></i>
                            <input type="text" :class="[editCon.memoState==2 ? '':'opacity']" v-model="edit.memo" id="memo"  @keyup.enter="editCon.memoState=1" @blur="editCon.memoState=1">
                        </p>
                    </div>
                </div>
                <div class="contactFooter">
                    <div class="clf">
                        <a href="javascript:;">取消</a>
                        <a href="javascript:;">保存</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑或查看联系人 -->
        <div class="setpTwo" v-show="step == 3">
            <nav @click="step = 1"><i class="iconfont icon-back" ></i>返回</nav>
            <div class="contactInfo">
                <h3>新建联系人</h3>
                <div class="contactBody box">
                    <div class="sideLeft">
                        <img src="../../../assets/images/user.jpg" alt="">
                    </div>
                    <div class="sideCenter">
                        <p>姓名</p>
                        <p>手机</p>
                        <p>邮箱</p>
                        <p>账号</p>
                        <p>分组</p>
                        <p>备注名</p>
                    </div>
                    <div class="sideRight">
                        <p>
                            <input type="text" v-model="create.name" placeholder="请输入姓名">
                        </p>
                        <p>
                            <input type="text" v-model="create.phone" placeholder="请输入手机">
                        </p>
                        <p>
                            <input type="text" v-model="create.email" placeholder="请输入邮箱">
                        </p>
                        <p>
                            <span>未知</span>
                        </p>
                        <p class="clf">
                            <a href="javascript:;">通讯录</a>
                            <i class="iconfont icon-down_one"></i>
                        </p>
                        <p>
                            <input type="text" v-model="create.memo" placeholder="请输入备注">
                        </p>
                    </div>
                </div>
                <div class="contactFooter">
                    <div class="clf">
                        <a href="javascript:;">取消</a>
                        <a href="javascript:;">保存</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除联系人 -->
        <alertModel v-show="delCon.state" :title="'删除联系人'" :type="2" @cancelHandle="delCon.state=false" @sureHandle="sureDelCon">
            <div slot="alert-content">
                <p>确定从通讯录删除 <span :style="'color:#ff563f;'">李四 13412352645 </span>该联系人吗？</p>
            </div>
        </alertModel>
    </section>
</template>

<script>
    let nearConList = [{
        userName:'张三',
        account:'18825039689'
    },
    {
        userName:'张三',
        account:'18825039689'
    }]
    // import Tree from 'vue-draggable-tree';
    let menu = [
        {
            id:'1',
            title:"我",
            count:'5'
        },
        {
            id:"2",
            title:"联系人",
            count:'4'
        },
        {
            id:"3",
            title:"同事",
            count:'1'
        },
        {
            id:"4",
            title:"合作伙伴",
            count:'3'
        },{
            id:"5",
            title:"我的企业",
            count:'5',
            structure:[{
                    title: "数安时代科技股份有限公司-经理 (4)",
                    children: [{
                        title: "研发中心-总监 (10)",
                        children: [
                            {
                                title: "平台研发-部门经理 (2)",
                                children: [
                                    {
                                        title: "开发组-组长 (1)",
                                        children:[]
                                    },
                                    {
                                        title: "测试组-组长 (1)",
                                        children:[]
                                    }
                                ]
                            }, {
                            title:"终端研发-部门经理 (2)",
                            children: [
                                {
                                    title: "123",
                                    children:[]
                                }
                            ]
                        }]
                    }, {
                        title: "终端研发-部门经理 (2)",
                        children:[]
                    }]
                }]
        }
    ]
    export default{
        name:'contacts',
        data(){
            return{
                searchTitle:'',            //搜索关键字
                step:1,                       //联系人状态  1为通讯录   2为查看(编辑)联系人
                nearConList:nearConList,
                delCon:{                   //删除联系人
                    state:false,
                },
                edit:{                     //编辑
                    name:'张三',
                    phone:'18825039689',
                    email:'',
                    memo:'',
                },
                create:{                     //编辑
                    name:'',
                    phone:'',
                    email:'',
                    memo:'',
                },
                editCon:{
                    nameState:1,           //1为显示
                    phoneState:1,
                    emailState:1,
                    memoState:1,
                },
                page:{
                    currentpageIndex:1,
                    total:100,
                    display:10                    
                },
                page2:{
                    currentpageIndex:1,
                    total:100,
                    display:10                    
                },
                /*******/
                menu:menu,
                clickIndex:null,      //点击联系人列表右边的操作按钮
                labelIndex:0,         //选中的标签
                oper:{                //操作标签Index
                    rnIndex:null,     //重命名index
                },       
                editLable:"",         //编辑标签的名字

            }
        },
        methods:{
            //搜索联系人列表
            searchHandle(){

            },
            //点击重命名按钮
            renameClick(item,index){
                this.oper.rnIndex = index;
                this.editLable = item.title;
            },
            //树形拖拽
            dragTreeItem(dragData,dropData){
                console.log(dragData)
                console.log(dropData)
            },
            //标签拖拽
            drag(ev,item,index){       //拖拽当前元素
                ev.dataTransfer.setData("item",JSON.stringify(item));
                ev.dataTransfer.setData("index",index);
            },
            allowDrop(ev){             //目标元素
                $('.bookList .item p').removeClass('active');
                $(ev.currentTarget).addClass('active');
                 ev.preventDefault();
            },
            drop(ev,dropData,index){   //目标元素
                ev.preventDefault();
                $('.bookList .item p').removeClass();
                let data = JSON.parse(ev.dataTransfer.getData("item"));
                let Index = ev.dataTransfer.getData("index");
                this.labelIndex = index;   //选中拖拽结束的标签
                console.log(data)
                console.log(dropData)
                // let NewArr = this.changeArr(this.menu,index,Index);
                // this.menu = NewArr.map(function(item){
                //     return item
                // })
            },
            dragEnd(ev){               //拖拽当前元素
                $('.tree-title strong').css('background','');
            },
            changeArr(arr,k,j){
                let c = arr[k];
                arr[k] = arr[j];
                arr[j] = c;
                return arr;
            },
            /*标签拖拽end */
            editHandle(num){  //1-编辑姓名，2-编辑手机，3-编辑邮箱，4-编辑备注
                switch(num){
                    case 1:
                        this.editCon.nameState = 2;
                        $('#name').focus();
                        break;
                    case 2:
                        this.editCon.phoneState = 2;
                        $('#phone').focus();
                        break;
                    case 3:
                        this.editCon.emailState = 2;
                        $("#email").focus();
                        break;
                    case 4:
                        this.editCon.memoState = 2;
                        $('#memo').focus();
                        break;
                    default:
                        break;
                }
            },
            sureDelCon(){  //确认删除联系人

            },
            pageChangeHandel(val){  //最近联系人翻页
                console.log(val)
            },
            pageChangeHandel2(val){  //通讯录翻页
                console.log(val)
            },
            init(){
                let This = this;
                $(document).on('click',()=>{
                    if(this.clickIndex || this.clickIndex == 0){
                        this.clickIndex = null;
                    }
                    if(this.oper.rnIndex || this.oper.rnIndex == 0){
                        this.oper.rnIndex = null;
                    }
                })
                // $('.bookList p input').blur(function(){
                //     console.log(123)
                //     This.operIndex = null;
                // })
            }
        },
        mounted(){
            this.init();
        }
    }
</script>