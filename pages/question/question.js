// pages/question/question.js - 答题页逻辑
const app = getApp();
const { questions, calculateMBTI } = require('../../utils/mbti');

Page({
  data: {
    questions: questions,
    currentIndex: 0,
    totalQuestions: questions.length,
    currentQuestion: null,
    selectedOption: 0, // 0=未选, 1=选A, 2=选B
    progress: 0,
    showTransition: false,
    animationClass: '',
    optionATransition: '',
    optionBTransition: ''
  },

  onLoad() {
    const currentQuestion = questions[0];
    this.setData({
      currentQuestion: currentQuestion,
      progress: (1 / questions.length) * 100,
      animationClass: 'page-enter'
    });
  },

  onShareAppMessage() {
    return {
      title: '韭菜MBTI人格分析 - 测测你是哪种韭菜？',
      path: '/pages/index/index'
    };
  },

  /**
   * 选择选项
   * @param {Object} e - 事件对象，dataset中包含option值（1=A, 2=B）
   */
  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const currentIndex = this.data.currentIndex;

    // 防止重复选择
    if (this.data.selectedOption !== 0) return;
    if (this.data.showTransition) return;

    // 记录选择到全局
    const answers = app.globalData.answers;
    answers[currentIndex] = option;

    // 更新对应维度得分
    const question = this.data.currentQuestion;
    const scores = app.globalData.scores;
    if (option === 1) {
      scores[question.optionA.type] += 1;
    } else if (option === 2) {
      scores[question.optionB.type] += 1;
    }
    app.globalData.scores = scores;
    app.globalData.answers = answers;

    // 显示选中效果
    const transitionKey = option === 1 ? 'optionATransition' : 'optionBTransition';
    this.setData({
      selectedOption: option,
      [transitionKey]: 'option-selected'
    });

    // 延迟后切换下一题
    setTimeout(() => {
      this.goNext();
    }, 500);
  },

  /**
   * 切换到下一题或跳转结果页
   */
  goNext() {
    const nextIndex = this.data.currentIndex + 1;

    if (nextIndex >= this.data.totalQuestions) {
      // 所有题目答完，计算结果
      const result = calculateMBTI(app.globalData.answers);
      app.globalData.mbtiType = result.mbtiType;
      app.globalData.scores = result.scores;

      // 跳转结果页
      wx.redirectTo({
        url: '/pages/result/result'
      });
    } else {
      // 显示过渡动画，切换下一题
      this.setData({
        showTransition: true
      });

      setTimeout(() => {
        const currentQuestion = this.data.questions[nextIndex];
        this.setData({
          currentIndex: nextIndex,
          currentQuestion: currentQuestion,
          selectedOption: 0,
          progress: ((nextIndex + 1) / this.data.totalQuestions) * 100,
          showTransition: false,
          optionATransition: '',
          optionBTransition: ''
        });
      }, 200);
    }
  }
});
