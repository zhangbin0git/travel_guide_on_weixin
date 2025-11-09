import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ResponseUtil } from '../utils/response';

/**
 * 自定义错误类
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 处理开发环境错误
 */
const handleDevelopmentError = (err: Error, res: Response): void => {
  logger.error('开发环境错误', {
    message: err.message,
    stack: err.stack,
  });

  ResponseUtil.error(res, err.message, 500, {
    stack: err.stack,
  });
};

/**
 * 处理生产环境错误
 */
const handleProductionError = (err: Error, res: Response): void => {
  // 只记录操作错误
  if (err instanceof AppError) {
    logger.error('生产环境操作错误', {
      message: err.message,
      statusCode: err.statusCode,
    });

    ResponseUtil.error(res, err.message, err.statusCode);
  } else {
    // 编程错误，不泄露错误详情
    logger.error('生产环境编程错误', {
      message: err.message,
      stack: err.stack,
    });

    ResponseUtil.serverError(res, '服务器内部错误');
  }
};

/**
 * 全局错误处理中间件
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { config } = require('../config');

  if (config.env === 'development') {
    handleDevelopmentError(err, res);
  } else {
    handleProductionError(err, res);
  }
};

/**
 * 处理未捕获的路由
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  ResponseUtil.notFound(res, `未找到路由: ${req.originalUrl}`);
};