# 旅行攻略微信小程序项目开发规则

## 1. 项目概述

本项目是一个基于高德地图MCP API开发的旅行攻略微信小程序，用户只需输入旅行需求（如目的地、日期、兴趣偏好等），即可自动生成个性化旅行攻略。


## 2. 技术栈规范

### 2.1 前端技术栈

- **框架**: WePY ^2.0.0 (基于Vue.js语法的微信小程序框架)
- **语言**: TypeScript ^5.0.0
- **样式**: SCSS ^1.50.0
- **UI组件**: 微信小程序原生组件 + Tailwind CSS
- **图标库**: Font Awesome 4.7.0

### 2.2 后端技术栈

- **运行环境**: Node.js 20.19.0
- **Web框架**: Express ^4.18.0
- **部署**: 腾讯云函数(Web函数)
- **语言**: TypeScript ^5.0.0
- **实时通信**: Socket.IO ^4.6.0
- **AI服务**: 千问大模型API
- **地图服务**: 高德地图MCP API

## 3. 项目目录结构

### 3.1 前端目录结构

```
frontend/
├── src/                     # 源代码目录
│   ├── components/          # 公共组件
│   │   ├── map/             # 地图相关组件
│   │   ├── guide/           # 攻略相关组件
│   │   └── common/          # 通用组件
│   ├── pages/               # 页面文件
│   │   ├── index/           # 首页
│   │   ├── guide-detail/    # 攻略详情页
│   │   ├── search/          # 搜索页
│   │   └── user/            # 用户中心
│   ├── services/            # 服务层
│   │   ├── api.ts           # API接口定义
│   │   ├── websocket.ts     # WebSocket连接管理
│   │   └── storage.ts       # 本地存储服务
│   ├── utils/               # 工具函数
│   ├── assets/              # 静态资源
│   │   ├── images/          # 图片资源
│   │   └── styles/          # 全局样式
│   ├── app.ts               # 小程序入口文件
│   ├── app.scss             # 全局样式文件
│   └── app.config.ts        # 小程序配置文件
├── typings/                 # TypeScript类型定义
├── project.config.json      # 项目配置文件
├── tsconfig.json            # TypeScript配置
├── package.json             # 项目依赖配置
└── .eslintrc.js             # ESLint配置
```

### 3.2 后端目录结构

```
backend/
├── src/                     # 源代码目录
│   ├── controllers/         # 控制器
│   │   ├── guideController.ts   # 攻略相关接口
│   │   └── websocketController.ts # WebSocket控制器
│   ├── services/            # 服务层
│   │   ├── modelService.ts     # 大模型服务
│   │   ├── mcpService.ts       # MCP服务
│   │   └── guideService.ts     # 攻略生成服务
│   ├── utils/               # 工具函数
│   │   ├── logger.ts          # 日志工具
│   │   └── response.ts        # 响应格式化工具
│   ├── config/              # 配置文件
│   │   ├── index.ts           # 配置入口
│   │   ├── mcpConfig.ts       # MCP配置
│   │   └── modelConfig.ts     # 模型配置
│   ├── mcp/                 # MCP客户端实现
│   │   ├── client.ts          # MCP客户端
│   │   └── types.ts           # MCP相关类型定义
│   ├── middlewares/         # 中间件
│   │   ├── cors.ts            # CORS中间件
│   │   └── errorHandler.ts    # 错误处理中间件
│   ├── app.ts               # Express应用入口
│   └── server.ts            # 服务器启动文件
├── .env.example             # 环境变量示例文件
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript配置
├── serverless.yml           # 云函数配置文件
└── README.md                # 后端服务说明文档
```

## 4. 编码规范

### 4.1 命名规范

#### 4.1.1 前端命名规范

| 项目 | 规范 | 示例 |
|------|------|------|
| 变量名 | 小驼峰命名法 | `userName`, `isGuideLoaded` |
| 常量名 | 大驼峰命名法 | `MaxGuideLength`, `DefaultCity` |
| 函数名 | 小驼峰命名法 | `getGuideData()`, `formatDate()` |
| 组件名 | 大驼峰命名法 | `GuideCard`, `MapContainer` |
| 文件名 | 小写字母，单词间用连字符 | `guide-detail.ts`, `user-service.ts` |
| CSS类名 | BEM命名法 | `guide-card__title--active` |

#### 4.1.2 后端命名规范

| 项目 | 规范 | 示例 |
|------|------|------|
| 变量名 | 小驼峰命名法 | `requestBody`, `responseData` |
| 常量名 | 全大写，单词间用下划线 | `MAX_TOKEN_SIZE`, `API_TIMEOUT` |
| 函数名 | 小驼峰命名法 | `generateGuide()`, `validateRequest()` |
| 类名 | 大驼峰命名法 | `McpClient`, `ModelService` |
| 文件名 | 小写字母，单词间用连字符 | `guide-controller.ts`, `websocket-service.ts` |
| 目录名 | 小写字母，单词间用连字符 | `controllers`, `middlewares` |

### 4.2 代码格式规范

#### 4.2.1 TypeScript代码规范

- 使用空格进行缩进，4个空格
- 行尾必须有分号
- 字符串使用单引号
- 接口和类型使用大驼峰命名法，接口前缀为`I`
- 类型定义文件使用`.ts`扩展名
- 每行最多100个字符
- 花括号在同一行开始，在内容下方另起一行结束
- 函数参数逗号后必须有空格
- if/else语句必须使用花括号

#### 4.2.2 注释规范

- 文件头部必须包含版权信息和文件功能描述
- 函数和类必须包含JSDoc格式注释，说明功能、参数和返回值
- 复杂逻辑必须有行内注释
- 接口和类型定义必须有注释说明用途
- 配置项必须有注释说明含义和取值范围

### 4.3 UI/UX规范

- 遵循微信小程序设计规范
- 采用组件化开发，复用公共UI元素
- 使用Tailwind CSS进行样式管理
- 实现流畅的页面过渡动画（淡入、上滑等）
- 交互反馈统一化（按钮点击效果、加载动画等）
- 响应式设计，适配不同屏幕尺寸

## 5. NPM包管理规范

- 使用yarn或npm进行包管理，推荐使用yarn
- 所有依赖包必须指定具体版本号，避免使用^或~等模糊版本
- 开发依赖与生产依赖分开管理
- package.json中必须包含以下脚本：
  - `build`: 构建生产版本
  - `dev`: 开发模式启动
  - `lint`: 代码质量检查
  - `test`: 运行测试

## 6. API接口规范

### 6.1 RESTful API设计

- 遵循RESTful API设计原则
- 使用标准的HTTP方法（GET, POST, PUT, DELETE）
- 资源路径使用小写复数形式
- API版本通过URL路径中的v1标识（如：`/api/v1/guides`）
- 统一的响应格式：
  ```json
  {
    "code": 状态码,
    "message": "消息描述",
    "data": 数据内容
  }
  ```

### 6.2 WebSocket接口规范

- 连接路径格式：`/ws/[功能模块]`
- 消息格式统一使用JSON
- 消息必须包含`type`字段标识消息类型
- 支持的消息类型：`start`, `progress`, `update`, `complete`, `error`

## 7. 高德地图MCP API使用规范

### 7.1 工具调用封装

- 统一封装MCP客户端，处理连接和错误重试
- 按照功能模块分类管理MCP工具调用
- 支持的MCP工具包括：
  - 步行路径规划 (maps_direction_walking)
  - 驾车路径规划 (maps_direction_driving)
  - 骑行路径规划 (maps_direction_bicycling)
  - 地理编码 (maps_geo)
  - 逆地理编码 (maps_regeocode)
  - 周边搜索 (maps_around_search)
  - 文本搜索 (maps_text_search)
  - POI详情查询 (maps_search_detail)
  - 公共交通路径规划 (maps_direction_transit_integrated)
  - 距离计算 (maps_distance)
  - IP定位 (maps_ip_location)
  - 地图展示 (maps_schema_personal_map)
  - 导航 (maps_schema_navi)
  - 打车 (maps_schema_take_taxi)
  - 天气查询 (maps_weather)

### 7.2 API调用限制

- 遵循高德地图API调用频率限制
- 实现错误重试机制，最多重试3次
- 合理缓存API调用结果，避免重复请求
- 设置请求超时时间，默认10秒

## 8. 性能优化规范

### 8.1 前端性能优化

- 图片懒加载
- 组件按需加载
- 数据缓存机制
- 避免不必要的重渲染
- WebSocket连接复用

### 8.2 后端性能优化

- 使用连接池管理数据库连接
- 实现请求缓存
- 异步处理耗时操作
- 合理使用中间件，避免过度使用

## 9. 安全规范

### 9.1 前端安全

- 输入数据校验
- 防止XSS攻击
- 接口请求安全验证
- 敏感信息不直接存储在前端

### 9.2 后端安全

- API密钥安全存储（环境变量）
- 请求参数验证
- 输入内容过滤
- 用户权限控制
- 数据传输加密（HTTPS）
- CORS配置合理限制

## 10. AI助手任务执行规范
为确保开发过程的有序性和可控性，AI 助手必须严格遵循以下任务执行规范：
### 10.1 任务范围控制

- **严格按照任务拆分执行**: 必须严格按照 `docs/task_breakdown.md` 中定义的任务范围执行，不得超出指定任务的边界。
- **单一任务原则**: 每次只执行一个明确指定的任务（如"任务 1.1"、"任务 1.2"等），完成后等待用户确认再进行下一步。
- **禁止自动扩展**: 不得基于技术架构文档或其他文档自行扩展任务范围，如果需要扩展需要通知用户确认。

### 10.2 任务指令格式

用户应使用以下格式明确指定任务：

- **明确任务编号**: "请执行任务 X.X：[任务名称]"
- **范围限制**: "只完成任务 X.X 中列出的具体任务，不要超出范围"
- **停止指令**: "完成后等待我确认再进行下一步"

### 10.3 执行验收标准

- **任务完成确认**: 每个任务完成后，必须对照 `task_breakdown.md` 中的验收标准进行自检。
- **范围边界检查**: 确保所有创建的文件和代码都在指定任务范围内。
- **等待用户确认**: 任务完成后使用 `finish` 工具总结完成情况，等待用户确认后再进行下一个任务。

### 10.4 异常处理

- **任务描述不清晰**: 如果任务描述不清晰，应先询问具体范围而不是自行决定。
- **依赖关系处理**: 如果当前任务依赖其他未完成的任务，应明确指出依赖关系并等待用户指示。
- **超出范围的代码**: 如果发现已创建超出任务范围的代码，应主动询问是否需要清理。

## 11. 部署规范

### 11.1 前端部署

- 使用微信开发者工具构建并上传
- 版本号管理遵循语义化版本规范
- 小程序审核前进行全面测试

### 11.2 后端部署

- 腾讯云函数(Web函数)部署
- 环境变量配置合理管理
- 依赖包正确安装
- 日志配置完善

## 12. 文档规范

- 技术文档使用Markdown格式
- 接口文档完整且实时更新
- 代码注释清晰且必要
- 项目架构文档定期更新

## 13. 版本控制规范

- 使用Git进行版本控制
- 遵循Git Flow工作流
- 提交信息清晰明了，使用中文
- 定期合并和清理分支

## 14. HTML文件预览规则

当创建HTML文件后，为了提供更好的开发体验和热更新功能，应该：

-  **使用npx live-server启动本地服务器**
   - 命令：`npx --yes live-server --port=3000 --host=localhost --no-browser 文件名.html`
   - 优势：无需安装依赖，支持热更新，配合Trae编辑器内置预览功能，避免打开外部浏览器
   - 适用场景：所有HTML文件的预览和开发
   - 重要：使用`--no-browser`参数禁止自动打开浏览器，`--yes`参数避免用户交互，实现完全自动化

-  **最佳实践**
   - 优先使用live-server，提供实时热更新功能
   - 端口统一使用3000，保持一致性
   - 确保用户体验简单，减少配置步骤
   - 在vibe coding项目中，让用户专注于效果预览，无需关心环境配置

## 15. 总结

本项目开发规则旨在确保旅行攻略微信小程序的开发过程规范化、标准化，提高开发效率和代码质量。所有开发人员和AI助手必须严格遵守本规则，确保项目的顺利进行和最终交付。