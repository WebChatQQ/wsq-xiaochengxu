const ctr = require('./controller.js')
const kawa = require('../../../../kawa.js')

// pages/home/comps/postlist/postlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filter: {
      type: String,
      value: "",
    },
    tags: {
      type: Array,
      value: [],
    }
  },

  lifetimes: {
    attached: function () {
      ctr.setup(this)
      ctr.onLoad(this.data)
    },
  },

  attached: function () {
    ctr.setup(this)
    ctr.onLoad(this.data)
  },

  /**
   * 组件的初始数据
   */
  data: {
    theme: {
      images: kawa.Theme.Image,
      mainColor: kawa.Theme.MainColor,
      tabColor: kawa.Theme.TabSelectedColor || kawa.Theme.MainColor,
      favroColor: kawa.Theme.FavorColor || kawa.Theme.MainColor,
    },
    tagSelected: -1,
    loader: {
      ing: false, more: true,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPullDownRefresh: function() {
      ctr.onPullDownRefresh()
    },

    onReachBottom: function() {
      ctr.onReachBottom()
    },

    // 点击头像
    clickAvatar: function (e) {
      ctr.onClickAvatar(e)
    },

    // 点击帖子
    topicClick: function (e) {
      ctr.onClickItem(e)
    },

    // 点击评论
    commentClick: function (e) {
      ctr.onClickComment(e)
    },

    // 点击点赞
    favorClick: function (e) {
      ctr.onClickFavor(e)
    },

    // 点击菜单
    clickMenu: function (e) {
      ctr.onClickMenu(e)
    },

    // 点击话题标签
    clickTopic: function (e) {
      ctr.onClickTopic(e)
    },
  }
})
