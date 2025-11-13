import { Request, Response, NextFunction } from 'express'

// CORS中间件
export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*']
    const origin = req.headers.origin

    // 设置CORS头
    if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
    } else if (allowedOrigins[0] && allowedOrigins[0] !== '*') {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0])
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // 处理预检请求
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    next()
  } catch (error) {
    next(error)
  }
}

/**
 * 安全头中间件
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // 设置各种安全头
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-XSS-Protection', '1; mode=block')

    // 生产环境强制HTTPS
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }

    // 内容安全策略
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
    )

    next()
  } catch (error) {
    next(error)
  }
}