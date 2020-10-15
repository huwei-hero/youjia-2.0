var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo: function (res) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        wx.setStorageSync('nickName', res.userInfo.nickName);
        wx.setStorageSync('avatar', res.userInfo.avatarUrl)
        that.setData({
          avatar: wx.getStorageSync('avatar'),
          nickName: wx.getStorageSync('nickName')
        })
      }
    })
  },
  goto: function (pages) {
    console.log(pages);
    wx.navigateTo({
      url: pages,
    })
  },
  toMsg: function (e) {
    this.goto('me-info/me-info')
  },
  toOrder: function (e) {
    this.goto('orders/orders')
  },
  toAuthorize: function (e) {
    this.goto('authorize/authorize')
  },
  toOfUs: function (e) {
    this.goto('ofus/ofus')
  },

  authorize: function (res) {
    app.authorize();
    setTimeout(() => {
      this.onShow();
    }, 3000);
  },

  onShow: function (res) {
    var that = this;
    var authorized = wx.getStorageSync('authorized');
    if (authorized) {
      that.setData({
        authorized: true
      })
    }
    that.getUserInfo();
  }
})