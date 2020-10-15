// pages/shop/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo: function (res) {
    var that = this;
    wx.authorize({
      scope: 'scope.userInfo',
    })
    setTimeout(function(){
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          wx.setStorageSync('nickName', res.userInfo.nickName);
          wx.setStorageSync('avatar', res.userInfo.avatarUrl)
          that.setData({avatar:res.userInfo.avatarUrl})
          that.setData({nickName:res.userInfo.nickName})
          that.setData({getName:true})
        }
      })
    },1000)
  },
  chooseImage: function (res) {
    console.log(res)
    var that = this;
    wx.chooseImage({
      count: 3,
      success: function (res) {
        console.log("接收上传的文件res")
        console.log(res)
        var imgSrc = res.tempFilePaths;
        for (var i = 0; i < imgSrc.length; i++) {
          wx.uploadFile({
            url: 'https://www.friendplace.cn/project/shop/setImages.php',
            filePath: imgSrc[i],
            name: 'file',
            formData: {
              openid: wx.getStorageSync('openid'),
              index: i
            },
            success: function (res) {
              console.log(res.data)
              that.data.imgs.push(res.data);
              that.setData({
                imgs: that.data.imgs
              })
            }
          })
        }
      }
    })
  },
   /* 加数 */
   addCount: function (e) {
    console.log("刚刚您点击了加1");
    var num = this.data.num;
    var price = this.data.price;
    // 总数量-1  
    if (num < 1000) {
      num++;      
    }
    this.setData({
      num: num,//加一后重新赋值
      price: price*num//加过数量后价格赋值
    });
  },
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var num = this.data.num;
    var price = this.data.price;
    if (num > 1) {
      num--;
    }
    this.setData({
      num: num,
      price: price * num
    });
  },

  submit: function (res) {
    console.log(res)
    var that = this;
    var data = res.detail.value;
    var name = data.name;
    var price = data.price;
    var content = data.content;
    var num = data.num;
    wx.request({
      url: 'https://www.friendplace.cn/project/shop/setMsg.php',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        touxiang: wx.getStorageSync('avatar'),
        nicheng: wx.getStorageSync('nickName'),
        name: name,
        price: price,
        content: content,
        num: num,
        imgs:JSON.stringify(that.data.imgs),
        openid:wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res);
        if(res.data>0){
          wx.showToast({
            title: '发布成功！',
            duration:1500,
            success:function(res){
              wx.navigateTo({
                url: '../../shop/shop',
              })
            }
          })
          
        }
      }
    })
  }
})