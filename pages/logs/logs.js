//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    // Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    // Ips: 'http://127.0.0.1:5000',
    // Ip: 'http://127.0.0.1:3333',
    Ips: 'http://192.168.0.100:5000',
    Ip: 'http://192.168.0.100:3333',
    cinema:[]

  },
  onLoad: function () {
    wx.request({
      url: this.data.Ip + '/cinema/find', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {
        console.log(res.data)
        this.setData({
          cinema: res.data,
        })
      })
    })

  },
  // 点击搜索跳转搜索栏
  clickcinma(){
    wx.navigateTo({
      url: '../search_conema/search_conema'
    })

  },
  // 点击影院跳转放映时间
  clickcinema(event){
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../conema_time/conema_time?id=' + JSON.stringify(id),
    })

  }
})
