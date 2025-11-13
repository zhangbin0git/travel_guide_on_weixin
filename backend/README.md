# 旅行攻略微信小程序后端

基于Node.js + Express + TypeScript的微信小程序后端服务，提供用户认证、旅行攻略管理、地图服务等功能。

## 技术栈

- Node.js 20.x
- Express 4.x
- TypeScript 5.x
- JWT认证
- Winston日志
- Joi数据验证
- 高德地图MCP API

## 项目结构

```
backend/
├── src/
│   ├── controllers/         # 控制器
│   ├── middleware/          # 中间件
│   ├── routes/              # 路由
│   ├── services/            # 业务服务
│   ├── utils/               # 工具函数
│   ├── types/               # 类型定义
│   ├── config/              # 配置文件
│   ├── app.ts               # 应用入口
│   └── server.ts            # 服务器启动
├── .env.example             # 环境变量示例
├── .eslintrc.js             # ESLint配置
├── .prettierrc              # Prettier配置
├── .gitignore               # Git忽略文件
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript配置
└── README.md                # 项目说明
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 环境配置

复制环境变量示例文件并修改配置：

```bash
cp .env.example .env
```

修改 `.env` 文件中的配置项，特别是数据库连接、JWT密钥等。

### 开发模式

```bash
npm run dev
```

### 生产模式

```bash
npm run build
npm start
```

## API文档

### 认证接口

- `POST /api/auth/login` - 用户登录
- `GET /api/auth/userinfo` - 获取用户信息
- `POST /api/auth/update` - 更新用户信息
- `POST /api/auth/logout` - 用户登出

### 旅行接口

- `GET /api/travel/destinations` - 获取目的地列表
- `GET /api/travel/destinations/:id` - 获取目的地详情
- `GET /api/travel/destinations/search` - 搜索目的地
- `GET /api/travel/guides` - 获取攻略列表
- `GET /api/travel/guides/:id` - 获取攻略详情
- `POST /api/travel/guides` - 创建攻略
- `GET /api/travel/guides/recommend` - 获取推荐攻略

### 地图接口

- `GET /api/map/geocode` - 地理编码
- `GET /api/map/regeocode` - 逆地理编码
- `GET /api/map/search` - POI搜索
- `GET /api/map/around` - 周边搜索
- `GET /api/map/driving` - 驾车路径规划
- `GET /api/map/walking` - 步行路径规划
- `GET /api/map/bicycling` - 骑行路径规划
- `GET /api/map/distance` - 距离测量

### 系统接口

- `GET /system/health` - 健康检查
- `GET /system/info` - API信息

## 开发规范

### 代码风格

- 使用ESLint + Prettier进行代码格式化
- 遵循TypeScript严格模式
- 使用语义化的变量和函数名
- 函数和类必须有JSDoc注释

### 提交规范

使用Conventional Commits规范：

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

## 部署

### Docker部署

```bash
# 构建镜像
docker build -t travel-guide-backend .

# 运行容器
docker run -d -p 3000:3000 --name travel-guide-backend travel-guide-backend
```

### PM2部署

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs
```

## 许可证

MIT