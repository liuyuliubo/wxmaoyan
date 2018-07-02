var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    // Ips: 'http://127.0.0.1:5000',
    // Ip: 'http://127.0.0.1:3333',
    Ips: 'http://192.168.0.100:5000',
    Ip: 'http://192.168.0.100:3333',
    hot_movies: [],
    lmovie: [],   //视频

    isok: true,
    isdown: false,
    isok1: true,
    isdown1: false,
    isok2: true,
    isdown2: false,
    movid: []


  },

  onLoad: function (options) {
    // 当前页面导航显示的文字
    // wx.setNavigationBarTitle({
    //   title: '当前页面'
    // })
    // 震动效果
    wx.vibrateLong({
      success: ((res) => {
        console.log(8888888888888888888888888888888888888888)
      })

    })
    var id = options.id
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
        for (let item of res.data) {
          if (item.movies[0]._id == id) {
            this.setData({
              movid: id,
              hot_movies: item.movies,
            })
          }
        }

      })
    })
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
        for (let item of res.data) {

          if (item.movies[0]._id == id) {
            this.setData({
              hot_movies: item.movies,
            })

          }
        }

      })
    })
    // 视频
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
            lmovie: res.data.video[0]
          })
          console.log(res.data.video[0])

        }
      })
    })
    // 渲染想看电影初始状态为红心心
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
        for (let i = 0; i < res.data[0].movies.length; i++) {
          if (options.id == res.data[0].movies[i]._id) {
            this.setData({
              isok2: false,
              isdown2: true
            })

          }
        }

      })
    })
  },
  // 电影简介的点击事件
  upinfo() {
    if (this.data.isok) {
      this.setData({
        isok: false,
        isdown: true
      })

    } else {
      this.setData({
        isok: true,
        isdown: false
      })

    }

  },
  // 电影里点击想看
  clickbut: function (event) {

    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login'
      })



    } else {
      let ispase = true
      if (this.data.isdown2 == false) {
        console.log(1111)
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
            for (let i = 0; i < res.data.length; i++) {
              // console.log(res.data[i]._id)
              console.log(event.currentTarget.dataset.id)
              if (res.data[i]._id == event.currentTarget.dataset.id) {
                ispase = false
              }
              if (ispase) {
                wx.request({
                  url: this.data.Ip + '/user/update', //仅为示例，并非真实的接口地址
                  data: {
                    _id: res.data[0]._id,
                    movies: event.currentTarget.dataset.id,
                    isPush: true
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: ((res) => {
                    wx.showToast({
                      title: '点赞成功',
                      icon: 'success',
                      duration: 2000
                    })



                  })
                })

              }

            }



          })
        })
        this.setData({
          isok2: false,
          isdown2: true
        })

      }
      else {
        wx.request({
          url: this.data.Ip + '/user/find', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {},
          success: ((res) => {
            console.log(res.data)
            for (let i = 0; i < res.data[0].movies.length; i++) {
              if (event.currentTarget.dataset.id == res.data[0].movies[i]) {
                res.data[0].movies.splice(i, 1)
                ispase = true
              }
            }
            if (ispase) {
              wx.request({
                url: this.data.Ip + '/user/update', //仅为示例，并非真实的接口地址
                data: {
                  _id: res.data[0]._id,
                  movies: res.data[0].movies
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: ((res) => {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                  })
                })
              })
            }
          })
        })

        this.setData({
          isok2: true,
          isdown2: false
        })

      }
    }
  },
  // 电影里点击评分
  clickbut1: function () {
    console.log(23333333333)
    if (this.data.isdown1 == false) {
      this.setData({
        isok1: false,
        isdown1: true
      })

    } else {
      this.setData({
        isok1: true,
        isdown1: false
      })

    }

  },
  // 点击图片出现弹框
  clickimg(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.showModal({
      title: id.name,
      content: id.EnName + id.position,
      showCancel: false,
      confirmText: ""

    })
  },
  clickimg1(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.showModal({
      title: id.name,
      content: id.EnName + id.position + "饰：" + id.portray,
      showCancel: false,
      confirmText: ""

    })
  },
  // 点击剧照进行图片全屏放大
  biggerImg(event) {
    console.log(5555555555555)
    var imgList = event.currentTarget.dataset.list;//获取data-list
    wx.previewImage({
      urls: [imgList]
    })
  },
  // 点击播放视频跳转到视频预告片界面
  click_videoimg(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../video/video?id=' + id,
    })

  },
  videoclick(event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../video/video?id=' + id,
    })

  },
  clickbutyouhui(event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../ticket/ticket?id=' + id,
    })

  }

})