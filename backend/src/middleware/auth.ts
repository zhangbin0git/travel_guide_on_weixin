import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../utils/response'

// 扩展Request接口，添加用户信息
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        openid: string
        nickname: string
        avatar: string
      }
    }
  }
}

// JWT认证中间件
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 从请求头获取token
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
  
  if (!token) {
    return sendError(res, 401, '访问令牌缺失')
  }
  
  // 验证token
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
  
  try {
    const decoded = jwt.verify(token, jwtSecret) as any
    req.user = decoded
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendError(res, 401, '访问令牌已过期')
    } else if (error instanceof jwt.JsonWebTokenError) {
      return sendError(res, 401, '无效的访问令牌')
    } else {
      return sendError(res, 500, '令牌验证失败')
    }
  }
}

// 可选认证中间件（token存在时验证，不存在时继续）
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 从请求头获取token
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
  
  if (!token) {
    return next()
  }
  
  // 验证token
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
  
  try {
    const decoded = jwt.verify(token, jwtSecret) as any
    req.user = decoded
  } catch (error) {
    // 可选认证失败时不阻止请求继续
    console.error('可选认证失败:', error)
  }
  
  next()
}