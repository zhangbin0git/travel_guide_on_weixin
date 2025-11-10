# 旅行攻略微信小程序

基于高德地图MCP API的旅行攻略微信小程序，采用前后端分离架构，前端使用微信小程序技术栈，后端基于腾讯云函数实现。

## 技术栈

### 前端
- 微信小程序原生框架
- Taro 3.x
- React 18.x
- TypeScript 5.x
- Redux 4.x
- Taro UI 3.x
- Tailwind CSS 3.x

### 后端
- Node.js 20.19
- Express 4.x
- TypeScript 5.x
- 腾讯云函数
- 腾讯云API网关
- 腾讯云数据库
- 腾讯云COS

### 第三方服务
- 高德地图MCP Server
- 千问大模型API
- 微信开放平台

## 项目结构

```
travel_guide_on_weixin/
├── frontend/              # 前端项目
│   └── travel-guide-app/
├── backend/               # 后端项目
├── docs/                  # 项目文档
├── .husky/                # Git钩子
├── .gitignore
├── commitlint.config.mjs  # 提交规范配置
└── README.md
```

## 开发指南

### 前端开发

1. 进入前端目录
```bash
cd frontend/travel-guide-app
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev:weapp
```

4. 代码检查
```bash
npm run lint
```

### 后端开发

1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件，填入相关配置
```

4. 启动开发服务器
```bash
npm run dev
```

5. 构建项目
```bash
npm run build
```

## Git提交规范

本项目遵循Conventional Commits规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型说明：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

## 许可证

MIT