// pages/tree/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseImage: function(res) {
    var that = this;
    var imgs = [];
    wx.chooseImage({
      count: 2,
      success: function(res) {
        console.log("接收上传的文件res")
        console.log(res)
        var imgSrc = res.tempFilePaths;
        for (var i = 0; i < imgSrc.length; i++) {
          wx.uploadFile({
            url: 'https://www.friendplace.cn/project/love/setImage.php',
            filePath: imgSrc[i],
            name: 'file',
            formData: {
              openid: wx.getStorageSync('openid'),
              index: i
            },
            success: function(res) {
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
  submit: function(res) {
    var that = this;
    console.log("表单填写信息为")
    console.log(res.detail.value);
    var data = res.detail.value

    var noName = data.noName;
    if (noName) {
      var touxiang = "/images/niming.jpg";
      var name = "匿名";
    } else {
      var touxiang;
      var name = data.name;
    }
    var content = data.content;
    var pic1 = that.data.imgs[0];
    var pic2 = that.data.imgs[1];
    var _class = data._class;
    wx.request({
      url: 'https://www.friendplace.cn/project/love/setMsg.php',
      method:'post',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      data:{
        touxiang:touxiang,
        name:name,
        content:content,
        pic1:pic1,
        pic2:pic2,
        openid:wx.getStorageSync('openid'),
        _class:_class
      },
      success:function(res){
        console.log(res)
      }
    })
  },
})