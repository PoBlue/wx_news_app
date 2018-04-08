//index.js
//获取应用实例
const app = getApp()
const network = require("../../utils/network.js") 
const NEWS_TYPE = ["gn", "gj", "cj", "yl", "js", "ty", "other"]

Page({
  data: {
    isLoading: false,
    newsList: [],
    currentTab: 0,
    tabNames: NEWS_TYPE,
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

    wx.showLoading({
      title: '加载中...',
    })

    network.getNewsList('gn')
      .then(res => {
        wx.hideLoading();

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
    const newsType = this.data.tabNames[e.detail.current];

    wx.showLoading({
      title: '加载中...',
    })

    network.getNewsList(newsType)
      .then(res => {
        wx.hideLoading();
        
        this.setData({
          newsList: res,
        })
      })
    
    self.setData({ currentTab: e.detail.current });
  },
})
