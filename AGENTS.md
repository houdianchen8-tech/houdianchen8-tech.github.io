# AGENTS.md

本文件用于说明 AI 编码助手维护本站时需要遵守的规则。

## 项目概况

这是一个纯静态个人简历 / 作品集网站。

技术栈：

- HTML
- CSS
- JavaScript
- Markdown 文档
- 静态图片资源

不使用构建工具，不依赖前端框架。

## 目录说明

```text
.
├── assets/        # 正式图片资源
├── css/           # 全站样式
├── js/            # 全站交互脚本
├── *.html         # 页面文件
├── README.md      # 项目说明
├── PROJECTS.md    # 项目复盘
├── CHANGELOG.md   # 更新日志
├── DEPLOYMENT.md  # 部署维护说明
└── AGENTS.md      # AI 维护规则
```

## 编辑原则

- 保持纯静态站结构，不引入构建工具或框架。
- 优先复用现有 CSS 变量、组件类和布局规则。
- 不要为了局部样式新增大量孤立 class。
- 新增样式时同时检查深色和浅色主题。
- 新增页面时保持统一头部、导航、页脚和 CSS 引用。
- 中文内容使用 UTF-8 保存。
- 不要使用乱码文本替换原中文内容。

## HTML 规范

- 主导航保持 `nav > ul.nav-list > li > a` 结构。
- 主要内容放在 `<main id="main-content">` 内。
- 页面章节使用 `<section>`。
- 章节标题区域使用 `<header class="section-head">`。
- 项目卡片使用 `<article class="project-card">`。
- 长文本项目说明优先使用 `.markdown-content[data-markdown]`。

## CSS 规范

- 全站样式集中在 `css/styles.css`。
- 颜色、文字、卡片、标签等优先使用 CSS 变量。
- 深色主题为默认状态。
- 浅色主题通过 `body.light` 覆盖变量和必要组件样式。
- 卡片结构应保持：
  - 图片区
  - 标题区
  - 描述区
  - 标签区
  - 底部操作区
- 移动端断点主要维护在 `820px` 和 `560px` 附近。
- 不要使用大面积单一色块或过度装饰背景。

## JavaScript 规范

- 全站脚本集中在 `js/main.js`。
- 现有功能包括：
  - 主题切换
  - 移动导航
  - Markdown 渲染
  - 项目卡片点击
  - 联系表单邮件跳转
- 新增逻辑时优先复用现有选择器和工具函数。
- 避免为每张卡片单独绑定重复事件，优先使用事件委托。
- 不要破坏 `localStorage` 中的主题保存逻辑。

## Markdown 规范

- `README.md`：面向访问者和仓库主页。
- `PROJECTS.md`：面向面试复盘。
- `CHANGELOG.md`：记录重要改动。
- `DEPLOYMENT.md`：记录部署和维护规则。
- `AGENTS.md`：记录 AI 维护规范。

项目详情页中的 Markdown 内容应保留标题、段落、列表之间的空行。

## 图片资源规则

正式资源放在 `assets/`。

当前重要资源：

- `avatar.webp`
- `avatar-professional-cutout-soft.webp`
- `project-commerce.webp`
- `project-ai.webp`
- `project-parking.svg`
- `project-site.svg`
- `project-tetris.svg`
- `wechat-qr.webp`

不要删除以上资源，除非已经确认没有任何页面引用。

可以清理：

- `output/`
- 临时截图
- 浏览器缓存目录
- 未被页面引用的中间图片

## 验证要求

修改后至少检查：

```bash
node --check js/main.js
```

并检查本地资源引用是否存在。

涉及视觉、布局、主题或响应式时，应使用浏览器截图验证：

- 首页桌面端
- 首页手机端
- 深色主题
- 浅色主题

## 部署注意事项

- 保留 `.nojekyll`。
- CSS 修改后可统一更新所有页面的 `css/styles.css?v=...`。
- 替换首页人物图后可更新图片 URL 上的 `?v=...`。
- 发布前删除 `output/` 等临时目录。

## 不建议的改动

- 不要引入 React、Vue、Tailwind 或打包工具。
- 不要把所有页面合并成单页应用。
- 不要删除项目详情页。
- 不要用外链图片替换本地核心资源。
- 不要把 README 写成营销文案，应保持项目说明和维护信息清晰。
