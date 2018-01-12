<template>
    <section class="dragBox" id="dragBox">
        <div class="dragTop " id="dragTop" >
            <slot name="dragTop">

            </slot>            
            <div class="line" id="line" ></div>
        </div>
        <div class="dragBottom sign_page_scroll" id="dragBottom">
            <slot name="dragBottom">

            </slot>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return{
            dragBoxH:null
        }
    },
    methods:{
        drag(obj,oDragTop,oDragBottom) {	
            let This = this;	
            obj.onmousedown = function(ev) {
                var ev = ev || event;
                
                // var disX = ev.clientX - this.offsetLeft;
                var disY = ev.clientY - this.offsetTop;
                var disD = ev.clientY;
                var Height = oDragTop.offsetHeight-1;
                
                
                if ( obj.setCapture ) {
                    obj.setCapture();
                }
                
                document.onmousemove = function(ev) {
                    var ev = ev || event;
                    
                    // obj.style.left = ev.clientX - disX + 'px';
                    // obj.style.top = ev.clientY - disY + 'px';
                    // console.log(ev.clientY)
                   
                    let topHeight = Height + (ev.clientY - disD);
                    if(topHeight <=  This.dragBoxH*0.1 ){
                        topHeight = This.dragBoxH*0.1
                    }
                    if(topHeight >=   This.dragBoxH*0.8){
                        topHeight = This.dragBoxH*0.8
                    }
                    let bottomHeight = This.dragBoxH - topHeight;
                    oDragTop.style.height = topHeight +'px';
                    oDragBottom.style.height = bottomHeight + 'px';
                }
                
                document.onmouseup = function() {
                    document.onmousemove = document.onmouseup = null;
                    //释放全局捕获 releaseCapture();
                    if ( obj.releaseCapture ) {
                        obj.releaseCapture();
                    }
                }
                
                return false;
                
            }
            
        }
    },
    mounted(){
        let oDiv = document.getElementById('line');
        this.dragBoxH = document.getElementById('dragBox').offsetHeight;
        let oDragTop = document.getElementById('dragTop');
        let oDragBottom = document.getElementById('dragBottom');
        this.drag(oDiv,oDragTop,oDragBottom)
    }
}
</script>
<style lang="scss" scoped>
.dragBox{
    width: 500px;
    height: 500px;
    border: 1px #edeef0 solid;
    // display: flex;
    // flex-direction:column;
    margin: 0 auto;
    .dragTop{
        // display: block;
        width: 100%;
        height: 400px;
        border-bottom: 1px #edeef0 solid;
        position: relative;
        // background:pink;
        overflow: hidden;
        .line{
            position: absolute;
            width: 100%;
            height: 5px;
            left: 0;
            bottom: 0;
            // background: red;
            z-index: 100;
            &:hover{
                cursor: s-resize;
            }
        }
        ul{
            height:100%;
            overflow: auto;
        }
    }
    .dragBottom{
        // display:flex;
		// flex-grow:1;
        width: 100%;
        overflow: auto;
        height: -webkit-calc(100% - 400px);
        height: -moz-calc(100% - 400px);
        height: calc(100% - 400px);
        // background: #ccc;
        h3{
            line-height: 50px;
            text-align: center;
            display: block;
        }
    }
}
.sign_page_scroll::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 0 #fff;
	border-radius: 0;
	background-color: #fff;
}
.sign_page_scroll::-webkit-scrollbar {
	width: 5px;
	background-color: #dedede;
}
.sign_page_scroll::-webkit-scrollbar-thumb {
	border-radius: 100px;
	-webkit-box-shadow: inset 0 0 5px #dedede;
	background-color: #dedede;
}
</style>