<template>
    <section class="authorize">
        <div class="info box">
           <div class="sideLeft">
               <span class="photo"><img src="../../../assets/images/user.jpg" alt=""></span>
               <h3>数安时代科技股份有限公司<span class="real"><i class="iconfont icon-solid_check"></i>已实名</span></h3>
               <p>13412345678@163.com 账号</p>
           </div>
           <div class="sideRight">
               <h3>授权代表人能够使用您的企业签章完成签署，请谨慎设置！一旦设置授权代表人，即表示您阅读并同意<a href="javascript:;">《授权代表人管理办法》</a></h3>
               <p>接收授权代表人使用该签章签署的信息<i class="iconfont icon-checkbox_solid"></i></p>
           </div>
        </div>
        <div class="authorizeList">
            <div class="authorHeader box">
                <div class="sideOne"><img src="../../../assets/images/seal.png" alt=""></div>
                <div class="sideTwo">
                    <h3>数安时代科技股份有限公司-公司章</h3>
                    <p>签章编号：186829602920672</p>
                    <p>授权代表人：已设置3人</p>
                </div>
                <div class="sideThree" @click="authorize.state = true">
                    <p><i class="iconfont icon-add_empty"></i></p>
                    <p>添加授权</p>
                </div>
                <div class="sideFour">
                    <i class="iconfont icon-reduce"></i>
                    <p>取消全部授权</p>
                </div>
            </div>
            <div class="list">
                <div class="item box">
                    <div class="item1">
                        <img src="../../../assets/images/user.jpg" alt="">
                    </div>
                    <div class="item2">
                        <p class="box">
                            <span>张三</span>
                            <span class="real"><i class="iconfont icon-solid_check"></i>实名用户</span>
                        </p>                        
                    </div>
                    <div class="item3">18823658956</div>
                    <div class="item4"><a href="javascript:;">取消授权</a></div>
                </div>
                <div class="item box">
                    <div class="item1">
                        <img src="../../../assets/images/group.png" alt="">
                    </div>
                    <div class="item2">
                        <p class="box">
                            <span>张三</span>
                            <span class="real"><i class="iconfont icon-solid_check"></i>实名用户</span>
                        </p>                        
                    </div>
                    <div class="item3 shengl">
                        张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四
                    </div>
                    <div class="item4"><a href="javascript:;">取消授权</a></div>
                </div>
            </div>

            <div class="authorHeader box">
                <div class="sideTwo">
                    <p>数安时代科技股份有限公司-公司章</p>
                    <p>签章编号：186829602920672</p>
                    <p>授权代表人：已设置3人</p>
                </div>
                <div class="sideThree">
                    <p><i class="iconfont icon-add_empty"></i></p>
                    <p>添加知情人</p>
                </div>
                <div class="sideFour">
                    <i class="iconfont icon-reduce"></i>
                    <p>取消全部知情人</p>
                </div>
            </div>
            <div class="list">
                <div class="item box">
                    <div class="item1">
                        <img src="../../../assets/images/user.jpg" alt="">
                    </div>
                    <div class="item2">
                        <p class="box">
                            <span>张三</span>
                            <span class="real"><i class="iconfont icon-solid_check"></i>实名用户</span>
                        </p>                        
                    </div>
                    <div class="item3">18823658956</div>
                    <div class="item4"><a href="javascript:;">取消授权</a></div>
                </div>
                <div class="item box">
                    <div class="item1">
                        <img src="../../../assets/images/group.png" alt="">
                    </div>
                    <div class="item2">
                        <p class="box">
                            <span>张三</span>
                            <span class="real"><i class="iconfont icon-solid_check"></i>实名用户</span>
                        </p>                        
                    </div>
                    <div class="item3 shengl">
                        张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四；张三；李四
                    </div>
                    <div class="item4"><a href="javascript:;">取消授权</a></div>
                </div>
            </div>
        </div>
        <!-- 添加授权弹框 -->
        <section class="addAuthorizeCover" v-show="authorize.state">
            <div class="authorizeBox">
                <div class="aHeader">
                    <h3>添加授权<i class="iconfont icon-close" @click="authorize.state = false"></i></h3>
                </div>
                <div class="aBody">
                    <div class="sideLeft">
                        <div class="search">
                            <i class="iconfont icon-search"></i>
                            <input type="text" placeholder="姓名/账号/标签">
                        </div>
                        <dragModel>
                            <ul class="sign_page_scroll" slot="dragTop">
                                <Dendrogram :treeListData="treeListData" @selectTreeHandle="selectTreeHandle"></Dendrogram>
                            </ul>
                            <div slot="dragBottom">
                                <Table 
                                    :tableTitleState="false" 
                                    :tableLoading="tableLoading" 
                                    :tableClass="'table-three'" 
                                    :total="page.total" 
                                    :currentpage="page.currentpage" 
                                    :display="page.display" 
                                    :pagegroup="3"
                                    @pagechange="pageChangeHandel"
                                    >
                                        <ul slot="panel-content" class="personList sign_page_scroll">
                                            <li>
                                                <span><i class="iconfont icon-circle"></i></span>
                                                <span>张三</span>
                                                <span>18825036989</span>
                                            </li>
                                            <li>
                                                <span><i class="iconfont icon-solid_check"></i></span>
                                                <span>张三</span>
                                                <span>18825036989</span>
                                            </li>
                                            <li>
                                                <span><i class="iconfont icon-circle"></i></span>
                                                <span>张三</span>
                                                <span>18825036989</span>
                                            </li>
                                            <li>
                                                <span><i class="iconfont icon-circle"></i></span>
                                                <span>张三</span>
                                                <span>18825036989</span>
                                            </li>
                                            
                                        </ul>
                                    </Table>
                            </div>
                        </dragModel>
                    </div>
                    <div class="sideRight sign_page_scroll">
                        <h3>已选</h3>
                        <Table
                            :tableTitleState="false"
                            :tableClass="'table-two'"
                        >
                            <ul slot="panel-content">
                                <li>
                                    <span>小妮子</span>
                                    <span>18825039689</span>
                                    <i class="iconfont icon-del-solid"></i>
                                </li>
                                <li @click="authorize.labelState = true">
                                    <span>小妮子</span>
                                    <span>18825039689</span>
                                    <i class="iconfont icon-del-solid"></i>
                                </li>
                            </ul>
                        </Table>
                    </div>
                </div>
            </div>
        </section>
        <!-- 标签详情 -->
        <section class="labelCover" v-show="authorize.labelState">
            <div class="labelBox">
                <div class="labelList">
                    <h3>标签名称：测试组（3人）<i class="iconfont icon-close" @click="authorize.labelState = false"></i></h3>
                    <Table
                        :tableTitleState="false"
                        :tableClass="'table-two'">
                        <ul slot="panel-content">
                            <li>
                                <span>小妮子</span>
                                <span>18825039689</span>
                            </li>
                            <li>
                                <span>小妮子</span>
                                <span>18825039689</span>
                            </li>
                        </ul>
                    </Table>
                </div>
            </div>
        </section>
       <!-- <Dendrogram :treeListData="treeListData" @selectTreeHandle="selectTreeHandle"></Dendrogram> -->
    </section>
</template>
<script>
    let treeListData = [
        {
            title:"数安时代科技股份有限公司数安时代科技股份有限公司数安时代科技股份有限公司-经理",
            children:[
                {
                    title:'研发中心-总监',
                    children:[
                        {
                            title:'平台研发-部门经理',
                            children:[
                                {
                                    title:'开发组',
                                    children:[]
                                },
                                {
                                    title:'测试组',
                                    children:[]
                                },
                                {
                                    title:'前端组',
                                    children:[]
                                },
                                {
                                    title:'用户体验组',
                                    children:[]
                                }
                            ]
                        },
                        {
                            title:'客户端研发-部门经理',
                            children:[
                                {
                                    title:'开发组',
                                    children:[]
                                },
                                {
                                    title:'测试组',
                                    children:[]
                                },
                            ]
                        }
                    ]
                },
                {
                    title:'销售中心-总监',
                    children:[
                        
                    ]
                }
            ]
        }
    ]
    export default{
        name:'authorize',
        data(){
            return{
                tableLoading:false,
                treeListData:treeListData,
                authorize:{
                    state:false,
                    labelState:false,
                },
                page:{
                    total:100,
                    currentpageIndex:1,
                    display:8
                },
            }
        },
        methods:{
            selectTreeHandle(item){
                console.log(item)
            },
            pageChangeHandel(val){
                console.log(val)
            }
        }
    }
</script>
