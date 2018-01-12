// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
/*iview */
import { DatePicker  } from 'iview';
Vue.component('DatePicker', DatePicker );
import 'iview/dist/styles/iview.css';

/*CSS*/
import '@/assets/font/iconfont.css'
import '@/assets/css/common.scss'
import '@/assets/css/login.scss'
import '@/assets/css/style.scss'


/*JS*/
import url from '@/assets/js/URL.js'
Vue.prototype.URL = url

Vue.prototype.validateQb =  require('@/assets/js/validate.js').default;

import MyPlugin from './assets/js/common.js'
Vue.use(MyPlugin)

//模态框公共组件
import Model from './components/common/model/index.js';
Vue.use(Model)

//Table公共组件
import Table from './components/common/table/index.js';
Vue.use(Table)

//页码公共组件
import pagination from './components/common/pagination/index.js';
Vue.use(pagination)

//温馨提示公共组件
import alertModel from './components/common/alert/index.js';
Vue.use(alertModel)

//公共加载效果
import Loading from './components/common/loading/index.js';
Vue.use(Loading)

//树形菜单公共组件
import Tree from './components/common/tree/index.js';
Vue.use(Tree)

//授权树形菜单
import Dendrogram from './components/common/dendrogram/index.js';
Vue.use(Dendrogram)

import dragModel from './components/common/dragModel/index.js';
Vue.use(dragModel)

import '@/assets/js/plugin/jquery-1.12.2.min.js'
import '@/assets/js/plugin/jquery.form.js'
import '@/assets/js/plugin/bootstrap-datepicker.js'

/*时间戳转换北京时间*/
Vue.filter('filterdata', function (value,index,second) {//value为13位的时间戳  index为0的话是永久有效，为1的话是为空   second(是否包含时分秒)
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    if(value){
      var time = new Date(parseInt(value));
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      if(second){
        return y + '.' + add0(m) + '.' + add0(d)+ ' ' +add0(h)+':'+add0(mm)+':'+add0(s);
    }else{
        return y + '.' + add0(m) + '.' + add0(d)
    }
      
    }else{
      if(index == 0){
        return '永久有效';
      }else{
        return '';
      }
    }   
});

Vue.prototype.setSData=function(key, value){
  sessionStorage.setItem(key, JSON.stringify(value));
 };
 /*
  * 获取localStorage
  */
 Vue.prototype.getSData=function(key){
   return JSON.parse(sessionStorage.getItem(key));
 };
 /*
  * 清楚localStorage数据
  */
 Vue.prototype.removeSData=function(key){
   window.sessionStorage.removeItem(key);
 };


//路由跳转之前
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;  
    //二级导航添加active样式
    Vue.prototype.userType = to.meta.userType;
    /*控制登陆注册也页头页脚隐藏*/
    if(to.meta.step == 1){   //登录注册页忘记密码页
      store.dispatch('changeHeaderState',false)
    }else{
      store.dispatch('changeHeaderState',true)
      Vue.prototype.getLoginData(store);
    }
    /*控制签约页面不存在发起签约按钮 */
    if(to.name != 'ToFill'){
      store.dispatch('saveUpFile',null)
    }
    next();
})

Vue.config.productionTip = false
Vue.prototype.CUSTOMEVENT = new Vue()   //自定义事件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
