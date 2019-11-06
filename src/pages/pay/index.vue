<template>
  <div>
    <div class="address-wrapper">
      <div class="address"
           v-if="address.userName">
        <div class="receiver">
          <p class="name">收货人：{{address.userName}}</p>
          <p class="phone-num">{{address.telNumber}}</p>
          <span class="iconfont icon-arrow-right"></span>
        </div>
        <p class="address-txt">收货地址：{{fullAddress}}</p>
      </div>
      <!-- 选择地址 -->
      <div class="choose-address"
           v-else
           @click="getAddr">
        <p>请选择地址</p>
        <span class="iconfont icon-arrow-right"></span>
      </div>
      <div class="flower">
        <img src="/static/images/cart_border@2x.png">
      </div>
    </div>

    <!-- 商品列表 -->
    <ul class="goods-list">
      <block v-for="item in goodsList"
             :key="item.goods_id">
        <li class="goods-item"
            v-if="item.checked">
          <img :src="item.goods_small_logo"
               alt="">
          <div class="right">
            <p class="text-line2">{{item.goods_name}}</p>
            <div class="btm">
              <span class="price">￥<span>{{item.goods_price}}</span>.00</span>
              <div class="goods-num">
                <span>{{item.num}}</span>
              </div>
            </div>
          </div>
        </li>
      </block>
    </ul>

    <div class="bottom-fixed"
         @click="pay">
      微信支付({{totalPrice}}.00)
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address: wx.getStorageSync('address') || {},
      goodsList: []
    }
  },
  onLoad () {
    this.getGoodsList()
  },
  methods: {
    // 获取购物车商品数据
    getGoodsList () {
      let cart = wx.getStorageSync('cart')
      let ids = Object.keys(cart).join(',')
      this.$request({
        url: '/api/public/v1/goods/goodslist?goods_ids=' + ids
      }).then(data => {
        console.log(data)
        let goodsList = data
        goodsList.forEach(v => {
          v.num = cart[v.goods_id].num
          v.checked = cart[v.goods_id].checked
        })
        this.goodsList = goodsList
      })
    },
    getAddr () {
      wx.chooseAddress({
        success: (res) => {
          console.log(res)
          this.address = res
          wx.setStorageSync('address', res)
        }
      })
    },
    pay () {
      // 如果没有商品的话
      if (!this.totalPrice) {
        this.$showToast('请选择商品')
        return
      }

      if (!this.address.userName) {
        this.$showToast('请选择地址')
        return
      }
      this.createOrder()
    },
    createOrder () {
      let token = wx.getStorageSync('token')
      this.$request({
        url: '/api/public/v1/my/orders/create',
        method: 'POST',
        header: {
          'Authorization': token
        },
        data: {
          order_price: this.totalPrice,
          consignee_addr: this.fullAddress,
          goods: this.getCheckedGoods()
        }
      }).then(data => {
        console.log(data)
        this.doPay(token, data.order_number)
      }).finally(() => {
        // 不论成功或者失败，都从购物车里面清掉checked商品
        let cart = wx.getStorageSync('cart')
        for (let key in cart) {
          if (cart[key].checked) {
            delete cart[key]
          }
        }
        wx.setStorageSync('cart', cart)
      })
    },
    doPay (token, orderNumber) {
      this.$request({
        url: '/api/public/v1/my/orders/req_unifiedorder',
        method: 'POST',
        header: {
          'Authorization': token
        },
        data: {
          order_number: orderNumber
        }
      }).then(data => {
        console.log(data)
        wx.requestPayment({
          ...data.pay,
          success: res => {
            wx.navigateTo({ url: '/pages/order_result/main' })
          },
          fail: () => {
            wx.navigateTo({ url: `/pages/order_result/main?orderNumber=${orderNumber}` })
          },
          complete: () => {}
        })
      })
    },
    getCheckedGoods () {
      let list = []
      this.goodsList.forEach(v => {
        if (v.checked) {
          list.push({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price
          })
        }
      })
      return list
    }
  },
  computed: {
    fullAddress () {
      return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
    },
    totalPrice () {
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.goods_price * v.num : 0)
      }, 0)
    }
  }
}
</script>

<style lang="less">
.address-wrapper {
  background-color: #fff;
}

.address {
  display: flex;
  flex-direction: column;
  padding: 44rpx 30rpx 48rpx 20rpx;
  .receiver {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50rpx;
    position: relative;
    .phone-num {
      margin-right: 40rpx;
    }
    .icon-arrow-right {
      position: absolute;
      top: 8rpx;
      right: 0;
      color: #999;
    }
  }
}

.choose-address {
  display: flex;
  padding: 44rpx 30rpx 48rpx 20rpx;
  justify-content: space-between;
  .icon-arrow-right {
    color: #999;
  }
}

.flower {
  img {
    height: 16rpx;
    width: 100%;
    display: block;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  img {
    width: 160rpx;
    height: 160rpx;
    margin-left: 30rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 243rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.bottom-fixed {
  position: absolute;
  height: 98rpx;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1aad19;
  color: #fff;
  line-height: 98rpx;
  text-align: center;
}
</style>