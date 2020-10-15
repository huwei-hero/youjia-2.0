// pages/tree/love/love.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    now:0,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({index:options.index})
    if(that.data.hasMore){
      that.getLove(that.data.now,that.data.index);
    }else{
      wx.showToast({
        title: '暂无数据',
      })
    }
   
  },
  getLove:function(id,index){
    var that = this;
    wx.request({
      url: 'https://www.friendplace.cn/project/love/getLoveList.php',
      method: 'get',
      data: {
        id: id,
        index:index
      },
      success: function (res) {
        console.log("信息获取情况");
        console.log(res);
        if(res.data.length==10){
          that.setData({ loveList: res.data })
          that.data.now += 10;
        }else if(res.data.length>0&&res.data.length<10){
          that.setData({ loveList: res.data })
          that.data.hasMore = false;
        }else{
          that.data.hasMore = false;
        }
      }
    })
  },
  //页面下拉触底函数
  onReachBottom:function(res){
    var that = this;
    if(that.data.hasMore){
      that.getLove(that.data.now);
    }else{
      //如果没有数据了，那么啥也不干，前端显示底线即可
    }
  },
  bingo:function(res){
    console.log(res)
  
    var that = this;
    wx.request({
      url: 'https://www.friendplace.cn/project/love/addBingo.php',
      method:'post',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        openid:wx.getStorageSync('openid'),
        id:res.currentTarget.dataset['id']
      },
      success:function(res){
        // that.setData({})
        console.log(res)
      }
    })
  },
  toDetail:function(res){
    var that = this;
    // var id = res.currentTarget.dataset['id'];
    var item = JSON.stringify(res.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../detail/detail?item='+item
    })
  }

})