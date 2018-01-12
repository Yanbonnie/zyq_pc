import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hello = resolve => require(['@/components/Hello'], resolve)                              //demo
const Noallow = resolve => require(['@/components/noallow'], resolve)                          //404页面

//首页
const IndexCom = resolve => require(['@/components/page/index/index'], resolve)                          //首页

//文档管理
const ManaFile = resolve => require(['@/components/page/file/mana_file'], resolve)                       //文档管理
const Detail = resolve => require(['@/components/page/file/detail'], resolve)                            //文档详情
const ToFill = resolve => require(['@/components/page/file/toFill'], resolve)                            //发起签约
const Sign = resolve => require(['@/components/page/file/Sign'], resolve)                                //签署页面


//个人中心
const UserIndex = resolve => require(['@/components/page/userCenter/userIndex'], resolve)                          //个人中心首页
const Account = resolve => require(['@/components/page/userCenter/account'], resolve)                              //我的账号
const Cert = resolve => require(['@/components/page/userCenter/cert'], resolve)                                    //我的证书
const Seal = resolve => require(['@/components/page/userCenter/seal'], resolve)                                    //个人签名
const ComSeal = resolve => require(['@/components/page/userCenter/com_seal'], resolve)                             //企业签章
const AddSeal = resolve => require(['@/components/page/userCenter/addSeal'], resolve)                              //企业添加签章
const Authorize = resolve => require(['@/components/page/userCenter/authorize'], resolve)                          //授权代表人
const Recored = resolve => require(['@/components/page/userCenter/buyRecored'], resolve)                           //购买记录
const Contacts = resolve => require(['@/components/page/userCenter/contacts'], resolve)                            //我的联系人
const NearContacts = resolve => require(['@/components/page/userCenter/nearContacts'], resolve)                            //最近联系人

//消息中心
const News = resolve => require(['@/components/page/news/news'], resolve)                                          //消息中心

//购买套餐
const Package = resolve => require(['@/components/page/package/package'], resolve)                                 //消息中心

//登录注册
const Login = resolve => require(['@/components/page/login/login'], resolve)                                       //登录页
const Register = resolve => require(['@/components/page/login/register'], resolve)                                 //注册页
const Forget = resolve => require(['@/components/page/login/forget'], resolve)                                     //忘记密码
const ForgetStep1 = resolve => require(['@/components/page/login/forgetStep1'], resolve)                           //忘记密码-1
const ForgetStep2 = resolve => require(['@/components/page/login/forgetStep2'], resolve)                           //忘记密码-2
const ForgetStep3 = resolve => require(['@/components/page/login/forgetStep3'], resolve)                           //忘记密码-3
const ForgetStep4 = resolve => require(['@/components/page/login/forgetStep4'], resolve)                           //忘记密码-4  成功


//const sign_state = r => require.ensure([], () => r(require('@/components/sign_state')), 'sign_state')

export default new Router({  
  // mode: 'history',
  routes: [
    /*第一部分*/
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        step:1
      }
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta:{
        step:1
      }
    },
    {
      path:'/forget',
      name:'Forget',
      component:Forget,
      meta:{
        step:1
      },
      children:[
        {
          path:'step1',
          name:'ForgetStep1',
          component:ForgetStep1,
          meta:{
            step:1
          }
        },
        {
          path:'step2',
          name:'ForgetStep2',
          component:ForgetStep2,
          meta:{
            step:1
          }
        },
        {
          path:'step3',
          name:'ForgetStep3',
          component:ForgetStep3,
          meta:{
            step:1
          }
        },
        {
          path:'success',
          name:'ForgetStep4',
          component:ForgetStep4,
          meta:{
            step:1
          }
        }
      ]
    },
    /**********************************第二部分*****************************/
    {
      path:'/index',        //首页
      name:'Index',
      component:IndexCom
    },
    {
      path:'/manafile',        //文档管理
      name:'ManaFile',
      component:ManaFile,      
    },
    {
      path:'/detail/:docId',        //文档详情
      name:'Detail',
      component:Detail,
      meta:{
        type:201
      }
    },
    {
      path:'/tofill',        //发起签约
      name:'ToFill',
      component:ToFill
    },
    {
      path:'/sign/:docId',        //签约
      name:'Sign',
      component:Sign
    },
    {
      path:'/user',
      name:'UserIndex',
      component:UserIndex,
      children:[
        {
          path:'account',    //我的账户
          name:'Account',
          component:Account,
          meta:{
            type:301,
            userType:101
          }
        },
        {
          path:'cert',       //我的证书
          name:'Cert',
          component:Cert,
          meta:{
            type:301,
            userType:102
          }
        },
        {
          path:'seal',       //个人签名
          name:'Seal',
          component:Seal,
          meta:{
            type:301,
            userType:103
          }
        },
        {
          path:'comseal',       //企业签章
          name:'ComSeal',
          component:ComSeal,
          meta:{
            type:301,
            userType:103
          }
        }, 
        {
          path:'addseal',       //添加签章
          name:'AddSeal',
          component:AddSeal,
          meta:{
            type:301,
            userType:103
          }
        },       
        {
          path:'authorize',       //授权代表人签章
          name:'Authorize',
          component:Authorize,
          meta:{
            type:301,
            userType:104
          }
        },
        {
          path:'recored',       //我的购买记录
          name:'Recored',
          component:Recored,
          meta:{
            type:301,
            userType:105
          }
        },
        {
          path:'contacts',       //我的联系人
          name:'Contacts',
          component:Contacts,
          meta:{
            type:301,
            userType:106
          }
        },
        {
          path:'nearcontacts',       //最近联系人
          name:'NearContacts',
          component:NearContacts,
          meta:{
            type:301,
            userType:106
          }
        }
      ]
    },
    {
      path:'/news',             //消息中心
      name:'News',
      component:News
    },
    {
      path:'/Package',             //购买套餐
      name:'Package',
      component:Package
    },
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/404',
      component:Noallow
    },
    {
      path:'*',
      redirect:'/404'
    }
  ]
})
