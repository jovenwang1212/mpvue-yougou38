<template>
  <div>
    <button @click="toHome">首页</button>
    <button v-if="orderNumber" @click="toOrderDetail">查看订单详情</button>
    <div>一些广告。。。</div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      orderNumber: ''
    }
  },
  onLoad () {
    this.orderNumber = this.$root.$mp.query.orderNumber
    wx.setNavigationBarTitle({ title: this.orderNumber ? '支付失败' : '支付成功' })
  },
  methods: {
    toHome () {
      wx.switchTab({ url: '/pages/home/main' })
    },
    toOrderDetail () {
      wx.navigateTo({ url: `/pages/order_detail/main?orderNumber=${this.orderNumber}` })
    }

  }
}
</script>

<style>
</style>