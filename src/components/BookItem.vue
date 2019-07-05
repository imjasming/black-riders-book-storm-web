<template>
  <div class="goods-show-info">
    <div class="goods-show-img">
      <router-link :to="'/goodsDetail?item=' + item.id"><img :src="item.img"/></router-link>
    </div>
    <div class="goods-show-price">
      <router-link :to="'/goodsDetail?item=' + item.id">
                  <span>
                    <Icon type="social-yen text-danger"></Icon>
                    <span class="seckill-price text-danger">{{item.price}}</span>
                  </span>
      </router-link>
    </div>
    <div class="goods-show-detail">
      <router-link :to="'/goodsDetail?item=' + item.id">
        <span>{{item.intro}}</span>
      </router-link>
    </div>
    <div class="goods-show-num">
      <router-link :to="'/goodsDetail?item=' + item.id">
        已有<span>{{item.remarks}}</span>人评价
      </router-link>
    </div>
    <div class="goods-show-seller">
      <router-link :to="'/goodsDetail?item=' + item.id">
        <span>{{item.shopName}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BookItem",
    props: {
      product: Object
    },
    data() {
      return {
        item: this.product
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/index";

  .text-danger {
    color: #A94442;
  }

  .seckill-price {
    margin-right: 5px;
    font-size: 25px;
    font-weight: bold;
  }

  .goods-show-info {
    width: 206px;
    padding: 10px;
    margin: 15px 0px;
    border: 1px solid #fff;
  }

  .goods-show-info:hover {
    border: 1px solid #ccc;
    box-shadow: 0px 0px 15px #ccc;
  }

  .goods-show-img {
    height: 186px;
    width: 186px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

      img {
        width: 100%;
    }
  }

  .goods-show-price {
    margin-top: 6px;
  }

  .goods-show-detail {
    font-size: 12px;
    margin: 6px 0px;

    span {
      color: $color-font-normal;
    }
  }

  .goods-show-num {
    font-size: 12px;
    margin-bottom: 6px;

    span {
      color: #009688;
    }
  }

  .goods-show-num span {
    color: #005AA0;
    font-weight: bold;
  }

  .goods-show-seller {
    font-size: 12px;

    span {
      color: #E4393C;
    }
  }
</style>
