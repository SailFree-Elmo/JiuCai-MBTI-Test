// app.js - 小程序入口
App({
  onLaunch() {
    // 小程序启动时执行
  },

  globalData: {
    // 用户答题结果：各维度得分
    scores: {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    },
    // 最终MBTI类型
    mbtiType: '',
    // 用户每题的选择记录
    answers: []
  }
})
