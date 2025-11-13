import { Router } from 'express'
import authRoutes from './auth'
import travelRoutes from './travel'
import mapRoutes from './map'

const router = Router()

// 注册各模块路由
router.use('/auth', authRoutes)
router.use('/travel', travelRoutes)
router.use('/map', mapRoutes)

// 健康检查
router.get('/health', (req, res) => {
  res.status(200).json({
    code: 200,
    message: '服务运行正常',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  })
})

export default router
