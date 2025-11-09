import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

/**
 * 启动服务器
 */
const startServer = (): void => {
  const { app, server } = createApp();

  server.listen(config.port, () => {
    logger.info(`服务器启动成功`, {
      port: config.port,
      environment: config.env,
      pid: process.pid,
    });
  });

  // 优雅关闭处理
  const gracefulShutdown = (signal: string) => {
    logger.info(`收到${signal}信号，开始优雅关闭服务器...`);
    
    server.close(() => {
      logger.info('HTTP服务器已关闭');
      // 这里可以添加其他清理逻辑，如关闭数据库连接等
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

// 启动服务器
startServer();