App({
  getUserInfo: function (res) {
    wx.getUserInfo({
      lang: lang,
      withCredentials: true,
      success: (result) => {

      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  getOpenid: function (res) {
    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: 'https://www.friendplace.cn/project/getuserinfo.php',
          method: 'POST',
          data: {
            code: res.code,
            flag: 0 //表明学生身份
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.length == 1) {
              wx.setStorageSync('openid', res.data[0])
              //tiaozhuan
              wx.redirectTo({
                url: '/pages/register/register',
              })
            } else {
              /*设置个人信息缓存*/
              wx.setStorageSync('openid', res.data[0].openid)
              wx.setStorageSync('classes', res.data[0].classes)
              wx.setStorageSync('name', res.data[0].name)
              wx.setStorageSync('sdept', res.data[0].sdept)
              wx.setStorageSync('faceurl', res.data[0].faceurl)
              wx.setStorageSync('tel', res.data[0].tel)
              wx.setStorageSync('lev', res.data[0].lev)
              wx.setStorageSync('sno', res.data[0].sno)
              wx.setStorageSync('ins', res.data[0].ins)
            }
            console.log(res); //后台获取openid测试
          }
        })
      }
    })
  },
  findHaveSign: function (res) {
    var that = this;
    wx.setStorageSync('SignName', '暂无签到活动')
    wx.request({
      url: 'https://www.friendplace.cn/project/sign/findSign.php',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        classes: wx.getStorageSync('classes')
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.length != 0) {
          wx.setStorageSync('haveSign', true);
          wx.setStorageSync('signid', res.data[0].id);
          wx.setStorageSync('SignName', res.data[0].name)
          wx.setStorageSync('etime', res.data[0].etime);
          wx.setStorageSync('latitude', res.data[0].latitude);
          wx.setStorageSync('longitude', res.data[0].longitude);
        } else {
          wx.setStorageSync('haveSign', false);
        }
      }
    })
  },
  authorize: function (res) {
    var that = this;

    //获取信息授权
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        //获取地理位置授权
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            wx.setStorageSync('authorized', true)
          }
        })
      }
    })
  },
  globalData: {
    host: 'https://www.friendplace.cn/project/',
  }
})