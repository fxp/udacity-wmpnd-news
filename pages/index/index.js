//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
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
    newsList: [],
    LOADING_MIN: 500,
    PLACEHOLDER_IMAGE: '../../images/placeholder.jpg'
  },
  onCategoryChange: function (event) {
    /**
     * 改变当前显示的新闻的类型
     */
    var tag = event.currentTarget.dataset.id
    this.showAll(tag)
  },
  showDetail: function (event) {
    /**
     * 跳转到新闻详情页面
     */
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.newsid
    })
  },
  showNewsList: function (tag) {
    /**
     * 从服务器获得新闻数据
     * 参数：
     * tag(necessary): 新闻类型
     */
    return util.news.findByTag(tag)
  },

  showAll: function (tag) {
    /**
     * 刷新展示某个类型的新闻列表，并修改当前新闻类型
     * 参数
     * tag(necessary): 新闻类型
     */
    return this.showNewsList(tag)
      .then(res => {
        res.result = res.result.map(n => {
          n.date = moment(n.date).locale('zh-cn').fromNow()
          n.source = (n.source) || '未知来源'
          n.firstImage = n.firstImage || this.data.PLACEHOLDER_IMAGE
          return n
        })
        this.setData({
          newsList: res.result,
          currentTag: tag
        })
      })
  },

  onLoad: function (options) {
    /**
     * 默认加载国内新闻（gn）
     */
    this.showAll(this.data.currentTag)
  },

  onPullDownRefresh: function (){
    /**
     * 下拉刷新
     * 但是如果数据获取过快，会导致无法完整展现下拉刷新的动画，导致体验不佳
     * 所以通过判断获得数据的延迟差，自动补全500毫秒再释放刷新
     */
    var startedAt = new Date().getTime();
    this.showAll(this.data.currentTag)
      .then(() => {
        var diff = new Date().getTime() - startedAt;
        if (diff < this.data.LOADING_MIN) {
          return util.delay(this.data.LOADING_MIN - diff)
        }
      })
      .then(() => {
        wx.stopPullDownRefresh()
      }, err =>{
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '刷新失败, ' + err.errMsg,
          icon: 'none',
          duration: 2000
        })
      })
  }

})
