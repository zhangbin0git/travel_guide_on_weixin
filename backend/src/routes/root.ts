import { Router } from 'express'
import apiRoutes from './api'
import systemRoutes from './system'

const router = Router()

// 注册API路由
router.use('/api', apiRoutes)

// 注册系统路由
router.use('/system', systemRoutes)

// 根路径重定向到健康检查
router.get('/', (req, res) => {
  res.redirect('/system/health')
})

export default router
