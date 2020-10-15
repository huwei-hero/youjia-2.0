// pages/tree/detail/detail.js
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
    var that = this;
    console.log(JSON.parse(options.item))
    var item = JSON.parse(options.item);
    that.setData({data:item});
    var pics = [];
    if(item.pic1!='undefined'){
      pics.push(item.pic1);
    }
    if(item.pic2!='undefined'){
      pics.push(item.pic2);
    }
    that.setData({pics:pics})

    that.getDiscussion();
  },
  getDiscussion:function(res){
    var that = this;
    wx.request({
      url: 'https://www.friendplace.cn/project/love/getDiscuss.php',
      method:'get',
      data:{
        id:that.data.data.id
      },
      success:function(res){
        console.log(res);
        that.setData({discussion:res.data})
      }
    })
  },
  submit:function(res){

    var that = this;
    var data = res.detail.value;
    var content = data.discussion;
    wx.request({
      url: 'https://www.friendplace.cn/project/love/setDiscussion.php',
      method:'post',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        content:content,
        openid:wx.getStorageSync('openid'),
        nickName:wx.getStorageSync('nickName'),
        avatars:wx.getStorageSync('avatar'),
        id:that.data.data.id
      },
      success:function(res){
        console.log(res.data);
        if(res.data==1){
          wx.showToast({
            title: '发表成功！',
          })
          setTimeout(() => {
            that.getDiscussion();
            that.setData({discussion_info:''})
          }, 1000);
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})