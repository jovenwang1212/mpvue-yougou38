const BASE_URL = 'https://www.uinav.com'

export default function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${options.url}`,
      data: options.data || {},
      method: options.method,
      success: res => {
        const {meta, message} = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {
          console.log(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
