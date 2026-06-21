# 部署与维护说明

本文档记录个人简历网站的本地预览、部署方式、资源管理和维护注意事项。

## 项目类型

本项目是纯静态网站，不依赖构建工具。

主要技术：

- HTML
- CSS
- JavaScript
- 静态图片资源

## 本地预览

### 方式一：直接打开文件

可以直接双击打开：

```text
index.html
```

适合快速查看页面内容。

### 方式二：启动本地静态服务

推荐使用静态服务预览，路径和资源加载更接近真实部署环境。

```bash
python -m http.server 8080
```

访问：

```text
http://localhost:8080
```

## 部署到 GitHub Pages

1. 将项目提交到 GitHub 仓库。
2. 保留 `.nojekyll` 文件。
3. 在仓库设置中打开 GitHub Pages。
4. 选择部署分支。
5. 等待 Pages 构建完成。

`.nojekyll` 的作用是避免 GitHub Pages 使用 Jekyll 处理静态资源路径。

## 文件结构

```text
.
├── assets/                 # 图片资源
├── css/
│   └── styles.css          # 全站样式
├── js/
│   └── main.js             # 全站交互
├── index.html              # 首页
├── projects.html           # 项目页
├── about.html              # 关于页
├── blog.html               # 博客页
├── toolbox.html            # 工具箱
├── contact.html            # 联系页
├── *-detail.html           # 项目详情页
├── README.md               # 项目说明
├── PROJECTS.md             # 项目复盘
├── CHANGELOG.md            # 更新日志
├── DEPLOYMENT.md           # 部署维护说明
└── .nojekyll
```

## 资源管理规范

### 图片资源

正式图片放在：

```text
assets/
```

当前主要资源：

- `avatar.webp`：关于我头像
- `avatar-professional-cutout-soft.webp`：首页 Hero 透明人物图
- `project-commerce.webp`：高校物品捐赠系统封面
- `project-ai.webp`：智慧校园 AI 助手封面
- `project-parking.svg`：停车场项目图
- `project-site.svg`：个人站项目图
- `project-tetris.svg`：俄罗斯方块项目图
- `wechat-qr.webp`：微信二维码

不建议把截图验证、浏览器缓存、临时图片放入 `assets/`。

### 临时输出

浏览器截图、测试结果、临时页面可以放在：

```text
output/
```

这些文件不属于网站运行必需内容，可以在交付前删除。

## 缓存版本号

页面中 CSS 可能带有版本号：

```html
<link rel="stylesheet" href="css/styles.css?v=1782055001" />
```

作用：

- 避免浏览器继续读取旧 CSS。
- 修改全站样式后，可以统一更新版本号。

注意：

- 所有 HTML 页面应保持同一个 CSS 版本号。
- 只改 HTML 文案时，不一定需要更新 CSS 版本号。
- 替换首页人物图后，可以更新图片 URL 上的 `?v=`。

## 主题维护

深色和浅色主题共用组件结构，浅色主题通过 `body.light` 覆盖变量和局部样式。

维护原则：

- 优先使用 CSS 变量。
- 不要在单个卡片里写孤立颜色。
- 新增组件时同时检查深色和浅色模式。
- 移动端单独检查 Hero、导航、卡片和按钮。

## Markdown 内容维护

详情页中适合长文本说明的内容可以使用：

```html
<div class="markdown-content" data-markdown>
  <template type="text/markdown">
## 标题

正文段落。

- 列表项
- 列表项
  </template>
</div>
```

注意：

- 标题、段落、列表之间保留空行。
- 不要把长 Markdown 字符串直接塞进普通 `div`。
- 适合用于项目概述、技术难点、优化成果和项目总结。

## 发布前检查

发布前建议检查：

- 首页是否能正常打开。
- 深色 / 浅色主题是否正常。
- 手机端导航是否正常。
- Hero 图片是否显示。
- 项目卡片是否没有文字溢出。
- 项目详情页 Markdown 是否正确渲染。
- 图片资源路径是否存在。
- GitHub 链接是否可访问。

## 不建议提交的内容

- `output/`
- 浏览器缓存目录
- 临时截图
- 未被页面引用的中间图片
- 大体积设计源文件
- 本地编辑器配置缓存

## 推荐后续补充

- GitHub Pages 地址
- 项目演示视频链接
- 核心项目仓库地址
- 数据库 ER 图
- 接口文档链接
- 部署截图
