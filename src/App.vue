<template>
  <div id="app">
		<!-- 身子文件 -->
		<keep-alive >
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  created(){
     this.getData();
  },
  methods:{
    //请求token地址
      //请求token地址
    getData() {
      this.$http.get("/token/getToken", {}).then(result => {
        // console.log(result)
        //将token存放到cookei
        this.setCookie("token", result.data.token, 7);
      });
      console.log(this.getCookie('token'))
    },
    //设置token
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    //获取token
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  }
}
</script>

<style>
	
	/deep/ .el-dialog {
	  overflow: hidden;
	  border-radius: 5px!important;
	  .el-dialog__header {
	    text-align: center!important;
	    background-color: #409eff!important;
	    .el-dialog__title,
	    .el-dialog__close {
	      color: #fff!important;
	    }
	  }
	}

.ml{
	margin-left: 20px!important;
}
.mr{
	margin-right: 20px!important;
}
.font-big{
	font-size: 18px;
	color: #303133;
}
.font{
	font-size: 14px!important;
	color: #606266!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #606266;
  margin-top: 30px;
	font-size: 14px;
}
.d-flex{
	display:flex;
	justify-content: left;
}
.d-spb{
	display: flex;
	justify-content: space-between;
}
.bold{
	font-weight: bold;
	font-size: 18px;
}
.mt{
	margin-top: 20px;
}
</style>
