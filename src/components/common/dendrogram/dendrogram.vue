<template>
    <div class="tree" style="padding:20px 0 0">
        <!-- <div class="loadSource" v-show="treeLoading">
            <p><img src="../../../assets/images/loading.gif" alt="" width="80" height="51"></p>
        </div> -->
        <ul id="browser" class="treeview">
             <tree-list :treeListData="treeListData" @selectTreeHandle="selectTreeHandle"></tree-list>  
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
Vue.filter('filterIcon', function (value,length) { //过滤颁发机构
    let statusTxt = '';
    if(value){
        if(value.indexOf('icon-company') != '-1'){
            statusTxt = 'icon-man';
        }else if(value.indexOf('tree-folder-open') != '-1' && length == 0 ){
            statusTxt = 'folderNo';
        }else{
            statusTxt = 'folder';
        }
    }    
    return statusTxt;
});
import '@/assets/css/jquery.treeview.scss';
import { mapGetters } from 'vuex';
Vue.component('tree-list',{
    name:'treelist',
    data(){
        return{
            clickIndex:null,
            // treeId:null,
        }
    },
    methods:{
        selectTreeItem(ev,item){
            let target = ev.target;            
            $('#browser .item').find('span').removeClass();    
            $(target).addClass('active'); 
            this.$emit("selectTreeHandle",item);
        },
        //对外函数
        selectTreeHandle(item){
            this.$emit("selectTreeHandle",item);
        }
    },
    computed:{
        ...mapGetters([
        'userState'
        ])
    },
    props:{
        treeListData:{
            type:Array,
            default:[]
        },
    },
    template:`
        <div>
            <ul>
                <li v-for="(item,index) in treeListData" :key="index" :class="[(treeListData.length-1) === index ? 'lastCollapsable':'']">
                    <div class="item">
                        <span @click.stop="selectTreeItem($event,item)">{{item.title}}<b>12人</b></span>
                    </div> 
                    <tree-list :treeListData="item.children" @selectTreeHandle="selectTreeHandle"></tree-list>
                </li>
            </ul>
        </div>
    `
});
export default {
    name: 'tree',
    data(){
        return {
            hoverIndex:null,
            treeId:null,
        }
    },
    props:{
        treeListData:{
            type:Array,
            default:[]
        }
    },
    methods:{
        selectTreeHandle(item){
            this.$emit("selectTreeHandle",item);
        }
    },
    mounted(){  
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
