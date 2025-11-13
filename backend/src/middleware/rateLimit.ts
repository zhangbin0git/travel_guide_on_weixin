import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// 创建速率限制器
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => {
    // 使用IP地址作为限制键
    return req.ip || 'unknown'
  },
  points: 100, // 请求次数
  duration: 60, // 时间窗口（秒）
  blockDuration: 60 // 超出限制后的阻塞时间（秒）
})

// 创建严格的速率限制器（用于敏感操作）
const strictRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => {
    // 使用IP地址作为限制键
    return req.ip || 'unknown'
  },
  points: 5, // 请求次数
  duration: 60, // 时间窗口（秒）
  blockDuration: 300 // 超出限制后的阻塞时间（秒）
})

/**
 * 普通速率限制中间件
 */
export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip || 'unknown')
    next()
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1
    sendError(res, 429, `请求过于频繁，请在 ${secs} 秒后重试`)
  }
}

/**
 * 严格速率限制中间件（用于登录等敏感操作）
 */
export const strictRateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await strictRateLimiter.consume(req.ip || 'unknown')
    next()
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1
    sendError(res, 429, `操作过于频繁，请在 ${secs} 秒后重试`)
  }
}