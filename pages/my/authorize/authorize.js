// pages/my/authorize/authorize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  position:function(res){
    wx.authorize({
      scope: 'scope.userLocation',
    })
  },
  getUserInfo:function(res){
    wx.authorize({
      scope: 'scope.userInfo',
    })
  }
})