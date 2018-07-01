// pages/seat/seat.js
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
    tingmes: [],//厅的信息header
    chair: [], //座位的信息

    isShowmes: true,// 推荐座位默认显示的  
    isShow: false,// 已选座位选座位后下面的信息会有响应的改变
    changedchair: [],//用户已选座位，显示具体位置到下方
    id:[]
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.chair)[0].cinema_ting)
    // console.log(JSON.parse(options.chair)[0].cinema_ting)
    // console.log(JSON.parse(options.chair)[0].cinema_ting)
    this.setData({
      tingmes: JSON.parse(options.chair)
    })



    wx.request({
      url: this.data.Ip + '/cinema_ting/find',
      data: {
        _id: JSON.parse(options.chair)[0].cinema_ting[0]._id,
        submitType: "findJoin",
        ref: ["cinema_chair", '']
      },
      success: ((res) => {
        this.setData({
          chair: res.data.cinema_chair[0].chair,
          id: res.data.cinema_chair[0]._id

        })
        console.log(res.data.cinema_chair[0]._id)
        console.log(res.data.cinema_chair[0]._id)
        console.log(res.data.cinema_chair[0]._id)
        console.log(res.data.cinema_chair[0].chair)

      })

    })
    // 头部显示对应的电影名
    // wx.setNavigationBarTitle({
    //   title: res.data.movie_name
    // })

  },
  // 点击座位
  changimg(event) {
    let isOK = true
    let ispush = true
    let page = event.currentTarget.dataset.page  //行
    let row = event.currentTarget.dataset.row     //列
    let item = event.currentTarget.dataset.item    //状态码
    if (item == 2) {
      this.data.chair[page][row] = '1'
      this.setData({
        chair: this.data.chair
      })
      console.log(this.data.chair)

    } else {
      this.data.chair[page][row] = '2'
      this.setData({
        chair: this.data.chair
      })

    }
    for (let i = 0; i < this.data.chair.length; i++) {
      for (let j = 0; j < this.data.chair[i].length; j++) {
        if (this.data.chair[i][j] == 2) {
          this.setData({
            isShow: true,
            isShowmes: false
          })
          isOK = false

        }

      }

    }
    // 当没有已选座位就改为默认状态推荐座位
    if (isOK) {
      this.setData({
        isShow: false,
        isShowmes: true
      })
    }
    // 渲染已选座位
    for (let k = 0; k < this.data.changedchair.length; k++) {
      if (this.data.changedchair[k].index == (page + "+" + row)) {
        this.data.changedchair.splice(k, 1)
        this.setData({
          changedchair: this.data.changedchair
        })
        console.log(this.data.changedchair)
        ispush = false
      }
    }
    if (ispush) {
      this.data.changedchair.push({ page: page + "排", row: row + '座', index: page + "+" + row, page1: page, row1: row })
      this.setData({
        changedchair: this.data.changedchair
      })
    }
    // p判断当长度超过5就不可点击
    if (this.data.changedchair.length==5){
     this.setData({
      //  isdown: false
     })

    }

  },
  // 点击选中的座位，剔除
  clear_btn(e) {
    let clo1 = e.currentTarget.dataset.page
    let row1 = e.currentTarget.dataset.row
    let indexs = e.currentTarget.dataset.index
    for (let z = 0; z < this.data.changedchair.length; z++) {
      if (this.data.changedchair[z].index == indexs) {
        this.data.changedchair.splice(z, 1)
        this.setData({
          changedchair: this.data.changedchair
        })
      }
    }
    // 改变座位状态
    this.data.chair[clo1][row1] = "1"
    this.setData({
      chair: this.data.chair
    })
    // 当没有已选座位时候恢复初始状态
    if (this.data.changedchair.length == 0) {
      this.setData({
        isShow: false,
        isShowmes: true
      })
    }

  },
  // 点击确认支付跳转页面
  click_confirm(event){
    // tingmes: [],//厅的信息header
    //   chair: [], //座位的信息
    // var id = event.currentTarget.dataset.id
    // arr.push(event.currentTarget.dataset.chair)
    // arr.push(this.data.id)
    let arr=[];
    arr.push(this.data.tingmes)
    arr.push(this.data.changedchair)
    arr.push(this.data.chair)
    arr.push(this.data.id)
    console.log(arr)


    wx.navigateTo({
      url: '../pay/pay?arr=' + JSON.stringify(arr)
    })


  }


})