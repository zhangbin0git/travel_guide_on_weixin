import express from 'express';
import { createServer } from 'http';
import { config } from './config';
import { corsMiddleware } from './middlewares/cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';
import { webSocketController } from './controllers/websocketController';

/**
 * 创建Express应用和HTTP服务器
 */
export const createApp = (): { app: express.Application; server: any } => {
  const app = express();
  
  // 创建HTTP服务器
  const server = createServer(app);

  // 信任代理（用于获取真实IP）
  app.set('trust proxy', 1);

  // 基础中间件
  app.use(express.json({ limit: '10mb' })); // 解析JSON请求体
  app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 解析URL编码请求体

  // CORS中间件
  app.use(corsMiddleware);

  // 请求日志中间件
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    next();
  });

  // 健康检查路由
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
      websocketClients: webSocketController.getClientCount(),
    });
  });

  // API路由
  app.use('/api/v1', (req, res) => {
    res.status(200).json({
      message: '旅行攻略API v1.0.0',
      version: '1.0.0',
    });
  });

  // 404处理
  app.use(notFoundHandler);

  // 全局错误处理
  app.use(errorHandler);

  // 初始化WebSocket服务
  webSocketController.initialize(server);

  return { app, server };
};