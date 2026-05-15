# 韭菜MBTI项目记忆

## 项目概述
- 微信小程序《韭菜MBTI人格分析》，将MBTI测试与A股韭菜文化结合
- 技术栈：微信小程序原生框架（WXML/WXSS/JS），纯前端计算无后端
- 项目路径：D:\Code\AI\JiuCai-MBTI-Test\

## 关键设计决策
- 16道投资主题题目，4维度×4题（E/I、S/N、T/F、J/P）
- 全局数据传递：app.globalData（scores/mbtiType/answers）
- 页面导航：首页→答题页(navigateTo)，答题页→结果页(redirectTo)，重新测试(reLaunch)
- 配色：韭菜绿#07C160 + 金色#F5A623 + 深色背景
- 16种韭菜人格解读，每种含名称/emoji/解读/标签/忠告/优劣势

## 已修复的Bug（2026-05-15）
1. 答题中途返回首页数据未重置 → onShow中调用_resetGlobalData()
2. 重新测试页面栈堆积 → redirectTo改为reLaunch
3. 维度标签高亮硬编码 → 动态条件class与calculateMBTI对齐
4. data-option类型安全 → "1"改为{{1}}
