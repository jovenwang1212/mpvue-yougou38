<template>
  <div>
    <div class="order-status">待支付</div>
    <div>
      <button>立即支付</button>
    </div>
  </div>
</template>

<script>
export default {
  onLoad (options) {
    console.log(options.orderNumber)
    this.getOrderDetail(options.orderNumber)
  },
  methods: {
    getOrderDetail (orderNumber) {
      this.$request({
        url: '/api/public/v1/my/orders/chkOrder',
        method: 'POST',
        data: {
          order_number: orderNumber
        }
      }).then(res => {
        console.log(res)
      })
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