var app = getApp()
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
    arr: [],   // 热映按分数排序数组
    daiy: [],  //待映按想看排序数组
    coming:[],  //待映没排序的数组
    navbar: ['热映', '待映'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad() {
    wx.request({
      url: this.data.Ip + '/hot_movie/find', //仅为示例，并非真实的接口地址
      data: {
        submitType: 'findJoin',
        ref: ['movies', '']
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {
        let temp1;
        // 分数
        let arrlist = [];
        // 分数
        for (let i = 0; i < res.data.length - 1; i++) {
          for (let j = i + 1; j < res.data.length; j++) {
            if (Number(res.data[i].movies[0].movie_soc) < Number(res.data[j].movies[0].movie_soc)) {
              temp1 = res.data[i];
              res.data[i] = res.data[j]
              res.data[j] = temp1;

            }
          }
        }

        arrlist = res.data
        this.setData({
          arr: arrlist
        })
      })

    })
      ,
      wx.request({
        url: this.data.Ip + '/comingmovie/find', //仅为示例，并非真实的接口地址
        data: {
          submitType: 'findJoin',
          ref: ['movies', '']
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: ((res) => {
          this.setData({
            coming: res.data
          })
          let temp;
          // 想看
          let att = [];
          for (let i = 0; i < res.data.length - 1; i++) {
            for (let j = i + 1; j < res.data.length; j++) {
              if (Number(res.data[i].movies[0].like) < Number(res.data[j].movies[0].like)) {
                temp = res.data[i];
                res.data[i] = res.data[j]
                res.data[j] = temp;

              }
            }
          }
          att = res.data;
          this.setData({
            daiy: att
         
          })
        })

      })
  },
  // 点击跳转到电影详情
  indexTap(event){
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../movies_details/movies_details?id=' + id,
    })
  },
  // 点击搜索框
  clicksearch(){
    wx.navigateTo({
      url: '../search/search'
    })

  },
  // 点击图片跳转到相关视频
  indexclickimg(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id)
    // console.log(id)
    wx.navigateTo({
      url: '../video/video?id=' + id,
    })
  },
  // 点击购票
  indexclickbut(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '../ticket/ticket?id=' + id,
    })

  },
    // 5b28ca72efbd8a0ac4a33996
  // clickcd(){
  //   console.log(app.globalData.userInfo)

  // }

})