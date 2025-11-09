# WebSocket通信实现

本文档描述了旅行攻略微信小程序的WebSocket通信实现，包括前后端代码结构和测试方法。

## 功能概述

WebSocket通信模块实现了前后端实时数据交换，主要用于：
1. 攻略生成过程的实时状态更新
2. 客户端与服务器的心跳检测
3. 实时消息推送
4. 错误处理和自动重连

## 后端实现

### 文件结构
```
backend/src/
├── controllers/
│   └── websocketController.ts    # WebSocket控制器
├── tests/
│   └── websocket.test.ts         # WebSocket测试用例
├── app.ts                        # Express应用入口
└── server.ts                     # 服务器启动文件
```

### 核心功能

#### 1. WebSocket控制器 (`websocketController.ts`)
- 初始化WebSocket服务器
- 管理客户端连接
- 处理消息路由
- 实现心跳检测
- 支持消息广播和单播

#### 2. 集成到Express应用
- 在`app.ts`中创建HTTP服务器
- 初始化WebSocket服务
- 添加健康检查端点，显示WebSocket连接数

### 消息类型

| 类型 | 描述 | 数据格式 |
|------|------|----------|
| connect | 连接确认 | {message: string, timestamp: number} |
| disconnect | 断开连接 | {message: string, timestamp: number} |
| guide_request | 攻略生成请求 | {destination, duration, interests, ...} |
| guide_update | 攻略生成状态更新 | {status, message, data?, timestamp} |
| guide_complete | 攻略生成完成 | {guideData, timestamp} |
| error | 错误消息 | {code, message, details?, timestamp} |
| ping | 心跳请求 | {timestamp} |
| pong | 心跳响应 | {timestamp} |

## 前端实现

### 文件结构
```
frontend/src/
├── services/
│   └── websocket.ts             # WebSocket服务
├── pages/
│   └── websocket-test/          # WebSocket测试页面
│       └── websocket-test.wpy   # 测试页面组件
```

### 核心功能

#### 1. WebSocket服务 (`websocket.ts`)
- 连接管理和自动重连
- 消息发送和接收
- 心跳检测
- 状态监听
- 错误处理

#### 2. 测试页面 (`websocket-test.wpy`)
- 连接状态显示
- 消息发送测试
- 实时消息日志
- 连接控制

## 使用方法

### 后端启动

```bash
# 安装依赖
npm install

# 开发模式启动
npm run dev

# 生产模式构建
npm run build
npm start
```

### 前端使用

```typescript
import { initWebSocket, sendGuideRequest, addMessageListener } from '@/services/websocket';

// 初始化WebSocket连接
initWebSocket('ws://your-server-address/ws/guide');

// 添加消息监听器
addMessageListener((message) => {
  console.log('收到消息:', message);
});

// 发送攻略生成请求
sendGuideRequest({
  destination: '北京',
  duration: 3,
  interests: ['历史文化', '美食'],
  budget: '中等',
  groupType: '情侣'
});
```

## 测试

### 运行WebSocket测试

```bash
# 运行WebSocket测试
npm run test:websocket

# 监视模式运行测试
npm run test:watch
```

### 测试用例覆盖

1. WebSocket服务初始化
2. 客户端连接处理
3. 客户端断开连接处理
4. 攻略生成请求处理
5. 心跳消息处理
6. 消息广播
7. 单播消息发送
8. 客户端统计信息

### 手动测试

1. 启动后端服务器
2. 在微信开发者工具中打开前端项目
3. 导航到WebSocket测试页面
4. 测试连接、断开、消息发送等功能

## 部署注意事项

1. **腾讯云函数部署**
   - 确保WebSocket服务器在云函数中正确初始化
   - 配置适当的超时时间
   - 处理云函数冷启动问题

2. **生产环境配置**
   - 使用WSS协议而非WS
   - 配置适当的CORS策略
   - 设置连接数限制
   - 实现负载均衡

## 性能优化

1. **连接池管理**
   - 限制最大连接数
   - 实现连接超时清理
   - 监控连接状态

2. **消息优化**
   - 消息压缩
   - 批量消息处理
   - 消息优先级队列

3. **错误处理**
   - 连接失败重试机制
   - 错误日志记录
   - 优雅降级策略

## 故障排除

1. **连接失败**
   - 检查服务器地址和端口
   - 验证防火墙设置
   - 确认SSL证书配置

2. **消息丢失**
   - 检查消息格式
   - 验证消息大小限制
   - 确认网络稳定性

3. **性能问题**
   - 监控内存使用
   - 检查消息队列长度
   - 分析CPU使用率

## 未来扩展

1. **消息持久化**
   - 实现离线消息存储
   - 消息历史记录
   - 消息重放机制

2. **高级功能**
   - 消息加密
   - 用户认证
   - 权限控制
   - 多房间支持