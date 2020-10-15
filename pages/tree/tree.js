// pages/love/love.js
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
  toWrite:function(res){
    wx.navigateTo({
      url: 'write/write',
    })
  },
  toShow:function(res){
    console.log("信息墙类型选择:1是表白，2是吐槽，3是招领，您的选择为")
    console.log(res.currentTarget.dataset['index'])
    var choose = res.currentTarget.dataset['index'];
    wx.navigateTo({
      url: 'show/show?index=' + choose,
    })
  }
})