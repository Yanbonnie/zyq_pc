<template>
   <section class="userCenter">
        <nav class="nav">
            <div class="userNav clf ">
                <ul class="box">
                    <li v-for="(item,index) in menuList" :key="index">
                        <router-link :to="item.path"  :class="[userType && userType == item.type ? 'router-link-active' : '']"><i class="iconfont" :class="item.icon"></i>{{item.name}}</router-link>
                    </li>
                    <!-- <li class="active">
                        <router-link to="/user/cert"><i class="iconfont icon-cert"></i>我的证书</router-link>
                    </li>
                    <li>
                        <router-link to="/user/seal"><i class="iconfont icon-com_sign"></i>我的签章</router-link>
                    </li>
                    <li>
                        <router-link to="/user/recored"><i class="iconfont icon-recored"></i>购买记录</router-link>
                    </li>
                    <li>
                        <router-link to="/user/contacts"><i class="iconfont icon-mycontact"></i>我的联系人</router-link>
                    </li> -->
                </ul>
            </div>
        </nav>
        <div class="userBody">
            <router-view></router-view>  
        </div>
    </section>
</template>
<script>
    export default{
        data(){
            return{
                menuList:[],
                type:null,
                menu:{
                    userPer:[
                        {
                            name:"我的账户",
                            path:"/user/account",
                            icon:"icon-account",
                            type:101
                        },
                        {
                            name:"我的证书",
                            path:"/user/cert",
                            icon:"icon-cert",
                            type:102
                        },
                        {
                            name:"我的签章",
                            path:"/user/seal",
                            icon:"icon-com_sign",
                            type:103
                        },
                        {
                            name:"购买记录",
                            path:"/user/recored",
                            icon:"icon-recored",
                            type:105
                        },
                        {
                            name:"我的联系人",
                            path:"/user/contacts",
                            icon:"icon-mycontact",
                            type:106
                        },                        
                    ],
                    userCom:[
                        {
                            name:"企业账户",
                            path:"/user/account",
                            icon:"icon-account",
                            type:101
                        },
                        {
                            name:"企业证书",
                            path:"/user/cert",
                            icon:"icon-cert",
                            type:102
                        },
                        {
                            name:"企业签章",
                            path:"/user/comseal",
                            icon:"icon-com_sign",
                            type:103
                        },
                        {
                            name:"授权代表人",
                            path:"/user/authorize",
                            icon:"icon-warrant",
                            type:104
                        },
                        {
                            name:"购买记录",
                            path:"/user/recored",
                            icon:"icon-recored",
                            type:105
                        },
                        {
                            name:"联系人",
                            path:"/user/contacts",
                            icon:"icon-mycontact",
                            type:106
                        }
                    ]
                }
            }
        },
        computed:{
            userState(){
                return this.$store.state.userState;
            }
        },
        methods:{

        },
        mounted(){
            if(this.userState ==  1){
                this.menuList = this.menu.userPer;
            }else{
                this.menuList = this.menu.userCom;
            }
            
        },
    }
</script>
