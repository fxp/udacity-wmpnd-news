//index.js
//获取应用实例
const app = getApp()
const moment = require('../../utils/moment-with-locales.min.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tags: {
      'gn': '国内',
      'gj': '国际',
      'cj': '财经',
      'yl': '娱乐',
      'js': '军事',
      'ty': '体育',
      'other': '其他'
    },
    currentTag: 'gn',
    newsList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../detail/detail?id=1523074607634'
    })
  },
  onCategoryChange: function (event) {
    var tag = event.currentTarget.dataset.id
    console.log('change category', tag)
    this.showAll(tag)
  },
  showDetail: function (event) {
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.newsid
    })
  },
  showNewsList: function (newsType) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list?type=' + newsType,
        data: {},
        method: 'GET',
        success: res => {
          resolve(res.data)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },

  showAll: function (tag) {
    this.showNewsList(tag)
      .then(res => {
        console.log(res.result)
        res.result = res.result.map(n => {
          n.date = moment(n.date).locale('zh-cn').fromNow()
          n.source = (n.source) || "未知来源"
          return n
        })
        this.setData({
          newsList: res.result,
          currentTag: tag
        })
      })
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      categoryId: (options.categoryId) ? options.categoryId : 'gn'
    })
    this.showAll('gn')
  },

})
