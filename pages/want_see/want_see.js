// pages/want_see/want_see.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    Ips: 'http://127.0.0.1:5000',
    Ip: 'http://127.0.0.1:3333',
    // Ips: 'http://192.168.0.100:5000',
    // Ip: 'http://192.168.0.100:3333',
    arr:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: this.data.Ip + '/user/find', //仅为示例，并非真实的接口地址
      data: {
        submitType: 'findJoin',
        ref: ['movies', '']
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {
        console.log(res.data)
   
        this.setData({
          arr: res.data,
        })
      })
    })
  
  },
  // 点击跳转到电影详情
  indexTap(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../movies_details/movies_details?id=' + id,
    })
  },
  // 点击图片跳转到相关视频
  indexclickimg(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../video/video?id=' + id,
    })
  },

 
})