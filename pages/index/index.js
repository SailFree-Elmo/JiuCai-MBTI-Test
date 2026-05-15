// pages/index/index.js - 首页逻辑
const app = getApp();

Page({
  data: {
    animationClass: ''
  },

  onLoad() {
    // 播放入场动画
    this.setData({ animationClass: 'page-enter' });
  },

  onShow() {
    // 每次首页显示时重置全局数据，防止答题中途返回后脏数据残留
    this._resetGlobalData();
  },

  /**
   * 重置全局答题数据
   */
  _resetGlobalData() {
    app.globalData.scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };
    app.globalData.mbtiType = '';
    app.globalData.answers = [];
  },

  onShareAppMessage() {
    return {
      title: '韭菜MBTI人格分析 - 测测你是哪种韭菜？',
      path: '/pages/index/index',
      imageUrl: ''
    };
  },

  /**
   * 开始测试 - 跳转到答题页
   */
  startTest() {
    wx.navigateTo({
      url: '/pages/question/question'
    });
  }
});
