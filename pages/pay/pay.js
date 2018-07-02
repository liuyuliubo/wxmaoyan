// pages/pay/pay.js
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
    tingmes:[],  //获取传过来的所有数据
    movies:[],
    chair:[],
    id:[]

    
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.arr)[0][0].movies[0])
    // console.log(JSON.parse(options.arr)[1])
    // console.log(JSON.parse(options.arr)[3])
    // // console.log(JSON.parse(options.arr)[2].length)
    // console.log(JSON.parse(options.arr))
    this.setData({
      tingmes: JSON.parse(options.arr),
      chair: JSON.parse(options.arr)[2],
      id: JSON.parse(options.arr)[3]
    })
    wx.request({
      url: this.data.Ip + '/movies/find',
      data: {
        _id: JSON.parse(options.arr)[0][0].movies[0],
      },
      success: ((res) => {
        this.setData({
          movies:res.data
        })
      })
    })
  },
  // 点击确认支付
  clickbut(){

    // 完成订单
    wx.request({
      url: this.data.Ip + '/user/find',
      data: {
      },
      success: (res) => {
        wx.request({
          url: this.data.Ip + '/user/update',
          data: {
            _id: res.data[0]._id,
            dingdan: JSON.stringify(this.data.movies),
            isPush: true
          },
          success: (res) => {
            console.log(res.data)
            console.log('加入订单完成')
          }
        })
      }


    })

    console.log(this.data.chair)
    for (let i = 0; i < this.data.chair.length; i++) {
      for (let j = 0; j < this.data.chair[i].length; j++) {
        if (this.data.chair[i][j] == '2') {
          this.data.chair[i][j]='3'
  
        }

      }

    }
    console.log(54545)
    wx.request({
      url: this.data.Ip + '/cinema_chair/update',
      data: {
        _id: this.data.id,
        chair: JSON.stringify(this.data.chair),
      },
      success: ((res) => {
        this.setData({
          chair: res.data
        })

        wx.showToast({
          title: '购票成功',
          icon: 'success',
          duration: 2000
        })

      })

    })

  }
  



})