<template>
  <div id="app">
    <router-view></router-view>
    55444554
    <span>888888</span>
  </div>
</template>

<script>
export default {
  created () {
    console.log('process.env',process.env)
  }
}
</script>

<style lang="less" scoped>
#app{
  color: #000;
  font-size: 50px;
  span{
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
