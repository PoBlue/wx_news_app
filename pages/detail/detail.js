// pages/detail/detail.js
const network = require("../../utils/network.js") 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    errorMsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.hideLoading();

    network.getNewDetail(options.id)
      .then(res => {
        this.setData({
          detailData: res,
          errorMsg: ''
        })
      })
      .catch(res => {
        wx.hideLoading();
        console.log(res)

        this.setData({
          errorMsg: '请求错误, 请检查网络'
        })
      })
  },
})