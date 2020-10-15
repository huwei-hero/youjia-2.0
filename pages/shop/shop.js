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
    //发起网络请请求，获取所有的商品列表
    wx.request({
      url: 'https://www.friendplace.cn/project/shop/getGoodsList.php',
      method:'get',
      success:function(res){
        //将获取到的数据绑定到js中
        console.log(res)
        that.setData({goodsList:res.data});
      }
    })
  },
  
  //搜索商品的点击事件
  submit: function(res) {
    console.log(res);
    var that = this;
    var data = res.detail.value;
    var keywords = data.keywords;
    wx.request({
      url: 'https://www.friendplace.cn/project/shop/search.php',
      method:'get',
      data:{
        keywords:keywords
      },
      success:function(res){
        console.log(res)
        that.setData({goodsList:res.data})
      }
    })

  },
  showDetail: function(res) {
    console.log(res)
   
    wx.navigateTo({
      url: 'detail/detail?id=' + res.currentTarget.dataset.id,
    })
  },
  onReachBottom:function(res){
    console.log("到底了")
  },
  toWrite:function(res){
    wx.navigateTo({
      url: 'write/write',
    })
  }
})