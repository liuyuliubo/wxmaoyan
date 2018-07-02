var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    // Ips: 'http://127.0.0.1:5000',
    // Ip: 'http://127.0.0.1:3333',
    Ips: 'http://192.168.0.100:5000',
    Ip: 'http://192.168.0.100:3333',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: this.data.Ip + '/user/find', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        app.globalData.userInfo = res.data[0].acc;
        // wx.navigateBack({changed: true})
      }

    })


  }


})