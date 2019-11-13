// pages/comment/comment.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    content:"",
    score:"",
    images:[],
    fileId:[],
    movieid:-1

  },
  getMovieDetail:function(){
    
    // console.log(JSON.parse(this.data.detail));

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detail: wx.cloud.callFunction({
        name: "movieDetail",
        data: {
          movieid: options.movieID
        }
      }).then(ren=>{
        // console.log(ren);
        this.setData({
          movieid: options.movieID,
          detail: JSON.parse(ren.result)
        })
        // console.log(this.data.detail)
      })
    })

  },
  onChangeComment:function(event){
    // console.log(event)
    this.setData({
      content:event.detail
    })

  },
  submit:function(){
    wx.showLoading({
      title: '评论中...',
    })
    // console.log(this.data.value);
    let promiseArr=[];
    for (let i=0;i<this.data.images.length;i++){
      promiseArr.push(new Promise((reslove,reject)=>{
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+suffix,
          filePath: item, // 文件路径
          success : res => {
          // get resource ID
          this.setData({
            fileId:this.data.fileId.concat(res.fileID)
          })
          reslove();
          console.log(res.fileID)
        },fail:error => {
          console.log(err);
        }
      })
      })
      )
    }
      Promise.all(promiseArr).then(res=>{
        db.collection("comment").add(
          {
            data:{
              content:this.data.content,
              score:this.data.score,
              fileId:this.data.fileId,
              movieId:this.data.movieid
            }
          }
        ).then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '评价成功！',
          })
        }).catch(err=>{
          wx.hideLoading();
        })

      })

  },
  onChangeScore:function(event){
     this.setData({
       score:event.detail
     })
  }, uploadImg:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :ren=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = ren.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})