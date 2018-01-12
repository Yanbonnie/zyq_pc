<template>
  <div class="panel-box"  v-cloak>
        <slot name="panel-header">
            <h3 class="title" v-if="tableTitleState">{{tableTitle}}</h3>
        </slot>
        <div class="table" :class="[tableClass]">
            <div class="loadSource" v-show="tableLoading">
                <p><img src="../../../assets/images/loading.gif" alt="" width="80" height="51"></p>
            </div>
            <slot name="panel-content">
                <!-- <ul>
                    <li class="clf icon">
                        <span><img src="../../../assets/images/user.jpg" alt=""></span>
                        <span>张三</span>
                        <span>这是一个发起文档的文档名称文档的文档名称</span>
                        <span>待我签</span>
                        <span>2017.04.23 - 2017.04.25</span>
                        <span><a class="javascript:;">重新编辑</a></span>
                    </li>
                    <li class="clf">
                        <span><img src="../../../assets/images/user.jpg" alt=""></span>
                        <span>张三</span>
                        <span>这是一个发起文档的文档名称文档的文档名称</span>
                        <span>待我签</span>
                        <span>2017.04.23 - 2017.04.25</span>
                        <span><a class="javascript:;">重新编辑</a></span>
                    </li>
                </ul> -->
            </slot>
            <div class="no-message" v-show="total == 0  && !tableLoading">
                <p><img src="../../../assets/images/noAnyThing.png" alt="" ></p>
                <p v-text="'暂无数据'"></p>
            </div> 
            <div class="pageNumber" v-show="pageNumberState && total>display">
                <div class="page-box">
                    <pagination  :total="total" :currentpage="currentpageIndex" :display="display" :pagegroup="pagegroup"  @pagechange="pageChangeHandel"></pagination>
                    <div class="page-num">
                        {{currentpageIndex}}/{{Math.ceil(total / display)}}，共{{total}}条
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
    export default{
        name:'table',
        data(){
            return{
                currentpageIndex:this.currentpage
            }
        },
        props:{
            tableTitle:{   //table标题
                type:String,
                default:'列表标题'
            },
            tableTitleState:{    //table标题状态默认为true   true 显示 false 隐藏  
                type:Boolean,
                default:true
            },
            tableClass:{    //给table添加样式
                type:String,
                default:''
            },
            tableLoading:{   //table数据加载状态
                type:Boolean,
                default:false
            },
            tableListData:{  //table列表数据
                type:Array,
                default:function () {
                    return []
                }
            },
            total:{          //table翻页的总页数
                type:Number,
                default:1
            },
            currentpage:{    //table翻页的当前页数
                type:Number,
                default:1
            },
            display:{        //table翻页的每页条数
                type:Number,
                default:1
            },
            pageNumberState:{  //table翻页是否显示  
                type:Boolean,
                default:true
            },
            pagegroup:{
                type:Number,
                default:5
            }
        },
        methods:{
            pageChangeHandel(val){
                this.currentpageIndex = val;
                this.$emit('pagechange',val)
            }
        }
    }
</script>
<style lang="scss" scoped>
$BORDER:#DEE2ED;
.panel-box{
    border: 1px $BORDER solid;
    margin-bottom: 20px;
    .title{
        height: 60px;
        line-height: 60px;
        padding-left: 4.5%;
        font-weight: normal;
        color: #6E7571;
        font-size: 14px;    
        border-bottom: 1px $BORDER solid;
        a{
            &.more{
                color: #ff563f;
                float: right;
                margin-right: 2.5%;
            }
        }
    }
    .table{
        padding-left: 20px;
        position: relative;
        
        li{
            height: 60px;
            line-height: 60px;
            border-bottom: 1px $BORDER solid;
            clear: both;
            position: relative;
            &:last-child{
                border: 0;
            }
            span{
                float: left;
                word-break:keep-all;/* 不换行 */
                white-space:nowrap;/* 不换行 */
                overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
                text-overflow:ellipsis;
                a{
                    width: 80px;
                    height: 34px;
                    border: 1px $BORDER solid;
                    text-align: center;
                    line-height: 34px;
                    border-radius: 50px;
                    -ms-border-radius:50px;
                    display: block;
                    cursor: pointer;
                    margin-top: 10px;
                    color:#ff563f;
                }
                &.headImg{
                    width: 50px;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 100%;
                        -ms-border-radius:100%;
                        margin-top: 15px;
                    }
                }
            } 
            &.icon{
                &::before{
                    position: absolute;
                    width: 8px;
                    height:8px;
                    line-height: 8px;
                    border-radius: 50px;
                    -ms-border-radius:50px;
                    content: '.';
                    font-size: 0;
                    background:#ff563f;
                    top: 50%;
                    margin-top: -4px;
                }
            }           
        }
        &.table-two{
            span{
                width: 48%;
                padding-left: 2%;
            }
        }
        &.table-four{
            span{
                width: 23%;
                float: left;
                padding-left: 2%;
            }
        }
        &.table-five{
            span{
                width: 18%;                
                padding-left: 2%;
            }
        }
        &.table-six{
            span{
                width: 14.6%;                
                padding-left: 2%;
            }
        }
        &.table-seven{
            span{
                width: 12.2%;                
                padding-left: 2%;
            }
        }
        &.table-eight{
            span{
                width: 10.5%;                
                padding-left: 2%;
            }
        }
        &.table-file{
            span{
                padding-left:2%;
                &:nth-child(1){
                    width: 5%;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 100%;
                        -ms-border-radius:100%;
                        margin-top: 15px;
                    }
                }
                &:nth-child(2){
                    width: 10%;
                }
                &:nth-child(3){
                    width: 30%;
                }
                &:nth-child(4){
                    width: 8%;
                }
                &:nth-child(5){
                    width: 15%;
                    text-align: right;
                }
                &:nth-child(6){
                    width: 20%;
                    a{
                        // margin: 10px auto 0;
                        float: right;
                        margin-right: 10%;
                    }
                }
            }
        }
        .page-box{
          position: absolute;
          width: 100%;
          bottom: -50px;
          left: 0;  
          .pagination-box{
              padding-bottom: 0;
          }
          .page-num{
              line-height: 30px;
              right: 10px;
          }
        }
    }
}
    
</style>
