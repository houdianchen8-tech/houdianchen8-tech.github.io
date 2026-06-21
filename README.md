# 侯殿臣个人简历网站

这是一个面向校招和实习投递的个人简历 / 作品集网站，用于展示个人背景、技术能力、核心项目、实习经历、论文成果和联系方式。

网站定位为 Java 后端开发与 AI 应用工程方向，重点突出 Spring Boot 后端系统、RAG 智能问答、性能优化和项目落地能力。

## 基本信息

- 姓名：侯殿臣
- 学校：山西科技学院
- 专业：计算机科学与技术
- 学历：本科
- GPA：3.43 / 4.0
- 政治面貌：中共预备党员
- 求职方向：Java 后端开发、AI 应用开发、业务系统开发
- 邮箱：hdc030514@163.com
- 电话：15835623083
- GitHub：[github.com/houdianchen8-tech](https://github.com/houdianchen8-tech)

## 网站亮点

- 响应式多页面个人站，适配桌面、平板和手机端。
- 支持深色 / 浅色双主题切换。
- 首页使用透明人物图与 CSS 背景融合，降低图片对页面风格的割裂感。
- 项目卡片采用统一组件规范，标题、正文、标签和底部操作区分层清晰。
- 详情页支持 Markdown 内容渲染，用于展示项目概述、技术难点、优化成果和总结。
- 重点项目提供量化结果，便于面试官快速判断工程能力。

## 页面结构

| 页面 | 文件 | 说明 |
| --- | --- | --- |
| 首页 | `index.html` | 个人定位、精选项目、荣誉奖项、关于我 |
| 项目 | `projects.html` | 项目合集与分类筛选 |
| 博客 | `blog.html` | 技术文章与项目复盘入口 |
| 关于我 | `about.html` | 教育背景、技术能力、实习经历、时间线 |
| 工具箱 | `toolbox.html` | 技术栈、开发工具、AI 工程工具 |
| 联系我 | `contact.html` | 联系方式和邮件表单 |
| 高校物品捐赠系统 | `donation-detail.html` | 核心后端项目详情 |
| 智慧校园 AI 助手 | `ai-assistant.html` | RAG 实习项目详情 |
| 停车场管理系统 | `parking-detail.html` | Spring Boot 后端项目详情 |
| 个人站项目 | `site-detail.html` | 当前网站项目说明 |
| 俄罗斯方块 | `tetris-detail.html` | 原生 JS + Canvas 游戏项目 |

## 核心项目

### 高校物品捐赠系统

- 技术栈：Java、Spring Boot、MySQL、MyBatis-Plus、JWT、RESTful API、Redis、WebSocket
- 角色：项目负责人 / 后端开发
- 架构：前后端分离 B/S 架构
- 数据库：13 张表，覆盖用户、物品、交易、通知、反馈等模块
- 业务能力：用户注册审核、物品发布审核、捐赠申请、交易交付、互评信用、通知反馈
- 优化成果：通过联合索引、分页查询和缓存策略，将核心列表查询由 `3.2s` 优化至 `0.4s`，响应时间降低约 `87.5%`

### 智慧校园 AI 助手

- 技术栈：Java、Spring Boot、RAG、Redis、MySQL、Prompt Engineering、LLM
- 角色：后端核心开发者
- 场景：校园课程信息、公告、办事流程等多源数据问答
- 核心工作：数据服务模块、向量检索链路、上下文拼接、Prompt 模板优化、多轮对话控制
- 优化成果：接口延迟降低约 `35%`，模块开发周期缩短约 `40%`

### 向晋特种行小程序

- 类型：微信小程序 / 文旅 + 定制出行服务
- 工作内容：产品原型设计、功能规划、加载体验优化
- 成果：项目经验总结为论文，以第一作者身份发表于《环球科学》

### 其他项目

- 个人站项目：纯前端响应式网站，支持多页面、双主题和项目详情展示。
- 停车场管理系统：Spring Boot + MySQL 停车场智能管理平台。
- 俄罗斯方块：原生 JavaScript + Canvas 游戏，支持键盘与触屏双模式控制。

## 技术栈

### 后端

- Java
- Spring Boot
- Spring Security
- MyBatis / MyBatis-Plus
- RESTful API
- JWT
- Maven

### 数据库与缓存

- MySQL
- Redis
- SQL 索引优化
- 分页查询
- 数据库建模

### AI 应用

- RAG
- Prompt Engineering
- 上下文拼接
- 语义检索
- 多轮对话控制
- 大模型应用集成

### 前端

- HTML5
- CSS3
- JavaScript
- 响应式布局
- Grid / Flex
- Canvas

### 工具

- Git
- GitHub Pages
- Postman
- IntelliJ IDEA
- Cursor

## 目录结构

```text
.
├── assets/                 # 图片、头像、项目封面、二维码
├── css/
│   └── styles.css          # 全站样式、主题、组件和响应式规则
├── js/
│   └── main.js             # 主题切换、导航、Markdown 渲染、卡片交互
├── index.html              # 首页
├── projects.html           # 项目合集
├── about.html              # 关于我
├── blog.html               # 博客
├── toolbox.html            # 工具箱
├── contact.html            # 联系页
├── *-detail.html           # 项目详情页
├── .nojekyll               # GitHub Pages 静态站配置
└── README.md
```

## 本地预览

本项目是纯静态站点，不依赖构建工具。

方式一：直接打开 `index.html`。

方式二：使用本地静态服务预览：

```bash
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 部署说明

适合部署到 GitHub Pages、Netlify、Vercel 或任意静态资源服务器。

GitHub Pages 部署时保留 `.nojekyll` 文件，避免静态资源路径被 Jekyll 处理。

