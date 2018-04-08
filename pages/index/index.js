//index.js
//获取应用实例
const app = getApp()
const network = require("../../utils/network.js") 
const NEWS_TYPE = ["gn", "gj", "cj", "yl", "js", "ty", "other"]
const TAB_NAME = ["国内", "国际", "财经", "娱乐", "技术", "体育", "其它"]

Page({
  data: {
    isLoading: false,
    newsList: [],
    currentTab: 0,
    tabNames: TAB_NAME,
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
    const newsType = NEWS_TYPE[e.detail.current];

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
