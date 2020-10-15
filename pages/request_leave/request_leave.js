Page({
  data: {
    sdept:wx.getStorageSync('sdept'),
    classes : wx.getStorageSync('classes'),
    sno:wx.getStorageSync('sno'),
    name: wx.getStorageSync('name'),
    ins:wx.getStorageSync('ins'),
    startdate:'',
    enddate:''
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.friendplace.cn/project/leave_request/findHaveTime.php',
      data:{
        sno:wx.getStorageSync('sno'),
        sdept:that.data.sdept
      },
      success:function(res){
       console.log(res)
       var i = 0;
        var minHaveTime = res.data.havetime[0].havetime;
        for(i=0;i<res.data.havetime.length;i++){
            if(res.data.havetime[i].havetime < minHaveTime)
              minHaveTime = res.data.havetime[i].havetime
        }
        console.log(minHaveTime)
        that.setData({havetime:minHaveTime})
        that.setData({teachers:res.data.teachers})
      }
    })
  },
  submit:function(res){
    var sdept = this.data.sdept;
    var classes = this.data.classes;
    var sno = this.data.sno;
    var name = this.data.name;
    var sdate = res.detail.value.sdate;
    var edate = res.detail.value.edate;
    var seasion = res.detail.value.seasion;
    var ins = this.data.ins

    var check = sdate!=""&&edate!=""&&seasion!="";

    if(check){
      wx.showLoading({
        title: '正在签到',
      })
      wx.request({
        url: 'https://www.friendplace.cn/project/leave_request/setRequestList.php',
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          sno: sno,
          havetime: this.data.havetime,
          sdept: sdept,
          classes: classes,
          name: name,
          sdate: sdate,
          edate: edate,
          seasion: seasion,
          header: ins,
          towho: ""
        },
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      })
    }else{
      wx.showToast({
        title: '信息要填写完整',
      })
    }
  },
  setstart:function(res){
    console.log(res)
    this.setData({startdate:res.detail.value})
  },
  setend: function (res) {
    this.setData({ enddate: res.detail.value })
  }
})