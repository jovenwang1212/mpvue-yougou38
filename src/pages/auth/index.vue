<template>
  <div>
    <button @click="getAuth">请求权限</button>
    <button @click="openSetting">打开设置</button>
    <button @click="getRunAuth">微信步数</button>
    <button open-type="getUserInfo">用户信息</button>
  </div>
</template>

<script>
export default {

  methods: {
    getRunAuth () {
      wx.authorize({
        scope:
          'scope.werun',
        success: res => {},
        fail: () => {},
        complete: () => {}
      })
    },
    getAuth () {
      // wx.authorize({
      //   scope:
      //     'scope.address',
      //   success: res => {
      //     wx.chooseAddress({
      //       success: function (res) {
      //         console.log(res)
      //       }
      //     })
      //   },
      //   fail: () => {
      //     // console.log('fail')
      //     // wx.showToast({
      //     //   title: '请打开权限'
      //     // })
      //     wx.openSetting()
      //   },
      //   complete: () => { }
      // })
      wx.getSetting({ success: res => {
        console.log(res)
        if (res.authSetting['scope.address'] === false) {
          // 拒绝
          wx.openSetting()
        } else {
          // 第一次，要不就是允许
          wx.authorize({
            scope:
              'scope.address',
            success: res => {
              wx.chooseAddress({
                success: function (res) {
                  console.log(res)
                }
              })
            },
            fail: () => {},
            complete: () => {}
          })
        }
      } })
    },
    openSetting () {
      wx.openSetting()
    }
  }
}
</script>

<style>
</style>