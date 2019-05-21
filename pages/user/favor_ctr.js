const api = require('../../utils/api.js')

var view = undefined
function setup(v) {
  view = v
}

function onLoad(options) {
  if (options && options.uid) {
    view.data.user.uid = options.uid
  }
  var loader = view.data.loader
  loader.ing = true
  view.setData({loader: loader})

  api.getUserFavorList(view.data.user.uid).then(resp => {
    loader.ing = false
    if (resp.data && resp.data.length < 20) {
      loader.more = false
    }
    view.setData({ loader: loader })
    view.setData({ favors: resp.data })
  }).catch( err => {
    console.log(err)
    wx.showToast({
      title: '加载失败', icon: 'none'
    })
    loader.ing = false
    view.setData({ loader: loader })
  })
}

function onPullDownRefresh() {
  if (view.loader.ing) {
    return
  }

  var loader = view.data.loader
  loader.ing = true
  view.setData({ loader: loader })

  api.getUserFavorList(view.data.user.uid).then(resp => {
    loader.ing = false
    if (resp.data && resp.data.length < 20) {
      loader.more = false
    }
    view.setData({ loader: loader })
    view.setData({ favors: resp.data })
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '刷新成功', icon: 'success',
    })
  }).catch( err => {
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '刷新失败', icon: 'none',
    })
    loader.ing = false
    view.setData({ loader: loader })
  })
}

function onReachBottom() {
  if (view.data.loader.ing || !view.data.loader.more) {
    return
  }
  var favors = view.data.favors
  var since = 0
  var limit = 20
  if (favors && favors.length > 0) {
    since = favors[favors.length - 1].id
  }
  var loader = view.data.loader
  loader.ing = true
  view.setData({loader: loader})
  api.getUserFavorList(view.data.user.uid, since, limit).then(resp => {
    loader.ing = false
    if (resp.data.length < limit) {
      loader.more = false
    }
    if (resp.data) {
      view.setData({ favors: favors.concat(resp.data) })
    }
    view.setData({loader: loader})
  }).catch( err=> {
    loader.ing = false
    view.setData({loader: loader})
    wx.showToast({
      title: '加载失败', icon: 'none',
    })
  })
}

function onClickItem(e) {
  var idx = e.currentTarget.dataset.idx
  var favor = view.data.favors[idx]
  // 跳转到帖子，并设置为已读
  wx.navigateTo({
    url: '/pages/thread/thread?pid=' + favor.entity_id,
  })
}


module.exports = {
  setup: setup,
  onLoad: onLoad,
  onPullDownRefresh: onPullDownRefresh,
  onReachBottom: onReachBottom,
  onClickItem: onClickItem,
}