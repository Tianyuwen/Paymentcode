// pages/createQRcode/createQRcode.js
import wxbarcode from 'wxbarcode'
let base_URL="https://pay.krjojo.com/api.php?"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data={}
    wx.getStorage({
      key: 'QRcodedata',
      success :(res)=> {
        console.log(res.data)
        this.creatQrCode(res.data)
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

  },
  creatQrCode(e) {
 let url=`${base_URL}weixinCode=${e.weixinCode}&zfbCode=${e.zfbCode}&qqcode=${e.qqcode}`
   wxbarcode.qrcode('QRcode', url, 650, 650)

  },
  saveImg(){
   const ctx = wx.createCanvasContext('QRcode', this)
   ctx.draw(true,()=>{
    wx.canvasToTempFilePath({
      canvasId: 'QRcode',
      fileType:"jpg",
      success(res) {
        const tempFilePath=res.tempFilePath
        
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success (res) {
            wx.removeStorage({
              key: 'QRcodedata'
            })
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
   }
   )

  }
})