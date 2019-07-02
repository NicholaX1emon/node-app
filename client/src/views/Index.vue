<template>
  <div class="index_container">
    <div class="index_form">
      <h2>资金后台管理系统</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'index',
  components: {

  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}
.register_container{
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.regisger_form{
  width: 350px;
  height: 300px;
  position: absolute;
  top: 10%;
  left: 36%;
  text-align: center;
  padding: 22px;
}
.register_title{
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
</style>
