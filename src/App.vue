<template>
  <div id="app">
    
    <headerComponent v-show="headerShow"></headerComponent>
    <router-view></router-view>  
    <footerComponent  v-show="headerShow"></footerComponent> 
    <Model v-show="model.state" :context="model.context" :topClass="model.topClass"></Model>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue';
import FOOTER from '@/components/footer.vue';
export default {
    name: 'app',
    data(){
  	    return{

  	    }
    },
    components:{
        headerComponent:HEADER,
        footerComponent:FOOTER
    },
    computed:{
        model(){
            return this.$store.state.model;
        },
        headerShow(){
            return this.$store.state.headerShow;
        }
    },
    methods:{
        showModel(){
            this.modelCommonTip('我是测试',2000,'topClass')
        }
    }
}
</script>
<style lang="scss" scoped>
</style>