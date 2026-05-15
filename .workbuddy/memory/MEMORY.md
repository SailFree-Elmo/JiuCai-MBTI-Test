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

## UI优化（2026-05-16）
1. 答题页进度区：提示文字左、题号右，字号放大+加letter-spacing，提示加italic
2. 题目卡片和选项卡片宽度随内容缩放问题：根因是app.wxss全局.container设了align-items:center导致子元素收缩到内容宽度 → question页.container加align-items:stretch覆盖全局值；question-section也加align-items:stretch
3. 选中✓图标：从wx:if改为始终渲染+check-hidden/check-visible切换（用opacity+visibility而非width变化），避免选中后宽度跳变；option-card的transition改为只过渡border/background/shadow不过渡all

## 文案与素材（2026-05-16）
1. 小程序头像：avatar.png（AI生成，韭菜绿主题）
2. 小程序介绍：docs/mini-program-intro.md（含一句话简介/短版/长版/搜索标签/分享标题备选）
   - 后台功能介绍：「韭菜MBTI人格分析 — 16道投资场景趣味题，精准测出你的韭菜人格！…」
   - 分享卡片描述：「16道投资趣味题，测测你是哪种韭菜！2分钟出结果，16种韭菜人格等你认领🌿」
