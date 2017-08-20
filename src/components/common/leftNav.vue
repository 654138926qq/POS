<template>
  <div class="left-nav">
    <ul>
      <li>
        <router-link to="/">
        <i class="icon iconfont icon-goumai"></i>
        <p>购买</p>
        </router-link>
      </li>
      
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <p>店铺</p>
      </li>
      <router-link to="/Goods">
        <li>
        <i class="icon iconfont icon-hanbao"></i>
        <p>商品</p>
      </li>
      </router-link>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <p>会员</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  a{
    text-decoration: none;
    color: #fff;
  }
  .left-nav{
    color: #fff;
    font-size: 12px;
    height: 100%;
    background-color: #1D8ce0;
    float: left;
    width: 5%;
  }
  .iconfont{
    font-size: 24px;
  }
   .left-nav ul{
     padding: 0;
     margin: 0;
   }
   .left-nav li{
     list-style: none;
     text-align: center;
     border-bottom: 1px solid #20a0ff;
     padding: 10px;
   }
</style>
<script>
export default{
  name: 'leftNav',
  data () {
    return {

    }
  }
}
</script>
