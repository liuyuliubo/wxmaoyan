
Page({
  data: {
    navbar: [],
    currentTab: 0,
    // IPS: 'http://192.168.43.151:5000',
    // IP: 'http://192.168.43.151:3333',
    // IPs: 'http://172.20.10.14:5000',
    // IP: 'http://172.20.10.14:3333',
    // IPS: 'http://127.0.0.1:5000',
    // IP: 'http://127.0.0.1:3333',
    IPS: 'http://192.168.0.100:5000',
    IP: 'http://192.168.0.100:3333',
    allcinema: [],//上映电影的影厅

    aas: []
  },
  onLoad: function (options) {
    console.log(options.id);
    console.log(options.id);
    console.log(options.id);
    // 获取活了的时间
    function getDates(days, todate = getCurrentMonthFirst()) {//todate默认参数是当前日期，可以传入对应时间
      var dateArry = [];
      for (var i = 0; i < days; i++) {
        var dateObj = dateLater(todate, i);
        dateArry.push(dateObj)
      }
      return dateArry;
    }
    function dateLater(dates, later) {
      let dateObj = {};
      let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
      let date = new Date(dates);
      date.setDate(date.getDate() + later);
      let day = date.getDay();
      dateObj.year = date.getFullYear();
      dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
      dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      dateObj.week = show_day[day];
      return dateObj;
    }
    function getCurrentMonthFirst() {
      var date = new Date();
      var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      return todate;
    }
    this.setData({
      navbar: getDates(7)
    })
  



    // 请求有此电影上映的影院
    var arrcinema = []
    wx.request({
      url: this.data.IP + '/macth_manager/find',
      data: {
      },
      success: (res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].movies[0] == options.id) {
            wx.request({
              url: this.data.IP + '/macth_manager/find',
              data: {
                _id: res.data[i]._id,
                submitType: "findJoin",
                ref: ["cinema", '']
              },
              success: (res) => {
                console.log(res.data)
                arrcinema.push(res.data)
              }
            })
          }
        }


        // 初始页面，将当天日期传入
        var teparr = []
        setTimeout(() => {
          for (let j = 0; j < arrcinema.length; j++) {
            if (arrcinema[j].dataOf == getDates(1)[0].year + "-" + getDates(1)[0].month + "-" + getDates(1)[0].day) {
              teparr.push(arrcinema[j])
            }
          }
          this.setData({
            allcinema: teparr
          })
          this.setData({
            aas: arrcinema
          })
          console.log(arrcinema)
        }, 1000)





      }
    })




  },



  // 根据对应的事件显示影厅
  navbarTap: function (e) {
    var tarr = []
    console.log(this.data.aas)
    for (let j = 0; j < this.data.aas.length; j++) {
      if (this.data.aas[j].dateOf == e.currentTarget.dataset.date) {
        tarr.push(this.data.aas[j])
      }
    }
    // setTimeout(() => {
    this.setData({
      allcinema: tarr
    })
    console.log(this.data.allcinema)
    // }, 1000)




    this.setData({
      currentTab: e.currentTarget.dataset.index,
      num: e.currentTarget.dataset.index
    })
  },

  gomacth: function (event) {
    let id = event.currentTarget.dataset.id;
    let idd = event.currentTarget.dataset.idd;
    id[0].ids = idd
    // console.log(id)
    // console.log(idd)

    wx.navigateTo({
      url: '../conema_time/conema_time?id=' + JSON.stringify(id[0])
    })
  }

})