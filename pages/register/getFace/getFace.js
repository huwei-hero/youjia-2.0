// pages/register/getFace/getFace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(options) {

  },

  getFace: function(res) {
    var that = this;
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      success: function(res) {
        that.upload_img(res.tempImagePath)
      }
    })
  },
  upload_img: function(e) {
    var imgPath = e;
    wx.uploadFile({
      url: 'https://www.friendplace.cn/project/setFace.php',
      filePath: imgPath,
      name: 'test',
      formData: {
        sno: wx.getStorageSync('sno')
      },
      success: function(res) {
        wx.showLoading({
          title: '正在录入',
        })
        setTimeout(function() {
          wx.hideLoading();
          wx.showToast({
            title: '录入成功！',
          })
        }, 800)
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 1800)
      }
    })
  }
})