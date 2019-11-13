// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
moveList:[]
  },
  getAllMovieList:function(){
    wx.showLoading({
      title: 'loading...',
    })
    wx.cloud.callFunction({
      name:"moveList",
      data:{
        start:this.data.moveList.length,
        count:10
      }
     
    }).then(ren=>{
      this.setData({
        moveList: this.data.moveList.concat(JSON.parse(ren.result).subjects)
      })
      wx.hideLoading()
      console.log(JSON.parse(ren.result).subjects)
    }).catch(err=>{
      console.log(err)
      wx.hideLoading()
    });

  },
  comment:function(event){
    // console.log(event.target.dataset.movieid);
    wx.navigateTo({
      url: `../comment/comment?movieID=${event.target.dataset.movieid}`,
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail:function(err){
        console.log(err);
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllMovieList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
this.getAllMovieList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})