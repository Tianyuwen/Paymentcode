// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    weixinCode:"",
    zfbCode:"",
    qqCode:"",
  },

  onLoad() {

  },

  scanCode(e){
    let name=e.currentTarget.dataset.name
    
// 只允许从相机扫码
wx.scanCode({
  onlyFromCamera: false,
  qrCode:["qrCode"],
  success :(res)=> {

    if(res.scanType!='QR_CODE'){
      return false
    }
    if(name=="weixin"){
      if(res.result.indexOf("wxp://")<0){
        wx.showModal({
          title: '错误',
          content: '非微信付款码',
      
        })
        return false
      }
      this.setData({
        weixinCode:res.result
      })
    }else if(name=="zfb"){
      if(res.result.indexOf("alipay.com")<0){
        wx.showModal({
          title: '错误',
          content: '非支付宝付款码',
      
        })
        return false
      }
      this.setData({
        zfbCode:res.result
      })
    }else if(name=="qq"){
      if(res.result.indexOf("qianbao.qq.com")<0){
        wx.showModal({
          title: '错误',
          content: '非QQ付款码',
      
        })
        return false
      }
      this.setData({
        qqCode:res.result
      })
    }

  }
})
  },
  createQRcode(){
    let data={}
   data.weixinCode= this.data.weixinCode
   data.zfbCode= this.data.zfbCode
   data.qqCode= this.data.qqCode
   wx.setStorage({
    key:"QRcodedata",
    data:data
  })
   if(  data.weixinCode!=""||  data.zfbCode!=""||  data.qqCode!=""){
    wx.navigateTo({
      url: `/pages/createQRcode/createQRcode`
    })
   }else{
    wx.showModal({
      title: '提示',
      content: '请提交付款码',
  
    })
   }

  }
})
