# 旅行攻略微信小程序后端服务

基于Node.js和Express的后端服务，为旅行攻略微信小程序提供API支持。

## 技术栈

- Node.js 20.19.0
- Express 4.18.0
- TypeScript 5.0.0
- Socket.IO 4.6.0
- 腾讯云函数(Web函数)
- 高德地图MCP API
- 千问大模型API

## 目录结构

```
backend/
├── src/                     # 源代码目录
│   ├── controllers/         # 控制器
│   ├── services/            # 服务层
│   ├── utils/               # 工具函数
│   ├── config/              # 配置文件
│   ├── mcp/                 # MCP客户端实现
│   ├── middlewares/         # 中间件
│   ├── app.ts               # Express应用入口
│   └── server.ts            # 服务器启动文件
├── dist/                    # 编译输出目录
├── logs/                    # 日志目录
├── .env.example             # 环境变量示例文件
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript配置
├── serverless.yml           # 云函数配置文件
└── README.md                # 后端服务说明文档
```

## 安装与运行

### 本地开发

1. 安装依赖
```bash
npm install
```

2. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件，填入相应的配置
```

3. 启动开发服务器
```bash
npm run dev
```

### 生产部署

1. 构建项目
```bash
npm run build
```

2. 部署到腾讯云函数
```bash
npm run deploy
```

## API接口

### 健康检查
- GET `/health` - 服务健康状态检查

### API v1
- GET `/api/v1` - API版本信息

## 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| PORT | 服务端口 | 9000 |
| NODE_ENV | 运行环境 | development |
| LOG_LEVEL | 日志级别 | info |
| AMAP_API_KEY | 高德地图API密钥 | - |
| QIANWEN_API_KEY | 千问大模型API密钥 | - |
| WECHAT_APP_ID | 微信小程序AppID | - |
| WECHAT_APP_SECRET | 微信小程序AppSecret | - |

## 开发规范

- 使用TypeScript进行类型检查
- 遵循ESLint代码规范
- 使用统一的API响应格式
- 实现完善的错误处理机制
- 添加详细的日志记录

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情