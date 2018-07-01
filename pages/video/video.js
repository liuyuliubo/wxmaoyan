// pages/video/video.js
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
    listvideo:[],
    lmovie:[],
    isok:true,
    bindpause:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: this.data.Ip + '/movies/find', //仅为示例，并非真实的接口地址
      data: {
        _id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {

        // 头部显示对应的电影名
        wx.setNavigationBarTitle({
          title: res.data.movie_name
        })
        for (let i = 0; i < res.data.video.length; i++) {
          this.setData({
            listvideo: res.data,
            lmovie: res.data.video[0]

          })

          console.log(res.data.video[0])

        }



      })
    })    
   
  },
  //当点击播放时候图片消失
  // videoclick(){
  //   this.setData({
  //     isok:false
  //   })
  // },
  // 点击播放列表
  click_vdo(event) {
    var index=event.currentTarget.dataset.index;
    console.log(index)
    console.log(this.data.listvideo)
    this.setData({
      lmovie: this.data.listvideo.video[index]
    })
  },
    // 点击影院跳转放映时间
  clickbut(event){
    var id = event.currentTarget.dataset.id;
    console.log(id)
    console.log(id)
    this.setData({
      bindpause:false
    })
    wx.redirectTo({
      url: '../ticket/ticket?id=' + id,

    })

  }

  


})
