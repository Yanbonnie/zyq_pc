<template>
    <section class="tree">
        <div class="tree-menu-comm tree-menu">
            <m-tree-list :data="data"  @selectTreeItem="selectTreeItem" :dragState="dragState"></m-tree-list>    
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    Vue.component('m-tree-list',{
        data(){
            return{
                // dragData:null
            }
        },
        computed:{
            count(){
               var c = this.increment;
               return ++c; 
            },
            stylePadding(){
                return {
                    'padding-left':this.count * 16 + 'px'
                }
            }
        },
        props:{
            data:{
                type:Array,
                default:[]
            },
            dragState:{
                type:Boolean,
                default:false
            },
            increment:{
                type:Number,
                default:0
            }
        },
        methods:{
            drag(ev,item){
                ev.dataTransfer.setData("item",JSON.stringify(item));
                // $(ev.currentTarget).css('background','#fedede');
            },
            allowDrop(ev){
                $('.tree-title strong').css({'color':''});
                $(ev.currentTarget).css({'color':'#ff503f'});
                 ev.preventDefault();
            },
            drop(ev,dropData){
                ev.preventDefault();
                $('.tree-title strong').css('background','');
                $('.addressBookList li').css('background','');
                let dragData = JSON.parse(ev.dataTransfer.getData("item"));                
                // this.$emit("selectTreeItem",this.dragData);
                this.selectTreeItem(dragData,dropData)
            },
            dragEnd(ev){
                $(ev.currentTarget).css('color','');
            },
            selectTreeItem(dragData,dropData){           
                this.$emit("selectTreeItem",dragData,dropData);
                return;
            }
        },
        template:`
            <ul>
                <li v-for="item of data">
                    <div class="tree-title" :style="[stylePadding]">
                        <span v-if="dragState"><strong class="shengl" draggable="true" @dragstart='drag($event,item)' @drop="drop($event,item)" @dragover="allowDrop($event)"  @dragend="dragEnd">{{item.title}}</strong> <i class="iconfont icon-back ico"></i></span>
                        <span v-else><strong class="shengl">{{item.title}}</strong> <i class="iconfont icon-back ico"></i></span>
                    </div>
                    <!--如果循环的item有children属性，那么生成下一级-->
                    <m-tree-list 
                        :increment="count"
                        v-if='item.children' 
                        :data="item.children"
                        @selectTreeItem="selectTreeItem"
                        :dragState="dragState"
                    ></m-tree-list>
                </li>
            </ul>
        `
    })
    /*****************************************/
    export default{
        name:'tree',
        props:{
            data:{
                type:Array,
                default:[]
            },
            dragState:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
            }
        },
        methods:{
            selectTreeItem(dragData,dropData){
                this.$emit("selectTreeItem",dragData,dropData);
            }
        },
        mounted(){

        }
    }
</script>
<!--scoped-->
<style lang="scss" >
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .tree-menu {
        background:#fff;
        height: 100%;
        padding-left: 25px;
        ul{
            li{
                padding-left: 0 !important;
            }
        }
    }
    
    .tree-menu-comm span {
        display: block;
        font-size: 12px;
        position: relative;
    }
    
    .tree-contro .ico {
        background-position: 3px -92px;
    }
    
    .tree-title .ico {
        position: absolute;
        left: -30px;
        top: 0;
        opacity: 0.8;
        transform: rotate(180deg);
        line-height: 35px;
        font-size: 12px !important;
        color: #797979;
    }
    
    .tree-menu-comm span strong {
        display: block;
        width: 100%;
        position: relative;
        line-height: 35px;
        // padding: 2px 0;
        // padding-left: 5px;
        color: #797979;        
        font-weight: normal !important;
    }
    
    .tree-nav {
        background: #e7f2fe;
        border: 1px solid #bfdaf4;
        padding-left: 14px;
        margin-left: 0px;
    }
    
    
    /*无箭头*/
    
    .tree-contro-none .ico {
        background-position: -999px -99px;
    }
    /*箭头朝下*/
    
    .tree-contro .ico {
        background-position: 3px -92px;
    }
</style>

