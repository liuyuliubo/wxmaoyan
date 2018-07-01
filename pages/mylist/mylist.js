// pages/mylist/mylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    Ips: 'http://127.0.0.1:5000',
    Ip: 'http://127.0.0.1:3333',
    // Ips: 'http://192.168.0.100:5000',
    // Ip: 'http://192.168.0.100:3333',
    movies:[]
  
  },


  onLoad: function (options) {

    wx.request({
      url: this.data.Ip + '/user/find',
      data: {
     
      },
      success: ((res) => {
        console.log(res.data[0].dingdan)
        this.setData({
          movies: res.data[0].dingdan
        })
      })
    })
  
  }

  
})