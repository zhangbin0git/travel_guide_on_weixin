import { Request, Response } from 'express'
import { sendSuccess, sendPaginatedResponse } from '../utils/response'
import { systemService } from '../services/system'

/**
 * 系统健康检查
 */
export const healthCheck = async (req: Request, res: Response) => {
  const healthData = await systemService.getHealthStatus()
  sendSuccess(res, healthData, '服务运行正常')
}

/**
 * 获取API信息
 */
export const getApiInfo = async (req: Request, res: Response) => {
  const apiInfo = await systemService.getApiInfo()
  sendSuccess(res, apiInfo, 'API信息获取成功')
}
