// pages/detail/detail.js

const moment = require('../../utils/moment-with-locales.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  navBack: function () {
    // TODO: if there's no prev page?
    console.log('back')
    wx.navigateBack()
  },

  showNews: function (id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://test-miniprogram.com/api/news/detail?id=' + id,
        data: {},
        method: 'GET',
        success: res => {
          resolve(res.data.result)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('detail', options)
    this.showNews(options.id)
      .then(news => {
        console.log(news)
        news.source = news.source || "未知来源"
        news.date = moment(news.date).locale('zh-cn').fromNow()

        this.setData({
          news: news,
          json_raw: JSON.stringify(news)
        })
      })
  }
})