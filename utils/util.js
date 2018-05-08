
function findByTag(tag){
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=' + tag,
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
}

function getById(id){
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
}

module.exports = {
  delay: (millsec)=>{
    console.log('delay', millsec)
    return new Promise((resolve) => setTimeout(resolve, millsec))
  },
  news: {
    findByTag: findByTag,
    getById: getById
  }
}
