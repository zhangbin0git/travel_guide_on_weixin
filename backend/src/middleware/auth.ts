import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth'
import { sendError } from '../utils/response'

/**
 * 用户信息接口
 */
interface User {
  id: string
  openid: string
  nickname: string
  avatar: string
  gender: number
  created_at: string
  updated_at: string
}

/**
 * 扩展Request接口，添加user属性
 */
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

/**
 * JWT认证中间件
 * 验证请求头中的token是否有效
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return sendError(res, '访问令牌缺失', 401)
    }

    const user = await authService.verifyToken(token)

    if (!user) {
      return sendError(res, '无效的访问令牌', 403)
    }

    // 将用户信息添加到请求对象
    req.user = user

    next()
  } catch (error) {
    if (error instanceof Error && error.message === '令牌已过期') {
      return sendError(res, '访问令牌已过期', 403)
    }

    return sendError(res, '令牌验证失败', 403)
  }
}

/**
 * 可选JWT认证中间件
 * 如果token存在则验证，不存在则继续执行
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (token) {
      const user = await authService.verifyToken(token)
      req.user = user
    }

    next()
  } catch (error) {
    // 可选认证失败时不阻止请求继续
    console.error('可选认证失败:', error)
    next()
  }
}
