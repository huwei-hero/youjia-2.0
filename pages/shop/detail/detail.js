var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    var id = options.id;
    wx.request({
      url: 'https://www.friendplace.cn/project/shop/getDetail.php',
      method: 'get',
      data: {
        id: id
      },
      success: function(res) {
        console.log(res);
        that.setData({
          detail: res.data[0]
        })
      }
    })
  },
buy:function(res){
  var that = this;
  wx.request({
    url: 'https://www.friendplace.cn/project/shop/pay.php',
    method:'post',
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    data:{
      openid:wx.getStorageSync('openid'),
      //价格是以分为单位，所有要*100才是对应的元
      price:that.data.detail.price*100
    },
    success:function(res){
      console.log(res.data)
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType:'MD5',
        paySign: res.data.sign2,
        success:function(res){
          // console.log(res)
          // that.setOrder();
        },
        complete:function(res){
          that.setOrder();
        }
      })
    }
  })
},
setOrder:function(res){
  var that = this;
  wx.request({
    url: app.globalData.host + 'shop/setOrder.php',
    method:'post',
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    data:{
      shopopenid:that.data.detail.openid,
      buyopenid:wx.getStorageSync('openid'),
      price:that.data.detail.price,
      goodid:that.data.detail.id,
      pic:that.data.detail.logo,
      num:that.data.detail.num
    },
    success:function(res){
      console.log(res);
    }
  })
},
call:function(res){
  var that = this;
  wx.makePhoneCall({
    phoneNumber: that.data.detail.tel,
  })
}
})