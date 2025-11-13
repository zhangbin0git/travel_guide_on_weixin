# 旅行攻略微信小程序

## 项目简介

本项目是一个基于高德地图MCP API的旅行攻略微信小程序，采用前后端分离架构，前端使用微信小程序技术栈，后端基于腾讯云函数实现，通过MCP协议调用高德地图服务，结合千问大模型提供智能攻略生成能力。

## 技术栈

### 前端
- 微信小程序原生框架
- Taro 3.x (跨平台开发框架)
- React 18.x
- TypeScript 5.x
- Redux 4.x (状态管理)
- Taro UI 3.x (UI组件库)
- Tailwind CSS 3.x (CSS框架)

### 后端
- Node.js 20.19
- Express 4.x
- TypeScript 5.x
- 腾讯云函数
- 腾讯云API网关
- 腾讯云数据库
- 腾讯云COS

## 项目结构

```
frontend/
├── src/                    # 源代码目录
│   ├── components/         # 通用组件
│   │   ├── common/         # 公共组件
│   │   ├── map/            # 地图相关组件
│   │   └── travel/         # 旅行相关组件
│   ├── pages/              # 页面组件
│   │   ├── home/           # 首页
│   │   ├── search/         # 搜索页
│   │   ├── guide/          # 攻略页
│   │   └── profile/        # 个人中心
│   ├── utils/              # 工具函数
│   ├── services/           # API服务
│   ├── store/              # Redux状态管理
│   ├── types/              # TypeScript类型定义
│   └── assets/             # 静态资源
├── config/                 # Taro配置
├── project.config.json     # 微信小程序配置
├── package.json
└── tsconfig.json
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev:weapp
```

### 构建项目

```bash
npm run build:weapp
```

## 功能特性

- 🗺️ 地图服务集成：基于高德地图MCP API提供地图展示、POI搜索、路径规划等功能
- 🧳 智能攻略生成：结合千问大模型，根据用户需求生成个性化旅行攻略
- 📍 位置服务：支持定位、周边搜索、地理编码等功能
- 👤 用户系统：微信登录、个人信息管理、收藏夹等
- 📱 响应式设计：适配不同尺寸的移动设备

## 开发规范

请参考项目根目录下的 `docs/project_rules.md` 文件，了解详细的开发规范和代码风格要求。

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。