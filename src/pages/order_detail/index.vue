<template>
  <div>
    <div class="order-status">订单未支付</div>
    <div>
      <button @click="doPay">立即支付</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderDetail: {}
    }
  },
  onLoad (options) {
    let orderNumber = options.orderNumber
    this.queryOrderDetail(orderNumber)
  },
  methods: {
    queryOrderDetail (orderNumber) {
      this.token = wx.getStorageSync('token')
      this.$request({
        url: `/api/public/v1/my/orders/chkOrder`,
        method: 'POST',
        header: {
          'Authorization': this.token
        },
        data: {
          order_number: orderNumber
        }
      }).then(data => {
        console.log(data)
        // this.orderDetail = data
      })
    },
    // TODO
    doPay () {

    }
  }
}
</script>

<style>
.order-status{
  text-align: center;
  margin-top:50rpx;
  margin-bottom:100rpx;
}
</style>