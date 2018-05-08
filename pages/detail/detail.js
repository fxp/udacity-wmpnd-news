// pages/detail/detail.js
const util = require('../../utils/util.js')
const moment = require('../../utils/moment-with-locales.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  navBack: function () {
    // TODO: if there's no prev page?
    wx.navigateBack()
  },

  showNews: function (id) {
    return util.news.getById(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 加载新闻详情页面
     */
    this.showNews(options.id)
      .then(news => {
        news.source = news.source || "未知来源"
        news.date = moment(news.date).locale('zh-cn').fromNow()

        this.setData({
          news: news,
          json_raw: JSON.stringify(news)
        })
      })
  }
})