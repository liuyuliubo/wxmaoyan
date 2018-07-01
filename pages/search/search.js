// pages/search/search.js
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
    inputTxt:'',
    cinema: [],
    listmovies: [],
    isok: false,
    isok1: false,
    up: false,
    upcinema: false,
  },
  /**
* 生命周期函数--监听页面加载
*/
  // 点击取消
  search_cancel() {
    this.setData({
      inputTxt: '',
    })
    wx.navigateBack({
      changed: true
    })
  },

  // 获得输入框里面的值
  bindKeyInput: function (e) {
    this.setData({
      inputTxt: e.detail.value
    })
  },
  clickblur(){
    // 相关影院
    if (this.data.inputTxt!=''){
      wx.request({
        url: this.data.Ip + '/cinema/find', //仅为示例，并非真实的接口地址
        data: {
          name: this.data.inputTxt
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: ((res) => {
          if (res.data.length == 0) {
            this.setData({
              isok: true,
              upcinema:false

            })

          } else {
            this.setData({
              isok: false,
              upcinema:true

            })

          }
          this.setData({
            cinema: res.data,
            cinemalength: res.data.length
          })
        })

      })
      wx.request({
        url: this.data.Ip + '/movies/find', //仅为示例，并非真实的接口地址
        data: {
          movie_name: this.data.inputTxt
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: ((res) => {
          if (res.data.length == 0) {
            this.setData({
              isok1: true,
              up:false
            })
          } else {
            this.setData({
              isok1: false,
              up:true

            })

          }
          this.setData({
            listmovies: res.data,

          })
        })

      })


    }
  

  },
   // 点击电影对应到电影详情
  indexTap(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../movies_details/movies_details?id=' + id,
    })
  },
    // 点击影院跳转放映时间
  clickcinema(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../conema_time/conema_time?id=' + JSON.stringify(id),
    })
  }








  

  

  
})