var app = getApp()
Page({
  data: {

  },
  // 点击拨打电话
  click_phone() {
    wx.makePhoneCall({
      phoneNumber: '1010-5335' //真实的电话号码
    })

  },
  // 点击想看的电影
  clicklook: function () {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../want_see/want_see'
      })
    }

  },
  // 我的订单
  click_list: function () {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login'
      })

    } else {
      wx.navigateTo({
        url: '../mylist/mylist'
      })
    }
 

  }

})