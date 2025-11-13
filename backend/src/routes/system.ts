import { Router } from 'express'
import { healthCheck, getApiInfo } from '../controllers/system'

const router = Router()

// 系统健康检查
router.get('/health', healthCheck)

// 获取API信息
router.get('/info', getApiInfo)

export default router