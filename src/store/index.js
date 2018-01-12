import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  headerShow:true,      //首页顶部导航栏是否显示
  curAccount:null,      //用户所有数据
  userState:0,          //用户状态 0-企业用户   1-个人用户
  model:{state:false,context:'',topClass:''},    //模态框默认数据
  upFile:null,          //上传文档文档流
  signFile:null,        //上传文档主题名称
  pdfFileName:null,     //上传文档名称
  
}

const Actions = {
    changeHeaderState({commit},bol){
      commit('changeHeaderState',bol)
    },
    saveCurAccount({commit},jsonData){
      commit('saveCurAccount',jsonData)
    },
    saveUserState({commit},num){
      commit('saveUserState',num)
    },
    changeModel({commit},jsonData){
      commit('changeModel',jsonData)
    },
    saveUpFile({commit},jsonData){  //文档流
      commit('saveUpFile',jsonData)
    },
    saveSignTitle({commit,str}){    //档主题名称
      commit('saveSignTitle',str)
    },
    savePdfFileName({commit},str){
      commit('savePdfFileName',str)
    }
  }
const Mutations = {
  changeHeaderState(state,bol){
    state.headerShow = bol;
  },
  saveCurAccount(state,jsonData){   //用户信息
    state.curAccount = jsonData;
  },
  saveUserState(state,num){
    state.userState = num;
  },
  changeModel(state,jsonData){      //改变公共模态框状态
    state.model = jsonData
  },
  saveUpFile(state,jsonData){
    state.upFile = jsonData;
  },
  saveSignTitle(state,str){
    state.signFile = str;
  },
  savePdfFileName(state,str){
    state.pdfFileName = str;
  }
}

const Getters = {
  changeHeaderState(state){
    return state.headerShow;
  },
  curAccount(state){
    return state.curAccount;
  },
  userState(state){
    return state.userState
  },
  model(state){
    return state.model
  },
  upFile(state){    
    return state.upFile;
  },
  signFile(state){
    return state.signFile;
  },
  pdfFileName(state){
    return state.pdfFileName;
  }
}

export default new Vuex.Store({
  state:state,
  actions:Actions,
  mutations:Mutations,
  getters:Getters
})
