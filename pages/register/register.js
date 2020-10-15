// pages/register/register.js
Page({
  data: {
    index1: '',
    index2: '',
    index3: '',
    instructor: ['导员名1', '导员名2', '导员名3'],
    sdepts: ['软件', '电气', '艺术', '机械', '经管', '会计'],
    classes: ['16-1', '16-2', '16-3', '16-4', '16-5', '16-6', '16-7', '17-1', '17-2', '17-3', '17-4', '17-5', '17-6', '17-7', '18-1', '18-2', '18-3', '18-4', '18-5', '18-6', '18-7', '19-1', '19-2', '19-3', '19-4', '19-5', '19-6', '19-7']
  },

  onLoad: function(options) {

  },
  choose_sdept: function(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  choose_clas: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  choose_ins: function(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  formSubmit: function(res) {
    var bool1 = this.data.index1 != '' && this.data.index2 != '' && this.data.index3 != ''
    var bool2 = res.detail.value.name != "" && res.detail.value.sno != "" && res.detail.value.tel != ""
    if (bool1 && bool2) {
      // console.log(this.data.sdepts[this.data.index1])
      wx.setStorageSync('sdept', this.data.sdepts[this.data.index1])
      wx.setStorageSync('classes', this.data.classes[this.data.index2])
      wx.setStorageSync('ins', this.data.instructor[this.data.index3])
      wx.setStorageSync('name', res.detail.value.name)
      wx.setStorageSync('sno', res.detail.value.sno)
      wx.setStorageSync('tel', res.detail.value.tel)
      this.upload();
    } else {
      wx.showToast({
        title: '每个信息都要填写哦',
      })
    }
  },
  upload: function(res) {
    wx.request({
      url: 'https://www.friendplace.cn/project/register.php',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: wx.getStorageSync('openid'),
        sdept: wx.getStorageSync('sdept'),
        classes: wx.getStorageSync('classes'),
        sno: wx.getStorageSync('sno'),
        name: wx.getStorageSync('name'),
        tel: wx.getStorageSync('tel'),
        ins: wx.getStorageSync('ins'),
      },
      success: function(e) {
        console.log(e)
        if (e.data == 1) {
         wx.redirectTo({
           url: '/pages/register/getFace/getFace',
         })
          //console.log(this.data.name)      
        }
      }
    })
  }
})