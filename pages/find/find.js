Page({

  data: {
    
  },

  onLoad: function(options) {
    console.log(this.data.a)
  },
  uploadimg: function(res) {
    this.setData({a:true})
    console.log(this.data.a)
  }
})