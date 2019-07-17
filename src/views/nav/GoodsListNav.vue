<template>
  <div>
    <div class="search-nav">
      <div class="search-nav-container">
        <ul>
          <li>全部商品分类</li>
          <li><router-link to="/">首页</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListNav'
};
</script>

<style lang="scss" scoped>
  @import "../../style/index";

.search-nav{
  width: 100%;
  height: 64px;
  border-bottom: 2px solid $color-primary;
}
.search-nav-container{
  width: 80%;
  min-width: 1000px;
  height: 64px;
  margin: 0px auto;
}
.search-nav-container-90{
  width: 90%;
}
.search-nav-container ul{
  margin: 0px;
  padding-left: 0px;
  list-style: none;
}
.search-nav-container li{
  cursor: pointer;
  margin-left: 30px;
  line-height: 64px;
  color: $color-primary;
  font-size: 18px;
  /*font-weight: bold;*/
  float: left;
}
.search-nav-container a{
  color: $color-primary;
  text-decoration: none;
}
.search-nav-container li:first-child{
  padding: 0px 38px;
  background:$color-primary;
  margin: 0px;
  color: #fff;
}
</style>
