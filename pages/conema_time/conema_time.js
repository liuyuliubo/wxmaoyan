// pages/conema_time/conema_time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['今天', '明天'],
    currentTab: 0,
    // Ips: 'http://192.168.43.151:5000',
    // Ip: 'http://192.168.43.151:3333',
    // Ips: 'http://172.20.10.14:5000',
    // Ip: 'http://172.20.10.14:3333',
    Ips: 'http://127.0.0.1:5000',
    Ip: 'http://127.0.0.1:3333',
    // Ips: 'http://192.168.0.100:5000',
    // Ip: 'http://192.168.0.100:3333',
    // 全部匹配
    listconema: [],
    // 对应id的电影院
    conema: [],


    tingarr: [],//下面的电影对应的影厅
    moviesarr: [],//所有要上映的电影（图）
    allcinema: [],//所有对应id的影院

    index: 0,//选中图片的下标
    id: [],
    current: '', //当前影片
    currentMovie: {},
    
  },
  /*滑块*/
  durationChange: function (e) {
    this.setData({
      current: e.detail.current,
      // currentMovie: this.data.moviesarr[e.detail.current]
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:JSON.parse(options.id)
    })
    // 对应电影院
    var arr = [];
    // 对应电影
    var moviesarr = [];
    // 对应影厅
    var tingarr = []
    var index = 0
    wx.request({
      url: this.data.Ip + '/macth_manager/find', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].cinema == JSON.parse(options.id)._id) {
            arr.push(res.data[i])
            // 影院要上映的电影
            wx.request({
              url: this.data.Ip + '/macth_manager/find',
              data: {
                _id: res.data[i]._id,
                submitType: "findJoin",
                ref: ["movies", ''],
              },
              success: (res1) => {
                moviesarr.push(res1.data)
              }


            })
            //影院上映电影的影厅
            wx.request({
              url: this.data.Ip + '/macth_manager/find',
              data: {
                _id: res.data[i]._id,
                submitType: "findJoin",
                ref: ["cinema_ting", '']
              },
              success: (res2) => {
                tingarr.push(res2.data)
              }
            })



          }


        }

        setTimeout(() => {
          // for (let i = 0; i < moviesarr.length; i++) {
          //   if (JSON.parse(options.id).ids == moviesarr[i].movies[0]._id) {
          //     inde = i
          //   }
          // }
          // console.log(inde)
          // this.setData({
          //   index: inde
          // })
          this.setData({
            moviesarr: moviesarr
          }),
            this.setData({
              tingarr: tingarr
            }),
            this.setData({
              allcinema: arr
            })
        }, 1000)

        this.setData({
          listconema: res.data
        })
      })

    })
    // 获取对应的电影院
    wx.request({
      url: this.data.Ip + '/cinema/find', //仅为示例，并非真实的接口地址
      data: {
        _id: JSON.parse(options.id)._id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: ((res) => {
        this.setData({
          conema: res.data
        })

      })

    })


  },
  //点击选中图片
  clickimg: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index,
      num: index
    })
  },
  // 点击购票
  gochair(event) {
    let arr = [];
    arr.push(event.currentTarget.dataset.chair)
    arr.push(this.data.id)
    console.log(arr)
    console.log(arr)
    console.log(arr)
    wx.navigateTo({
      url: '../seat/seat?chair=' + JSON.stringify(arr),
    })
  },



})