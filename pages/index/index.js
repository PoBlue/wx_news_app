//index.js
//获取应用实例
const app = getApp()
const network = require("../../utils/network.js") 

Page({
  data: {
    isLoading: false,
    newsList: [],
    currentTab: 0,
  },
  onLoad: function () {
    const self = this;

    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    network.getNewsList('gn')
      .then(res => {
        this.setData({
          newsList: res,
        })
      })
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    var self = this;
    self.setData({ currentTab: e.detail.current });
  },
})
