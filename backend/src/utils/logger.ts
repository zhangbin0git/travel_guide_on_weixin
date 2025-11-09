import winston from 'winston';
import { config } from '../config';

/**
 * 日志工具类
 */
export class Logger {
  private static instance: winston.Logger;

  /**
   * 获取日志实例
   */
  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: config.logLevel,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json()
        ),
        defaultMeta: { service: 'travel-guide-backend' },
        transports: [
          // 错误日志写入文件
          new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
          }),
          // 所有日志写入文件
          new winston.transports.File({ 
            filename: 'logs/combined.log' 
          }),
        ],
      });

      // 开发环境下同时输出到控制台
      if (config.env !== 'production') {
        Logger.instance.add(new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }));
      }
    }

    return Logger.instance;
  }

  /**
   * 记录信息日志
   */
  public static info(message: string, meta?: any): void {
    Logger.getInstance().info(message, meta);
  }

  /**
   * 记录错误日志
   */
  public static error(message: string, error?: Error | any): void {
    Logger.getInstance().error(message, error);
  }

  /**
   * 记录警告日志
   */
  public static warn(message: string, meta?: any): void {
    Logger.getInstance().warn(message, meta);
  }

  /**
   * 记录调试日志
   */
  public static debug(message: string, meta?: any): void {
    Logger.getInstance().debug(message, meta);
  }
}

// 导出默认日志实例
export const logger = Logger.getInstance();