// pages/result/result.js - 结果页逻辑
const app = getApp();
const { getDimensionLabels, getDimensionPercent } = require('../../utils/mbti');
const { getPersonality } = require('../../utils/personalities');

Page({
  data: {
    mbtiType: '',
    personality: null,
    dimensionLabels: null,
    dimensionPercent: null,
    showDetail: false,
    animationClass: ''
  },

  onLoad() {
    const mbtiType = app.globalData.mbtiType;
    const scores = app.globalData.scores;
    const personality = getPersonality(mbtiType);
    const dimensionLabels = getDimensionLabels();
    const dimensionPercent = getDimensionPercent(scores);

    if (!mbtiType || !personality) {
      // 如果没有答题数据，返回首页（reLaunch清空页面栈，避免页面栈堆积）
      wx.reLaunch({
        url: '/pages/index/index'
      });
      return;
    }

    this.setData({
      mbtiType: mbtiType,
      personality: personality,
      dimensionLabels: dimensionLabels,
      dimensionPercent: dimensionPercent,
      animationClass: 'page-enter'
    });

    // 延迟展示详情动画
    setTimeout(() => {
      this.setData({ showDetail: true });
    }, 600);
  },

  onShareAppMessage() {
    const personality = this.data.personality;
    return {
      title: `我的韭菜人格是「${personality ? personality.name : ''}」！快来测测你是哪种韭菜？`,
      path: '/pages/index/index',
      imageUrl: ''
    };
  },

  /**
   * 重新测试
   */
  retest() {
    // 重置全局数据
    app.globalData.scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };
    app.globalData.mbtiType = '';
    app.globalData.answers = [];

    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  /**
   * 分享给好友
   */
  shareToFriend() {
    // 微信分享通过 onShareAppMessage 自动处理
    // 此处通过 button open-type="share" 触发
  }
});
