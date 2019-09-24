const ctr = require('./controller.js')
const kawa = require('../../kawa.js')

// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: {
      images: kawa.Theme.Image,
    },
    count: {
      favors: 0,
      comments: 0,
    },
    chats:[]
  },

  onLoad: function(options) {
    ctr.setup(this)
  },

  onUnload: function () {
    ctr.onUnload()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.removeTabBarBadge({index: 1})
    wx.hideTabBarRedDot({index: 1})
    ctr.refreshMessage()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    ctr.refreshMessage()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // 点击点赞消息按钮
  favorClick: function() {
    wx.navigateTo({
      url: '/pages/message/list/favor',
    })
  },

  // 点击评论消息按钮
  commentClick: function() {
    wx.navigateTo({
      url: '/pages/message/list/comment',
    })
  },

  clickItem: function(e) {
    ctr.onClickItem(e)
  }
})
