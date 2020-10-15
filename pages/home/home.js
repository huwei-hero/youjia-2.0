var app = getApp();
Page({
  data: {
    username: wx.getStorageSync('name'),
    swiper_img: [
      "/images/logo.png",
    ],
    authorized: false,
    icon: [{
        id: 1,
        name: "request_leave",
        img: "/images/lease00.png",
        text: "请假管理"
      },
      {
        id: 2,
        name: "sign",
        img: "/images/daka01.png",
        text: "考勤打卡"
      },
      {
        id: 3,
        name: "shop",
        img: "/images/shop01.png",
        text: "理工商城"
      },
      {
        id: 4,
        name: "tree",
        img: "/images/tree.gif",
        text: "为爱表白"
      },
    ]
  },

  onLoad: function (options) {
    var that = this;
    that.getSwiper();
    that.getHot();
    app.getOpenid();
    setTimeout(function () {
      //app.findHaveSign();
    }, 500)
  },
  onShow: function (res) {
    var that = this;
    var authorized = wx.getStorageSync('authorized');
    if (authorized) {
      that.setData({
        authorized: true
      })
    }
  },
  authorize: function (res) {
    app.authorize();
    setTimeout(() => {
      this.onShow();
    }, 3000);
    //首页授权
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //     wx.setStorageSync('userInfo', res.userInfo)
    //   }
    // })
  },
  getSwiper: function (res) {
    var that = this;
    wx.request({
      url: app.globalData.host + 'getSwiper.php',
      success: function (res) {
        console.log(res)
        that.setData({
          swiper_img: res.data
        })
      }
    })
  },
  getHot: function (res) {
    var that = this;
    wx.request({
      url: app.globalData.host + 'getHot.php',
      success: function (res) {
        console.log(res)
        that.setData({
          hotlist: res.data
        })
      }
    })
  },
  go: function (res) {
    var index = res.currentTarget.id;
    if (index < 6) {
      var name = this.data.icon[index - 1].name;
      console.log('/pages/' + name + '/' + name)
      wx.navigateTo({
        url: '/pages/' + name + '/' + name,
      })
    } else {
      wx.switchTab({
        url: '/pages/my/my',
      })
    }
  }
})