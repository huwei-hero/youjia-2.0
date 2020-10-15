// pages/sign/sign.js
Page({
  data: {
    latitude: '0.0',
    longitude: '0.0',
    haveSign: wx.getStorageSync('haveSign'),
    havetimetodo:true,
    isAchieve: false,
    inLocation: false,
    face: "5",
  },
  /*
    访问数据库中的signmessage表，返回学生是否进行过签到，1为签到完成，0为未签到
  */
  isAchieve: function(res) {
    var that = this;
    wx.request({
      url: 'https://www.friendplace.cn/project/sign/findSignMessage.php',
      method: 'get',
      data: {
        signId: wx.getStorageSync('signid'),
        sno: wx.getStorageSync('sno')
      },
      success: function(res) {
        //console.log(res)
        if (res.data[0].flag == 1)
          that.setData({
            isAchieve: true
          })
      }
    })
  },

  onLoad: function(res) {
    var that = this;
    that.isAchieve();
    that.getLocation();
    that.setData({
      item: wx.getStorageSync('SignName')
    })
    that.setHavetime();
  },
  getLocation: function(res) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        //console.log(res)
        that.setData({
          latitude: res.latitude
        })
        that.setData({
          longitude: res.longitude
        })
        that.checkLocation();
      }
    })
  },
  checkLocation: function(res) {
    var that = this;
    //console.log(that.data.latitude- wx.getStorageSync('latitude'))
    var a = Math.abs(that.data.latitude - wx.getStorageSync('latitude'));
    var b = Math.abs(that.data.longitude - wx.getStorageSync('longitude'));
    console.log(a, b)
    if (a < 0.005 && b < 0.03) {
      that.setData({
        inLocation: true
      })
    }
  },
  setHavetime: function(res) {
    var that = this;
    var etime = wx.getStorageSync('etime');
    that.setData({
      timer: setInterval(function() {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        var havetime = etime - timestamp;
        if (havetime < 0) {
          that.setData({havetimetodo:false})
          clearInterval(that.data.timer);
          that.setData({
            havetime: "00:00"
          });
        } else {
          var minute = Math.floor(havetime / 60);
          var second = havetime - 60 * minute;
          havetime = minute + ":" + second;
          that.setData({
            havetime: havetime
          })
        }
      }, 1000)
    })
  },
  sign: function(res) {
    var that = this;
    that.getFace();
  },
  getFace: function(res) {
    wx.showLoading({
      title: '正在检测',
    })
    var that = this;
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      success: function(res) {
        //console.log(res)
        that.upload_img(res.tempImagePath);
      }
    })
  },
  upload_img: function(e) {
    var that = this;
    console.log(e)
    var imgPath = e;
    wx.uploadFile({
      url: 'https://www.friendplace.cn/project/sign/faceCheck.php',
      filePath: imgPath,
      name: 'test',
      formData: {
        sno: wx.getStorageSync('sno')
      },
      success: function(res) {
        //console.log(JSON.parse(res.data).faces2.length)
        if (JSON.parse(res.data).faces2.length==0) {
          wx.hideLoading();
          wx.showToast({
            title: '未检测到人脸',
          })
        } else {
          var result = JSON.parse(res.data);
          var confidence = result.confidence
          var thresholds = result.thresholds['1e-4']
          console.log(result)
          var flag = confidence > thresholds ? true : false;
          if (flag) {
            wx.hideLoading();
            wx.showToast({
              title: '识别成功',
            })
            setTimeout(function() {
              wx.showLoading({
                title: '正在签到',
              })
              that.finalSign();
            }, 800)
          } else {
            wx.showToast({
              title: '信息不符',
            })
          }
        }
      }
    })
  },
  finalSign: function(res) {
    wx.request({
      url: 'https://www.friendplace.cn/project/sign/finalSign.php',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        signId: wx.getStorageSync('signid'),
        sno: wx.getStorageSync('sno')
      },
      success: function(res) {
       wx.hideLoading();
       wx.showToast({
         title: '签到成功',
       })
       setTimeout(function(){
          wx.switchTab({
            url: '/pages/home/home',
          })
       },1000)
      }
    })
  }
})