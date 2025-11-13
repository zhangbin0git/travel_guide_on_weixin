import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'

/**
 * 404错误处理中间件
 */
export const notFoundHandler = (req: Request, res: Response) => {
  sendError(res, `路由 ${req.originalUrl} 不存在`, 404)
}

/**
 * 全局错误处理中间件
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('错误详情:', err)

  // 处理验证错误
  if (err.name === 'ValidationError') {
    return sendError(res, '请求参数验证失败', 400)
  }

  // 处理JWT错误
  if (err.name === 'UnauthorizedError') {
    return sendError(res, '未授权访问', 401)
  }

  // 处理JWT令牌错误
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, '无效的访问令牌', 401)
  }

  // 处理JWT令牌过期错误
  if (err.name === 'TokenExpiredError') {
    return sendError(res, '访问令牌已过期', 401)
  }

  // 处理数据库错误
  if (err.name === 'MongoError' || err.name === 'MongooseError') {
    return sendError(res, '数据库操作失败', 500)
  }

  // 处理自定义错误
  if (err.name === 'CustomError') {
    const customError = err as any
    return sendError(res, customError.message || '服务器内部错误', customError.statusCode || 500)
  }

  // 默认服务器错误
  sendError(res, '服务器内部错误', 500)
}
