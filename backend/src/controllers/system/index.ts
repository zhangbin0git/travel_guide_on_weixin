import { Request, Response } from 'express'
import { sendSuccess } from '../../utils/response'
import { logger } from '../../utils/logger'

/**
 * 健康检查接口
 * @route GET /system/health
 */
export const healthCheck = (req: Request, res: Response) => {
  logger.info('健康检查请求')
  sendSuccess(res, {
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development'
  }, '服务运行正常')
}

/**
 * API信息接口
 * @route GET /system/info
 */
export const apiInfo = (req: Request, res: Response) => {
  logger.info('API信息请求')
  sendSuccess(res, {
    name: '旅行攻略微信小程序后端API',
    version: '1.0.0',
    description: '基于高德地图MCP API的旅行攻略服务',
    author: 'Travel Guide Team',
    endpoints: {
      auth: '/api/auth',
      travel: '/api/travel',
      map: '/api/map',
      system: '/system'
    }
  }, 'API信息获取成功')
}