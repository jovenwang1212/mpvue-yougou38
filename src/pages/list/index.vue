<template>
  <div>
    <!-- 头部 -->
    <div class="search">
      <icon
        type="search"
        size="18">
      </icon>
      <input type="text">
    </div>

    <!-- filter -->
    <ul class="nav">
      <li v-for="(item,index) in navArr" :key="item"
      @click="activeIndex=index" :class="{active:activeIndex===index}">{{item}}</li>
    </ul>
<!-- 商品列表 -->
    <ul class="goods-list">
      <li v-for="(item, index) in goodsList" :key="index">
        <img :src="item.goods_big_logo" :alt="item.goods_name">
        <div class="right">
          <p class="goods-name text-line2">{{item.goods_name}}</p>
          <p class="price">￥<span>{{item.goods_price}}</span>.00</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const PAGE_SIZE = 6
export default {
  data () {
    return {
      navArr: [
        '综合',
        '销量',
        '价格'
      ],
      activeIndex: 0,
      // 搜索关键字
      keyword: '',
      // 搜索结果列表
      goodsList: []
    }
  },
  onLoad (options) {
    console.log(options.keyword)
    this.keyword = options.keyword
    this.search()
  },
  methods: {
    // 根据关键字查询商品
    search () {
      this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keyword,
          pagesize: PAGE_SIZE,
          pagenum: 1
        }
      }).then(data => {
        console.log(data)
        this.goodsList = data.goods
      })
    }
  }

}
</script>

<style lang="less">
.search{
  height: 120rpx;
  padding:0 16rpx;
  background-color: #eee;
  display: flex;
  align-items: center;
  position: relative;
  icon{
    position: absolute;
    top:46rpx;
    left:46rpx;
  }
  input{
    height: 60rpx;
    background-color: #fff;
    border-radius: 8rpx;
    width: 100%;
    font-size:24rpx;
    padding-left:76rpx;
  }
}

.nav{
  display: flex;
  justify-content: space-around;
  height: 100rpx;
  align-items: center;
  border:1rpx solid #ddd;
  .active{
    color:#eb4450;
  }
}

.goods-list{
  li{
    height: 262rpx;
    border-bottom:1rpx solid #ddd;
    display: flex;
    align-items: center;
    padding:0 20rpx;
    img{
      width: 200rpx;
      height: 200rpx;
      margin-right:24rpx;
    }
    .right{
      flex:1;
      display: flex;
      flex-direction: column;

    }
    .goods-name{
      font-size: 16px;
    }
    .price{
      color:#eb4450;
      font-size: 12px;
      margin-top:54rpx;
      span{
        font-size: 24px;
      }
    }
  }
}
</style>