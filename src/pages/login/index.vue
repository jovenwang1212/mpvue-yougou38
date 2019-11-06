<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">点我登录</button>
  </div>
</template>

<script>
  export default{
    methods: {
      getUserInfo (res) {
        console.log(res)
        // eslint-disable-next-line no-unused-vars
        let detail = res.mp.detail
        console.log(detail)
        wx.login({
          success: res => {
            console.log(res)

            this.$request({
              url: '/api/public/v1/users/wxlogin',
              data: {
                code: res.code,
                encryptedData: detail.encryptedData,
                iv: detail.iv,
                rawData: detail.rawData,
                signature: detail.signature
              },
              method: 'POST'
            }).then(data => {
              console.log(data)
              wx.setStorageSync('token', data.token)
              // wx.setStorageSync('userinfo',res.)
              wx.navigateBack()
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>