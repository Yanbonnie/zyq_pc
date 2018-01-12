exports.install = function (Vue, options) { 
    let localHost = window.location.host;
    let apiPath = '';

    if(localHost == 'localhost:8086' || localHost == '192.168.22.212:8086') { //本地环境
        apiPath = "/api/";  
    }else {
        apiPath = "/";                  //生产环境 
    }

    Vue.prototype.apiPath = apiPath;

    /**get请求 */
    Vue.prototype.httpGet=function(url,data,sucFn,errFn){
        this.$http.get(apiPath+url+"?data="+new Date().getTime(),
            {
                params:data,
                headers: {'X-Requested-With':'XMLHttpRequest'}
            }).then((json)=>{
                let data = json.data;
                sucFn(data)
            }).catch((err)=>{
                if(errFn){
                    errFn(err)
                }else{
                    console.log(err)
                }
            })
    };

    /**post请求 */
    Vue.prototype.httpPost=function(url,data,sucFn,errFn){
        this.$http({
            method:"POST",
            url:apiPath + url,
            data:data,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        }).then((json)=>{
            let data = json.data;
            sucFn(data)
        }).catch((err)=>{
            if(errFn){
                errFn(err)
            }else{
                console.log(err)
            }
        })
    };
    /*ajaxPost请求 */
    Vue.prototype.ajaxPost = function(url,data,sucFn,errFn){
        $.ajax({
            type: "POST",
            url: apiPath + url,
            data: data,
        }).done((json) => {
            sucFn(json)
        }).fail((err) => {
            if(errFn){
                errFn(err)
            }else{
                console.log(err)
            }
        });;
    }
    
    /*公共模态框*/
    Vue.prototype.modelCommonTip=function(msg,time,topClass){
        let Time = arguments[1] || 1500;
        let CLASS = arguments[2] || '';
        if(msg == "param.error"){
            msg = "提交的参数错误，无法进行操作";
        }
        this.$store.dispatch('changeModel',{
            state:true,
            context:msg,
            topClass:CLASS
        })
        setTimeout(()=>{
            this.$store.dispatch('changeModel',{
                state:false,
                context:'',
                topClass:''
            })
        },Time)
    }
    
    /* 判断当前用户登录信息是否已过期 */
    Vue.prototype.getLoginData=function(store){
        let That = Vue;
         Vue.prototype.httpGet('cus/account/getCurAccount',{},(json)=>{
            if(json.meta.success){  //已登录，不需要操作
                store.dispatch('saveCurAccount',json.data)
            }else{   //未登录
                Vue.prototype.httpGet('logoutWithoutPage',{},(response)=>{});
                setTimeout(function(){
                    window.location.href="/login"
                },300)
                
            }
         })
     }

    /* 数组包含对象去重 */
    Vue.prototype.unique3 = function(arr,field) {   //field  以对象中的什么字段去重
        var hash = {};
        arr = arr.reduce(function(item, next) {
            hash[next[field]] ? '' : hash[next[field]] = true && item.push(next);
            return item
        }, [])
        return arr;
    }
    /*数组不包含对象去重*/
    Vue.prototype.unique1 = function(arr){
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
            }
        }
        return res;
    }
    /*
    * 获取当前时间和一个月
    */
    Vue.prototype.getDataFn = function(n){ //n为1表示一周，为30表示一个月
        var nowdate = new Date();
        var Y = nowdate.getFullYear();
        var M = (nowdate.getMonth()+1) < 10 ? "0"+ (nowdate.getMonth()+1) : (nowdate.getMonth()+1);
        var D = nowdate.getDate();
        var currentdate = Y+'-'+M+'-'+D;
            
        nowdate.setDate(nowdate.getDate() - n);
        var y = nowdate.getFullYear();
        var m = (nowdate.getMonth()+1) < 10 ? "0"+ (nowdate.getMonth()+1) : (nowdate.getMonth()+1);
        var d = nowdate.getDate();
        var formatwdate = y+'-'+m+'-'+d;        
        return {
            "formatwdate":formatwdate,
            "currentdate":currentdate
        }
    }

    /*获取url的参数值 */
    Vue.prototype.getUrlPara= function(str,_url){
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
        var hrefIndex = window.location.href.indexOf('?');
        //var search = _url ? _url.split('?')[1] : window.location.search.substr(1);
        var search = _url ? _url.split('?')[1] :  window.location.href.substr(hrefIndex+1);
        var par = search.match(reg);
        var str = par ? decodeURIComponent(par[2]) : '';
        return str;
    }
}
