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
  onLoad (options) {
    this.orderNumber = options.orderNumber
  },
  methods: {
    toHome () {
      wx.switchTab({ url: '/pages/home/main' })
    },
    toOrderDetail () {
      wx.navigateTo({ url: '/pages/order_detail/main?orderNumber=' + this.orderNumber })
    }
  }
}
</script>
<style>
</style>