import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'

/**
 * CORS中间件
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['*']
  const origin = req.headers.origin

  // 检查请求来源是否在允许列表中
  if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  next()
}

/**
 * 安全头中间件
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // 防止点击劫持
  res.setHeader('X-Frame-Options', 'DENY')

  // 防止MIME类型嗅探
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // XSS保护
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // 强制HTTPS（生产环境）
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  // 内容安全策略
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
  )

  next()
}
