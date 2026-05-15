// utils/mbti.js - MBTI计算逻辑

/**
 * MBTI题目数据
 * 每道题包含：题号、题目、选项A和选项B、各选项对应的维度字母
 * 维度映射：
 *   E/I维度: Q1-Q4
 *   S/N维度: Q5-Q8
 *   T/F维度: Q9-Q12
 *   J/P维度: Q13-Q16
 */
const questions = [
  {
    id: 1,
    dimension: 'EI',
    question: '群里有人喊"这票要涨停"，你怎么办？',
    optionA: { text: '立马跟进去，大家一起赚！', type: 'E' },
    optionB: { text: '自己先研究下基本面再说', type: 'I' }
  },
  {
    id: 2,
    dimension: 'EI',
    question: '你更喜欢哪种投资方式？',
    optionA: { text: '加入投资群，大家一起讨论买卖', type: 'E' },
    optionB: { text: '自己默默研究K线和财报', type: 'I' }
  },
  {
    id: 3,
    dimension: 'EI',
    question: '亏损后你的第一反应？',
    optionA: { text: '在群里吐槽，找同病相怜的人', type: 'E' },
    optionB: { text: '关掉软件，自己冷静反思', type: 'I' }
  },
  {
    id: 4,
    dimension: 'EI',
    question: '对投资社区的态度？',
    optionA: { text: '活跃发言，分享自己的操作', type: 'E' },
    optionB: { text: '只潜水看帖，从不发言', type: 'I' }
  },
  {
    id: 5,
    dimension: 'SN',
    question: '买股票主要看什么？',
    optionA: { text: 'K线图、均线、成交量等技术指标', type: 'S' },
    optionB: { text: '感觉这个赛道有前途，直觉告诉我', type: 'N' }
  },
  {
    id: 6,
    dimension: 'SN',
    question: '你觉得财报有用吗？',
    optionA: { text: '当然有用，数据不会骗人', type: 'S' },
    optionB: { text: '财报都是过去式，要看未来趋势', type: 'N' }
  },
  {
    id: 7,
    dimension: 'SN',
    question: '如何判断卖出时机？',
    optionA: { text: '看技术面是否出现卖出信号', type: 'S' },
    optionB: { text: '感觉差不多到顶了就该走了', type: 'N' }
  },
  {
    id: 8,
    dimension: 'SN',
    question: '对"抄底"的理解？',
    optionA: { text: '等到估值回到历史低位再进', type: 'S' },
    optionB: { text: '感觉已经跌够了，是时候抄底了', type: 'N' }
  },
  {
    id: 9,
    dimension: 'TF',
    question: '持仓浮亏20%，你怎么办？',
    optionA: { text: '严格按止损线执行，该割就割', type: 'T' },
    optionB: { text: '再等等看吧，万一反弹了呢', type: 'F' }
  },
  {
    id: 10,
    dimension: 'TF',
    question: '朋友推荐了一只股票，你会？',
    optionA: { text: '先分析它的基本面和技术面', type: 'T' },
    optionB: { text: '朋友推荐的总不会坑我吧，先买点', type: 'F' }
  },
  {
    id: 11,
    dimension: 'TF',
    question: '卖飞了（卖完就涨），你心里？',
    optionA: { text: '赚到了该赚的就行，严格执行纪律', type: 'T' },
    optionB: { text: '超级后悔，感觉错过了几个亿', type: 'F' }
  },
  {
    id: 12,
    dimension: 'TF',
    question: '选股时更看重？',
    optionA: { text: '估值、利润增长、ROE等硬指标', type: 'T' },
    optionB: { text: '公司故事好、赛道有情怀、老板有格局', type: 'F' }
  },
  {
    id: 13,
    dimension: 'JP',
    question: '你的交易有计划吗？',
    optionA: { text: '每笔交易都有明确的买入/止损/止盈计划', type: 'J' },
    optionB: { text: '看心情，感觉好就买卖', type: 'P' }
  },
  {
    id: 14,
    dimension: 'JP',
    question: '仓位管理？',
    optionA: { text: '严格按照仓位比例执行，绝不满仓', type: 'J' },
    optionB: { text: '看到好机会就梭哈，怕什么', type: 'P' }
  },
  {
    id: 15,
    dimension: 'JP',
    question: '投资前会做功课吗？',
    optionA: { text: '每天复盘，做好交易计划再开盘', type: 'J' },
    optionB: { text: '开盘看心情操作，计划赶不上变化', type: 'P' }
  },
  {
    id: 16,
    dimension: 'JP',
    question: '面对错过的好机会？',
    optionA: { text: '没关系，按计划等下一个信号', type: 'J' },
    optionB: { text: '赶紧追进去，万一还能涨呢', type: 'P' }
  }
];

/**
 * 根据用户选择计算MBTI类型
 * @param {Array<number>} answers - 用户每题的选择，1表示选A，2表示选B
 * @returns {Object} 包含scores和mbtiType的结果对象
 */
function calculateMBTI(answers) {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // 遍历每题的选择，累加各维度得分
  for (let i = 0; i < answers.length; i++) {
    const question = questions[i];
    const choice = answers[i]; // 1 = A, 2 = B
    if (choice === 1) {
      scores[question.optionA.type] += 1;
    } else if (choice === 2) {
      scores[question.optionB.type] += 1;
    }
  }

  // 各维度取高分字母
  const mbtiType =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return {
    scores: scores,
    mbtiType: mbtiType
  };
}

/**
 * 获取维度描述映射
 * @returns {Object} 各维度对名称
 */
function getDimensionLabels() {
  return {
    EI: { E: '社交型韭菜', I: '独狼型韭菜' },
    SN: { S: '技术型韭菜', N: '玄学型韭菜' },
    TF: { T: '理性型韭菜', F: '感性型韭菜' },
    JP: { J: '计划型韭菜', P: '随性型韭菜' }
  };
}

/**
 * 获取各维度得分百分比
 * @param {Object} scores - 各维度得分
 * @returns {Object} 各维度百分比
 */
function getDimensionPercent(scores) {
  return {
    E: Math.round((scores.E / 4) * 100),
    I: Math.round((scores.I / 4) * 100),
    S: Math.round((scores.S / 4) * 100),
    N: Math.round((scores.N / 4) * 100),
    T: Math.round((scores.T / 4) * 100),
    F: Math.round((scores.F / 4) * 100),
    J: Math.round((scores.J / 4) * 100),
    P: Math.round((scores.P / 4) * 100)
  };
}

module.exports = {
  questions: questions,
  calculateMBTI: calculateMBTI,
  getDimensionLabels: getDimensionLabels,
  getDimensionPercent: getDimensionPercent
};
