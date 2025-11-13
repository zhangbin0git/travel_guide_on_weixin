import { Request, Response, NextFunction } from 'express'

/**
 * 请求日志中间件
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  const { method, url, ip } = req
  const userAgent = req.get('User-Agent') || ''

  // 记录请求开始
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip} - ${userAgent}`)

  // 监听响应结束事件
  res.on('finish', () => {
    const duration = Date.now() - start
    const { statusCode } = res
    const contentLength = res.get('Content-Length') || 0

    console.log(
      `[${new Date().toISOString()}] ${method} ${url} - ${statusCode} - ${duration}ms - ${contentLength}bytes - ${ip}`
    )
  })

  next()
}

/**
 * 错误日志中间件
 */
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { method, url, ip } = req
  const userAgent = req.get('User-Agent') || ''

  console.error(
    `[${new Date().toISOString()}] ERROR: ${method} ${url} - ${ip} - ${userAgent}`,
    err
  )

  next(err)
}